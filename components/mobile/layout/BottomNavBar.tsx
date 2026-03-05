'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { href: '/', label: 'Home', icon: '🏠', key: 'home' },
  { href: '/search', label: 'Search', icon: '🔍', key: 'search' },
  { href: '/live-tv', label: 'LIVE', icon: '📺', key: 'live' },
  { href: '/notifications', label: 'Alerts', icon: '🔔', key: 'notifications' },
  { href: '/profile', label: 'Profile', icon: '👤', key: 'profile' },
];

export function BottomNavBar() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-14 bg-white/95 border-t border-uk-border flex items-center justify-around backdrop-blur-lg pb-[env(safe-area-inset-bottom)]" aria-label="Main nav">
      {tabs.map((tab) => {
        const isActive = tab.key === 'home' ? pathname === '/' || pathname === '' : pathname?.startsWith(tab.href) ?? false;
        return (
          <Link key={tab.key} href={tab.href} className={cn('flex flex-col items-center justify-center flex-1 min-w-0 py-1.5 gap-0.5', isActive ? 'text-uk-red' : 'text-uk-text-muted')}>
            <span className="text-xl leading-none">{tab.icon}</span>
            <span className="text-[10px] font-medium truncate max-w-full">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
