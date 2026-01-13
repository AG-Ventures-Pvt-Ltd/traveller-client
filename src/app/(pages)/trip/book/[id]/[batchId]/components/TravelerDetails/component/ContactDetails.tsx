'use client';

import React from 'react';
import CustomInput from '@/common/ui/CustomInput';
import CustomSelect from '@/common/ui/CustomSelect';
import { TravelerData, ContactDetailsProps } from '../../types';

const ContactDetails: React.FC<ContactDetailsProps> = ({
  travelerIndex,
  isPrimary = false,
  data,
  onChange,
}) => {
  const handleInputChange = (field: keyof TravelerData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];

  const governmentIdTypeOptions = [
    { value: 'adhaar', label: 'Adhaar' },
    { value: 'passport', label: 'Passport' },
    { value: 'driving-license', label: 'Driving License' },
    { value: 'voter-id', label: 'Voter Id' },
  ];

  return (
    <div className="flex flex-col gap-5 border-b border-[#EDEDED] pb-5">
      <div className="flex flex-col">
        <h3 className="text-[#121212] text-[15px] font-bold font-['Satoshi'] leading-[22.5px]">
          {isPrimary ? 'Primary traveler (Adult)' : `Traveler ${travelerIndex} (Adult)`}
        </h3>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <CustomInput
            label="Full name"
            placeholder="Enter full name"
            value={data.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
        </div>
        <div className="flex-1">
          <CustomSelect
            value={data.gender}
            onChange={(value) => handleInputChange('gender', value)}
            placeholder="Select gender"
            options={genderOptions}
            label="Gender"
            className="bg-white rounded-xl border border-[#EDEDED] focus:border-[#121212]"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <CustomInput
            label="Email address"
            type="email"
            placeholder="email@example.com"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          {isPrimary && (
            <p className="text-[#404040] text-[13px] font-medium font-['Satoshi'] leading-[19.5px] mt-1">
              We&apos;ll send booking confirmation here
            </p>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-1">
            <label className="text-neutral-900 text-sm font-bold">
              Phone number
            </label>
            <div className="flex">
              <div className="flex items-center justify-center px-3 py-3 bg-gray-100 border-2 border-r-0 border-gray-200 rounded-l-xl text-gray-600 text-base font-medium font-['Satoshi']">
                +91
              </div>
              <input
                type="tel"
                placeholder="1234567890"
                value={data.phone}
                onChange={(e) => {
                  // Only allow digits and limit to 10 characters
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  handleInputChange('phone', value);
                }}
                className="flex-1 px-4 py-3 bg-[#fafafa] border-2 border-gray-200 rounded-r-xl text-[#404040] text-base font-medium font-['Satoshi'] placeholder:text-[#40404080] focus:outline-none focus:border-[#121212] focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <CustomSelect
            value={data.governmentIdType || ''}
            onChange={(value) => handleInputChange('governmentIdType', value)}
            placeholder="Select ID type"
            options={governmentIdTypeOptions}
            label="Government ID Type"
            required={true}
            className="bg-white rounded-xl border border-[#EDEDED] focus:border-[#121212]"
          />
        </div>
        <div className="flex-1">
          <CustomInput
            label="Government ID Number"
            placeholder="Enter ID number"
            value={data.governmentIdNumber || ''}
            onChange={(e) => handleInputChange('governmentIdNumber', e.target.value)}
            required={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
