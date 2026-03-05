'use client';

import type { PageLayoutConfig } from '@/types/builder';
import type { Article } from '@/types/article';
import { SectionRenderer } from '@/components/builder/SectionRenderer';

interface BuilderHomeViewProps {
  layout: PageLayoutConfig;
  articles: Article[];
}

export function BuilderHomeView({ layout, articles }: BuilderHomeViewProps) {
  return (
    <main id="main-content">
      <SectionRenderer
        sections={layout.sections}
        globalTheme={layout.globalTheme}
        initialArticles={articles}
      />
    </main>
  );
}
