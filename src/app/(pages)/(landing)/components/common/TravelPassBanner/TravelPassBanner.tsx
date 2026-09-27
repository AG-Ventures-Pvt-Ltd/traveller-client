'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, Users, ShieldCheck, ArrowRight, Plane } from 'lucide-react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { getPlanHighlights } from '@/app/(pages)/travel-pass/constants';
import { PassTicket } from '@/app/(pages)/travel-pass/components/PassTicket';
import type { SipPlan, PaymentConfig } from '@/app/(pages)/travel-pass/types';

interface TravelPassBannerProps {
  variant?: 'desktop' | 'mobile';
}

const PERKS = [
  { icon: Gift, label: 'Bonus when you hit your target' },
  { icon: Users, label: 'Save together with friends' },
  { icon: ShieldCheck, label: 'Cancel anytime, keep what you paid' },
];

const TravelPassBanner: React.FC<TravelPassBannerProps> = ({ variant = 'desktop' }) => {
  const compact = variant === 'mobile';
  // Same queryKey as the /travel-pass page, so the plans are cached for it.
  const { data } = useGetData<SipPlan[]>(API_ENDPOINTS.SIP.PLANS, { queryKey: ['sip-plans'] });
  const { data: paymentConfig } = useGetData<PaymentConfig>(API_ENDPOINTS.PAYMENTS.CONFIG, { queryKey: ['payment-config'] });
  // Razorpay can't bill daily — lead with weekly there (see leadCadence).
  const dailyAvailable = paymentConfig?.subscriptionGateway !== 'razorpay';
  const stats = getPlanHighlights(data ?? [], dailyAvailable);

  return (
    <section
      className={`relative w-full overflow-hidden grid ${
        compact ? 'gap-8 px-5 py-8' : 'grid-cols-[1fr_auto] items-center gap-16 px-14 py-12'
      }`}
    >
      <Plane
        className={`absolute text-neutral-800 opacity-[0.12] rotate-12 pointer-events-none ${
          compact ? '-right-8 top-4 w-28 h-28' : 'left-[42%] -bottom-12 w-56 h-56'
        }`}
        strokeWidth={1}
      />

      <div className="relative z-10 flex flex-col gap-5">
        <h2
          className={`text-neutral-900 font-bold leading-[1.15] tracking-tight font-['Satoshi'] ${
            compact ? 'text-[28px]' : 'text-[42px]'
          }`}
        >
          That trip you keep postponing?
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-[10px] bg-[#D0EF65] rounded-sm z-0" />
            <span className="relative z-10">Start saving for it.</span>
          </span>
        </h2>

        <p className={`text-neutral-600 leading-relaxed max-w-md ${compact ? 'text-sm' : 'text-[15px]'}`}>
          {stats
            ? `Put aside just ₹${stats.fromAmount.toLocaleString('en-IN')} a ${stats.unit} on auto-pay. Reach your target and we add up to ${stats.maxBonusPct}% extra as Wondrr Cash for your trip.`
            : 'Put aside a little every day on auto-pay. Reach your target and we add a bonus as Wondrr Cash for your trip.'}
        </p>

        <ul className="flex flex-col gap-2.5">
          {PERKS.map((perk) => (
            <li key={perk.label} className="flex items-center gap-2.5 text-sm text-neutral-800">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-neutral-200">
                <perk.icon className="w-3.5 h-3.5 text-[#b35cc8]" />
              </span>
              {perk.label}
            </li>
          ))}
        </ul>

        <Link
          href="/travel-pass"
          className={`mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#EEA0FF] px-6 py-3 font-semibold text-neutral-900 hover:opacity-90 transition-opacity ${
            compact ? 'w-full' : 'w-fit'
          }`}
        >
          Explore Travel Pass <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {stats && (
        <Link href="/travel-pass" className={`relative z-10 block ${compact ? 'px-2' : 'w-[360px] rotate-2'}`}>
          <PassTicket plan={stats.featured} dailyAvailable={dailyAvailable} />
        </Link>
      )}
    </section>
  );
};

export default TravelPassBanner;
