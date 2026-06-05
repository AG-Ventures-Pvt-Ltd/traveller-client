
import "./globals.css";
import React from 'react';
import { Providers } from "./providers";
import Script from "next/script";
import Navbar from '../(pages)/(landing)/Navbar/Navbar'
import StickyNavigation from '@/common/components/composites/StickyNavigation';
import type { Metadata } from 'next';


interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Group Trips from India's Top Travel Brands | Wondrr",
  description:
    "Browse and book group trips from India's top verified travel brands — all on one platform. Fixed departures across the best destinations, zero hassle.",

  openGraph: {
    title: "Group Trips from India's Top Travel Brands | Wondrr",
    description:
      "Browse and book group trips from India's top verified travel brands — all on one platform. Fixed departures across the best destinations, zero hassle.",
    url: "https://wondrr.in",
    siteName: "Wondrr",
    images: [
      {
        url: `https://wondrr.in/png/favicon.png`, // absolute URL
        width: 1200,
        height: 630,
        alt: "Wondrr",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
}


export default function RootLayout({ children }: RootLayoutProps) {

  const isEnvProd = process.env.NEXT_PUBLIC_ENV == 'PRODUCTION'

  return (
    <html lang="en">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8ZL8763359" />
        {isEnvProd && <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || []
            function gtag() {
                dataLayer.push(arguments)
            }
            gtag('js', new Date());
            gtag('config', 'G-8ZL8763359')
          `}
        </Script>}
        {isEnvProd && <Script id="clairt-init" type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y)  {
                c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                t=l.createElement(r);
                t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uthr0z0hl7");
          `}
        </Script>}
        <link rel="icon" href="/png/favicon.png" />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
          <StickyNavigation />
        </Providers>
      </body>
    </html>
  );
}
