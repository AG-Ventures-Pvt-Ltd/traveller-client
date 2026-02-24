'use client';

import { useState, useEffect } from 'react';
import Modal from '@/common/ui/Modal';
import CustomInput from '@/common/ui/CustomInput';
// import CustomSelect from '@/common/ui/CustomSelect';
import Button from '@/common/ui/Buttons/Button';
import { ExistingTraveler } from '../types';
// import { governmentIdOptions } from '@/app/(pages)/profile/constants';

interface EditOwnerModalProps {
  open: boolean;
  onClose: () => void;
  owner: ExistingTraveler;
  onSave: (data: Partial<ExistingTraveler>) => void;
  isLoading?: boolean;
}

export function EditOwnerModal({ open, onClose, owner, onSave, isLoading = false }: EditOwnerModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    // governmentIdType: '',
    // governmentIdNumber: '',
  });

  // Reset form when modal opens
  useEffect(() => {
    if (open && owner) {
      setFormData({
        fullName: owner.fullName || '',
        phone: owner.phone || '',
        // governmentIdType: owner.governmentIdType || '',
        // governmentIdNumber: owner.governmentIdNumber || '',
      });
    }
  }, [open, owner]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    if (field === 'phone') {
      // Allow only digits and limit to 10 characters
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName.trim() || !formData.phone.trim() || formData.phone.length !== 10) {
      return;
    }

    onSave(formData);
    onClose();
  };

  const isFormValid = formData.fullName.trim() && formData.phone.trim() && formData.phone.length === 10;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Complete Your Details"
      submitText="Save Details"
      onSubmit={handleSubmit}
      showButtons={false}
    >
      <div className="flex flex-col gap-5 max-w-[528px]">
        <p className="text-neutral-600 text-sm">
          Please complete your details to proceed with the booking.
        </p>
        <CustomInput
          label="Full Name"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="Enter your full name"
          fullWidth
          required
        />
        <CustomInput
          label="Mobile Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Enter your mobile number"
          fullWidth
          required
        />
        {/* <CustomSelect
          label="Government ID Type"
          value={formData.governmentIdType}
          onChange={(value) => handleChange('governmentIdType', value)}
          placeholder="Select ID type"
          options={governmentIdOptions}
          required
        />
        <CustomInput
          label="Government ID Number"
          value={formData.governmentIdNumber}
          onChange={(e) => handleChange('governmentIdNumber', e.target.value)}
          placeholder="Enter your ID number"
          fullWidth
          required
        /> */}
        <div className="flex gap-3 mt-2">
          <Button
            onClick={onClose}
            variant="outlined"
            fullWidth
            className="py-4!"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            className="py-3!"
            disabled={isLoading || !isFormValid}
            startIcon={
              isLoading ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 20 20" fill="none">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    className="opacity-75"
                    d="M4 10a6 6 0 0112 0"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M16 5L7.5 13.5L4 10"
                    stroke="currentColor"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )
            }
          >
            {isLoading ? 'Saving...' : 'Save Details'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}