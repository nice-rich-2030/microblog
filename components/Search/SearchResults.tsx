import type { Post } from '@/types/post';
import { PostList } from '@/components/Post/PostList';

interface SearchResultsProps {
  posts: Post[];
  query: string;
  totalResults: number;
}

export function SearchResults({ posts, query, totalResults }: SearchResultsProps) {
  if (!query) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>検索キーワードを入力してください。</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium mb-2">
          「{query}」に一致する記事が見つかりませんでした
        </p>
        <p className="text-muted-foreground">
          別のキーワードで検索してみてください。
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          「{query}」の検索結果: {totalResults} 件
        </p>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
