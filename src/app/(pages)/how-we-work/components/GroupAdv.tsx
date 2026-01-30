import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

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
                <div className="flex-1 flex flex-col gap-8">
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

                {/* Left Image Section */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="relative rounded-3xl overflow-hidden w-full max-w-[660px] aspect-[620/550]">
                        <Image
                            src="/png/S31.jpg"
                            alt="Discover Group Adventures"
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

export default GroupAdv;
