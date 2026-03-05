import { prisma } from '@/lib/prisma';
import { HomePageView } from '@/components/HomePageView';
import type { Article } from '@/types/article';
import type { TickerItem } from '@/types/ticker';
import type { PageLayoutConfig } from '@/types/builder';

export const revalidate = 60;

async function getHomeData() {
  const [articles, tickerRows, breaking, pageLayout] = await Promise.all([
    prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        category: { select: { id: true, nameHi: true, nameEn: true, slug: true, color: true } },
        author: { select: { id: true, name: true, slug: true, avatar: true, designation: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: 17,
    }),
    prisma.tickerItem.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.article.findMany({
      where: { status: 'PUBLISHED', isBreaking: true },
      select: { id: true, title: true, slug: true },
      orderBy: { publishedAt: 'desc' },
      take: 5,
    }),
    prisma.pageLayout.findUnique({
      where: { pageSlug: 'homepage' },
      select: { publishedJson: true },
    }),
  ]);

  const serialized = articles.map((a) => ({
    ...a,
    publishedAt: a.publishedAt?.toISOString() ?? null,
    scheduledAt: a.scheduledAt?.toISOString() ?? null,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  })) as Article[];

  let tickerItems: TickerItem[] = tickerRows.map((t) => ({
    id: t.id,
    text: t.text,
    url: t.url,
    sortOrder: t.sortOrder,
    isActive: t.isActive,
    duration: t.duration,
    createdAt: t.createdAt.toISOString(),
  }));

  if (tickerItems.length === 0 && breaking.length > 0) {
    tickerItems = breaking.map((a) => ({
      id: a.id,
      text: a.title,
      url: `/article/${a.slug}`,
      sortOrder: 0,
      isActive: true,
      duration: 8,
      createdAt: new Date().toISOString(),
    }));
  }

  const heroMain = serialized[0];
  const heroSide = serialized.slice(1, 5);
  const latestArticles = serialized.slice(5, 17);
  const builderLayout = pageLayout?.publishedJson as PageLayoutConfig | null;

  return {
    heroMain: heroMain ?? serialized[0],
    heroSide: heroSide.length ? heroSide : serialized.slice(1, 5),
    latestArticles: latestArticles.length ? latestArticles : serialized.slice(5),
    tickerItems,
    builderLayout: builderLayout ?? null,
    articles: serialized,
  };
}

export default async function HomePage() {
  let heroMain: Article;
  let heroSide: Article[] = [];
  let latestArticles: Article[] = [];
  let tickerItems: TickerItem[] = [];
  let builderLayout: PageLayoutConfig | null = null;
  let articles: Article[] = [];

  try {
    const data = await getHomeData();
    heroMain = data.heroMain;
    heroSide = data.heroSide;
    latestArticles = data.latestArticles;
    tickerItems = data.tickerItems;
    builderLayout = data.builderLayout;
    articles = data.articles;
  } catch (e) {
    console.error(e);
    heroMain = {} as Article;
  }

  if (!heroMain?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-devanagari text-uk-2xl font-bold text-uk-text-primary mb-2">
            उत्तर केसरी
          </h1>
          <p className="text-uk-text-secondary mb-4">
            कोई खबर नहीं मिली। कृपया डेटाबेस सेड चलाएं: <code className="bg-uk-surface px-2 py-1 rounded">npm run seed</code>
          </p>
          <p className="text-uk-sm text-uk-text-muted">
            Run <code>npm run setup</code> for full setup including seed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <HomePageView
      heroMain={heroMain}
      heroSide={heroSide}
      latestArticles={latestArticles}
      tickerItems={tickerItems}
      builderLayout={builderLayout}
      articles={articles}
    />
  );
}
