import { prisma } from '@/lib/prisma';
import { TickerManager } from './TickerManager';

export const dynamic = 'force-dynamic';

export default async function AdminTickerPage() {
  const rows = await prisma.tickerItem.findMany({ orderBy: { sortOrder: 'asc' } });
  const items = rows.map((r) => ({
    id: r.id,
    text: r.text,
    url: r.url,
    sortOrder: r.sortOrder,
    isActive: r.isActive,
    createdAt: r.createdAt.toISOString(),
  }));
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="font-devanagari font-bold text-uk-2xl mb-6">Breaking Ticker</h1>
      <TickerManager initialItems={items} />
    </div>
  );
}
