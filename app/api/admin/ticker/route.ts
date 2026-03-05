import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, url } = body;
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'text required' }, { status: 400 });
    }
    const count = await prisma.tickerItem.count();
    const item = await prisma.tickerItem.create({
      data: {
        text: text.trim(),
        url: url?.trim() || null,
        sortOrder: count,
        isActive: true,
      },
    });
    return NextResponse.json({
      id: item.id,
      text: item.text,
      url: item.url,
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create ticker item' }, { status: 500 });
  }
}
