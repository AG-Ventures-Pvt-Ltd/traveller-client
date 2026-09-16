import type { Metadata } from 'next';
import WhatsAppButton from './WhatsAppButton';

export const metadata: Metadata = {
  title: 'Contact Us | Wondrr',
  description: "Reach the Wondrr team — call us or chat on WhatsApp for help with your trip.",
  alternates: { canonical: '/contact' },
};

// Same numbers used in the footer: label is the customer-facing number, href is the dial-through line.
const SUPPORT_NUMBERS = [
  { label: '+91-9667427187', href: 'tel:+91-8217728508' },
  { label: '+91-9151315550', href: 'tel:+91-8629060785' },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F4]">
      <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">Get in touch</h1>
        <p className="mt-3 text-neutral-600">
          Questions about a trip or booking? Call us or drop a message on WhatsApp — our team replies fast.
        </p>

        <div className="mt-10 rounded-2xl border-2 border-neutral-900 bg-white p-6 shadow-[6px_6px_0_0_#111]">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
            Call us
          </p>
          <div className="flex flex-col gap-3">
            {SUPPORT_NUMBERS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="w-fit text-lg font-semibold text-neutral-900 hover:text-neutral-600"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <WhatsAppButton />
        </div>
      </div>
    </main>
  );
}
