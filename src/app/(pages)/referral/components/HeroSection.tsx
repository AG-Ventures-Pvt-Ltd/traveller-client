'use client';

import React from 'react';
import { Gift } from 'lucide-react';

interface HeroSectionProps {
    target?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ target = 8 }) => {
    return (
        <section className="py-16 px-6 md:px-12 lg:px-16 flex flex-col items-center gap-8">
            {/* Badge */}
            <div className="bg-neutral-50 rounded-full px-4 py-2 flex items-center gap-2">
                <Gift size={16} className="text-neutral-900" />
                <span className="text-neutral-900 text-sm font-medium font-['Satoshi'] leading-5">
                    Referral Program
                </span>
            </div>

            {/* Title */}
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-neutral-900 text-5xl md:text-6xl font-bold font-['Satoshi'] leading-tight text-center">
                    Refer friends,
                </h1>
                <h1 className="text-neutral-900 text-5xl md:text-6xl font-bold font-['Satoshi'] leading-tight text-center">
                    earn free trips
                </h1>
            </div>

            {/* Description */}
            <p className="text-neutral-700 text-lg md:text-xl font-medium font-['Satoshi'] leading-8 text-center max-w-2xl">
                Share your love for travel and get rewarded. For every {target} successful bookings through your code, you earn a complimentary trip.
            </p>
        </section>
    );
};

export default HeroSection;
