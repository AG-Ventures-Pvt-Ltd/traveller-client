import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface SignupBonusData {
  signupBonus: {
    amount: number;
    isEnabled: boolean;
  };
}

const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

export const useSignupBonus = () => {
  return useGetData<SignupBonusData>(
    API_ENDPOINTS.LANDING_PAGE.SIGNUP_BONUS,
    {
      queryKey: ['signup-bonus'],
      staleTime: CACHE_TIME,
      gcTime: CACHE_TIME,
    }
  );
};
