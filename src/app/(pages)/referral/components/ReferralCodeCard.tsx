'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ReferralCodeCardProps {
    referralCode: string;
}

const ReferralCodeCard: React.FC<ReferralCodeCardProps> = ({ referralCode }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-8 px-6 md:px-12 lg:px-16 flex justify-center">
            <div className="w-full max-w-3xl bg-gradient-to-b from-neutral-900 to-zinc-800 rounded-3xl p-8 md:p-12 flex flex-col gap-6">
                {/* Your Referral Code Label */}
                <div className="flex items-center gap-2">
                    <Copy size={20} className="text-white" />
                    <span className="text-white text-sm font-medium font-['Satoshi'] leading-5">
                        Your Referral Code
                    </span>
                </div>

                {/* Code Display */}
                <div className="bg-white/10 rounded-xl border border-white/20 px-6 py-6 flex items-center justify-center">
                    <span className="text-white text-3xl md:text-4xl font-bold font-['Satoshi'] leading-tight">
                        {referralCode}
                    </span>
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopyCode}
                    className="bg-white rounded-xl px-6 py-4 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                    {copied ? (
                        <>
                            <Check size={20} className="text-neutral-900" />
                            <span className="text-neutral-900 text-base font-bold font-['Satoshi'] leading-6">
                                Copied!
                            </span>
                        </>
                    ) : (
                        <>
                            <Copy size={20} className="text-neutral-900" />
                            <span className="text-neutral-900 text-base font-bold font-['Satoshi'] leading-6">
                                Copy Code
                            </span>
                        </>
                    )}
                </button>
            </div>
        </section>
    );
};

export default ReferralCodeCard;
