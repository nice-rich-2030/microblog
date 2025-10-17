import Link from 'next/link';
import { Home } from 'lucide-react';
import { Container } from '@/components/Layout/Container';
import { BackButton } from '@/components/ui/back-button';

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold tracking-tight">
            ページが見つかりません
          </h2>
          <p className="text-muted-foreground max-w-md">
            お探しのページは存在しないか、移動または削除された可能性があります。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Home className="w-4 h-4" />
            ホームに戻る
          </Link>
          <BackButton />
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>役立つリンク:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link href="/tags" className="hover:text-primary transition-colors underline">
              タグ一覧
            </Link>
            <Link href="/search" className="hover:text-primary transition-colors underline">
              記事を検索
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
