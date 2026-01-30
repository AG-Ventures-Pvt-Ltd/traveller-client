'use client'
import React from 'react'
import HowWeWorkHeroSection from './components/HowWeWorkHeroSection'
import TravelersFlowSection from './components/TravelersFlowSection'
import PartnersFlowSection from './components/PartnersFlowSection'
import PaymentsSupportSection from './components/PaymentsSupportSection'
import WhyBookSection from './components/WhyBookSection'
import FinalCTASection from './components/FinalCTASection'
import GroupAdv from './components/GroupAdv'
import ThreePage from './components/ThreePage'
import Footer from '../(landing)/Footer/Footer'

const HowWeWork = () => {
  return (
    <main className="flex flex-col items-center">
      <div className="w-full px-[1%]">
        <HowWeWorkHeroSection />
      </div>
      <div className="flex flex-col justify-center mx-[4%] md:mx-[6%] w-full max-w-[1600px]">
        <TravelersFlowSection />
        <GroupAdv />
        <PartnersFlowSection />
        <PaymentsSupportSection />
        <ThreePage />
        <WhyBookSection />
        <FinalCTASection />
      </div>
      <Footer />
    </main>
  )
}

export default HowWeWork