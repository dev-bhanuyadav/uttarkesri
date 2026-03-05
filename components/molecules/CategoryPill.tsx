'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface CategoryPillProps {
  nameHi: string;
  nameEn: string;
  slug: string;
  icon?: string;
  isActive?: boolean;
  className?: string;
}

export function CategoryPill({ nameHi, slug, icon, isActive, className }: CategoryPillProps) {
  const pathname = usePathname();
  const active = isActive ?? pathname === `/${slug}`;

  return (
    <Link
      href={slug === 'home' ? '/' : `/${slug}`}
      className={cn(
        'inline-flex items-center gap-1.5 px-4 py-2 rounded-uk-full text-uk-sm font-medium transition-all',
        active
          ? 'bg-uk-red text-white'
          : 'text-uk-text-secondary hover:bg-uk-red-light hover:text-uk-red dark:text-uk-dark-muted dark:hover:bg-uk-dark-card',
        className
      )}
    >
      {icon && <span aria-hidden>{icon}</span>}
      <span className="font-devanagari">{nameHi}</span>
    </Link>
  );
}
