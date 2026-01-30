import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const PartnerGrowth = () => {
    const features = [
        'Real-time booking and revenue tracking',
        'Customer demographics and behavior insights',
        'Seasonal trend analysis and forecasting',
        'Competitive pricing recommendations',
    ];

    return (
        <div className="bg-white py-16 px-6 md:px-12 lg:px-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                {/* Left Content Section */}
                <div className="flex-1 flex flex-col gap-8">
                    {/* Badge */}
                    <div className="inline-flex items-center justify-center bg-neutral-50 rounded-full px-4 py-2 self-start">
                        <span className="text-neutral-900 text-sm font-medium font-['Satoshi'] leading-5">
                            Growth Opportunities
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-neutral-900 text-4xl font-medium font-['Satoshi'] leading-10">
                            Scale Your Business
                        </h2>
                        <h2 className="text-neutral-700 text-4xl font-medium font-['Satoshi'] leading-10">
                            With Data-Driven Insights
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-700 text-base font-medium font-['Satoshi'] leading-6">
                        Access powerful analytics to understand your audience, optimize pricing, and identify growth opportunities. Our platform provides you with the insights you need to make informed business decisions.
                    </p>

                    {/* Features List */}
                    <div className="flex flex-col gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                {/* Checkmark Icon */}
                                <div className="size-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 size={16} className="text-white" />
                                </div>

                                {/* Feature Text */}
                                <span className="text-neutral-900 text-base font-medium font-['Satoshi'] leading-6">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="relative rounded-3xl overflow-hidden w-full max-w-[660px] aspect-[620/550]">
                        <Image
                            src="/png/b1.png"
                            alt="Growth Analytics Dashboard"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerGrowth;
