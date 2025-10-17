import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { generateTagSlug } from '@/lib/tags';

interface TagBadgeProps {
  tag: string;
  count?: number;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  showCount?: boolean;
}

export function TagBadge({
  tag,
  count,
  variant = 'secondary',
  showCount = false,
}: TagBadgeProps) {
  const slug = generateTagSlug(tag);

  return (
    <Link href={`/tags/${slug}`}>
      <Badge variant={variant} className="hover:opacity-80 transition-opacity cursor-pointer">
        {tag}
        {showCount && count !== undefined && (
          <span className="ml-1 text-xs opacity-70">({count})</span>
        )}
      </Badge>
    </Link>
  );
}
