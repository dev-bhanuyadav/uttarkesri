'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/atoms/Badge';
import { TimeAgo } from '@/components/atoms/TimeAgo';
import { ViewCount } from '@/components/atoms/ViewCount';
import { LiveDot } from '@/components/atoms/LiveDot';
import { BreakingTag } from '@/components/atoms/BreakingTag';
import { ArticleCardHorizontal } from '@/components/molecules/ArticleCard/ArticleCardHorizontal';
import { cn } from '@/lib/utils';
import type { Article } from '@/types/article';

interface HeroSectionProps {
  main: Article;
  side: Article[];
}

export function HeroSection({ main, side }: HeroSectionProps) {
  const category = main.category;
  const author = main.author;

  return (
    <section className="w-full pt-6 pb-4" aria-label="Main news">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <div className="lg:col-span-7">
            <Link href={`/article/${main.slug}`} className="block group">
              <div className="relative aspect-video rounded-uk-xl overflow-hidden bg-uk-dark-bg">
                <Image
                  src={main.featuredImage}
                  alt={main.featuredImageAlt}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-150 animate-ken-burns"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" aria-hidden />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {category && <Badge variant="category" color={category.color}>{category.nameHi}</Badge>}
                    {main.isBreaking && <BreakingTag />}
                    {main.isLive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-uk-sm bg-uk-red text-white text-uk-xs font-bold">
                        <LiveDot /> LIVE
                      </span>
                    )}
                  </div>
                  <h1 className="font-devanagari font-bold text-uk-2xl md:text-uk-4xl line-clamp-2 group-hover:text-uk-red-light transition-colors">
                    {main.title}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-uk-sm text-white/90">
                    {author && <span>{author.name}</span>}
                    <span>●</span>
                    <TimeAgo date={main.publishedAt || main.createdAt} />
                    <ViewCount count={main.viewCount} className="text-white/80" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {side.slice(0, 4).map((art) => (
              <ArticleCardHorizontal key={art.id} article={art} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
