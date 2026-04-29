'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, OctagonAlert } from 'lucide-react';
import AvailableCoupons from './components/AvailableCoupons';
import { useBookingStore } from '../../store/useBookingStore';
import { useTripDetailsStore } from '../../store/useTripDetailsStore';
import { useParams } from 'next/navigation';
import { notify } from '@/common/utils/notify';

interface ReviewAndPayProps {
  totalAmount: number;
  onComplete: (referralCode?: string) => void;
  tripId: string;
  isSubmitting?: boolean;
}

const ReviewAndPay: React.FC<ReviewAndPayProps> = ({
  onComplete,
  tripId,
  isSubmitting = false,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [referralCode, setLocalReferralCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isReferralApplied, setIsReferralApplied] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedSharing, setSelectedSharing] = useState<number | null>(null);

  const setCouponCode = useBookingStore((state) => state.setCouponCode);
  const setReferralCode = useBookingStore((state) => state.setReferralCode);
  const { tripDetails, error, fetchTripDetails, currentGuests, currentCouponCode } = useTripDetailsStore();
  const params = useParams();
  const batchId = params.batchId as string;

  const sharingOptions = (tripDetails?.sharingPrice || []).map((option) => ({
    type: option.people === 1 ? 'Single Room' : option.people === 2 ? 'Double Sharing' : 'Triple Sharing',
    price: option.additionalPricePerPerson,
    value: option.people,
  }));

  useEffect(() => {
    if (tripDetails?.isCouponApplied && !error) {
      setIsPromoApplied(true);
    } else {
      setIsPromoApplied(false);
    }
  }, [tripDetails, error]);

  useEffect(() => {
    if (tripDetails?.isReferralApplied && !error) {
      setIsReferralApplied(true);
      if (tripDetails.referralMessage) {
        notify.success(tripDetails.referralMessage);
      }
    } else {
      if (tripDetails?.referralMessage && !tripDetails?.isReferralApplied) {
        notify.error(tripDetails.referralMessage);
        setIsReferralApplied(false);
      }
    }
  }, [tripDetails, error]);

  
  const handleRemovePromo = () => {
    setPromoCode('');
    setIsPromoApplied(false);
    setCouponCode('');
    fetchTripDetails(tripId, batchId, currentGuests, '');
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setCouponCode(promoCode.trim());
      fetchTripDetails(tripId, batchId, currentGuests, promoCode.trim());
    }
  };

  const handleApplyReferral = () => {
    if (referralCode.trim()) {
      setReferralCode(referralCode.trim());
    }
  };

  const handleRemoveReferral = () => {
    setLocalReferralCode('');
    setIsReferralApplied(false);
    setReferralCode('');
  };

  const handleSharingSelect = async (value: number) => {
    const newValue = selectedSharing === value ? null : value;
    setSelectedSharing(newValue);
    // Refetch trip details with new room sharing
    await fetchTripDetails(tripId, batchId, currentGuests, currentCouponCode);
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h3 className="text-neutral-900 text-base font-bold font-['Satoshi'] leading-6">
          Choose Room Sharing
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sharingOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSharingSelect(option.value)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedSharing === option.value
                  ? 'border-[#121212] bg-[#121212] text-white'
                  : 'border-gray-200 bg-white hover:border-[#121212]'
              }`}
            >
              <div className="text-center">
                <p className="text-sm font-bold font-['Satoshi']">{option.type}</p>
                <p className="text-xs font-medium font-['Satoshi'] mt-1">
                  ₹{option.price} additional per person
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-neutral-900 text-base font-bold font-['Satoshi'] leading-6">
          Have a promo code?
        </h3>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
          <div className="flex-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              disabled={isPromoApplied}
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 text-[#121212] text-base font-medium font-['Satoshi'] placeholder:text-[#12121280] focus:outline-none focus:border-[#121212] ${isPromoApplied ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            />
          </div>
          {isPromoApplied ? (
            <button
              onClick={handleRemovePromo}
              className="w-full sm:w-24 h-12 bg-red-500 rounded-xl text-white text-base font-bold font-['Satoshi'] leading-6 hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleApplyPromo}
              className="w-full sm:w-24 h-12 bg-[#121212] rounded-xl text-white text-base font-bold font-['Satoshi'] leading-6 hover:bg-[#2a2a2a] transition-colors"
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
              {tripDetails?.appliedCoupon?.displayText && (
                <p className="text-green-700 text-xs font-medium font-['Satoshi'] leading-5">
                  {tripDetails.appliedCoupon.displayText}
                </p>
              )}
              {tripDetails?.couponMessage && (
                <p className="text-green-700 text-xs font-medium font-['Satoshi'] leading-5">
                  {tripDetails.couponMessage}
                </p>
              )}
            </div>
          </div>
        )}
        {!isPromoApplied && tripDetails?.couponMessage && !tripDetails?.isCouponApplied && (
          <div className="pl-3.5 py-4 bg-red-50 rounded-xl border-2 border-red-200 flex items-center gap-2.5">
            <OctagonAlert className='text-red-800'/>
            <div className="flex flex-col">
              <p className="text-red-800 text-sm font-bold font-['Satoshi'] leading-5">
                Coupon Error
              </p>
              <p className="text-red-700 text-xs font-medium font-['Satoshi'] leading-5">
                {tripDetails.couponMessage}
              </p>
            </div>
          </div>
        )}
        <AvailableCoupons tripId={tripId} />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-neutral-900 text-base font-bold font-['Satoshi'] leading-6">
          Have a referral code?
        </h3>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
          <div className="flex-1">
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setLocalReferralCode(e.target.value)}
              placeholder="Enter referral code (optional)"
              disabled={isReferralApplied}
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 text-[#121212] text-base font-medium font-['Satoshi'] placeholder:text-[#12121280] focus:outline-none focus:border-[#121212] ${isReferralApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          {isReferralApplied ? (
            <button
              onClick={handleRemoveReferral}
              className="w-full sm:w-24 h-12 bg-red-500 rounded-xl text-white text-base font-bold font-['Satoshi'] leading-6 hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleApplyReferral}
              disabled={!referralCode.trim()}
              className={`w-full sm:w-24 h-12 rounded-xl text-white text-base font-bold font-['Satoshi'] leading-6 transition-colors ${referralCode.trim() ? 'bg-[#121212] hover:bg-[#2a2a2a]' : 'bg-neutral-900 opacity-30 cursor-not-allowed'}`}
            >
              Apply
            </button>
          )}
        </div>
        {isReferralApplied && (
          <div className="pl-3.5 py-4 bg-blue-50 rounded-xl border-2 border-blue-200 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
            <div className="flex flex-col">
              <p className="text-blue-800 text-sm font-bold font-['Satoshi'] leading-5">
                Referral code applied: {referralCode}
              </p>
              {tripDetails?.referralMessage && (
                <p className="text-blue-700 text-xs font-medium font-['Satoshi'] leading-5">
                  {tripDetails.referralMessage}
                </p>
              )}
            </div>
          </div>
        )}
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
            <Link href="/booking-policy" className="text-neutral-900 underline">
              Terms and Conditions
            </Link>{' '}
            and{' '}
            <Link href="/booking-policy" className="text-neutral-900 underline">
              Cancellation Policy
            </Link>
          </p>
        </div>
      </div>
      <button
        onClick={() => onComplete(isReferralApplied ? referralCode : undefined)}
        disabled={!agreedToTerms || isSubmitting}
        className={`w-full py-4 rounded-xl text-white text-base font-bold font-['Satoshi'] leading-6 transition-colors ${agreedToTerms && !isSubmitting
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
