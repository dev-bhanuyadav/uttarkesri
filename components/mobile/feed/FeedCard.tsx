'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/atoms/Badge';
import { TimeAgo } from '@/components/atoms/TimeAgo';
import type { Article } from '@/types/article';

interface FeedCardProps {
  article: Article;
  variant?: 'standard' | 'hero';
}

export function FeedCard({ article, variant = 'standard' }: FeedCardProps) {
  const category = article.category;
  const href = `/article/${article.slug}`;

  if (variant === 'hero') {
    return (
      <Link href={href} className="block relative aspect-video w-full overflow-hidden bg-uk-dark-bg">
        <Image src={article.featuredImage} alt={article.featuredImageAlt} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          {category && <Badge variant="category" color={category.color}>{category.nameHi}</Badge>}
          <h2 className="font-devanagari font-bold text-xl mt-2 line-clamp-2">{article.title}</h2>
          <TimeAgo date={article.publishedAt || article.createdAt} className="text-sm text-white/90 mt-1" />
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="block p-4 bg-white dark:bg-uk-dark-card border-b border-uk-border">
      <div className="flex gap-3">
        <div className="flex-1 min-w-0">
          {category && <Badge variant="category" color={category.color}>{category.nameHi}</Badge>}
          <h3 className="font-devanagari font-bold text-uk-base mt-1 line-clamp-3">{article.title}</h3>
          <TimeAgo date={article.publishedAt || article.createdAt} className="text-uk-xs text-uk-text-muted mt-1" />
        </div>
        <div className="w-24 h-20 shrink-0 rounded-uk-md overflow-hidden bg-uk-surface">
          <Image src={article.featuredImage} alt={article.featuredImageAlt} width={96} height={80} className="object-cover w-full h-full" />
        </div>
      </div>
    </Link>
  );
}
