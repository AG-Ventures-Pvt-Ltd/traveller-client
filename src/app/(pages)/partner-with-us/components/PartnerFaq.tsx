'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQS, FAQ_SECTION } from '../constants'
import { SectionHead, fadeUp, stagger } from './_shared'

const PartnerFaq = () => {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHead eyebrow="FAQ" title={FAQ_SECTION.heading} subtitle={FAQ_SECTION.subheading} align="center" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger(0.06)}
        className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white"
      >
        {FAQS.map((faq, i) => {
          const isOpen = open === i
          return (
            <motion.div
              key={faq.q}
              variants={fadeUp(0)}
              className={`border-neutral-200 ${i > 0 ? 'border-t' : ''} ${isOpen ? 'bg-[#FFF9F4]' : ''}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full transition-colors ${isOpen ? 'bg-[#FFC107]' : 'bg-neutral-300'}`} />
                <span className="flex-1 text-base font-semibold text-neutral-900 sm:text-lg">{faq.q}</span>
                <ChevronDown size={20} className={`shrink-0 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-5 pb-5 pl-[2.6rem] text-sm leading-relaxed text-neutral-600 sm:text-base">{faq.a}</p>
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

export default PartnerFaq
