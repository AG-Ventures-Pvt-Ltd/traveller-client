'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Button from '@/common/components/atoms/Button'
import { VISION_SECTION } from '../constants'

const VisionSection = () => {
  const router = useRouter()
  const BadgeIcon = VISION_SECTION.badge.icon

  return (
    <section className="flex flex-col px-4 sm:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b bg-neutral-900">
      <motion.div
        className="flex flex-col gap-6 sm:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
      >
        <motion.div
          className="flex items-center justify-center gap-4"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } }}
        >
          <div className="h-8 sm:h-10 bg-white/10 rounded-full flex items-center px-3 sm:px-4 gap-2">
            <BadgeIcon className="text-white w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            <span className="text-white text-xs sm:text-sm font-bold font-['Satoshi']">
              {VISION_SECTION.badge.text}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-center text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-['Satoshi'] leading-tight lg:leading-[61.60px]"
          variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } } }}
        >
          {VISION_SECTION.title.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < VISION_SECTION.title.split('\n').length - 1 && <br className="hidden sm:block" />}
            </React.Fragment>
          ))}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-center text-white/80 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } } }}
        >
          {VISION_SECTION.description}
        </motion.p>

        {/* Commitment Card */}
        <motion.article
          className="bg-white/5 rounded-2xl sm:rounded-3xl outline-2 outline-offset-[-1.84px] outline-white/10 p-6 sm:p-8 lg:p-10 text-center"
          variants={{ hidden: { opacity: 0, y: 32, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } }}
        >
          <p className="text-white text-lg sm:text-xl lg:text-2xl font-bold font-['Satoshi'] leading-7 sm:leading-8 lg:leading-9">
            {VISION_SECTION.commitment.main.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < VISION_SECTION.commitment.main.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
            <br />
            <span className="text-white/60">{VISION_SECTION.commitment.sub}</span>
          </p>
        </motion.article>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } }}
        >
          <Button 
            className="bg-white! text-neutral-900! w-full sm:w-auto" 
            onClick={() => router.push(VISION_SECTION.cta.primary.link)}
            aria-label={VISION_SECTION.cta.primary.text}
          >
            {VISION_SECTION.cta.primary.text}
          </Button>
          <Button 
            className="bg-white/10! text-white! border-2! border-white/20! w-full sm:w-auto" 
            onClick={() => router.push(VISION_SECTION.cta.secondary.link)}
            aria-label={VISION_SECTION.cta.secondary.text}
          >
            {VISION_SECTION.cta.secondary.text}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default VisionSection
