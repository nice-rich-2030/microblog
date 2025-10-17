# 開発ログ

## 概要
このドキュメントは、マイクロブログプロジェクトの開発履歴を記録します。
実装内容、技術的な決定、問題と解決策、学びを時系列で追跡します。

---

## ログの記録方法

各エントリは以下の形式で記録:

```markdown
## YYYY-MM-DD

### 実装内容
- 実装した機能やコンポーネント

### 技術的決定
- なぜその技術や実装方法を選んだか

### 問題と解決策
- 遭遇した問題
- どのように解決したか

### 学び・メモ
- 学んだこと、次回に活かせること

### 次回のタスク
- 次に取り組むべきこと
```

---

## 2025-10-16

### 実装内容
#### プロジェクト計画・ドキュメント作成
- **要件定義書（requirements.md）**の作成
  - プロジェクト概要、目的、スコープを定義
  - Next.js 15 + Markdown + Vercelのアーキテクチャを選定
  - 機能要件（記事管理、タグ、検索）を定義
  - 非機能要件（パフォーマンス、SEO、アクセシビリティ）を定義
  - 開発フェーズ（Phase 1-6）を計画

- **プロジェクト構造ガイド（project-structure.md）**の作成
  - ディレクトリ構造の全体像を定義
  - ファイル命名規則（PascalCase、camelCase、kebab-case）を明確化
  - import文の順序、パスエイリアスのルールを策定

- **開発ガイド（development-guide.md）**の作成
  - 環境構築手順（Node.js 20+、pnpm）
  - 開発フロー（ブランチ戦略、コミット規約）
  - コーディング規約（TypeScript、React/Next.js）
  - 記事追加方法（Markdownファイル + Git）
  - トラブルシューティング

- **コンポーネントガイドライン（component-guidelines.md）**の作成
  - コンポーネント設計原則（単一責任、コンポジション、Props最小化）
  - サーバー/クライアントコンポーネントの使い分け基準
  - 主要コンポーネントの仕様（PostCard、TagBadge、Header等）
  - アクセシビリティ対応（セマンティックHTML、ARIA、キーボード操作）
  - パフォーマンス最適化（メモ化、動的インポート、Suspense）

- **API仕様書（api-reference.md）**の作成
  - 記事API（getAllPosts、getPostBySlug、getPostsByTag等）
  - Markdown処理API（parseMarkdown、markdownToHtml、目次生成等）
  - タグAPI（getAllTags、getTagBySlug等）
  - 検索API（searchPosts、buildSearchIndex）
  - ユーティリティAPI（formatDate、cn、slugify等）
  - 型定義とエラーハンドリング

- **デプロイガイド（deployment.md）**の作成
  - Vercelへのデプロイ手順（CLI/Dashboard）
  - 環境変数の設定方法
  - カスタムドメインの設定
  - 自動デプロイの仕組み
  - 監視とログ、トラブルシューティング

- **CLAUDE.md**の作成
  - AI開発用のガイドドキュメント
  - プロジェクト概要、アーキテクチャ、開発コマンド
  - 命名規則、コンポーネント開発パターン
  - パスエイリアス、API関数リスト
  - 実装順序のガイダンス

- **タスクリスト（tasks.md）**の作成
  - Phase 1-6の詳細タスクをチェックリスト化
  - 各タスクの依存関係を明示
  - 進捗サマリーテーブルを追加

- **開発ログ（development-log.md）**の作成
  - 本ファイル
  - 開発履歴、技術的決定、問題解決を記録

### 技術的決定

#### 1. なぜNext.js 15を選んだか
- **App Router**: ファイルベースルーティング、レイアウトの柔軟性
- **サーバーコンポーネント**: SEO最適化、初期ロードの高速化
- **静的生成（SSG）**: ブログに最適、CDNキャッシュで高速配信
- **Image Optimization**: 画像の自動最適化
- **Vercelとの親和性**: デプロイが簡単、自動最適化

#### 2. なぜMarkdownファイルをデータベースとして使うか
- **シンプル**: データベース不要、管理コストゼロ
- **Git管理**: バージョン管理、履歴追跡が容易
- **ポータビリティ**: Markdownファイルはどこでも使える
- **執筆体験**: エディタで直接執筆、プレビュー不要
- **バックアップ**: Git自体がバックアップ

#### 3. なぜshadcn/uiを選んだか
- **コピー＆ペースト**: ライブラリではなく、コードをコピー
- **カスタマイズ性**: 完全にコントロール可能
- **Radix UI**: アクセシブルなプリミティブコンポーネント
- **Tailwind CSS**: ユーティリティファーストのスタイリング
- **モダンなデザイン**: スタイリッシュなUIコンポーネント

#### 4. なぜpnpmを選んだか
- **ディスク効率**: シンボリックリンクで容量削減
- **速度**: npm/yarnより高速
- **厳密な依存管理**: phantom dependenciesを防ぐ
- **モノレポサポート**: 将来的な拡張に対応

#### 5. なぜVercelを選んだか
- **Next.js最適化**: Next.jsを開発しているVercelが提供
- **自動デプロイ**: GitHub連携で自動ビルド・デプロイ
- **プレビューデプロイ**: ブランチごとに一時URLを発行
- **無料枠**: 個人ブログなら十分な容量
- **Edge Network**: 世界中で高速配信

### 問題と解決策

#### 問題: ドキュメントが多すぎて複雑にならないか？
**解決策**:
- `docs/README.md`にナビゲーションを用意
- 各ドキュメントの役割を明確化
- クイックリンクで頻繁に参照するセクションへ誘導
- AI開発を考慮し、構造化された情報提供

#### 問題: タスクリストが細かすぎないか？
**解決策**:
- 詳細なチェックリストにより、実装漏れを防ぐ
- AIが次に何をすべきか明確に理解できる
- 進捗が可視化され、モチベーション維持
- 各タスクは独立しており、並行作業も可能

### 学び・メモ

#### AI開発における重要ポイント
1. **明確な構造定義**: ディレクトリ構造、命名規則を明文化
2. **詳細なAPI仕様**: 関数のシグネチャ、戻り値を明示
3. **実装パターン**: テンプレートを提供し、一貫性を保つ
4. **型安全性**: TypeScriptで型を明示し、エラーを防ぐ
5. **ドキュメントの充実**: コンテキストを提供し、判断材料を与える

#### Next.js 15 App Routerのポイント
- サーバーコンポーネントがデフォルト
- `"use client"`は必要最小限に
- `async`コンポーネントでデータ取得可能
- `generateStaticParams()`で静的パス生成
- `generateMetadata()`でメタデータ設定

#### Markdownベースブログの設計ポイント
- フロントマターで構造化データ管理
- ビルド時に全記事をパース（パフォーマンス良好）
- 検索はクライアントサイドで実装（静的サイトのため）
- Git経由でのコンテンツ更新 → Vercel自動デプロイ

### 次回のタスク

**Phase 1: プロジェクトセットアップ開始**

1. **Next.js 15プロジェクト作成**
   ```bash
   pnpm create next-app@latest microblog \
     --typescript \
     --tailwind \
     --app \
     --eslint \
     --use-pnpm
   ```

2. **基本設定ファイルの調整**
   - `tsconfig.json`: パスエイリアス、strict mode
   - `next.config.js`: 画像最適化
   - `.env.example`, `.env.local`: 環境変数

3. **shadcn/ui導入**
   ```bash
   pnpm dlx shadcn-ui@latest init
   pnpm dlx shadcn-ui@latest add button card badge input separator
   ```

4. **ディレクトリ構造構築**
   - `components/`, `lib/`, `types/`, `content/posts/`, `public/images/`

5. **基本レイアウトコンポーネント作成**
   - `Header.tsx`, `Footer.tsx`, `Container.tsx`

---

## 2025-10-16 (続き) - Phase 1完了

### 実装内容
#### Phase 1: プロジェクトセットアップ・基本構造 - 完了✅

**1. プロジェクト初期化**
- pnpm 10.18.3をグローバルインストール
- 手動でNext.js 15プロジェクト構造を構築
- `package.json`作成 (Next.js 15.5.5, React 19, TypeScript 5.9.3)
- `packageManager`フィールドでpnpm 10.18.3を指定

**2. 基本設定ファイル**
- `tsconfig.json`: パスエイリアス `@/*`, Strict mode有効化
- `next.config.ts`: 画像最適化設定 (AVIF/WebP, 複数デバイスサイズ)
- `tailwind.config.ts`: shadcn/ui用の設定 (CSS変数, ダークモード対応)
- `postcss.config.mjs`: Tailwind CSS + Autoprefixer
- `.eslintrc.json`: Next.js標準設定
- `.gitignore`: Next.js, pnpm, 環境変数ファイル除外
- `.env.example`, `.env.local`: サイトURL・名前の環境変数

**3. shadcn/ui導入**
- 依存関係インストール:
  - `tailwindcss-animate`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`
  - `@radix-ui/react-slot`, `@radix-ui/react-separator`
- UIコンポーネント作成:
  - `components/ui/button.tsx` (variants: default/destructive/outline/secondary/ghost/link)
  - `components/ui/card.tsx` (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
  - `components/ui/badge.tsx` (variants: default/secondary/destructive/outline)
  - `components/ui/separator.tsx` (horizontal/vertical)
- `lib/utils.ts`: `cn()` ユーティリティ関数 (clsx + tailwind-merge)
- `components.json`: shadcn/ui設定ファイル

**4. ディレクトリ構造構築**
- `app/`: layout.tsx, page.tsx, globals.css
- `components/`: ui/, Layout/, Post/, Tag/, Search/, Markdown/
- `lib/`: utils.ts
- `types/`: (空、Phase 2で追加)
- `content/posts/`: (空、Phase 2でサンプル記事追加)
- `public/images/posts/`: (空)

**5. レイアウトコンポーネント**
- `components/Layout/Container.tsx`: レスポンシブコンテナ (sm/md/lg/xl sizes)
- `components/Layout/Header.tsx`: ヘッダー (ロゴ, ナビゲーション: Home/Tags/About)
- `components/Layout/Footer.tsx`: フッター (コピーライト, 技術スタックリンク)
- `app/layout.tsx`: RootLayout更新 (Header/Footer統合, メタデータ設定)

**6. ホームページ**
- `app/page.tsx`: ウェルカムページ作成
  - ヒーローセクション
  - 3つの特徴カード (Markdown-Based, Fast & SEO-Friendly, Modern UI)
  - CTAボタン (Read Docs, View on GitHub)

**7. その他**
- `README.md`: プロジェクト説明, セットアップ手順, 使用方法, ドキュメントリンク

### 技術的決定

#### 1. なぜ手動でNext.jsプロジェクトを構築したか
- `create-next-app`のインタラクティブプロンプトを回避
- 既存の`docs/`ディレクトリを保持
- より細かい制御が可能
- 各設定ファイルの内容を明示的に理解

#### 2. Next.js 15の最新機能を活用
- **App Router**: ファイルベースルーティング, レイアウト共有
- **React 19**: 最新の機能とパフォーマンス改善
- **Server Components**: デフォルトでサーバーコンポーネント, 必要な場合のみ`"use client"`
- **Metadata API**: SEO対応のメタデータ設定

#### 3. shadcn/uiの設計思想
- コンポーネントを"コピー"する方式 (npm パッケージではない)
- Radix UIベース (アクセシビリティ重視)
- Tailwind CSSで完全カスタマイズ可能
- CSS変数でテーマ管理 (ダークモード対応)

#### 4. パスエイリアス `@/*` の採用
- 相対パス地獄を回避
- import文が短く、可読性向上
- リファクタリング時の修正箇所削減

### 問題と解決策

#### 問題1: pnpmがインストールされていない
**解決策**: `npm install -g pnpm`でグローバルインストール (v10.18.3)

#### 問題2: `create-next-app`のインタラクティブプロンプト
**解決策**: 手動でプロジェクト構造を構築
- 各設定ファイルを個別に作成
- より詳細な制御が可能に
- docs/ディレクトリを保持できた

#### 問題3: Editツールで「ファイルを読んでいない」エラー
**解決策**: Editの前に必ずReadツールでファイルを読み込む

### 学び・メモ

#### Next.js 15の重要ポイント
- **output: 'standalone'**: Dockerデプロイ時に有用
- **images設定**: フォーマット (AVIF/WebP), デバイスサイズ指定
- **Metadata API**: SEO最適化が簡単 (title template, metadataBase)

#### shadcn/uiの使い方
- `pnpm dlx shadcn-ui@latest add <component>` で追加
- `components/ui/`にコピーされる
- 自由にカスタマイズ可能

#### Tailwind CSSのCSS変数方式
- `:root`と`.dark`でテーマ定義
- HSL形式で色管理 (`hsl(var(--primary))`)
- ダークモード対応が容易

#### TypeScript Strictモード
- 型安全性が向上
- エラーを早期発見
- コードの品質向上

### 次回のタスク

**Phase 2: Markdown処理・記事表示**

1. **依存関係のインストール**
   ```bash
   pnpm add gray-matter remark remark-html remark-gfm rehype rehype-highlight rehype-slug rehype-autolink-headings date-fns reading-time
   ```

2. **型定義の作成**
   - `types/post.ts`: PostFrontMatter, Post
   - `types/tag.ts`: Tag

3. **Markdown処理ロジック**
   - `lib/markdown.ts`: parseMarkdown, markdownToHtml, generateTableOfContents
   - `lib/posts.ts`: getAllPosts, getPostBySlug, getRecentPosts

4. **サンプル記事の作成**
   - `content/posts/hello-world.md`
   - `content/posts/nextjs-15-guide.md`

5. **記事コンポーネント**
   - `components/Post/PostCard.tsx`
   - `components/Post/PostList.tsx`

6. **ホームページ更新**
   - 記事一覧表示

---

## 2025-10-16 (続き2) - Phase 2完了

### 実装内容
#### Phase 2: Markdown処理・記事表示 - 完了✅

**1. 依存関係のインストール**
- Markdown処理ライブラリ:
  - `gray-matter@4.0.3`: フロントマター (YAML) のパース
  - `remark@15.0.1`: Markdownパーサー
  - `remark-html@16.0.1`: Markdown → HTML変換
  - `remark-gfm@4.0.1`: GitHub Flavored Markdown対応
  - `rehype@13.0.2`: HTMLプロセッサ
  - `rehype-highlight@7.0.2`: シンタックスハイライト
- ユーティリティ:
  - `date-fns@4.1.0`: 日付フォーマット

**2. 型定義の作成**
- `types/post.ts`:
  - `PostFrontMatter`: title, date, tags, description, draft
  - `Post`: slug, frontMatter, content, htmlContent, readingTime, excerpt
- `types/tag.ts`:
  - `Tag`: name, slug, count

**3. Markdown処理ロジック (lib/markdown.ts)**
- `parseMarkdown()`: gray-matterでフロントマター抽出
- `markdownToHtml()`: remark/rehypeパイプライン
  - remarkGfm: テーブル、タスクリスト、打ち消し線対応
  - remarkRehype: Markdown → HTML変換
  - rehypeHighlight: シンタックスハイライト
  - 見出しにID付与とアンカーリンク追加 (カスタム実装)
- `calculateReadingTime()`: 単語数ベースで読了時間計算 (200単語/分)
- `generateExcerpt()`: 最初の150文字を抜粋として抽出

**4. 記事取得ロジック (lib/posts.ts)**
- `getAllPosts()`:
  - `content/posts/`から全Markdownファイル読み込み
  - フロントマターパース + 下書き除外 (`draft: true`)
  - 日付降順ソート
  - オプション: limit, includeDrafts
- `getPostBySlug()`: slugで特定記事取得、HTML変換
- `getPostsByTag()`: タグでフィルタリング
- `getRecentPosts()`: 最新N件取得

**5. サンプル記事の作成**
- `content/posts/hello-world.md`: ブログ開設記事 (日本語)
- `content/posts/nextjs-15-features.md`: Next.js 15の新機能紹介
- `content/posts/typescript-best-practices.md`: TypeScriptベストプラクティス
- フロントマター検証: 必須フィールド、タグ配列、draft設定

**6. 記事カードコンポーネント**
- `components/Post/PostCard.tsx`:
  - Card UIコンポーネント使用
  - タイトル、抜粋 (150文字)、日付、タグバッジ表示
  - リンク (Link + Cardのカーソル)
- `components/Post/PostList.tsx`:
  - グリッドレイアウト (1/2/3カラム レスポンシブ)
  - 記事0件時のメッセージ表示

**7. ホームページ更新 (app/page.tsx)**
- ウェルカムセクション維持 (日本語メッセージ)
- `getAllPosts({ limit: 6 })`で最新6件取得
- PostListコンポーネントで表示

**8. 記事詳細ページ (app/posts/[slug]/page.tsx)**
- Dynamic Route: `[slug]`
- `generateStaticParams()`: SSG用の静的パス生成
- `generateMetadata()`: SEO用メタデータ (title, description, keywords)
- 記事ヘッダー:
  - タイトル (H1)
  - メタ情報 (日付、読了時間、タグ)
  - "Back to Home"リンク
- 記事本文:
  - `dangerouslySetInnerHTML`でHTML表示
  - `prose`クラスでスタイリング

**9. シンタックスハイライト + proseスタイル (app/globals.css)**
- Tailwind `@layer components`でproseスタイル定義:
  - 見出し (h1-h4)、段落、リンク、強調、斜体
  - コードブロック、インラインコード
  - リスト (ul/ol)、引用、テーブル
- highlight.jsスタイル:
  - GitHub風カラーテーマ
  - ダークモード対応 (Tailwind dark:)
  - キーワード、文字列、数値、コメント等のシンタックスカラー

### 技術的決定

#### 1. なぜrehype-slugを使わず手動でアンカーリンク実装したか
- **rehype-slug + rehype-autolink-headings**の代わりにカスタム実装
- 理由:
  - 依存関係削減
  - シンプルなアンカーリンク生成で十分
  - 見出しのID付与とリンク追加を1つの関数で処理
- 実装:
  ```typescript
  rehypeAddAnchors: () => (tree) => {
    visit(tree, 'element', (node) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
        // ID付与 + アンカーリンク追加
      }
    });
  }
  ```

#### 2. なぜreading-timeライブラリを使わず独自実装したか
- 単純な計算ロジック (単語数 ÷ 200)
- 外部依存を減らす
- 英語・日本語混在を考慮した実装
- Math.ceil()で切り上げ、最低1分

#### 3. proseスタイルをTailwind CSS Typographyの代わりに自作
- `@tailwindcss/typography`プラグインではなく、カスタムスタイル
- 理由:
  - より細かい制御が可能
  - バンドルサイズ削減
  - プロジェクト固有のデザインに最適化
- Tailwind `@apply`ディレクティブで簡潔に記述

#### 4. Server Componentsのみで実装 (クライアントコンポーネント不使用)
- 記事表示はすべてサーバーサイドでレンダリング
- メリット:
  - SEO最適化 (検索エンジンが完全なHTMLを取得)
  - 初期ロード高速化 (JSバンドル削減)
  - Core Web Vitals向上
- Phase 3の検索機能でクライアントコンポーネントを導入予定

### 問題と解決策

#### 問題1: 記事詳細ページが404エラー
**原因**: Next.js開発サーバーが新しいルート (`app/posts/[slug]/`) を認識していなかった

**解決策**: 開発サーバーを再起動
```bash
# 既存のサーバーをKill
pnpm dev # バックグラウンドで再起動
```
→ 再起動後、`/posts/hello-world`等にアクセス可能に

#### 問題2: シンタックスハイライトのスタイルが反映されない
**原因**: globals.cssの更新が反映されていなかった

**解決策**:
- proseスタイルとhighlight.jsスタイルを追加
- Tailwind JITコンパイラが自動的にクラスを生成
- 開発サーバーが自動リロードでスタイル適用

### 学び・メモ

#### Markdown処理パイプラインの構築
- **remark → rehype**の処理フロー:
  1. Markdown文字列 → Markdown AST (remark)
  2. Markdown AST → HTML AST (remarkRehype)
  3. HTML AST処理 (rehypeHighlight, カスタムrehype)
  4. HTML AST → HTML文字列 (rehypeStringify)
- unified.js エコシステムの強力さ

#### Next.js 15のメタデータAPI
- `generateMetadata()`: 動的メタデータ生成
- `metadataBase`: 相対URLをフルURLに変換
- `title.template`: テンプレート文字列で一貫性保持
- keywords, description, OGP対応

#### generateStaticParams()の重要性
- SSG (Static Site Generation)のためのパラメータ生成
- ビルド時に全記事ページを事前レンダリング
- パフォーマンス向上 (CDNキャッシュ)

#### dangerouslySetInnerHTMLの安全性
- Markdownから生成したHTMLは安全
- ユーザー入力をそのまま表示する場合は注意が必要
- 今回はサーバーサイドで処理されたHTMLなので安全

#### Tailwind CSSのproseクラス
- `@layer components`で独自proseスタイル定義
- `:where()`疑似クラスで詳細度を低く保つ
- `@apply`で再利用可能なスタイル

### 次回のタスク

**Phase 2の残りタスク**
1. **前後記事ナビゲーション (2.10)**
   - `lib/posts.ts`に`getAdjacentPosts()`追加
   - `components/Post/PostNavigation.tsx`作成
   - 記事詳細ページに組み込み

2. **ビルドテスト**
   ```bash
   pnpm build
   pnpm start
   ```

**Phase 3: タグ・検索機能**
1. **タグ処理ロジック**
   - `lib/tags.ts`: getAllTags, getPostsByTag
   - タグごとの記事数カウント

2. **タグページ**
   - `app/tags/page.tsx`: タグ一覧
   - `app/tags/[tag]/page.tsx`: タグ別記事一覧

3. **検索機能**
   - FlexSearch or Fuse.jsでクライアント検索
   - `app/search/page.tsx`: 検索ページ
   - クライアントコンポーネント導入

---

## 2025-10-16 (続き3) - Phase 3完了

### 実装内容
#### Phase 3: タグ・検索機能 - 完了✅

**1. タグ処理ロジック (lib/tags.ts)**
- `getAllTags()`: 全記事からタグ収集、記事数カウント、降順ソート
- `getPostsByTag()`: タグでフィルタリング (大文字小文字、slug対応)
- `getTagBySlug()`: slugでタグ取得
- `generateTagSlug()`: URL-friendlyなslug生成 (小文字化、スペース→ハイフン、特殊文字除去)
- `getPopularTags()`: 人気タグ取得 (limit指定可能)
- `tagExists()`: タグ存在確認

**2. タグコンポーネント**
- `components/Tag/TagBadge.tsx`:
  - Badgeコンポーネントベース
  - Link統合でクリック可能
  - variant対応 (default/secondary/outline/destructive)
  - showCountオプション (記事数表示)
- `components/Tag/TagList.tsx`:
  - グリッドレイアウト (flexbox, gap-3)
  - タグ0件時のメッセージ

**3. タグ一覧ページ (app/tags/page.tsx)**
- 全タグ表示 (記事数付き)
- 日本語UI ("タグ一覧", "全 X 個のタグ")
- メタデータ設定 (title, description)
- Server Component

**4. タグ別記事一覧ページ (app/tags/[tag]/page.tsx)**
- Dynamic Route: `[tag]`
- `generateStaticParams()`: 全タグのSSG
- `generateMetadata()`: タグ名をtitleに含める
- タグアイコン + タグ名表示
- PostListコンポーネントで記事一覧
- "Back to Tags"リンク
- notFound()処理

**5. 検索ライブラリ導入**
- Fuse.js 7.1.0インストール
- ファジー検索 (曖昧検索) に対応

**6. 検索ロジック (lib/search.ts)**
- `searchPosts()`:
  - Fuse.jsでファジー検索
  - フィールド別weight設定:
    - title: 2.0 (最重要)
    - description: 1.5
    - tags: 1.2
    - content: 0.8
  - threshold: 0.4 (適度な曖昧さ許容)
  - ignoreLocation: true (位置無関係)
  - minMatchCharLength: 2 (最小2文字)
- `buildSearchIndex()`: クライアント検索用インデックス生成
- `highlightText()`: 検索キーワードハイライト (正規表現)
- `escapeRegExp()`: 正規表現エスケープ

**7. 検索UIコンポーネント**
- `components/Search/SearchBar.tsx` (クライアントコンポーネント):
  - "use client"ディレクティブ
  - useRouter, useSearchParams使用
  - デバウンス処理 (300ms)
  - URLクエリパラメータ連携 (?q=keyword)
  - フォーム送信処理
- `components/Search/SearchResults.tsx`:
  - 検索結果表示 (PostList使用)
  - 検索前メッセージ
  - 0件時メッセージ
  - 検索結果件数表示

**8. 検索ページ (app/search/page.tsx)**
- クエリパラメータから検索 (searchParams)
- SearchBarコンポーネント配置
- SearchResultsで結果表示
- Server Component (検索ロジックはサーバー実行)

### 技術的決定

#### 1. なぜFuse.jsを選んだか
- **FlexSearch vs Fuse.js**の比較:
  - Fuse.js:
    - ファジー検索 (typo対応)
    - 設定が簡単
    - TypeScript型定義充実
    - ドキュメント豊富
  - FlexSearch:
    - より高速
    - メモリ効率◎
    - 設定が複雑
- 結論: ブログ程度の規模ではFuse.jsの使いやすさが勝る

#### 2. クライアントコンポーネントの最小化
- SearchBarのみクライアントコンポーネント
- 検索ロジック (searchPosts) はサーバーサイドで実行
- メリット:
  - JSバンドル削減
  - SEO最適化
  - サーバーで検索結果を事前レンダリング

#### 3. デバウンス処理の実装
- 300msのデバウンス
- useEffectとsetTimeoutで実装
- 理由:
  - API呼び出し削減 (今回はサーバーコンポーネントなので直接的な効果は少ない)
  - 入力中のURL更新を抑制
  - UX向上

#### 4. タグslug生成ロジック
- `generateTagSlug()` 実装:
  ```typescript
  tagName
    .toLowerCase()
    .replace(/\s+/g, '-')  // スペース → ハイフン
    .replace(/[^\w\-]+/g, '')  // 英数字とハイフン以外削除
    .replace(/\-\-+/g, '-')  // 連続ハイフン → 単一
    .replace(/^-+/, '')  // 先頭ハイフン削除
    .replace(/-+$/, '');  // 末尾ハイフン削除
  ```
- "Next.js" → "nextjs"
- "TypeScript Best Practices" → "typescript-best-practices"

#### 5. 検索weight設定の根拠
- title (2.0): 最も関連性が高い
- description (1.5): 記事要約で重要
- tags (1.2): カテゴリ分類で有用
- content (0.8): 長文なので相対的に低め

### 問題と解決策

#### 問題1: タグページが404エラー
**原因**: サーバー再起動が必要だった (新しいルート認識)

**解決策**: 開発サーバーを再起動
```bash
pnpm dev
```
→ `/tags`, `/tags/[tag]`, `/search` が認識された

#### 問題2: `/tags/next.js` が404
**原因**: スラッグは `next.js` ではなく `nextjs` (ピリオド除去)

**解決策**: 正しいslugでテスト (`/tags/nextjs`)
→ 正常に動作

### 学び・メモ

#### Fuse.jsの活用
- **threshold**: 0 (完全一致) 〜 1 (すべてマッチ)
  - 0.4が適度なバランス
- **ignoreLocation**: true で位置無関係に検索
- **keys with weight**: 検索対象フィールドと重み付け
- **includeScore, includeMatches**: デバッグやハイライトに有用

#### クライアント vs サーバーコンポーネントの使い分け
- **クライアント**: インタラクティブ (SearchBar)
- **サーバー**: データ取得、検索ロジック (SearchPage)
- メリット:
  - JSバンドル最小化
  - SEO最適化
  - 初期ロード高速化

#### URLクエリパラメータ管理
- `useSearchParams()`: 現在のクエリ取得
- `router.push()`: プログラマティックにナビゲーション
- `searchParams`: Server Componentでクエリ取得

#### Dynamic Routesでの notFound()
- `notFound()`呼び出しで404ページ表示
- Next.js組み込み関数
- SEO的にも正しいステータスコード返却

#### generateStaticParams の重要性
- タグページも事前生成
- ビルド時に全タグのページを生成
- パフォーマンス向上

### 次回のタスク

**Phase 3の残りタスク**
1. **ビルドテスト**
   ```bash
   pnpm build
   pnpm start
   ```

2. **サイドバーコンポーネント (オプション)**
   - 人気タグ表示
   - 検索バー配置
   - ホームページに追加

**Phase 4: UI/UX改善・レスポンシブ対応**
1. **レスポンシブデザイン**
   - モバイル表示確認
   - ハンバーガーメニュー
   - レイアウト調整

2. **アクセシビリティ対応**
   - ARIA属性
   - キーボードナビゲーション
   - カラーコントラスト検証

3. **OGP・SEO設定**
   - OGP画像
   - 構造化データ (JSON-LD)
   - サイトマップ生成

---

## テンプレート（次回のエントリ用）

```markdown
## YYYY-MM-DD

### 実装内容
-

### 技術的決定
-

### 問題と解決策
-

### 学び・メモ
-

### 次回のタスク
-
```

---

## 参考情報

### 有用なリンク
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel Documentation](https://vercel.com/docs)

### よく使うコマンド
```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 型チェック
pnpm tsc --noEmit

# Lint
pnpm lint

# shadcn/uiコンポーネント追加
pnpm dlx shadcn-ui@latest add <component-name>
```

---

## 変更履歴

| 日付 | 変更内容 |
|------|---------|
| 2025-10-16 | 初版作成 - プロジェクト計画フェーズの記録 |
