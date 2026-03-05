'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  height?: number;
}

export function ProgressBar({ value, className, height = 3 }: ProgressBarProps) {
  return (
    <div
      className={cn('w-full bg-uk-border dark:bg-uk-dark-border rounded-full overflow-hidden', className)}
      style={{ height: `${height}px` }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-uk-saffron transition-all duration-150 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
