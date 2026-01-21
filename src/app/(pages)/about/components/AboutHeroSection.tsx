'use client'
import React from 'react'
import Image from 'next/image'
import { ABOUT_HERO } from '../constants'

const AboutHeroSection = () => {
  const BadgeIcon = ABOUT_HERO.badge.icon

  return (
    <section className="flex flex-col lg:flex-row px-4 sm:px-6 lg:px-12 mt-12 pt-8 sm:pt-12 bg-gradient-to-b from-neutral-50 to-white border-b-2 border-gray-200 justify-between pb-12 sm:pb-20 gap-12">
      {/* Desktop: Left Content */}
      {/* Mobile: Stacked Content */}
      <div className="flex-1 flex flex-col gap-4 sm:gap-6 lg:w-1/2">
        {/* Badge */}
        <div className="flex items-center gap-4">
          <div className="px-4 py-3 bg-neutral-900 rounded-full flex items-center sm:px-4 whitespace-nowrap">
            <div className="mr-2 text-white">
              <BadgeIcon size={16} aria-hidden="true" />
            </div>
            <div className="text-white text-xs sm:text-sm font-bold font-['Satoshi']">
              {ABOUT_HERO.badge.text}
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-neutral-900 text-3xl sm:text-4xl lg:text-6xl font-bold font-['Satoshi'] leading-tight lg:leading-[70.40px]">
          {ABOUT_HERO.title}
        </h1>

        {/* Description */}
        <p className="text-neutral-700 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8 max-w-2xl">
          {ABOUT_HERO.description}
        </p>

        {/* Note Card */}
        <article className="bg-white rounded-2xl sm:rounded-3xl outline-2 outline-offset-[-1.84px] outline-gray-200 p-4 sm:p-7 max-w-2xl">
          <h2 className="text-neutral-900 text-sm sm:text-base font-bold font-['Satoshi'] leading-5 sm:leading-6">
            {ABOUT_HERO.note.title}
          </h2>
          <p className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi'] leading-5 sm:leading-6 mt-2">
            {ABOUT_HERO.note.description}
          </p>
        </article>
      </div>

      {/* Desktop: Right Image */}
      {/* Mobile: Below Content */}
      <div className="flex-1 flex justify-center lg:justify-end items-start mt-6 lg:mt-0 w-full">
        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-2xl h-64 sm:h-80 lg:h-120">
          <Image 
            fill 
            className="rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl object-cover" 
            src={ABOUT_HERO.image.src}
            alt={ABOUT_HERO.image.alt}
            quality={90}
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default AboutHeroSection
