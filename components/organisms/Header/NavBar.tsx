'use client';

import { CategoryPill } from '@/components/molecules/CategoryPill';
import { LiveDot } from '@/components/atoms/LiveDot';

const categories = [
  { nameHi: 'होम', nameEn: 'Home', slug: 'home', icon: '🏠' },
  { nameHi: 'राजनीति', nameEn: 'Politics', slug: 'rajniti', icon: '🗳️' },
  { nameHi: 'देश', nameEn: 'National', slug: 'desh', icon: '🇮🇳' },
  { nameHi: 'विदेश', nameEn: 'World', slug: 'videsh', icon: '🌍' },
  { nameHi: 'यूपी विशेष', nameEn: 'UP Special', slug: 'up-vishesh', icon: '⚡' },
  { nameHi: 'खेल', nameEn: 'Sports', slug: 'sports', icon: '🏏' },
  { nameHi: 'मनोरंजन', nameEn: 'Entertainment', slug: 'entertainment', icon: '🎬' },
  { nameHi: 'व्यापार', nameEn: 'Business', slug: 'business', icon: '💼' },
  { nameHi: 'टेक', nameEn: 'Tech', slug: 'tech', icon: '📱' },
  { nameHi: 'किसान', nameEn: 'Farm', slug: 'kisan', icon: '🌾' },
  { nameHi: 'नौकरी', nameEn: 'Jobs', slug: 'sarkari-naukri', icon: '💼' },
  { nameHi: 'क्राइम', nameEn: 'Crime', slug: 'crime', icon: '🔴' },
  { nameHi: 'LIVE', nameEn: 'LIVE', slug: 'live-tv', icon: null, isLive: true },
];

export function NavBar() {
  return (
    <nav
      className="sticky top-[72px] z-30 bg-uk-white dark:bg-uk-dark-surface border-b border-uk-border dark:border-uk-dark-border shadow-sm"
      aria-label="मुख्य नेविगेशन"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1 h-11 overflow-x-auto scrollbar-hide">
          {categories.map((cat) =>
            cat.isLive ? (
              <a
                key={cat.slug}
                href={`/${cat.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-uk-full text-uk-sm font-bold text-uk-red hover:bg-uk-red-light transition-colors shrink-0"
              >
                <LiveDot /> LIVE
              </a>
            ) : (
              <CategoryPill
                key={cat.slug}
                nameHi={cat.nameHi}
                nameEn={cat.nameEn}
                slug={cat.slug}
                icon={cat.icon ?? undefined}
              />
            )
          )}
        </div>
      </div>
    </nav>
  );
}
