'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';

type Category = { id: string; nameHi: string };
type Author = { id: string; name: string };

interface ArticleEditorFormProps {
  categories: Category[];
  authors: Author[];
}

export function ArticleEditorForm({ categories, authors }: ArticleEditorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    bodyText: '',
    categoryId: categories[0]?.id ?? '',
    authorId: authors[0]?.id ?? '',
    featuredImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
    featuredImageAlt: '',
    status: 'DRAFT',
  });

  const slug = form.title
    ? form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u0900-\u097F-]+/g, '')
    : '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug: slug || `article-${Date.now()}`,
          body: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: form.bodyText }] }] },
          readTimeMinutes: Math.max(1, Math.ceil(form.bodyText.trim().split(/\s+/).length / 200)),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed');
      }
      router.push('/admin/articles');
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-uk-sm font-medium mb-1">Title (Hindi) *</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="w-full px-4 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-uk-dark-text font-devanagari"
        />
      </div>
      <div>
        <label className="block text-uk-sm font-medium mb-1">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          rows={2}
          className="w-full px-4 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-uk-dark-text"
        />
      </div>
      <div>
        <label className="block text-uk-sm font-medium mb-1">Body (plain text)</label>
        <textarea
          value={form.bodyText}
          onChange={(e) => setForm((f) => ({ ...f, bodyText: e.target.value }))}
          rows={8}
          className="w-full px-4 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-uk-dark-text"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-uk-sm font-medium mb-1">Category</label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
            className="w-full px-4 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-uk-dark-text"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.nameHi}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-uk-sm font-medium mb-1">Author</label>
          <select
            value={form.authorId}
            onChange={(e) => setForm((f) => ({ ...f, authorId: e.target.value }))}
            className="w-full px-4 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-uk-dark-text"
          >
            {authors.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-uk-sm font-medium mb-1">Featured Image URL</label>
        <input
          type="url"
          value={form.featuredImage}
          onChange={(e) => setForm((f) => ({ ...f, featuredImage: e.target.value }))}
          className="w-full px-4 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-uk-dark-text"
        />
      </div>
      <div>
        <label className="block text-uk-sm font-medium mb-1">Image Alt</label>
        <input
          type="text"
          value={form.featuredImageAlt}
          onChange={(e) => setForm((f) => ({ ...f, featuredImageAlt: e.target.value }))}
          className="w-full px-4 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-uk-dark-text"
        />
      </div>
      <div>
        <label className="block text-uk-sm font-medium mb-1">Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          className="w-full px-4 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-uk-dark-text"
        >
          <option value="DRAFT">Draft</option>
          <option value="REVIEW">Review</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
