'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type TopBarContext = 'home' | 'category' | 'article' | 'search';

interface MobileTopBarProps {
  context?: TopBarContext;
  title?: string;
  showBack?: boolean;
}

export function MobileTopBar({ context = 'home', title, showBack }: MobileTopBarProps) {
  const router = useRouter();

  return (
    <header
      className="sticky top-0 z-40 h-13 bg-white dark:bg-uk-dark-surface border-b border-uk-border flex items-center justify-between px-4 pt-[env(safe-area-inset-top)]"
      style={{ minHeight: 'calc(52px + env(safe-area-inset-top))' }}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {showBack && (
          <button type="button" onClick={() => router.back()} className="p-2 -ml-2 rounded-full" aria-label="वापस">
            ←
          </button>
        )}
        {context === 'home' && !showBack && (
          <Link href="/" className="font-devanagari font-bold text-uk-lg text-uk-text-primary truncate">
            उत्तर केसरी
          </Link>
        )}
        {title && <span className="font-devanagari font-semibold text-uk-base truncate">{title}</span>}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <Link href="/search" className="p-2 rounded-full" aria-label="खोजें">🔍</Link>
        <button type="button" className="p-2 rounded-full" aria-label="अलर्ट">🔔</button>
        <button type="button" className="p-2 rounded-full" aria-label="मेन्यू">☰</button>
      </div>
    </header>
  );
}
