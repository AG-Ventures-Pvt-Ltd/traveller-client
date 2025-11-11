import React from 'react';
import Button from '../../../../../../common/components/atoms/Button';

const PricingSection = ({ pricing, onApplyDiscount, onSaveAndNext, guests = 1 }) => {
  return (
    <div className="mb-6">
      {/* Discount Code */}
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
          className="absolute right-4 text-[#008EF4] text-base font-semibold font-dm-sans cursor-pointer"
        >
          Apply
        </button>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-[#818EA1] text-sm font-dm-sans">Subtotal</span>
          <span className="text-black text-sm font-semibold font-dm-sans">
            ₹{(pricing.subtotal * guests).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#818EA1] text-sm font-dm-sans">Platform Charges</span>
          <span className="text-black text-sm font-semibold font-dm-sans">
            ₹{(pricing.platformCharges * guests).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#818EA1] text-sm font-dm-sans">Tax</span>
          <span className="text-black text-sm font-semibold font-dm-sans">
            ₹{(pricing.tax * guests).toFixed(2)}
          </span>
        </div>
        {pricing.discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-[#818EA1] text-sm font-dm-sans">Discount</span>
            <span className="text-green-600 text-sm font-semibold font-dm-sans">
              -₹{(pricing.discount * guests).toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-black text-base font-semibold font-dm-sans">Total</span>
          <span className="text-black text-base font-semibold font-dm-sans">
            ₹{(pricing.total * guests).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Save & Next Button */}
      <Button 
        onClick={onSaveAndNext}
        className="w-full bg-[#008EF4] hover:bg-[#0066cc] text-white"
      >
        Save & Next
      </Button>
    </div>
  );
};

export default PricingSection;
