'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { STEPS } from '../constants'
import { SectionHead, fadeUp, stagger } from './_shared'

const STEP_COLORS = ['#D0EF65', '#FFC107', '#BFE3FF']

const PartnerSteps = () => (
  <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
    <SectionHead eyebrow="Getting started" title="How to become a" highlight="partner" subtitle={STEPS.subheading} align="center" />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
      variants={stagger(0.12)}
      className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3"
    >
      {STEPS.items.map((s, i) => {
        const Icon = s.icon
        return (
          <motion.div key={s.title} variants={fadeUp(0)} className="relative flex">
            <div className="flex flex-1 flex-col gap-4 rounded-3xl border-2 border-neutral-900 bg-white p-6 shadow-[6px_6px_0_0_#111]">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-neutral-900 text-lg font-bold text-neutral-900"
                  style={{ backgroundColor: STEP_COLORS[i % STEP_COLORS.length] }}
                >
                  {i + 1}
                </span>
                <Icon size={24} className="text-neutral-900" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{s.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-600">{s.text}</p>
            </div>
            {i < STEPS.items.length - 1 && (
              <ArrowRight
                aria-hidden
                className="absolute -right-4 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 text-neutral-400 md:block"
              />
            )}
          </motion.div>
        )
      })}
    </motion.div>
  </section>
)

export default PartnerSteps
