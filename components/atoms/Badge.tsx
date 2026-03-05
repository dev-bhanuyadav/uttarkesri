'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'category' | 'breaking' | 'live' | 'exclusive' | 'default';
  color?: string;
  className?: string;
}

export function Badge({ children, variant = 'default', color, className }: BadgeProps) {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-uk-sm text-uk-xs font-semibold';
  const variants = {
    category: 'bg-uk-red text-white',
    breaking: 'bg-uk-saffron text-white animate-pulse-live',
    live: 'bg-uk-red text-white',
    exclusive: 'bg-uk-navy text-white',
    default: 'bg-uk-surface text-uk-text-secondary',
  };
  const style = color ? { backgroundColor: color, color: '#fff' } : undefined;
  return (
    <span
      className={cn(base, !color && variants[variant], className)}
      style={style}
    >
      {children}
    </span>
  );
}
