import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 30;

export async function GET() {
  try {
    const items = await prisma.tickerItem.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    const list = items.map((t) => ({
      id: t.id,
      text: t.text,
      url: t.url,
      sortOrder: t.sortOrder,
      isActive: t.isActive,
      createdAt: t.createdAt.toISOString(),
    }));
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json([]);
  }
}
