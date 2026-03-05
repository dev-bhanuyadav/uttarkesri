'use client';

import { cn } from '@/lib/utils';

export function BreakingTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-uk-sm bg-uk-saffron text-white text-uk-xs font-bold uppercase',
        className
      )}
    >
      <span className="animate-pulse" aria-hidden>🔴</span>
      ब्रेकिंग
    </span>
  );
}
