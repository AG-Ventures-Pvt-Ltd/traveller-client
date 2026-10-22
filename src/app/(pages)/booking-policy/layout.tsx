import type { Metadata } from 'next';

// booking-policy/page.tsx is a client component, so metadata can't live there —
// it inherits from the shared (pages) layout otherwise, which no longer sets a
// canonical (that was wrongly pointing every page at "/").
export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Wondrr',
  description: 'Terms and conditions, cancellation tiers, and refund policy for bookings made on Wondrr.',
  alternates: { canonical: 'https://wondrr.in/booking-policy' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
