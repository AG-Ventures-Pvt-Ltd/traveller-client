import type { LucideIcon } from 'lucide-react'
import {
  BadgeCheck,
  BarChart3,
  CalendarCheck,
  ClipboardCheck,
  Compass,
  Eye,
  Headphones,
  IndianRupee,
  ListPlus,
  MapPin,
  Megaphone,
  MessageSquare,
  Mountain,
  Rocket,
  Users,
  Wallet,
} from 'lucide-react'

/** External operator portal — every call to action on this page points here. */
export const PARTNER_URL = 'https://partner.wondrr.in'

/**
 * Single source of truth for the Partner With Us page — written strictly for
 * travel operators. Claims are kept factual and consistent with how Wondrr's
 * operator tooling actually works (list and manage trips, batches, payment
 * tracking and payouts, traveler communication, performance insights, verified
 * marketplace exposure). No invented metrics or guarantees.
 */

export const HERO = {
  eyebrow: 'For travel operators',
  headlinePre: 'Grow your group-travel business on',
  headlineHighlight: 'Wondrr',
  lede: 'List your fixed-departure group trips on India’s verified marketplace, reach travelers actively looking to book, and run everything from one operator dashboard.',
  cta: 'Become a partner',
  trustline: ['Fair, transparent commissions', 'No hidden fees', 'Brand-first listings'],
}

export type Benefit = { icon: LucideIcon; title: string; text: string; color: string }

export const WHY = {
  heading: 'Why operators choose Wondrr',
  subheading: 'A marketplace built to send you real, high-intent bookings.',
  benefits: [
    { icon: Eye, title: 'Reach high-intent travelers', text: 'Get discovered by travelers across India who are ready to book group trips.', color: '#D0EF65' },
    { icon: BadgeCheck, title: 'Brand-first listings', text: 'Your brand stays front and centre — never anonymous aggregation.', color: '#FFC107' },
    { icon: IndianRupee, title: 'Fair, transparent commissions', text: 'Clear, fair commissions with no hidden charges or surprise deductions.', color: '#BFE3FF' },
    { icon: Wallet, title: 'Direct bookings & secure payouts', text: 'Take bookings on the platform and receive reliable, on-time payouts.', color: '#FFE3DA' },
  ] as Benefit[],
}

export type Tool = { icon: LucideIcon; title: string; text: string }

export const TOOLS = {
  heading: 'Run everything from one dashboard',
  subheading: 'List, manage and grow your trips without the operational chaos.',
  items: [
    { icon: CalendarCheck, title: 'Trips & batches', text: 'Create trips with itineraries and manage multiple batches and capacities.' },
    { icon: Wallet, title: 'Payments & payouts', text: 'Track payments and participants, with secure payouts handled for you.' },
    { icon: MessageSquare, title: 'Traveler communication', text: 'Send organised batch updates instead of scattered WhatsApp threads.' },
    { icon: BarChart3, title: 'Performance insights', text: 'See bookings and trip performance to plan your next departures.' },
    { icon: Megaphone, title: 'Marketing support', text: 'Gain extra visibility through featured placements across the marketplace.' },
    { icon: Headphones, title: 'Dedicated support', text: 'Work with a partner support team before, during and after trips.' },
  ] as Tool[],
}

export type Step = { icon: LucideIcon; title: string; text: string }

export const STEPS = {
  heading: 'How to become a partner',
  subheading: 'Three steps from application to your first booking.',
  items: [
    { icon: ClipboardCheck, title: 'Apply & get verified', text: 'Share your business details and trip offerings, and get verified by our team.' },
    { icon: Rocket, title: 'Set up your profile', text: 'We help you set up your operator profile and account on the platform.' },
    { icon: ListPlus, title: 'List trips & go live', text: 'Publish trips with pricing and policies, and start receiving bookings.' },
  ] as Step[],
}

export type Eligibility = { icon: LucideIcon; label: string; color: string }

export const WHO = {
  heading: 'Who can partner with us',
  subheading: 'If you run group trips in India, Wondrr is built for you.',
  types: [
    { icon: Users, label: 'Group trip operators', color: '#D0EF65' },
    { icon: Mountain, label: 'Trek & backpacking organisers', color: '#FFC107' },
    { icon: Compass, label: 'Adventure travel companies', color: '#BFE3FF' },
    { icon: MapPin, label: 'Local travel experts & guides', color: '#FFE3DA' },
  ] as Eligibility[],
}

/** Plain-text FAQ reused by the on-page accordion and the FAQPage JSON-LD. */
export const FAQS = [
  {
    q: 'How do I become a Wondrr partner?',
    a: 'Apply with your business details and trip offerings to get verified by the Wondrr team. Once approved, you set up your operator profile, list your trips with pricing and policies, and start receiving bookings.',
  },
  {
    q: 'Who can list trips on Wondrr?',
    a: 'Wondrr is for travel operators running fixed-departure group trips in India — including group trip operators, trek and backpacking organisers, adventure travel companies, and local travel experts and guides.',
  },
  {
    q: 'How do commissions and fees work?',
    a: 'Wondrr charges clear, fair commissions with no hidden fees or surprise deductions. You see the terms upfront before you list.',
  },
  {
    q: 'How and when do I get paid?',
    a: 'Bookings are taken securely on the platform, and payouts are made reliably and on time. Payment status for every booking is tracked in your dashboard.',
  },
  {
    q: 'What can I manage from the dashboard?',
    a: 'You can create trips and itineraries, manage multiple batches and capacities, track payments and participants, communicate with travelers, and view booking and performance insights — all in one place.',
  },
  {
    q: 'How are my trips shown to travelers?',
    a: 'Your trips appear under your own brand on the Wondrr marketplace, where travelers across India browse, compare and book. Verified operators can also get featured placements for extra visibility.',
  },
]

export const FAQ_SECTION = {
  heading: 'Partner questions, answered',
  subheading: 'How applying, listing, commissions and payouts work.',
}

export const CTA = {
  heading: 'Ready to grow your group-travel business?',
  subheading: 'Join Wondrr’s verified marketplace and start reaching travelers across India.',
  button: 'Become a partner',
}
