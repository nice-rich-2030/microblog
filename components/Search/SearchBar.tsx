'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
}

export function SearchBar({
  placeholder = '記事を検索...',
  defaultValue = '',
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue || searchParams.get('q') || '');

  // Debounce search
  useEffect(() => {
    if (!query) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('q', query);
      router.push(`/search?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    },
    [query, router]
  );

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
        />
      </div>
    </form>
  );
}
