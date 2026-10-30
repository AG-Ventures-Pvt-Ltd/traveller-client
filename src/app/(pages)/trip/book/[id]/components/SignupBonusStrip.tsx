'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getData } from '@/services/baseApi';
import { GiftIcon, WalletIcon } from '@phosphor-icons/react';
import { useSignupBonus } from '@/common/hooks/useSignupBonus';

// Logged-in: note that Wondrr Cash auto-applies on the next page, with the per-booking cap.
// Guests: signup-bonus pitch, only while the offer is live; sends them to signup and
// back to this exact booking URL (batch/step/bookingId preserved).
// Same card language as the rest of the booking form: bordered white card, lime accent chip.
const CARD = 'border border-[#D9D9D9] rounded-2xl px-4 py-3 flex items-center gap-3';
const ICON_CHIP = 'w-9 h-9 rounded-full bg-[#E2F4A6] text-[#3F6212] flex items-center justify-center shrink-0';

export default function SignupBonusStrip({ isFree = false }: { isFree?: boolean }) {
  const { status } = useSession();
  const { data } = useSignupBonus();
  const pathname = usePathname();
  const search = useSearchParams().toString();

  const bonus = data?.signupBonus;
  const authed = status === 'authenticated';

  // Own key: useGetData pins staleTime to Infinity, which would show a stale balance after a booking.
  const { data: wallet } = useQuery({
    queryKey: ['booking-wallet-balance'],
    queryFn: () => getData<{ balance: number }>('/api/client/v1/wallet/balance'),
    enabled: authed && !isFree,
  });

  if (authed) {
    if (isFree || !wallet?.balance) return null;
    return (
      <div className={CARD}>
        <div className={ICON_CHIP}><WalletIcon size={18} weight="bold" /></div>
        <p className="text-sm font-normal text-neutral-800">
          <span className="font-bold text-black">₹{wallet.balance.toLocaleString('en-IN')} Wondrr Cash</span> available in your wallet, will be applied automatically on checkout page
        </p>
      </div>
    );
  }

  if (status !== 'unauthenticated' || !bonus?.isEnabled) return null;

  const href = `/auth?mode=signup&method=otp&redirectUrl=${encodeURIComponent(pathname + (search ? `?${search}` : ''))}`;

  return (
    <div className={CARD}>
      <div className={ICON_CHIP}><GiftIcon size={18} weight="bold" /></div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-sm font-medium text-black">Get ₹{bonus.amount.toLocaleString('en-IN')} Wondrr Cash free</p>
        <p className="text-xs text-neutral-600">Sign up before you pay.</p>
      </div>
      <Link
        href={href}
        className="shrink-0 bg-[#FFD976] text-black text-xs font-semibold rounded-full px-3.5 py-2 whitespace-nowrap"
      >
        Sign up
      </Link>
    </div>
  );
}
