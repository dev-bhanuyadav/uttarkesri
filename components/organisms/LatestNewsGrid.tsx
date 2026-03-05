'use client';

import { ArticleCard } from '@/components/molecules/ArticleCard/ArticleCard';
import { ArticleCardSkeleton } from '@/components/atoms/Skeleton';
import type { Article } from '@/types/article';

interface LatestNewsGridProps {
  articles: Article[];
  loading?: boolean;
}

export function LatestNewsGrid({ articles, loading }: LatestNewsGridProps) {
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-6" aria-label="ताज़ा खबरें">
        <h2 className="font-devanagari font-bold text-uk-2xl text-uk-text-primary mb-4 pb-2 border-b-2 border-uk-red w-fit">
          ताज़ा खबरें
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6" aria-label="ताज़ा खबरें">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-devanagari font-bold text-uk-2xl text-uk-text-primary pb-2 border-b-2 border-uk-red">
          ताज़ा खबरें
        </h2>
        <span className="text-uk-sm text-uk-text-muted flex items-center gap-1">
          <span className="animate-spin">🔄</span> अभी अपडेट हुआ
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <ArticleCard key={article.id} article={article} priority={i < 3} />
        ))}
      </div>
    </section>
  );
}
