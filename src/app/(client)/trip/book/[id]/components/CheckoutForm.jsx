'use client'

import React, { useState } from 'react';
import FormInput from './FormInput';
import Button from '../../../../../../common/components/atoms/Button';



const CheckoutForm = ({ onQuickFill, onAddPax, initialGuests = 1, selectedDate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="flex-1 bg-white border-r border-[#DBDDE3] overflow-y-auto">
      <div className="p-4 md:p-8 lg:p-16">
        <h2 className="text-black text-2xl md:text-[32px] font-semibold font-dm-sans mb-6">
          Checkout
        </h2>

        <div className="flex justify-end mb-4">
          <Button 
            onClick={onQuickFill}
            className="bg-[#008EF4] hover:bg-[#0066cc]"
          >
            Quick Fill
          </Button>
        </div>

        <h3 className="text-black text-lg md:text-xl font-semibold font-dm-sans mb-6">
          Fill in Details of yourself
        </h3>

        <div className="space-y-6">
          <FormInput
            label="Full name"
            placeholder="Enter full name"
            required
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
          />

          <FormInput
            label="Email address"
            type="email"
            placeholder="Enter email address"
            required
            value={formData.email}
            onChange={handleInputChange('email')}
          />

          <FormInput
            label="Phone number"
            type="tel"
            placeholder="Enter phone number"
            required
            prefix="+91"
            value={formData.phone}
            onChange={handleInputChange('phone')}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="City"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleInputChange('city')}
            />
            <FormInput
              label="State"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleInputChange('state')}
            />
            <FormInput
              label="Postal Code"
              placeholder="Enter ZIP code"
              value={formData.postalCode}
              onChange={handleInputChange('postalCode')}
            />
          </div>

          <Button 
            onClick={onAddPax}
            className="w-full h-[54px] bg-[#008EF4] hover:bg-[#0066cc]"
          >
            + Add Another Pax
          </Button>

          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 cursor-pointer"
              onClick={() => setAgreedToTerms(!agreedToTerms)}
            >
              <div className={`w-5 h-5 border-[1.25px] border-[#008EF4] rounded-[5px] flex items-center justify-center ${
                agreedToTerms ? 'bg-[rgba(0,142,244,0.08)]' : 'bg-white'
              }`}>
                {agreedToTerms && (
                  <svg className="w-[15px] h-[15px]" viewBox="0 0 15 15" fill="none">
                    <path d="M2.5 7.5l4 4 6-8" stroke="#008EF4" strokeWidth="2.08" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-black text-sm font-dm-sans">
              I have read and agree to the Terms and Conditions.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
