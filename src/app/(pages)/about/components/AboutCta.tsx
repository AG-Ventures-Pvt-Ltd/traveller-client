'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ABOUT_CTA } from '../constants'
import { ScatterIcons } from './_shared'

const AboutCta = () => (
  <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[32px] border-2 border-neutral-900 bg-[#D0EF65] px-6 py-14 text-center shadow-[10px_10px_0_0_#111] sm:px-10 sm:py-16"
    >
      <ScatterIcons opacity={0.08} />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5">
        <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl">
          {ABOUT_CTA.heading}
        </h2>
        <p className="max-w-xl text-base font-medium text-neutral-800 sm:text-lg">{ABOUT_CTA.subheading}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link
            href={ABOUT_CTA.primary.link}
            className="group inline-flex items-center gap-2 rounded-2xl border-2 border-neutral-900 bg-neutral-900 px-6 py-3.5 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#fff]"
          >
            {ABOUT_CTA.primary.text}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={ABOUT_CTA.secondary.link}
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-neutral-900 bg-white px-6 py-3.5 text-base font-bold text-neutral-900 transition-all hover:-translate-y-0.5"
          >
            {ABOUT_CTA.secondary.text}
          </Link>
        </div>
      </div>
    </motion.div>
  </section>
)

export default AboutCta
