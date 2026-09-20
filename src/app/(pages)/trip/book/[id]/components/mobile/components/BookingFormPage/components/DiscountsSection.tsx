'use client';

import { useEffect, useMemo, useState } from 'react';
import { TagIcon, X } from '@phosphor-icons/react';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import Button from '@/common/ui/Buttons/Button';
import CustomInput from '@/common/ui/CustomInput';
import { useBookingFormStore } from '../hooks/useBookingFormStore';
import type { Coupon } from '../types';
import { baseAPI } from '@/services/baseApi';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface DiscountsSectionProps {
    tripId: string;
    /** Order total before any coupon, used to preview the best available saving. */
    orderAmount?: number;
    onViewCoupons?: () => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function DiscountsSection({
    tripId,
    orderAmount,
    onViewCoupons,
    isOpen,
    onToggle,
}: DiscountsSectionProps) {
    const { email, appliedCoupon, setAppliedCoupon } = useBookingFormStore();

    // Same endpoint and query key as AllCouponsPage, so React Query serves both
    // from one request. booking-options does not return coupons.
    const { data: coupons } = useGetData<Coupon[]>(
        API_ENDPOINTS.DISCOUNTS.GET_AVAILABLE(tripId, email),
        { queryKey: ['discounts', tripId, email] }
    );
    const [inputValue, setInputValue] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [couponError, setCouponError] = useState('');

    const handleApplyCoupon = async () => {
        const code = inputValue.trim();
        if (!code) return;
        setCouponError('');

        // Check local list first (public coupons — no round-trip needed)
        const localCoupon = coupons?.find(c => c.code.toLowerCase() === code.toLowerCase());
        if (localCoupon) {
            setAppliedCoupon(localCoupon);
            setInputValue('');
            return;
        }

        // Not in public list — validate via server (handles secret coupons)
        setIsValidating(true);
        try {
            const response = await baseAPI.get(API_ENDPOINTS.DISCOUNTS.VALIDATE_COUPON(tripId, code));
            setAppliedCoupon(response.data.data);
            setInputValue('');
        } catch (err) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Invalid coupon code';
            setCouponError(msg);
        } finally {
            setIsValidating(false);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setInputValue('');
        setCouponError('');
    };

    useEffect(() => {
        if (appliedCoupon) {
            setInputValue(appliedCoupon.code)
        }
    }, [appliedCoupon])

    // The card is collapsed by default, so without this the section reads as
    // "no offers here" and people skip it entirely.
    const bestSaving = useMemo(() => {
        if (!coupons?.length || !orderAmount) return 0;

        return coupons.reduce((best, c) => {
            if (orderAmount < (c.minOrderAmount || 0)) return best;
            // ponytail: people_count coupons scale with guest count, which this
            // component doesn't have — they fall back to the "N available" pill.
            if (c.discountType !== 'fixed' && c.discountType !== 'percentage') return best;

            const amount = c.discountType === 'percentage'
                ? Math.min((orderAmount * c.discountValue) / 100, c.maxDiscountAmount || Infinity)
                : c.discountValue;

            return Math.max(best, amount);
        }, 0);
    }, [coupons, orderAmount]);

    // Once a coupon is applied the card shows it directly, and orderAmount is
    // already net of that discount — so no preview.
    const preview = appliedCoupon || !coupons?.length
        ? null
        : bestSaving > 0
            ? `Save up to ₹${Math.round(bestSaving).toLocaleString('en-IN')}`
            : `${coupons.length} available`;

    return (
        <CollapsibleCard
            title="Apply coupon code"
            defaultOpen={false}
            isOpen={isOpen}
            onToggle={onToggle}
            headerRight={preview && (
                <span className="text-xs font-semibold text-[#3F6212] bg-[#E2F4A6] rounded-full px-2.5 py-1">
                    {preview}
                </span>
            )}
        >
            <div className="flex flex-col gap-2 px-4 pb-4">
                {appliedCoupon ? (
                    // Applied coupon state
                    <>
                        <div className="flex items-center justify-between p-3 bg-[#E2F4A6] border rounded-xl border-[#D9D9D9]">
                            <div className="flex items-center gap-2">
                                <TagIcon weight='thin' size={18} />
                                <div className='pl-1'>
                                    <p className="text-sm">{appliedCoupon.code}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleRemoveCoupon}
                                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                            >
                                <X size={16} />
                            </button>

                        </div>
                        <button
                            onClick={onViewCoupons}
                            className="text-xs text-[#448AFF] text-left px-1 self-start"
                        >
                            view all coupons {coupons && coupons.length > 0 ? `(${coupons.length})` : ''} &gt;
                        </button>
                    </>
                ) : (
                    // Input state
                    <>
                        <CustomInput
                            icon={TagIcon}
                            placeholder="Add a coupon"
                            value={inputValue}
                            onChange={e => { setInputValue(e.target.value); setCouponError(''); }}
                        />
                        {couponError && (
                            <p className="text-xs text-red-500 px-1">{couponError}</p>
                        )}
                        <button
                            onClick={onViewCoupons}
                            className="text-xs text-[#448AFF] text-left px-1 self-start"
                        >
                            view all coupons {coupons && coupons.length > 0 ? `(${coupons.length})` : ''} &gt;
                        </button>
                        <Button
                            variant="purple"
                            fullWidth
                            onClick={handleApplyCoupon}
                            disabled={!inputValue.trim() || isValidating}
                        >
                            {isValidating ? 'Validating...' : 'Apply'}
                        </Button>
                    </>
                )}
            </div>
        </CollapsibleCard>
    );
}
