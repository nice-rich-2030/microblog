import type { Post } from '@/types';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
  className?: string;
}

export function PostList({ posts, className }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          まだ記事がありません。
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className || ''}`}>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
