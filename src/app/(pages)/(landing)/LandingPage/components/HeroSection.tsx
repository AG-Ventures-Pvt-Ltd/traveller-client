'use client'
import React from 'react'
import Image from 'next/image'
import { ShieldCheck, CarTaxiFront } from 'lucide-react'

const HeroSection = () => {
    return (
        <section className="relative w-full min-h-[691px] md:min-h-[88vh] flex flex-col justify-end px-6 md:px-9 py-6 md:pt-16 md:pb-6 gap-10 overflow-hidden rounded-3xl">
            <Image
                src="/png/MainBG.jpg"
                alt="Scenic natural landscape in India - Explore beautiful destinations"
                fill
                className="absolute inset-0 w-full h-full object-cover -z-10"
                quality={90}
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/0 via-neutral-900/20 to-neutral-900/30 md:from-black/10 md:to-black/50 -z-10" />
            <div className="md:hidden flex flex-col justify-end items-start">
                <div className="flex flex-col justify-start items-start gap-10">
                    <header className="flex flex-col justify-start items-start">
                        <h1 className="text-neutral-50/90 text-6xl font-normal leading-[66px]">
                            Explore<br />the Best<br />Best Group Trips in India
                        </h1>
                    </header>

                    <div className="relative">
                        <p className="text-white text-base font-medium leading-5">
                            Compare verified group trips across India. Discover scenic destinations, fixed itineraries, trusted operators, and simple online booking.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-6 w-full">
                    <div className="w-40 h-px bg-white/30" />
                    <nav className="flex gap-3" aria-label="Tour features">
                        <div className="px-4 py-3 bg-white/10 rounded-full backdrop-blur-[5px] inline-flex justify-center items-center gap-1.5">
                            <ShieldCheck size={16} className="text-neutral-50/90" aria-hidden="true" />
                            <span className="text-white text-sm font-medium">Private Trips</span>
                        </div>
                        <div className="px-4 py-3 bg-white/10 rounded-full backdrop-blur-[5px] inline-flex justify-center items-center gap-1.5">
                            <CarTaxiFront size={16} className="text-neutral-50/90" aria-hidden="true" />
                            <span className="text-white text-sm font-medium">Transport Included</span>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="hidden md:flex flex-col gap-10">
                <div className="flex justify-between items-end gap-16 max-w-[1520px] w-full mx-auto">
                    <header className="max-w-[1000px]">
                        <h1 className="text-neutral-50/90 text-8xl font-normal ">
                            Explore & <br/>Book the Best<br />Group Trips in India
                        </h1>
                    </header>
                    <div className="max-w-80">
                        <p className="text-white text-base font-medium text-right">
                            Compare verified group trips across India. Discover scenic destinations, fixed itineraries, trusted operators, and simple online booking.
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-16 max-w-[1520px] w-full mx-auto">
                    <div className="flex items-center gap-8">
                        <div>
                            <p className="text-neutral-50/90 text-base font-bold">10+ Destinations</p>
                            <p className="text-neutral-50/90 text-base font-bold">Across India</p>
                        </div>
                    </div>
                    <nav className="flex items-center gap-1" aria-label="Tour features">
                        <div className="px-4 py-2.5 bg-white/10 rounded-full backdrop-blur-sm flex items-center gap-1.5 text-white">
                            <ShieldCheck size={16} aria-hidden="true" />
                            <span className="text-white text-sm font-medium">Verified Trip Partners</span>
                        </div>
                        <div className="px-4 py-2.5 bg-white/10 rounded-full backdrop-blur-sm flex items-center gap-1.5 text-white">
                            <CarTaxiFront size={16} aria-hidden="true" />
                            <span className="text-white text-sm font-medium">Transport Included</span>
                        </div>
                    </nav>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
