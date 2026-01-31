'use client';

import React from 'react';
import { Share2 } from 'lucide-react';
import Link from 'next/link';

interface CTASectionProps {
    onShareClick: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onShareClick }) => {
    return (
        <section className="py-16 px-6 md:px-12 lg:px-16 flex justify-center">
            <div className="w-full max-w-3xl bg-neutral-900 rounded-3xl p-12 flex flex-col items-center gap-6">
                <h3 className="text-white text-3xl font-bold font-['Satoshi'] leading-10 text-center">
                    Start sharing today
                </h3>
                <p className="text-white/70 text-base font-medium font-['Satoshi'] leading-6 text-center">
                    Share your code via WhatsApp, email, or social media
                </p>
                <button
                    onClick={onShareClick}
                    className="bg-white rounded-xl px-6 py-4 flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                    <Share2 size={20} className="text-neutral-900" />
                    <span className="text-neutral-900 text-base font-bold font-['Satoshi'] leading-6">
                        Share Now
                    </span>
                </button>
                <p className="text-white/60 text-sm font-medium font-['Satoshi'] leading-5 text-center mt-2">
                    <Link href="/referral-policy" className="underline hover:text-white/80 transition-colors">
                        Terms and conditions
                    </Link> apply
                </p>
            </div>
        </section>
    );
};

export default CTASection;
