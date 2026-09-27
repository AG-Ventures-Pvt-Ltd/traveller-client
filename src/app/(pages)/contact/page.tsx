import type { Metadata } from 'next';
import { ArrowRight, Compass, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Plane, Youtube } from 'lucide-react';
import BackButton from '@/common/ui/BackButton';
import Footer from '../(landing)/components/Footer/Footer';
import ClosingCta from '../(landing)/components/common/ClosingCta/ClosingCta';

export const metadata: Metadata = {
  title: 'Contact Us | Wondrr',
  description: "Reach the Wondrr team — call us, email, or chat on WhatsApp for help with your trip.",
  alternates: { canonical: '/contact' },
};

// Same details as the footer: label is the customer-facing number, href is the dial-through line.
const SUPPORT_NUMBERS = [
  { label: '+91-9667427187', href: 'tel:+91-8217728508' },
  { label: '+91-9151315550', href: 'tel:+91-8629060785' },
];
const SUPPORT_EMAIL = 'support@wondrr.in';
const WHATSAPP_URL = `https://wa.me/919667427187?text=${encodeURIComponent("Hi Wondrr, I'd like some help.")}`;

const SOCIALS = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/wondrr.in' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/wondrr' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@wondrrtrips' },
];

const card = 'relative rounded-3xl border border-[#D9D9D9] bg-white p-6 md:p-7 flex flex-col gap-4';
const iconBubble = 'flex h-12 w-12 items-center justify-center rounded-full';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F4]">
      <div className="relative mx-auto max-w-5xl px-4 pt-8 pb-10 md:px-8 md:pt-20">
        {/* Faint travel doodles, same treatment as the landing hero/trust sections */}
        <Plane className="absolute right-6 top-10 h-24 w-24 rotate-12 text-neutral-800 opacity-[0.08] pointer-events-none md:h-32 md:w-32" strokeWidth={1} />
        <Compass className="absolute left-2 top-40 h-16 w-16 -rotate-6 text-neutral-800 opacity-[0.07] pointer-events-none" strokeWidth={1} />
        <MapPin className="absolute right-[30%] top-4 h-10 w-10 text-neutral-800 opacity-[0.06] pointer-events-none" strokeWidth={1} />

        <section className="relative flex flex-col gap-4 md:items-center md:text-center">
          {/* Mobile only — desktop has the navbar. */}
          <div className="mb-2 md:hidden">
            <BackButton label="" />
          </div>
          <h1 className="text-[34px] md:text-[56px] font-bold leading-[1.1] tracking-tight text-neutral-900 font-['Satoshi']">
            Real people,{' '}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-[10px] md:h-[12px] bg-[#D0EF65] rounded-sm z-0" />
              <span className="relative z-10">one message away.</span>
            </span>
          </h1>
          <p className="max-w-lg text-neutral-500 md:text-lg">
            Questions about a trip, a booking or your Travel Pass? Pick whatever&apos;s easiest — our team replies fast.
          </p>
        </section>

        <section className="relative mt-12 grid gap-4 md:grid-cols-3">
          {/* WhatsApp leads: fastest channel */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-3xl bg-neutral-900 p-6 md:p-7 flex flex-col gap-4 text-white transition-transform hover:-translate-y-0.5"
          >
            <span className="absolute right-5 top-5 rounded-full bg-[#D0EF65] px-2.5 py-1 text-xs font-semibold text-neutral-900">Fastest</span>
            <span className={`${iconBubble} bg-[#25D366]`}>
              <MessageCircle className="h-6 w-6 text-white" />
            </span>
            <div>
              <p className="text-xl font-semibold font-['Satoshi']">Chat on WhatsApp</p>
              <p className="mt-1 text-sm text-white/60">Drop a message, we&apos;ll take it from there.</p>
            </div>
            <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl bg-[#EEA0FF] px-5 py-2.5 text-sm font-semibold text-neutral-900">
              Start chat <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>

          <div className={card}>
            <span className={`${iconBubble} bg-[#EEA0FF]`}>
              <Phone className="h-5 w-5 text-neutral-900" />
            </span>
            <p className="text-xl font-semibold text-neutral-900 font-['Satoshi']">Call us</p>
            <div className="mt-auto flex flex-col gap-2">
              {SUPPORT_NUMBERS.map((n) => (
                <a key={n.href} href={n.href} className="w-fit text-lg font-semibold text-neutral-900 underline-offset-4 hover:underline">
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          <div className={card}>
            <span className={`${iconBubble} bg-[#D0EF65]`}>
              <Mail className="h-5 w-5 text-neutral-900" />
            </span>
            <p className="text-xl font-semibold text-neutral-900 font-['Satoshi']">Email us</p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-auto w-fit text-lg font-semibold text-neutral-900 underline-offset-4 hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </div>
        </section>

        <section className="relative mt-10 flex flex-col items-center gap-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-neutral-600">Follow the trips</p>
          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D9D9D9] bg-white text-neutral-800 transition-colors hover:border-[#EEA0FF] hover:bg-[#EEA0FF]/20"
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </section>

        <div className="relative mt-16 md:hidden">
          <ClosingCta variant="mobile" />
        </div>
        <div className="relative mt-16 hidden md:block">
          <ClosingCta variant="desktop" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
