import { useEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getData } from '@/services/baseApi';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

export interface SignupBonus {
  amount: number;
  isEnabled: boolean;
}

// The server only returns a coupon while it is actually redeemable — an expired,
// deactivated or used-up coupon comes back as { isEnabled: false }.
export type PromoCoupon =
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

const TTL_MS = 10 * 60 * 1000;

interface OffersState {
  signupBonus: SignupBonus | null;
  promoCoupon: PromoCoupon | null;
  fetchedAt: number;
  /** True once a fetch finished (ok or not) — lets callers stop waiting on a failed API. */
  settled: boolean;
  /** Fetches both offers at most once per TTL, shared by landing, booking and welcome. */
  load: () => Promise<void>;
}

let inflight: Promise<void> | null = null;

/**
 * Site-wide offers (signup bonus + admin promo coupon). One fetch serves every page;
 * kept in sessionStorage so reloads within the TTL skip the API too.
 */
export const useOffersStore = create<OffersState>()(
  persist(
    (set, get) => ({
      signupBonus: null,
      promoCoupon: null,
      fetchedAt: 0,
      settled: false,
      load: () => {
        if (Date.now() - get().fetchedAt < TTL_MS) return Promise.resolve();
        inflight ??= Promise.allSettled([
          getData<{ signupBonus: SignupBonus }>(API_ENDPOINTS.LANDING_PAGE.SIGNUP_BONUS),
          getData<{ promoCoupon: PromoCoupon }>(API_ENDPOINTS.LANDING_PAGE.PROMO_COUPON),
        ])
          .then(([bonus, promo]) => {
            set({
              signupBonus: bonus.status === 'fulfilled' ? bonus.value.signupBonus : get().signupBonus,
              promoCoupon: promo.status === 'fulfilled' ? promo.value.promoCoupon : get().promoCoupon,
              // A failed half retries on the next mount instead of waiting out the TTL.
              fetchedAt: bonus.status === 'fulfilled' && promo.status === 'fulfilled' ? Date.now() : 0,
            });
          })
          .finally(() => { inflight = null; set({ settled: true }); });
        return inflight;
      },
    }),
    {
      name: 'wondrr-offers',
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ signupBonus, promoCoupon, fetchedAt }) => ({ signupBonus, promoCoupon, fetchedAt }),
      // Rehydrated in useOffers' effect, so the first client render matches SSR (empty store).
      skipHydration: true,
    }
  )
);

/** Mount-time trigger: rehydrate from sessionStorage, then fetch only if stale. */
export const useLoadOffers = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return;
    Promise.resolve(useOffersStore.persist.rehydrate()).then(() => useOffersStore.getState().load());
  }, [enabled]);
};
