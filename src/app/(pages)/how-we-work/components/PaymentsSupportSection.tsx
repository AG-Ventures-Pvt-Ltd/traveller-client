'use client'
import React from 'react'
import Image from 'next/image'
import { Lock, DollarSign, Headphones } from 'lucide-react'

const PaymentsSupportSection = () => {
  const features = [
    {
      icon: Lock,
      title: "Secure online payments",
      description: "All transactions are encrypted and protected with industry-standard security measures."
    },
    {
      icon: DollarSign,
      title: "Transparent pricing",
      description: "No hidden fees or surprise charges. See the complete cost breakdown before booking."
    },
    {
      icon: Headphones,
      title: "Dedicated support before and during the trip",
      description: "Our support team is available to assist you throughout your journey."
    }
  ]

  return (
    <section className="flex flex-col lg:flex-row gap-8 md:gap-12 px-5 md:px-9 py-12 md:py-24 w-full" aria-labelledby="payments-heading">
      {/* Left - Content */}
      <div className="flex-1 flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start">
            <span className="text-neutral-900 text-sm font-medium">Trust & Safety</span>
          </div>
          
          <h2 id="payments-heading" className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
            <span className="text-neutral-900">Payments, Support </span>
            <span className="text-neutral-700">& Safety</span>
          </h2>
        </header>

        {/* Features List */}
        <div className="flex flex-col gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <article 
                key={index}
                className="flex items-start gap-4 p-6 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-neutral-900 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <IconComponent size={24} className="text-white" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-neutral-900 text-lg md:text-xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-700 text-sm md:text-base font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Right - Image */}
      <div className="flex-1 relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[500px]">
        <Image
          src="/png/S41.jpg"
          alt="Secure and safe group travel booking"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Floating Badge */}
        <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center">
              <Lock size={24} className="text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-neutral-900 text-base font-bold">100% Secure</p>
              <p className="text-neutral-600 text-sm font-medium">Your payments are protected</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentsSupportSection
