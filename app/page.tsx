import { Container } from '@/components/Layout/Container';
import { Separator } from '@/components/ui/separator';
import { PostList } from '@/components/Post/PostList';
import { getAllPosts } from '@/lib/posts';

export default async function Home() {
  const posts = await getAllPosts({ limit: 6 });

  return (
    <Container className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to My Tech Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          技術的な学びや発見を記録・共有する個人ブログ。
          Next.js 15、TypeScript、Markdownで構築されています。
        </p>
      </div>

      <Separator className="my-8" />

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">最新の記事</h2>
        <PostList posts={posts} />
      </div>
    </Container>
  );
}
