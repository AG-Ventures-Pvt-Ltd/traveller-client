'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { WHY } from '../constants'
import { SectionHead, fadeUp, stagger } from './_shared'

const WhyPartner = () => (
  <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
    <SectionHead eyebrow="Why partner" title="Why operators choose" highlight="Wondrr" subtitle={WHY.subheading} align="center" />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
      variants={stagger(0.09)}
      className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {WHY.benefits.map((b) => {
        const Icon = b.icon
        return (
          <motion.div
            key={b.title}
            variants={fadeUp(0)}
            className="flex flex-col gap-4 rounded-3xl border-2 border-neutral-900 bg-white p-6 shadow-[6px_6px_0_0_#111] transition-transform hover:-translate-y-1"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-neutral-900" style={{ backgroundColor: b.color }}>
              <Icon size={24} className="text-neutral-900" />
            </span>
            <h3 className="text-lg font-semibold text-neutral-900">{b.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-600">{b.text}</p>
          </motion.div>
        )
      })}
    </motion.div>
  </section>
)

export default WhyPartner
