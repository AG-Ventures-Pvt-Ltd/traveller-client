'use client';

import { useState, useEffect } from 'react';
import Modal from '@/common/ui/Modal';
import CustomInput from '@/common/ui/CustomInput';
import Button from '@/common/ui/Buttons/Button';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface TravelerDetail {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  // governmentIdType?: string;
  // governmentIdNumber?: string;
}

interface AddTravelerModalProps {
  open: boolean;
  onClose: () => void;
  existingTraveler?: TravelerDetail | null;
}

export function AddTravelerModal({ 
  open, 
  onClose, 
  existingTraveler,
}: AddTravelerModalProps) {
  const [updateUrl, setUpdateUrl] = useState('');
  
  const { mutate: createGuestUser, isPending: isCreatingGuestUser } = usePostData({
    url: API_ENDPOINTS.GUEST_USERS.CREATE,
  });
  
  const { mutate: updateGuestUser, isPending: isUpdatingGuestUser } = usePostData({
    url: updateUrl,
  });

  useEffect(() => {
    if (existingTraveler?._id) {
      setUpdateUrl(API_ENDPOINTS.GUEST_USERS.UPDATE(existingTraveler._id));
    }
  }, [existingTraveler?._id]);

  const [formData, setFormData] = useState<TravelerDetail>({
    _id: '',
    fullName: '',
    email: '',
    phone: '',
    // governmentIdType: '',
    // governmentIdNumber: '',
  });

  const isLoading = isCreatingGuestUser || isUpdatingGuestUser;

  useEffect(() => {
    if (open) {
      if (existingTraveler) {
        setFormData(existingTraveler);
      } else {
        setFormData({
          _id: '',
          fullName: '',
          email: '',
          phone: '',
          // governmentIdType: '',
          // governmentIdNumber: '',
        });
      }
    }
  }, [open, existingTraveler]);

  const handleChange = (field: keyof TravelerDetail, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Remove _id from payload as it's not needed in the request body
    const { ...payload } = formData;
    
    if (existingTraveler) {
      // Update existing traveler
      updateGuestUser(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      // Create new traveler
      createGuestUser(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.phone;

  return (
    <Modal 
      title={existingTraveler ? 'Edit Traveler' : 'Add New Traveler'} 
      open={open} 
      onClose={onClose}
      showButtons={false}
    >
      <div className="flex flex-col gap-4">
          <CustomInput
            label="Full Name"
            placeholder="Enter traveler full name"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />

          <CustomInput
            label="Email"
            placeholder="Enter traveler email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />

          <CustomInput
            label="Phone Number"
            placeholder="Enter traveler phone number"
            value={formData.phone}
            type='tel'
            onChange={(e) => handleChange('phone', e.target.value)}
          />

          {/* <CustomInput
            label="Government ID Type"
            placeholder="e.g., Passport, National ID"
            value={formData.governmentIdType || ''}
            onChange={(e) => handleChange('governmentIdType', e.target.value)}
          />

          <CustomInput
            label="Government ID Number"
            placeholder="Enter ID number"
            value={formData.governmentIdNumber || ''}
            onChange={(e) => handleChange('governmentIdNumber', e.target.value)}
          /> */}
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            variant="outlined"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="flex-1"
            disabled={!isFormValid || isLoading}
          >
            {existingTraveler ? 'Update Traveler' : 'Add Traveler'}
          </Button>
        </div>
    </Modal>
  );
}
