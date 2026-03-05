'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsOnline(navigator.onLine);
    function onOnline() {
      setIsOnline(true);
      setDismissed(false);
    }
    function onOffline() {
      setIsOnline(false);
      setDismissed(false);
    }
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (isOnline || dismissed) return null;

  return (
    <div
      className={cn(
        'sticky top-0 z-50 px-4 py-2 text-center text-uk-sm font-medium',
        'bg-amber-500 text-white'
      )}
      role="status"
      aria-live="polite"
    >
      <span className="font-devanagari">📡 आप offline हैं — पुरानी खबरें दिखा रहे हैं</span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="ml-2 underline"
      >
        ✕
      </button>
    </div>
  );
}
