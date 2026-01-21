'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/common/components/atoms/Button'
import { VISION_SECTION } from '../constants'

const VisionSection = () => {
  const router = useRouter()
  const BadgeIcon = VISION_SECTION.badge.icon

  return (
    <section className="flex flex-col px-4 sm:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b bg-neutral-900">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex items-center justify-center gap-4">
          <div className="h-8 sm:h-10 bg-white/10 rounded-full flex items-center px-3 sm:px-4 gap-2">
            <BadgeIcon className="text-white w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            <span className="text-white text-xs sm:text-sm font-bold font-['Satoshi']">
              {VISION_SECTION.badge.text}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-['Satoshi'] leading-tight lg:leading-[61.60px]">
          {VISION_SECTION.title.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < VISION_SECTION.title.split('\n').length - 1 && <br className="hidden sm:block" />}
            </React.Fragment>
          ))}
        </h2>

        {/* Description */}
        <p className="text-center text-white/80 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8">
          {VISION_SECTION.description}
        </p>

        {/* Commitment Card */}
        <article className="bg-white/5 rounded-2xl sm:rounded-3xl outline-2 outline-offset-[-1.84px] outline-white/10 p-6 sm:p-8 lg:p-10 text-center">
          <p className="text-white text-lg sm:text-xl lg:text-2xl font-bold font-['Satoshi'] leading-7 sm:leading-8 lg:leading-9">
            {VISION_SECTION.commitment.main.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < VISION_SECTION.commitment.main.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
            <br />
            <span className="text-white/60">{VISION_SECTION.commitment.sub}</span>
          </p>
        </article>

        {/* CTA Buttons */}
        {/* Desktop: Side-by-side */}
        {/* Mobile: Stacked */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            className="bg-white! text-neutral-900! w-full sm:w-auto" 
            onClick={() => router.push(VISION_SECTION.cta.primary.link)}
            aria-label={VISION_SECTION.cta.primary.text}
          >
            {VISION_SECTION.cta.primary.text}
          </Button>
          <Button 
            className="bg-white/10! text-white! border-2! border-white/20! w-full sm:w-auto" 
            onClick={() => router.push(VISION_SECTION.cta.secondary.link)}
            aria-label={VISION_SECTION.cta.secondary.text}
          >
            {VISION_SECTION.cta.secondary.text}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default VisionSection
