import { Poppins } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import { ToasterLoaderProvider } from '@/components/loader/toastLoaderContext';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const poppins = Poppins({ weight: ['400', '500', '600'], subsets: ['latin'] });

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(poppins.className)} suppressHydrationWarning={true}>
        <NextTopLoader showSpinner={false} />
        <ToasterLoaderProvider>
          <Toaster />
          <main className="w-full h-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            {children}
          </main>
        </ToasterLoaderProvider>
      </body>
    </html>
  );
}
