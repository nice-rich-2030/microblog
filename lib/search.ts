import Fuse, { type FuseResultMatch } from 'fuse.js';
import type { Post } from '@/types/post';

export interface SearchResult {
  post: Post;
  score: number;
  matches: string[];
}

/**
 * Search posts using Fuse.js fuzzy search
 * @param posts - Array of posts to search
 * @param query - Search query
 * @returns Array of search results sorted by relevance
 */
export function searchPosts(posts: Post[], query: string): SearchResult[] {
  if (!query || query.trim() === '') {
    return [];
  }

  const fuse = new Fuse(posts, {
    keys: [
      { name: 'frontMatter.title', weight: 2 },
      { name: 'frontMatter.description', weight: 1.5 },
      { name: 'frontMatter.tags', weight: 1.2 },
      { name: 'content', weight: 0.8 },
    ],
    includeScore: true,
    includeMatches: true,
    threshold: 0.4, // 0 = perfect match, 1 = match anything
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  const results = fuse.search(query);

  return results.map((result) => ({
    post: result.item,
    score: result.score || 0,
    matches: extractMatches(result.matches || []),
  }));
}

/**
 * Extract matched field names from Fuse.js matches
 * @param matches - Fuse.js match results
 * @returns Array of matched field names
 */
function extractMatches(matches: readonly FuseResultMatch[]): string[] {
  const fields = new Set<string>();

  matches.forEach((match) => {
    if (match.key) {
      // Convert key like "frontMatter.title" to "title"
      const field = match.key.split('.').pop();
      if (field) {
        fields.add(field);
      }
    }
  });

  return Array.from(fields);
}

/**
 * Build search index data for client-side search
 * @param posts - Array of posts
 * @returns Serializable search index data
 */
export interface SearchIndexData {
  posts: Array<{
    slug: string;
    title: string;
    description: string;
    tags: string[];
    date: string;
    excerpt: string;
    content: string;
  }>;
}

export function buildSearchIndex(posts: Post[]): SearchIndexData {
  return {
    posts: posts.map((post) => ({
      slug: post.slug,
      title: post.frontMatter.title,
      description: post.frontMatter.description,
      tags: post.frontMatter.tags,
      date: post.frontMatter.date,
      excerpt: post.excerpt,
      content: post.content.slice(0, 5000), // Limit content length for performance
    })),
  };
}

/**
 * Highlight search query in text
 * @param text - Original text
 * @param query - Search query
 * @returns Text with highlighted query
 */
export function highlightText(text: string, query: string): string {
  if (!query || query.trim() === '') {
    return text;
  }

  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
}

/**
 * Escape special characters in string for use in RegExp
 * @param string - String to escape
 * @returns Escaped string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
