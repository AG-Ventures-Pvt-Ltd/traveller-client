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
      className={`relative w-full overflow-hidden flex flex-col ${compact ? 'gap-6 py-9' : 'gap-7 py-4'}`}
    >
      <Plane
        className={`absolute text-neutral-800 opacity-[0.12] rotate-12 pointer-events-none ${compact ? '-right-6 -top-4 w-28 h-28' : 'right-24 -top-6 w-40 h-40'}`}
        strokeWidth={1}
      />
      <Backpack
        className={`absolute text-neutral-800 opacity-[0.1] -rotate-12 pointer-events-none ${compact ? '-left-4 -bottom-6 w-24 h-24' : 'right-0 -bottom-8 w-36 h-36'}`}
        strokeWidth={1}
      />

      <div className="relative z-10 flex flex-col gap-3">
        <h2
          className={`text-neutral-900 font-bold leading-[1.15] tracking-tight font-['Satoshi'] ${
            compact ? 'text-[28px]' : 'text-[38px]'
          }`}
        >
          Your friends are{' '}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-[10px] bg-[#D0EF65] rounded-sm z-0" />
            <span className="relative z-10">already packing.</span>
          </span>
        </h2>
        <p className={`text-neutral-500 max-w-md ${compact ? 'text-sm' : 'text-[15px]'}`}>
          Small groups, vetted operators, and a seat with your name on it. Pick a trip and meet them there.
        </p>
      </div>

      <Link
        href="/trips"
        className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-xl bg-[#EEA0FF] px-7 py-3.5 font-semibold text-neutral-900 hover:-translate-y-0.5 transition-transform whitespace-nowrap ${
          compact ? 'w-full' : 'w-fit'
        }`}
      >
        Find my trip
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </section>
  );
};

export default ClosingCta;
