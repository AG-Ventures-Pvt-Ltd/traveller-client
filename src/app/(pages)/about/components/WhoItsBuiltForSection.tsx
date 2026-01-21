'use client'
import React from 'react'
import Image from 'next/image'
import { WHO_ITS_BUILT_FOR } from '../constants'

const WhoItsBuiltForSection = () => {
  const OperatorIcon = WHO_ITS_BUILT_FOR.operators.icon
  const TravelerIcon = WHO_ITS_BUILT_FOR.travelers.icon

  return (
    <section className="flex flex-col px-4 sm:px-8 lg:px-32 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-white border-b-2 border-gray-200">
      <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
        {/* Section Header */}
        {/* Desktop: Center-aligned */}
        {/* Mobile: Center-aligned */}
        <header className="text-center">
          <h2 className="text-neutral-900 text-3xl sm:text-4xl lg:text-5xl font-bold font-['Satoshi'] leading-tight lg:leading-[52.80px]">
            {WHO_ITS_BUILT_FOR.title}
          </h2>
          <p className="text-neutral-700 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8 mt-2 sm:mt-4">
            {WHO_ITS_BUILT_FOR.subtitle}
          </p>
        </header>

        {/* Hero Images */}
        {/* Desktop: 2-column grid */}
        {/* Mobile: Stacked */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          {WHO_ITS_BUILT_FOR.images.map((image, index) => (
            <div 
              key={index}
              className="relative flex-1 h-48 sm:h-56 lg:h-72 rounded-2xl sm:rounded-3xl shadow-lg"
            >
              <Image
                className="w-full h-full rounded-3xl"
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: 'cover' }}
                quality={90}
              />
            </div>
          ))}
        </div>

        {/* User Cards */}
        {/* Desktop: 2-column grid */}
        {/* Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Operators Card */}
          <article className="flex-1 p-6 sm:p-8 bg-gradient-to-b from-neutral-900 to-zinc-800 rounded-2xl sm:rounded-3xl">
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <OperatorIcon className="text-neutral-900" size={28} aria-hidden="true" />
            </div>

            {/* Title */}
            <h3 className="text-white text-xl sm:text-2xl font-bold font-['Satoshi'] leading-7 sm:leading-8 mb-3 sm:mb-4">
              {WHO_ITS_BUILT_FOR.operators.title}
            </h3>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base font-medium font-['Satoshi'] leading-5 sm:leading-6 mb-4 sm:mb-6">
              {WHO_ITS_BUILT_FOR.operators.description}
            </p>

            {/* Features List */}
            <ul className="space-y-2 sm:space-y-3">
              {WHO_ITS_BUILT_FOR.operators.features.map((feature, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 text-white/90 text-sm sm:text-base font-medium font-['Satoshi']"
                >
                  <span className="text-white mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Travelers Card */}
          <article className="flex-1 p-6 sm:p-8 bg-gradient-to-b from-neutral-50 to-gray-200 rounded-2xl sm:rounded-3xl">
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <TravelerIcon className="text-white" size={28} aria-hidden="true" />
            </div>

            {/* Title */}
            <h3 className="text-neutral-900 text-xl sm:text-2xl font-bold font-['Satoshi'] leading-7 sm:leading-8 mb-3 sm:mb-4">
              {WHO_ITS_BUILT_FOR.travelers.title}
            </h3>

            {/* Description */}
            <p className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi'] leading-5 sm:leading-6 mb-4 sm:mb-6">
              {WHO_ITS_BUILT_FOR.travelers.description}
            </p>

            {/* Features List */}
            <ul className="space-y-2 sm:space-y-3">
              {WHO_ITS_BUILT_FOR.travelers.features.map((feature, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 text-neutral-900 text-sm sm:text-base font-medium font-['Satoshi']"
                >
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

export default WhoItsBuiltForSection
