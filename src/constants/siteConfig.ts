import { Metadata } from 'next';

import { APP_NAME, APP_URL } from '@/constants/app';

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  metadataBase: new URL(APP_URL),
  description: `This is a ${APP_NAME}`,
  applicationName: APP_NAME,
  referrer: 'origin-when-cross-origin',
  keywords: [],
  authors: [{ name: 'Admin', url: '' }],
  creator: 'Admin',
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: `This is a ${APP_NAME}`,
    images: ['./opengraph-image.png'],
    creator: `@${APP_NAME}`,
  },
  alternates: {
    canonical: '/en',
    languages: {
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    title: APP_NAME,
    description: `This is a ${APP_NAME}`,
    siteName: APP_NAME,
    images: [
      {
        url: './opengraph-image.png',
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'ca-pub-1234567890',
  },
  manifest: '/site.webmanifest',
  other: {
    'apple-touch-icon': '/apple-touch-icon.png',
    'theme-color': '#ffffff',
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/mstile-144x144.png',
    'msapplication-config': '/browserconfig.xml',
    'application-name': APP_NAME,
    'mask-icon': '/safari-pinned-tab.svg',
  },
};
