import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { rehype } from 'rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { PostFrontMatter } from '@/types';

/**
 * Parse Markdown file content and extract frontmatter
 */
export function parseMarkdown(fileContent: string): {
  frontMatter: PostFrontMatter;
  content: string;
} {
  const { data, content } = matter(fileContent);

  const frontMatter: PostFrontMatter = {
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    updated: data.updated,
    tags: data.tags || [],
    description: data.description || '',
    image: data.image,
    draft: data.draft || false,
    author: data.author,
  };

  return { frontMatter, content };
}

/**
 * Convert Markdown to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  // First pass: Convert Markdown to HTML
  const result = await remark()
    .use(gfm) // GitHub Flavored Markdown
    .use(html, { sanitize: false })
    .process(markdown);

  const htmlContent = result.toString();

  // Second pass: Add syntax highlighting and heading anchors
  const rehypeResult = await rehype()
    .data('settings', { fragment: true })
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['anchor'],
      },
    })
    .process(htmlContent);

  return rehypeResult.toString();
}

/**
 * Generate table of contents from Markdown
 */
export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function generateTableOfContents(markdown: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({ id, title, level });
  }

  return toc;
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readingTime);
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, length: number = 150): string {
  // Remove Markdown syntax
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headings
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .trim();

  if (plainText.length <= length) {
    return plainText;
  }

  return plainText.substring(0, length).trim() + '...';
}
