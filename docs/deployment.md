# デプロイガイド

## 概要
このドキュメントは、マイクロブログをVercelにデプロイする手順とデプロイ後の運用方法を説明します。

---

## 目次
1. [デプロイ前の準備](#デプロイ前の準備)
2. [Vercelへのデプロイ](#vercelへのデプロイ)
3. [環境変数の設定](#環境変数の設定)
4. [カスタムドメインの設定](#カスタムドメインの設定)
5. [自動デプロイの設定](#自動デプロイの設定)
6. [パフォーマンス最適化](#パフォーマンス最適化)
7. [監視とログ](#監視とログ)
8. [トラブルシューティング](#トラブルシューティング)

---

## デプロイ前の準備

### 1. ビルドの確認

ローカル環境でビルドが成功することを確認します。

```bash
# 依存関係のインストール
pnpm install

# ビルド実行
pnpm build

# ビルド結果の確認
pnpm start
```

**チェックポイント**:
- [ ] ビルドエラーがない
- [ ] TypeScriptエラーがない
- [ ] すべてのページが正しく表示される
- [ ] 画像が正しく読み込まれる

### 2. 環境変数の確認

`.env.local`ファイルを確認し、本番環境で必要な環境変数をリストアップします。

**例**:
```bash
# .env.local (開発環境)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=My Tech Blog
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. GitHubリポジトリの準備

#### リポジトリの作成
```bash
# Gitの初期化（まだの場合）
git init

# .gitignoreの確認
echo "node_modules/
.next/
out/
.env.local
.DS_Store" > .gitignore

# 初回コミット
git add .
git commit -m "Initial commit"

# GitHubリポジトリの作成（GitHub CLIの場合）
gh repo create microblog --public --source=. --remote=origin --push
```

#### または手動でリポジトリ作成
1. GitHub上で新規リポジトリ作成
2. ローカルリポジトリと連携

```bash
git remote add origin https://github.com/<username>/microblog.git
git branch -M main
git push -u origin main
```

---

## Vercelへのデプロイ

### 方法1: Vercel CLI（推奨）

#### 1. Vercel CLIのインストール
```bash
pnpm add -g vercel
```

#### 2. ログイン
```bash
vercel login
```

ブラウザで認証を完了します。

#### 3. デプロイ実行
```bash
# プロジェクトルートで実行
vercel

# 初回デプロイ時の質問に回答
# - Set up and deploy? Yes
# - Which scope? <your-account>
# - Link to existing project? No
# - Project name? microblog
# - In which directory is your code? ./
# - Override settings? No
```

#### 4. 本番デプロイ
```bash
vercel --prod
```

デプロイが完了すると、URLが表示されます:
```
✅ Production: https://microblog.vercel.app
```

---

### 方法2: Vercel Dashboard（Web UI）

#### 1. Vercelにサインイン
[https://vercel.com](https://vercel.com) にアクセスしてサインイン。

#### 2. 新規プロジェクトの作成
- 「Add New Project」をクリック
- GitHubリポジトリと連携
- `microblog`リポジトリを選択

#### 3. プロジェクト設定
- **Framework Preset**: Next.js
- **Root Directory**: `./`（変更不要）
- **Build Command**: `pnpm build`（自動検出）
- **Output Directory**: `.next`（自動検出）
- **Install Command**: `pnpm install`（自動検出）

#### 4. 環境変数の設定（後述）

#### 5. デプロイ実行
「Deploy」ボタンをクリックしてデプロイ開始。

---

## 環境変数の設定

### Vercel Dashboard経由

1. プロジェクトページの「Settings」タブ
2. 左メニュー「Environment Variables」
3. 以下の環境変数を追加:

**必須の環境変数**:
```bash
NEXT_PUBLIC_SITE_URL=https://microblog.vercel.app
NEXT_PUBLIC_SITE_NAME=My Tech Blog
```

**オプションの環境変数**:
```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# その他の分析ツール
NEXT_PUBLIC_VERCEL_ANALYTICS=true
```

**環境の選択**:
- `Production`: 本番環境のみ
- `Preview`: プレビュー環境のみ
- `Development`: 開発環境のみ（通常不要）

### Vercel CLI経由

```bash
# 環境変数の追加
vercel env add NEXT_PUBLIC_SITE_URL production

# 入力プロンプトで値を入力
# What's the value of NEXT_PUBLIC_SITE_URL?
# > https://microblog.vercel.app

# 環境変数の確認
vercel env ls
```

---

## カスタムドメインの設定

### 1. ドメインの取得
お名前.com、Google Domains等でドメインを取得。

### 2. Vercelでドメインを追加

#### Vercel Dashboard経由
1. プロジェクトページの「Settings」タブ
2. 左メニュー「Domains」
3. 「Add」ボタンをクリック
4. ドメイン名を入力（例: `myblog.com`）
5. 「Add」をクリック

#### DNS設定
Vercelが提供するDNSレコードを、ドメインレジストラで設定:

**Aレコード**:
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAMEレコード（wwwサブドメイン）**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. SSL証明書の自動発行
VercelがLet's Encryptを使用して自動的にSSL証明書を発行します（数分〜1時間）。

### 4. リダイレクト設定
`www`から`非www`へのリダイレクトを設定（またはその逆）:

Vercel Dashboard → Settings → Domains → Redirect `www.myblog.com` to `myblog.com`

---

## 自動デプロイの設定

### Git連携による自動デプロイ

**デフォルト動作**:
- `main`ブランチへのプッシュ → 本番デプロイ
- その他のブランチへのプッシュ → プレビューデプロイ

### ブランチ別のデプロイ戦略

#### Production（本番）
```bash
git checkout main
git add .
git commit -m "feat: add new feature"
git push origin main
# → Vercelが自動的に本番デプロイ
```

#### Preview（プレビュー）
```bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: implement new feature"
git push origin feature/new-feature
# → Vercelがプレビューデプロイ（一時URL発行）
```

プルリクエストのコメントにプレビューURLが自動追加されます。

### デプロイフック（Webhook）

特定のイベントでデプロイをトリガー:

1. Vercel Dashboard → Settings → Git
2. 「Deploy Hooks」セクション
3. フック名と対象ブランチを指定
4. URLをコピー

**使用例**:
```bash
# cURLでデプロイトリガー
curl -X POST https://api.vercel.com/v1/integrations/deploy/...
```

---

## パフォーマンス最適化

### 1. 画像最適化
Next.js Image Optimizationは自動的に有効化されます。

**確認事項**:
```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};
```

### 2. キャッシュ設定
Vercelは自動的に静的アセットをキャッシュします。

**カスタムヘッダー**:
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 3. 静的生成（SSG）の活用
```typescript
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}
```

### 4. ISR（Incremental Static Regeneration）

必要に応じてページを再生成:
```typescript
export const revalidate = 3600; // 1時間ごとに再生成
```

---

## 監視とログ

### Vercel Analytics

#### 有効化
1. Vercel Dashboard → Analytics
2. 「Enable Analytics」をクリック

#### 追加コスト
- 無料プラン: 2,500イベント/月
- Pro以上: より多くのイベント

### Vercel Speed Insights

パフォーマンス監視:
```bash
pnpm add @vercel/speed-insights
```

```typescript
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Google Analytics

```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### ログの確認

#### Vercel Dashboard
1. プロジェクトページ → Deployments
2. デプロイをクリック → Logs

#### Vercel CLI
```bash
# リアルタイムログ
vercel logs <deployment-url>

# 本番ログ
vercel logs --prod
```

---

## トラブルシューティング

### デプロイエラー

#### ビルドエラー
**症状**: `Build failed`

**解決方法**:
1. ローカルで`pnpm build`を実行
2. エラーメッセージを確認
3. TypeScriptエラーやESLintエラーを修正

```bash
# 型チェック
pnpm tsc --noEmit

# Lint
pnpm lint
```

#### 依存関係のエラー
**症状**: `Package not found`

**解決方法**:
```bash
# lockファイルを削除して再インストール
rm pnpm-lock.yaml
pnpm install
git add pnpm-lock.yaml
git commit -m "fix: update dependencies"
git push
```

#### タイムアウトエラー
**症状**: `Build exceeded maximum duration`

**解決方法**:
- ビルド時間を短縮（不要なファイルを除外）
- Vercel Proプランにアップグレード（ビルド時間制限緩和）

### 環境変数が反映されない

**確認事項**:
1. Vercel Dashboard → Settings → Environment Variables
2. 変数名が`NEXT_PUBLIC_`プレフィックス付きか確認
3. 対象環境（Production/Preview）が正しいか確認
4. 再デプロイを実行

```bash
vercel --prod --force
```

### ドメインが繋がらない

**確認事項**:
1. DNSレコードが正しく設定されているか
2. DNS伝播を待つ（最大48時間）
3. `dig`コマンドで確認

```bash
dig myblog.com
```

### 404エラー

**原因**: 動的ルートの`generateStaticParams`が不足

**解決方法**:
```typescript
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  return getAllPosts().map(post => ({
    slug: post.slug,
  }));
}
```

### 画像が表示されない

**確認事項**:
1. 画像が`public/`ディレクトリにあるか
2. パスが正しいか（`/images/xxx.jpg`）
3. ファイル名の大文字小文字が一致しているか

---

## デプロイチェックリスト

デプロイ前に以下を確認:

- [ ] ローカルで`pnpm build`が成功する
- [ ] TypeScriptエラーがない（`pnpm tsc --noEmit`）
- [ ] ESLintエラーがない（`pnpm lint`）
- [ ] すべてのページが正しく表示される
- [ ] レスポンシブデザインが動作する
- [ ] 環境変数が設定されている
- [ ] `.gitignore`に機密情報が含まれていない
- [ ] `README.md`が更新されている
- [ ] OGP画像が設定されている
- [ ] faviconが設定されている
- [ ] robots.txtが設定されている
- [ ] サイトマップが生成される

---

## 本番環境での運用

### 記事の追加・更新

```bash
# 1. 新しい記事を作成
vim content/posts/my-new-post.md

# 2. コミット＆プッシュ
git add content/posts/my-new-post.md
git commit -m "feat: add new blog post about Next.js"
git push origin main

# 3. Vercelが自動的にデプロイ
# → 数分後に本番環境に反映
```

### ロールバック

問題があるデプロイを取り消す:

#### Vercel Dashboard経由
1. Deployments → 前回の成功したデプロイを選択
2. 右上の「...」メニュー → 「Promote to Production」

#### Vercel CLI経由
```bash
# デプロイ履歴を確認
vercel ls

# 特定のデプロイに切り替え
vercel promote <deployment-url>
```

### パフォーマンス監視

定期的に以下を確認:
- Lighthouse Score（90点以上を維持）
- Core Web Vitals（LCP, FID, CLS）
- Vercel Analytics（アクセス数、ページビュー）
- エラーログ

---

## セキュリティ

### ベストプラクティス

1. **環境変数の管理**
   - `.env.local`をGitにコミットしない
   - 機密情報はVercelの環境変数に保存

2. **依存関係の更新**
   ```bash
   # 脆弱性チェック
   pnpm audit

   # 依存関係の更新
   pnpm update
   ```

3. **HTTPS強制**
   - VercelはデフォルトでHTTPSを強制

4. **CSP設定**
   ```javascript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/(.*)',
           headers: [
             {
               key: 'Content-Security-Policy',
               value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';",
             },
           ],
         },
       ];
     },
   };
   ```

---

## コスト管理

### Vercel無料プラン
- **ビルド時間**: 6,000分/月
- **帯域幅**: 100GB/月
- **サーバーレス関数実行**: 100GB-時間/月
- **画像最適化**: 1,000枚/月

個人ブログであれば無料プランで十分です。

### コスト削減のヒント
- 静的生成（SSG）を活用してサーバーレス関数の使用を削減
- 画像を事前に最適化
- 不要なデプロイを削減（プレビューデプロイの制限）

---

## まとめ

- **デプロイ方法**: Vercel CLI または Dashboard経由
- **自動デプロイ**: GitHubとの連携で自動化
- **環境変数**: Vercel Dashboardで管理
- **カスタムドメイン**: DNSレコード設定後、SSL自動発行
- **監視**: Vercel Analytics、Speed Insights、Google Analytics
- **運用**: 記事追加はGit経由、ロールバックも簡単

Vercelを使用することで、インフラ管理の手間を最小限に抑え、コンテンツ作成に集中できます。
