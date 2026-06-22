'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { STATS } from '../constants'
import { SectionHead, fadeUp, stagger, useCountUp } from './_shared'

const StatNumber = ({
  value,
  prefix,
  suffix,
}: {
  value: number
  prefix?: string
  suffix?: string
}) => {
  const { ref, value: n } = useCountUp(value)
  return (
    <span ref={ref} className="text-5xl font-bold leading-none tracking-tight text-neutral-900 sm:text-6xl">
      {prefix}
      {n}
      {suffix}
    </span>
  )
}

const StatStrip = () => (
  <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
    <SectionHead title={STATS.heading} subtitle={STATS.subheading} align="center" />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger(0.1)}
      className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
    >
      {STATS.items.map((s, i) => {
        const Icon = s.icon
        return (
          <motion.div
            key={i}
            variants={fadeUp(0)}
            className="group relative overflow-hidden rounded-3xl border-2 border-neutral-900 bg-white p-5 shadow-[6px_6px_0_0_#111] transition-transform hover:-translate-y-1 sm:p-6"
          >
            <span
              className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-90 transition-transform group-hover:scale-125"
              style={{ backgroundColor: s.color }}
            />
            <Icon className="relative z-10 mb-4 h-8 w-8 text-neutral-900" />
            <div className="relative z-10">
              {'value' in s && typeof s.value === 'number' ? (
                <StatNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
              ) : (
                <span className="text-4xl font-bold leading-none tracking-tight text-neutral-900 sm:text-5xl">
                  {s.text}
                </span>
              )}
            </div>
            <p className="relative z-10 mt-2 text-sm font-semibold text-neutral-600">{s.label}</p>
          </motion.div>
        )
      })}
    </motion.div>
  </section>
)

export default StatStrip
