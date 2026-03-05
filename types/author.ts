export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  avatar: string | null;
  designation: string | null;
  email: string;
  mobile: string | null;
  socialLinks: Record<string, string> | null;
  articleCount: number;
}
