'use client';

import React from 'react';
import { ConfettiIcon, RocketLaunchIcon, UsersThreeIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

interface DesktopStatsBannerProps {
  variant: 'signup' | 'stats';
  amount?: number;
  count?: number;
}

const DesktopStatsBanner: React.FC<DesktopStatsBannerProps> = ({ variant, amount, count }) => {
  const router = useRouter();

  if (variant === 'signup' && amount) {
    return (
      <div className="flex-1 bg-[#111111] rounded-2xl px-8 py-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FFC107]/10 flex items-center justify-center flex-shrink-0">
            <RocketLaunchIcon size={24} className="text-[#FFC107]" weight="thin" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-neutral-400 text-sm font-medium">New here?</p>
            <p className="text-white text-base font-semibold">
              Get <span className="text-[#FFC107] text-2xl font-black">₹{amount.toLocaleString('en-IN')}</span> Wondrr Cash free on signup
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push('/auth')}
          className="flex-shrink-0 bg-[#FFC107] text-black text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#e6ad06] transition-colors whitespace-nowrap"
        >
          Sign Up Free →
        </button>
      </div>
    );
  }

  if (variant === 'stats' && count !== undefined) {
    return (
      <div className="flex-1 bg-[#FFC107] rounded-2xl px-8 py-6 flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-5xl font-black text-neutral-900 leading-none">
            {count.toLocaleString('en-IN')}+
          </span>
          <span className="text-neutral-700 text-sm font-medium mt-1">travelers last month</span>
        </div>
        <div className="w-px h-12 bg-neutral-900/15" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <UsersThreeIcon size={20} className="text-neutral-800" weight="thin" />
            <p className="text-neutral-800 text-sm font-semibold">Booked with Wondrr</p>
          </div>
          <p className="text-neutral-600 text-xs font-medium">Join a growing community of solo travelers</p>
        </div>
        <ConfettiIcon size={40} className="ml-auto text-neutral-800 opacity-30 flex-shrink-0" weight="thin" />
      </div>
    );
  }

  return null;
};

export default DesktopStatsBanner;
