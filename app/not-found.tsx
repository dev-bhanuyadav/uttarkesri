import Link from 'next/link';
import { Button } from '@/components/atoms/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-uk-off-white dark:bg-uk-dark-bg">
      <div className="text-center">
        <h1 className="font-devanagari font-bold text-uk-4xl text-uk-text-primary mb-2">404</h1>
        <p className="text-uk-text-secondary mb-4">यह पेज नहीं मिला।</p>
        <Button href="/">होम पर जाएं</Button>
      </div>
    </div>
  );
}
