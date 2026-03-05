'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TickerItemType {
  id: string;
  text: string;
  url?: string | null;
}

interface BreakingTickerProps {
  items: TickerItemType[];
  className?: string;
}

export function BreakingTicker({ items, className }: BreakingTickerProps) {
  if (items.length === 0) return null;

  const content = items.map((item) => (
    <span key={item.id} className="inline-flex items-center gap-2 shrink-0">
      {item.url ? (
        <Link href={item.url} className="hover:underline text-white font-devanagari text-uk-sm">
          {item.text}
        </Link>
      ) : (
        <span className="text-white font-devanagari text-uk-sm">{item.text}</span>
      )}
      <span className="text-white/60">●</span>
    </span>
  ));

  return (
    <div
      className={cn(
        'w-full bg-uk-red h-9 flex items-center overflow-hidden',
        className
      )}
      role="region"
      aria-label="ब्रेकिंग न्यूज़"
    >
      <div className="shrink-0 flex items-center gap-2 px-4 py-1 bg-white/20 text-white font-bold text-uk-sm whitespace-nowrap">
        <span className="animate-pulse" aria-hidden>🔴</span>
        ब्रेकिंग न्यूज़
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="animate-ticker flex items-center gap-4 py-1 whitespace-nowrap hover:[animation-play-state:paused]">
          {content}
          {content}
        </div>
      </div>
    </div>
  );
}
