import fs from 'fs';
import path from 'path';
import type { Post } from '@/types';
import {
  parseMarkdown,
  markdownToHtml,
  calculateReadingTime,
  generateExcerpt,
} from './markdown';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface GetPostsOptions {
  includeDrafts?: boolean;
  limit?: number;
  sortBy?: 'date' | 'title';
  order?: 'asc' | 'desc';
}

/**
 * Get all posts
 */
export async function getAllPosts(
  options: GetPostsOptions = {}
): Promise<Post[]> {
  const {
    includeDrafts = false,
    limit,
    sortBy = 'date',
    order = 'desc',
  } = options;

  // Check if posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const { frontMatter, content } = parseMarkdown(fileContents);

        // Skip drafts in production
        if (!includeDrafts && frontMatter.draft) {
          return null;
        }

        const htmlContent = await markdownToHtml(content);
        const readingTime = calculateReadingTime(content);
        const excerpt = generateExcerpt(content);

        return {
          slug,
          frontMatter,
          content,
          htmlContent,
          readingTime,
          excerpt,
        };
      })
  );

  // Filter out null values (drafts)
  const posts = allPosts.filter((post): post is Post => post !== null);

  // Sort posts
  posts.sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.frontMatter.date).getTime();
      const dateB = new Date(b.frontMatter.date).getTime();
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    } else {
      return order === 'desc'
        ? b.frontMatter.title.localeCompare(a.frontMatter.title)
        : a.frontMatter.title.localeCompare(b.frontMatter.title);
    }
  });

  // Apply limit
  return limit ? posts.slice(0, limit) : posts;
}

/**
 * Get post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { frontMatter, content } = parseMarkdown(fileContents);

    // Don't return drafts in production
    if (frontMatter.draft && process.env.NODE_ENV === 'production') {
      return null;
    }

    const htmlContent = await markdownToHtml(content);
    const readingTime = calculateReadingTime(content);
    const excerpt = generateExcerpt(content);

    return {
      slug,
      frontMatter,
      content,
      htmlContent,
      readingTime,
      excerpt,
    };
  } catch {
    return null;
  }
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.frontMatter.tags.some(
      (t) => t.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * Get recent posts
 */
export async function getRecentPosts(count: number = 5): Promise<Post[]> {
  return getAllPosts({ limit: count });
}

/**
 * Get adjacent posts (previous and next)
 */
export async function getAdjacentPosts(slug: string): Promise<{
  prev: Post | null;
  next: Post | null;
}> {
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}

/**
 * Generate static params for static site generation
 */
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
