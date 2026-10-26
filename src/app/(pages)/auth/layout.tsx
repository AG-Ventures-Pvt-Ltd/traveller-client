import type { Metadata } from 'next';

const TITLE = 'Log In or Sign Up | Wondrr';
const DESCRIPTION = 'Log in to Wondrr to manage bookings, track batch updates and claim your signup bonus.';

// noindex,follow: the page has no search value, and robots.txt must not block it or
// Google never sees this tag. Query variants (?mode=login&method=otp, ?redirectUrl=...)
// all canonicalize to /auth.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://wondrr.in/auth' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://wondrr.in/auth',
    type: 'website',
    siteName: 'Wondrr',
    locale: 'en_IN',
    images: [{ url: 'https://wondrr.in/png/metadata.png', width: 3944, height: 1584, alt: 'Wondrr' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
