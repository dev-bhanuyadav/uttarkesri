'use client';

import { useDevice } from '@/hooks/useDevice';
import { MobileLayout } from '@/components/mobile/layout/MobileLayout';

interface LayoutSwitcherProps {
  children: React.ReactNode;
  /** When true, force mobile layout (e.g. article page on mobile) */
  forceMobile?: boolean;
  topBarTitle?: string;
  topBarContext?: 'home' | 'category' | 'article' | 'search';
}

export function LayoutSwitcher({ children, forceMobile, topBarTitle, topBarContext }: LayoutSwitcherProps) {
  const { useMobileUI } = useDevice();

  if (forceMobile || useMobileUI) {
    return (
      <MobileLayout topBarTitle={topBarTitle} topBarContext={topBarContext}>
        {children}
      </MobileLayout>
    );
  }

  return <>{children}</>;
}
