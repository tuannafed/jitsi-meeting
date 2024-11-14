'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function GlobalError() {
  const router = useRouter();

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <h2 className="font-heading my-2 text-2xl font-bold">Something&apos;s missing</h2>
      <p>Sorry, the page you are looking for doesn&apos;t exist or has been moved.</p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.refresh()} variant="default" size="lg">
          Try again
        </Button>
      </div>
    </div>
  );
}
