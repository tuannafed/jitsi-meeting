/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: Session['user'];
    error?: 'RefreshTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    error?: 'RefreshTokenError';
  }
}
