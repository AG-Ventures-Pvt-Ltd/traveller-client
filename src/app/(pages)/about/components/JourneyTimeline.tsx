'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'
import { JOURNEY } from '../constants'
import { fadeUp, stagger } from './_shared'

const STOP_COLORS = ['#D0EF65', '#FFC107', '#BFE3FF', '#FFB59E', '#D0EF65']

const JourneyTimeline = () => (
  <section className="relative overflow-hidden bg-[#F0F7FE] py-16 sm:py-24">
    {/* faint route grid */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, #111 1px, transparent 0)',
        backgroundSize: '28px 28px',
      }}
    />

    <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-900 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900">
          <span className="h-2 w-2 rounded-full bg-[#D0EF65]" />
          The route
        </span>
        <h2 className="max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl">
          {JOURNEY.heading}
        </h2>
        <p className="max-w-2xl text-base text-neutral-500 sm:text-lg">{JOURNEY.subheading}</p>
      </div>

      {/* Desktop dashed flight path behind the stops */}
      <div className="relative mt-14">
        <svg
          aria-hidden
          className="absolute left-0 top-[34px] hidden h-6 w-full lg:block"
          preserveAspectRatio="none"
          viewBox="0 0 1000 20"
        >
          <path
            d="M 30 10 L 970 10"
            fill="none"
            stroke="#111"
            strokeWidth="2.5"
            className="about-flightpath"
          />
        </svg>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.12)}
          className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
        >
          {JOURNEY.steps.map((step, i) => {
            const Icon = step.icon
            const color = STOP_COLORS[i % STOP_COLORS.length]
            return (
              <motion.li key={step.title} variants={fadeUp(0)} className="flex flex-col items-center gap-4 text-center">
                <div className="relative">
                  <span
                    className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 border-neutral-900 shadow-[4px_4px_0_0_#000]"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={28} className="text-neutral-900" />
                  </span>
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-neutral-900 bg-white text-sm font-black text-neutral-900">
                    {i + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 px-2">
                  <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{step.text}</p>
                </div>
              </motion.li>
            )
          })}
        </motion.ol>

        <Plane
          aria-hidden
          className="about-float mx-auto mt-12 h-7 w-7 rotate-90 text-neutral-900 lg:hidden"
        />
      </div>
    </div>
  </section>
)

export default JourneyTimeline
