/** Page builder layout and section types */

export type PageSlug = 'homepage' | 'category' | 'article' | 'search' | 'custom';

export interface SectionStyle {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  color?: string;
  padding?: { top?: number; right?: number; bottom?: number; left?: number };
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  boxShadow?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: number;
  textAlign?: 'left' | 'center' | 'right';
  /** Responsive: desktop / tablet / mobile overrides */
  _responsive?: {
    tablet?: Partial<SectionStyle>;
    mobile?: Partial<SectionStyle>;
  };
}

export interface SectionLayout {
  width?: 'full' | 'boxed' | 'narrow' | number;
  minHeight?: number;
  position?: 'normal' | 'sticky' | 'fixed';
  zIndex?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';
  animation?: {
    effect?: 'none' | 'fadeIn' | 'slideUp' | 'slideLeft' | 'zoomIn' | 'bounce';
    duration?: number;
    delay?: number;
    trigger?: 'onLoad' | 'onScroll';
  };
}

export type SectionContent = Record<string, unknown>;

export interface BuilderSection {
  id: string;
  type: string;
  name: string;
  nameHi: string;
  isVisible: boolean;
  order: number;
  content: SectionContent;
  style: SectionStyle;
  layout: SectionLayout;
  /** Only in builder; not persisted to live */
  note?: string;
}

export interface GlobalThemeConfig {
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
    textPrimary?: string;
    textMuted?: string;
    border?: string;
    link?: string;
    linkHover?: string;
  };
  dark?: Record<string, string>;
  fonts?: {
    hindi?: string;
    english?: string;
    bodySize?: number;
    bodyLineHeight?: number;
    h1?: number;
    h2?: number;
    h3?: number;
    h4?: number;
  };
  spacing?: {
    sectionPadding?: number;
    cardGap?: number;
    borderRadiusCard?: number;
    borderRadiusButton?: number;
  };
  breaking?: {
    tickerBg?: string;
    tickerText?: string;
    tickerSpeed?: number;
  };
}

export interface HeaderRowConfig {
  id: string;
  isVisible: boolean;
  order: number;
  backgroundColor?: string;
  height?: number;
  columns?: {
    left?: string[];
    center?: string[];
    right?: string[];
  };
}

export interface PageLayoutConfig {
  page: PageSlug;
  pageName: string;
  globalTheme: GlobalThemeConfig;
  header?: {
    rows: HeaderRowConfig[];
  };
  sections: BuilderSection[];
  footer?: Record<string, unknown>;
}

export interface SectionDefinition {
  type: string;
  name: string;
  nameHi: string;
  category: 'news' | 'media' | 'data' | 'utility' | 'structure';
  thumbnail?: string;
  defaultContent: SectionContent;
  defaultStyle: SectionStyle;
  defaultLayout: SectionLayout;
}
