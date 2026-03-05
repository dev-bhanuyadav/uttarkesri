import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.min(30, Math.max(1, parseInt(searchParams.get('limit') ?? '12', 10)));
  const categorySlug = searchParams.get('category');
  const skip = (page - 1) * limit;

  try {
    const where: { status: 'PUBLISHED'; category?: { slug: string } } = {
      status: 'PUBLISHED',
    };
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          category: { select: { id: true, nameHi: true, nameEn: true, slug: true, color: true } },
          author: { select: { id: true, name: true, slug: true, avatar: true, designation: true } },
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);

    const data = articles.map((a) => ({
      ...a,
      publishedAt: a.publishedAt?.toISOString() ?? null,
      scheduledAt: a.scheduledAt?.toISOString() ?? null,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    }));

    return NextResponse.json({ data, total, page, limit });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
