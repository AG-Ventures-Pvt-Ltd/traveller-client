'use client'
import React from 'react'
import Image from 'next/image'
import { ShieldCheck, CarTaxiFront } from 'lucide-react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
})

const HeroSection = () => {
    return (
        <section className="relative w-full min-h-[691px] md:min-h-[88vh] flex flex-col justify-end px-6 md:px-9 py-6 md:pt-16 md:pb-6 gap-10 overflow-hidden rounded-3xl">
            {/* Ken Burns background */}
            <motion.div
                className="absolute inset-0 -z-10"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 12, ease: 'easeOut' }}
            >
                <Image
                    src="/png/MainBG.jpg"
                    alt="Scenic natural landscape in India - Explore beautiful destinations"
                    fill
                    className="absolute inset-0 w-full h-full object-cover"
                    quality={90}
                    priority
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/0 via-neutral-900/20 to-neutral-900/30 md:from-black/10 md:to-black/50 -z-10" />

            {/* Mobile */}
            <div className="md:hidden flex flex-col justify-end items-start">
                <div className="flex flex-col justify-start items-start gap-10">
                    <header className="flex flex-col justify-start items-start">
                        <motion.h1
                            className="text-neutral-50/90 text-6xl font-normal leading-[66px]"
                            {...fadeUp(0.2)}
                        >
                            Explore<br />the Best<br />Group Trips in India
                        </motion.h1>
                    </header>
                    <motion.div className="relative" {...fadeUp(0.5)}>
                        <p className="text-white text-base font-medium leading-5">
                            Compare verified group trips across India. Discover scenic destinations, fixed itineraries, trusted operators, and simple online booking.
                        </p>
                    </motion.div>
                </div>
                <div className="flex flex-col justify-start items-start gap-6 w-full">
                    <motion.div className="w-40 h-px bg-white/30" {...fadeUp(0.7)} />
                    <motion.nav
                        className="flex gap-3"
                        aria-label="Tour features"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } },
                        }}
                    >
                        {[
                            { icon: <ShieldCheck size={16} className="text-neutral-50/90" aria-hidden="true" />, label: 'Group Trips' },
                            { icon: <CarTaxiFront size={16} className="text-neutral-50/90" aria-hidden="true" />, label: 'Transport Included' },
                        ].map(({ icon, label }) => (
                            <motion.div
                                key={label}
                                className="px-4 py-3 bg-white/10 rounded-full backdrop-blur-[5px] inline-flex justify-center items-center gap-1.5"
                                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
                            >
                                {icon}
                                <span className="text-white text-sm font-medium">{label}</span>
                            </motion.div>
                        ))}
                    </motion.nav>
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex flex-col gap-10">
                <div className="flex justify-between items-end gap-16 max-w-[1520px] w-full mx-auto">
                    <header className="max-w-[1000px]">
                        <motion.h1
                            className="text-neutral-50/90 text-8xl font-normal"
                            {...fadeUp(0.3)}
                        >
                            Explore & <br />Book the Best<br />Group Trips in India
                        </motion.h1>
                    </header>
                    <motion.div className="max-w-80" {...fadeUp(0.6)}>
                        <p className="text-white text-base font-medium text-right">
                            Compare verified group trips across India. Discover scenic destinations, fixed itineraries, trusted operators, and simple online booking.
                        </p>
                    </motion.div>
                </div>
                <div className="flex justify-between items-center gap-16 max-w-[1520px] w-full mx-auto">
                    <motion.div className="flex items-center gap-8" {...fadeUp(0.8)}>
                        <div>
                            <p className="text-neutral-50/90 text-base font-bold">10+ Destinations</p>
                            <p className="text-neutral-50/90 text-base font-bold">Across India</p>
                        </div>
                    </motion.div>
                    <motion.nav
                        className="flex items-center gap-1"
                        aria-label="Tour features"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
                        }}
                    >
                        {[
                            { icon: <ShieldCheck size={16} aria-hidden="true" />, label: 'Verified Trip Partners' },
                            { icon: <CarTaxiFront size={16} aria-hidden="true" />, label: 'Transport Included' },
                        ].map(({ icon, label }) => (
                            <motion.div
                                key={label}
                                className="px-4 py-2.5 bg-white/10 rounded-full backdrop-blur-sm flex items-center gap-1.5 text-white"
                                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
                            >
                                {icon}
                                <span className="text-white text-sm font-medium">{label}</span>
                            </motion.div>
                        ))}
                    </motion.nav>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
