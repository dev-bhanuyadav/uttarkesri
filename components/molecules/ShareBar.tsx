'use client';

import { cn } from '@/lib/utils';

const shareLinks = (fullUrl: string, title: string, _text: string) => ({
  whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${fullUrl}`)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
  twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
  telegram: `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
});

interface ShareBarProps {
  url: string;
  title: string;
  text?: string;
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

export function ShareBar({ url, title, text = '', variant = 'horizontal', className }: ShareBarProps) {
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : `https://uttarkesri.com${url}`;
  const links = shareLinks(fullUrl, title, text);

  return (
    <div
      className={cn(
        'flex gap-2',
        variant === 'vertical' && 'flex-col',
        className
      )}
      role="group"
      aria-label="शेयर करें"
    >
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-uk-md bg-[#25D366] text-white hover:opacity-90 transition-opacity"
        aria-label="WhatsApp पर शेयर करें"
      >
        📱
      </a>
      <a
        href={links.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-uk-md bg-[#1877F2] text-white hover:opacity-90"
        aria-label="Facebook पर शेयर करें"
      >
        f
      </a>
      <a
        href={links.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-uk-md bg-black text-white hover:opacity-90"
        aria-label="Twitter पर शेयर करें"
      >
        𝕏
      </a>
      <a
        href={links.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-uk-md bg-[#0088cc] text-white hover:opacity-90"
        aria-label="Telegram पर शेयर करें"
      >
        ✈
      </a>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(fullUrl)}
        className="p-2 rounded-uk-md bg-uk-surface dark:bg-uk-dark-card text-uk-text-primary hover:bg-uk-border"
        aria-label="लिंक कॉपी करें"
      >
        🔗
      </button>
    </div>
  );
}
