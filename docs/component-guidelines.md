# コンポーネントガイドライン

## 概要
このドキュメントは、マイクロブログプロジェクトにおけるReactコンポーネントの設計・実装ガイドラインを定義します。

---

## 目次
1. [コンポーネント設計原則](#コンポーネント設計原則)
2. [コンポーネントの分類](#コンポーネントの分類)
3. [コンポーネント実装パターン](#コンポーネント実装パターン)
4. [主要コンポーネント仕様](#主要コンポーネント仕様)
5. [アクセシビリティ](#アクセシビリティ)
6. [パフォーマンス最適化](#パフォーマンス最適化)

---

## コンポーネント設計原則

### 1. 単一責任の原則 (Single Responsibility Principle)
各コンポーネントは**1つの明確な役割**のみを持つ。

```typescript
// ✅ 良い例: 単一の責任
export function PostTitle({ title }: { title: string }) {
  return <h1 className="text-3xl font-bold">{title}</h1>;
}

export function PostMeta({ date, tags }: PostMetaProps) {
  return (
    <div>
      <time>{date}</time>
      <TagList tags={tags} />
    </div>
  );
}

// ❌ 悪い例: 複数の責任を持つ
export function PostHeader({ post }: { post: Post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <TagList tags={post.tags} />
      <ShareButtons url={post.url} />
      <AuthorInfo author={post.author} />
    </div>
  );
}
```

### 2. コンポジション (Composition)
小さなコンポーネントを組み合わせて、大きなコンポーネントを構築。

```typescript
// 小さなコンポーネント
export function PostTitle({ children }: PropsWithChildren) {
  return <h1 className="text-3xl font-bold">{children}</h1>;
}

export function PostDate({ date }: { date: string }) {
  return <time dateTime={date}>{formatDate(date)}</time>;
}

// コンポジション
export function PostHeader({ post }: { post: Post }) {
  return (
    <header>
      <PostTitle>{post.title}</PostTitle>
      <PostDate date={post.date} />
    </header>
  );
}
```

### 3. Props の最小化
必要最低限のPropsのみを受け取る。

```typescript
// ✅ 良い例: 必要なデータのみ
interface PostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

// ❌ 悪い例: Post全体を渡す（使わないデータも含む）
interface PostCardProps {
  post: Post; // content, htmlContent等も含まれる
}
```

### 4. 型安全性
すべてのPropsに型定義を付ける。

```typescript
// ✅ 良い例
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  // 実装
};

// ❌ 悪い例: any使用
export const Button = (props: any) => {
  // 実装
};
```

---

## コンポーネントの分類

### 1. レイアウトコンポーネント (Layout Components)
ページの構造を定義。

**配置**: `components/Layout/`

**例**:
- `Header.tsx` - ヘッダー
- `Footer.tsx` - フッター
- `Sidebar.tsx` - サイドバー
- `Container.tsx` - コンテンツラッパー

### 2. UIコンポーネント (UI Components)
shadcn/ui等の基本的なUIパーツ。

**配置**: `components/ui/`

**例**:
- `button.tsx`
- `card.tsx`
- `input.tsx`
- `badge.tsx`

### 3. ドメインコンポーネント (Domain Components)
ビジネスロジックを持つコンポーネント。

**配置**: `components/<Domain>/`

**例**:
- `components/Post/PostCard.tsx`
- `components/Tag/TagList.tsx`
- `components/Search/SearchBar.tsx`

### 4. ページコンポーネント (Page Components)
App Routerのページ定義。

**配置**: `app/`

**例**:
- `app/page.tsx` - ホーム
- `app/posts/[slug]/page.tsx` - 記事詳細

---

## コンポーネント実装パターン

### テンプレート

```typescript
// components/Post/PostCard.tsx

// 1. import文
import { FC } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { TagBadge } from '@/components/Tag/TagBadge';
import { cn } from '@/lib/utils';
import type { Post } from '@/types';

// 2. 型定義
interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact';
  className?: string;
}

// 3. コンポーネント定義
export const PostCard: FC<PostCardProps> = ({
  post,
  variant = 'default',
  className,
}) => {
  // 4. 早期リターン
  if (!post) return null;

  // 5. ロジック
  const isCompact = variant === 'compact';
  const cardClasses = cn(
    'post-card transition-shadow hover:shadow-lg',
    isCompact && 'post-card--compact',
    className
  );

  // 6. JSX return
  return (
    <Card className={cardClasses}>
      <Link href={`/posts/${post.slug}`}>
        <article>
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="text-muted-foreground">{post.description}</p>
          <div className="flex gap-2 mt-4">
            {post.tags.map(tag => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </article>
      </Link>
    </Card>
  );
};

// 7. displayName（デバッグ用）
PostCard.displayName = 'PostCard';
```

### サーバーコンポーネント vs クライアントコンポーネント

#### サーバーコンポーネント（デフォルト）
```typescript
// app/posts/page.tsx
import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/Post/PostCard';

// async/awaitが使える
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

**メリット**:
- サーバーでのデータ取得が可能
- JavaScriptバンドルサイズ削減
- SEOに有利

**使用場面**:
- データベースアクセス
- 静的コンテンツ表示
- SEOが重要なページ

#### クライアントコンポーネント
```typescript
// components/Search/SearchBar.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

export function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Input
      type="search"
      placeholder="Search posts..."
      value={query}
      onChange={handleSearch}
    />
  );
}
```

**必須条件**:
- `useState`, `useEffect`等のReact Hooks使用
- ブラウザAPI使用（`window`, `document`等）
- イベントハンドラー使用

**使用場面**:
- フォーム入力
- モーダル・ダイアログ
- インタラクティブUI

---

## 主要コンポーネント仕様

### 1. PostCard - 記事カード

**目的**: 記事一覧での記事カード表示

**Props**:
```typescript
interface PostCardProps {
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    image?: string;
  };
  variant?: 'default' | 'compact';
  className?: string;
}
```

**使用例**:
```typescript
<PostCard post={post} variant="default" />
```

---

### 2. PostList - 記事リスト

**目的**: 複数の記事を一覧表示

**Props**:
```typescript
interface PostListProps {
  posts: Post[];
  variant?: 'default' | 'compact';
  className?: string;
}
```

**使用例**:
```typescript
<PostList posts={posts} variant="compact" />
```

---

### 3. TagBadge - タグバッジ

**目的**: タグの表示

**Props**:
```typescript
interface TagBadgeProps {
  tag: string;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
  className?: string;
}
```

**使用例**:
```typescript
<TagBadge tag="Next.js" variant="outline" clickable />
```

---

### 4. TagList - タグリスト

**目的**: 複数タグの表示

**Props**:
```typescript
interface TagListProps {
  tags: string[];
  variant?: 'default' | 'outline';
  maxDisplay?: number; // 表示する最大タグ数
  className?: string;
}
```

**使用例**:
```typescript
<TagList tags={post.tags} maxDisplay={3} />
```

---

### 5. SearchBar - 検索バー

**目的**: 記事検索入力

**Props**:
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}
```

**使用例**:
```typescript
<SearchBar
  onSearch={handleSearch}
  placeholder="Search posts..."
/>
```

---

### 6. Header - ヘッダー

**目的**: サイト共通ヘッダー

**Props**:
```typescript
interface HeaderProps {
  className?: string;
}
```

**実装例**:
```typescript
export function Header({ className }: HeaderProps) {
  return (
    <header className={cn('border-b', className)}>
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold">
            My Blog
          </Link>
          <div className="flex gap-4">
            <Link href="/posts">Posts</Link>
            <Link href="/tags">Tags</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
```

---

### 7. Footer - フッター

**目的**: サイト共通フッター

**Props**:
```typescript
interface FooterProps {
  className?: string;
}
```

**実装例**:
```typescript
export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-t mt-12', className)}>
      <Container>
        <div className="py-8 text-center text-sm text-muted-foreground">
          © 2025 My Blog. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
```

---

### 8. Container - コンテナ

**目的**: コンテンツの横幅制限

**Props**:
```typescript
interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
```

**実装例**:
```typescript
export function Container({
  children,
  size = 'lg',
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4',
        size === 'sm' && 'max-w-2xl',
        size === 'md' && 'max-w-4xl',
        size === 'lg' && 'max-w-6xl',
        size === 'xl' && 'max-w-7xl',
        className
      )}
    >
      {children}
    </div>
  );
}
```

---

## アクセシビリティ

### 1. セマンティックHTML

```typescript
// ✅ 良い例
<article>
  <header>
    <h1>{post.title}</h1>
    <time dateTime={post.date}>{formattedDate}</time>
  </header>
  <section>{post.content}</section>
</article>

// ❌ 悪い例
<div>
  <div className="title">{post.title}</div>
  <div className="date">{formattedDate}</div>
  <div>{post.content}</div>
</div>
```

### 2. ARIA属性

```typescript
<button
  aria-label="Close dialog"
  aria-pressed={isActive}
  onClick={handleClick}
>
  <CloseIcon aria-hidden="true" />
</button>
```

### 3. キーボードナビゲーション

```typescript
<Link
  href={`/posts/${post.slug}`}
  className="focus:outline-none focus:ring-2 focus:ring-primary"
>
  {post.title}
</Link>
```

### 4. カラーコントラスト

```typescript
// Tailwind CSSでコントラスト比を確保
<p className="text-foreground bg-background">
  読みやすいテキスト
</p>
```

---

## パフォーマンス最適化

### 1. メモ化 (Memoization)

```typescript
import { memo } from 'react';

export const PostCard = memo(({ post }: PostCardProps) => {
  return (
    <Card>
      <h2>{post.title}</h2>
    </Card>
  );
});
```

**使用基準**:
- 頻繁に再レンダリングされる
- 計算コストが高い
- Propsが頻繁に変わらない

### 2. 動的インポート

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <Skeleton />,
    ssr: false, // CSRのみ
  }
);
```

### 3. 画像最適化

```typescript
import Image from 'next/image';

<Image
  src={post.image}
  alt={post.title}
  width={800}
  height={400}
  loading="lazy"
  placeholder="blur"
/>
```

### 4. React Suspense

```typescript
import { Suspense } from 'react';

<Suspense fallback={<PostListSkeleton />}>
  <PostList posts={posts} />
</Suspense>
```

---

## コンポーネントテスト

### 単体テスト例

```typescript
import { render, screen } from '@testing-library/react';
import { PostCard } from './PostCard';

describe('PostCard', () => {
  const mockPost = {
    slug: 'test-post',
    title: 'Test Post',
    description: 'Test Description',
    date: '2025-10-16',
    tags: ['Test'],
  };

  it('renders post title', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

---

## チェックリスト

新しいコンポーネントを作成する際のチェックリスト:

- [ ] 型定義が明示されているか
- [ ] 単一責任の原則を守っているか
- [ ] Propsは最小限か
- [ ] セマンティックHTMLを使用しているか
- [ ] アクセシビリティを考慮しているか
- [ ] レスポンシブ対応しているか
- [ ] パフォーマンスを考慮しているか
- [ ] エラーハンドリングがあるか
- [ ] コメント・ドキュメントが適切か
- [ ] 再利用可能な設計か

---

## まとめ

- **設計原則**: 単一責任、コンポジション、Props最小化、型安全性
- **分類**: レイアウト、UI、ドメイン、ページコンポーネント
- **実装パターン**: テンプレート、サーバー/クライアントコンポーネント
- **アクセシビリティ**: セマンティックHTML、ARIA、キーボード対応
- **パフォーマンス**: メモ化、動的インポート、画像最適化

このガイドラインに従うことで、保守性が高く、アクセシブルで、パフォーマンスの良いコンポーネントを実装できます。
