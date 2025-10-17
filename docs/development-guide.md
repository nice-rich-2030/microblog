# 開発ガイド

## 概要
このドキュメントは、マイクロブログプロジェクトの開発環境のセットアップから、開発フロー、コーディング規約まで、開発に必要な情報をまとめています。

---

## 目次
1. [環境構築](#環境構築)
2. [開発フロー](#開発フロー)
3. [コーディング規約](#コーディング規約)
4. [記事の追加方法](#記事の追加方法)
5. [コンポーネント開発](#コンポーネント開発)
6. [スタイリング](#スタイリング)
7. [テスト](#テスト)
8. [トラブルシューティング](#トラブルシューティング)

---

## 環境構築

### 必要な環境
- **Node.js**: 20.x以上（推奨: 20.11.0以上）
- **pnpm**: 8.x以上（推奨: 9.x）
- **Git**: 2.x以上
- **エディタ**: VSCode推奨

### 初期セットアップ

#### 1. プロジェクトのクローン
```bash
git clone <repository-url>
cd microblog
```

#### 2. 依存関係のインストール
```bash
pnpm install
```

#### 3. 環境変数の設定
```bash
cp .env.example .env.local
```

`.env.local`を編集:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=My Tech Blog
```

#### 4. 開発サーバーの起動
```bash
pnpm dev
```

ブラウザで`http://localhost:3000`にアクセス

---

## 開発フロー

### 1. 新機能開発の流れ

#### ブランチ戦略
```bash
# 新機能開発
git checkout -b feature/post-search

# バグ修正
git checkout -b fix/tag-filtering

# ドキュメント更新
git checkout -b docs/update-readme
```

#### 開発ステップ
1. **イシュー確認**: 何を作るか明確にする
2. **ブランチ作成**: 適切な名前でブランチを切る
3. **実装**: コーディング規約に従って実装
4. **テスト**: 動作確認とテストコード作成
5. **コミット**: わかりやすいコミットメッセージ
6. **プッシュ＆PR**: レビュー依頼

### 2. コミットメッセージ規約

**フォーマット**:
```
<type>: <subject>

<body>（オプション）
```

**Type一覧**:
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント変更
- `style`: コードスタイル変更（機能に影響なし）
- `refactor`: リファクタリング
- `perf`: パフォーマンス改善
- `test`: テスト追加・修正
- `chore`: ビルド・設定変更

**例**:
```bash
git commit -m "feat: add full-text search functionality"
git commit -m "fix: resolve tag filtering bug on mobile"
git commit -m "docs: update development guide"
```

### 3. Pull Request作成

**PRテンプレート**:
```markdown
## 変更内容
- 記事検索機能を追加
- FlexSearchを使用した全文検索を実装

## 関連イシュー
Closes #123

## テスト
- [ ] ローカルで動作確認済み
- [ ] レスポンシブ対応確認済み
- [ ] ビルドエラーなし

## スクリーンショット
（必要に応じて）
```

---

## コーディング規約

### TypeScript

#### 型定義
```typescript
// ✅ 良い例: 明示的な型定義
interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

function getPost(slug: string): Post | null {
  // ...
}

// ❌ 悪い例: anyの使用
function getPost(slug: any): any {
  // ...
}
```

#### 型推論の活用
```typescript
// ✅ 良い例: 型推論で十分な場合
const posts = getAllPosts(); // Post[]と推論される
const count = posts.length;  // numberと推論される

// ❌ 悪い例: 冗長な型指定
const count: number = posts.length;
```

### React / Next.js

#### サーバーコンポーネント vs クライアントコンポーネント

**デフォルトはサーバーコンポーネント**:
```typescript
// app/posts/page.tsx
// サーバーコンポーネント（デフォルト）
export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
```

**必要な場合のみクライアントコンポーネント**:
```typescript
// components/Search/SearchBar.tsx
'use client';

import { useState } from 'react';

export function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
```

**使い分けの基準**:
- **サーバーコンポーネント**: データ取得、静的表示
- **クライアントコンポーネント**: インタラクティブ、useState/useEffect使用

#### コンポーネント構造
```typescript
// ✅ 推奨構造
import { FC } from 'react';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact';
}

export const PostCard: FC<PostCardProps> = ({
  post,
  variant = 'default'
}) => {
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </article>
  );
};
```

#### Props destructuring
```typescript
// ✅ 良い例: 分割代入
export function PostCard({ post, className }: PostCardProps) {
  return <div className={className}>{post.title}</div>;
}

// ❌ 悪い例: props.xxxの繰り返し
export function PostCard(props: PostCardProps) {
  return <div className={props.className}>{props.post.title}</div>;
}
```

### 命名規則

#### 変数・関数
```typescript
// camelCase
const postCount = 10;
const getUserById = (id: string) => { /* ... */ };
```

#### コンポーネント・型
```typescript
// PascalCase
interface PostCardProps { }
const PostCard: FC<PostCardProps> = () => { };
```

#### 定数
```typescript
// UPPER_SNAKE_CASE
const MAX_POST_COUNT = 100;
const API_BASE_URL = 'https://api.example.com';
```

#### ブーリアン変数
```typescript
// is/has/canプレフィックス
const isLoading = true;
const hasError = false;
const canEdit = true;
```

### ファイル構成

#### コンポーネントファイル
```typescript
// components/Post/PostCard.tsx

// 1. import文（順序: React → 外部 → 内部 → 型 → スタイル）
import { FC } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

import { TagBadge } from '@/components/Tag/TagBadge';
import { cn } from '@/lib/utils';
import type { Post } from '@/types';

// 2. 型定義
interface PostCardProps {
  post: Post;
  className?: string;
}

// 3. コンポーネント定義
export const PostCard: FC<PostCardProps> = ({ post, className }) => {
  // 4. 早期リターン
  if (!post) return null;

  // 5. ロジック
  const formattedDate = format(new Date(post.date), 'yyyy-MM-dd');

  // 6. JSX return
  return (
    <article className={cn('post-card', className)}>
      <Link href={`/posts/${post.slug}`}>
        <h2>{post.title}</h2>
        <time dateTime={post.date}>{formattedDate}</time>
        <div>
          {post.tags.map(tag => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </Link>
    </article>
  );
};
```

---

## 記事の追加方法

### 1. Markdownファイルを作成

**場所**: `content/posts/my-new-post.md`

**テンプレート**:
```markdown
---
title: "記事のタイトル"
date: "2025-10-16"
tags: ["Next.js", "TypeScript", "React"]
description: "記事の概要（100-160文字推奨）"
image: "/images/posts/my-new-post-cover.jpg"
draft: false
---

## はじめに

記事の内容をここに書きます。

## コード例

\`\`\`typescript
const hello = "world";
console.log(hello);
\`\`\`

## まとめ

まとめの内容。
```

### 2. 画像の配置（オプション）

記事用の画像は`public/images/posts/`に配置:
```
public/images/posts/
├── my-new-post-cover.jpg
└── my-new-post-diagram.png
```

Markdown内での参照:
```markdown
![説明文](/images/posts/my-new-post-diagram.png)
```

### 3. 下書き管理

**下書き状態**:
```yaml
---
draft: true
---
```

下書きは本番ビルドから除外されます。

### 4. コミット＆プッシュ

```bash
git add content/posts/my-new-post.md
git commit -m "feat: add new post about Next.js 15"
git push origin main
```

Vercelが自動的にデプロイします。

---

## コンポーネント開発

### shadcn/uiコンポーネントの追加

```bash
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add card
pnpm dlx shadcn-ui@latest add input
```

追加されたコンポーネントは`components/ui/`に配置されます。

### カスタムコンポーネントの作成

#### 1. ファイル作成
```bash
components/Post/PostCard.tsx
```

#### 2. 型定義
```typescript
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact';
  className?: string;
}
```

#### 3. 実装
```typescript
export const PostCard: FC<PostCardProps> = ({
  post,
  variant = 'default',
  className
}) => {
  // 実装
};
```

#### 4. エクスポート
```typescript
// components/Post/index.ts
export { PostCard } from './PostCard';
export { PostList } from './PostList';
```

### コンポーネント設計原則

1. **単一責任の原則**: 1つのコンポーネントは1つの役割
2. **小さく保つ**: 100行以内を目安
3. **再利用性**: 汎用的に使えるように設計
4. **Propsは最小限**: 必要なPropsのみ
5. **型安全**: TypeScriptで型を明示

---

## スタイリング

### Tailwind CSS

#### クラス名の順序
```typescript
// 推奨順序: レイアウト → ボックスモデル → タイポグラフィ → 視覚効果 → その他
<div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
```

#### cn()ユーティリティの使用
```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'base-class',
  variant === 'primary' && 'primary-class',
  isActive && 'active-class',
  className
)} />
```

#### レスポンシブデザイン
```typescript
<div className="text-sm md:text-base lg:text-lg">
  レスポンシブテキスト
</div>
```

### カスタムスタイル

グローバルスタイルは`app/globals.css`に:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
}

@layer components {
  .post-card {
    @apply rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow;
  }
}
```

---

## テスト

### 単体テスト（準備中）

```typescript
// __tests__/lib/posts.test.ts
import { describe, it, expect } from 'vitest';
import { getAllPosts } from '@/lib/posts';

describe('getAllPosts', () => {
  it('should return all published posts', () => {
    const posts = getAllPosts();
    expect(posts).toBeInstanceOf(Array);
    expect(posts[0]).toHaveProperty('slug');
  });
});
```

### E2Eテスト（準備中）

```typescript
// e2e/posts.spec.ts
import { test, expect } from '@playwright/test';

test('should display post list', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.post-card')).toHaveCount(3);
});
```

---

## トラブルシューティング

### ビルドエラー

#### `Module not found`
```bash
# キャッシュクリア
rm -rf .next
pnpm install
pnpm dev
```

#### TypeScriptエラー
```bash
# 型チェック
pnpm tsc --noEmit
```

### 開発サーバーの問題

#### ポートが使用中
```bash
# ポート3000を使用しているプロセスを終了
lsof -ti:3000 | xargs kill -9

# または別ポートで起動
pnpm dev -- -p 3001
```

#### Hot Reloadが効かない
```bash
# サーバー再起動
Ctrl + C
pnpm dev
```

### Markdownの表示問題

#### シンタックスハイライトが効かない
- フロントマターの確認
- コードブロックの言語指定を確認
- `rehype-highlight`の設定を確認

#### 画像が表示されない
- パスが正しいか確認（`/images/posts/xxx.jpg`）
- `public/`ディレクトリに画像があるか確認
- ファイル名の大文字小文字を確認

---

## よく使うコマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# ビルド結果を確認
pnpm start

# Lint
pnpm lint

# Lintエラー自動修正
pnpm lint --fix

# 型チェック
pnpm tsc --noEmit

# shadcn/uiコンポーネント追加
pnpm dlx shadcn-ui@latest add <component-name>

# 依存関係の更新
pnpm update

# キャッシュクリア
rm -rf .next node_modules
pnpm install
```

---

## パフォーマンス最適化

### 画像最適化
```typescript
import Image from 'next/image';

<Image
  src="/images/posts/cover.jpg"
  alt="カバー画像"
  width={800}
  height={400}
  priority // above the foldの画像に使用
/>
```

### 動的インポート
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### メタデータ最適化
```typescript
// app/posts/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}
```

---

## セキュリティ

### Markdownサニタイゼーション
- `remark-gfm`で安全なMarkdown変換
- XSS対策として不要なHTMLタグは削除

### 環境変数の管理
- `.env.local`は`.gitignore`に追加
- 公開情報のみ`NEXT_PUBLIC_`プレフィックス使用
- 機密情報はVercelの環境変数に設定

---

## リソース

### 公式ドキュメント
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### 参考記事
- [Next.js App Router Best Practices](https://nextjs.org/docs/app/building-your-application)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

## まとめ

- **環境構築**: Node.js 20+ / pnpm / VSCode
- **開発フロー**: ブランチ戦略、コミット規約、PR作成
- **コーディング規約**: TypeScript型定義、命名規則、コンポーネント設計
- **記事追加**: Markdownファイル作成、フロントマター記述、Git経由でデプロイ
- **スタイリング**: Tailwind CSS、shadcn/ui、レスポンシブ対応

このガイドに従うことで、一貫性のある高品質なコードを維持できます。
