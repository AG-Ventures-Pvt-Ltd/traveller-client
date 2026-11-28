import { useLoadOffers, useOffersStore } from './useOffersStore';

// Backed by the shared offers store; `enabled` false skips the fetch on pages that don't show it.
export const usePromoCoupon = (enabled = true) => {
  useLoadOffers(enabled);
  const promoCoupon = useOffersStore((s) => s.promoCoupon);
  return { data: promoCoupon ? { promoCoupon } : undefined };
};

export const formatDiscount = (
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
