'use client';

import React from 'react';
import { Plane, Compass, MapPin, Globe2 } from 'lucide-react';

const MobileTrustSection: React.FC = () => {
  return (
    <section className="relative px-4 py-10 overflow-hidden">

      {/* Ambient background icons — same treatment as desktop */}
      <Globe2 className="absolute -right-8 top-3/5 -translate-y-1/2 w-56 h-56 text-neutral-800 opacity-[0.07] rotate-12 pointer-events-none" />
      <Plane  className="absolute top-4 right-2 w-16 h-16 text-neutral-800 opacity-[0.06] rotate-[20deg] pointer-events-none" />
      <Plane  className="absolute bottom-6 left-0 w-12 h-12 text-neutral-800 opacity-[0.05] -rotate-[15deg] pointer-events-none" />

      <div className="flex flex-col gap-0">

        {/* Block 1 — left-aligned */}
        <div className="flex gap-4">
          {/* Travel route spine — runs full height of both blocks */}
          <div className="flex flex-col items-center pt-1 shrink-0">
            <Plane   className="w-[15px] h-[15px] text-neutral-400 rotate-90" />
            <div className="w-px flex-1 bg-neutral-200 my-2" />
          </div>

          {/* Content */}
          <div className="pb-8">
            <h2 className="text-neutral-900 text-[30px] font-black leading-[1.1] tracking-tight font-['Satoshi']">
              You&apos;ll meet strangers.<br />
              Leave with{' '}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-0.5 h-[8px] bg-[#D0EF65] rounded-sm z-0" />
                <span className="relative z-10">friends.</span>
              </span>
            </h2>
            <p className="mt-4 text-neutral-500 text-[14px] leading-relaxed max-w-[280px]">
              Solo travel works best in a group. Ours cap at 15 — intentionally small so everyone&apos;s a real part of the trip, not a number on a manifest.
            </p>
          </div>
        </div>

        {/* Connector mid-point */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center shrink-0 w-[15px]">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            <div className="w-px h-6 bg-neutral-200" />
            <Compass className="w-[15px] h-[15px] text-neutral-400" />
            <div className="w-px h-6 bg-neutral-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            <div className="w-px flex-1 bg-neutral-200 mt-2" />
          </div>
          <div className="pb-0" />
        </div>

        {/* Block 2 — right-aligned */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center shrink-0 pt-1">
            <div className="w-px h-full bg-neutral-200" />
            <MapPin className="w-[15px] h-[15px] text-neutral-400 mt-2" />
          </div>

          {/* Content pushed right */}
          <div className="flex-1 flex justify-end pt-2">
            <div className="text-right max-w-[280px]">
              <h2 className="text-neutral-900 text-[30px] font-black leading-[1.1] tracking-tight font-['Satoshi']">
                50+ brands.<br />
                <span className="relative inline-block">
                  <span className="absolute inset-x-0 bottom-0.5 h-[8px] bg-[#D0EF65] rounded-sm z-0" />
                  <span className="relative z-10">One place.</span>
                </span>
              </h2>
              <p className="mt-4 text-neutral-500 text-[14px] leading-relaxed">
                No tab-switching. No comparing screenshots. Every vetted operator in India, browsable and bookable right here.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MobileTrustSection;
