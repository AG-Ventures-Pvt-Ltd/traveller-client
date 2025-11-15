import React from 'react';
import Button from '../../../../../../common/components/atoms/Button';

const PricingSection = ({ pricing, onApplyDiscount, onSaveAndNext, guests = 1, agreedToTerms, onAgreeToTerms }) => {
  return (
    <div className="mb-6">
      {/* Discount Code */}

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-[#818EA1] text-sm font-dm-sans">Subtotal</span>
          <span className="text-black text-sm font-semibold font-dm-sans">
            {pricing.subtotal.toFixed(2)} 
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#818EA1] text-sm font-dm-sans">Convenience Fee</span>
          <span className="text-black text-sm font-semibold font-dm-sans">
            {pricing.convenienceFee.toFixed(2)} 
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#818EA1] text-sm font-dm-sans">GST (5%)</span>
          <span className="text-black text-sm font-semibold font-dm-sans">
            {pricing.gst.toFixed(2)} 
          </span>
        </div>
        {pricing.discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-[#818EA1] text-sm font-dm-sans">Discount</span>
            <span className="text-green-600 text-sm font-semibold font-dm-sans">
              -{pricing.discount.toFixed(2)}
            </span>
          </div>
        )}
      <div className="h-[52px] bg-white rounded-lg border border-[#DBDDE3] relative mb-6 flex items-center">
        <svg className="absolute left-4 w-6 h-6" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3.86" width="20" height="16.29" fill="#788197" />
        </svg>
        <input
          type="text"
          placeholder="Discount code"
          className="flex-1 pl-12 pr-20 text-[#818EA1] text-base font-dm-sans outline-none bg-transparent"
        />
        <button 
          onClick={onApplyDiscount}
          className="absolute right-4 text-primary text-base font-semibold font-dm-sans cursor-pointer"
        >
          Apply
        </button>
      </div>
        <hr className="my-2 border-gray-300" />
        <div className="flex justify-between items-center">
          <span className="text-black text-base font-semibold font-dm-sans">Total</span>
          <span className="text-black text-base font-semibold font-dm-sans">
            ₹ {pricing.total.toFixed(2)} 
          </span>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-6 h-6 cursor-pointer"
          onClick={() => onAgreeToTerms(!agreedToTerms)}
        >
          <div className={`w-5 h-5 border-[1.25px] border-primary rounded-[5px] flex items-center justify-center ${
            agreedToTerms ? 'bg-[rgba(0,142,244,0.08)]' : 'bg-white'
          }`}>
            {agreedToTerms && (
              <svg className="w-[15px] h-[15px] text-primary" viewBox="0 0 15 15" fill="none">
                <path d="M2.5 7.5l4 4 6-8" stroke="currentColor" strokeWidth="2.08" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-black text-sm font-dm-sans">
          I have read and agree to the Terms and Conditions.
        </span>
      </div>

      {/* Save & Next Button */}
      <Button 
        onClick={onSaveAndNext}
        className="w-full"
      >
        Save & Next
      </Button>
    </div>
  );
};

export default PricingSection;
