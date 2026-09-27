'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Backpack, Plane } from 'lucide-react';

interface ClosingCtaProps {
  variant?: 'desktop' | 'mobile';
}

// Last chapter of the landing story — one push back into trips.
const ClosingCta: React.FC<ClosingCtaProps> = ({ variant = 'desktop' }) => {
  const compact = variant === 'mobile';

  return (
    <section
      className={`relative w-full overflow-hidden rounded-3xl bg-[#EEA0FF] flex ${
        compact ? 'flex-col gap-6 px-5 py-9' : 'items-center justify-between gap-10 px-14 py-14'
      }`}
    >
      <Plane
        className={`absolute text-white/30 rotate-12 pointer-events-none ${compact ? '-right-6 -top-4 w-28 h-28' : 'right-[28%] -top-10 w-52 h-52'}`}
        strokeWidth={1}
      />
      <Backpack
        className={`absolute text-white/25 -rotate-12 pointer-events-none ${compact ? '-left-4 -bottom-6 w-24 h-24' : 'right-6 -bottom-10 w-44 h-44'}`}
        strokeWidth={1}
      />

      <div className="relative z-10 flex flex-col gap-3">
        <h2
          className={`text-neutral-900 font-bold leading-[1.15] tracking-tight font-['Satoshi'] ${
            compact ? 'text-[28px]' : 'text-[42px]'
          }`}
        >
          Your friends are{' '}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-[10px] bg-[#D0EF65] rounded-sm z-0" />
            <span className="relative z-10">already packing.</span>
          </span>
        </h2>
        <p className={`text-neutral-800 max-w-md ${compact ? 'text-sm' : 'text-[15px]'}`}>
          Small groups, vetted operators, and a seat with your name on it. Pick a trip and meet them there.
        </p>
      </div>

      <Link
        href="/trips"
        className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-neutral-900 shadow-sm hover:-translate-y-0.5 transition-transform whitespace-nowrap ${
          compact ? 'w-full' : ''
        }`}
      >
        Find my trip
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D0EF65]">
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </section>
  );
};

export default ClosingCta;
