'use client';

import React from 'react';
import { Plane, Compass, MapPin, Globe2, Mountain } from 'lucide-react';

const DesktopTrustSection: React.FC = () => {
  return (
    <section className="w-full px-24 py-20 relative overflow-hidden">

      {/* Large ambient travel icons — background texture */}
      <Globe2   className="absolute -right-8 top-1/2 -translate-y-1/2 w-80 h-80 text-neutral-800 opacity-[0.25] rotate-12 pointer-events-none" />
      <Mountain className="absolute -left-6 bottom-0 w-64 h-64 text-neutral-800 opacity-[0.2] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center">

        {/* Left — group / connection */}
        <div className="flex flex-col gap-6 pr-16">
          
          <h2 className="text-neutral-900 text-5xl font-black leading-[1.1] tracking-tight font-['Satoshi']">
            You&apos;ll meet strangers.<br />
            Leave with{' '}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-0.5 h-[10px] bg-[#D0EF65] rounded-sm z-0" />
              <span className="relative z-10">friends.</span>
            </span>
          </h2>
          <p className="text-neutral-500 text-[15px] leading-relaxed max-w-[320px]">
            Solo travel works best in a group. Ours cap at 15 — intentionally small so everyone&apos;s a real part of the trip, not a number on a manifest.
          </p>
        </div>

        {/* Central travel route — visual connector */}
        <div className="flex flex-col items-center gap-2.5 px-12">
          <Plane   className="w-[18px] h-[18px] text-neutral-400 rotate-90" />
          <div className="w-px h-8 bg-neutral-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          <div className="w-px h-8 bg-neutral-200" />
          <Compass className="w-[18px] h-[18px] text-neutral-400" />
          <div className="w-px h-8 bg-neutral-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          <div className="w-px h-8 bg-neutral-300" />
          <MapPin  className="w-[18px] h-[18px] text-neutral-400" />
        </div>

        {/* Right — platform / brands */}
        <div className="flex flex-col gap-6 pl-16">
          
          <h2 className="text-neutral-900 text-5xl font-black leading-[1.1] tracking-tight font-['Satoshi']">
            50+ brands.<br />
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-0.5 h-[10px] bg-[#D0EF65] rounded-sm z-0" />
              <span className="relative z-10">One place.</span>
            </span>
          </h2>
          <p className="text-neutral-500 text-[15px] leading-relaxed max-w-[320px]">
            No tab-switching. No comparing screenshots. Every vetted operator in India, browsable and bookable right here.
          </p>
        </div>

      </div>
    </section>
  );
};

export default DesktopTrustSection;
