import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { page, pageName, layoutJson } = body;
    if (!page || !layoutJson) {
      return NextResponse.json({ error: 'page and layoutJson required' }, { status: 400 });
    }

    const row = await prisma.pageLayout.upsert({
      where: { pageSlug: page },
      create: {
        pageSlug: page,
        pageName: pageName || page,
        layoutJson,
        publishedJson: layoutJson,
        isDraft: false,
        updatedBy: null,
      },
      update: {
        pageName: pageName || undefined,
        layoutJson,
        publishedJson: layoutJson,
        isDraft: false,
        updatedBy: null,
      },
    });

    await prisma.pageLayoutVersion.create({
      data: {
        layoutId: row.id,
        snapshot: layoutJson as object,
        savedBy: null,
        savedByName: 'Admin',
      },
    }).catch(() => {});

    revalidatePath('/');
    revalidatePath('/admin/builder');
    if (page === 'homepage') revalidatePath('/', 'layout');

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to publish layout' }, { status: 500 });
  }
}
