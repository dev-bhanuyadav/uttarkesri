import { ArticleCardSkeleton } from '@/components/atoms/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-uk-off-white dark:bg-uk-dark-bg">
      <div className="h-9 bg-uk-dark-bg" />
      <div className="h-18 bg-uk-white dark:bg-uk-dark-surface border-b" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
