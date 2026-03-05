'use client';

import { usePathname } from 'next/navigation';
import { BottomNavBar } from './BottomNavBar';
import { MobileTopBar } from './MobileTopBar';
import { OfflineBanner } from '../shared/OfflineBanner';

interface MobileLayoutProps {
  children: React.ReactNode;
  /** Override top bar context */
  topBarContext?: 'home' | 'category' | 'article' | 'search';
  topBarTitle?: string;
  showBack?: boolean;
}

export function MobileLayout({
  children,
  topBarContext,
  topBarTitle,
  showBack,
}: MobileLayoutProps) {
  const pathname = usePathname();
  const isArticle = pathname?.startsWith('/article/');
  const isSearch = pathname === '/search';
  const isCategory = pathname?.length > 1 && !pathname.startsWith('/article') && !pathname.startsWith('/profile') && pathname !== '/live-tv' && pathname !== '/notifications';

  const context = topBarContext ?? (isArticle ? 'article' : isSearch ? 'search' : isCategory ? 'category' : 'home');
  const showBackButton = showBack ?? (isArticle || isCategory || isSearch);

  return (
    <div className="min-h-screen flex flex-col bg-uk-off-white dark:bg-uk-dark-bg pb-14">
      <OfflineBanner />
      <MobileTopBar
        context={context}
        title={topBarTitle}
        showBack={showBackButton}
      />
      <main className="flex-1 min-h-0 overflow-auto">
        {children}
      </main>
      <BottomNavBar />
    </div>
  );
}
