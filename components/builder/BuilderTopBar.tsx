'use client';

import Link from 'next/link';
import { useBuilderStore } from '@/store/builderStore';
import { useCallback, useEffect } from 'react';

const PAGE_OPTIONS: { slug: import('@/types/builder').PageSlug; name: string }[] = [
  { slug: 'homepage', name: 'होम पेज' },
  { slug: 'category', name: 'कैटेगरी पेज' },
  { slug: 'article', name: 'आर्टिकल पेज' },
  { slug: 'search', name: 'सर्च पेज' },
  { slug: 'custom', name: 'कस्टम पेज' },
];

export function BuilderTopBar() {
  const {
    page,
    pageName,
    undoStack,
    redoStack,
    previewDevice,
    zoom,
    hasUnsavedChanges,
    setPage,
    setPreviewDevice,
    setZoom,
    undo,
    redo,
  } = useBuilderStore();

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          if (e.shiftKey) redo();
          else undo();
        }
        if (e.key === 'y') {
          e.preventDefault();
          redo();
        }
      }
    },
    [undo, redo]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const handleUndo = () => undo();

  return (
    <header className="h-13 flex-shrink-0 flex items-center justify-between px-4 bg-uk-dark-card border-b border-uk-dark-border text-uk-dark-text">
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="text-uk-sm text-uk-saffron hover:underline"
        >
          ← Admin
        </Link>
        {hasUnsavedChanges && (
          <span className="text-uk-xs text-amber-400">● सेव नहीं हुआ</span>
        )}
        <select
          value={page}
          onChange={(e) => {
            const opt = PAGE_OPTIONS.find((o) => o.slug === e.target.value);
            if (opt) setPage(opt.slug as import('@/types/builder').PageSlug, opt.name);
          }}
          className="bg-uk-dark-surface border border-uk-dark-border rounded-uk-md px-3 py-1.5 text-uk-sm"
        >
          {PAGE_OPTIONS.map((opt) => (
            <option key={opt.slug} value={opt.slug}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-uk-xs text-uk-dark-muted">डिवाइस:</span>
        {(['desktop', 'tablet', 'mobile'] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setPreviewDevice(d)}
            className={`px-2 py-1 rounded-uk-sm text-uk-xs ${
              previewDevice === d ? 'bg-uk-saffron text-white' : 'bg-uk-dark-surface hover:bg-uk-dark-border'
            }`}
          >
            {d === 'desktop' ? '🖥️ Desktop' : d === 'tablet' ? '📱 Tablet' : '📱 Mobile'}
          </button>
        ))}
        <span className="text-uk-xs text-uk-dark-muted ml-2">Zoom:</span>
        <select
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="bg-uk-dark-surface border border-uk-dark-border rounded-uk-md px-2 py-1 text-uk-xs"
        >
          {[50, 75, 100, 125].map((z) => (
            <option key={z} value={z}>{z}%</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => undo()}
          disabled={undoStack.length === 0}
          className="px-2 py-1 rounded-uk-sm bg-uk-dark-surface text-uk-sm disabled:opacity-50"
          title="Undo (Ctrl+Z)"
        >
          ↩ Undo {undoStack.length > 0 ? `(${undoStack.length})` : ''}
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={redoStack.length === 0}
          className="px-2 py-1 rounded-uk-sm bg-uk-dark-surface text-uk-sm disabled:opacity-50"
          title="Redo (Ctrl+Y)"
        >
          ↪ Redo
        </button>
        <a
          href="/admin/builder/preview"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 rounded-uk-sm bg-uk-dark-surface text-uk-sm hover:bg-uk-dark-border"
        >
          👁️ Preview
        </a>
        <button
          type="button"
          className="px-3 py-1.5 rounded-uk-md bg-uk-saffron text-white text-uk-sm font-medium hover:bg-uk-saffron-dark"
          id="builder-save-draft"
        >
          💾 Save Draft
        </button>
        <button
          type="button"
          className="px-3 py-1.5 rounded-uk-md bg-uk-red text-white text-uk-sm font-medium hover:bg-uk-red-dark"
          id="builder-publish"
        >
          🚀 Save & Publish
        </button>
      </div>
    </header>
  );
}
