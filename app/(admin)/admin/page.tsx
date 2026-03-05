import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const articleCount = await prisma.article.count();
  const viewSum = await prisma.article.aggregate({
    where: { status: 'PUBLISHED' },
    _sum: { viewCount: true },
  });
  const totalViews = viewSum._sum.viewCount ?? 0;
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const publishedToday = await prisma.article.count({
    where: { status: 'PUBLISHED', publishedAt: { gte: startOfDay } },
  });

  return (
    <div className="p-6">
      <h1 className="font-devanagari font-bold text-uk-2xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-uk-dark-card rounded-uk-lg p-4 border border-uk-dark-border">
          <p className="text-uk-text-muted text-uk-sm">Total Views</p>
          <p className="text-uk-2xl font-mono font-bold text-uk-saffron">{totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-uk-dark-card rounded-uk-lg p-4 border border-uk-dark-border">
          <p className="text-uk-text-muted text-uk-sm">Total Articles</p>
          <p className="text-uk-2xl font-mono font-bold">{articleCount}</p>
        </div>
        <div className="bg-uk-dark-card rounded-uk-lg p-4 border border-uk-dark-border">
          <p className="text-uk-text-muted text-uk-sm">Published Today</p>
          <p className="text-uk-2xl font-mono font-bold">{publishedToday}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link href="/admin/articles/new" className="px-4 py-2 rounded-uk-md bg-uk-red text-white font-medium">
          New Article
        </Link>
        <Link href="/admin/articles" className="px-4 py-2 rounded-uk-md border border-uk-dark-border">
          All Articles
        </Link>
      </div>
    </div>
  );
}
