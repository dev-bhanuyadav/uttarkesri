'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Badge } from '@/components/atoms/Badge';
import { TimeAgo } from '@/components/atoms/TimeAgo';
import { ShareBar } from '@/components/molecules/ShareBar';
import type { Article } from '@/types/article';

function renderBody(article: Article): string {
  if (typeof article.body === 'string' && article.body) return article.body;
  if (article.bodyText) {
    return article.bodyText
      .split(/\n\n+/)
      .map((p) => `<p class="mb-3">${p.replace(/\n/g, '<br/>')}</p>`)
      .join('');
  }
  return '';
}

export function MobileArticlePage({ article }: { article: Article }) {
  const progress = useScrollProgress();
  const category = article.category;
  const author = article.author;
  const url = typeof window !== 'undefined' ? window.location.href : `/article/${article.slug}`;

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-10 h-1 bg-uk-border">
        <div className="h-full bg-uk-red transition-transform duration-150" style={{ width: `${progress}%` }} />
      </div>
      <article className="pb-6">
        <div className="relative aspect-video w-full bg-uk-surface">
          <Image src={article.featuredImage} alt={article.featuredImageAlt} fill className="object-cover" sizes="100vw" priority />
          {article.imageCaption && (
            <p className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-uk-xs text-center">{article.imageCaption}</p>
          )}
        </div>
        <div className="px-4 pt-4">
          {category && <Badge variant="category" color={category.color}>{category.nameHi}</Badge>}
          <h1 className="font-devanagari font-bold text-xl mt-2 text-uk-text-primary leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-uk-sm text-uk-text-secondary mt-2">
            {author && <span className="font-medium">{author.name}</span>}
            <TimeAgo date={article.publishedAt || article.createdAt} />
            <span>⏱️ {article.readTimeMinutes} मिनट</span>
          </div>
          <div className="mt-4 prose prose-sm max-w-none font-devanagari text-uk-base leading-relaxed dark:prose-invert" dangerouslySetInnerHTML={{ __html: renderBody(article) }} />
          <div className="mt-6 pt-4 border-t border-uk-border">
            <ShareBar url={url} title={article.title} text={article.excerpt} variant="horizontal" />
          </div>
          {author && (
            <div className="mt-6 p-4 rounded-uk-lg bg-uk-surface flex gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-uk-border shrink-0">
                {author.avatar ? (
                  <Image src={author.avatar} alt={author.name} width={48} height={48} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold text-uk-text-muted">{author.name.charAt(0)}</div>
                )}
              </div>
              <div>
                <Link href={`/author/${author.slug}`} className="font-bold text-uk-base hover:text-uk-red">{author.name}</Link>
                {author.designation && <p className="text-uk-xs text-uk-text-secondary">{author.designation}</p>}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
