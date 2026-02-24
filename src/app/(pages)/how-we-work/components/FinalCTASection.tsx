'use client'
import React from 'react'
import { ArrowUpRight, Compass } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const FinalCTASection = () => {
    const router = useRouter()

    return (
        <section className="px-5 md:px-10 mx-5 md:mx-10 py-16 md:py-12 my-5 md:my-12 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl md:rounded-3xl flex flex-col items-center text-center gap-10 md:gap-12 relative overflow-hidden" aria-labelledby="final-cta-heading">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-white rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white rounded-full" />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-8 md:gap-10 max-w-4xl">
                <motion.div
                    className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20"
                    initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                >
                    <Compass size={40} className="text-white" aria-hidden="true" />
                </motion.div>
                <motion.header
                    className="flex flex-col gap-4 md:gap-6"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
                >
                    <h2 id="final-cta-heading" className="text-3xl md:text-4xl lg:text-6xl font-medium leading-tight text-white">
                        Ready to Plan Your<br className="hidden md:block" />
                        <span className="text-neutral-300">Group Trip?</span>
                    </h2>

                    <p className="text-neutral-300 text-base md:text-lg font-medium max-w-2xl">
                        Start exploring verified group trips across India and book your next adventure today.
                    </p>
                </motion.header>
                <motion.div
                    className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.35 }}
                >
                    <button
                        onClick={() => router.push('/trips')}
                        className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-neutral-900 rounded-full font-bold hover:bg-neutral-100 hover:scale-105 transition-all cursor-pointer text-base md:text-lg shadow-2xl shadow-white/20"
                        aria-label="Explore group trips"
                    >
                        Explore Group Trips
                    </button>
                    <div className="hidden sm:flex w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-full items-center justify-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer" aria-hidden="true">
                        <ArrowUpRight size={28} className="text-white" />
                    </div>
                </motion.div>
                {/* <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-6 border-t border-white/10 w-full">
          <div className="text-center">
            <p className="text-white text-2xl md:text-3xl font-bold">500+</p>
            <p className="text-neutral-400 text-sm font-medium">Happy Travelers</p>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div className="text-center">
            <p className="text-white text-2xl md:text-3xl font-bold">50+</p>
            <p className="text-neutral-400 text-sm font-medium">Group Trips</p>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div className="text-center">
            <p className="text-white text-2xl md:text-3xl font-bold">10+</p>
            <p className="text-neutral-400 text-sm font-medium">Destinations</p>
          </div> 
        </div>*/}
            </div>
        </section>
    )
}

export default FinalCTASection
