# マイクロブログ - 要件定義書

## 1. プロジェクト概要

### 1.1 目的
個人技術ブログシステムを構築し、技術記事や学習記録をMarkdown形式で執筆・公開できるプラットフォームを提供する。

### 1.2 目標
- スタイリッシュで洗練されたUIで読みやすいブログ
- Markdown形式での記事執筆をサポート
- 静的生成による高速なページ表示
- Git経由での記事管理（バージョン管理可能）
- 誰でも閲覧可能な公開ブログ

### 1.3 ターゲットユーザー
- **閲覧者**: 誰でもアクセス可能（認証不要）
- **執筆者**: 自分自身（開発環境またはGit経由で記事を追加）

### 1.4 スコープ
**含むもの:**
- Markdown形式での記事作成・管理
- 記事一覧表示（タイムライン）
- 個別記事の詳細表示
- タグ機能（カテゴリ分類）
- 検索機能
- レスポンシブデザイン
- OGP対応（SNSシェア最適化）

**含まないもの（初期版）:**
- オンラインエディタ（記事はローカルで作成）
- ユーザー認証・ログイン機能
- コメント機能
- いいね・シェア機能
- リアルタイム通知
- 管理画面UI（記事管理はGit/ファイルシステム経由）

---

## 2. 機能要件

### 2.1 コア機能

#### 2.1.1 記事管理
- **記事作成**
  - Markdownファイルとして作成（ローカルエディタ使用）
  - フロントマターでメタデータ管理（タイトル、日付、タグ、説明など）
  - Git経由でリポジトリに追加・コミット
  - Vercelへのプッシュで自動デプロイ

- **記事表示**
  - Markdownのレンダリング（HTML変換）
  - シンタックスハイライト（コードブロック）
  - 目次（Table of Contents）自動生成
  - 読了時間の表示
  - 前後の記事へのナビゲーション

#### 2.1.2 記事一覧（ホーム）
- 時系列順（新しい順）での記事一覧表示
- 記事カード表示（タイトル、抜粋、日付、タグ）
- ページネーションまたは一覧表示
- アイキャッチ画像の表示（オプション）

#### 2.1.3 タグ機能
- 記事へのタグ付け（フロントマターで指定）
- タグ一覧ページ
- タグごとの記事フィルタリング
- タグクラウド表示（オプション）

#### 2.1.4 検索機能
- 記事タイトル・本文の全文検索
- タグによる絞り込み
- 検索結果のハイライト表示
- クライアントサイド検索（静的サイトのため）

#### 2.1.5 その他の機能
- **About/プロフィールページ**
  - 自己紹介
  - SNSリンク

- **RSSフィード**
  - RSS/Atom形式での配信

- **OGP（Open Graph Protocol）**
  - SNSシェア時のプレビュー最適化
  - Twitter Card対応

- **サイトマップ**
  - SEO対策用のXMLサイトマップ自動生成

### 2.2 Markdownフロントマター構造
```yaml
---
title: "記事のタイトル"
date: "2025-10-16"
updated: "2025-10-17" # オプション
tags: ["Next.js", "TypeScript", "React"]
description: "記事の概要（SEO用）"
image: "/images/posts/cover.jpg" # オプション
draft: false # 下書きフラグ
---
```

### 2.3 拡張機能（フェーズ2以降）
- ダークモード切り替え
- 記事の共有ボタン（Twitter, Facebook等）
- 関連記事の表示
- 記事の閲覧数カウント（Google Analytics等）
- コメント機能（Disqus/Giscus等の外部サービス）
- ブックマーク機能（LocalStorage利用）

---

## 3. 非機能要件

### 3.1 パフォーマンス
- **First Contentful Paint (FCP)**: 1.5秒以内
- **Largest Contentful Paint (LCP)**: 2.5秒以内
- **Time to Interactive (TTI)**: 3秒以内
- **Lighthouse Score**: 90点以上（Performance, SEO）
- 静的サイト生成（SSG）による高速化
- 画像の最適化（Next.js Image Optimization）

### 3.2 セキュリティ
- HTTPS通信（Vercel標準対応）
- XSS対策（Markdownサニタイゼーション）
- Content Security Policy (CSP)の設定
- 環境変数による機密情報管理
- 認証機能は不要（公開ブログのため）

### 3.3 可用性・信頼性
- Vercelの稼働率に準拠（99.99%）
- Gitによるバージョン管理（履歴保持）
- 自動デプロイ（GitHub連携）
- エラーページの適切な表示（404, 500）

### 3.4 保守性・拡張性
- TypeScriptによる型安全性
- コンポーネント指向設計
- 適切なディレクトリ構造
- コードの可読性・保守性重視
- ESLint/Prettierによるコード品質管理

### 3.5 ユーザビリティ
- レスポンシブデザイン（モバイル、タブレット、デスクトップ）
- 読みやすいタイポグラフィ
- 直感的なナビゲーション
- アクセシビリティ対応（WCAG 2.1 AAレベル）
- shadcn/uiによる洗練されたUI

### 3.6 互換性
- モダンブラウザ対応（Chrome, Firefox, Safari, Edge最新版）
- モバイルブラウザ対応（iOS Safari, Chrome Mobile）

### 3.7 SEO対応
- メタタグの適切な設定
- セマンティックHTML
- XMLサイトマップ
- robots.txt
- 構造化データ（JSON-LD）

---

## 4. 技術スタック（確定版）

### 4.1 フロントエンド・フルスタックフレームワーク
- **Next.js 15** (App Router)
- **TypeScript**
- **React 19** (Next.js 15に含まれる)

### 4.2 スタイリング・UIコンポーネント
- **Tailwind CSS**
- **shadcn/ui** - 洗練されたUIコンポーネント
- **Radix UI** - アクセシブルなプリミティブコンポーネント
- **Lucide React** - アイコンライブラリ

### 4.3 Markdown処理
- **gray-matter** - フロントマターのパース
- **remark** - Markdownパーサー
- **remark-html** - Markdown → HTML変換
- **remark-gfm** - GitHub Flavored Markdown対応
- **rehype** - HTMLプロセッサー
- **rehype-highlight** または **rehype-prism-plus** - シンタックスハイライト
- **rehype-slug** - 見出しにIDを自動付与
- **rehype-autolink-headings** - 見出しにアンカーリンク追加

### 4.4 データ管理
- **Markdownファイル** (`/posts/*.md` または `/content/posts/*.md`)
- **ファイルシステムベースCMS**
- Git経由でのバージョン管理

### 4.5 検索機能
- **FlexSearch** または **Fuse.js** - クライアントサイド全文検索

### 4.6 開発ツール
- **ESLint** - コード品質チェック
- **Prettier** - コードフォーマッター
- **TypeScript Strict Mode**
- **pnpm** - パッケージマネージャー（推奨）

### 4.7 デプロイ・ホスティング
- **Vercel** - Next.js最適化されたホスティング
- **GitHub** - ソースコード管理
- **GitHub Actions** - CI/CD（オプション）

### 4.8 分析・SEO
- **Google Analytics** または **Vercel Analytics** - アクセス解析
- **next-seo** - SEO最適化ライブラリ
- **next-sitemap** - サイトマップ自動生成

---

## 5. データ構造

### 5.1 Markdownファイル構造
```
/content
  /posts
    /2025
      /10
        my-first-post.md
        nextjs-tutorial.md
    /2025
      /11
        typescript-tips.md
```

または

```
/posts
  my-first-post.md
  nextjs-tutorial.md
  typescript-tips.md
```

### 5.2 記事のフロントマター（型定義）
```typescript
interface PostFrontMatter {
  title: string;              // 記事タイトル（必須）
  date: string;               // 公開日（YYYY-MM-DD形式、必須）
  updated?: string;           // 更新日（オプション）
  tags: string[];             // タグ配列（必須）
  description: string;        // 記事の概要（必須、SEO用）
  image?: string;             // アイキャッチ画像URL（オプション）
  draft: boolean;             // 下書きフラグ（デフォルト: false）
  author?: string;            // 著者名（オプション）
}
```

### 5.3 記事データの型定義
```typescript
interface Post {
  slug: string;               // ファイル名から生成（URLに使用）
  frontMatter: PostFrontMatter;
  content: string;            // Markdown本文（HTML変換前）
  htmlContent: string;        // HTML変換後のコンテンツ
  readingTime: number;        // 読了時間（分）
}
```

### 5.4 タグデータの型定義
```typescript
interface Tag {
  name: string;               // タグ名
  count: number;              // 該当記事数
  slug: string;               // URL用スラッグ
}
```

---

## 6. UI/UX要件

### 6.1 画面構成

#### 1. **ホームページ（/）**
- ヘッダー（ロゴ、ナビゲーション）
- ヒーローセクション（オプション）
- 記事一覧（カード形式）
- サイドバー（タグ一覧、プロフィール、検索）
- フッター

#### 2. **記事詳細ページ（/posts/[slug]）**
- パンくずリスト
- 記事タイトル
- メタ情報（日付、タグ、読了時間）
- 目次（Table of Contents）
- 記事本文（Markdownレンダリング）
- 前後の記事へのリンク
- シェアボタン（オプション）

#### 3. **タグ一覧ページ（/tags）**
- すべてのタグ一覧
- 各タグの記事数表示
- タグクラウド（オプション）

#### 4. **タグ別記事一覧（/tags/[tag]）**
- タグ名表示
- 該当記事の一覧

#### 5. **Aboutページ（/about）**
- プロフィール
- SNSリンク
- 自己紹介文

#### 6. **検索ページ（/search）**
- 検索フォーム
- 検索結果一覧
- フィルター（タグ、日付）

### 6.2 デザイン指針
- **shadcn/ui採用**: モダンで洗練されたコンポーネント
- **ミニマリスト**: シンプルで読みやすいレイアウト
- **タイポグラフィ重視**: 可読性の高いフォント選定
- **レスポンシブ**: モバイルファースト設計
- **カラースキーム**:
  - ライトモード: 白ベース、読みやすい配色
  - ダークモード（フェーズ2）: ダークグレーベース
- **アニメーション**: 控えめで滑らかなトランジション
- **コードブロック**: シンタックスハイライト、コピーボタン

### 6.3 アクセシビリティ
- セマンティックHTML（article, nav, main, aside等）
- キーボードナビゲーション対応
- ARIAラベルの適切な使用
- 十分なコントラスト比（WCAG AA以上）
- フォーカス可視化
- スクリーンリーダー対応

### 6.4 レスポンシブブレークポイント
- **モバイル**: 〜640px
- **タブレット**: 641px〜1024px
- **デスクトップ**: 1025px〜

---

## 7. ディレクトリ構成（推奨）

```
microblog/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # ルートレイアウト
│   ├── page.tsx                 # ホームページ
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx         # 記事詳細ページ
│   ├── tags/
│   │   ├── page.tsx             # タグ一覧
│   │   └── [tag]/
│   │       └── page.tsx         # タグ別記事一覧
│   ├── about/
│   │   └── page.tsx             # Aboutページ
│   └── search/
│       └── page.tsx             # 検索ページ
├── components/                   # Reactコンポーネント
│   ├── ui/                      # shadcn/uiコンポーネント
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── Post/
│   │   ├── PostCard.tsx
│   │   ├── PostList.tsx
│   │   └── PostDetail.tsx
│   ├── Tag/
│   │   ├── TagList.tsx
│   │   └── TagCloud.tsx
│   └── Search/
│       └── SearchBar.tsx
├── lib/                          # ユーティリティ関数
│   ├── posts.ts                 # 記事取得・処理ロジック
│   ├── markdown.ts              # Markdown処理
│   ├── tags.ts                  # タグ処理
│   └── utils.ts                 # 共通ユーティリティ
├── content/                      # コンテンツディレクトリ
│   └── posts/                   # Markdown記事
│       ├── my-first-post.md
│       └── nextjs-tutorial.md
├── public/                       # 静的ファイル
│   ├── images/
│   └── icons/
├── styles/                       # グローバルスタイル
│   └── globals.css
├── types/                        # TypeScript型定義
│   └── post.ts
├── docs/                         # ドキュメント
│   └── requirements.md
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 8. 開発フェーズ

### Phase 1: プロジェクトセットアップ・基本構造（1週間）
**目標**: Next.js 15プロジェクトの初期化と基本設定

**タスク:**
- Next.js 15プロジェクト作成
- TypeScript設定
- Tailwind CSS + shadcn/ui導入
- ESLint/Prettier設定
- ディレクトリ構造構築
- 基本的なレイアウトコンポーネント作成

**成果物:**
- 動作する空のNext.jsアプリ
- shadcn/ui適用済みの基本レイアウト

### Phase 2: Markdown処理・記事表示（1-2週間）
**目標**: Markdown記事の読み込みと表示機能の実装

**タスク:**
- Markdown処理ライブラリの導入
- 記事取得ロジックの実装（`lib/posts.ts`）
- ホームページ（記事一覧）の実装
- 記事詳細ページの実装
- シンタックスハイライト導入
- サンプル記事の作成

**成果物:**
- 記事一覧と詳細表示が動作
- シンタックスハイライト付きコードブロック

### Phase 3: タグ・検索機能（1週間）
**目標**: タグ機能と検索機能の実装

**タスク:**
- タグ処理ロジックの実装
- タグ一覧ページ作成
- タグ別記事フィルタリング
- クライアントサイド検索の実装
- 検索UIの実装

**成果物:**
- タグによる記事分類
- 全文検索機能

### Phase 4: UI/UX改善・レスポンシブ対応（1週間）
**目標**: デザインの洗練とモバイル対応

**タスク:**
- レスポンシブデザインの最適化
- アニメーション・トランジションの追加
- アクセシビリティ対応
- OGP設定
- SEO最適化（メタタグ、サイトマップ）

**成果物:**
- 全デバイスで快適に閲覧可能
- SEO対策済み

### Phase 5: デプロイ・本番運用（3-5日）
**目標**: Vercelへのデプロイと本番環境構築

**タスク:**
- Vercelプロジェクト作成
- GitHubリポジトリ連携
- 環境変数設定
- カスタムドメイン設定（オプション）
- Google Analytics設定
- 最終的な動作確認

**成果物:**
- 本番環境での公開ブログ
- 自動デプロイ環境

### Phase 6: 拡張機能（今後の開発）
**タスク:**
- ダークモード実装
- コメント機能（Giscus等）
- 記事共有ボタン
- 関連記事表示
- RSSフィード
- パフォーマンス最適化

---

## 9. リスクと対策

### 9.1 技術的リスク
| リスク | 影響 | 対策 |
|--------|------|------|
| Next.js 15の新機能による不具合 | 中 | 公式ドキュメント参照、コミュニティ活用 |
| Markdown処理のパフォーマンス問題 | 低 | ビルド時処理（SSG）により問題なし |
| SEOの最適化不足 | 中 | next-seo導入、構造化データ実装 |
| 画像最適化の遅延 | 低 | Next.js Image Optimizationを活用 |

### 9.2 スケジュールリスク
| リスク | 影響 | 対策 |
|--------|------|------|
| shadcn/ui習得に時間がかかる | 低 | 公式ドキュメント・サンプル活用 |
| スコープクリープ | 中 | MVP重視、拡張機能は後回し |

### 9.3 運用リスク
| リスク | 影響 | 対策 |
|--------|------|------|
| Vercel無料枠の制限 | 低 | 個人ブログなら問題なし |
| Gitの操作ミス | 低 | ブランチ戦略、慎重な操作 |

---

## 10. 成功基準

### 10.1 機能的成功基準
- すべての記事が正しく表示される
- タグによる記事フィルタリングが動作する
- 検索機能で記事を見つけられる
- モバイルでも快適に閲覧できる

### 10.2 技術的成功基準
- Lighthouse Performance Score: 90点以上
- LCP: 2.5秒以内
- TypeScriptエラーゼロ
- ビルドエラーなし

### 10.3 ユーザー体験基準
- 直感的なナビゲーション
- 読みやすいタイポグラフィ
- 高速なページ遷移
- スタイリッシュなデザイン

---

## 11. 今後の検討事項
- PWA対応（オフライン閲覧）
- 多言語対応（i18n）
- 記事の目次ナビゲーション（スクロール連動）
- 記事のシリーズ化機能
- ニュースレター機能
- Webmentions対応
- CMSとの連携（Contentful, microCMS等）

---

## 変更履歴
| 日付 | バージョン | 変更内容 | 担当者 |
|------|-----------|---------|--------|
| 2025-10-16 | 1.0 | 初版作成 | - |
| 2025-10-16 | 2.0 | Next.js 15 + Markdown + Vercelベースに全面改訂 | - |
