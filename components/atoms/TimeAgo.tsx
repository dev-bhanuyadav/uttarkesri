'use client';

import { formatDistanceToNow } from 'date-fns';
import { hi } from 'date-fns/locale';

const hiMap: Record<string, string> = {
  'less than a minute ago': 'अभी',
  'about a minute ago': '1 मिनट पहले',
  'minutes ago': 'मिनट पहले',
  'about an hour ago': '1 घंटे पहले',
  'hours ago': 'घंटे पहले',
  'a day ago': '1 दिन पहले',
  'days ago': 'दिन पहले',
};

function formatHi(date: Date, baseDate: Date): string {
  const en = formatDistanceToNow(date, { addSuffix: true, locale: hi });
  for (const [key, val] of Object.entries(hiMap)) {
    if (en.includes(key)) return en.replace(key, val);
  }
  return en;
}

interface TimeAgoProps {
  date: string | Date;
  lang?: 'hi' | 'en';
  className?: string;
}

export function TimeAgo({ date, lang = 'hi', className }: TimeAgoProps) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const text = lang === 'hi' ? formatHi(d, new Date()) : formatDistanceToNow(d, { addSuffix: true });
  return <time dateTime={d.toISOString()} className={className} suppressHydrationWarning>{text}</time>;
}
