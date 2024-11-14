import { useSession } from 'next-auth/react';

export const useProjects = () => {
  const session = useSession();

  return session?.data;
};
