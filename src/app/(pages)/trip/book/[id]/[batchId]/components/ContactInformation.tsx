'use client';

import React, { useMemo } from 'react';
import CustomInput from '@/common/ui/CustomInput';
import { EmergencyContact, ContactInformationProps } from './types';
import { validateEmergencyContact } from '@/common/utils/formValidators';

const ContactInformation: React.FC<ContactInformationProps> = ({
  emergencyContact,
  onChange,
  onNext,
}) => {
  const handleInputChange = (field: keyof EmergencyContact, value: string) => {
    onChange({
      ...emergencyContact,
      [field]: value,
    });
  };

  const isFormValid = useMemo(() => {
    return validateEmergencyContact(emergencyContact);
  }, [emergencyContact]);

  const handleNext = () => {
    if (isFormValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-5 bg-neutral-50 rounded-xl border-2 border-gray-200 flex flex-col gap-4">
        <h3 className="text-neutral-900 text-base font-bold font-['Satoshi'] leading-6">
          Emergency contact
        </h3>
        <div className="flex flex-col gap-4">
          <CustomInput
            label="Name"
            placeholder="Emergency contact name"
            value={emergencyContact.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
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
                value={emergencyContact.phone}
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
      <p className="text-[#404040] text-[14px] font-medium font-['Satoshi'] leading-[21px]">
        Booking details will be sent to your registered email
      </p>
      <button
        onClick={handleNext}
        disabled={!isFormValid}
        className={`w-full py-4 rounded-xl text-white text-[16px] font-bold font-['Satoshi'] leading-6 transition-colors ${
          isFormValid
            ? 'bg-[#121212] hover:bg-[#2a2a2a] cursor-pointer'
            : 'bg-neutral-400 cursor-not-allowed opacity-50'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default ContactInformation;
