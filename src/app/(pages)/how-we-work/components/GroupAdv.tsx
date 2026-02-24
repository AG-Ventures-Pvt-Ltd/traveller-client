'use client'
import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const GroupAdv = () => {
    const features = [
        'Search by destination, activity, or experience type',
        'Filter by budget, duration, and difficulty level',
        'Read verified reviews from real travelers',
        'View detailed day-by-day itineraries',
    ];

    return (
        <div className="bg-neutral-50 py-16 px-6 md:px-12 lg:px-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-center">
                {/* Right Content Section */}
                <motion.div
                    className="flex-1 flex flex-col gap-8"
                    initial={{ opacity: 0, x: 48 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center justify-center bg-white rounded-full px-4 py-2 self-start">
                        <span className="text-neutral-900 text-sm font-medium font-['Satoshi'] leading-5">
                            Discover Trips
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-neutral-900 text-4xl font-medium font-['Satoshi'] leading-10">
                            Find Your Perfect{' '}
                            <span className="text-neutral-700">Group Adventure</span>
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-700 text-base font-medium font-['Satoshi'] leading-6">
                        Our intelligent search and filtering system helps you discover trips that match
                        your interests, budget, and travel dates. From Himalayan treks to beach getaways,
                        find exactly what you&apos;re looking for.
                    </p>

                    {/* Features List */}
                    <div className="flex flex-col gap-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
                            >
                                {/* Checkmark Icon */}
                                <div className="size-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 size={16} className="text-white" />
                                </div>

                                {/* Feature Text */}
                                <span className="text-neutral-900 text-base font-medium font-['Satoshi'] leading-6">
                                    {feature}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Left Image Section */}
                <motion.div
                    className="flex-1 flex items-center justify-center"
                    initial={{ opacity: 0, x: -48 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                    <div className="relative rounded-3xl overflow-hidden w-full max-w-[660px] aspect-[620/550] group">
                        <Image
                            src="/png/S31.jpg"
                            alt="Discover Group Adventures"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GroupAdv;
