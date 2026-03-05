'use client';
import { useState, useEffect } from 'react';
const M = 768;
const D = 1024;
export function useDevice() {
  const [s, setS] = useState({ isMobile: false, isTablet: false, isDesktop: true, isPWA: false, width: 1024 });
  useEffect(() => {
    function up() {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      const stand = window.matchMedia('(display-mode: standalone)').matches;
      setS({ isMobile: w < M, isTablet: w >= M && w < D, isDesktop: w >= D, isPWA: stand, width: w });
    }
    up();
    window.addEventListener('resize', up);
    return () => window.removeEventListener('resize', up);
  }, []);
  return { ...s, useMobileUI: s.isMobile || s.isPWA };
}
