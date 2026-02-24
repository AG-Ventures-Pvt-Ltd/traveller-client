'use client'
import React from 'react'
import { Users, Mountain, Compass, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const WhoCanPartnerSection = () => {
  const partnerTypes = [
    {
      icon: Users,
      title: "Group trip operators"
    },
    {
      icon: Mountain,
      title: "Trek and backpacking organizers"
    },
    {
      icon: Compass,
      title: "Adventure travel companies"
    },
    {
      icon: MapPin,
      title: "Local travel experts and guides"
    }
  ]

  return (
    <section className="flex flex-col gap-8 md:gap-12 px-5 md:px-9 py-12 md:py-24 w-full bg-neutral-50 rounded-2xl md:rounded-3xl" aria-labelledby="who-can-partner-heading">
      {/* Section Header - Mobile & Desktop */}
      <motion.header
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="px-4 py-2 bg-zinc-100 rounded-full inline-flex items-center self-start">
          <span className="text-neutral-900 text-sm font-medium">Eligibility</span>
        </div>
        
        <h2 id="who-can-partner-heading" className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
          <span className="text-neutral-900">Who Can </span>
          <span className="text-neutral-700">Partner With Us</span>
        </h2>
      </motion.header>
      
      {/* Partner Types Grid - Mobile & Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {partnerTypes.map((type, index) => {
          const IconComponent = type.icon
          return (
            <motion.article 
              key={index}
              className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl flex items-center gap-4 md:gap-6 hover:shadow-lg transition-all group border border-neutral-100"
              initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-neutral-900 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <IconComponent size={28} className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-neutral-900 text-base md:text-lg font-bold flex-1">
                {type.title}
              </h3>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export default WhoCanPartnerSection
