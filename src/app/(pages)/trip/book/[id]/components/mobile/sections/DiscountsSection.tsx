'use client';

import { TagIcon, SealPercentIcon } from '@phosphor-icons/react';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import Button from '@/common/ui/Buttons/Button';
import CustomInput from '@/common/ui/CustomInput';
import type { Coupon } from './types';

interface DiscountsSectionProps {
    couponInput: string;
    referralInput: string;
    coupons: Coupon[] | undefined;
    onCouponChange: (value: string) => void;
    onReferralChange: (value: string) => void;
    onApply: () => void;
    onViewCoupons?: () => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function DiscountsSection({
    couponInput,
    referralInput,
    coupons,
    onCouponChange,
    onReferralChange,
    onApply,
    onViewCoupons,
    isOpen,
    onToggle,
}: DiscountsSectionProps) {
    return (
        <CollapsibleCard title="Add a discount" defaultOpen={false} isOpen={isOpen} onToggle={onToggle}>
            <div className="flex flex-col gap-2 px-4 pb-4">
                <CustomInput
                    icon={TagIcon}
                    placeholder="Add a coupon"
                    value={couponInput}
                    onChange={e => onCouponChange(e.target.value)}
                />
                <button
                    onClick={onViewCoupons}
                    className="text-xs text-[#448AFF] text-left px-1 self-start"
                >
                    view all coupons {coupons && coupons.length > 0 ? `(${coupons.length})` : ''} &gt;
                </button>
                {/* <CustomInput
                    icon={SealPercentIcon}
                    placeholder="Redeem a referral code"
                    value={referralInput}
                    onChange={e => onReferralChange(e.target.value)}
                /> */}
                <Button variant="purple" fullWidth onClick={onApply}>
                    Apply
                </Button>
            </div>
        </CollapsibleCard>
    );
}
