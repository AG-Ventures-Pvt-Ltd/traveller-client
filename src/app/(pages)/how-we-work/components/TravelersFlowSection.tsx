'use client'
import React from 'react'
import { Search, FileCheck, CreditCard, Mail } from 'lucide-react'

const TravelersFlowSection = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Explore group trips by destination or interest",
      description: "Browse through verified trips across India, filter by location, activity type, or budget."
    },
    {
      number: "02",
      icon: FileCheck,
      title: "Compare itineraries, prices, and operators",
      description: "View detailed trip information, read reviews, and compare different operators side by side."
    },
    {
      number: "03",
      icon: CreditCard,
      title: "Book securely online",
      description: "Complete your booking with secure payment options and transparent pricing—no hidden fees."
    },
    {
      number: "04",
      icon: Mail,
      title: "Receive instant confirmation and trip details",
      description: "Get immediate booking confirmation via email with all trip details and what to expect next."
    }
  ]

  return (
    <section className="flex flex-col gap-8 md:gap-12 px-5 md:px-9 py-12 md:py-24 w-full" aria-labelledby="travelers-heading">
      {/* Section Header */}
      <header className="flex flex-col gap-4 max-w-3xl">
        <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start">
          <span className="text-neutral-900 text-sm font-medium">For Travelers</span>
        </div>
        
        <h2 id="travelers-heading" className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
          <span className="text-neutral-900">How Travelers </span>
          <span className="text-neutral-700">Book Group Trips</span>
        </h2>
      </header>
      
      {/* Steps Grid - Mobile: Vertical, Desktop: 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon
          return (
            <article 
              key={index}
              className="relative p-6 md:p-8 bg-neutral-50 rounded-2xl md:rounded-3xl group hover:shadow-xl transition-all border border-neutral-100"
            >
              {/* Step Number */}
              <div className="absolute top-6 md:top-8 right-6 md:right-8">
                <span className="text-neutral-200 text-5xl md:text-6xl font-bold leading-none">
                  {step.number}
                </span>
              </div>
              
              {/* Icon */}
              <div className="w-14 h-14 md:w-16 md:h-16 bg-neutral-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform mb-6 z-10 relative">
                <IconComponent size={28} className="text-white" aria-hidden="true" />
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-3 z-10 relative pr-12">
                <h3 className="text-neutral-900 text-lg md:text-xl font-bold leading-tight">
                  {step.title}
                </h3>
                <p className="text-neutral-700 text-sm md:text-base font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default TravelersFlowSection
