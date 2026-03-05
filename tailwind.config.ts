import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        uk: {
          red: 'var(--uk-red)',
          'red-dark': 'var(--uk-red-dark)',
          'red-light': 'var(--uk-red-light)',
          saffron: 'var(--uk-saffron)',
          'saffron-dark': 'var(--uk-saffron-dark)',
          gold: 'var(--uk-gold)',
          navy: 'var(--uk-navy)',
          'navy-light': 'var(--uk-navy-light)',
          white: 'var(--uk-white)',
          'off-white': 'var(--uk-off-white)',
          surface: 'var(--uk-surface)',
          border: 'var(--uk-border)',
          'border-dark': 'var(--uk-border-dark)',
          'text-primary': 'var(--uk-text-primary)',
          'text-secondary': 'var(--uk-text-secondary)',
          'text-muted': 'var(--uk-text-muted)',
          'dark-bg': 'var(--uk-dark-bg)',
          'dark-surface': 'var(--uk-dark-surface)',
          'dark-card': 'var(--uk-dark-card)',
          'dark-border': 'var(--uk-dark-border)',
          'dark-text': 'var(--uk-dark-text)',
          'dark-muted': 'var(--uk-dark-muted)',
        },
      },
      fontFamily: {
        devanagari: ['var(--font-noto-devanagari)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'uk-xs': ['12px', { lineHeight: '1.4' }],
        'uk-sm': ['14px', { lineHeight: '1.5' }],
        'uk-base': ['16px', { lineHeight: '1.7' }],
        'uk-md': ['18px', { lineHeight: '1.8' }],
        'uk-lg': ['20px', { lineHeight: '1.6' }],
        'uk-xl': ['24px', { lineHeight: '1.4' }],
        'uk-2xl': ['30px', { lineHeight: '1.3' }],
        'uk-3xl': ['36px', { lineHeight: '1.2' }],
        'uk-4xl': ['48px', { lineHeight: '1.1' }],
        'uk-5xl': ['60px', { lineHeight: '1' }],
      },
      spacing: {
        'uk-1': '4px',
        'uk-2': '8px',
        'uk-3': '12px',
        'uk-4': '16px',
        'uk-5': '20px',
        'uk-6': '24px',
        'uk-8': '32px',
        'uk-10': '40px',
        'uk-12': '48px',
        'uk-16': '64px',
        'uk-20': '80px',
        'uk-24': '96px',
        'uk-32': '128px',
      },
      borderRadius: {
        'uk-sm': '4px',
        'uk-md': '8px',
        'uk-lg': '12px',
        'uk-xl': '16px',
        'uk-full': '9999px',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        hover: 'var(--shadow-hover)',
        modal: 'var(--shadow-modal)',
        'red': 'var(--shadow-red)',
      },
      animation: {
        'ticker': 'ticker 40s linear infinite',
        'pulse-live': 'pulse-live 2s ease-in-out infinite',
        'ken-burns': 'ken-burns 20s ease-in-out infinite alternate',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-live': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
