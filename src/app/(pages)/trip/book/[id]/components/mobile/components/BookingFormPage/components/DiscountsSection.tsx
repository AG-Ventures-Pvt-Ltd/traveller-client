'use client';

import { useEffect, useState } from 'react';
import { TagIcon, X } from '@phosphor-icons/react';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import Button from '@/common/ui/Buttons/Button';
import CustomInput from '@/common/ui/CustomInput';
import { useBookingFormStore } from '../hooks/useBookingFormStore';
import type { Coupon } from '../types';

interface DiscountsSectionProps {
    coupons: Coupon[] | undefined;
    onViewCoupons?: () => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function DiscountsSection({
    coupons,
    onViewCoupons,
    isOpen,
    onToggle,
}: DiscountsSectionProps) {
    const { appliedCoupon, setAppliedCoupon } = useBookingFormStore();
    const [inputValue, setInputValue] = useState('');
    const handleApplyCoupon = () => {
        const coupon = coupons?.find(c => c.code.toLowerCase() === inputValue.toLowerCase());
        if (coupon) {
            setAppliedCoupon(coupon);
            setInputValue('');
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setInputValue('');
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
                            onChange={e => setInputValue(e.target.value)}
                        />
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
                            disabled={!inputValue.trim()}
                        >
                            Apply
                        </Button>
                    </>
                )}
            </div>
        </CollapsibleCard>
    );
}
