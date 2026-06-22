'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'
import { ABOUT_HERO } from '../constants'
import { ScatterIcons, fadeUp, stagger } from './_shared'

const AboutHero = () => {
  const t = ABOUT_HERO.ticket

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-[#FFF9F4] px-5 pt-14 pb-12 sm:px-8 sm:pt-10 sm:pb-12 lg:px-14">
      <ScatterIcons opacity={0.06} />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <motion.div initial="hidden" animate="visible" variants={stagger(0.12)} className="flex flex-col gap-6">
          <motion.span
            variants={fadeUp(0)}
            className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-neutral-900 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900"
          >
            <span className="h-2 w-2 rounded-full bg-[#D0EF65]" />
            {ABOUT_HERO.eyebrow}
          </motion.span>

          <motion.h1
            variants={fadeUp(0.08)}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl"
          >
            {ABOUT_HERO.headlinePre}{' '}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 z-0 h-[14px] rounded-sm bg-[#D0EF65] sm:h-[18px]" />
              <span className="relative z-10">{ABOUT_HERO.headlineHighlight}</span>
            </span>{' '}
            {ABOUT_HERO.headlinePost}
          </motion.h1>

          <motion.p variants={fadeUp(0.16)} className="max-w-xl text-base text-neutral-600 sm:text-lg">
            {ABOUT_HERO.lede}
          </motion.p>

          <motion.div variants={fadeUp(0.24)} className="flex flex-wrap gap-2.5">
            {ABOUT_HERO.chips.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-900 bg-white px-3.5 py-1.5 text-sm font-semibold text-neutral-800"
              >
                <Icon size={16} className="text-neutral-900" />
                {text}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Boarding-pass identity card */}
        <motion.div
          initial={{ opacity: 0, y: 36, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="overflow-hidden rounded-[26px] border-2 border-neutral-900 bg-white shadow-[10px_10px_0_0_#111]">
            {/* Header */}
            <div className="flex items-center justify-between bg-[#D0EF65] px-6 py-4">
              <span className="text-xl font-bold tracking-tight text-neutral-900">{t.brand}</span>
              <span className="rounded-full border-2 border-neutral-900 bg-white px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-neutral-900">
                Boarding Pass
              </span>
            </div>
            <p className="border-b-2 border-dashed border-neutral-300 px-6 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {t.kind}
            </p>

            {/* Route */}
            <div className="flex items-center justify-between px-6 py-5">
              <div className="text-left">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">From</p>
                <p className="text-2xl font-bold tracking-tight text-neutral-900">{t.from}</p>
              </div>
              <div className="mx-3 flex flex-1 items-center">
                <span className="h-2 w-2 rounded-full bg-neutral-900" />
                <span className="h-[2px] flex-1 bg-[repeating-linear-gradient(90deg,#111_0_6px,transparent_6px_12px)]" />
                <Plane size={20} className="-rotate-0 text-neutral-900" />
                <span className="h-[2px] flex-1 bg-[repeating-linear-gradient(90deg,#111_0_6px,transparent_6px_12px)]" />
                <span className="h-2 w-2 rounded-full bg-[#FFC107] ring-2 ring-neutral-900" />
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">To</p>
                <p className="text-2xl font-bold tracking-tight text-neutral-900">{t.to}</p>
              </div>
            </div>

            {/* Detail rows */}
            <div className="grid grid-cols-3 gap-px border-y-2 border-neutral-900 bg-neutral-900">
              {t.rows.map((r) => (
                <div key={r.label} className="bg-white px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{r.label}</p>
                  <p className="text-sm font-semibold text-neutral-900">{r.value}</p>
                </div>
              ))}
            </div>

            {/* Perforation + barcode */}
            <div className="relative flex items-center justify-between bg-white px-6 py-5">
              <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-neutral-900 bg-[#FFF9F4]" />
              <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-neutral-900 bg-[#FFF9F4]" />
              <div className="flex h-9 items-end gap-[3px]" aria-hidden>
                {[3, 6, 2, 8, 4, 5, 9, 3, 7, 2, 6, 4, 8, 3, 5, 7, 2, 9, 4, 6].map((h, i) => (
                  <span key={i} className="w-[3px] bg-neutral-900" style={{ height: `${h * 3 + 6}px` }} />
                ))}
              </div>
              <span className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-[#D0EF65]">
                {t.gate}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutHero
