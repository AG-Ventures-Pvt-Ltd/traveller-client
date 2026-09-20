'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Check, Copy, TicketPercent, X } from 'lucide-react';
import { usePromoCoupon } from '@/common/hooks/usePromoCoupon';

// Per-session so a dismissal sticks while browsing but the offer gets another
// shot on the next visit.
const DISMISS_KEY = 'wondrr_promo_dismissed_code';

const formatDiscount = (
    discountType: 'percentage' | 'fixed' | 'people_count',
    discountValue: number,
    maxDiscountAmount: number | null
) => {
    if (discountType === 'percentage') {
        return maxDiscountAmount
            ? `${discountValue}% OFF up to ₹${maxDiscountAmount.toLocaleString('en-IN')}`
            : `${discountValue}% OFF`;
    }
    if (discountType === 'people_count') {
        return `₹${discountValue.toLocaleString('en-IN')} OFF per traveller`;
    }
    return `₹${discountValue.toLocaleString('en-IN')} OFF`;
};

const PromoCouponBanner: React.FC = () => {
    const pathname = usePathname();
    // Mounted in the shared layout (stacked with the navbar so both stick as one
    // block) but only promoted on the landing page.
    const { data } = usePromoCoupon(pathname === '/');
    const router = useRouter();
    const [copied, setCopied] = React.useState(false);
    const [dismissed, setDismissed] = React.useState(true); // stays hidden until the stored code is checked

    const promo = data?.promoCoupon;
    const code = promo?.isEnabled ? promo.code : null;

    // Dismissal is keyed to the code, so a new promo shows again even in the
    // same session.
    React.useEffect(() => {
        if (!code) return;
        try {
            setDismissed(sessionStorage.getItem(DISMISS_KEY) === code);
        } catch {
            setDismissed(false);
        }
    }, [code]);

    if (pathname !== '/' || !promo?.isEnabled || dismissed) return null;

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(promo.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard is blocked on insecure origins and some in-app browsers;
            // the code is on screen either way, so there is nothing to recover.
        }
    };

    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDismissed(true);
    };

    return (
        <div
            onClick={() => router.push('/trips')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && router.push('/trips')}
            className="w-full cursor-pointer bg-neutral-900 text-white px-4 py-2.5 md:px-9 md:py-3 flex items-center gap-3 md:gap-6"
        >
            <TicketPercent className="w-5 h-5 md:w-6 md:h-6 text-[#D0EF65] shrink-0" strokeWidth={2} />

            <div className="min-w-0 flex-1">
                <p className="font-bold text-sm md:text-base truncate">
                    {formatDiscount(promo.discountType, promo.discountValue, promo.maxDiscountAmount)}
                </p>
                <p className="text-neutral-400 text-[11px] md:text-sm truncate">
                    {promo.headline}
                    {promo.minOrderAmount > 0 && ``}
                </p>
            </div>

            <button
                onClick={handleCopy}
                aria-label={`Copy coupon code ${promo.code}`}
                className="shrink-0 flex items-center gap-1.5 rounded-full bg-[#D0EF65] text-neutral-900 font-semibold px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm hover:bg-lime-200 transition-colors cursor-pointer"
            >
                {copied ? <Check className="w-4 h-4" strokeWidth={2.5} /> : <Copy className="w-4 h-4" strokeWidth={2.5} />}
                {copied ? 'Copied' : promo.code}
            </button>

            <button
                onClick={handleDismiss}
                aria-label="Dismiss offer"
                className="shrink-0 text-neutral-500 hover:text-white transition-colors p-1"
            >
                <X className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default PromoCouponBanner;
