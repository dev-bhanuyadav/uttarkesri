'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/atoms/Badge';
import { TimeAgo } from '@/components/atoms/TimeAgo';
import { cn } from '@/lib/utils';
import type { Article } from '@/types/article';

interface ArticleCardHorizontalProps {
  article: Article;
  className?: string;
}

export function ArticleCardHorizontal({ article, className }: ArticleCardHorizontalProps) {
  const category = article.category;
  const href = `/article/${article.slug}`;

  return (
    <article
      className={cn(
        'group flex gap-3 rounded-uk-md overflow-hidden',
        'hover:bg-uk-surface dark:hover:bg-uk-dark-surface transition-colors',
        className
      )}
    >
      <Link href={href} className="flex gap-3 flex-1 min-w-0">
        <div className="relative w-24 h-20 flex-shrink-0 rounded-uk-md overflow-hidden bg-uk-surface">
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            sizes="96px"
          />
        </div>
        <div className="min-w-0 flex-1">
          {category && (
            <Badge variant="category" color={category.color} className="mb-1">
              {category.nameHi}
            </Badge>
          )}
          <h3 className="font-devanagari font-semibold text-uk-sm text-uk-text-primary group-hover:text-uk-red line-clamp-2 transition-colors">
            {article.title}
          </h3>
          <TimeAgo date={article.publishedAt || article.createdAt} className="text-uk-xs text-uk-text-muted mt-0.5" />
        </div>
      </Link>
    </article>
  );
}
