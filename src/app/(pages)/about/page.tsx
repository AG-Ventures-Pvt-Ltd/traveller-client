import AboutHero from './components/AboutHero'
import StatStrip from './components/StatStrip'
import MissionSplit from './components/MissionSplit'
import JourneyTimeline from './components/JourneyTimeline'
import TwoSides from './components/TwoSides'
import FaqSection from './components/FaqSection'
import AboutCta from './components/AboutCta'
import Footer from '../(landing)/components/Footer/Footer'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FFF9F4]">
      <div className="px-3 pt-3 sm:px-5 ">
        <AboutHero />
      </div>

      <StatStrip />
      <MissionSplit />
      <JourneyTimeline />
      <TwoSides />
      <FaqSection />
      <AboutCta />

      <Footer />
    </main>
  )
}
