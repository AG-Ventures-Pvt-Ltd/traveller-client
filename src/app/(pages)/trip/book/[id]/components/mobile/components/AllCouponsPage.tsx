'use client';

import { useState, useEffect, useRef } from 'react';
import { SealPercentIcon } from '@phosphor-icons/react';
import { useBookingStore } from '../../../[batchId]/store/useBookingStore';
import { useBookingNavStore } from '../../../[batchId]/store/useBookingNavStore';
import { CouponsSkeleton } from '../BookingStepSkeletons';
import type { Coupon } from '../sections/types';

interface AllCouponsPageProps {
    coupons: Coupon[];
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
        return `Save ${coupon.discountValue}% with this code`;
    }
    return `Save ₹${coupon.discountValue.toLocaleString('en-IN')} with this code`;
}

export default function AllCouponsPage({ coupons, onDone }: AllCouponsPageProps) {
    const { couponCode, setCouponCode } = useBookingStore();
    const { setContinueAction } = useBookingNavStore();

    const [selectedCode, setSelectedCode] = useState<string>(couponCode || '');

    const handleDone = () => {
        setCouponCode(selectedCode);
        onDone();
    };

    const handleDoneRef = useRef(handleDone);
    handleDoneRef.current = handleDone;

    useEffect(() => {
        setContinueAction(() => handleDoneRef.current());
    }, [setContinueAction]);

    if (coupons.length === 0) {
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
                    {coupons.length === 0 && (
                        <p className="text-xs text-zinc-400 text-center py-8">No coupons available</p>
                    )}
                    {coupons.map((coupon) => {
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
                                    <p className="text-sm font-medium text-black tracking-[-0.36px]">
                                        {getCouponTitle(coupon)}
                                    </p>
                                    <p className="text-xs text-[#43a047] tracking-[-0.36px] mt-0.5">
                                        {getCouponSaveLine(coupon)}
                                    </p>
                                    <p className="text-xs text-zinc-400 tracking-[-0.36px] mt-0.5">
                                        {coupon.code}
                                    </p>
                                </div>

                                {/* Radio */}
                                <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-[#D9D9D9] flex items-center justify-center">
                                    {isSelected && (
                                        <div className="w-3 h-3 rounded-full bg-[#448AFF]" />
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
