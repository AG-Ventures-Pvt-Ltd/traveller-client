'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TOOLS } from '../constants'
import { GridDecor, SectionHead, fadeUp, stagger } from './_shared'

const TILE_COLORS = ['#D0EF65', '#FFC107', '#BFE3FF', '#FFE3DA', '#EDF7D6', '#F0F7FE']

const PartnerTools = () => (
  <section className="relative overflow-hidden rounded-[32px] bg-[#F0F7FE] py-16 sm:py-20">
    <GridDecor opacity={0.5} />

    <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHead eyebrow="Operator tools" title="Run everything from" highlight="one dashboard" highlightColor="#FFC107" subtitle={TOOLS.subheading} align="center" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-70px' }}
        variants={stagger(0.08)}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TOOLS.items.map((t, i) => {
          const Icon = t.icon
          return (
            <motion.div
              key={t.title}
              variants={fadeUp(0)}
              className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_6px_24px_rgba(17,17,17,0.05)] transition-transform hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: TILE_COLORS[i % TILE_COLORS.length] }}>
                <Icon size={24} className="text-neutral-900" />
              </span>
              <h3 className="text-lg font-semibold text-neutral-900">{t.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-600">{t.text}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  </section>
)

export default PartnerTools
