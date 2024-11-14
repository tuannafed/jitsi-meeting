import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

const authConfig = {
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: (credentials) => {
        if (credentials.username !== 'admin' || credentials.password !== 'admin') {
          return null;
        }

        return {
          id: 'admin',
          email: 'admin@sample.com',
          name: 'Admin',
        };
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    jwt({ token, user, account }) {
      if (account) {
        return { ...token, ...user };
      }

      return token;
    },

    async session({ token, session }) {
      if (session.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  session: { strategy: 'jwt' },
} satisfies NextAuthConfig;

export default authConfig;
