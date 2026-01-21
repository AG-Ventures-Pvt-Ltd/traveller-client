'use client'
import React from 'react'
import Image from 'next/image'
import { MousePointerClick } from 'lucide-react'

const HowWeWorkHeroSection = () => {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[75vh] overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Mobile Layout */}
      <div className="md:hidden relative h-full min-h-[600px] flex flex-col px-6 py-12">
        {/* Badge */}
        <div className="inline-flex self-start mb-8">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-white text-xs font-semibold">How It Works</span>
          </div>
        </div>

        {/* Content */}
        <header className="flex flex-col gap-6 flex-1">
          <h1 className="text-white text-5xl font-medium leading-[1.15]">
            How Booking a<br />Group Trip Works
          </h1>
          
          <p className="text-neutral-300 text-base font-medium leading-relaxed">
            Discover, compare, and book verified group trips across India in a few simple steps.
          </p>
        </header>

        {/* Decorative Element */}
        <div className="mt-auto">
          <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <MousePointerClick size={24} className="text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">Simple & Transparent</p>
              <p className="text-neutral-400 text-xs font-medium">Book with confidence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center min-h-[75vh] px-12 lg:px-16 py-16">
        <div className="max-w-[1520px] mx-auto w-full grid grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <header className="flex flex-col gap-8">
            <div className="inline-flex self-start">
              <div className="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-white text-sm font-semibold">How It Works</span>
              </div>
            </div>

            <h1 className="text-white text-6xl lg:text-7xl font-medium leading-[1.1]">
              How Booking a<br />Group Trip<br />
              <span className="text-neutral-400">Works</span>
            </h1>
            
            <p className="text-neutral-300 text-xl font-medium leading-relaxed max-w-lg">
              Discover, compare, and book verified group trips across India in a few simple steps.
            </p>

            {/* Info Cards */}
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-3 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex-1">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <MousePointerClick size={24} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Simple Process</p>
                  <p className="text-neutral-400 text-xs font-medium">Easy booking</p>
                </div>
              </div>
            </div>
          </header>

          {/* Right - Visual Element */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="/png/S23.jpg"
              alt="Discover and book group trips across India"
              fill
              className="object-cover"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl">
              <p className="text-neutral-900 text-lg font-bold">Quick & Easy Booking</p>
              <p className="text-neutral-600 text-sm font-medium mt-1">Start your journey in minutes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWeWorkHeroSection
