'use client';

import { useEffect, useState } from 'react';
import type { PageLayoutConfig } from '@/types/builder';
import type { Article } from '@/types/article';
import { SectionRenderer } from '@/components/builder/SectionRenderer';

export default function BuilderPreviewPage() {
  const [layout, setLayout] = useState<PageLayoutConfig | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/articles?limit=20')
      .then((res) => res.json())
      .then((data) => setArticles(data.data || []))
      .catch(() => setArticles([]));
  }, []);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'uk-builder-layout' && e.data?.layout) {
        setLayout(e.data.layout as PageLayoutConfig);
      }
    }
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ type: 'uk-preview-ready' }, '*');
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (!layout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-uk-off-white text-uk-text-muted">
        <p className="font-devanagari">पेज बिल्डर से लेआउट की प्रतीक्षा...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-uk-off-white dark:bg-uk-dark-bg">
      <SectionRenderer
        sections={layout.sections}
        globalTheme={layout.globalTheme}
        initialArticles={articles}
      />
    </div>
  );
}
