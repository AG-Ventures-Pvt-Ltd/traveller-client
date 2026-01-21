'use client'
import React from 'react'
import OurTours from './components/OurTours'
import Footer from '../Footer/Footer'
import HeroSection from './components/HeroSection'
import ExploreSection from './components/ExploreSection'
import FAQSection from './components/FAQSection'
import CTASection from './components/CTASection'

const CONTENT = {
  hero: {
    badge: 'Explore',
    title: "Discover Scenic Routes &",
    subtitle: "Iconic Landscapes Across India",
    cta: 'Find Your Group Trip'
  },
  gallery: {
    badge: 'Our Tours',
    title: 'Find Your Perfect\nGroup Trip Experience',
    cta: 'See All Tours'
  },
  experience: {
    badge: 'Experience',
    title: 'With a love for nature and exploration,',
    subtitle: 'we create meaningful routes that inspire, connect, and stay forever in memory.',
    cta: 'See Our Gallery',
    question: 'Would you like to explore more routes or customize this trip for your group?'
  },
  guides: {
    title: 'Meet Your\nTour Guides',
    badges: ['5+ Years of Experience', 'Local Experts', 'Support', 'Certified Tours', 'Multilanguages', 'Safe Routes'],
    quote: {
      text: "Every trip is personal. We keep groups small to make sure your experience feels private, safe, and unforgettable.",
      author: "— Prataya, Founder, TORQ Industries"
    },
    cardTitle: 'Step inside a journey guided by passion and experience',
    cardDescription: 'Each tour is led by people who know every tour, story, and sunrise of India — guides who turn every route into a journey worth remembering.'
  },
  faq: {
    title: 'Everything you need to know ',
    subtitle: '- before booking your group trip.',
    questions: [
      {
        "question": "How do I book a group trip online?",
        "answer": "Select your preferred group trip, choose the dates, and complete the secure checkout. You’ll receive instant booking confirmation by email."
      },
      {
        "question": "What is included in the group trip cost?",
        "answer": "The trip cost usually includes transportation, accommodation if mentioned, experienced trip leaders, safety equipment, and meals or activities listed in the itinerary."
      },
      {
        "question": "What should I pack for a group tour?",
        "answer": "Carry comfortable clothing, sturdy footwear, basic travel essentials, and personal medications. A detailed packing list is shared after booking."
      },
      {
        "question": "Can I cancel or reschedule my booking?",
        "answer": "Yes. You can cancel or reschedule up to 7 days before departure for a full refund. Later cancellations follow our refund policy."
      },
      {
        "question": "Are group trips suitable for beginners?",
        "answer": "Yes. Our group trips are designed to be beginner-friendly, with experienced trip leaders guiding participants throughout the journey to ensure a safe and enjoyable experience."
      }
    ],
    helpCard: {
      text: 'Didn\'t find your answer?',
      answer: 'Our team is here to help — just reach out and we\'ll reply shortly.',
      cta: 'Contact Support'
    }
  },
  cta: {
    badge: 'Start now',
    title: 'Discover Your Next ',
    subtitle: 'Group Travel Escape',
    description: 'Plan and book verified group trips across India in just a few minutes.',
    button: 'Plan Your Group Trip'
  },
}


const LandingPage = () => {
  return (
    <main className="flex flex-col items-center">
      <div className="w-full px-[3%] md:px-[1%]">
        <HeroSection />
      </div>
      <div className='flex flex-col justify-center mx-[4%] md:mx-[6%]'>
        <ExploreSection content={CONTENT.hero} />
        <OurTours />
        <FAQSection content={CONTENT.faq} />
        <CTASection content={CONTENT.cta} />
      </div>
      <Footer />
    </main>
  )
}

export default LandingPage