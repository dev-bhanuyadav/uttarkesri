'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/atoms/Button';
import { useUIStore } from '@/store/uiStore';

export function MainHeader() {
  const { setSearchOpen } = useUIStore();

  return (
    <header className="sticky top-0 z-40 bg-uk-white dark:bg-uk-dark-surface border-b border-uk-border dark:border-uk-dark-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-uk-md bg-uk-saffron flex items-center justify-center text-white font-bold text-xl">
            उ
          </div>
          <div>
            <span className="font-devanagari font-bold text-uk-xl text-uk-text-primary block leading-tight">
              उत्तर केसरी
            </span>
            <span className="text-uk-xs text-uk-text-muted hidden sm:block">
              उत्तर प्रदेश की आवाज़
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex-1 max-w-xl mx-4 flex items-center gap-2 px-4 py-2.5 rounded-uk-full border-2 border-uk-border dark:border-uk-dark-border bg-uk-off-white dark:bg-uk-dark-bg text-uk-text-secondary hover:border-uk-red/50 transition-colors"
        >
          <span aria-hidden>🔍</span>
          <span className="text-uk-sm">लखनऊ की खबर... खोजें</span>
        </button>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="!border-green-600 !text-green-600">
            📱 WhatsApp पर जुड़ें
          </Button>
          <Button href="/login" variant="primary" size="sm">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
