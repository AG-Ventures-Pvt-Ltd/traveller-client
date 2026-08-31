'use client';

import { useRouter } from 'next/navigation';
import MobileModal from '@/common/ui/MobileModal';
import Button from '@/common/components/atoms/Button';
import { ConfettiIcon } from '@phosphor-icons/react';

export const SIGNUP_PERKS_MODAL_STORAGE_KEY = 'wondrr_signup_perks_modal_shown_v1';

interface SignupPerksModalProps {
  open: boolean;
  onClose: () => void;
  signupBonusEnabled?: boolean;
  signupBonusAmount?: number;
}

export default function SignupPerksModal({ open, onClose, signupBonusEnabled, signupBonusAmount }: SignupPerksModalProps) {
  const router = useRouter();
  const hasBonus = signupBonusEnabled && !!signupBonusAmount;

  const handleSignup = () => {
    onClose();
    router.push('/auth?mode=signup&method=otp');
  };

  return (
    <MobileModal isOpen={open} onClose={onClose} title={hasBonus ? 'A gift is waiting' : "Don't miss out"}>
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-[#FFC107] flex items-center justify-center mx-auto mb-4">
          <ConfettiIcon weight="fill" size={28} color="black" />
        </div>

        {hasBonus ? (
          <p className="text-sm text-neutral-600 mb-5">
            Sign up now and get <span className="font-semibold text-neutral-900">₹{signupBonusAmount} Wondrr Cash</span> instantly — use it towards your next trip. Takes less than a minute.
          </p>
        ) : (
          <p className="text-sm text-neutral-600 mb-5">
            Sign up now for personalized discounts on your next adventure.
          </p>
        )}

        <Button
          onClick={handleSignup}
          fullWidth
          className="!bg-[#EEA0FF] hover:!opacity-90 !text-black !rounded-xl font-semibold"
        >
          {hasBonus ? `Claim ₹${signupBonusAmount} Wondrr Cash` : 'Sign Up Now'}
        </Button>

        <button onClick={onClose} className="w-full text-center text-sm text-neutral-500 mt-3 py-1">
          Not now
        </button>
      </div>
    </MobileModal>
  );
}
