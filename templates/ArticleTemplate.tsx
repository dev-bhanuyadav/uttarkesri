'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/atoms/Badge';
import { TimeAgo } from '@/components/atoms/TimeAgo';
import { ViewCount } from '@/components/atoms/ViewCount';
import { LiveDot } from '@/components/atoms/LiveDot';
import { BreakingTag } from '@/components/atoms/BreakingTag';
import { ShareBar } from '@/components/molecules/ShareBar';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { TopBar } from '@/components/organisms/Header/TopBar';
import { MainHeader } from '@/components/organisms/Header/MainHeader';
import { NavBar } from '@/components/organisms/Header/NavBar';
import { Footer } from '@/components/organisms/Footer';
import type { Article } from '@/types/article';

interface ArticleTemplateProps {
  article: Article;
}

function ArticleContent({ article }: { article: Article }) {
  const progress = useScrollProgress();
  const category = article.category;
  const author = article.author;
  const pathname = usePathname();
  const url = pathname || `/article/${article.slug}`;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-uk-border dark:bg-uk-dark-border">
        <ProgressBar value={progress} height={3} className="!rounded-none" />
      </div>
      <div className="tricolor-strip fixed top-1 left-0 right-0 z-50" />
      <div className="pt-1">
        <TopBar />
        <MainHeader />
        <NavBar />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8">
            <nav className="text-uk-sm text-uk-text-muted mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-uk-red">होम</Link>
              {category && (
                <>
                  {' > '}
                  <Link href={`/${category.slug}`} className="hover:text-uk-red">{category.nameHi}</Link>
                </>
              )}
              {' > '}
              <span className="text-uk-text-primary line-clamp-1">{article.title}</span>
            </nav>

            <div className="flex flex-wrap gap-2 mb-2">
              {category && <Badge variant="category" color={category.color}>{category.nameHi}</Badge>}
              {article.isBreaking && <BreakingTag />}
              {article.isLive && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-uk-sm bg-uk-red text-white text-uk-xs font-bold">
                  <LiveDot /> LIVE
                </span>
              )}
            </div>

            <h1 className="font-devanagari font-bold text-uk-2xl md:text-uk-3xl text-uk-text-primary mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-uk-sm text-uk-text-secondary mb-6">
              {author && (
                <Link href={`/author/${author.slug}`} className="font-medium hover:text-uk-red">
                  {author.name}
                </Link>
              )}
              {author?.designation && <span>{author.designation}</span>}
              <span>●</span>
              <TimeAgo date={article.publishedAt || article.createdAt} />
              <span>⏱️ {article.readTimeMinutes} मिनट</span>
              <ViewCount count={article.viewCount} />
            </div>

            <div className="relative aspect-video rounded-uk-lg overflow-hidden bg-uk-surface mb-6">
              <Image
                src={article.featuredImage}
                alt={article.featuredImageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {article.imageCaption && (
                <p className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-uk-xs text-center">
                  {article.imageCaption}
                </p>
              )}
            </div>

            <div
              className="prose prose-lg max-w-none font-devanagari text-uk-md leading-relaxed dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: renderBody(article.body) }}
            />

            <div className="mt-8 pt-6 border-t border-uk-border dark:border-uk-dark-border">
              <ShareBar url={url} title={article.title} text={article.excerpt} variant="horizontal" />
            </div>

            {author && (
              <div className="mt-8 p-6 rounded-uk-lg bg-uk-surface dark:bg-uk-dark-card flex gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-uk-border shrink-0">
                  {author.avatar ? (
                    <Image src={author.avatar} alt={author.name} width={80} height={80} className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-uk-2xl font-bold text-uk-text-muted">
                      {author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <Link href={`/author/${author.slug}`} className="font-bold text-uk-lg hover:text-uk-red">
                    {author.name}
                  </Link>
                  {author.designation && <p className="text-uk-sm text-uk-text-secondary">{author.designation}</p>}
                  {author.bio && <p className="mt-1 text-uk-sm text-uk-text-muted line-clamp-3">{author.bio}</p>}
                  <Link href={`/author/${author.slug}`} className="inline-block mt-2 text-uk-sm text-uk-red font-medium hover:underline">
                    इनके सभी लेख देखें →
                  </Link>
                </div>
              </div>
            )}
          </article>

          <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
            <ShareBar url={url} title={article.title} variant="vertical" className="bg-uk-white dark:bg-uk-dark-card p-4 rounded-uk-lg shadow-card" />
            <div className="bg-uk-surface dark:bg-uk-dark-card p-4 rounded-uk-lg">
              <h3 className="font-devanagari font-bold text-uk-lg mb-3">🔥 आज की टॉप 5 खबरें</h3>
              <p className="text-uk-sm text-uk-text-muted">लोड हो रहा है...</p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

function renderBody(body: unknown): string {
  if (typeof body === 'string') return body;
  if (!body || typeof body !== 'object') return '';
  const b = body as { content?: { type?: string; content?: unknown[] }[] };
  if (Array.isArray(b.content)) {
    return b.content.map((node) => renderNode(node)).join('');
  }
  return '';
}

function renderNode(node: { type?: string; content?: unknown[]; text?: string }): string {
  if (node.type === 'paragraph' && node.content) {
    return `<p>${node.content.map((n: unknown) => renderInline(n)).join('')}</p>`;
  }
  if (node.type === 'heading' && node.content) {
    const level = (node as { attrs?: { level?: number } }).attrs?.level ?? 2;
    return `<h${level}>${node.content.map((n: unknown) => renderInline(n)).join('')}</h${level}>`;
  }
  if (node.type === 'bulletList' && node.content) {
    const items = node.content.map((n: unknown) => renderNode(n as { type?: string; content?: unknown[] })).join('');
    return `<ul>${items}</ul>`;
  }
  if (node.type === 'listItem' && node.content) {
    return `<li>${node.content.map((n: unknown) => renderNode(n as { type?: string; content?: unknown[] })).join('')}</li>`;
  }
  if (node.type === 'blockquote' && node.content) {
    return `<blockquote>${node.content.map((n: unknown) => renderNode(n as { type?: string; content?: unknown[] })).join('')}</blockquote>`;
  }
  if (node.content) {
    return node.content.map((n: unknown) => renderNode(n as { type?: string; content?: unknown[] })).join('');
  }
  return '';
}

function renderInline(node: unknown): string {
  const n = node as { type?: string; text?: string; marks?: { type: string }[] };
  let text = n.text ?? '';
  if (n.marks?.some((m) => m.type === 'bold')) text = `<strong>${text}</strong>`;
  if (n.marks?.some((m) => m.type === 'italic')) text = `<em>${text}</em>`;
  if (n.marks?.some((m) => m.type === 'link')) text = `<a href="#" class="text-uk-red hover:underline">${text}</a>`;
  return text;
}

export function ArticleTemplate({ article }: ArticleTemplateProps) {
  return <ArticleContent article={article} />;
}
