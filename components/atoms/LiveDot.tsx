'use client';

import { cn } from '@/lib/utils';

export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-2 w-2 rounded-full bg-uk-red animate-pulse-live',
        className
      )}
      aria-hidden
    />
  );
}
