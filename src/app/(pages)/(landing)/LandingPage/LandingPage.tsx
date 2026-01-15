'use client'
import React, { useState } from 'react'
import MyImage from '@/common/ui/Image'
import { ArrowUpRight, CarTaxiFront, Shield, ShieldCheck } from 'lucide-react'
import OurTours from './components/OurTours'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Footer from '../Footer/Footer'
// Constants
const CONTENT = {
  hero: {
    badge: 'Explore',
    title: "Discover beautiful routes and scenic spots",
    subtitle: "across India's natural landscapes.",
    cta: 'Start your trip'
  },
  gallery: {
    badge: 'Our Tours',
    title: 'Find your perfect\nwondrr experience',
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
    title: 'Everything you need to know before your',
    subtitle: 'journey — from booking to what to pack.',
    questions: [
      {
        question: 'How do I book a tour?',
        answer: 'You can book a tour directly through our website by selecting your preferred trip, choosing dates, and completing the secure payment process. You\'ll receive instant confirmation via email.'
      },
      {
        question: 'What is included in the tour price?',
        answer: 'All our tours include transportation, experienced guides, safety equipment, and specified meals. Accommodation and activities mentioned in the itinerary are also covered.'
      },
      {
        question: 'What should I pack for the trip?',
        answer: 'We recommend comfortable clothing, sturdy footwear, sunscreen, a water bottle, and any personal medications. A detailed packing list will be sent upon booking confirmation.'
      },
      {
        question: 'Can I cancel or reschedule my booking?',
        answer: 'Yes, you can cancel or reschedule up to 7 days before the trip for a full refund. Cancellations within 7 days are subject to our refund policy terms.'
      },
      {
        question: 'Are your tours suitable for beginners?',
        answer: 'Absolutely! We offer tours for all experience levels. Each tour listing clearly indicates the difficulty level, and our guides adapt to ensure everyone has a safe and enjoyable experience.'
      }
    ],
    helpCard: {
      text: 'Didn\'t see your question?',
      answer: 'Our team is here to help — just reach out and we\'ll reply shortly.',
      cta: 'Contact Support'
    }
  },
  cta: {
    badge: 'Start now',
    title: 'Discover your',
    subtitle: 'next perfect escape',
    description: 'Plan your trip in minutes and enjoy every moment of your escape.',
    button: 'Plan Your Trip'
  },
  footer: {
    tagline: 'Building trust in group travel.',
    sections: [
      {
        title: 'Explore',
        links: [
          { label: 'Trips', href: '/trips' },
          { label: 'About Us', href: '/about' }
        ]
      },
      {
        title: 'Company',
        links: [
          { label: 'Partner With Us', href: 'https://partner.wondrr.in/auth?mode=signup' },
          { label: 'Contact', href: '/contact' }
        ]
      },
      {
        title: 'Support',
        links: [
          { label: 'Privacy Policy', href: '/privacy-policy' },
          { label: 'Refund Policy', href: '/terms' }
        ]
      }
    ],
    social: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn'],
    copyright: '© 2026 Wondrr. All rights reserved.'
  }
}


const LandingPage = () => {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index)
  }

  const router = useRouter()

  return (
    <div className="flex flex-col items-center">

      <div className="w-full px-[1%]">
        <section className="relative w-full min-h-[691px] md:min-h-[88vh] flex flex-col justify-end px-6 md:px-9 py-12 md:pt-16 md:pb-6 gap-10 overflow-hidden rounded-3xl">
          <Image
            src="/png/MainBG.jpg"
            alt="Hero background"
            fill
            className="absolute inset-0 w-full h-full object-cover -z-10"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/0 via-neutral-900/0 to-neutral-900/80 md:from-black/30 md:to-black/50 -z-10" />
          <div className="md:hidden flex flex-col justify-end items-start gap-10">
            <div className="flex flex-col justify-start items-start gap-10">
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-neutral-50/90 text-6xl font-normal leading-[66px]">
                  Explore<br />the Best<br />Natural Places
                </h1>
              </div>
              <div className="relative">
                <p className="text-white text-base font-medium leading-5">
                  We organize scenic tours, photo stops, and guided routes to the most beautiful natural spots, with clear schedules, and simple booking.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-6 w-full">
              <div className="w-40 h-px bg-white/30" />
              <div className="flex flex-col gap-3">
                <div className="px-4 py-3 bg-white/10 rounded-full backdrop-blur-[5px] inline-flex justify-center items-center gap-1.5">
                  <ShieldCheck size={16} className="text-neutral-50/90" />
                  <span className="text-white text-sm font-medium">Private Trips</span>
                </div>
                <div className="px-4 py-3 bg-white/10 rounded-full backdrop-blur-[5px] inline-flex justify-center items-center gap-1.5">
                  <CarTaxiFront size={16} className="text-neutral-50/90" />
                  <span className="text-white text-sm font-medium">Transport Included</span>
                </div>
                <div className="px-4 py-3 bg-white/10 rounded-full backdrop-blur-[5px] inline-flex justify-center items-center gap-1.5">
                  <Shield size={16} className="text-neutral-50/90" />
                  <span className="text-white text-sm font-medium">Custom Route</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-col gap-10">
            <div className="flex justify-between items-end gap-16 max-w-[1520px] w-full mx-auto">
              <div className="max-w-[700px]">
                <h1 className="text-neutral-50/90 text-8xl font-normal leading-[1.1]">
                  Explore the Best<br />Places in India
                </h1>
              </div>
              <div className="max-w-80">
                <p className="text-white text-base font-medium text-right">
                  We organize scenic tours, photo stops, and guided routes to the most beautiful natural spots, with clear schedules, and simple booking.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center gap-16 max-w-[1520px] w-full mx-auto">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-neutral-50/90 text-base font-bold">10+ Destinations</p>
                  <p className="text-neutral-50/90 text-base font-bold">Included</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="px-4 py-2.5 bg-white/10 rounded-full backdrop-blur-sm flex items-center gap-1.5 text-white">
                  <ShieldCheck size={16} />
                  <span className="text-white text-sm font-medium">Verified Partners</span>
                </div>
                <div className="px-4 py-2.5 bg-white/10 rounded-full backdrop-blur-sm flex items-center gap-1.5 text-white">
                  <CarTaxiFront size={16} />
                  <span className="text-white text-sm font-medium">Transport Included</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className='flex flex-col justify-center mx-[4%] md:mx-[6%]'>
        <section className="md:hidden w-full max-w-[1520px] px-5 py-12 flex flex-col justify-center items-center gap-8">
          <div className="w-full flex flex-col justify-center items-start gap-6">
            <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex justify-center items-center">
              <span className="text-neutral-900 text-sm font-medium">{CONTENT.hero.badge}</span>
            </div>
            <div className="w-full max-w-[500px] flex flex-col justify-start items-start">
              <h1 className="text-xl font-medium leading-7">
                <span className="text-neutral-900">{CONTENT.hero.title}<br />spots </span>
                <span className="text-neutral-700">{CONTENT.hero.subtitle}</span>
              </h1>
            </div>
            <div className="pt-px inline-flex justify-center items-center">
              <button className="px-7 py-3 bg-neutral-900 rounded-full">
                <span className="text-white text-sm font-semibold">{CONTENT.hero.cta}</span>
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-2">
            <div className="w-full h-72 p-6 relative rounded-3xl flex flex-col justify-center items-center overflow-hidden group">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/png/S22.jpg"
                  alt="Trip moments"
                  width={353}
                  height={292}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30 rounded-3xl" />
              </div>
              <div className="w-full flex-1 flex flex-col justify-end items-start relative z-10">
                <div className="w-full inline-flex justify-between items-end gap-10">
                  <div className="flex-1">
                    <p className="text-white text-xl font-semibold leading-7">
                      See real moments<br />from our trips.
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                    <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-72 flex flex-col justify-start items-center gap-3">
              <div className="w-full flex-1 p-6 relative rounded-3xl flex flex-col justify-start items-end overflow-hidden group">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/png/S23.jpg"
                      alt="Nature path"
                      fill
                      className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                      quality={100}
                    />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/0 rounded-3xl" />
                </div>
                <div className="px-4 py-2 relative rounded-full inline-flex justify-center items-center border border-white z-10">
                  <span className="text-white text-sm font-medium">Nature Path</span>
                </div>
              </div>
              <div className="w-full">
                <p className="text-neutral-700 text-lg font-medium leading-6">
                  Every route reveals new perspectives — from golden dunes to quiet valleys waiting to be explored.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="hidden md:flex items-center justify-between gap-16 px-9 py-24 w-full">
          <div className="flex flex-col gap-6 flex-1">
            <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start">
              <span className="text-neutral-900 text-sm font-medium">{CONTENT.hero.badge}</span>
            </div>

            <h1 className="text-3xl font-medium leading-tight">
              <span className="text-neutral-900">{CONTENT.hero.title} </span>
              <span className="text-neutral-700">{CONTENT.hero.subtitle}</span>
            </h1>

            <div className="flex items-center gap-2">
              <button className="px-6 py-3 bg-neutral-900 text-white rounded-full font-bold hover:bg-neutral-800 hover:scale-105 transition-transform cursor-pointer" onClick={() => router.push('/trips')}>
                {CONTENT.hero.cta}
              </button>
              <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white">
                <ArrowUpRight />
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-2">
            <div className="flex flex-col gap-3 flex-[1]">
              <div className="relative p-6 bg-cover bg-center rounded-3xl overflow-hidden min-h-[292px] group">
                <Image
                  src="/png/S22.jpg"
                  alt="Trip moments"
                  width={400}
                  height={488}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/32 rounded-3xl" />
                <div className="relative flex flex-col justify-end h-full gap-4">
                  <p className="text-white text-lg font-bold">
                    See real moments<br />from our trips.
                  </p>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center self-end">
                    <ArrowUpRight />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <div className="relative p-6 bg-cover bg-center rounded-3xl overflow-hidden flex-1 group">
                <Image
                  src="/png/S23.jpg"
                  alt="Nature path"
                  fill
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/32 to-transparent rounded-3xl" />
                <div className="relative">
                  <div className="px-4 py-2 border border-white rounded-full inline-flex">
                    <span className="text-white text-sm font-medium">Nature Path</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-neutral-700 text-base font-medium">
                  Every route reveals new perspectives — from golden dunes to quiet valleys waiting to be explored.
                </p>
              </div>
            </div>
          </div>
        </section>

        <OurTours />

        {/* <section className="flex gap-16 px-9 py-24 w-full">
          <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start h-fit">
            <span className="text-neutral-900 text-sm font-medium">{CONTENT.experience.badge}</span>
          </div>

          <div className="flex flex-col gap-10 flex-1">
            <h2 className="text-5xl font-medium leading-tight">
              <span className="text-neutral-900">{CONTENT.experience.title} </span>
              <span className="text-neutral-700">{CONTENT.experience.subtitle}</span>
            </h2>

            <div className="flex gap-2">
              <div className="flex-1 rounded-3xl overflow-hidden">
                <MyImage width={423} height={253} src="https://placehold.co/423x253" alt="Experience 1" className="w-full h-64 object-cover" />
              </div>
              <div className="flex-1 rounded-3xl overflow-hidden">
                <MyImage width={423} height={253} src="https://placehold.co/423x253" alt="Experience 2" className="w-full h-64 object-cover" />
              </div>
              <div className="flex-1 rounded-3xl overflow-hidden">
                <MyImage width={423} height={253} src="https://placehold.co/423x253" alt="Experience 3" className="w-full h-64 object-cover" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-neutral-900 text-lg font-medium max-w-xs">
                {CONTENT.experience.question}
              </p>

              <div className="flex items-center gap-2">
                <button className="px-6 py-3 bg-neutral-900 text-white rounded-full font-bold">
                  {CONTENT.experience.cta}
                </button>
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center">
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section className="flex gap-16 px-9 py-24 w-full">
          <div className="flex flex-col gap-10 flex-1">
            <div className="flex flex-wrap gap-2">
              {CONTENT.guides.badges.map((badge, idx) => (
                <div key={idx} className="px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center gap-2">
                  <span className="text-neutral-700 text-base font-bold">{badge}</span>
                </div>
              ))}
            </div>
            <div className="p-6 bg-neutral-50 rounded-3xl flex gap-6">
              <div className="flex-1 rounded-2xl overflow-hidden">
                <MyImage width={310} height={304} src="https://placehold.co/310x304" alt="Guide experience" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-neutral-900 text-xl font-bold mb-4">
                    {CONTENT.guides.cardTitle}
                  </h3>
                  <p className="text-neutral-700 text-base font-medium">
                    {CONTENT.guides.cardDescription}
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9 flex-1">
            <h2 className="text-6xl font-medium leading-tight text-neutral-900">
              {CONTENT.guides.title}
            </h2>
            <div className="flex gap-8">
              <div className="flex-1 rounded-2xl overflow-hidden">
                <MyImage width={330} height={313} src="https://placehold.co/330x313" alt="Tour guide" className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start">
                  <span className="text-neutral-900 text-sm font-medium">POC</span>
                </div>
                <div>
                  <p className="text-neutral-900 text-lg font-medium mb-2">
                    {CONTENT.guides.quote.text}
                  </p>
                  <p className="text-neutral-700 text-base font-medium">
                    {CONTENT.guides.quote.author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="flex flex-col gap-8 md:gap-16 px-5 md:px-9 py-12 md:py-24 w-full">
          <div className='flex flex-col md:flex-row gap-4'>
            <div className="px-4 py-2 bg-zinc-100 rounded-full inline-flex items-center self-start">
              <span className="text-neutral-900 text-sm font-medium">FAQ</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium w-full md:w-[60%]">
              <span className="text-neutral-900">{CONTENT.faq.title} </span>
              <span className="text-neutral-700">{CONTENT.faq.subtitle}</span>
            </h2>
          </div>
          <div className='flex flex-col lg:flex-row gap-8 md:gap-16'>
            <div className="flex flex-col gap-6 md:gap-10 flex-1 order-1 lg:order-2">
              <div className="flex flex-col gap-3 md:gap-4">
                {CONTENT.faq.questions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 md:p-6 bg-neutral-50 rounded-2xl md:rounded-3xl cursor-pointer hover:bg-neutral-100 transition-colors"
                    onClick={() => toggleFaq(idx)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-neutral-900 text-base md:text-lg font-bold">
                        {item.question}
                      </h3>
                      <div className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0 transition-transform ${expandedFaqIndex === idx ? 'rotate-180' : ''
                        }`}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    {expandedFaqIndex === idx && (
                      <p className="text-neutral-700 text-sm md:text-base font-medium mt-3">
                        {item.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full lg:max-w-md order-2 lg:order-1">
              <div className="relative p-6 md:p-8 bg-cover bg-center rounded-2xl md:rounded-3xl overflow-hidden min-h-[300px] md:min-h-[450px] flex flex-col justify-end cursor-pointer transition-transform group">
                <Image
                  src="/png/S31.jpg"
                  alt="Contact support background"
                  width={400}
                  height={450}
                  className="absolute inset-0 w-full h-full object-cover -z-10 transition-transform duration-300 group-hover:scale-105"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-2xl md:rounded-3xl" />
                <div className="relative flex flex-col">
                  <p className="text-white text-lg md:text-xl font-semibold leading-tight">
                    {CONTENT.faq.helpCard.text}
                  </p>
                  <p className='mb-4 text-white text-sm md:text-base'>{CONTENT.faq.helpCard.answer}</p>
                  <button className="px-4 md:px-6 py-2.5 md:py-3 bg-white text-neutral-900 rounded-full font-bold self-start hover:bg-neutral-100 hover:scale-105 transition-transform cursor-pointer text-sm md:text-base">
                    {CONTENT.faq.helpCard.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-10 py-12 md:py-24 bg-neutral-50 rounded-2xl md:rounded-3xl flex flex-col lg:flex-row gap-8 md:gap-10 w-full">
          <div className="flex flex-col justify-between flex-1 gap-6 md:gap-0">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="px-4 py-2 bg-zinc-100 rounded-full inline-flex items-center self-start">
                <span className="text-neutral-900 text-sm font-medium">{CONTENT.cta.badge}</span>
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                  <span className="text-neutral-900">{CONTENT.cta.title} </span>
                  <span className="text-neutral-700">{CONTENT.cta.subtitle}</span>
                </h2>
                <p className="text-neutral-700 text-base md:text-lg font-medium">
                  {CONTENT.cta.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-16">
              <button className="px-4 md:px-6 py-2.5 md:py-3 bg-neutral-900 text-white rounded-full font-bold hover:bg-neutral-800 hover:scale-105 transition-transform cursor-pointer text-sm md:text-base">
                {CONTENT.cta.button}
              </button>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-900 rounded-full flex items-center justify-center">
                <ArrowUpRight className='text-white' />
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-1">
            <div className="rounded-2xl md:rounded-3xl overflow-hidden flex-1">
              <Image width={370} height={378} src="/png/S42.jpg" alt="CTA 1" className="w-full h-full object-cover min-h-[250px] md:min-h-0" quality={90} />
            </div>
            <div className="hidden md:block rounded-3xl overflow-hidden flex-1">
              <Image width={370} height={315} src="/png/S41.jpg" alt="CTA 2" className="w-full h-full object-cover" quality={90} />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default LandingPage