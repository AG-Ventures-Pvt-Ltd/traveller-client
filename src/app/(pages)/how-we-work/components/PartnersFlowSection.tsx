'use client'
import React from 'react'
import { UserCheck, ListPlus, Users, Banknote, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const PartnersFlowSection = () => {
  const steps = [
    {
      number: "01",
      icon: UserCheck,
      title: "Apply to become a verified partner",
      description: "Submit your application with your business details and get verified by our team."
    },
    {
      number: "02",
      icon: ListPlus,
      title: "List your group trips with full details",
      description: "Create comprehensive trip listings with itineraries, pricing, and inclusions."
    },
    {
      number: "03",
      icon: Users,
      title: "Get discovered by travelers",
      description: "Your trips appear in search results and reach thousands of potential travelers."
    },
    {
      number: "04",
      icon: Banknote,
      title: "Receive bookings and payouts",
      description: "Accept bookings through the platform and receive secure, timely payments."
    }
  ]

  return (
    <section className="flex flex-col gap-8 md:gap-12 px-5 md:px-9 py-12 md:py-24 w-full bg-neutral-50 rounded-2xl md:rounded-3xl" aria-labelledby="partners-heading">
      {/* Section Header */}
      <motion.header
        className="flex flex-col gap-4 max-w-3xl"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="px-4 py-2 bg-zinc-100 rounded-full inline-flex items-center self-start">
          <span className="text-neutral-900 text-sm font-medium">For Trip Operators</span>
        </div>
        
        <h2 id="partners-heading" className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
          <span className="text-neutral-900">How Partners </span>
          <span className="text-neutral-700">List and Get Bookings</span>
        </h2>
      </motion.header>
      
      {/* Steps - Mobile: Stack, Desktop: Horizontal Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
        {steps.map((step, index) => {
          const IconComponent = step.icon
          return (
            <motion.article 
              key={index}
              className="relative p-6 bg-white rounded-2xl md:rounded-3xl group hover:shadow-xl transition-all border border-neutral-100"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-900 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm md:text-base font-bold">
                    {step.number}
                  </span>
                </div>
              </div>
              
              {/* Icon */}
              <div className="w-14 h-14 md:w-16 md:h-16 bg-neutral-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                <IconComponent size={28} className="text-neutral-900" aria-hidden="true" />
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3 className="text-neutral-900 text-base md:text-lg font-bold leading-tight pr-8">
                  {step.title}
                </h3>
                <p className="text-neutral-600 text-sm font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Arrow for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <ChevronRight className="w-8 h-8 text-neutral-300" />
                </div>
              )}
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export default PartnersFlowSection
