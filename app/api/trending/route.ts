import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        category: { select: { id: true, nameHi: true, nameEn: true, slug: true, color: true } },
        author: { select: { id: true, name: true, slug: true, avatar: true, designation: true } },
      },
      orderBy: { viewCount: 'desc' },
      take: 10,
    });
    const data = articles.map((a) => ({
      ...a,
      publishedAt: a.publishedAt?.toISOString() ?? null,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    }));
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json([]);
  }
}
