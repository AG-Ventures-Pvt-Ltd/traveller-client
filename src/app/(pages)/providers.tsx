'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider, useToast } from '@/common/utils/ToastContext';
import { setToastHandler } from '@/common/utils/notify';
import { useEffect, useState } from 'react';
import { Analytics } from "@vercel/analytics/next"
import { DeviceProvider } from "@/common/context/DeviceContext";
import { getQueryClient } from '@/services/getQueryClient';




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
    fontFamily: 'Acme, sans-serif',
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

function ToastInitializer({ children }: { children: React.ReactNode }) {
  const { addToast } = useToast();

  useEffect(() => {
    setToastHandler(addToast);
  }, [addToast]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const isProduction = process.env.NEXT_PUBLIC_ENV === 'PROD';
  // Stable per-environment client: new each server request, singleton in browser.
  const [queryClient] = useState(getQueryClient);

  return (
    <ThemeProvider theme={theme}>
      <DeviceProvider>
        <QueryClientProvider client={queryClient}>
          {isProduction && <Analytics />}
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
      </DeviceProvider>
    </ThemeProvider>
  );
}
