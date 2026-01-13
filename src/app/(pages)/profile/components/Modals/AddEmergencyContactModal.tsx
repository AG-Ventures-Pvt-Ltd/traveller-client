'use client';

import { useState, useEffect } from 'react';
import Modal from '@/common/ui/Modal';
import CustomInput from '@/common/ui/CustomInput';
import Button from '@/common/ui/Buttons/Button';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface EmergencyContact {
  name: string;
  contactNumber: string;
}

interface AddEmergencyContactModalProps {
  open: boolean;
  onClose: () => void;
  existingContact?: EmergencyContact | null;
}

export function AddEmergencyContactModal({ 
  open, 
  onClose, 
  existingContact,
}: AddEmergencyContactModalProps) {
  const { mutate: addEmergencyContact, isPending: isAddingEmergencyContact } = usePostData({
    url: API_ENDPOINTS.USER.ADD_EMERGENCY_CONTACT,
  });
  const [formData, setFormData] = useState<EmergencyContact>({
    name: '',
    contactNumber: '',
  });

  // Reset form when modal opens or existingContact changes
  useEffect(() => {
    if (open) {
      if (existingContact) {
        setFormData(existingContact);
      } else {
        setFormData({
          name: '',
          contactNumber: '',
        });
      }
    }
  }, [open, existingContact]);

  const handleChange = (field: keyof EmergencyContact, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      name: formData.name,
      contactNumber: formData.contactNumber,
    };

    addEmergencyContact(payload, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  const isFormValid = formData.name && formData.contactNumber;

  return (
    <Modal 
      title={existingContact ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
      open={open} 
      onClose={onClose}
      showButtons={false}
    >
      <div className="flex flex-col gap-4">
          <CustomInput
            label="Full Name"
            placeholder="Enter contact name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />

          <CustomInput
            label="Phone Number"
            placeholder="+966 555 123 4567"
            value={formData.contactNumber}
            onChange={(e) => handleChange('contactNumber', e.target.value)}
          />
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            variant="outlined"
            onClick={onClose}
            className="flex-1"
            disabled={isAddingEmergencyContact}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="flex-1"
            disabled={!isFormValid || isAddingEmergencyContact}
          >
            {existingContact ? 'Update Contact' : 'Add Contact'}
          </Button>
        </div>
    </Modal>
  );
}
