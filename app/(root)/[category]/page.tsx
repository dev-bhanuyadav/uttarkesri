import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { TopBar } from '@/components/organisms/Header/TopBar';
import { MainHeader } from '@/components/organisms/Header/MainHeader';
import { NavBar } from '@/components/organisms/Header/NavBar';
import { LatestNewsGrid } from '@/components/organisms/LatestNewsGrid';
import { Footer } from '@/components/organisms/Footer';
import type { Article } from '@/types/article';

export const revalidate = 120;

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const cat = await prisma.category.findFirst({
    where: { slug, isVisible: true },
    select: { nameHi: true, nameEn: true, seoTitle: true, seoDesc: true },
  });
  if (!cat) return {};
  const title = cat.seoTitle || `${cat.nameHi} | उत्तर केसरी`;
  const description = cat.seoDesc || `${cat.nameHi} की ताज़ा खबरें`;
  return { title, description };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = await prisma.category.findFirst({
    where: { slug, isVisible: true },
  });
  if (!category) notFound();

  const articles = await prisma.article.findMany({
    where: { status: 'PUBLISHED', categoryId: category.id },
    include: {
      category: { select: { id: true, nameHi: true, nameEn: true, slug: true, color: true } },
      author: { select: { id: true, name: true, slug: true, avatar: true, designation: true } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 24,
  });

  const serialized: Article[] = articles.map((a) => ({
    ...a,
    publishedAt: a.publishedAt?.toISOString() ?? null,
    scheduledAt: a.scheduledAt?.toISOString() ?? null,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  })) as Article[];

  return (
    <>
      <div className="tricolor-strip fixed top-0 left-0 right-0 z-50" />
      <div className="pt-1">
        <TopBar />
        <MainHeader />
        <NavBar />
      </div>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="font-devanagari font-bold text-uk-2xl text-uk-text-primary mb-6">
          {category.nameHi}
        </h1>
        <LatestNewsGrid articles={serialized} />
      </main>
      <Footer />
    </>
  );
}
