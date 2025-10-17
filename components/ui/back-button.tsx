'use client';

import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <ArrowLeft className="w-4 h-4" />
      前のページに戻る
    </button>
  );
}
