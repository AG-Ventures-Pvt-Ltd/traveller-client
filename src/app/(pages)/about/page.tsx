'use client'

import AboutHeroSection from './components/AboutHeroSection'
import WondrrApproachSection from './components/WondrrApproachSection'
import WhoItsBuiltForSection from './components/WhoItsBuiltForSection'
import VisionSection from './components/VisionSection'
import { FOOTER } from './constants'

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <AboutHeroSection />
      <WondrrApproachSection />
      <WhoItsBuiltForSection />
      <VisionSection />
      <footer className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-9 py-8 sm:py-12 bg-white border-t-2 border-gray-200 gap-4">
        <div className="text-neutral-900 text-xl sm:text-2xl font-black">{FOOTER.brand}</div>
        <div className="text-neutral-700 text-xs sm:text-sm font-medium font-['Satoshi'] text-center sm:text-right">
          {FOOTER.copyright}
        </div>
      </footer>
    </main>
  )
}
