import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'homepage';

  try {
    const row = await prisma.pageLayout.findUnique({
      where: { pageSlug: page },
    });
    if (!row) {
      return NextResponse.json({ layout: null });
    }
    const layout = (row.layoutJson ?? row.publishedJson) as object;
    return NextResponse.json({ layout });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch layout' }, { status: 500 });
  }
}
