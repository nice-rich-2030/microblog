import { Container } from '@/components/Layout/Container';
import { TagList } from '@/components/Tag/TagList';
import { getAllTags } from '@/lib/tags';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse all tags and topics covered in this blog',
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <Container className="py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">タグ一覧</h1>
        <p className="text-muted-foreground">
          ブログ記事のタグから気になるトピックを探せます。
        </p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          全 {tags.length} 個のタグ
        </p>
      </div>

      <TagList tags={tags} showCount={true} />
    </Container>
  );
}
