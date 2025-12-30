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
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8ZL8763359" />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || []
            function gtag() {
                dataLayer.push(arguments)
            }
            gtag('js', new Date());
            gtag('config', 'G-8ZL8763359')
          `}
        </Script>
        <Script id="clairt-init" type="text/javascript">
            {`
            (function(c,l,a,r,i,t,y)  {
                c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                t=l.createElement(r);
                t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uthr0z0hl7");
      `}
        </Script>
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
