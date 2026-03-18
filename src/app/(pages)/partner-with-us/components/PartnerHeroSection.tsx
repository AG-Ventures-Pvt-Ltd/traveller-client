'use client'
import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
// import { useRouter } from 'next/navigation'

const PARTNER_CTA_URL = 'https://partner.wondrr.in'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay },
})

const PartnerHeroSection = () => {
  // const router = useRouter()
  // const stats = [
  //   { value: "500+", label: "Active Travelers", icon: Users },
  //   { value: "50+", label: "Partner Trips", icon: TrendingUp },
  //   { value: "10+", label: "Destinations", icon: Zap }
  // ]

  return (
    <section className="relative w-full min-h-[400px] md:min-h-[85vh] overflow-hidden rounded-3xl">
      <div className="md:hidden relative h-full min-h-[450px] flex flex-col">
        <div className="relative h-[20%] md:h-[45%] overflow-hidden rounded-t-3xl">
          <Image
            src="/png/S42.jpg"
            alt="Partner with India's leading group trips marketplace"
            fill
            className="object-cover"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
          <div className="absolute top-6 left-6">
            <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
              <span className="text-white text-xs font-semibold">Partnership Program</span>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-neutral-900 rounded-b-3xl px-6 py-8 flex flex-col">
          <header className="flex flex-col gap-6 flex-1">
            <h1 className="text-white text-4xl font-medium leading-[1.2]">
              Partner With India’s Growing Group Trips Marketplace
            </h1>
            <p className="text-neutral-300 text-base font-medium leading-relaxed">
              Join India&apos;s fastest-growing marketplace. Connect with travelers, increase bookings, and scale your group travel operations.
            </p>
            {/* <div className="grid grid-cols-3 gap-3 pt-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                    <IconComponent size={20} className="text-white/70" aria-hidden="true" />
                    <div className="text-center">
                      <div className="text-white text-xl font-bold">{stat.value}</div>
                      <div className="text-neutral-400 text-xs font-medium">{stat.label}</div>
                    </div>
                  </div>
                )
              })}
            </div> */}
          </header>

          <div className="mt-auto pt-6">
            <button
              className="w-full px-7 py-4 bg-white text-neutral-900 rounded-full font-bold hover:bg-neutral-100 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-white/10"
              aria-label="Apply to partner with us"
            >
              <a href={PARTNER_CTA_URL} target="_blank" rel="noopener noreferrer" className='text-sm font-semibold'>
                Start Your Partnership
              </a>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-[85vh] relative">
        {/* Left Side - Content (60%) */}
        <motion.div
          className="w-[60%] bg-neutral-900 rounded-l-3xl px-12 lg:px-16 py-16 flex flex-col justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col gap-8 max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.25 } } }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex self-start"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } }}
            >
              <div className="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-white text-sm font-semibold">Partnership Program</span>
              </div>
            </motion.div>

            <motion.header
              className="flex flex-col gap-6"
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } } }}
            >
              <h1 className="text-white text-6xl lg:text-6xl font-medium leading-[1.1]">
                Partner With India’s<br />
                Growing Group Trips <br />
                <span className="text-neutral-400">Marketplace</span>
              </h1>

              <p className="text-neutral-300 text-lg font-medium leading-relaxed max-w-xl">
                Join India&apos;s fastest-growing marketplace for group travel. Connect with thousands of travelers, increase your bookings, and scale your operations effortlessly.
              </p>
            </motion.header>

            {/* Stats Row */}
            {/* <div className="flex gap-6 pt-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <article key={index} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent size={24} className="text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-white text-2xl font-bold">{stat.value}</div>
                      <div className="text-neutral-400 text-sm font-medium">{stat.label}</div>
                    </div>
                  </article>
                )
              })}
            </div> */}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="flex items-center gap-3"
            {...fadeUp(0.7)}
          >
            <button
              className="px-10 py-5 bg-white text-neutral-900 rounded-full font-bold hover:bg-neutral-100 hover:scale-105 transition-all cursor-pointer shadow-2xl shadow-white/20"
              aria-label="Apply to partner with us"
            >
              <a href={PARTNER_CTA_URL} target="_blank" rel="noopener noreferrer" className='text-sm font-semibold'>
                Start Your Partnership
              </a>
            </button>
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer" aria-hidden="true">
              <ArrowUpRight size={24} className="text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Image Collage (40%) */}
        <motion.div
          className="w-[40%] relative rounded-r-3xl overflow-hidden"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
        >
          {/* Main Image */}
          <div className="absolute inset-0">
            <Image
              src="/png/S42.jpg"
              alt="Travel partners exploring beautiful destinations"
              fill
              className="object-cover"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
          </div>

          {/* Floating Card */}
          <motion.div
            className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay: 0.7 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-900 text-lg font-bold">Ready to get started?</p>
                <p className="text-neutral-600 text-sm font-medium mt-1">No hidden fees, fair commissions</p>
              </div>
              <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center">
                <ArrowUpRight size={20} className="text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default PartnerHeroSection
