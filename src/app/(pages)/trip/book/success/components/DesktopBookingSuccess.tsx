'use client';

import React from 'react';
// import { DeviceMobileIcon } from '@phosphor-icons/react';

interface DesktopBookingSuccessProps {
    children: React.ReactNode;
    showMobileNotice?: boolean;
    isEvent?: boolean;
}

// The "complete details on mobile" notice is disabled: Wondrr has no mobile app yet.
// Restore the commented block (and the import above) when there is one.
export default function DesktopBookingSuccess({ children }: DesktopBookingSuccessProps) {
    return (
        <div className="min-h-screen bg-[#fff9f4] flex justify-center">
            <div className="w-full max-w-md relative">
                {/* {showMobileNotice && (
                    <div className="px-5 pt-6">
                        <div className="flex items-start gap-3 bg-[#E2F4A6] rounded-xl px-4 py-3.5">
                            <DeviceMobileIcon size={20} weight="fill" className="text-black flex-shrink-0 mt-0.5" />
                            <p className="text-[13px] text-black leading-[1.5] tracking-tight">
                                Completing your {isEvent ? 'participant' : 'passenger'} details is currently available on mobile only. Please open Wondrr on your phone and log in to continue filling in your {isEvent ? 'event' : 'trip'} details.
                            </p>
                        </div>
                    </div>
                )} */}
                {children}
            </div>
        </div>
    );
}
