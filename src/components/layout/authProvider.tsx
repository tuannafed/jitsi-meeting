'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

import { LOGIN_PATH } from '@/constants/path';

interface Props extends React.PropsWithChildren {}

export function AuthProvider({ children }: Props) {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'unauthenticated') {
    router.push(LOGIN_PATH);
  }

  return <Fragment>{children}</Fragment>;
}
