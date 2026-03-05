'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/atoms/Badge';
import { TimeAgo } from '@/components/atoms/TimeAgo';
import { ViewCount } from '@/components/atoms/ViewCount';
import { LiveDot } from '@/components/atoms/LiveDot';
import { BreakingTag } from '@/components/atoms/BreakingTag';
import { cn } from '@/lib/utils';
import type { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
  className?: string;
  priority?: boolean;
}

export function ArticleCard({ article, className, priority }: ArticleCardProps) {
  const category = article.category;
  const author = article.author;
  const href = `/article/${article.slug}`;

  return (
    <article
      className={cn(
        'group rounded-uk-lg overflow-hidden bg-uk-white dark:bg-uk-dark-card shadow-card',
        'hover:shadow-hover hover:-translate-y-1 transition-all duration-150',
        className
      )}
    >
      <Link href={href} className="block">
        <div className="relative aspect-video overflow-hidden bg-uk-surface">
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-150"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {category && (
              <Badge variant="category" color={category.color}>
                {category.nameHi}
              </Badge>
            )}
            {article.isBreaking && <BreakingTag />}
            {article.isLive && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-uk-sm bg-uk-red text-white text-uk-xs font-bold">
                <LiveDot /> LIVE
              </span>
            )}
          </div>
        </div>
        <div className="p-4">
          <h2 className="font-devanagari font-bold text-uk-lg text-uk-text-primary group-hover:text-uk-red line-clamp-2 transition-colors">
            {article.title}
          </h2>
          <p className="mt-1 text-uk-sm text-uk-text-secondary line-clamp-2">{article.excerpt}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-uk-text-muted text-uk-sm">
            {author && <span>{author.name}</span>}
            <span>•</span>
            <TimeAgo date={article.publishedAt || article.createdAt} />
            <ViewCount count={article.viewCount} className="ml-auto" />
          </div>
        </div>
      </Link>
    </article>
  );
}
