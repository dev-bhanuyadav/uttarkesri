'use client';

import { useDevice } from '@/hooks/useDevice';
import { ArticleTemplate } from '@/templates/ArticleTemplate';
import { MobileLayout } from '@/components/mobile/layout/MobileLayout';
import { MobileArticlePage } from '@/components/mobile/article/MobileArticlePage';
import type { Article } from '@/types/article';

export function ArticlePageView({ article }: { article: Article }) {
  const { useMobileUI } = useDevice();

  if (useMobileUI) {
    return (
      <MobileLayout topBarContext="article">
        <MobileArticlePage article={article} />
      </MobileLayout>
    );
  }

  return <ArticleTemplate article={article} />;
}
