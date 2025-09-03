'use client'

import "./globals.css";
import React from 'react';
import { Providers } from "./providers";
import { SessionProvider } from 'next-auth/react';


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      // Default to dark if no preference is set
      const isDark = stored ? stored === 'dark' : true;
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  return (
    <html lang="en">
      <body>
          <SessionProvider>
        <Providers>
            {children}
        </Providers>
          </SessionProvider>
      </body>
    </html>
  );
}
