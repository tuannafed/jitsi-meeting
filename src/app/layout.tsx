import '@uploadthing/react/styles.css';
import './global.css';

export { metadata } from '@/constants/siteConfig';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
