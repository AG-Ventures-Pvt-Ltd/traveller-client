'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, BarChart3, CalendarCheck, Check, Wallet } from 'lucide-react'
import { HERO, PARTNER_URL } from '../constants'
import { GridDecor, fadeUp, stagger } from './_shared'

/** Stylised operator dashboard — illustrative UI, no real metrics. */
const DashboardMock = () => (
  <div className="relative w-full max-w-md">
    {/* floating chips */}
    <div className="absolute -left-3 top-10 z-20 hidden items-center gap-2 rounded-full border-2 border-neutral-900 bg-white px-3 py-1.5 shadow-[3px_3px_0_0_#111] sm:flex">
      <BadgeCheck size={16} className="text-neutral-900" />
      <span className="text-xs font-bold text-neutral-900">Verified operator</span>
    </div>
    <div className="absolute -right-2 bottom-16 z-20 hidden items-center gap-2 rounded-full border-2 border-neutral-900 bg-[#D0EF65] px-3 py-1.5 shadow-[3px_3px_0_0_#111] sm:flex">
      <span className="h-2 w-2 rounded-full bg-neutral-900" />
      <span className="text-xs font-bold text-neutral-900">New booking</span>
    </div>

    {/* dashboard card */}
    <div className="relative z-10 overflow-hidden rounded-3xl border-2 border-neutral-900 bg-white shadow-[10px_10px_0_0_#111]">
      <div className="flex items-center justify-between border-b-2 border-neutral-900 bg-[#FFF9F4] px-5 py-3">
        <span className="text-sm font-bold text-neutral-900">Operator dashboard</span>
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFC107]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D0EF65]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#BFE3FF]" />
        </span>
      </div>

      <div className="flex flex-col gap-4 p-5">
        {/* metric tiles */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-neutral-200 bg-[#F0F7FE] p-3">
            <div className="flex items-center gap-2 text-neutral-700">
              <CalendarCheck size={16} />
              <span className="text-xs font-semibold">Bookings</span>
            </div>
            <div className="mt-3 flex items-end gap-1" aria-hidden>
              {[10, 16, 12, 22, 18, 26].map((h, i) => (
                <span key={i} className="w-2.5 rounded-sm bg-neutral-900" style={{ height: h }} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-[#EDF7D6] p-3">
            <div className="flex items-center gap-2 text-neutral-700">
              <Wallet size={16} />
              <span className="text-xs font-semibold">Payouts</span>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-neutral-900 bg-white px-2 py-0.5 text-xs font-bold text-neutral-900">
              <Check size={11} strokeWidth={3} /> On time
            </span>
          </div>
        </div>

        {/* booking row */}
        <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFC107] text-sm font-bold text-neutral-900">W</span>
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-bold text-neutral-900">Spiti — Batch 04</span>
            <span className="text-xs text-neutral-500">Seats filling up</span>
          </div>
          <span className="rounded-full bg-[#D0EF65] px-2.5 py-1 text-xs font-bold text-neutral-900">Confirmed</span>
        </div>

        {/* insight bar */}
        <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3">
          <BarChart3 size={18} className="text-neutral-900" />
          <span className="text-sm font-semibold text-neutral-700">Performance insights</span>
          <span className="ml-auto h-2 w-20 overflow-hidden rounded-full bg-neutral-200">
            <span className="block h-full w-3/4 rounded-full bg-neutral-900" />
          </span>
        </div>
      </div>
    </div>
  </div>
)

const PartnerHero = () => (
  <section className="relative overflow-hidden rounded-[32px] bg-[#FFF9F4] px-5 py-14 sm:px-10 sm:pt-8 sm:pb-8">
    <GridDecor opacity={0.4} />

    <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div initial="hidden" animate="visible" variants={stagger(0.12)} className="flex flex-col gap-6">
        <motion.span
          variants={fadeUp(0)}
          className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500"
        >
          <span className="h-3 w-6 rounded-full bg-[#FFC107]" />
          {HERO.eyebrow}
        </motion.span>

        <motion.h1
          variants={fadeUp(0.08)}
          className="text-4xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl"
        >
          {HERO.headlinePre}{' '}
          <span className="rounded-2xl bg-[#D0EF65] px-3 py-0.5">{HERO.headlineHighlight}</span>
        </motion.h1>

        <motion.p variants={fadeUp(0.16)} className="max-w-xl text-base text-neutral-600 sm:text-lg">
          {HERO.lede}
        </motion.p>

        <motion.div variants={fadeUp(0.24)} className="flex flex-wrap gap-x-5 gap-y-2">
          {HERO.trustline.map((t) => (
            <span key={t} className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700">
              <Check size={16} className="text-neutral-900" strokeWidth={3} />
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp(0.32)} className="mt-1">
          <a
            href={PARTNER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-2xl border-2 border-neutral-900 bg-neutral-900 px-6 py-3.5 text-base font-bold text-white shadow-[5px_5px_0_0_#FFC107] transition-all hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#FFC107]"
          >
            {HERO.cta}
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="flex justify-center lg:justify-end"
      >
        <DashboardMock />
      </motion.div>
    </div>
  </section>
)

export default PartnerHero
