'use client';

import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
  className?: string;
}

/**
 * View counter component
 * Note: This is a placeholder that shows "tracking enabled" message.
 * Actual view counts require GA4 Data API integration or alternative solution.
 */
export function ViewCounter({ slug, className }: ViewCounterProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Track page view event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: `/posts/${slug}`,
        page_title: slug,
      });
    }
  }, [slug]);

  if (!isClient) {
    return null;
  }

  return (
    <div className={`flex items-center gap-1 text-sm text-muted-foreground ${className || ''}`}>
      <Eye className="w-4 h-4" />
      <span>Tracking enabled</span>
    </div>
  );
}
