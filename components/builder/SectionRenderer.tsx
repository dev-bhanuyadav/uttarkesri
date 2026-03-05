'use client';

import type { BuilderSection, GlobalThemeConfig, PageLayoutConfig } from '@/types/builder';
import type { Article } from '@/types/article';
import { HeroSection } from '@/components/organisms/HeroSection';
import { LatestNewsGrid } from '@/components/organisms/LatestNewsGrid';
import { BreakingTicker } from '@/components/organisms/BreakingTicker';
import { Footer } from '@/components/organisms/Footer';
import { TopBar } from '@/components/organisms/Header/TopBar';
import { MainHeader } from '@/components/organisms/Header/MainHeader';
import { NavBar } from '@/components/organisms/Header/NavBar';

type SectionMap = Record<
  string,
  React.ComponentType<{
    content?: Record<string, unknown>;
    style?: Record<string, unknown>;
    layout?: Record<string, unknown>;
    theme?: GlobalThemeConfig;
    [key: string]: unknown;
  }>
>;

const SECTION_MAP: SectionMap = {
  TricolorStrip: () => (
    <div className="tricolor-strip h-1 w-full" aria-hidden />
  ),
  TopBar: () => <TopBar />,
  MainHeader: () => <MainHeader />,
  NavBar: () => <NavBar />,
  BreakingTicker: ({ content }: { content?: { label?: string } }) => (
    <BreakingTicker items={[{ id: '1', text: content?.label || 'ब्रेकिंग न्यूज़', url: null }]} />
  ),
  HeroSection: () => null,
  LatestNewsGrid: () => null,
  TrendingSection: () => (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="font-devanagari font-bold text-uk-xl mb-4">🔥 ट्रेंडिंग</h2>
      <p className="text-uk-text-muted text-uk-sm">ट्रेंडिंग सेक्शन — कॉन्फ़िग से लोड होगा</p>
    </section>
  ),
  DistrictSection: () => (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="font-devanagari font-bold text-uk-xl mb-4">🗺️ जिलों की खबर</h2>
      <p className="text-uk-text-muted text-uk-sm">जिला सेक्शन</p>
    </section>
  ),
  VideoSection: () => (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="font-devanagari font-bold text-uk-xl mb-4">📺 वीडियो</h2>
    </section>
  ),
  PhotoGallery: () => (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="font-devanagari font-bold text-uk-xl mb-4">फोटो गैलरी</h2>
    </section>
  ),
  CricketWidget: () => (
    <section className="max-w-7xl mx-auto px-4 py-6 bg-uk-surface dark:bg-uk-dark-card rounded-uk-lg">
      <h2 className="font-devanagari font-bold text-uk-lg mb-2">🏏 क्रिकेट स्कोर</h2>
    </section>
  ),
  WeatherWidget: () => (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="font-devanagari font-bold text-uk-lg mb-2">🌡️ मौसम</h2>
    </section>
  ),
  PollWidget: () => (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="font-devanagari font-bold text-uk-lg mb-2">📊 पोल</h2>
    </section>
  ),
  NewsletterBar: () => (
    <section className="bg-uk-saffron py-6 px-4">
      <p className="font-devanagari font-bold text-white text-center">न्यूज़लेटर सब्सक्राइब</p>
    </section>
  ),
  AdSlot: () => (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="bg-uk-border dark:bg-uk-dark-border rounded-uk-md h-20 flex items-center justify-center text-uk-text-muted text-uk-sm">
        विज्ञापन स्लॉट
      </div>
    </section>
  ),
  Footer: () => <Footer />,
};

interface SectionRendererProps {
  sections: BuilderSection[];
  globalTheme?: GlobalThemeConfig;
  /** When true, render placeholder boxes for builder preview only */
  builderPreview?: boolean;
  /** Optional article data for HeroSection and LatestNewsGrid (e.g. from preview iframe) */
  initialArticles?: Article[];
}

export function SectionRenderer({ sections, globalTheme, builderPreview, initialArticles = [] }: SectionRendererProps) {
  const visible = sections
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const heroMain = initialArticles[0];
  const heroSide = initialArticles.slice(1, 5);
  const latestArticles = initialArticles.slice(5, 17);

  return (
    <>
      {visible.map((section) => {
        if (section.type === 'HeroSection') {
          if (!heroMain) {
            return (
              <div key={section.id} className="max-w-7xl mx-auto px-4 py-12 bg-uk-surface rounded-uk-lg border-2 border-dashed border-uk-border" data-section-id={section.id} data-section-type={section.type}>
                <p className="text-uk-text-muted text-center font-devanagari">हीरो सेक्शन — लेख डेटा लोड होगा</p>
              </div>
            );
          }
          const style: React.CSSProperties = {};
          if (section.style?.padding) {
            const p = section.style.padding as { top?: number; right?: number; bottom?: number; left?: number };
            if (p.top != null) style.paddingTop = p.top;
            if (p.right != null) style.paddingRight = p.right;
            if (p.bottom != null) style.paddingBottom = p.bottom;
            if (p.left != null) style.paddingLeft = p.left;
          }
          return (
            <div key={section.id} className="max-w-7xl mx-auto px-4" style={style} data-section-id={section.id} data-section-type={section.type}>
              <HeroSection main={heroMain} side={heroSide} />
            </div>
          );
        }
        if (section.type === 'LatestNewsGrid') {
          return (
            <div key={section.id} className="max-w-7xl mx-auto px-4" data-section-id={section.id} data-section-type={section.type}>
              <LatestNewsGrid articles={latestArticles} loading={latestArticles.length === 0} />
            </div>
          );
        }

        const Component = SECTION_MAP[section.type];
        if (!Component) {
          return (
            <div
              key={section.id}
              className="max-w-7xl mx-auto px-4 py-6 border-2 border-dashed border-uk-border rounded-uk-lg"
              data-section-id={section.id}
              data-section-type={section.type}
            >
              <span className="text-uk-text-muted text-uk-sm">{section.nameHi} (no component)</span>
            </div>
          );
        }
        const style: React.CSSProperties = {};
        if (section.style?.padding) {
          const p = section.style.padding as { top?: number; right?: number; bottom?: number; left?: number };
          style.paddingTop = p.top;
          style.paddingRight = p.right;
          style.paddingBottom = p.bottom;
          style.paddingLeft = p.left;
        }
        if (section.style?.backgroundColor) style.backgroundColor = section.style.backgroundColor;
        if (section.style?.color) style.color = section.style.color;

        const wrapperClass =
          section.layout?.width === 'full'
            ? 'w-full'
            : section.layout?.width === 'narrow'
              ? 'max-w-[900px] mx-auto'
              : 'max-w-7xl mx-auto px-4';

        return (
          <div
            key={section.id}
            className={builderPreview ? '' : wrapperClass}
            style={builderPreview ? undefined : style}
            data-section-id={section.id}
            data-section-type={section.type}
          >
            <Component
              content={section.content}
              style={section.style as Record<string, unknown>}
              layout={section.layout as Record<string, unknown>}
              theme={globalTheme}
            />
          </div>
        );
      })}
    </>
  );
}

export function renderLayoutFromConfig(config: PageLayoutConfig) {
  return (
    <SectionRenderer
      sections={config.sections}
      globalTheme={config.globalTheme}
      builderPreview={false}
    />
  );
}
