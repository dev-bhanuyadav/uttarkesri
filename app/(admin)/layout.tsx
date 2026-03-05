import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-uk-dark-bg text-uk-dark-text flex">
      <aside className="w-56 shrink-0 border-r border-uk-dark-border p-4 flex flex-col gap-2">
        <Link href="/admin" className="font-devanagari font-bold text-uk-lg text-uk-saffron mb-4">
          Admin
        </Link>
        <Link href="/admin" className="px-3 py-2 rounded-uk-md hover:bg-uk-dark-card text-uk-sm">
          Dashboard
        </Link>
        <Link href="/admin/articles" className="px-3 py-2 rounded-uk-md hover:bg-uk-dark-card text-uk-sm">
          Articles
        </Link>
        <Link href="/admin/articles/new" className="px-3 py-2 rounded-uk-md hover:bg-uk-dark-card text-uk-sm">
          New Article
        </Link>
        <Link href="/admin/ticker" className="px-3 py-2 rounded-uk-md hover:bg-uk-dark-card text-uk-sm">
          Ticker
        </Link>
        <Link href="/admin/builder" className="px-3 py-2 rounded-uk-md hover:bg-uk-dark-card text-uk-sm">
          Page Builder
        </Link>
        <Link href="/" className="mt-auto px-3 py-2 rounded-uk-md hover:bg-uk-dark-card text-uk-sm">
          View Site
        </Link>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
