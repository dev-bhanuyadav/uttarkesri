import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getReadTimeMinutes } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, titleEn, slug, excerpt, body: bodyContent, categoryId, authorId, featuredImage, featuredImageAlt, imageCaption, photographer, status, isBreaking, isLive, isExclusive, language } = body;
    if (!title || !slug || !categoryId || !authorId || !featuredImage || !featuredImageAlt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const bodyText = typeof bodyContent === 'string' ? bodyContent : JSON.stringify(bodyContent ?? '');
    const readTimeMinutes = getReadTimeMinutes(bodyText);
    const article = await prisma.article.create({
      data: {
        title,
        titleEn: titleEn || null,
        slug: String(slug).trim().toLowerCase().replace(/\s+/g, '-'),
        excerpt: excerpt || title,
        body: bodyContent ?? { type: 'doc', content: [] },
        bodyText: bodyText.slice(0, 10000),
        featuredImage,
        featuredImageAlt,
        imageCaption: imageCaption || null,
        photographer: photographer || null,
        status: status || 'DRAFT',
        isBreaking: !!isBreaking,
        isLive: !!isLive,
        isExclusive: !!isExclusive,
        language: language || 'hi',
        categoryId,
        authorId,
        readTimeMinutes,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    });
    return NextResponse.json(article);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
