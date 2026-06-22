'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { MISSION_SPLIT } from '../constants'
import { SectionHead, fadeUp, stagger } from './_shared'

const MissionSplit = () => {
  const { does, doesnt } = MISSION_SPLIT

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHead title={MISSION_SPLIT.heading} subtitle={MISSION_SPLIT.subheading} align="center" />

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* DOES — lime */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.08)}
          className="flex flex-col gap-5 rounded-[28px] border-2 border-neutral-900 bg-[#D0EF65] p-6 shadow-[8px_8px_0_0_#111] sm:p-8"
        >
          <motion.div variants={fadeUp(0)} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-900 bg-white">
              <Check size={20} className="text-neutral-900" strokeWidth={3} />
            </span>
            <h3 className="text-xl font-bold text-neutral-900 sm:text-2xl">{does.label}</h3>
          </motion.div>
          <ul className="flex flex-col gap-3">
            {does.points.map(({ icon: Icon, text }) => (
              <motion.li
                key={text}
                variants={fadeUp(0)}
                className="flex items-start gap-3 rounded-2xl border-2 border-neutral-900 bg-white/85 px-4 py-3"
              >
                <Icon size={20} className="mt-0.5 shrink-0 text-neutral-900" />
                <span className="text-sm font-semibold text-neutral-900 sm:text-base">{text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* DOESN'T — dark */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.08)}
          className="flex flex-col gap-5 rounded-[28px] border-2 border-neutral-900 bg-[#FFE3DA] p-6 shadow-[8px_8px_0_0_#111] sm:p-8"
        >
          <motion.div variants={fadeUp(0)} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-900 bg-white">
              <X size={20} className="text-[#E1640A]" strokeWidth={3} />
            </span>
            <h3 className="text-xl font-bold text-neutral-900 sm:text-2xl">{doesnt.label}</h3>
          </motion.div>

          <motion.p
            variants={fadeUp(0)}
            className="rounded-2xl border-2 border-neutral-900 bg-[#FFC107] px-4 py-3 text-base font-bold text-neutral-900 sm:text-lg"
          >
            {doesnt.lead}
          </motion.p>

          <ul className="flex flex-col gap-3">
            {doesnt.points.map(({ text }) => (
              <motion.li
                key={text}
                variants={fadeUp(0)}
                className="flex items-start gap-3 rounded-2xl border-2 border-neutral-900 bg-white/70 px-4 py-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-neutral-900">
                  <X size={12} className="text-neutral-700" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium text-neutral-800 sm:text-base">{text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export default MissionSplit
