import PartnerHero from './components/PartnerHero'
import WhyPartner from './components/WhyPartner'
import PartnerTools from './components/PartnerTools'
import PartnerSteps from './components/PartnerSteps'
import WhoCanPartner from './components/WhoCanPartner'
import PartnerFaq from './components/PartnerFaq'
import PartnerCta from './components/PartnerCta'
import Footer from '../(landing)/components/Footer/Footer'

export default function PartnerWithUsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FFF9F4]">
      <div className="px-3 pt-3 sm:px-5 sm:pt-5">
        <PartnerHero />
      </div>

      <WhyPartner />

      <div className="px-3 sm:px-5">
        <PartnerTools />
      </div>

      <PartnerSteps />
      <WhoCanPartner />
      <PartnerFaq />
      <PartnerCta />

      <Footer />
    </main>
  )
}
