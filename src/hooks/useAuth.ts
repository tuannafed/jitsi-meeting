import { useSession } from 'next-auth/react';

export const useToken = () => {
  const session = useSession();

  return session?.data;
};
