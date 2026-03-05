export interface Category {
  id: string;
  nameHi: string;
  nameEn: string;
  slug: string;
  parentId: string | null;
  color: string;
  icon: string;
  sortOrder: number;
  isVisible: boolean;
  seoTitle: string | null;
  seoDesc: string | null;
  children?: Category[];
}
