import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { TimeAgo } from '@/components/atoms/TimeAgo';

export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    include: {
      category: { select: { nameHi: true, slug: true } },
      author: { select: { name: true, slug: true } },
    },
    orderBy: { updatedAt: 'desc' },
    take: 50,
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-devanagari font-bold text-uk-2xl">लेख</h1>
        <Link
          href="/admin/articles/new"
          className="px-4 py-2 rounded-uk-md bg-uk-red text-white font-medium hover:bg-uk-red-dark"
        >
          + नया लेख
        </Link>
      </div>
      <div className="bg-uk-dark-card rounded-uk-lg border border-uk-dark-border overflow-hidden">
        <table className="w-full text-left text-uk-sm">
          <thead>
            <tr className="border-b border-uk-dark-border">
              <th className="p-3 font-medium">शीर्षक</th>
              <th className="p-3 font-medium">श्रेणी</th>
              <th className="p-3 font-medium">लेखक</th>
              <th className="p-3 font-medium">स्टेटस</th>
              <th className="p-3 font-medium">व्यू</th>
              <th className="p-3 font-medium">अपडेट</th>
              <th className="p-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-uk-dark-border hover:bg-uk-dark-surface/50">
                <td className="p-3 max-w-xs">
                  <Link href={`/article/${a.slug}`} target="_blank" className="hover:text-uk-saffron line-clamp-1">
                    {a.title}
                  </Link>
                </td>
                <td className="p-3">{a.category?.nameHi ?? '-'}</td>
                <td className="p-3">{a.author?.name ?? '-'}</td>
                <td className="p-3">
                  <span className={a.status === 'PUBLISHED' ? 'text-green-400' : 'text-uk-text-muted'}>
                    {a.status}
                  </span>
                </td>
                <td className="p-3 font-mono">{a.viewCount}</td>
                <td className="p-3 text-uk-text-muted">
                  <TimeAgo date={a.updatedAt} lang="en" />
                </td>
                <td className="p-3">
                  <Link href={`/admin/articles/${a.id}/edit`} className="text-uk-saffron hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
