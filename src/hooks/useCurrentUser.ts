import { useSession } from 'next-auth/react';

import { DEVELOPMENT } from '@/constants/environment';

export const useCurrentUser = () => {
  const session = useSession();

  if (process.env.NODE_ENV === DEVELOPMENT) {
    // eslint-disable-next-line no-console
    console.log('session', session);
  }

  return session?.data?.user;
};
