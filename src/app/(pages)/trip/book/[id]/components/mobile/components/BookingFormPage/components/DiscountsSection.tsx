'use client';

import { useEffect, useState } from 'react';
import { TagIcon, X } from '@phosphor-icons/react';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import Button from '@/common/ui/Buttons/Button';
import CustomInput from '@/common/ui/CustomInput';
import { useBookingFormStore } from '../hooks/useBookingFormStore';
import type { Coupon } from '../types';
import { baseAPI } from '@/services/baseApi';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface DiscountsSectionProps {
    tripId: string;
    coupons: Coupon[] | undefined;
    onViewCoupons?: () => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function DiscountsSection({
    tripId,
    coupons,
    onViewCoupons,
    isOpen,
    onToggle,
}: DiscountsSectionProps) {
    const { appliedCoupon, setAppliedCoupon } = useBookingFormStore();
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

    return (
        <CollapsibleCard title="Add a discount" defaultOpen={false} isOpen={isOpen} onToggle={onToggle}>
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
