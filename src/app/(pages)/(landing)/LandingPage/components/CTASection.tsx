'use client'
import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

interface CTASectionProps {
  content: {
    badge: string
    title: string
    subtitle: string
    description: string
    button: string
  }
}

const CTASection: React.FC<CTASectionProps> = ({ content }) => {
  return (
    <section className="px-5 md:px-10 py-12 md:py-24 bg-neutral-50 rounded-2xl md:rounded-3xl flex flex-col lg:flex-row gap-8 md:gap-10 w-full" aria-labelledby="cta-heading">
      <div className="flex flex-col justify-between flex-1 gap-6 md:gap-0">
        <header className="flex flex-col gap-4 md:gap-6">
          <div className="px-4 py-2 bg-zinc-100 rounded-full inline-flex items-center self-start">
            <span className="text-neutral-900 text-sm font-medium">{content.badge}</span>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <h2 id="cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
              <span className="text-neutral-900">{content.title} </span>
              <br/>
              <span className="text-neutral-700">{content.subtitle}</span>
            </h2>
            
            <p className="text-neutral-700 text-base md:text-lg font-medium">
              {content.description}
            </p>
          </div>
        </header>

        <div className="flex items-center gap-2 mt-6 md:mt-16">
          <button 
            className="px-4 md:px-6 py-2.5 md:py-3 bg-neutral-900 text-white rounded-full font-bold hover:bg-neutral-800 hover:scale-105 transition-transform cursor-pointer text-sm md:text-base"
            aria-label="Plan your trip and start exploring"
          >
            {content.button}
          </button>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-900 rounded-full flex items-center justify-center" aria-hidden="true">
            <ArrowUpRight className="text-white" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-1">
        <div className="rounded-2xl md:rounded-3xl overflow-hidden flex-1">
          <Image 
            width={370} 
            height={378} 
            src="/png/S42.jpg" 
            alt="Beautiful destination showcasing natural landscapes perfect for your next trip" 
            className="w-full h-full object-cover min-h-[250px] md:min-h-0" 
            quality={90} 
          />
        </div>
        <div className="hidden md:block rounded-3xl overflow-hidden flex-1">
          <Image 
            width={370} 
            height={315} 
            src="/png/S41.jpg" 
            alt="Scenic location featuring stunning views and adventure opportunities" 
            className="w-full h-full object-cover" 
            quality={90} 
          />
        </div>
      </div>
    </section>
  )
}

export default CTASection
