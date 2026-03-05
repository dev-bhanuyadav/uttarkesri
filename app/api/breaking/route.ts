import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 30;

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED', isBreaking: true },
      select: { id: true, title: true, slug: true },
      orderBy: { publishedAt: 'desc' },
      take: 10,
    });
    const items = articles.map((a) => ({
      id: a.id,
      text: a.title,
      url: `/article/${a.slug}`,
    }));
    return NextResponse.json(items);
  } catch (e) {
    console.error(e);
    return NextResponse.json([]);
  }
}
