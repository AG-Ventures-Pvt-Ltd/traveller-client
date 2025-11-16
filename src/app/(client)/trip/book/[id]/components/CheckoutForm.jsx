'use client'

import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import Button from '../../../../../../common/components/atoms/Button';



const CheckoutForm = ({ onQuickFill, onAddPax, initialGuests = 1, selectedDate, onGuestsChange }) => {
  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    state: '',
    postalCode: ''
  };

  const [guests, setGuests] = useState(Array.from({ length: initialGuests }, () => ({ ...initialFormData })));
  const [expanded, setExpanded] = useState(Array(initialGuests).fill(true));

  // Notify parent when guest count changes
  useEffect(() => {
    if (onGuestsChange) {
      onGuestsChange(guests.length);
    }
  }, [guests.length, onGuestsChange]);

  const updateGuest = (index, field, value) => {
    setGuests(prev => prev.map((g, i) => i === index ? { ...g, [field]: value } : g));
  };

  const addAnotherPax = () => {
    setGuests([...guests, { ...initialFormData }]);
    setExpanded([...expanded, true]);
  };

  const deleteGuest = (index) => {
    if (guests.length > 1) {
      setGuests(prev => prev.filter((_, i) => i !== index));
      setExpanded(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="flex-1 bg-white border-r border-[#DBDDE3] overflow-y-auto">
      <div className="p-4 md:p-8 lg:px-16 lg:py-8">
        <h2 className="text-black text-2xl md:text-[32px] font-semibold font-dm-sans mb-6">
          Checkout
        </h2>
        <h3 className="text-black text-lg md:text-xl font-semibold font-dm-sans mb-6">
          Fill in Details
        </h3>
        {guests.map((guest, index) => (
          <div key={index} className="border border-[#DBDDE3] rounded-lg mb-4">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 rounded-t-lg"
              onClick={() => setExpanded(prev => prev.map((e, i) => i === index ? !e : e))}
            >
              <h4 className="text-black text-lg font-semibold font-dm-sans">
                Person {index + 1}
              </h4>
              <div className="flex items-center gap-2">
                {guests.length > 1 && (
                  <span 
                    onClick={(e) => { e.stopPropagation(); deleteGuest(index); }}
                    className="text-red-500 cursor-pointer text-xl hover:text-red-700"
                  >
                    ×
                  </span>
                )}
                <span className="text-[#008EF4] text-xl">{expanded[index] ? '−' : '+'}</span>
              </div>
            </div>
            {expanded[index] && (
              <div className="p-4 space-y-6">
                <FormInput
                  label="Full name"
                  placeholder="Enter full name"
                  required
                  value={guest.fullName}
                  onChange={(e) => updateGuest(index, 'fullName', e.target.value)}
                />

                <FormInput
                  label="Email address"
                  type="email"
                  placeholder="Enter email address"
                  required
                  value={guest.email}
                  onChange={(e) => updateGuest(index, 'email', e.target.value)}
                />

                <FormInput
                  label="Phone number"
                  type="tel"
                  placeholder="Enter phone number"
                  required
                  prefix="+91"
                  value={guest.phone}
                  onChange={(e) => updateGuest(index, 'phone', e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput
                    label="City"
                    placeholder="Enter city"
                    value={guest.city}
                    onChange={(e) => updateGuest(index, 'city', e.target.value)}
                  />
                  <FormInput
                    label="State"
                    placeholder="Enter state"
                    value={guest.state}
                    onChange={(e) => updateGuest(index, 'state', e.target.value)}
                  />
                  <FormInput
                    label="Postal Code"
                    placeholder="Enter ZIP code"
                    value={guest.postalCode}
                    onChange={(e) => updateGuest(index, 'postalCode', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        <Button 
          onClick={addAnotherPax}
          className="w-full h-[54px] bg-[#008EF4] hover:bg-[#0066cc] mb-6"
        >
          + Add Another Pax
        </Button>
      </div>
    </div>
  );
};

export default CheckoutForm;
