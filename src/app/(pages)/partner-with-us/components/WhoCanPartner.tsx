'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { WHO } from '../constants'
import { SectionHead, fadeUp, stagger } from './_shared'

const WhoCanPartner = () => (
  <section className="relative mx-auto max-w-6xl px-5 pb-4 sm:px-8">
    <SectionHead eyebrow="Eligibility" title="Who can" highlight="partner with us" subtitle={WHO.subheading} align="center" />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={stagger(0.08)}
      className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4"
    >
      {WHO.types.map((t) => {
        const Icon = t.icon
        return (
          <motion.span
            key={t.label}
            variants={fadeUp(0)}
            className="inline-flex items-center gap-3 rounded-full border-2 border-neutral-900 bg-white py-2.5 pl-2.5 pr-5 shadow-[4px_4px_0_0_#111]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: t.color }}>
              <Icon size={18} className="text-neutral-900" />
            </span>
            <span className="text-sm font-semibold text-neutral-900 sm:text-base">{t.label}</span>
          </motion.span>
        )
      })}
    </motion.div>
  </section>
)

export default WhoCanPartner
