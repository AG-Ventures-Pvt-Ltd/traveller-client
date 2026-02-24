'use client'
import React from 'react'
import { LayoutGrid, ShieldCheck, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

const WhyBookSection = () => {
  const benefits = [
    {
      icon: LayoutGrid,
      title: "Compare multiple trip providers in one place",
      description: "Browse and compare different operators, itineraries, and prices all in a single platform."
    },
    {
      icon: ShieldCheck,
      title: "Verified partners only",
      description: "All trip operators are carefully vetted and verified before they can list on our platform."
    },
    {
      icon: FileText,
      title: "Clear itineraries and pricing",
      description: "Get complete transparency with detailed itineraries, inclusions, and upfront pricing."
    }
  ]

  return (
    <section className="flex flex-col gap-8 md:gap-12 px-5 md:px-9 py-12 md:py-24 w-full" aria-labelledby="why-book-heading">
      {/* Section Header */}
      <motion.header
        className="flex flex-col gap-4 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="px-4 py-2 bg-neutral-100 rounded-full inline-flex items-center self-center">
          <span className="text-neutral-900 text-sm font-medium">Why Choose Us</span>
        </div>
        
        <h2 id="why-book-heading" className="text-2xl md:text-3xl lg:text-5xl font-medium leading-tight">
          <span className="text-neutral-900">Why Book Through </span>
          <span className="text-neutral-700">Our Platform</span>
        </h2>
      </motion.header>
      
      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon
          return (
            <motion.article 
              key={index}
              className="p-8 bg-neutral-50 rounded-2xl md:rounded-3xl hover:shadow-xl transition-all group border border-neutral-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform mb-6">
                <IconComponent size={32} className="text-white" aria-hidden="true" />
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3 className="text-neutral-900 text-xl md:text-2xl font-bold leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-neutral-700 text-base font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export default WhyBookSection
