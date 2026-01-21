'use client'
import React from 'react'
import Image from 'next/image'
import { WONDRR_APPROACH } from '../constants'

const WondrrApproachSection = () => {
  return (
    <section className="flex flex-col px-4 sm:px-8 lg:px-32 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-neutral-50 to-white border-b-2 border-gray-200">
      <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
        {/* Section Header */}
        {/* Desktop: Center-aligned */}
        {/* Mobile: Center-aligned */}
        <header className="text-center">
          <h2 className="text-neutral-900 text-3xl sm:text-4xl lg:text-5xl font-bold font-['Satoshi'] leading-tight lg:leading-[52.80px]">
            {WONDRR_APPROACH.title}
          </h2>
          <p className="text-neutral-700 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8 mt-2 sm:mt-4">
            {WONDRR_APPROACH.subtitle}
          </p>
        </header>

        {/* Approach Cards */}
        {/* Desktop: 3-column grid */}
        {/* Mobile: Single column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WONDRR_APPROACH.cards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <article 
                key={index}
                className="p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all group border border-gray-200"
              >
                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform mb-4 sm:mb-6">
                  <IconComponent className="text-white" size={28} aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="text-neutral-900 text-lg sm:text-xl font-bold font-['Satoshi'] leading-6 sm:leading-7 mb-2 sm:mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi'] leading-5 sm:leading-6">
                  {card.description}
                </p>
              </article>
            )
          })}
        </div>

        {/* Quote Section */}
        {/* Desktop: Full-width dark card */}
        {/* Mobile: Full-width dark card */}
        <div className="bg-neutral-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden">
          <Image 
            fill 
            className="h-full w-full opacity-10" 
            style={{ objectFit: 'cover' }} 
            src={WONDRR_APPROACH.quote.backgroundImage}
            alt="Background" 
            quality={90}
          />
          <blockquote className="relative text-white text-xl sm:text-2xl lg:text-3xl font-bold font-['Satoshi'] leading-7 sm:leading-8 lg:leading-10">
            {WONDRR_APPROACH.quote.text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < WONDRR_APPROACH.quote.text.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default WondrrApproachSection
