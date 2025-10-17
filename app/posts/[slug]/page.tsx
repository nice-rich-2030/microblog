import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Container } from '@/components/Layout/Container';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ViewCounter } from '@/components/Analytics/ViewCounter';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import type { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/posts/${slug}`;

  return {
    title: post.frontMatter.title,
    description: post.frontMatter.description,
    keywords: post.frontMatter.tags,
    authors: [{ name: 'Tech Blogger' }],
    openGraph: {
      title: post.frontMatter.title,
      description: post.frontMatter.description,
      type: 'article',
      url,
      publishedTime: post.frontMatter.date,
      tags: post.frontMatter.tags,
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontMatter.title,
      description: post.frontMatter.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontMatter, htmlContent, readingTime } = post;

  return (
    <Container size="md" className="py-12">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Post Header */}
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {frontMatter.title}
          </h1>

          {/* Post Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={frontMatter.date}>
                {format(new Date(frontMatter.date), 'yyyy-MM-dd')}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
            <ViewCounter slug={slug} />
          </div>

          {/* Tags */}
          {frontMatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontMatter.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <Separator className="my-8" />

        {/* Post Content */}
        <div
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </Container>
  );
}
