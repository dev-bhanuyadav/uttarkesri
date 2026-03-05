const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? '';

export async function fetchArticles(params?: { page?: number; category?: string }) {
  const sp = new URLSearchParams();
  if (params?.page) sp.set('page', String(params.page));
  if (params?.category) sp.set('category', params.category);
  const res = await fetch(`${BASE}/api/articles?${sp}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}

export async function fetchArticle(slug: string) {
  const res = await fetch(`${BASE}/api/articles/${slug}`, { next: { revalidate: 300 } });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchBreaking() {
  const res = await fetch(`${BASE}/api/breaking`, { next: { revalidate: 30 } });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchTrending() {
  const res = await fetch(`${BASE}/api/trending`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchTicker() {
  const res = await fetch(`${BASE}/api/ticker`, { next: { revalidate: 30 } });
  if (!res.ok) return [];
  return res.json();
}
