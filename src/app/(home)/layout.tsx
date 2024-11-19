import NextTopLoader from 'nextjs-toploader';
import { Fragment } from 'react';

import { ToasterLoaderProvider } from '@/components/loader/toastLoaderContext';
import { Toaster } from '@/components/ui/toaster';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <NextTopLoader showSpinner={false} />
      <ToasterLoaderProvider>
        <Toaster />
        <main className="w-full h-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          {children}
        </main>
      </ToasterLoaderProvider>
    </Fragment>
  );
}
