'use client'
import React from 'react'
import Image from 'next/image'
import ArrowButton from '@/common/ui/Buttons/ArrowButton'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface CTASectionProps {
  content: {
    badge: string
    title: string
    subtitle: string
    description: string
    button: string
  }
}

const CTASection: React.FC<CTASectionProps> = ({ content }) => {
  const router = useRouter()

  return (
    <section className="px-5 md:px-40 py-12 md:py-24 bg-neutral-50 rounded-2xl md:rounded-3xl flex flex-col lg:flex-row gap-8 md:gap-10 w-full overflow-hidden" aria-labelledby="cta-heading">
      <motion.div
        className="flex flex-col justify-between flex-1 gap-6 md:gap-0"
        initial={{ opacity: 0, x: -48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="flex flex-col gap-4 md:gap-6">
          <motion.div
            className="px-4 py-2 bg-zinc-100 rounded-full inline-flex items-center self-start"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="text-neutral-900 text-sm font-medium">{content.badge}</span>
          </motion.div>

          <div className="flex flex-col gap-3 md:gap-4">
            <h2 id="cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
              <span className="text-neutral-900">{content.title} </span>
              <br />
              <span className="text-neutral-700">{content.subtitle}</span>
            </h2>

            <p className="text-neutral-700 text-base md:text-lg font-medium">
              {content.description}
            </p>
          </div>
        </header>
        <ArrowButton onClick={() => router.push('/trips')} className={'mt-6 md:mt-16'}>
          {content.button}
        </ArrowButton>
      </motion.div>

      <motion.div
        className="flex gap-2 flex-1"
        initial={{ opacity: 0, x: 48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <motion.div
          className="rounded-2xl md:rounded-3xl overflow-hidden flex-1"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            width={370}
            height={378}
            src="/png/S42.jpg"
            alt="Beautiful destination showcasing natural landscapes perfect for your next trip"
            className="w-full h-full object-cover min-h-[250px] md:min-h-0"
            quality={90}
          />
        </motion.div>
        <motion.div
          className="hidden md:block rounded-3xl overflow-hidden flex-1"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Image
            width={370}
            height={315}
            src="/png/S41.jpg"
            alt="Scenic location featuring stunning views and adventure opportunities"
            className="w-full h-full object-cover"
            quality={90}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CTASection
