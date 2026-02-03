'use client';

import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { logError } from '@/common/utils/logError';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider, useToast } from '@/common/utils/ToastContext';
import { setToastHandler } from '@/common/utils/notify';
import { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/next"

const theme = createTheme({
  palette: {
    primary: {
      main: '#171717',
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

function ToastInitializer({ children }: { children: React.ReactNode }) {
  const { addToast } = useToast();

  useEffect(() => {
    setToastHandler(addToast);
  }, [addToast]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Analytics/>
        <SessionProvider 
          refetchInterval={0}
          refetchOnWindowFocus={false}
        >
          <ToastProvider>
            <ToastInitializer>
              {children}
            </ToastInitializer>
          </ToastProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
