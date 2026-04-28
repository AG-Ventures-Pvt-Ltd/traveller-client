'use client';

import React from 'react';
import { CircleNotch } from '@phosphor-icons/react';

export default function LoadingState() {
    return (
        <div className="min-h-screen bg-[#fff9f4] flex flex-col pb-28">
            <div className="flex flex-col items-center gap-5 px-5 pt-14">
                {/* Spinner icon */}
                <CircleNotch size={162} weight="bold" className="text-[#ffc107] animate-spin" />

                {/* Title + subtitle */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <h1 className="text-[20px] font-semibold text-black tracking-tight">
                        Processing...
                    </h1>
                    <p className="text-[14px] text-black leading-5 tracking-tight">
                        Please wait while we confirm your booking.
                    </p>
                </div>

                {/* Skeleton payment details card */}
                <div className="w-full mt-2 flex flex-col gap-3.5">
                    <div className="h-5 w-32 bg-[#d9d9d9] rounded-md animate-pulse" />
                    <div className="border border-[#d9d9d9] rounded-2xl overflow-hidden">
                        <div className="flex flex-col gap-2.5 px-3 py-5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="h-4 w-24 bg-[#e0e0e0] rounded animate-pulse" />
                                    <div className="h-4 w-20 bg-[#e0e0e0] rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed bottom skeleton CTA */}
            <div className="fixed bottom-0 left-0 right-0 px-5 py-6 bg-[#fff9f4]">
                <div className="w-full h-[51px] bg-[#ffc107]/30 rounded-xl animate-pulse" />
            </div>
        </div>
    );
}