'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { slug: '', nameHi: 'सभी' },
  { slug: 'rajniti', nameHi: 'राजनीति' },
  { slug: 'sports', nameHi: 'खेल' },
  { slug: 'entertainment', nameHi: 'मनोरंजन' },
];

export function CategoryFilterChips() {
  const sp = useSearchParams();
  const current = sp?.get('category') ?? '';
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2 bg-white dark:bg-uk-dark-surface border-b border-uk-border">
      {CATEGORIES.map((c) => {
        const active = current === c.slug || (c.slug === '' && !current);
        return (
          <Link key={c.slug || 'all'} href={c.slug ? `/?category=${c.slug}` : '/'} className={cn('shrink-0 px-4 py-2 rounded-uk-full text-uk-sm font-devanagari', active ? 'bg-uk-red text-white' : 'bg-uk-surface text-uk-text-secondary')}>
            {c.nameHi}
          </Link>
        );
      })}
    </div>
  );
}
