"use client";

import { Clock, UserCheck, ThumbsUp } from "lucide-react";

interface HostPerformanceProps {
    stats: {
        responseRate?: number;
        avgResponseTime?: string;
        confirmationRate?: number;
    };
}

export function HostPerformance({ stats }: HostPerformanceProps) {
    // Only show if we have at least one stat with meaningful data
    const hasData = (stats.responseRate && stats.responseRate > 0) ||
        stats.avgResponseTime ||
        (stats.confirmationRate && stats.confirmationRate > 0);

    if (!hasData) {
        return null;
    }

    return (
        <div className="px-6 sm:px-9 pt-6 sm:pt-9 pb-4 sm:pb-6 bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-200">
            <h2 className="text-neutral-900 text-2xl sm:text-3xl font-bold font-['Satoshi'] mb-5 sm:mb-7">
                Host Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {stats.responseRate && stats.responseRate > 0 && (
                    <div className="flex gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <ThumbsUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-neutral-900 text-3xl sm:text-4xl font-bold font-['Satoshi']">
                                {stats.responseRate}%
                            </span>
                            <span className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi']">
                                Response Rate
                            </span>
                            <span className="text-neutral-500 text-xs sm:text-sm font-['Satoshi']">
                                Replies to inquiries quickly
                            </span>
                        </div>
                    </div>
                )}

                {stats.avgResponseTime && (
                    <div className="flex gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-neutral-900 text-3xl sm:text-4xl font-bold font-['Satoshi']">
                                {stats.avgResponseTime}
                            </span>
                            <span className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi']">
                                Response Time
                            </span>
                            <span className="text-neutral-500 text-xs sm:text-sm font-['Satoshi']">
                                Average time to respond
                            </span>
                        </div>
                    </div>
                )}

                {stats.confirmationRate && stats.confirmationRate > 0 && (
                    <div className="flex gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <UserCheck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-neutral-900 text-3xl sm:text-4xl font-bold font-['Satoshi']">
                                {stats.confirmationRate}%
                            </span>
                            <span className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi']">
                                Confirmation Rate
                            </span>
                            <span className="text-neutral-500 text-xs sm:text-sm font-['Satoshi']">
                                Accepts most bookings
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
