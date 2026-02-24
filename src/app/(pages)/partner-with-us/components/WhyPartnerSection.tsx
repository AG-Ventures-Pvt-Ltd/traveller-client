'use client'
import React from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

const WhyPartnerSection = () => {
  const benefits = [
    "Increased visibility across high-intent travelers",
    "Direct bookings with transparent pricing",
    "Fair commissions, no hidden charges",
    "Brand-focused listings, not anonymous aggregation"
  ]

  return (
    <section className="flex flex-col gap-8 md:gap-12 px-5 md:px-9 py-12 md:py-24 w-full" aria-labelledby="why-partner-heading">
      {/* Section Header - Mobile & Desktop */}
      <motion.header
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start">
          <span className="text-neutral-900 text-sm font-medium">Why Partner</span>
        </div>
        
        <h2 id="why-partner-heading" className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
          <span className="text-neutral-900">Why Trip Operators Choose to </span>
          <span className="text-neutral-700">Partner With Us</span>
        </h2>
      </motion.header>
      
      {/* Benefits Grid - Mobile & Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {benefits.map((benefit, index) => (
          <motion.article 
            key={index}
            className="p-6 md:p-8 bg-neutral-50 rounded-2xl md:rounded-3xl flex items-start gap-4 hover:bg-neutral-100 transition-colors"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
          >
            <div className="w-6 h-6 md:w-8 md:h-8 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Check size={16} className="text-white" aria-hidden="true" />
            </div>
            <p className="text-neutral-900 text-base md:text-lg font-medium leading-relaxed flex-1">
              {benefit}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default WhyPartnerSection
