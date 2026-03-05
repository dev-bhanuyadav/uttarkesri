import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

/** Public API: returns published layout for a page (used by live site when builder layout exists) */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'homepage';

  try {
    const row = await prisma.pageLayout.findUnique({
      where: { pageSlug: page },
    });
    if (!row?.publishedJson) {
      return NextResponse.json({ layout: null, useBuilder: false });
    }
    const layout = row.publishedJson as object;
    return NextResponse.json({ layout, useBuilder: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ layout: null, useBuilder: false });
  }
}
