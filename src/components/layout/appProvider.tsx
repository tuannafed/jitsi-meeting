'use client';

import 'dayjs/locale/ja';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';

import { AuthProvider } from '@/components/layout/authProvider';
import ThemeProvider from '@/components/layout/ThemeToggle/themeProvider';
import { globalStore } from '@/stores';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

interface Props extends React.PropsWithChildren {}

export function AppProvider({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReduxProvider store={globalStore}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
