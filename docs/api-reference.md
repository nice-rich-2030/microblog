# API仕様書

## 概要
このドキュメントは、マイクロブログプロジェクトの内部API（`lib/`配下の関数）の仕様を定義します。

---

## 目次
1. [記事API (posts.ts)](#記事api-poststs)
2. [Markdown処理API (markdown.ts)](#markdown処理api-markdownts)
3. [タグAPI (tags.ts)](#タグapi-tagsts)
4. [検索API (search.ts)](#検索api-searchts)
5. [ユーティリティAPI (utils.ts)](#ユーティリティapi-utilsts)

---

## 記事API (posts.ts)

### getAllPosts()
すべての公開済み記事を取得します。

**シグネチャ**:
```typescript
function getAllPosts(options?: GetPostsOptions): Post[]
```

**パラメータ**:
```typescript
interface GetPostsOptions {
  includeDrafts?: boolean;  // 下書きを含めるか（デフォルト: false）
  limit?: number;           // 取得件数の制限
  sortBy?: 'date' | 'title'; // ソート方法（デフォルト: 'date'）
  order?: 'asc' | 'desc';   // ソート順（デフォルト: 'desc'）
}
```

**戻り値**:
```typescript
interface Post {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string;
  htmlContent: string;
  readingTime: number;
  excerpt: string;
}
```

**使用例**:
```typescript
// すべての記事を取得
const posts = getAllPosts();

// 最新5件のみ
const latestPosts = getAllPosts({ limit: 5 });

// 下書きを含む
const allPostsIncludingDrafts = getAllPosts({ includeDrafts: true });
```

**エラー**:
- `content/posts/`ディレクトリが存在しない場合: 空配列を返す
- Markdownのパースエラー: 該当記事をスキップしてログ出力

---

### getPostBySlug()
指定されたslugの記事を取得します。

**シグネチャ**:
```typescript
function getPostBySlug(slug: string): Post | null
```

**パラメータ**:
- `slug` (string): 記事のスラッグ（ファイル名から`.md`を除いたもの）

**戻り値**:
- `Post`: 記事が見つかった場合
- `null`: 記事が見つからない場合

**使用例**:
```typescript
const post = getPostBySlug('my-first-post');

if (post) {
  console.log(post.frontMatter.title);
} else {
  console.log('Post not found');
}
```

**エラー**:
- slugに対応する記事が存在しない場合: `null`を返す
- 下書き記事の場合: `null`を返す（本番環境）

---

### getPostsByTag()
指定されたタグを持つ記事を取得します。

**シグネチャ**:
```typescript
function getPostsByTag(tag: string): Post[]
```

**パラメータ**:
- `tag` (string): タグ名

**戻り値**:
- `Post[]`: タグに該当する記事の配列

**使用例**:
```typescript
const nextjsPosts = getPostsByTag('Next.js');
console.log(`Found ${nextjsPosts.length} posts with tag "Next.js"`);
```

---

### getRecentPosts()
最新の記事を取得します。

**シグネチャ**:
```typescript
function getRecentPosts(count: number = 5): Post[]
```

**パラメータ**:
- `count` (number): 取得する記事数（デフォルト: 5）

**戻り値**:
- `Post[]`: 最新の記事配列（日付降順）

**使用例**:
```typescript
const recentPosts = getRecentPosts(10);
```

---

### getAdjacentPosts()
指定された記事の前後の記事を取得します。

**シグネチャ**:
```typescript
function getAdjacentPosts(slug: string): {
  prev: Post | null;
  next: Post | null;
}
```

**パラメータ**:
- `slug` (string): 基準となる記事のスラッグ

**戻り値**:
```typescript
{
  prev: Post | null;  // 前の記事（新しい記事）
  next: Post | null;  // 次の記事（古い記事）
}
```

**使用例**:
```typescript
const { prev, next } = getAdjacentPosts('my-post');

if (prev) {
  console.log(`Previous: ${prev.frontMatter.title}`);
}
if (next) {
  console.log(`Next: ${next.frontMatter.title}`);
}
```

---

### generateStaticParams()
静的ページ生成用のパラメータを生成します。

**シグネチャ**:
```typescript
function generateStaticParams(): Array<{ slug: string }>
```

**戻り値**:
```typescript
Array<{ slug: string }>
```

**使用例**:
```typescript
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  return generateStaticParams();
}
```

---

## Markdown処理API (markdown.ts)

### parseMarkdown()
Markdownをパースしてフロントマターとコンテンツに分離します。

**シグネチャ**:
```typescript
function parseMarkdown(content: string): {
  frontMatter: PostFrontMatter;
  content: string;
}
```

**パラメータ**:
- `content` (string): Markdownファイルの内容

**戻り値**:
```typescript
{
  frontMatter: PostFrontMatter;  // パースされたフロントマター
  content: string;               // Markdown本文
}
```

**使用例**:
```typescript
const fileContent = fs.readFileSync('post.md', 'utf-8');
const { frontMatter, content } = parseMarkdown(fileContent);
```

---

### markdownToHtml()
MarkdownをHTMLに変換します。

**シグネチャ**:
```typescript
async function markdownToHtml(markdown: string): Promise<string>
```

**パラメータ**:
- `markdown` (string): Markdown形式の文字列

**戻り値**:
- `Promise<string>`: HTML文字列

**使用例**:
```typescript
const markdown = '# Hello\n\nThis is **bold**.';
const html = await markdownToHtml(markdown);
// <h1 id="hello">Hello</h1><p>This is <strong>bold</strong>.</p>
```

**処理内容**:
- GitHub Flavored Markdown (GFM) サポート
- シンタックスハイライト
- 見出しに自動ID付与
- 見出しに自動アンカーリンク追加
- XSS対策（サニタイゼーション）

---

### generateTableOfContents()
Markdownから目次を生成します。

**シグネチャ**:
```typescript
function generateTableOfContents(markdown: string): TocItem[]
```

**パラメータ**:
- `markdown` (string): Markdown文字列

**戻り値**:
```typescript
interface TocItem {
  id: string;      // 見出しのID
  title: string;   // 見出しテキスト
  level: number;   // 見出しレベル (1-6)
}
```

**使用例**:
```typescript
const markdown = '# Title\n## Subtitle\n### Section';
const toc = generateTableOfContents(markdown);
// [
//   { id: 'title', title: 'Title', level: 1 },
//   { id: 'subtitle', title: 'Subtitle', level: 2 },
//   { id: 'section', title: 'Section', level: 3 }
// ]
```

---

### calculateReadingTime()
記事の読了時間を計算します。

**シグネチャ**:
```typescript
function calculateReadingTime(content: string): number
```

**パラメータ**:
- `content` (string): 記事本文

**戻り値**:
- `number`: 読了時間（分）

**使用例**:
```typescript
const content = 'Lorem ipsum...'; // 長文
const readingTime = calculateReadingTime(content);
console.log(`読了時間: ${readingTime}分`);
```

**計算方法**:
- 1分間に200単語（英語）または400文字（日本語）読むと仮定
- 最低1分

---

### generateExcerpt()
記事の抜粋を生成します。

**シグネチャ**:
```typescript
function generateExcerpt(content: string, length: number = 150): string
```

**パラメータ**:
- `content` (string): 記事本文（Markdown）
- `length` (number): 抜粋の最大文字数（デフォルト: 150）

**戻り値**:
- `string`: 抜粋テキスト

**使用例**:
```typescript
const excerpt = generateExcerpt(post.content, 200);
console.log(excerpt);
// "これは記事の冒頭部分です。Markdownの記法は削除されて..."
```

**処理内容**:
- Markdown記法を削除
- 指定文字数で切り捨て
- 単語の途中で切れないように調整
- 末尾に`...`を追加

---

## タグAPI (tags.ts)

### getAllTags()
すべてのタグとその記事数を取得します。

**シグネチャ**:
```typescript
function getAllTags(): Tag[]
```

**戻り値**:
```typescript
interface Tag {
  name: string;   // タグ名
  count: number;  // 該当記事数
  slug: string;   // URL用スラッグ
}
```

**使用例**:
```typescript
const tags = getAllTags();
tags.forEach(tag => {
  console.log(`${tag.name}: ${tag.count} posts`);
});
```

**ソート順**:
- 記事数の多い順

---

### getTagBySlug()
指定されたslugのタグ情報を取得します。

**シグネチャ**:
```typescript
function getTagBySlug(slug: string): Tag | null
```

**パラメータ**:
- `slug` (string): タグのスラッグ

**戻り値**:
- `Tag`: タグが見つかった場合
- `null`: タグが見つからない場合

**使用例**:
```typescript
const tag = getTagBySlug('nextjs');
if (tag) {
  console.log(`Tag: ${tag.name}, Posts: ${tag.count}`);
}
```

---

### generateTagSlug()
タグ名からスラッグを生成します。

**シグネチャ**:
```typescript
function generateTagSlug(tagName: string): string
```

**パラメータ**:
- `tagName` (string): タグ名

**戻り値**:
- `string`: URL用スラッグ

**使用例**:
```typescript
const slug = generateTagSlug('Next.js');
console.log(slug); // "nextjs"

const slug2 = generateTagSlug('TypeScript 入門');
console.log(slug2); // "typescript-ru-men"
```

**変換ルール**:
- 小文字に変換
- 空白をハイフンに置換
- 特殊文字を削除
- URLエンコード

---

## 検索API (search.ts)

### searchPosts()
記事を検索します。

**シグネチャ**:
```typescript
function searchPosts(query: string, options?: SearchOptions): Post[]
```

**パラメータ**:
```typescript
interface SearchOptions {
  fields?: Array<'title' | 'content' | 'description' | 'tags'>;
  limit?: number;
  threshold?: number; // 類似度のしきい値 (0-1)
}
```

**戻り値**:
- `Post[]`: 検索結果の記事配列

**使用例**:
```typescript
// タイトルとコンテンツから検索
const results = searchPosts('Next.js', {
  fields: ['title', 'content'],
  limit: 10,
});

// すべてのフィールドから検索
const results2 = searchPosts('TypeScript');
```

---

### buildSearchIndex()
検索インデックスを構築します。

**シグネチャ**:
```typescript
function buildSearchIndex(posts: Post[]): SearchIndex
```

**パラメータ**:
- `posts` (Post[]): インデックス化する記事配列

**戻り値**:
- `SearchIndex`: 検索インデックス

**使用例**:
```typescript
const posts = getAllPosts();
const searchIndex = buildSearchIndex(posts);
// クライアントサイドに渡してローカル検索に使用
```

---

## ユーティリティAPI (utils.ts)

### formatDate()
日付をフォーマットします。

**シグネチャ**:
```typescript
function formatDate(date: string | Date, format?: string): string
```

**パラメータ**:
- `date` (string | Date): 日付
- `format` (string): フォーマット文字列（デフォルト: 'yyyy-MM-dd'）

**戻り値**:
- `string`: フォーマットされた日付文字列

**使用例**:
```typescript
const formatted = formatDate('2025-10-16');
console.log(formatted); // "2025年10月16日"

const formatted2 = formatDate('2025-10-16', 'yyyy/MM/dd');
console.log(formatted2); // "2025/10/16"
```

---

### cn()
Tailwind CSSクラス名を結合します（clsxラッパー）。

**シグネチャ**:
```typescript
function cn(...inputs: ClassValue[]): string
```

**パラメータ**:
- `inputs` (ClassValue[]): クラス名、オブジェクト、配列

**戻り値**:
- `string`: 結合されたクラス名文字列

**使用例**:
```typescript
const className = cn(
  'base-class',
  isActive && 'active-class',
  { 'error-class': hasError },
  'additional-class'
);
```

---

### slugify()
文字列をスラッグに変換します。

**シグネチャ**:
```typescript
function slugify(text: string): string
```

**パラメータ**:
- `text` (string): 変換する文字列

**戻り値**:
- `string`: スラッグ

**使用例**:
```typescript
const slug = slugify('Hello World!');
console.log(slug); // "hello-world"

const slug2 = slugify('日本語のタイトル');
console.log(slug2); // "ri-ben-yu-notaitoru"
```

---

### truncate()
文字列を指定文字数で切り詰めます。

**シグネチャ**:
```typescript
function truncate(text: string, length: number, suffix?: string): string
```

**パラメータ**:
- `text` (string): 切り詰める文字列
- `length` (number): 最大文字数
- `suffix` (string): 末尾に追加する文字列（デフォルト: '...'）

**戻り値**:
- `string`: 切り詰められた文字列

**使用例**:
```typescript
const short = truncate('This is a long text', 10);
console.log(short); // "This is a..."

const short2 = truncate('短いテキスト', 10);
console.log(short2); // "短いテキスト" (そのまま)
```

---

## エラーハンドリング

すべてのAPI関数は以下のエラーハンドリングを行います:

### 記事が見つからない場合
```typescript
const post = getPostBySlug('non-existent');
// 戻り値: null
```

### ファイル読み込みエラー
```typescript
try {
  const posts = getAllPosts();
} catch (error) {
  console.error('Failed to load posts:', error);
  // 空配列を返すか、エラーを再スロー
}
```

### Markdownパースエラー
```typescript
try {
  const { frontMatter, content } = parseMarkdown(invalidMarkdown);
} catch (error) {
  console.error('Invalid markdown format:', error);
  throw new Error('Failed to parse markdown');
}
```

---

## 型定義

### PostFrontMatter
```typescript
interface PostFrontMatter {
  title: string;
  date: string;
  updated?: string;
  tags: string[];
  description: string;
  image?: string;
  draft: boolean;
  author?: string;
}
```

### Post
```typescript
interface Post {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string;          // Markdown本文
  htmlContent: string;      // HTML変換後
  readingTime: number;      // 読了時間（分）
  excerpt: string;          // 抜粋
}
```

### Tag
```typescript
interface Tag {
  name: string;   // タグ名
  count: number;  // 記事数
  slug: string;   // URL用スラッグ
}
```

---

## パフォーマンス考慮事項

### キャッシング
```typescript
// ビルド時にすべての記事を取得してキャッシュ
const allPosts = getAllPosts();

// 以降はキャッシュから取得
const post = allPosts.find(p => p.slug === slug);
```

### 遅延読み込み
```typescript
// 必要になるまでHTMLコンテンツを生成しない
const posts = getAllPosts().map(post => ({
  ...post,
  htmlContent: null, // あとで生成
}));
```

### インデックス構築
```typescript
// 検索インデックスは初回のみ構築
let searchIndex: SearchIndex | null = null;

export function getSearchIndex() {
  if (!searchIndex) {
    searchIndex = buildSearchIndex(getAllPosts());
  }
  return searchIndex;
}
```

---

## テスト例

### posts.tsのテスト
```typescript
import { describe, it, expect } from 'vitest';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

describe('posts API', () => {
  describe('getAllPosts', () => {
    it('should return array of posts', () => {
      const posts = getAllPosts();
      expect(posts).toBeInstanceOf(Array);
    });

    it('should exclude drafts by default', () => {
      const posts = getAllPosts();
      const hasDrafts = posts.some(p => p.frontMatter.draft);
      expect(hasDrafts).toBe(false);
    });
  });

  describe('getPostBySlug', () => {
    it('should return post for valid slug', () => {
      const post = getPostBySlug('valid-slug');
      expect(post).not.toBeNull();
      expect(post?.slug).toBe('valid-slug');
    });

    it('should return null for invalid slug', () => {
      const post = getPostBySlug('invalid-slug');
      expect(post).toBeNull();
    });
  });
});
```

---

## まとめ

- **記事API**: 記事の取得、フィルタリング、前後記事の取得
- **Markdown API**: パース、HTML変換、目次生成、読了時間計算
- **タグAPI**: タグ一覧、タグ別記事取得、スラッグ生成
- **検索API**: 全文検索、検索インデックス構築
- **ユーティリティ**: 日付フォーマット、クラス名結合、スラッグ化

すべてのAPIは型安全で、適切なエラーハンドリングを行います。
