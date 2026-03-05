'use client';

import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ViewCountProps {
  count: number;
  className?: string;
}

export function ViewCount({ count, className }: ViewCountProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-uk-text-muted text-uk-sm', className)}>
      <span aria-hidden>👁️</span>
      <span>{formatNumber(count)}</span>
    </span>
  );
}
