import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: { category: true, author: true },
  });
  if (!article) notFound();
  return (
    <div className="p-6">
      <h1 className="font-devanagari font-bold text-uk-2xl mb-6">Edit Article</h1>
      <p className="text-uk-text-muted mb-4">
        Full Tiptap editor and SEO panel can be added here. For now, edit via Prisma Studio or API.
      </p>
      <p className="text-uk-sm mb-2">
        <strong>Title:</strong> {article.title}
      </p>
      <p className="text-uk-sm mb-2">
        <strong>Category:</strong> {article.category?.nameHi}
      </p>
      <p className="text-uk-sm mb-4">
        <strong>Author:</strong> {article.author?.name}
      </p>
      <Link href={`/article/${article.slug}`} target="_blank" className="text-uk-saffron hover:underline">
        View article →
      </Link>
    </div>
  );
}
