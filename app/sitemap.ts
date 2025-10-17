import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { getAllTags } from '@/lib/tags';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Get all posts
  const posts = await getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.frontMatter.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Get all tags
  const tags = await getAllTags();
  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tags/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [...staticPages, ...postEntries, ...tagEntries];
}
