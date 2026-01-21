import { Calendar, CreditCard, MapPin, MessageCircle, Shield, TrendingUp, Users } from 'lucide-react'

export const ABOUT_HERO = {
  badge: {
    icon: Shield,
    text: 'Trust-First Platform'
  },
  title: 'What Wondrr Is',
  description: "Wondrr is a trust-first platform built to bring structure to India's unorganized group travel ecosystem. We replace scattered WhatsApp-based coordination with a professional system to list trips, manage batches, track participants, handle payments, and communicate clearly.",
  note: {
    title: 'Wondrr does not sell travel experiences.',
    description: 'We empower travel operators to manage and deliver group trips reliably at scale, while giving travelers clarity, transparency, and confidence when booking.'
  },
  image: {
    src: '/png/aboutmain.jpg',
    alt: 'Wondrr platform overview'
  }
}

export const WONDRR_APPROACH = {
  title: 'The Wondrr Approach',
  subtitle: 'How structure, transparency, and systems solve the chaos',
  cards: [
    {
      icon: Calendar,
      title: 'Structured Trip Management',
      description: 'Create trips with detailed itineraries, manage multiple batches, set capacities, and update information centrally for all participants.'
    },
    {
      icon: Shield,
      title: 'Transparency By Default',
      description: 'Clear pricing, refund policies, operator profiles, and reviews are mandatory so travelers know exactly what to expect.'
    },
    {
      icon: CreditCard,
      title: 'Payment Tracking',
      description: 'Automated payment status, reminders, and refund workflows reduce manual work and errors.'
    },
    {
      icon: Users,
      title: 'Participant Management',
      description: 'Track joined, paid, pending participants. Manage waitlists and send batch-specific updates from one dashboard.'
    },
    {
      icon: MessageCircle,
      title: 'Clear Communication',
      description: 'Important trip updates and announcements reach everyone through organized channels, not lost chats.'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Operations',
      description: 'Grow from a few trips to hundreds per year without operational chaos.'
    }
  ],
  quote: {
    text: '"Structure doesn\'t limit creativity.\nIt enables reliability."',
    backgroundImage: '/png/A11.jpg'
  }
}

export const WHO_ITS_BUILT_FOR = {
  title: "Who It's Built For",
  subtitle: 'Two sides. One platform. Shared Trust.',
  images: [
    {
      src: '/png/A12.jpg',
      alt: 'Travel Operators'
    },
    {
      src: '/png/A11.jpg',
      alt: 'Travelers'
    }
  ],
  operators: {
    icon: Users,
    title: 'For Travel Operators',
    description: "Whether you're a solo trek leader or a company running dozens of trips each month, Wondrr helps you operate professionally.",
    features: [
      'Create and manage trips with detailed itineraries',
      'Handle multiple batches and participants effortlessly',
      'Automate payment tracking and reminders',
      'Build credibility through reviews and transparent policies',
      'Scale operations without administrative overload'
    ]
  },
  travelers: {
    icon: MapPin,
    title: 'For Travelers',
    description: 'Stop worrying about trust, clarity, and hidden surprises. Book group trips with confidence and transparency.',
    features: [
      'View complete itineraries, pricing, and inclusions upfront',
      'Check operator credibility through profiles and reviews',
      'Track bookings, payments, and trip status in one place',
      'Know refund policies clearly before booking',
      'Receive organized updates without WhatsApp confusion'
    ]
  }
}

export const VISION_SECTION = {
  badge: {
    icon: TrendingUp,
    text: 'Long-Term Vision'
  },
  title: 'Building Reliability Into\nGroup Travel',
  description: "India's group travel market is massive, but it runs on unorganized systems. Wondrr is here to fix that by giving both operators and travelers better tools to work together.",
  commitment: {
    main: "We're building a platform designed to last.\nReliable, scalable, and transparent.",
    sub: 'Every trip. Every time.'
  },
  cta: {
    primary: {
      text: 'Explore Tours',
      link: '/trips'
    },
    secondary: {
      text: 'Contact Us',
      link: '/privacy-policy'
    }
  }
}

export const FOOTER = {
  brand: 'Wondrr',
  copyright: '© 2025 Wondrr. Building trust in group travel.'
}
