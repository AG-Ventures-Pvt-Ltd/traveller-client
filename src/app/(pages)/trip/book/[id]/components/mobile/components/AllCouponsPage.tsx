'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SealPercentIcon } from '@phosphor-icons/react';
import { useBookingNavStore } from '../../../[batchId]/store/useBookingNavStore';
import { CouponsSkeleton } from '../BookingStepSkeletons';
import type { Coupon } from './BookingFormPage/types';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { useGetData } from '@/services/useGetData';
import { useBookingFormStore } from './BookingFormPage/hooks/useBookingFormStore';


interface AllCouponsPageProps {
    tripId : string;
    onDone: () => void;
}

function getCouponTitle(coupon: Coupon): string {
    if (coupon.discountType === 'percentage') {
        return `Get ${coupon.discountValue}% off`;
    }
    return `Get ₹${coupon.discountValue.toLocaleString('en-IN')} off`;
}

function getCouponSaveLine(coupon: Coupon): string {
    if (coupon.discountType === 'percentage') {
        if (coupon.maxDiscountAmount) {
            if (coupon.minOrderAmount != 0) {
                return `Save ${coupon.discountValue}% upto ₹${coupon.maxDiscountAmount} with this code on bookings above ${coupon.minOrderAmount}`;
            }
            return `Save ${coupon.discountValue}% upto ₹${coupon.maxDiscountAmount} with this code`;
        }
        return `Save ${coupon.discountValue}% with this code`;
    }
    return `Save ₹${coupon.discountValue.toLocaleString('en-IN')} with this code`;
}

export default function AllCouponsPage({ tripId, onDone }: AllCouponsPageProps) {

    const { email, appliedCoupon, setAppliedCoupon } = useBookingFormStore();
    const { setContinueAction } = useBookingNavStore();

    const [selectedCode, setSelectedCode] = useState<string>(appliedCoupon?.code ?? '');

    const { data : coupons , isLoading } = useGetData<Coupon[]>(API_ENDPOINTS.DISCOUNTS.GET_AVAILABLE(tripId, email), {
        queryKey: ['discounts', tripId, email],
    });

    const onDoneRef = useRef(onDone);
    onDoneRef.current = onDone;

    const handleDone = useCallback(() => {
        if (selectedCode) {
            const selectedCoupon = coupons?.find(coupon => coupon.code === selectedCode);
            if (selectedCoupon) {
                setAppliedCoupon(selectedCoupon);
            }
        } else {
            setAppliedCoupon(null);
        }
        onDoneRef.current();
    }, [selectedCode, coupons, setAppliedCoupon]);

    useEffect(() => {
        setContinueAction(() => handleDone());
    }, [setContinueAction, handleDone]);

    if (isLoading) {
        return <CouponsSkeleton />;
    }

    return (
        <div className="px-4 pb-4 flex flex-col gap-4">
            <div className="border border-[#D9D9D9] rounded-2xl overflow-hidden">
                {/* Header row */}
                <div className="flex items-center justify-between px-3 py-[18px] border-b border-[#D9D9D9]">
                    <p className="text-xs text-black tracking-[-0.36px]">Add a discount</p>
                </div>

                {/* Coupon list */}
                <div className="flex flex-col divide-y divide-[#D9D9D9]">
                    {coupons?.length === 0 && (
                        <p className="text-xs text-zinc-400 text-center py-8">No coupons available</p>
                    )}
                    {coupons?.map((coupon) => {
                        const isSelected = selectedCode === coupon.code;
                        return (
                            <button
                                key={coupon.code}
                                type="button"
                                onClick={() => setSelectedCode(isSelected ? '' : coupon.code)}
                                className="flex items-center gap-3 px-3 py-[18px] w-full text-left"
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <SealPercentIcon size={20} className="text-zinc-400" />
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-black tracking-[-0.36px]">
                                        {getCouponTitle(coupon)}
                                    </p>
                                    <p className="text-sm text-[#43a047] tracking-[-0.36px] mt-0.5">
                                        {getCouponSaveLine(coupon)}
                                    </p>
                                    <p className="text-xs text-zinc-400 tracking-[-0.36px] mt-0.5">
                                        {coupon.code}
                                    </p>
                                </div>

                                {/* Radio */}
                                <div className="flex-shrink-0 w-5 h-5 rounded-full border border-black flex items-center justify-center">
                                    {isSelected && (
                                        <div className="w-3 h-3 rounded-full bg-[#5A4EFF]" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
