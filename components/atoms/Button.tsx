'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-uk-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-uk-red focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary: 'bg-uk-red text-white hover:bg-uk-red-dark shadow-card hover:shadow-hover',
    secondary: 'bg-uk-saffron text-white hover:bg-uk-saffron-dark',
    outline: 'border-2 border-uk-red text-uk-red hover:bg-uk-red-light',
    ghost: 'text-uk-text-primary hover:bg-uk-surface',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-uk-sm',
    md: 'px-4 py-2 text-uk-base',
    lg: 'px-6 py-3 text-uk-lg',
  };
  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}
