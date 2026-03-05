export interface TickerItem {
  id: string;
  text: string;
  url: string | null;
  sortOrder: number;
  isActive: boolean;
  duration: number;
  createdAt: string;
}
