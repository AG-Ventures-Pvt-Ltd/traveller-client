'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS, FAQ_SECTION } from '../constants'
import { SectionHead, fadeUp, stagger } from './_shared'

const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHead eyebrow="FAQ" title={FAQ_SECTION.heading} subtitle={FAQ_SECTION.subheading} align="center" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger(0.06)}
        className="mt-10 flex flex-col gap-3"
      >
        {FAQS.map((faq, i) => {
          const isOpen = open === i
          return (
            <motion.div
              key={faq.q}
              variants={fadeUp(0)}
              className={`overflow-hidden rounded-2xl border-2 border-neutral-900 bg-white transition-shadow ${
                isOpen ? 'shadow-[6px_6px_0_0_#D0EF65]' : 'shadow-[4px_4px_0_0_#111]'
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-base font-semibold text-neutral-900 sm:text-lg">{faq.q}</span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-neutral-900 transition-all ${
                    isOpen ? 'rotate-45 bg-[#D0EF65]' : 'bg-white'
                  }`}
                >
                  <Plus size={18} className="text-neutral-900" strokeWidth={3} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-600 sm:text-base">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

export default FaqSection
