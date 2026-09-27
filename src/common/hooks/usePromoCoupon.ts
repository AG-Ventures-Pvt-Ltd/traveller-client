import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

// The server only returns a coupon while it is actually redeemable — an expired,
// deactivated or used-up coupon comes back as { isEnabled: false }.
export interface PromoCouponData {
  promoCoupon:
    | { isEnabled: false }
    | {
        isEnabled: true;
        code: string;
        headline: string;
        discountType: 'percentage' | 'fixed' | 'people_count';
        discountValue: number;
        maxDiscountAmount: number | null;
        minOrderAmount: number;
        endDate: string;
      };
}

const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

// useGetData derives `enabled` from the url, so an empty url skips the call
// entirely on pages that don't show the banner.
export const usePromoCoupon = (enabled = true) => {
  return useGetData<PromoCouponData>(
    enabled ? API_ENDPOINTS.LANDING_PAGE.PROMO_COUPON : '',
    {
      queryKey: ['promo-coupon'],
      staleTime: CACHE_TIME,
      gcTime: CACHE_TIME,
    }
  );
};
