import { useLoadOffers, useOffersStore } from './useOffersStore';

// Same { data, isLoading } shape callers used with react-query; backed by the shared offers store.
export const useSignupBonus = () => {
  useLoadOffers();
  const signupBonus = useOffersStore((s) => s.signupBonus);
  const settled = useOffersStore((s) => s.settled);
  return { data: signupBonus ? { signupBonus } : undefined, isLoading: !signupBonus && !settled };
};
