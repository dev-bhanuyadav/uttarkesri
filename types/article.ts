export type ArticleStatus =
  | 'DRAFT'
  | 'REVIEW'
  | 'PUBLISHED'
  | 'SCHEDULED'
  | 'ARCHIVED'
  | 'BREAKING';

export type ArticleType =
  | 'STANDARD'
  | 'VIDEO'
  | 'PHOTO_GALLERY'
  | 'LIVE_BLOG'
  | 'FACT_CHECK'
  | 'OPINION'
  | 'SATIRE'
  | 'SPONSORED';

export interface Article {
  id: string;
  title: string;
  titleEn: string | null;
  slug: string;
  excerpt: string;
  body: unknown;
  bodyText: string;
  featuredImage: string;
  featuredImageAlt: string;
  imageCaption: string | null;
  photographer: string | null;
  status: ArticleStatus;
  articleType: ArticleType;
  isBreaking: boolean;
  isLive: boolean;
  isExclusive: boolean;
  language: string;
  categoryId: string;
  subcategoryId: string | null;
  authorId: string;
  viewCount: number;
  shareCount: number;
  likeCount: number;
  commentCount: number;
  readTimeMinutes: number;
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
  category?: { id: string; nameHi: string; nameEn: string; slug: string; color: string };
  author?: { id: string; name: string; slug: string; avatar: string | null; designation: string | null; bio?: string | null };
  tags?: { id: string; nameHi: string; slug: string }[];
  districts?: { id: string; nameHi: string; slug: string }[];
}
