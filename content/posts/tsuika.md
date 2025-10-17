---
title: "Next.js 15の新機能とApp Routerの基本2"
date: "2025-10-15"
tags: ["Next.js", "React", "Web Development"]
description: "Next.js 15の主要な新機能とApp Routerの使い方を解説します。Server ComponentsやMetadata APIなど、実践的な活用方法を紹介。"
draft: false
---

## Next.js 15とは

Next.js 15は、Vercelが開発するReactフレームワークの最新バージョンです。App Routerが安定版となり、より強力で柔軟な開発が可能になりました。

## 主要な新機能

### 1. App Router（安定版）

App Routerは、Next.jsの新しいルーティングシステムです。`pages/`ディレクトリの代わりに`app/`ディレクトリを使用します。

\`\`\`
app/
├── layout.tsx    # ルートレイアウト
├── page.tsx      # ホームページ
└── posts/
    └── [slug]/
        └── page.tsx  # 動的ルート
\`\`\`

### 2. Server Components

デフォルトでサーバーコンポーネントとして動作し、クライアントサイドのJavaScriptバンドルサイズを削減できます。

\`\`\`typescript
// サーバーコンポーネント（デフォルト）
export default async function Page() {
  const data = await fetchData(); // サーバーでデータ取得
  return <div>{data}</div>;
}
\`\`\`

クライアントコンポーネントが必要な場合のみ`"use client"`を追加：

\`\`\`typescript
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

### 3. Metadata API

SEO対応のメタデータを簡単に設定できます。

\`\`\`typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page',
  description: 'This is my page',
  openGraph: {
    title: 'My Page',
    description: 'This is my page',
    images: ['/og-image.jpg'],
  },
};
\`\`\`

### 4. 静的生成とISR

`generateStaticParams`を使って、ビルド時に静的ページを生成：

\`\`\`typescript
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
\`\`\`

## パフォーマンスの改善

Next.js 15では、以下のような最適化が行われています：

- **高速な初回ロード**: Server Componentsによるバンドルサイズの削減
- **効率的なキャッシング**: 自動的なキャッシュ戦略
- **画像最適化**: next/imageによる自動最適化

## 実践的なTips

### Tip 1: Server Componentsを活用

データ取得が必要な場合は、Server Componentsを使うことで、クライアントサイドのJavaScriptを減らせます。

### Tip 2: 適切なキャッシング戦略

\`\`\`typescript
export const revalidate = 3600; // 1時間ごとに再生成
\`\`\`

### Tip 3: Loadingとエラーハンドリング

\`\`\`
app/posts/
├── loading.tsx  # ローディング表示
├── error.tsx    # エラー表示
└── page.tsx
\`\`\`

## まとめ

Next.js 15とApp Routerは、モダンなWeb開発において非常に強力なツールです。Server ComponentsやMetadata APIを活用することで、パフォーマンスとSEOを両立した Webアプリケーションを構築できます。

次回は、Tailwind CSSとの組み合わせについて解説します！
