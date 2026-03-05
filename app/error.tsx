'use client';

import { useEffect } from 'react';
import { Button } from '@/components/atoms/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-uk-off-white dark:bg-uk-dark-bg">
      <div className="text-center max-w-md">
        <h1 className="font-devanagari font-bold text-uk-2xl text-uk-red mb-2">कुछ गड़बड़ हो गई</h1>
        <p className="text-uk-text-secondary mb-4">{error.message}</p>
        <Button onClick={reset}>फिर कोशिश करें</Button>
      </div>
    </div>
  );
}
