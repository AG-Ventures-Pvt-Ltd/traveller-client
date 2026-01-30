'use client';

import React from 'react';
import { Share2, Gift, Copy } from 'lucide-react';

interface HowItWorksProps {
    target?: number;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ target = 8 }) => {
    const steps = [
        {
            number: '1',
            icon: Share2,
            title: 'Share your code',
            description: 'Send your unique referral code to friends and family who love to travel.',
        },
        {
            number: '2',
            icon: Gift,
            title: 'They book trips',
            description: `When they complete ${target} successful bookings using your code, you earn a referral credit.`,
        },
        {
            number: '3',
            icon: Copy,
            title: 'Get a free trip',
            description: `After ${target} successful bookings, claim your complimentary trip to any destination on Wondrr.`,
        },
    ];

    return (
        <section className="py-16 px-6 md:px-12 lg:px-16 flex flex-col items-center gap-14">
            <h2 className="text-neutral-900 text-4xl font-bold font-['Satoshi'] leading-tight text-center">
                How it works
            </h2>

            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step) => {
                    const IconComponent = step.icon;
                    return (
                        <div key={step.number} className="bg-neutral-50 rounded-3xl p-10 flex flex-col gap-6 relative">
                            <span className="absolute top-6 right-6 text-gray-200 text-6xl font-bold font-['Satoshi'] leading-tight">
                                {step.number}
                            </span>
                            <div className="size-16 bg-white rounded-xl flex items-center justify-center">
                                <IconComponent size={32} className="text-neutral-900" />
                            </div>
                            <h3 className="text-neutral-900 text-xl font-bold font-['Satoshi'] leading-8">
                                {step.title}
                            </h3>
                            <p className="text-neutral-700 text-base font-medium font-['Satoshi'] leading-6">
                                {step.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default HowItWorks;
