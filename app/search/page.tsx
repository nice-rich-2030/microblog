import { Container } from '@/components/Layout/Container';
import { SearchBar } from '@/components/Search/SearchBar';
import { SearchResults } from '@/components/Search/SearchResults';
import { getAllPosts } from '@/lib/posts';
import { searchPosts } from '@/lib/search';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for blog posts by keyword, title, or content',
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query = '' } = await searchParams;
  const allPosts = await getAllPosts();

  // Perform search if query exists
  const searchResults = query ? searchPosts(allPosts, query) : [];
  const posts = searchResults.map((result) => result.post);

  return (
    <Container className="py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">記事を検索</h1>
        <p className="text-muted-foreground mb-6">
          タイトル、説明、タグ、本文から記事を検索できます。
        </p>
        <SearchBar defaultValue={query} />
      </div>

      <SearchResults posts={posts} query={query} totalResults={searchResults.length} />
    </Container>
  );
}
