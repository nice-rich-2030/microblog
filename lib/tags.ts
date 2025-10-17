import { getAllPosts } from './posts';
import type { Tag } from '@/types/tag';
import type { Post } from '@/types/post';

/**
 * Get all unique tags from all posts with post counts
 * @returns Array of tags sorted by post count (descending)
 */
export async function getAllTags(): Promise<Tag[]> {
  const posts = await getAllPosts();
  const tagMap = new Map<string, number>();

  // Count posts for each tag
  posts.forEach((post) => {
    post.frontMatter.tags.forEach((tag) => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });

  // Convert to Tag array and sort by count (descending)
  const tags: Tag[] = Array.from(tagMap.entries()).map(([name, count]) => ({
    name,
    slug: generateTagSlug(name),
    count,
  }));

  return tags.sort((a, b) => b.count - a.count);
}

/**
 * Get posts filtered by tag
 * @param tag - Tag name or slug
 * @returns Array of posts with the specified tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  const normalizedTag = tag.toLowerCase();

  return allPosts.filter((post) =>
    post.frontMatter.tags.some(
      (postTag) => postTag.toLowerCase() === normalizedTag || generateTagSlug(postTag) === normalizedTag
    )
  );
}

/**
 * Get a single tag by slug
 * @param slug - Tag slug
 * @returns Tag object or null if not found
 */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const allTags = await getAllTags();
  return allTags.find((tag) => tag.slug === slug) || null;
}

/**
 * Generate a URL-friendly slug from tag name
 * @param tagName - Original tag name
 * @returns URL-friendly slug
 */
export function generateTagSlug(tagName: string): string {
  return tagName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Get popular tags (tags with most posts)
 * @param limit - Maximum number of tags to return
 * @returns Array of popular tags
 */
export async function getPopularTags(limit: number = 10): Promise<Tag[]> {
  const allTags = await getAllTags();
  return allTags.slice(0, limit);
}

/**
 * Check if a tag exists
 * @param tag - Tag name or slug
 * @returns True if tag exists
 */
export async function tagExists(tag: string): Promise<boolean> {
  const allTags = await getAllTags();
  const normalizedTag = tag.toLowerCase();

  return allTags.some(
    (t) => t.name.toLowerCase() === normalizedTag || t.slug === normalizedTag
  );
}
