'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { TWO_SIDES } from '../constants'
import { SectionHead, fadeUp, stagger } from './_shared'

const TwoSides = () => (
  <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
    <SectionHead title={TWO_SIDES.heading} subtitle={TWO_SIDES.subheading} align="center" />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger(0.12)}
      className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
      {TWO_SIDES.cards.map((card) => {
        const Icon = card.icon
        return (
          <motion.article
            key={card.key}
            variants={fadeUp(0)}
            className="flex flex-col overflow-hidden rounded-[28px] border-2 border-neutral-900 bg-white shadow-[8px_8px_0_0_#111]"
          >
            {/* Colored header band */}
            <div className="flex items-center gap-4 border-b-2 border-neutral-900 p-6" style={{ backgroundColor: card.accent }}>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-neutral-900 bg-white">
                <Icon size={26} className="text-neutral-900" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 sm:text-2xl">{card.title}</h3>
                <p className="text-sm font-semibold text-neutral-800">{card.tagline}</p>
              </div>
            </div>

            {/* Feature list */}
            <ul className="flex flex-1 flex-col gap-2.5 p-6">
              {card.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-neutral-900"
                    style={{ backgroundColor: card.accent }}
                  >
                    <Check size={12} className="text-neutral-900" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-neutral-700 sm:text-base">{f}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        )
      })}
    </motion.div>
  </section>
)

export default TwoSides
