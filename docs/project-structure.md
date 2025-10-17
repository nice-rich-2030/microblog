# プロジェクト構造ガイド

## 概要
このドキュメントは、マイクロブログプロジェクトのディレクトリ構造とファイル配置の規則を定義します。

---

## ディレクトリ構造

```
microblog/
├── app/                          # Next.js App Router（ルーティング）
│   ├── layout.tsx               # ルートレイアウト（全ページ共通）
│   ├── page.tsx                 # ホームページ（記事一覧）
│   ├── globals.css              # グローバルスタイル
│   │
│   ├── posts/                   # 記事関連ページ
│   │   └── [slug]/
│   │       └── page.tsx         # 記事詳細ページ（動的ルート）
│   │
│   ├── tags/                    # タグ関連ページ
│   │   ├── page.tsx             # タグ一覧ページ
│   │   └── [tag]/
│   │       └── page.tsx         # タグ別記事一覧（動的ルート）
│   │
│   ├── about/                   # Aboutページ
│   │   └── page.tsx
│   │
│   └── search/                  # 検索ページ
│       └── page.tsx
│
├── components/                   # Reactコンポーネント
│   ├── ui/                      # shadcn/uiコンポーネント
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...                  # その他UIコンポーネント
│   │
│   ├── Layout/                  # レイアウトコンポーネント
│   │   ├── Header.tsx           # ヘッダー
│   │   ├── Footer.tsx           # フッター
│   │   ├── Sidebar.tsx          # サイドバー
│   │   └── Container.tsx        # コンテナ
│   │
│   ├── Post/                    # 記事関連コンポーネント
│   │   ├── PostCard.tsx         # 記事カード（一覧表示用）
│   │   ├── PostList.tsx         # 記事リスト
│   │   ├── PostDetail.tsx       # 記事詳細表示
│   │   ├── PostMeta.tsx         # 記事メタ情報（日付、タグ等）
│   │   └── PostNavigation.tsx   # 前後記事ナビゲーション
│   │
│   ├── Tag/                     # タグ関連コンポーネント
│   │   ├── TagList.tsx          # タグ一覧
│   │   ├── TagBadge.tsx         # タグバッジ
│   │   └── TagCloud.tsx         # タグクラウド
│   │
│   ├── Search/                  # 検索関連コンポーネント
│   │   ├── SearchBar.tsx        # 検索バー
│   │   └── SearchResults.tsx    # 検索結果表示
│   │
│   └── Markdown/                # Markdown関連コンポーネント
│       ├── MarkdownRenderer.tsx # Markdownレンダラー
│       ├── TableOfContents.tsx  # 目次
│       └── CodeBlock.tsx        # コードブロック
│
├── lib/                          # ユーティリティ関数・ロジック
│   ├── posts.ts                 # 記事取得・処理ロジック
│   ├── markdown.ts              # Markdown処理ロジック
│   ├── tags.ts                  # タグ処理ロジック
│   ├── search.ts                # 検索ロジック
│   ├── utils.ts                 # 汎用ユーティリティ
│   └── constants.ts             # 定数定義
│
├── content/                      # コンテンツディレクトリ
│   └── posts/                   # Markdown記事
│       ├── hello-world.md
│       ├── nextjs-15-guide.md
│       └── typescript-tips.md
│
├── public/                       # 静的ファイル
│   ├── images/                  # 画像ファイル
│   │   ├── posts/               # 記事用画像
│   │   └── icons/               # アイコン
│   ├── favicon.ico
│   └── robots.txt
│
├── types/                        # TypeScript型定義
│   ├── post.ts                  # 記事関連の型
│   ├── tag.ts                   # タグ関連の型
│   └── index.ts                 # 型のエクスポート
│
├── docs/                         # ドキュメント
│   ├── requirements.md          # 要件定義書
│   ├── project-structure.md     # プロジェクト構造
│   ├── development-guide.md     # 開発ガイド
│   ├── component-guidelines.md  # コンポーネントガイドライン
│   ├── api-reference.md         # API仕様書
│   └── deployment.md            # デプロイガイド
│
├── .vscode/                      # VSCode設定
│   └── settings.json
│
├── .github/                      # GitHub関連
│   └── workflows/               # GitHub Actions
│       └── ci.yml               # CI設定
│
├── .eslintrc.json               # ESLint設定
├── .prettierrc                  # Prettier設定
├── .gitignore                   # Git除外設定
├── next.config.js               # Next.js設定
├── tailwind.config.ts           # Tailwind CSS設定
├── tsconfig.json                # TypeScript設定
├── package.json                 # パッケージ定義
├── pnpm-lock.yaml               # パッケージロックファイル
└── README.md                    # プロジェクト説明
```

---

## ディレクトリ詳細

### 1. `app/` - Next.js App Router
**目的**: ページのルーティングとレイアウトを定義

**ルール**:
- ファイル名に基づいてルーティングが自動生成される
- `page.tsx`: ページコンポーネント
- `layout.tsx`: レイアウトコンポーネント
- `[slug]/`: 動的ルート
- **サーバーコンポーネント**をデフォルトで使用
- クライアント機能が必要な場合のみ`"use client"`を追加

**例**:
```
app/posts/[slug]/page.tsx → /posts/hello-world
app/tags/[tag]/page.tsx   → /tags/nextjs
```

---

### 2. `components/` - Reactコンポーネント
**目的**: 再利用可能なUIコンポーネント

**ルール**:
- **機能ごとにディレクトリを分ける**（Post, Tag, Layout等）
- **PascalCase**でファイル命名（例: `PostCard.tsx`）
- `ui/`ディレクトリはshadcn/uiコンポーネント専用
- 各コンポーネントは**単一責任の原則**に従う
- **TypeScript**で型を明示
- **クライアントコンポーネント**（`"use client"`）とサーバーコンポーネントを明確に分ける

**命名規則**:
```typescript
// 良い例
components/Post/PostCard.tsx
components/Layout/Header.tsx
components/ui/button.tsx

// 悪い例
components/post-card.tsx  // kebab-caseは使わない
components/PostCardComponent.tsx  // 冗長
```

---

### 3. `lib/` - ユーティリティ関数・ロジック
**目的**: ビジネスロジック、データ処理、ヘルパー関数

**ルール**:
- **camelCase**でファイル命名（例: `posts.ts`）
- 純粋関数を推奨（副作用を最小限に）
- 各ファイルは**単一の責務**を持つ
- **型定義を明示**
- コメントで関数の目的を記述

**主要ファイル**:
- `posts.ts`: 記事のCRUD操作、フィルタリング
- `markdown.ts`: Markdownのパース、HTML変換
- `tags.ts`: タグの集計、フィルタリング
- `search.ts`: 検索ロジック
- `utils.ts`: 汎用ヘルパー関数

---

### 4. `content/posts/` - Markdown記事
**目的**: ブログ記事のMarkdownファイル

**ルール**:
- ファイル名は**kebab-case**（例: `my-first-post.md`）
- ファイル名がURLのslugになる
- 必ずフロントマターを含める
- 画像は`public/images/posts/`に配置

**フロントマター必須項目**:
```yaml
---
title: "記事タイトル"
date: "2025-10-16"
tags: ["Next.js", "TypeScript"]
description: "記事の概要"
draft: false
---
```

---

### 5. `types/` - TypeScript型定義
**目的**: プロジェクト全体で使用する型定義

**ルール**:
- **camelCase**でファイル命名
- インターフェース名は**PascalCase**
- 型のエクスポートは`index.ts`でまとめる
- ドメインごとにファイルを分ける

**例**:
```typescript
// types/post.ts
export interface Post {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string;
  htmlContent: string;
}

// types/index.ts
export * from './post';
export * from './tag';
```

---

### 6. `public/` - 静的ファイル
**目的**: 画像、アイコン、その他の静的アセット

**ルール**:
- `/public`配下のファイルは`/`からアクセス可能
- 画像は適切なディレクトリに配置
  - `/public/images/posts/` - 記事用画像
  - `/public/images/icons/` - アイコン
- ファイル名は**kebab-case**
- 画像は可能な限り最適化してから配置

**例**:
```
public/images/posts/my-post-cover.jpg
→ アクセス: /images/posts/my-post-cover.jpg
```

---

### 7. `docs/` - ドキュメント
**目的**: プロジェクトのドキュメント管理

**ルール**:
- Markdown形式
- ファイル名は**kebab-case**
- 常に最新の状態を保つ
- 変更履歴を記録

**ファイル一覧**:
- `requirements.md` - 要件定義書
- `project-structure.md` - プロジェクト構造
- `development-guide.md` - 開発ガイド
- `component-guidelines.md` - コンポーネントガイドライン
- `api-reference.md` - API仕様書
- `deployment.md` - デプロイガイド

---

## ファイル命名規則まとめ

| 種類 | 命名規則 | 例 |
|------|---------|-----|
| Reactコンポーネント | PascalCase | `PostCard.tsx` |
| ページ（App Router） | snake_case / PascalCase | `page.tsx`, `layout.tsx` |
| ユーティリティ関数 | camelCase | `posts.ts`, `utils.ts` |
| 型定義ファイル | camelCase | `post.ts`, `tag.ts` |
| Markdown記事 | kebab-case | `my-first-post.md` |
| ドキュメント | kebab-case | `development-guide.md` |
| 画像・静的ファイル | kebab-case | `hero-image.jpg` |

---

## コンポーネント配置の判断基準

### `app/` に配置するもの
- ページコンポーネント（`page.tsx`）
- レイアウトコンポーネント（`layout.tsx`）
- ルーティングに直接関係するファイル

### `components/` に配置するもの
- 再利用可能なUIコンポーネント
- 複数のページで使われるコンポーネント
- ビジネスロジックを持つコンポーネント

### `lib/` に配置するもの
- データ取得・加工ロジック
- ヘルパー関数
- ビジネスロジック
- API呼び出し

---

## import文の順序

**推奨順序**:
1. React / Next.js関連
2. 外部ライブラリ
3. 内部コンポーネント
4. 内部ユーティリティ
5. 型定義
6. スタイル

**例**:
```typescript
// 1. React / Next.js
import { Metadata } from 'next';
import Link from 'next/link';

// 2. 外部ライブラリ
import { format } from 'date-fns';
import { motion } from 'framer-motion';

// 3. 内部コンポーネント
import { PostCard } from '@/components/Post/PostCard';
import { Header } from '@/components/Layout/Header';

// 4. 内部ユーティリティ
import { getAllPosts } from '@/lib/posts';
import { cn } from '@/lib/utils';

// 5. 型定義
import type { Post } from '@/types';

// 6. スタイル（必要に応じて）
import './styles.css';
```

---

## パスエイリアス

`tsconfig.json`で`@/`エイリアスを設定:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**使用例**:
```typescript
// 相対パス（非推奨）
import { PostCard } from '../../../components/Post/PostCard';

// エイリアス（推奨）
import { PostCard } from '@/components/Post/PostCard';
```

---

## 環境変数管理

### ファイル
- `.env.local` - ローカル開発用（Gitにコミットしない）
- `.env.production` - 本番環境用（Vercelで管理）

### 命名規則
- `NEXT_PUBLIC_*` - クライアントサイドで使用可能
- それ以外 - サーバーサイド専用

**例**:
```bash
# サーバーサイドのみ
DATABASE_URL=xxx

# クライアント・サーバー両方
NEXT_PUBLIC_SITE_URL=https://myblog.com
```

---

## 今後の拡張を考慮した構造

### プラグイン・拡張機能
```
plugins/
├── analytics/
├── seo/
└── rss/
```

### テスト
```
__tests__/
├── components/
├── lib/
└── e2e/
```

### 多言語対応
```
locales/
├── en.json
└── ja.json
```

---

## まとめ

- **明確な責務分離**: app（ルーティング）、components（UI）、lib（ロジック）
- **一貫した命名規則**: PascalCase、camelCase、kebab-caseを適切に使い分け
- **型安全性**: TypeScriptの型定義を活用
- **再利用性**: コンポーネントは小さく、単一責任に
- **ドキュメント**: 構造と規則を明文化し、チーム（AIを含む）で共有

このガイドに従うことで、AIが理解しやすく、保守性の高いプロジェクト構造を維持できます。
