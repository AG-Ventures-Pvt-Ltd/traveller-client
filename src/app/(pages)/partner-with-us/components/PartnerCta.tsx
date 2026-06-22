'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { CTA, PARTNER_URL } from '../constants'
import { GridDecor } from './_shared'

const PartnerCta = () => (
  <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[32px] bg-[#FFC107] px-6 py-12 text-center shadow-[0_10px_40px_rgba(17,17,17,0.08)] sm:px-12 sm:py-14"
    >
      <GridDecor opacity={0.35} />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5">
        <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl">{CTA.heading}</h2>
        <p className="max-w-xl text-base font-medium text-neutral-800 sm:text-lg">{CTA.subheading}</p>
        <a
          href={PARTNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-2 inline-flex items-center gap-2 rounded-2xl bg-neutral-900 px-7 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5"
        >
          {CTA.button}
          <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  </section>
)

export default PartnerCta
