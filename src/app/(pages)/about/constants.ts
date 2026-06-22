import type { LucideIcon } from 'lucide-react'
import {
  BadgeCheck,
  CalendarCheck,
  Compass,
  CreditCard,
  Eye,
  Globe2,
  Layers,
  MapPin,
  MessageSquare,
  Plane,
  Receipt,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react'

/**
 * Single source of truth for the About page. Every claim here is kept factual and
 * verifiable from how Wondrr actually works (marketplace model, verified operators,
 * transparent pricing, small groups) so the page reads as a true, citable reference
 * for both readers and AI search engines.
 */

export const ABOUT_HERO = {
  eyebrow: 'About Wondrr',
  // Definitional, self-contained sentence — easy for AI search to lift verbatim.
  headlinePre: 'Wondrr is India’s',
  headlineHighlight: 'verified marketplace',
  headlinePost: 'for group travel.',
  lede: 'We bring structure, transparency, and trust to fixed-departure group trips — connecting travelers with verified Indian travel operators, all on one platform.',
  ticket: {
    brand: 'WONDRR',
    kind: 'Group Travel Marketplace',
    from: 'CHAOS',
    to: 'CLARITY',
    rows: [
      { label: 'Operates in', value: 'India' },
      { label: 'Model', value: 'Marketplace' },
      { label: 'Promise', value: 'Trust-first' },
    ],
    gate: 'EXPLORE',
  },
  chips: [
    { icon: ShieldCheck, text: 'Verified operators only' },
    { icon: Eye, text: 'Upfront pricing & refunds' },
    { icon: Globe2, text: 'Fixed departures across India' },
  ],
}

type Stat = {
  label: string
  icon: LucideIcon
  color: string
  value?: number
  prefix?: string
  suffix?: string
  text?: string
}

export const STATS: { heading: string; subheading: string; items: Stat[] } = {
  heading: 'Group travel, by the numbers',
  subheading: 'A clearer way to discover and book trips, measured simply.',
  items: [
    { value: 50, suffix: '+', label: 'Verified travel brands', icon: BadgeCheck, color: '#D0EF65' },
    { value: 15, prefix: '≤', label: 'Travelers per group, kept small', icon: Users, color: '#FFC107' },
    { value: 100, suffix: '%', label: 'Upfront pricing & refund policies', icon: Eye, color: '#BFE3FF' },
    { text: 'India', label: 'Fixed-departure destinations', icon: MapPin, color: '#FFB59E' },
  ],
}

export const MISSION_SPLIT = {
  heading: 'What Wondrr is — and what it isn’t',
  subheading: 'We keep our role honest so you always know what you’re booking.',
  does: {
    label: 'What Wondrr does',
    points: [
      { icon: ShieldCheck, text: 'Verifies operators before they can list a trip' },
      { icon: Receipt, text: 'Standardises itineraries, pricing and refund policies' },
      { icon: CreditCard, text: 'Tracks payments and participants in one place' },
      { icon: MessageSquare, text: 'Keeps trip communication organised, not scattered' },
      { icon: TrendingUp, text: 'Lets operators run group trips reliably at scale' },
    ],
  },
  doesnt: {
    label: 'What Wondrr is not',
    lead: 'Wondrr does not sell or run its own trips.',
    points: [
      { text: 'A marketplace — not a tour operator' },
      { text: 'No fees hidden in the fine print' },
      { text: 'No coordination lost in WhatsApp threads' },
      { text: 'No unverified operators on the platform' },
    ],
  },
}

export const JOURNEY = {
  heading: 'How Wondrr works',
  subheading: 'One platform, from the first listing to the trip itself.',
  steps: [
    { icon: CalendarCheck, title: 'Operators list', text: 'Detailed itineraries, batches and capacities go up in one place.' },
    { icon: ShieldCheck, title: 'Wondrr verifies', text: 'Operator profiles, policies and reviews are mandatory before listing.' },
    { icon: Search, title: 'Travelers compare', text: '50+ vetted brands, browsable and bookable without tab-switching.' },
    { icon: CreditCard, title: 'Book with clarity', text: 'Upfront pricing, secure payment and clear refund terms.' },
    { icon: Plane, title: 'Travel together', text: 'Small groups and organised updates turn strangers into friends.' },
  ],
}

export const TWO_SIDES = {
  heading: 'Built for both sides of the trip',
  subheading: 'Two audiences. One platform. Shared trust.',
  cards: [
    {
      key: 'operators',
      icon: Layers,
      accent: '#D0EF65',
      title: 'For travel operators',
      tagline: 'Run group trips like a pro.',
      features: [
        'List and manage trips with rich itineraries',
        'Handle multiple batches and participants effortlessly',
        'Automate payment tracking and reminders',
        'Build credibility through reviews and clear policies',
        'Scale without administrative chaos',
      ],
    },
    {
      key: 'travelers',
      icon: Compass,
      accent: '#FFC107',
      title: 'For travelers',
      tagline: 'Book group trips with confidence.',
      features: [
        'See full itineraries, pricing and inclusions upfront',
        'Check operator credibility through profiles and reviews',
        'Track bookings, payments and trip status in one place',
        'Know refund policies clearly before you pay',
        'Get organised updates, not WhatsApp confusion',
      ],
    },
  ],
}

/**
 * Plain-text FAQ reused by both the on-page accordion and the FAQPage JSON-LD in
 * layout.tsx. Answers are written as standalone, citable passages for AI search.
 */
export const FAQS = [
  {
    q: 'What is Wondrr?',
    a: 'Wondrr is a trust-first online marketplace for group travel in India. It connects travelers with verified travel operators offering fixed-departure group trips, all discoverable and bookable on one platform.',
  },
  {
    q: 'Does Wondrr run its own tours?',
    a: 'No. Wondrr is a marketplace, not a tour operator. It does not sell or operate trips itself — it gives verified operators the tools to list, manage and deliver group trips, and gives travelers a transparent way to find and book them.',
  },
  {
    q: 'How does Wondrr build trust?',
    a: 'Operators are verified before they can list, and clear pricing, inclusions and refund policies are mandatory on every trip. Traveler reviews and operator profiles add ongoing accountability.',
  },
  {
    q: 'Who is Wondrr for?',
    a: 'Wondrr serves two groups: travel operators who run group trips, and travelers — especially solo travelers — who want to join safe, well-organised group adventures with like-minded people.',
  },
  {
    q: 'How big are the groups?',
    a: 'Group sizes are kept intentionally small — many trips cap at around 15 travelers — so everyone is a real part of the trip rather than a number on a manifest.',
  },
  {
    q: 'How do payments and refunds work?',
    a: 'Bookings are paid through secure online payments, with payment status tracked on the platform and refund policies shown upfront before you book.',
  },
  {
    q: 'Where does Wondrr operate?',
    a: 'Wondrr operates across India, with fixed-departure group trips to destinations nationwide.',
  },
]

export const FAQ_SECTION = {
  heading: 'Questions, answered',
  subheading: 'The honest details about how Wondrr works.',
}

export const ABOUT_CTA = {
  heading: 'Your next escape is one trip away',
  subheading: 'Browse verified group trips, or list yours and reach travelers across India.',
  primary: { text: 'Explore trips', link: '/trips' },
  secondary: { text: 'Partner with us', link: '/partner-with-us' },
}
