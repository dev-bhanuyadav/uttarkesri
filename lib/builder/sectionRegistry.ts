import type { BuilderSection, SectionDefinition } from '@/types/builder';

const defaultStyle = {
  padding: { top: 24, right: 0, bottom: 24, left: 0 },
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};
const defaultLayout = { width: 'boxed' as const, animation: { effect: 'fadeIn' as const, duration: 400 } };

export const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    type: 'TricolorStrip',
    name: 'Tricolor Top Strip',
    nameHi: 'तिरंगा स्ट्रिप',
    category: 'structure',
    defaultContent: {},
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout, width: 'full' },
  },
  {
    type: 'TopBar',
    name: 'Top Utility Bar',
    nameHi: 'टॉप यूटिलिटी बार',
    category: 'structure',
    defaultContent: { showDate: true, showWeather: true, showStocks: true },
    defaultStyle: { ...defaultStyle, backgroundColor: '#1A1A1A' },
    defaultLayout: { ...defaultLayout, width: 'full' },
  },
  {
    type: 'MainHeader',
    name: 'Main Header',
    nameHi: 'मुख्य हेडर',
    category: 'structure',
    defaultContent: { tagline: 'उत्तर प्रदेश की आवाज़', showSearch: true, showWhatsApp: true },
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout, width: 'full', position: 'sticky' },
  },
  {
    type: 'NavBar',
    name: 'Navigation Bar',
    nameHi: 'नेविगेशन बार',
    category: 'structure',
    defaultContent: { showMegaDropdown: true, showLive: true },
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout, width: 'full', position: 'sticky' },
  },
  {
    type: 'BreakingTicker',
    name: 'Breaking Ticker',
    nameHi: 'ब्रेकिंग टिकर',
    category: 'news',
    defaultContent: { label: 'ब्रेकिंग न्यूज़', scrollSpeed: 80, source: 'auto' },
    defaultStyle: { ...defaultStyle, backgroundColor: '#CC0000', color: '#FFFFFF' },
    defaultLayout: { ...defaultLayout, width: 'full' },
  },
  {
    type: 'HeroSection',
    name: 'Hero Section',
    nameHi: 'हीरो सेक्शन',
    category: 'news',
    defaultContent: {
      layout: 'big-left-4-right',
      featuredArticle: 'auto',
      sideArticles: 'auto',
      showOverlay: true,
      heroHeight: 560,
    },
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout },
  },
  {
    type: 'LatestNewsGrid',
    name: 'Latest News Grid',
    nameHi: 'ताज़ा खबरें ग्रिड',
    category: 'news',
    defaultContent: {
      source: 'auto',
      categorySlug: '',
      count: 6,
      columnsDesktop: 3,
      columnsTablet: 2,
      columnsMobile: 1,
      showExcerpt: true,
      showAuthor: true,
      showDate: true,
      showViewCount: false,
      cardStyle: 'standard',
    },
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout },
  },
  {
    type: 'TrendingSection',
    name: 'Trending / Top 10',
    nameHi: 'ट्रेंडिंग सेक्शन',
    category: 'news',
    defaultContent: { period: 'today', count: 10 },
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout },
  },
  {
    type: 'DistrictSection',
    name: 'District Section',
    nameHi: 'जिला सेक्शन',
    category: 'news',
    defaultContent: { defaultDistrict: 'lucknow', articleCount: 6 },
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout },
  },
  {
    type: 'VideoSection',
    name: 'Video Grid',
    nameHi: 'वीडियो ग्रिड',
    category: 'media',
    defaultContent: { count: 4, columns: 4 },
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout },
  },
  {
    type: 'PhotoGallery',
    name: 'Photo Gallery',
    nameHi: 'फोटो गैलरी',
    category: 'media',
    defaultContent: { layout: 'masonry', count: 6 },
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout },
  },
  {
    type: 'CricketWidget',
    name: 'Cricket Score Widget',
    nameHi: 'क्रिकेट विजेट',
    category: 'data',
    defaultContent: {},
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout },
  },
  {
    type: 'WeatherWidget',
    name: 'Weather Widget',
    nameHi: 'मौसम विजेट',
    category: 'data',
    defaultContent: { defaultCity: 'lucknow', forecastDays: 5 },
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout },
  },
  {
    type: 'PollWidget',
    name: 'Poll / Survey',
    nameHi: 'पोल विजेट',
    category: 'data',
    defaultContent: {},
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout },
  },
  {
    type: 'NewsletterBar',
    name: 'Newsletter Subscribe',
    nameHi: 'न्यूज़लेटर सब्सक्राइब',
    category: 'utility',
    defaultContent: { title: 'हर सुबह 7 बजे पाएं TOP 5 खबरें' },
    defaultStyle: { ...defaultStyle, backgroundColor: '#FF6600' },
    defaultLayout: { ...defaultLayout },
  },
  {
    type: 'AdSlot',
    name: 'Advertisement Slot',
    nameHi: 'विज्ञापन स्लॉट',
    category: 'utility',
    defaultContent: { slot: 'HOMEPAGE_BILLBOARD', showLabel: true },
    defaultStyle: { ...defaultStyle },
    defaultLayout: { ...defaultLayout },
  },
  {
    type: 'Footer',
    name: 'Footer',
    nameHi: 'फुटर',
    category: 'structure',
    defaultContent: { columns: 4, showTricolor: true },
    defaultStyle: { ...defaultStyle, backgroundColor: '#0D0D0D', color: '#888888' },
    defaultLayout: { ...defaultLayout, width: 'full' },
  },
];

const MAX_UNDO = 50;

function createSectionId(): string {
  return `sec-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createSectionFromDefinition(def: SectionDefinition, order: number): BuilderSection {
  return {
    id: createSectionId(),
    type: def.type,
    name: def.name,
    nameHi: def.nameHi,
    isVisible: true,
    order,
    content: { ...def.defaultContent },
    style: JSON.parse(JSON.stringify(def.defaultStyle)),
    layout: JSON.parse(JSON.stringify(def.defaultLayout)),
  };
}

export function getDefinitionByType(type: string): SectionDefinition | undefined {
  return SECTION_DEFINITIONS.find((d) => d.type === type);
}

export const SECTION_CATEGORIES = [
  { key: 'news', nameHi: '🗞️ NEWS SECTIONS' },
  { key: 'media', nameHi: '📺 MEDIA SECTIONS' },
  { key: 'data', nameHi: '📊 DATA WIDGETS' },
  { key: 'utility', nameHi: '💼 UTILITY SECTIONS' },
  { key: 'structure', nameHi: '🔝 STRUCTURE' },
] as const;
