'use client';

import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-uk-surface text-uk-text-primary">
      <p className="text-6xl mb-4" aria-hidden>📡</p>
      <h1 className="font-devanagari text-2xl font-bold text-center mb-2">
        आप offline हैं
      </h1>
      <p className="text-uk-text-secondary text-center mb-6 max-w-sm">
        जब internet आए, ताज़ा खबरें पाएं। पहले से सेव की गई खबरें नीचे दिख सकती हैं।
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-uk-red text-white rounded-uk-md font-devanagari font-semibold"
      >
        फिर कोशिश करें
      </button>
      <Link href="/" className="mt-4 text-uk-red font-devanagari underline">
        होम पर जाएं
      </Link>
    </div>
  );
}
