'use client'

import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import Button from '../../../../../../common/components/atoms/Button';
import { useGetData } from '../../../../../../services/useGetData';
import { API_ENDPOINTS } from '../../../../../../common/constants/apiEndpoints';



const CheckoutForm = ({ onQuickFill, onAddPax, initialGuests = 1, selectedDate, onGuestsChange }) => {
  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    state: '',
    emergencyContactNumber: '',
    age: '',
    address: ''
  };

  const [guests, setGuests] = useState(Array.from({ length: initialGuests }, () => ({ ...initialFormData })));
  const [expanded, setExpanded] = useState(Array(initialGuests).fill(true));

  const { data: guestUsers } = useGetData(API_ENDPOINTS.GUEST_USERS.GET);

  const autoFillGuest = (person) => {
    const filledGuest = {
      fullName: person.fullName || '',
      email: person.email || '',
      phone: person.phone || '',
      country: '',
      city: person.city || '',
      state: person.state || '',
      emergencyContactNumber: person.emergencyContactNumber || '',
      age: person.age ? person.age.toString() : '',
      address: person.address || ''
    };
    setGuests(prev => prev.map((g, i) => i === 0 ? filledGuest : g));
  };

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

  const clearGuest = (index) => {
    setGuests(prev => prev.map((g, i) => i === index ? { ...initialFormData } : g));
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
        {guestUsers && guestUsers.length > 0 && (
          <div className="mb-6">
            <h4 className="text-black text-base font-semibold font-dm-sans mb-4">
              Quick Add from Saved Profiles
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guestUsers.map((person) => (
                <div key={person._id} className="border border-[#DBDDE3] rounded-lg p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer" onClick={() => autoFillGuest(person)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-black font-semibold">{person.fullName}</p>
                      <p className="text-gray-600 text-sm">{person.email}</p>
                    </div>
                    <Button className="bg-[#008EF4] hover:bg-[#0066cc] text-white px-3 py-1 text-sm">
                      Auto Fill
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
                <Button 
                  onClick={(e) => { e.stopPropagation(); clearGuest(index); }}
                  className="text-gray-500 hover:text-gray-700 text-sm px-2 py-1 bg-white border border-gray-300 hover:border-gray-500"
                >
                  Clear
                </Button>
                <span 
                  onClick={(e) => { e.stopPropagation(); guests.length > 1 ? deleteGuest(index) : clearGuest(index); }}
                  className="text-red-500 cursor-pointer text-xl hover:text-red-700"
                >
                  ×
                </span>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput
                    label="Emergency Contact Number"
                    type="tel"
                    placeholder="Enter emergency contact number"
                    value={guest.emergencyContactNumber}
                    onChange={(e) => updateGuest(index, 'emergencyContactNumber', e.target.value)}
                  />
                  <FormInput
                    label="Age"
                    type="number"
                    placeholder="Enter age"
                    value={guest.age}
                    onChange={(e) => updateGuest(index, 'age', e.target.value)}
                  />
                  <FormInput
                    label="Address"
                    placeholder="Enter address"
                    value={guest.address}
                    onChange={(e) => updateGuest(index, 'address', e.target.value)}
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
