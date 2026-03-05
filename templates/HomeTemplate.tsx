import { TopBar } from '@/components/organisms/Header/TopBar';
import { MainHeader } from '@/components/organisms/Header/MainHeader';
import { NavBar } from '@/components/organisms/Header/NavBar';
import { BreakingTicker } from '@/components/organisms/BreakingTicker';
import { HeroSection } from '@/components/organisms/HeroSection';
import { LatestNewsGrid } from '@/components/organisms/LatestNewsGrid';
import { Footer } from '@/components/organisms/Footer';
import type { Article } from '@/types/article';
import type { TickerItem } from '@/types/ticker';

interface HomeTemplateProps {
  heroMain: Article;
  heroSide: Article[];
  latestArticles: Article[];
  tickerItems: TickerItem[];
}

export function HomeTemplate({
  heroMain,
  heroSide,
  latestArticles,
  tickerItems,
}: HomeTemplateProps) {
  return (
    <>
      <div className="tricolor-strip fixed top-0 left-0 right-0 z-50" />
      <div className="pt-1">
        <TopBar />
        <MainHeader />
        <NavBar />
      </div>
      <BreakingTicker items={tickerItems} />
      <main id="main-content">
        <HeroSection main={heroMain} side={heroSide} />
        <LatestNewsGrid articles={latestArticles} />
      </main>
      <Footer />
    </>
  );
}
