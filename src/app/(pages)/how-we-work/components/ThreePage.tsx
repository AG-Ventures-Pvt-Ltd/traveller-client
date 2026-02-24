'use client'
import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ThreePage = () => {
    const sections = [
        {
            badge: 'Secure Payments',
            title: 'Book With Complete',
            titleSecondary: 'Peace of Mind',
            description:
                'We use bank-grade encryption and partner with trusted payment gateways to ensure every transaction is secure. Your financial information is protected at every step of the booking process.',
            features: [
                '256-bit SSL encryption for all transactions',
                'PCI DSS compliant payment processing',
                'Multiple secure payment options available',
                'Instant booking confirmations via email',
            ],
            imageSrc: '/png/L12.png',
            imageAlt: 'Secure Payment Processing',
            imagePosition: 'left',
            bgColor: 'bg-neutral-50',
        },
        {
            badge: 'Verified Operators',
            title: 'Travel With',
            titleSecondary: 'Confidence',
            description:
                'Every trip operator on our platform undergoes a rigorous verification process. We check licenses, insurance, safety records, and past traveler experiences to ensure they meet our quality standards.',
            features: [
                'All operators verified with valid licenses and insurance',
                'Background checks and safety record verification',
                'Authentic customer reviews and ratings',
                '24/7 customer support for all bookings',
                'Secure payment processing and refund protection',
            ],
            imageSrc: '/png/L21.png',
            imageAlt: 'Verified Travel Operators',
            imagePosition: 'right',
            bgColor: 'bg-white',
        },
        {
            badge: '24/7 Support',
            title: "We're Here to Help",
            titleSecondary: 'Every Step of the Way',
            description:
                "Our dedicated support team is available around the clock to answer your questions, help with bookings, and provide assistance during your trip. We're committed to making your travel experience smooth and memorable.",
            features: [
                '24/7 phone and chat support available',
                'Pre-trip guidance and travel tips',
                'Real-time assistance during your journey',
                'Post-trip support for feedback and issues',
            ],
            imageSrc: '/png/S22.jpg',
            imageAlt: '24/7 Customer Support',
            imagePosition: 'left',
            bgColor: 'bg-neutral-50',
        },
    ];

    return (
        <div className="flex flex-col">
            {sections.map((section, index) => (
                <div key={index} className={`${section.bgColor} py-16 px-6 md:px-12 lg:px-16`}>
                    <div
                        className={`max-w-7xl mx-auto flex flex-col ${section.imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'
                            } gap-12 lg:gap-16 items-center`}
                    >
                        {/* Content Section */}
                        <motion.div
                            className="flex-1 flex flex-col gap-8"
                            initial={{ opacity: 0, x: section.imagePosition === 'right' ? -48 : 48 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                        >
                            {/* Badge */}
                            <div
                                className={`inline-flex items-center justify-center ${section.bgColor === 'bg-white' ? 'bg-neutral-50' : 'bg-white'
                                    } rounded-full px-4 py-2 self-start`}
                            >
                                <span className="text-neutral-900 text-sm font-medium font-['Satoshi'] leading-5">
                                    {section.badge}
                                </span>
                            </div>

                            {/* Heading */}
                            <div className="flex flex-col gap-2">
                                <h2 className="text-neutral-900 text-4xl font-medium font-['Satoshi'] leading-10">
                                    {section.title}{' '}
                                    <span className="text-neutral-700">{section.titleSecondary}</span>
                                </h2>
                            </div>

                            {/* Description */}
                            <p className="text-neutral-700 text-base font-medium font-['Satoshi'] leading-6">
                                {section.description}
                            </p>

                            {/* Features List */}
                            <div className="flex flex-col gap-4">
                                {section.features.map((feature, featureIndex) => (
                                    <motion.div
                                        key={featureIndex}
                                        className="flex items-center gap-3"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, ease: 'easeOut', delay: featureIndex * 0.07 }}
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

                        {/* Image Section */}
                        <motion.div
                            className="flex-1 flex items-center justify-center"
                            initial={{ opacity: 0, x: section.imagePosition === 'right' ? 48 : -48 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
                        >
                            <div className="relative rounded-3xl overflow-hidden w-full max-w-[660px] aspect-[620/550] group">
                                <Image
                                    src={section.imageSrc}
                                    alt={section.imageAlt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ThreePage;
