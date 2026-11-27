'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getData } from '@/services/baseApi';
import { useState } from 'react';
import { CheckIcon, CopyIcon, GiftIcon, InfoIcon, TicketIcon, WalletIcon } from '@phosphor-icons/react';
import { useSignupBonus } from '@/common/hooks/useSignupBonus';
import { formatDiscount, usePromoCoupon } from '@/common/hooks/usePromoCoupon';
import { MAX_WONDRR_CASH_PER_BOOKING } from '@/common/constants/wondrrCash';

// Logged-in: note that Wondrr Cash auto-applies on the next page, with the per-booking cap.
// Guests: signup-bonus pitch, only while the offer is live; sends them to signup and
// back to this exact booking URL (batch/step/bookingId preserved).
// Same card language as the rest of the booking form: bordered white card, lime accent chip.
const CARD = 'border border-[#D9D9D9] rounded-2xl px-4 py-3 flex items-center gap-3';
const ICON_CHIP = 'w-9 h-9 rounded-full bg-[#E2F4A6] text-[#3F6212] flex items-center justify-center shrink-0';

export default function SignupBonusStrip({ isFree = false }: { isFree?: boolean }) {
  return (
    <>
      {!isFree && <PromoCouponCard />}
      <WondrrCashCard isFree={isFree} />
    </>
  );
}

// Admin's promo coupon (the same one the landing banner shows): code + copy, since the
// user types it into the coupon box on the review step.
function PromoCouponCard() {
  const { data } = usePromoCoupon();
  const [copied, setCopied] = useState(false);
  const promo = data?.promoCoupon;
  if (!promo?.isEnabled) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(promo.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure origin / in-app browser); the code is on screen anyway.
    }
  };

  return (
    <div className={CARD}>
      <div className={ICON_CHIP}><TicketIcon size={18} weight="bold" /></div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-sm font-medium text-black">
          {formatDiscount(promo.discountType, promo.discountValue, promo.maxDiscountAmount)}
        </p>
        <p className="text-xs text-neutral-600">
          Use code <span className="font-semibold text-black">{promo.code}</span> at checkout
          {promo.minOrderAmount > 0 && ` · min order ₹${promo.minOrderAmount.toLocaleString('en-IN')}`}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy coupon code ${promo.code}`}
        className="shrink-0 flex items-center gap-1 bg-[#FFD976] text-black text-xs font-semibold rounded-full px-3.5 py-2 whitespace-nowrap"
      >
        {copied ? <CheckIcon size={14} weight="bold" /> : <CopyIcon size={14} weight="bold" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function WondrrCashCard({ isFree }: { isFree: boolean }) {
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
          {wallet.balance > MAX_WONDRR_CASH_PER_BOOKING ? (
            <>
              <span className="font-bold text-black">₹{MAX_WONDRR_CASH_PER_BOOKING.toLocaleString('en-IN')} Wondrr Cash</span> will be applied automatically on checkout{' '}
              <CapNote balance={wallet.balance} />
            </>
          ) : (
            <>
              <span className="font-bold text-black">₹{wallet.balance.toLocaleString('en-IN')} Wondrr Cash</span> available in your wallet, will be applied automatically on checkout page
            </>
          )}
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

// The cap is a footnote, not the headline: hover (desktop) or tap (mobile) the ⓘ to read it.
function CapNote({ balance }: { balance: number }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-flex align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="Wondrr Cash limit per booking"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        className="text-neutral-500 hover:text-black"
      >
        <InfoIcon size={16} weight="bold" />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full right-0 mb-2 w-56 rounded-xl bg-neutral-900 px-3 py-2 text-xs text-white shadow-lg z-20"
        >
          You have ₹{balance.toLocaleString('en-IN')}, max ₹{MAX_WONDRR_CASH_PER_BOOKING.toLocaleString('en-IN')} can be used at once.
        </span>
      )}
    </span>
  );
}
