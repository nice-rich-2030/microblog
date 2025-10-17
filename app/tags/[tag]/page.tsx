import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Tag as TagIcon } from 'lucide-react';
import { Container } from '@/components/Layout/Container';
import { PostList } from '@/components/Post/PostList';
import { getAllTags, getPostsByTag, getTagBySlug } from '@/lib/tags';
import type { Metadata } from 'next';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = await getTagBySlug(tagSlug);

  if (!tag) {
    return {
      title: 'Tag Not Found',
    };
  }

  return {
    title: `${tag.name} - Tags`,
    description: `Browse all posts tagged with "${tag.name}". ${tag.count} post${tag.count > 1 ? 's' : ''} available.`,
    keywords: [tag.name, 'tag', 'blog', 'posts'],
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  const tag = await getTagBySlug(tagSlug);

  if (!tag) {
    notFound();
  }

  const posts = await getPostsByTag(tagSlug);

  return (
    <Container className="py-12">
      {/* Back to Tags Link */}
      <Link
        href="/tags"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tags
      </Link>

      {/* Tag Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <TagIcon className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">{tag.name}</h1>
        </div>
        <p className="text-muted-foreground">
          {tag.count} 件の記事が見つかりました
        </p>
      </div>

      {/* Posts List */}
      <PostList posts={posts} />
    </Container>
  );
}
