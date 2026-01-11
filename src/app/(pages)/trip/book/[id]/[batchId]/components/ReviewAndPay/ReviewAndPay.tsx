'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import AvailableCoupons from './components/AvailableCoupons';
import { useBookingStore } from '../../store/useBookingStore';

interface ReviewAndPayProps {
  totalAmount: number;
  onComplete: () => void;
  tripId: string;
  isSubmitting?: boolean;
}

const ReviewAndPay: React.FC<ReviewAndPayProps> = ({
  onComplete,
  tripId,
  isSubmitting = false,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const setCouponCode = useBookingStore((state) => state.setCouponCode);

  const handleRemovePromo = () => {
    setPromoCode('');
    setIsPromoApplied(false);
    setCouponCode('');
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setIsPromoApplied(true);
      setCouponCode(promoCode.trim());
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h3 className="text-neutral-900 text-base font-bold font-['Satoshi'] leading-6">
          Have a promo code?
        </h3>
        <div className="flex gap-2.5">
          <div className="flex-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              disabled={isPromoApplied}
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 text-[#121212] text-base font-medium font-['Satoshi'] placeholder:text-[#12121280] focus:outline-none focus:border-[#121212] ${
                isPromoApplied ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>
          {isPromoApplied ? (
            <button
              onClick={handleRemovePromo}
              className="w-24 h-12 bg-red-500 rounded-xl text-white text-base font-bold font-['Satoshi'] leading-6 hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleApplyPromo}
              className="w-24 h-12 bg-[#121212] rounded-xl text-white text-base font-bold font-['Satoshi'] leading-6 hover:bg-[#2a2a2a] transition-colors"
            >
              Apply
            </button>
          )}
        </div>
        {isPromoApplied && (
          <div className="pl-3.5 py-4 bg-green-50 rounded-xl border-2 border-green-200 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-green-600" strokeWidth={1.5} />
            <div className="flex flex-col">
              <p className="text-green-800 text-sm font-bold font-['Satoshi'] leading-5">
                Coupon applied: {promoCode}
              </p>
              <p className="text-green-700 text-xs font-medium font-['Satoshi'] leading-5">
                10% off on total tour price
              </p>
            </div>
          </div>
        )}
        <AvailableCoupons tripId={tripId} />
      </div>
      <div className="px-5 py-5 bg-neutral-50 rounded-xl border-2 border-gray-200">
        <div className="flex gap-3">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-5 h-5 mt-0.5 cursor-pointer"
          />
          <p className="text-neutral-700 text-sm font-medium font-['Satoshi'] leading-5">
            I agree to the{' '}
            <a href="#" className="text-neutral-900 underline">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-neutral-900 underline">
              Cancellation Policy
            </a>
            . I understand that this booking is non-refundable.
          </p>
        </div>
      </div>
      <button
        onClick={onComplete}
        disabled={!agreedToTerms || isSubmitting}
        className={`w-full py-4 rounded-xl text-white text-base font-bold font-['Satoshi'] leading-6 transition-colors ${
          agreedToTerms && !isSubmitting
            ? 'bg-[#121212] hover:bg-[#2a2a2a]'
            : 'bg-neutral-900 opacity-30 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? 'Processing...' : 'Complete booking'}
      </button>
      <p className="text-center text-neutral-700 text-xs font-medium font-['Satoshi'] leading-5">
        You&apos;ll receive a confirmation email immediately after booking
      </p>
    </div>
  );
};

export default ReviewAndPay;
