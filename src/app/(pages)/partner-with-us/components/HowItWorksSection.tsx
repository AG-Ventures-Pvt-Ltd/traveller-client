'use client'
import React from 'react'

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Apply and get verified",
      description: "Fill out our partnership application form with your business details and trip offerings."
    },
    {
      number: "02",
      title: "Setup your operator profile",
      description: "Our team reviews your application and helps you set up your partner account."
    },
    {
      number: "03",
      title: "List trips and go live",
      description: "Create your trip listings, set your pricing, and start getting bookings from travelers."
    }
  ]

  return (
    <section className="flex flex-col gap-8 md:gap-12 px-5 md:px-9 py-12 md:py-24 w-full" aria-labelledby="how-it-works-heading">
      {/* Section Header - Mobile & Desktop */}
      <header className="flex flex-col gap-4">
        <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start">
          <span className="text-neutral-900 text-sm font-medium">Process</span>
        </div>

        <h2 id="how-it-works-heading" className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
          <span className="text-neutral-900">How the </span>
          <span className="text-neutral-700">Partnership Works</span>
        </h2>
      </header>

      {/* Steps Grid - Mobile & Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step, index) => {
          return (
            <article
              key={index}
              className="relative p-6 md:p-8 bg-neutral-50 rounded-2xl md:rounded-3xl flex flex-col gap-6 hover:bg-neutral-100 transition-colors group"
            >
              {/* Numbered Box */}
              <div className="w-14 h-14 md:w-16 md:h-16 bg-neutral-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                <span className="text-white text-xl md:text-2xl font-bold">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 z-10">
                <h3 className="text-neutral-900 text-lg md:text-xl font-bold">
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

export default HowItWorksSection
