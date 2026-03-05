import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Devanagari, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-noto-devanagari',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  applicationName: 'उत्तर केसरी',
  title: 'उत्तर केसरी | Uttar Kesri — उत्तर प्रदेश की आवाज़',
  description: 'UP की विश्वसनीय खबरें — हिंदी और इंग्लिश में। राजनीति, खेल, मनोरंजन, किसान, नौकरी और जिलों की खबरें।',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'उत्तर केसरी' },
  openGraph: {
    title: 'उत्तर केसरी | Uttar Kesri',
    description: 'उत्तर प्रदेश की आवाज़ — विश्वसनीय खबरें',
  },
};

export const viewport: Viewport = {
  themeColor: '#CC0000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={`${notoDevanagari.variable} ${playfair.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="font-devanagari antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
