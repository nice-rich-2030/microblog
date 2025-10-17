import Link from 'next/link';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/types';
import { Clock } from 'lucide-react';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact';
  className?: string;
}

export function PostCard({ post, variant = 'default', className }: PostCardProps) {
  const formattedDate = format(new Date(post.frontMatter.date), 'yyyy年MM月dd日');

  return (
    <Link href={`/posts/${post.slug}`} className="group">
      <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className || ''}`}>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.frontMatter.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{post.frontMatter.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-4 text-sm">
              <time dateTime={post.frontMatter.date}>{formattedDate}</time>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime}分
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
