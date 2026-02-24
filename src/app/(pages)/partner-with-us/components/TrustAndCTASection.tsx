'use client'
import React from 'react'
import Image from 'next/image'
import { ArrowUpRight, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const TrustSection = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-8 md:gap-12 px-5 md:px-9 py-12 md:py-24 w-full" aria-labelledby="trust-heading">
      {/* Content Area - Mobile & Desktop */}
      <motion.div
        className="flex-1 flex flex-col gap-6 md:gap-8 justify-center"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <header className="flex flex-col gap-4 md:gap-6">
          <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start gap-2">
            <Shield size={16} className="text-neutral-900" aria-hidden="true" />
            <span className="text-neutral-900 text-sm font-medium">Trust & Transparency</span>
          </div>
          
          <h2 id="trust-heading" className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
            <span className="text-neutral-900">Built on </span>
            <span className="text-neutral-700">Transparency and Trust</span>
          </h2>
          
          <p className="text-neutral-700 text-base md:text-lg font-medium leading-relaxed">
            We focus on long-term partnerships by ensuring clear communication, fair policies, and a platform that highlights your brand identity.
          </p>
        </header>
      </motion.div>
      
      {/* Image Area - Mobile & Desktop */}
      <motion.div
        className="flex-1 relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px] group"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
      >
        <Image
          src="/png/S23.jpg"
          alt="Building trust and transparency in travel partnerships"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>
    </section>
  )
}

const FinalCTASection = () => {
  return (
    <section className="px-5 md:px-10 mx-5 md:mx-12 py-12 md:py-16 bg-neutral-900 rounded-2xl md:rounded-3xl flex flex-col items-center text-center gap-8 md:gap-10 overflow-hidden">
      <motion.header
        className="flex flex-col gap-4 md:gap-6 max-w-3xl"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <h2 id="final-cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white">
          Ready to Grow Your<br className="hidden md:block" /> 
          <span className="text-neutral-300">Group Travel Business?</span>
        </h2>
        
        <p className="text-neutral-300 text-base md:text-lg font-medium">
          Join India&apos;s fastest-growing marketplace for group trips and adventure travel.
        </p>
      </motion.header>
      
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
      >
        <button 
          className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-neutral-900 rounded-full font-bold hover:bg-neutral-100 hover:scale-105 transition-transform cursor-pointer text-sm md:text-base"
          aria-label="Apply to become a partner"
        >
          Apply to Become a Partner
        </button>
        <div className="hidden sm:flex w-12 h-12 bg-white rounded-full items-center justify-center" aria-hidden="true">
          <ArrowUpRight className="text-neutral-900" />
        </div>
      </motion.div>
    </section>
  )
}

export { TrustSection, FinalCTASection }
