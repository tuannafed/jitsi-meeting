import { Metadata } from 'next';

import { APP_NAME } from '@/constants/app';
import { JitsiMeetPage } from '@/features/meet';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Jitsi Meet React Demo',
};

export default function Index() {
  return <JitsiMeetPage />;
}

1;
