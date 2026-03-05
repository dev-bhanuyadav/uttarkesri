import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { page, pageName, layoutJson } = body;
    if (!page || !layoutJson) {
      return NextResponse.json({ error: 'page and layoutJson required' }, { status: 400 });
    }

    await prisma.pageLayout.upsert({
      where: { pageSlug: page },
      create: {
        pageSlug: page,
        pageName: pageName || page,
        layoutJson,
        isDraft: true,
        updatedBy: null,
      },
      update: {
        pageName: pageName || undefined,
        layoutJson,
        isDraft: true,
        updatedBy: null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to save layout' }, { status: 500 });
  }
}
