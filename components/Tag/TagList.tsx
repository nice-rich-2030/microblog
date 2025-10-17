import type { Tag } from '@/types/tag';
import { TagBadge } from './TagBadge';

interface TagListProps {
  tags: Tag[];
  showCount?: boolean;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

export function TagList({ tags, showCount = true, variant = 'secondary' }: TagListProps) {
  if (tags.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>タグがまだありません。</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <TagBadge
          key={tag.slug}
          tag={tag.name}
          count={tag.count}
          variant={variant}
          showCount={showCount}
        />
      ))}
    </div>
  );
}
