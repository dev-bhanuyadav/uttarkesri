'use client';

import Link from 'next/link';

const quickLinks = [
  { label: 'हमारे बारे में', href: '/about' },
  { label: 'संपर्क करें', href: '/contact' },
  { label: 'गोपनीयता नीति', href: '/privacy-policy' },
  { label: 'नियम और शर्तें', href: '/terms' },
  { label: 'विज्ञापन दें', href: '/advertise' },
];

const topDistricts = [
  'लखनऊ', 'कानपुर', 'वाराणसी', 'इलाहाबाद', 'आगरा', 'मेरठ', 'गाजियाबाद', 'नोएडा',
];

export function Footer() {
  return (
    <footer className="bg-uk-dark-bg text-uk-dark-muted mt-12">
      <div className="tricolor-strip h-1" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-uk-md bg-uk-saffron flex items-center justify-center text-white font-bold text-xl">
                उ
              </div>
              <span className="font-devanagari font-bold text-uk-lg text-white">
                उत्तर केसरी
              </span>
            </div>
            <p className="text-uk-sm mb-2">
              उत्तर प्रदेश की आवाज़ — विश्वसनीय खबरें, हिंदी और इंग्लिश में।
            </p>
            <p className="text-uk-xs opacity-75">RNI Reg. No. | DAVP | ASCI Member</p>
          </div>
          <div>
            <h3 className="font-devanagari font-semibold text-white text-uk-lg mb-3">
              जल्दी लिंक
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors text-uk-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-devanagari font-semibold text-white text-uk-lg mb-3">
              जिले
            </h3>
            <ul className="flex flex-wrap gap-2">
              {topDistricts.map((d) => (
                <li key={d}>
                  <Link
                    href={`/district/${d.toLowerCase().replace(/\s/g, '-')}`}
                    className="text-uk-sm hover:text-white transition-colors"
                  >
                    {d}
                  </Link>
                  <span className="text-uk-text-muted/50">|</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-devanagari font-semibold text-white text-uk-lg mb-3">
              संपर्क
            </h3>
            <p className="text-uk-sm">लखनऊ, उत्तर प्रदेश</p>
            <p className="text-uk-sm mt-1">📞 | 📱 WhatsApp | ✉️</p>
            <div className="flex gap-2 mt-3">
              <a href="#" className="p-2 rounded-uk-md bg-uk-dark-card hover:bg-uk-navy-light" aria-label="Facebook">f</a>
              <a href="#" className="p-2 rounded-uk-md bg-uk-dark-card hover:bg-uk-navy-light" aria-label="Twitter">𝕏</a>
              <a href="#" className="p-2 rounded-uk-md bg-uk-dark-card hover:bg-uk-navy-light" aria-label="YouTube">▶</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-uk-dark-border text-uk-xs text-center">
          <p>© 2026 Uttar Kesri | Privacy Policy | Terms | Sitemap | Disclaimer</p>
          <p className="mt-1">Made with ❤️ in Lucknow, UP 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
