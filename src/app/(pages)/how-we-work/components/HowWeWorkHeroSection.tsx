'use client'
import React from 'react'
import Image from 'next/image'
import { MousePointerClick } from 'lucide-react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
})

const HowWeWorkHeroSection = () => {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[75vh] overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Mobile Layout */}
      <div className="md:hidden relative h-full min-h-[600px] flex flex-col px-6 py-12">
        {/* Badge */}
        <motion.div className="inline-flex self-start mb-8" {...fadeUp(0.1)}>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-white text-xs font-semibold">How It Works</span>
          </div>
        </motion.div>

        {/* Content */}
        <header className="flex flex-col gap-6 flex-1">
          <motion.h1 className="text-white text-5xl font-medium leading-[1.15]" {...fadeUp(0.25)}>
            How Booking a<br />Group Trip Works
          </motion.h1>

          <motion.p className="text-neutral-300 text-base font-medium leading-relaxed" {...fadeUp(0.4)}>
            Discover, compare, and book verified group trips across India in a few simple steps.
          </motion.p>
        </header>

        {/* Decorative Element */}
        <motion.div className="mt-auto" {...fadeUp(0.55)}>
          <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <MousePointerClick size={24} className="text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">Simple & Transparent</p>
              <p className="text-neutral-400 text-xs font-medium">Book with confidence</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center min-h-[75vh] px-12 lg:px-16 py-16">
        <div className="max-w-[1520px] mx-auto w-full grid grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.header className="flex flex-col gap-8" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}>
            <motion.div className="inline-flex self-start" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }}>
              <div className="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-white text-sm font-semibold">How It Works</span>
              </div>
            </motion.div>

            <motion.h1 className="text-white text-6xl lg:text-7xl font-medium leading-[1.1]" variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } }}>
              How Booking a<br />Group Trip<br />
              <span className="text-neutral-400">Works</span>
            </motion.h1>

            <motion.p className="text-neutral-300 text-xl font-medium leading-relaxed max-w-lg" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }}>
              Discover, compare, and book verified group trips across India in a few simple steps.
            </motion.p>

            {/* Info Cards */}
            <motion.div className="flex gap-4 pt-4" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
              <div className="flex items-center gap-3 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex-1">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <MousePointerClick size={24} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Simple Process</p>
                  <p className="text-neutral-400 text-xs font-medium">Easy booking</p>
                </div>
              </div>
            </motion.div>
          </motion.header>

          {/* Right - Visual Element */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="/png/S23.jpg"
              alt="Discover and book group trips across India"
              fill
              className="object-cover"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl">
              <p className="text-neutral-900 text-lg font-bold">Quick & Easy Booking</p>
              <p className="text-neutral-600 text-sm font-medium mt-1">Start your journey in minutes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWeWorkHeroSection
