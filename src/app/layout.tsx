import '@uploadthing/react/styles.css';
import './global.css';

export { metadata } from '@/constants/siteConfig';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const poppins = Poppins({ weight: ['400', '500', '600'], subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(poppins.className)} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
