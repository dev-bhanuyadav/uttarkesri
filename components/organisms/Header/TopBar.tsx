'use client';

import { useUIStore } from '@/store/uiStore';
import { CategoryPill } from '@/components/molecules/CategoryPill';

const districts = [
  { name: 'लखनऊ', temp: '24', icon: '🏙️' },
  { name: 'दिल्ली', temp: '19', icon: '🌫️' },
  { name: 'कानपुर', temp: '22', icon: '' },
];

export function TopBar() {
  const { language, setLanguage } = useUIStore();

  return (
    <div className="hidden md:flex h-9 bg-uk-dark-bg text-uk-dark-muted text-uk-sm items-center justify-between px-4 border-b border-uk-dark-border">
      <div className="flex items-center gap-3">
        <span>📅 बुधवार, 4 मार्च 2026</span>
        <span className="font-mono text-uk-text-muted">10:45:23 IST</span>
        <span>|</span>
        {districts.map((d) => (
          <span key={d.name} className="hover:text-uk-dark-text transition-colors">
            {d.icon} {d.name} {d.temp}°C
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 overflow-hidden max-w-md">
        <span className="font-mono text-green-400">SENSEX ▲ 73,450</span>
        <span className="font-mono text-green-400">NIFTY ▲ 22,100</span>
        <span className="font-mono">सोना ₹62,500</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
          className="px-2 py-1 rounded-uk-sm hover:bg-uk-dark-card transition-colors"
        >
          {language === 'hi' ? 'हिन्दी ●' : 'English'}
        </button>
        <button type="button" className="p-1 relative" aria-label="नोटिफिकेशन">
          🔔
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-uk-red" />
        </button>
        <a href="#app" className="text-uk-sm hover:text-uk-dark-text">
          📱 App
        </a>
      </div>
    </div>
  );
}
