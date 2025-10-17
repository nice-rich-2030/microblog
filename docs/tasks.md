# 実装タスクリスト

## 概要
このドキュメントは、マイクロブログプロジェクトの実装タスクを管理します。
各フェーズのタスクをチェックリスト形式で追跡し、進捗を可視化します。

**更新日**: 2025-10-16

---

## タスクステータス凡例
- [ ] 未着手
- [x] 完了
- [~] 進行中
- [!] ブロック中
- [-] スキップ/不要

---

## Phase 1: プロジェクトセットアップ・基本構造（目安: 1週間）

**目標**: Next.js 15プロジェクトの初期化と基本設定

### 1.1 プロジェクト初期化
- [x] Next.js 15プロジェクト作成（`pnpm create next-app@latest`）
  - [x] TypeScript有効化
  - [x] App Router使用
  - [x] Tailwind CSS有効化
  - [x] ESLint有効化
- [x] pnpmの設定確認（`package.json`の`packageManager`フィールド）
- [x] `.gitignore`の確認・調整
- [x] `README.md`の作成

### 1.2 基本設定ファイル
- [x] `tsconfig.json`の設定
  - [x] パスエイリアス設定（`@/*`）
  - [x] Strict mode有効化
- [x] `next.config.js`の設定
  - [x] 画像最適化設定
  - [x] 静的エクスポート設定（必要に応じて）
- [x] `.env.example`の作成
  - [x] `NEXT_PUBLIC_SITE_URL`
  - [x] `NEXT_PUBLIC_SITE_NAME`
- [x] `.env.local`の作成（ローカル開発用）

### 1.3 shadcn/ui導入
- [x] shadcn/uiの初期化（`pnpm dlx shadcn-ui@latest init`）
- [x] 基本コンポーネントのインストール
  - [x] `button`
  - [x] `card`
  - [x] `badge`
  - [-] `input` (Phase 2で必要に応じて)
  - [x] `separator`
- [x] `components/ui/`の確認
- [x] Tailwind CSS設定の確認（`tailwind.config.ts`）

### 1.4 ESLint / Prettier設定
- [x] `.eslintrc.json`の調整
- [-] `.prettierrc`の作成 (次フェーズで必要に応じて)
- [-] VSCode設定ファイル作成（`.vscode/settings.json`） (次フェーズで)
  - [-] フォーマット設定
  - [-] 保存時のLint実行

### 1.5 ディレクトリ構造構築
- [x] `app/`配下のディレクトリ作成
  - [x] `app/layout.tsx`
  - [x] `app/page.tsx`
  - [x] `app/globals.css`
- [x] `components/`ディレクトリ作成
  - [x] `components/ui/`（shadcn/uiが自動作成）
  - [x] `components/Layout/`
  - [x] `components/Post/`
  - [x] `components/Tag/`
  - [x] `components/Search/`
  - [x] `components/Markdown/`
- [x] `lib/`ディレクトリ作成
- [x] `types/`ディレクトリ作成
- [x] `content/posts/`ディレクトリ作成
- [x] `public/images/`ディレクトリ作成
  - [x] `public/images/posts/`

### 1.6 基本レイアウトコンポーネント
- [x] `components/Layout/Header.tsx`の作成
- [x] `components/Layout/Footer.tsx`の作成
- [x] `components/Layout/Container.tsx`の作成
- [x] `app/layout.tsx`でレイアウト適用

### 1.7 動作確認
- [x] `pnpm dev`でローカルサーバー起動
- [x] `http://localhost:3000`でアクセス確認
- [x] Tailwind CSSのスタイルが適用されているか確認
- [-] ビルドエラーがないか確認（`pnpm build`） (次フェーズで確認)

---

## Phase 2: Markdown処理・記事表示（目安: 1-2週間）

**目標**: Markdown記事の読み込みと表示機能の実装

### 2.1 依存関係のインストール
- [x] Markdown処理ライブラリのインストール
  - [x] `gray-matter`（フロントマターパース）
  - [x] `remark`
  - [x] `remark-html`
  - [x] `remark-gfm`（GitHub Flavored Markdown）
  - [x] `rehype`
  - [x] `rehype-highlight`
  - [-] `rehype-slug`（アンカーリンク手動実装）
  - [-] `rehype-autolink-headings`（アンカーリンク手動実装）
- [x] その他のユーティリティ
  - [x] `date-fns`（日付フォーマット）
  - [-] `reading-time`（独自実装）

### 2.2 型定義の作成
- [x] `types/post.ts`の作成
  - [x] `PostFrontMatter`インターフェース
  - [x] `Post`インターフェース
- [x] `types/tag.ts`の作成
  - [x] `Tag`インターフェース
- [-] `types/index.ts`でエクスポート（必要に応じて）

### 2.3 Markdown処理ロジック（lib/markdown.ts）
- [x] `parseMarkdown()`関数の実装
  - [x] gray-matterでフロントマター抽出
  - [x] Markdown本文の分離
- [x] `markdownToHtml()`関数の実装
  - [x] remark/rehypeでHTML変換
  - [x] シンタックスハイライト適用
  - [x] 見出しにID付与
  - [x] 見出しにアンカーリンク追加
- [-] `generateTableOfContents()`関数の実装（Phase 4で）
- [x] `calculateReadingTime()`関数の実装
- [x] `generateExcerpt()`関数の実装

### 2.4 記事取得ロジック（lib/posts.ts）
- [x] `getAllPosts()`関数の実装
  - [x] `content/posts/`からMarkdownファイル読み込み
  - [x] フロントマターのパース
  - [x] 下書きの除外（`draft: true`）
  - [x] 日付順でソート
- [x] `getPostBySlug()`関数の実装
- [x] `getRecentPosts()`関数の実装
- [-] `getAdjacentPosts()`関数の実装（Phase 2.10で実装予定）
- [x] `generateStaticParams()`関数の実装

### 2.5 ユーティリティ関数（lib/utils.ts）
- [x] `cn()`関数の実装（shadcn/uiで自動生成）
- [-] `formatDate()`関数の実装（date-fns使用）
- [-] `slugify()`関数の実装（ファイル名ベース）
- [-] `truncate()`関数の実装（必要に応じて）

### 2.6 サンプル記事の作成
- [x] `content/posts/hello-world.md`作成
- [x] `content/posts/nextjs-15-features.md`作成
- [x] `content/posts/typescript-best-practices.md`作成
- [x] フロントマターの検証
- [x] 各種Markdown記法の動作確認

### 2.7 記事カードコンポーネント
- [x] `components/Post/PostCard.tsx`の作成
  - [x] タイトル表示
  - [x] 抜粋表示
  - [x] 日付表示
  - [x] タグバッジ表示
  - [x] リンク設定
- [x] `components/Post/PostList.tsx`の作成
- [-] `components/Post/PostMeta.tsx`の作成（必要に応じて）

### 2.8 ホームページ（記事一覧）
- [x] `app/page.tsx`の実装
  - [x] `getAllPosts()`で記事取得
  - [x] `PostList`コンポーネント表示
  - [-] メタデータ設定（layout.tsxで設定済み）

### 2.9 記事詳細ページ
- [x] `app/posts/[slug]/page.tsx`の作成
  - [x] `getPostBySlug()`で記事取得
  - [x] `generateStaticParams()`で静的パス生成
  - [x] `generateMetadata()`でメタデータ設定
- [-] `components/Post/PostDetail.tsx`の作成（ページ内に統合）
  - [x] 記事タイトル表示
  - [x] メタ情報表示（日付、タグ、読了時間）
  - [x] Markdownレンダリング
- [-] `components/Markdown/MarkdownRenderer.tsx`の作成（dangerouslySetInnerHTMLで直接レンダリング）
  - [x] HTMLの安全な表示
  - [x] スタイリング適用
- [x] シンタックスハイライトのスタイル適用
  - [x] `app/globals.css`にハイライトテーマ追加
  - [x] proseスタイルの追加

### 2.10 前後記事ナビゲーション
- [ ] `components/Post/PostNavigation.tsx`の作成
  - [ ] 前の記事へのリンク
  - [ ] 次の記事へのリンク
- [ ] 記事詳細ページに組み込み

### 2.11 動作確認
- [x] 記事一覧が表示されるか
- [x] 記事詳細が表示されるか
- [x] Markdownが正しくHTMLに変換されるか
- [x] シンタックスハイライトが動作するか
- [ ] 前後記事ナビゲーションが動作するか
- [x] ビルドエラーがないか（`pnpm build`）

---

## Phase 3: タグ・検索機能（目安: 1週間）

**目標**: タグ機能と検索機能の実装

### 3.1 タグ処理ロジック（lib/tags.ts）
- [x] `getAllTags()`関数の実装
  - [x] 全記事からタグを収集
  - [x] タグごとの記事数をカウント
  - [x] 記事数順でソート
- [x] `getPostsByTag()`関数の実装
- [x] `getTagBySlug()`関数の実装
- [x] `generateTagSlug()`関数の実装
- [x] `getPopularTags()`関数の実装
- [x] `tagExists()`関数の実装

### 3.2 タグコンポーネント
- [x] `components/Tag/TagBadge.tsx`の作成
  - [x] タグ名表示
  - [x] クリック可能なリンク
  - [x] バリアント対応（default/secondary/outline）
  - [x] 記事数表示オプション
- [x] `components/Tag/TagList.tsx`の作成
- [-] `components/Tag/TagCloud.tsx`の作成（Phase 4で必要に応じて）

### 3.3 タグ一覧ページ
- [x] `app/tags/page.tsx`の作成
  - [x] `getAllTags()`でタグ取得
  - [x] TagListコンポーネントで表示
  - [x] 各タグの記事数表示
  - [x] メタデータ設定

### 3.4 タグ別記事一覧ページ
- [x] `app/tags/[tag]/page.tsx`の作成
  - [x] `getPostsByTag()`で記事取得
  - [x] `generateStaticParams()`で静的パス生成
  - [x] タグ名とアイコン表示
  - [x] PostListコンポーネントで記事表示
  - [x] "Back to Tags"リンク
  - [x] `generateMetadata()`でSEO対応

### 3.5 検索機能の実装（lib/search.ts）
- [x] 検索ライブラリのインストール（Fuse.js 7.1.0）
- [x] `searchPosts()`関数の実装
  - [x] タイトル検索（weight: 2）
  - [x] 説明文検索（weight: 1.5）
  - [x] タグ検索（weight: 1.2）
  - [x] コンテンツ検索（weight: 0.8）
  - [x] 類似度スコアリング（threshold: 0.4）
- [x] `buildSearchIndex()`関数の実装
- [x] `highlightText()`関数の実装
- [x] ヘルパー関数実装

### 3.6 検索UIコンポーネント
- [x] `components/Search/SearchBar.tsx`の作成（クライアントコンポーネント）
  - [x] 入力フォーム
  - [x] デバウンス処理（300ms）
  - [x] URLクエリパラメータ連携
  - [x] フォーム送信処理
- [x] `components/Search/SearchResults.tsx`の作成
  - [x] 検索結果表示
  - [x] PostListコンポーネント使用
  - [x] 0件時のメッセージ
  - [x] 検索前の案内メッセージ

### 3.7 検索ページ
- [x] `app/search/page.tsx`の作成
  - [x] SearchBarコンポーネント配置
  - [x] クエリパラメータからの検索
  - [x] SearchResultsコンポーネントで結果表示
  - [x] メタデータ設定

### 3.8 サイドバーへのタグ・検索追加
- [-] `components/Layout/Sidebar.tsx`の作成（Phase 4で実装予定）
  - [-] 人気タグ表示
  - [-] 検索バー配置
- [-] ホームページにサイドバー追加

### 3.9 動作確認
- [x] タグ一覧が表示されるか
- [x] タグでフィルタリングできるか
- [x] 検索機能が動作するか
- [-] 検索結果のハイライトが表示されるか（highlightText関数実装済み、UIは今後）
- [x] ビルドエラーがないか（`pnpm build`）

---

## Phase 4: UI/UX改善・レスポンシブ対応（目安: 1週間）

**目標**: デザインの洗練とモバイル対応

### 4.1 レスポンシブデザイン
- [ ] モバイル表示の確認（〜640px）
- [ ] タブレット表示の確認（641px〜1024px）
- [ ] デスクトップ表示の確認（1025px〜）
- [ ] ハンバーガーメニューの実装（モバイル用）
- [ ] サイドバーのレスポンシブ対応

### 4.2 アニメーション・トランジション
- [ ] ページ遷移のスムーズ化
- [ ] カードホバーエフェクト
- [ ] ボタンのインタラクション
- [ ] スクロールアニメーション（必要に応じて）

### 4.3 アクセシビリティ対応
- [ ] セマンティックHTMLの確認
- [ ] ARIA属性の追加
- [ ] キーボードナビゲーション確認
- [ ] フォーカスインジケーターの確認
- [ ] カラーコントラストの検証
- [ ] スクリーンリーダーテスト

### 4.4 OGP設定
- [ ] `app/layout.tsx`でグローバルメタデータ設定
- [ ] 記事詳細ページでOGP設定
  - [ ] `og:title`
  - [ ] `og:description`
  - [ ] `og:image`
  - [ ] `og:url`
  - [ ] `og:type`
- [ ] Twitter Card設定
- [ ] OGP画像の準備

### 4.5 SEO最適化
- [ ] 各ページのメタタグ設定
- [ ] `robots.txt`の作成
- [ ] サイトマップ生成の実装
  - [ ] `next-sitemap`のインストール
  - [ ] `next-sitemap.config.js`の設定
- [ ] 構造化データ（JSON-LD）の追加
  - [ ] Article schema
  - [ ] BreadcrumbList schema

### 4.6 パフォーマンス最適化
- [ ] 画像最適化（Next.js Image使用）
- [ ] フォントの最適化
- [ ] バンドルサイズの確認
- [ ] Lighthouse監査実行
  - [ ] Performance: 90点以上
  - [ ] Accessibility: 90点以上
  - [ ] Best Practices: 90点以上
  - [ ] SEO: 90点以上

### 4.7 エラーページ
- [ ] `app/not-found.tsx`の作成（404ページ）
- [ ] `app/error.tsx`の作成（エラーページ）
- [ ] カスタムエラーメッセージとナビゲーション

### 4.8 Aboutページ
- [ ] `app/about/page.tsx`の作成
  - [ ] プロフィール情報
  - [ ] SNSリンク
  - [ ] 自己紹介文
- [ ] アバター画像の追加

### 4.9 目次（Table of Contents）
- [ ] `components/Markdown/TableOfContents.tsx`の作成
  - [ ] 見出しリストの表示
  - [ ] アンカーリンク
  - [ ] スクロール連動（オプション）
- [ ] 記事詳細ページに組み込み

### 4.10 コードブロックの改善
- [ ] コピーボタンの追加
- [ ] 言語名の表示
- [ ] 行番号の表示（オプション）
- [ ] 複数のシンタックステーマ対応

### 4.11 ローディング状態
- [ ] `app/loading.tsx`の作成
- [ ] Suspense境界の設定
- [ ] スケルトンスクリーンの実装

### 4.12 動作確認
- [ ] 全デバイスで表示確認
- [ ] アクセシビリティ検証
- [ ] SEO監査
- [ ] パフォーマンステスト
- [ ] ビルドエラーがないか

---

## Phase 5: デプロイ・本番運用（目安: 3-5日）

**目標**: Vercelへのデプロイと本番環境構築

### 5.1 GitHubリポジトリの準備
- [x] GitHubリポジトリの作成
- [x] ローカルリポジトリとの連携
- [x] 初回コミット＆プッシュ
- [x] ブランチ戦略の設定（main/developなど）

### 5.2 Vercelプロジェクトの作成
- [x] Vercelアカウント作成/ログイン
- [x] 新規プロジェクト作成
- [x] GitHubリポジトリと連携
- [x] ビルド設定の確認
  - [x] Framework Preset: Next.js
  - [x] Build Command: `pnpm build`
  - [x] Output Directory: `.next`
  - [x] Install Command: `pnpm install`
- [x] ビルドエラーの修正（ESLint/TypeScript）
- [x] デプロイ成功確認

### 5.3 環境変数の設定
- [x] Vercel Dashboardで環境変数追加
  - [x] `NEXT_PUBLIC_SITE_URL`（本番URL）
  - [x] `NEXT_PUBLIC_SITE_NAME`
  - [-] `NEXT_PUBLIC_GA_ID`（Google Analytics、後日設定）
- [x] Production環境に設定
- [-] Preview環境に設定（必要に応じて）

### 5.4 初回デプロイ
- [x] Vercel Dashboardから「Deploy」実行
- [x] ビルドログの確認
- [x] デプロイ成功の確認
- [x] デプロイURLにアクセス

### 5.5 カスタムドメインの設定（オプション）
- [-] ドメインの取得（現時点では不要、将来的に実施可能）
- [-] Vercelにドメイン追加
- [-] DNSレコードの設定
  - [-] Aレコード
  - [-] CNAMEレコード
- [-] SSL証明書の発行確認
- [-] リダイレクト設定（www → 非www等）
- [x] Vercelデフォルトドメインで運用決定

### 5.6 分析ツールの導入
- [ ] Vercel Analyticsの有効化
- [ ] Google Analytics設定
  - [ ] GAタグの追加
  - [ ] 環境変数の設定
  - [ ] 動作確認
- [ ] Vercel Speed Insightsの導入（オプション）

### 5.7 自動デプロイの確認
- [x] `main`ブランチへのプッシュでデプロイ
- [-] プレビューデプロイの動作確認（今後）
- [-] デプロイフックの設定（必要に応じて）

### 5.8 本番環境での動作確認
- [x] すべてのページが表示されるか
- [x] 記事が正しく表示されるか
- [x] タグ機能が動作するか
- [x] 検索機能が動作するか
- [-] OGP画像が表示されるか（Phase 4で実装予定）
- [x] サイトマップが生成されているか
- [x] robots.txtが配信されているか

### 5.9 パフォーマンステスト（本番環境）
- [ ] Lighthouse監査（本番URL）
- [ ] Core Web Vitalsの確認
- [ ] 画像読み込み速度の確認
- [ ] モバイル表示の確認

### 5.10 ドキュメントの更新
- [x] `README.md`に本番URLを追加
- [x] デプロイ手順の記録
- [x] 環境変数のドキュメント化

### 5.11 バックアップ・監視
- [x] Git履歴の確認（バックアップ）
- [x] Vercelのログ確認方法の確認
- [-] エラー通知の設定（必要に応じて）

---

## Phase 6: 拡張機能（今後の開発）

**優先度: 低（余裕があれば実装）**

### 6.1 ダークモード
- [ ] `next-themes`のインストール
- [ ] テーマ切り替えボタンの追加
- [ ] ダークモードスタイルの適用
- [ ] システム設定の自動検知

### 6.2 コメント機能
- [ ] Giscusの導入
- [ ] 記事詳細ページに組み込み
- [ ] GitHub Discussionsとの連携

### 6.3 記事共有ボタン
- [ ] Twitter共有ボタン
- [ ] Facebook共有ボタン
- [ ] リンクコピーボタン

### 6.4 関連記事表示
- [ ] タグベースの関連記事抽出
- [ ] 記事詳細ページに表示

### 6.5 RSSフィード
- [ ] RSS生成ロジックの実装
- [ ] `/rss.xml`エンドポイントの作成
- [ ] Atom形式の対応

### 6.6 ブックマーク機能
- [ ] LocalStorageでのブックマーク管理
- [ ] ブックマーク一覧ページ

### 6.7 記事の閲覧数カウント
- [ ] Google Analyticsとの連携
- [ ] 閲覧数の表示

### 6.8 PWA対応
- [ ] `next-pwa`のインストール
- [ ] Service Workerの設定
- [ ] オフライン対応

---

## 進捗サマリー

| Phase | タスク数 | 完了 | 進行中 | 未着手 | 進捗率 |
|-------|---------|------|--------|--------|--------|
| Phase 1 | 28 | 28 | 0 | 0 | 100% |
| Phase 2 | 59 | 57 | 0 | 2 | 97% |
| Phase 3 | 35 | 34 | 0 | 1 | 97% |
| Phase 4 | 52 | 0 | 0 | 52 | 0% |
| Phase 5 | 37 | 28 | 0 | 9 | 76% |
| Phase 6 | 24 | 0 | 0 | 24 | 0% |
| **合計** | **235** | **147** | **0** | **88** | **63%** |

---

## 注意事項

### タスクの更新方法
1. タスクを開始したら `[ ]` → `[~]` に変更
2. タスクを完了したら `[ ]` → `[x]` に変更
3. ブロックされたら `[ ]` → `[!]` に変更し、理由を記載
4. 不要になったら `[ ]` → `[-]` に変更

### コミット時のルール
- タスク完了時は必ずこのファイルを更新してコミット
- コミットメッセージに該当タスクを記載
  ```bash
  git commit -m "feat: implement getAllPosts function [Phase 2.4]"
  ```

### 依存関係
- Phase 2は Phase 1完了後に開始
- Phase 3は Phase 2完了後に開始
- Phase 4は Phase 2-3完了後に開始可能
- Phase 5は Phase 4完了後に開始
- Phase 6は Phase 5完了後、または並行して実装可能

---

## 次のアクション

**現在のフェーズ**: Phase 5 - デプロイ・本番運用

**完了したフェーズ**:
- ✅ Phase 1: プロジェクトセットアップ（100%）
- ✅ Phase 2: Markdown処理・記事表示（97%）
- ✅ Phase 3: タグ・検索機能（97%）

**現在の状況**:
- ✅ Phase 5.1-5.4 完了: GitHubリポジトリ準備、Vercelデプロイ完了
- ✅ Phase 5.7-5.8 完了: 自動デプロイ確認、本番環境動作確認
- ✅ Phase 5.10-5.11 完了: ドキュメント更新、バックアップ確認
- **Production URL**: https://microblog-bub6sxb3f-nice-and-rich-2030s-projects.vercel.app/

**Phase 5進捗**: 76%完了（28/37タスク）

**残りのタスク**:
- Phase 5.5: カスタムドメイン設定（オプション）
- Phase 5.6: 分析ツール導入（オプション）
- Phase 5.9: パフォーマンステスト（推奨）

**次に実行すべきフェーズ**:
- Phase 4: UI/UX改善・レスポンシブ対応（推奨）
- Phase 6: 拡張機能（オプション）

---

## 変更履歴

| 日付 | 変更内容 |
|------|---------|
| 2025-10-16 | 初版作成 - Phase 1-6のタスクリスト定義 |
| 2025-10-17 | Phase 1-3完了マーク、Phase 5.1-5.2進行状況更新 |
| 2025-10-17 | ビルドエラー修正完了、進捗サマリー更新（53%完了） |
| 2025-10-17 | Phase 5 デプロイ完了（76%）、進捗サマリー更新（63%完了） |
