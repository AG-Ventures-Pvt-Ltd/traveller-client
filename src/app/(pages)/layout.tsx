'use client'

import "./globals.css";
import React from 'react';
import { Providers } from "./providers";
import { ToastContainer } from 'react-toastify';
import { DM_Sans } from 'next/font/google';
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
});
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      const isDark = stored ? stored === 'dark' : true;
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={dmSans.variable}>
        <Providers>
          {children}
          <ToastContainer position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
