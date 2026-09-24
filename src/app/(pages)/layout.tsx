
import "./globals.css";
import React from 'react';
import { Rubik } from 'next/font/google';
import { Providers } from "./providers";

// Rubik is declared as the site font in globals.css (`--font-sans`) but was never
// actually loaded — this wires it up so the family resolves instead of falling
// back to system-ui.
const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});
import Script from "next/script";
import Navbar from './(landing)/components/Navbar/Navbar'
import StickyNavigation from '@/common/components/composites/StickyNavigation';
import PromoCouponBanner from './(landing)/components/common/PromoCouponBanner/PromoCouponBanner';
import type { Metadata } from 'next';
import Image from "next/image";
import { JsonLd, organizationSchema, websiteSchema } from '@/common/seo/JsonLd';
import { GA_ID, ALLOWED_HOSTS } from '@/common/utils/analytics';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL('https://wondrr.in'),
  title: "Group Trips from India's Top Travel Brands | Wondrr",
  description:
    "Browse and book group trips from India's top verified travel brands — all on one platform. Fixed departures across the best destinations, zero hassle.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Group Trips from India's Top Travel Brands | Wondrr",
    description:
      "Browse and book group trips from India's top verified travel brands — all on one platform. Fixed departures across the best destinations, zero hassle.",
    url: "https://wondrr.in",
    siteName: "Wondrr",
    images: [
      {
        url: `https://wondrr.in/png/metadata.png`, // absolute URL — real social card
        width: 3944,
        height: 1584,
        alt: "Wondrr — group trips from India's top travel brands",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Group Trips from India's Top Travel Brands | Wondrr",
    description:
      "Browse and book group trips from India's top verified travel brands — all on one platform.",
    images: [`https://wondrr.in/png/metadata.png`],
  },
}


export default function RootLayout({ children }: RootLayoutProps) {

  const isEnvProd = process.env.NEXT_PUBLIC_ENV === 'PRODUCTION'

  return (
    <html lang="en" className={rubik.variable}>
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        {isEnvProd &&
          <>
            {/* beforeInteractive so window.gtag exists for the very first client
                effect. Events fired before gtag.js loads queue in dataLayer and
                are processed on load — when the stub only arrived
                afterInteractive, view_item on a direct trip-page landing was
                dropped outright (~25% of loads). The host check keeps a
                production build served from dev1/dev2/localhost/*.vercel.app
                out of the property. */}
            <Script id="ga-init" strategy="beforeInteractive">
              {`
            window.dataLayer = window.dataLayer || []
            function gtag() {
                dataLayer.push(arguments)
            }
            window.gtag = gtag;
            if (${JSON.stringify(ALLOWED_HOSTS)}.indexOf(location.hostname) !== -1) {
                gtag('js', new Date());
                gtag('config', '${GA_ID}')
            }
          `}
            </Script>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <Script id="clairt-init" strategy="afterInteractive">
              {`
            if (${JSON.stringify(ALLOWED_HOSTS)}.indexOf(location.hostname) !== -1) {
            (function(c,l,a,r,i,t,y)  {
                c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                t=l.createElement(r);
                t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uthr0z0hl7");
            }
          `}
            </Script>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
            if (${JSON.stringify(ALLOWED_HOSTS)}.indexOf(location.hostname) !== -1) {
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '27319879267632269');
            fbq('track', 'PageView');
            }
            `}
            </Script>
            <noscript>
              <Image
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=27319879267632269&ev=PageView&noscript=1"
                alt='Meta Pixel'
              />
            </noscript>
          </>
        }
        <link rel="icon" href="/png/favicon.png" />
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body>
        <Providers>
          {/* Column so a page can fill the space *below* the navbar. The navbar is sticky,
              not fixed, so it still takes flow height — a `min-h-screen` page under it adds
              up to 100vh + navbar and scrolls even with no content to scroll. Pages that
              still set their own min-h-screen behave exactly as before. */}
          <div className="flex min-h-screen flex-col">
            {/* Promo strip and navbar stick as one block, so neither needs to know
                the other's height. The strip renders null off the landing page. */}
            <div className="sticky top-0 z-50">
              <PromoCouponBanner />
              <Navbar />
            </div>
            <div className="flex flex-1 flex-col">{children}</div>
          </div>
          <StickyNavigation />
        </Providers>
      </body>
    </html>
  );
}
