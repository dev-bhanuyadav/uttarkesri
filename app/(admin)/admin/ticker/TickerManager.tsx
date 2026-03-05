'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TickerItem {
  id: string;
  text: string;
  url: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export function TickerManager({ initialItems }: { initialItems: TickerItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [newText, setNewText] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/ticker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText.trim(), url: newUrl.trim() || null }),
      });
      if (!res.ok) throw new Error('Failed');
      const created = await res.json();
      setItems((prev) => [...prev, { ...created, createdAt: new Date().toISOString() }]);
      setNewText('');
      setNewUrl('');
      router.refresh();
    } catch {
      alert('Failed to add');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="टिकर टेक्स्ट"
          className="flex-1 px-4 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-uk-dark-text font-devanagari"
        />
        <input
          type="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="URL (वैकल्पिक)"
          className="flex-1 px-4 py-2 rounded-uk-md bg-uk-dark-card border border-uk-dark-border text-uk-dark-text"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-uk-md bg-uk-saffron text-white font-medium hover:bg-uk-saffron-dark disabled:opacity-50"
        >
          जोड़ें
        </button>
      </form>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-3 rounded-uk-md bg-uk-dark-card border border-uk-dark-border"
          >
            <div>
              <p className="font-devanagari text-uk-sm">{item.text}</p>
              {item.url && <p className="text-uk-xs text-uk-text-muted truncate">{item.url}</p>}
            </div>
            <span className={`text-uk-xs ${item.isActive ? 'text-green-400' : 'text-uk-text-muted'}`}>
              {item.isActive ? 'Active' : 'Inactive'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
