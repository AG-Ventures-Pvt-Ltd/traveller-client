'use client';

import React from 'react';

interface ProgressTrackerProps {
    progress: number;
    target: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress, target }) => {
    const progressPercentage = Math.min((progress / target) * 100, 100);
    const remaining = Math.max(target - progress, 0);

    return (
        <section className="py-8 px-6 md:px-12 lg:px-16 flex justify-center">
            <div className="w-full max-w-3xl bg-neutral-50 rounded-3xl p-8 md:p-10 flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-neutral-900 text-3xl font-bold font-['Satoshi'] leading-10">
                            Your Progress
                        </h3>
                        <p className="text-neutral-700 text-base font-medium font-['Satoshi'] leading-6">
                            Track your journey to a free trip
                        </p>
                    </div>

                    <div className="bg-white rounded-xl px-5 py-4 flex flex-col items-center min-w-[96px]">
                        <span className="text-neutral-900 text-3xl font-bold font-['Satoshi'] leading-tight">
                            {progress}/{target}
                        </span>
                        <span className="text-neutral-700 text-sm font-medium font-['Satoshi'] leading-5">
                            Referrals
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="flex flex-col gap-3">
                    <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-neutral-900 rounded-full h-4 transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-neutral-700 text-xs font-medium font-['Satoshi'] leading-4">
                            0
                        </span>
                        <span className="text-neutral-900 text-xs font-bold font-['Satoshi'] leading-4">
                            {target} trips
                        </span>
                    </div>
                </div>

                {/* Status Message */}
                <div className="bg-white rounded-xl border-2 border-gray-200 px-4 py-4 flex items-center justify-center">
                    <p className="text-neutral-900 text-base font-medium font-['Satoshi'] leading-6 text-center">
                        {remaining === 0
                            ? '🎉 Congratulations! You\'ve earned a free trip!'
                            : `${remaining} more successful booking${remaining !== 1 ? 's' : ''} until your free trip!`}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProgressTracker;
