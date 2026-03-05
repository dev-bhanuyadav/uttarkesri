import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });

  try {
    const article = await prisma.article.findUnique({
      where: { slug, status: 'PUBLISHED' },
      include: {
        category: { select: { id: true, nameHi: true, nameEn: true, slug: true, color: true } },
        author: { select: { id: true, name: true, slug: true, avatar: true, designation: true, bio: true } },
        tags: { select: { id: true, nameHi: true, slug: true } },
        districts: { select: { id: true, nameHi: true, slug: true } },
      },
    });

    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const serialized = {
      ...article,
      publishedAt: article.publishedAt?.toISOString() ?? null,
      scheduledAt: article.scheduledAt?.toISOString() ?? null,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
      correctedAt: article.correctedAt?.toISOString() ?? null,
    };

    return NextResponse.json(serialized);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
