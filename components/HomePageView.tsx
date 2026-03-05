'use client';

import { useDevice } from '@/hooks/useDevice';
import { HomeTemplate } from '@/templates/HomeTemplate';
import { BuilderHomeView } from '@/components/builder/BuilderHomeView';
import { MobileLayout } from '@/components/mobile/layout/MobileLayout';
import { MobileFeed } from '@/components/mobile/feed/MobileFeed';
import type { Article } from '@/types/article';
import type { TickerItem } from '@/types/ticker';
import type { PageLayoutConfig } from '@/types/builder';

interface HomePageViewProps {
  heroMain: Article;
  heroSide: Article[];
  latestArticles: Article[];
  tickerItems: TickerItem[];
  builderLayout: PageLayoutConfig | null;
  articles: Article[];
}

export function HomePageView({
  heroMain,
  heroSide,
  latestArticles,
  tickerItems,
  builderLayout,
  articles,
}: HomePageViewProps) {
  const { useMobileUI } = useDevice();

  if (useMobileUI) {
    return (
      <MobileLayout>
        <MobileFeed articles={articles} tickerItems={tickerItems} />
      </MobileLayout>
    );
  }

  if (builderLayout?.sections?.length) {
    return <BuilderHomeView layout={builderLayout} articles={articles} />;
  }

  return (
    <HomeTemplate
      heroMain={heroMain}
      heroSide={heroSide}
      latestArticles={latestArticles}
      tickerItems={tickerItems}
    />
  );
}
