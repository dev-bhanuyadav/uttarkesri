'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { FeedCard } from './FeedCard';
import { CategoryFilterChips } from './CategoryFilterChips';
import type { Article } from '@/types/article';
import type { TickerItem } from '@/types/ticker';

export function MobileFeed({ articles, tickerItems }: { articles: Article[]; tickerItems: TickerItem[] }) {
  const sp = useSearchParams();
  const categorySlug = sp?.get('category') ?? '';
  const filtered = useMemo(() => {
    if (!categorySlug) return articles;
    return articles.filter((a) => a.category?.slug === categorySlug);
  }, [articles, categorySlug]);
  const hero = filtered[0];
  const rest = filtered.slice(1);
  return (
    <div className="pb-4">
      {tickerItems.length > 0 && (
        <div className="flex overflow-x-auto gap-2 px-4 py-2 bg-uk-red text-white scrollbar-hide">
          {tickerItems.map((t) => (
            <Link key={t.id} href={t.url || '#'} className="shrink-0 text-uk-sm font-devanagari whitespace-nowrap">{t.text}</Link>
          ))}
        </div>
      )}
      <CategoryFilterChips />
      <div className="px-4 pt-4">
        {hero && <FeedCard article={hero} variant="hero" />}
        {rest.map((a) => <FeedCard key={a.id} article={a} />)}
      </div>
    </div>
  );
}
