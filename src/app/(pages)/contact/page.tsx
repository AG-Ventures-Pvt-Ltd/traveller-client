import type { Metadata } from 'next';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, Instagram, Linkedin, Mail, MessageCircle, Phone, Youtube } from 'lucide-react';
import Footer from '../(landing)/components/Footer/Footer';
import MobileTopBar from '../(landing)/components/MobileLanding/components/MobileTopBar';

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

interface Channel {
  icon: LucideIcon;
  title: string;
  note: string;
  /** Brand tint for the card and its icon chip. */
  bg: string;
  chip: string;
  links: { label: string; href: string; external?: boolean }[];
}

const CHANNELS: Channel[] = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    note: 'Fastest reply',
    bg: 'bg-white',
    chip: 'bg-[#D0EF65] text-neutral-900',
    links: [{ label: 'Start a chat', href: WHATSAPP_URL, external: true }],
  },
  {
    icon: Phone,
    title: 'Call us',
    note: 'Speak to our team directly',
    bg: 'bg-white',
    chip: 'bg-[#EEA0FF] text-neutral-900',
    links: SUPPORT_NUMBERS,
  },
  {
    icon: Mail,
    title: 'Email',
    note: 'For detailed queries',
    bg: 'bg-white',
    chip: 'bg-[#FFD976] text-neutral-900',
    links: [{ label: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` }],
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F4]">
      {/* Mobile only — desktop has the navbar. */}
      <div className="pt-6 md:hidden">
        <MobileTopBar />
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-8 pb-16 md:px-8 md:pt-16 md:pb-24">
        <header className="flex flex-col gap-2 md:items-center md:text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">
            Contact{' '}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-2.5 bg-[#D0EF65] rounded-sm" />
              <span className="relative">us</span>
            </span>
          </h1>
          <p className="text-sm md:text-base text-neutral-600">Trips, bookings or payments — we&apos;re one message away.</p>
        </header>

        <section className="mt-8 md:mt-12 grid gap-3 md:grid-cols-3 md:gap-4">
          {CHANNELS.map(({ icon: Icon, title, note, bg, chip, links }) => (
            <div
              key={title}
              className={`${bg} rounded-2xl border border-[#E5E5E5] p-4 md:p-6 flex items-start gap-4 md:flex-col md:gap-5`}
            >
              <span className={`${chip} flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex flex-col gap-1 min-w-0">
                <p className="text-base md:text-lg font-semibold text-neutral-900">{title}</p>
                <p className="text-xs text-neutral-500">{note}</p>
                <div className="mt-2 flex flex-col gap-1.5">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      {...(l.external && { target: '_blank', rel: 'noopener noreferrer' })}
                      className="group inline-flex w-fit items-center gap-1 text-sm md:text-base font-semibold text-neutral-900 underline-offset-4 hover:underline break-all"
                    >
                      {l.label}
                      {l.external && <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-8 md:mt-12 flex items-center gap-3 md:justify-center">
          <p className="text-sm text-neutral-600">Follow us</p>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-neutral-800 transition-colors hover:bg-[#EEA0FF]/30"
            >
              <s.icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </section>
      </div>

      <Footer />
    </main>
  );
}
