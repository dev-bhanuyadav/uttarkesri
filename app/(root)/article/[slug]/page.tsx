import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArticlePageView } from '@/components/ArticlePageView';
import type { Article } from '@/types/article';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, status: 'PUBLISHED' },
    select: { title: true, seoTitle: true, seoDescription: true, excerpt: true, ogImage: true, featuredImage: true },
  });
  if (!article) return {};
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const image = article.ogImage || article.featuredImage;
  return {
    title: `${title} | उत्तर केसरी`,
    description,
    openGraph: { title, description, images: [image] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const row = await prisma.article.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: {
      category: { select: { id: true, nameHi: true, nameEn: true, slug: true, color: true } },
      author: { select: { id: true, name: true, slug: true, avatar: true, designation: true, bio: true } },
      tags: { select: { id: true, nameHi: true, slug: true } },
      districts: { select: { id: true, nameHi: true, slug: true } },
    },
  });

  if (!row) notFound();

  const article: Article = {
    ...row,
    publishedAt: row.publishedAt?.toISOString() ?? null,
    scheduledAt: row.scheduledAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    correctedAt: row.correctedAt?.toISOString() ?? null,
  } as Article;

  return <ArticlePageView article={article} />;
}
