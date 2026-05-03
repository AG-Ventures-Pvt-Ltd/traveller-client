'use client';

import { TagIcon, SealPercentIcon } from '@phosphor-icons/react';
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
    const { couponInput, referralInput, setCouponInput, setReferralInput } = useBookingFormStore();

    return (
        <CollapsibleCard title="Add a discount" defaultOpen={false} isOpen={isOpen} onToggle={onToggle}>
            <div className="flex flex-col gap-2 px-4 pb-4">
                <CustomInput
                    icon={TagIcon}
                    placeholder="Add a coupon"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
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
                    onChange={e => setReferralInput(e.target.value)}
                /> */}
                <Button variant="purple" fullWidth onClick={() => {}}>
                    Apply
                </Button>
            </div>
        </CollapsibleCard>
    );
}
