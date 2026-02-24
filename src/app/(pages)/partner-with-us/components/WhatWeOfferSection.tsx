'use client'
import React from 'react'
import { Globe, Calendar, DollarSign, Megaphone, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'

const WhatWeOfferSection = () => {
    const offerings = [
        {
            icon: Globe,
            title: "Marketplace Exposure",
            description: "Across destinations and trip types"
        },
        {
            icon: Calendar,
            title: "Bookings & Payment Management",
            description: "Support for all your bookings"
        },
        {
            icon: DollarSign,
            title: "Secure Payouts",
            description: "Timely and reliable payments"
        },
        {
            icon: Megaphone,
            title: "Marketing Support",
            description: "Through featured listings"
        },
        {
            icon: Headphones,
            title: "Dedicated Support",
            description: "Partner support team"
        }
    ]

    return (
        <section className="flex flex-col gap-8 md:gap-12 px-5 md:px-9 py-12 md:py-24 w-full" aria-labelledby="what-we-offer-heading">
            <motion.header
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
                <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start">
                    <span className="text-neutral-900 text-sm font-medium">Benefits</span>
                </div>

                <h2 id="what-we-offer-heading" className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
                    <span className="text-neutral-900">What You Get as a </span>
                    <span className="text-neutral-700">Travel Partner</span>
                </h2>
        </motion.header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {offerings.map((offering, index) => {
                    const IconComponent = offering.icon
                    return (
                        <motion.article
                            key={index}
                            className="p-6 md:p-8 bg-neutral-50 rounded-2xl md:rounded-3xl flex flex-col gap-4 hover:bg-neutral-100 transition-colors group"
                            initial={{ opacity: 0, y: 36 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: index * 0.09 }}
                            whileHover={{ y: -5, transition: { duration: 0.25 } }}
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-neutral-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <IconComponent size={24} className="text-white" aria-hidden="true" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-neutral-900 text-lg md:text-xl font-bold">
                                    {offering.title}
                                </h3>
                                <p className="text-neutral-700 text-sm md:text-base font-medium">
                                    {offering.description}
                                </p>
                            </div>
                        </motion.article>
                    )
                })}
            </div>
        </section>
    )
}

export default WhatWeOfferSection
