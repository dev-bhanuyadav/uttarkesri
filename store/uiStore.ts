import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'sepia';
type Language = 'hi' | 'en';

interface UIState {
  theme: Theme;
  language: Language;
  sidebarOpen: boolean;
  searchOpen: boolean;
  setTheme: (theme: Theme) => void;
  setLanguage: (lang: Language) => void;
  toggleSidebar: () => void;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'hi',
      sidebarOpen: false,
      searchOpen: false,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSearchOpen: (searchOpen) => set({ searchOpen }),
    }),
    { name: 'uk-ui', partialize: (s) => ({ theme: s.theme, language: s.language }) }
  )
);
