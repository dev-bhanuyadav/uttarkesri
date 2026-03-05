import { prisma } from '@/lib/prisma';
import { ArticleEditorForm } from './ArticleEditorForm';

export const dynamic = 'force-dynamic';

export default async function NewArticlePage() {
  const [categories, authors] = await Promise.all([
    prisma.category.findMany({ where: { parentId: null }, orderBy: { sortOrder: 'asc' } }),
    prisma.author.findMany({ orderBy: { name: 'asc' } }),
  ]);
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="font-devanagari font-bold text-uk-2xl mb-6">New Article</h1>
      <ArticleEditorForm categories={categories} authors={authors} />
    </div>
  );
}
