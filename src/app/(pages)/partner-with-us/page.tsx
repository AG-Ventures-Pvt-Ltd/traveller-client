'use client'
import React from 'react'
import PartnerHeroSection from './components/PartnerHeroSection'
import WhyPartnerSection from './components/WhyPartnerSection'
import WhatWeOfferSection from './components/WhatWeOfferSection'
import WhoCanPartnerSection from './components/WhoCanPartnerSection'
import HowItWorksSection from './components/HowItWorksSection'
import { TrustSection, FinalCTASection } from './components/TrustAndCTASection'
import Footer from '../(landing)/Footer/Footer'

export default function PartnerWithUsPage() {
  return (
    <main className="flex flex-col items-center">
      <div className="w-full px-[1%]">
        <PartnerHeroSection />
      </div>
      <div className="flex flex-col justify-center mx-[4%] md:mx-[6%] w-full mb-12">
        <WhyPartnerSection />
        
        <WhatWeOfferSection />
        
        <WhoCanPartnerSection />
        
        <HowItWorksSection />
        
        <TrustSection />
        
        <FinalCTASection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}