'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, RefreshCcw } from 'lucide-react';
import { Container } from '@/components/Layout/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-destructive">エラー</h1>
          <h2 className="text-3xl font-bold tracking-tight">
            問題が発生しました
          </h2>
          <p className="text-muted-foreground max-w-md">
            予期しないエラーが発生しました。もう一度お試しください。
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                エラー詳細 (開発モードのみ)
              </summary>
              <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto max-w-2xl">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RefreshCcw className="w-4 h-4" />
            再試行
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="w-4 h-4" />
            ホームに戻る
          </Link>
        </div>
      </div>
    </Container>
  );
}
