'use client';

import React from 'react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface Coupon {
  code: string;
  discountType: 'fixed' | 'percentage' | 'people_count';
  discountValue: number;
  maxDiscountAmount?: number;
  numberOfPeople?: number;
  description: string;
}

interface AvailableCouponsProps {
  tripId: string;
}

const AvailableCoupons: React.FC<AvailableCouponsProps> = ({ tripId }) => {
  
  const { data: coupons, isLoading, error } = useGetData<Coupon[]>(
    API_ENDPOINTS.DISCOUNTS.GET_AVAILABLE(tripId)
  );

  if (isLoading) {
    return (
      <div className="text-neutral-500 text-sm font-medium font-['Satoshi'] leading-5">
        Loading available coupons...
      </div>
    );
  }

  if (error || !coupons || coupons.length === 0) {
    return null;
  }

  return (
    <div className="text-neutral-700 text-sm font-medium font-['Satoshi'] leading-5">
      Available coupons:{' '}
      {coupons.map((coupon, index) => {
        let displayText = '';
        if (coupon.discountType === 'fixed') {
          displayText = `Rs. ${coupon.discountValue} off`;
        } else if (coupon.discountType === 'percentage') {
          displayText = `${coupon.discountValue}% off upto Rs. ${coupon.maxDiscountAmount}`;
        } else if (coupon.discountType === 'people_count') {
          displayText = `For Group Booking of ${coupon.numberOfPeople}`;
        }

        return (
          <React.Fragment key={coupon.code}>
            <span
              className="relative cursor-pointer underline group"
            >
              {coupon.code} ({displayText})
              <div className="absolute top-full py-1 left-1/2 transform -translate-x-1/2 mt-2 px-2 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {coupon.description}
              </div>
            </span>
            {index < coupons.length - 1 && ', '}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default AvailableCoupons;
