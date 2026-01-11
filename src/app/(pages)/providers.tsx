'use client';

import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { logError } from '@/common/utils/logError';
import { SessionProvider } from 'next-auth/react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D203F',
    },
    secondary: {
      main: '#000000',
    }
  },
  typography: {
    fontFamily: 'Satoshi, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: '0.5rem',
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      logError({
        error: error?.message || error,
        location: 'React Query',
        when: `fetching data for query key: ${query.queryKey}`,
      });
    }
  })
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
