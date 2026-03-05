'use client';

import { cn } from '@/lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton-shimmer rounded-uk-md', className)} />;
}

export function ArticleCardSkeleton() {
  return (
    <div className="rounded-uk-lg overflow-hidden bg-uk-white dark:bg-uk-dark-card shadow-card">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-32 mt-2" />
      </div>
    </div>
  );
}
