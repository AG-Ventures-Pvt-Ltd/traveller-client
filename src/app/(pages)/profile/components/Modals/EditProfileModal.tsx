'use client';

import { useState, useEffect } from 'react';
import Modal from '@/common/ui/Modal';
import CustomInput from '@/common/ui/CustomInput';
import CustomSelect from '@/common/ui/CustomSelect';
import { DatePicker } from '@/common/ui/DatePicker';
import Button from '@/common/ui/Buttons/Button';
import { ProfileData } from '../../types';
import useS3Upload from '@/common/hooks/useS3Upload';
import MyImage from '@/common/ui/Image';

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onSave: (data: ProfileData, addressComponents: { address: string; city: string; state: string }) => void;
  isLoading?: boolean;
}

export function EditProfileModal({ open, onClose, profileData, onSave, isLoading = false }: EditProfileModalProps) {

  const getCleanFormData = (data: ProfileData): ProfileData => ({
    ...data,
    name: data.name === 'Not added yet' ? '' : data.name,
    username: data.username === 'Not added yet' ? '' : data.username,
    bio: data.bio === 'Not added yet' ? '' : data.bio,
    email: data.email === 'Not added yet' ? '' : data.email,
    phone: data.phone === 'Not added yet' ? '' : data.phone,
    address: data.address === 'Not added yet' ? '' : data.address,
    birthDate: data.birthDate === 'Not added yet' ? '' : data.birthDate,
    avatar: data.avatar === 'Not added yet' ? '' : data.avatar,
    governmentIdType: data.governmentIdType === 'Not added yet' ? '' : data.governmentIdType,
    governmentIdNumber: data.governmentIdNumber === 'Not added yet' ? '' : data.governmentIdNumber,
  });

  const [formData, setFormData] = useState<ProfileData>(getCleanFormData(profileData));
  const [addressComponents, setAddressComponents] = useState({
    address: '',
    city: '',
    state: '',
  });
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { uploadImages, isUploading } = useS3Upload();

  const handleAddressChange = (field: 'address' | 'city' | 'state', value: string) => {
    setAddressComponents((prev) => ({ ...prev, [field]: value }));
  };

  const handleBirthDateChange = (date: Date | undefined) => {
    setBirthDate(date);
  };

  useEffect(() => {
    if (open) {
      const cleanData = getCleanFormData(profileData);
      setFormData(cleanData);

      if (cleanData.birthDate) {
        const parsedDate = new Date(cleanData.birthDate);
        if (!isNaN(parsedDate.getTime())) {
          setBirthDate(parsedDate);
        } else {
          setBirthDate(undefined);
        }
      } else {
        setBirthDate(undefined);
      }

      setAddressComponents({
        address: '',
        city: '',
        state: '',
      });
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  }, [open, profileData]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async () => {
    let avatarUrl = formData.avatar;

    if (selectedFile) {
      try {
        const key = 'user/avatar'
        const uploadResults = await uploadImages([selectedFile], key);
        if (uploadResults[0]?.success) {
          avatarUrl = uploadResults[0].url;
        }
      } catch {
        return; 
      }
    }

    const formattedBirthDate = birthDate ? birthDate.toISOString().split('T')[0] : '';

    const updatedData = {
      ...formData,
      avatar: avatarUrl,
      birthDate: formattedBirthDate
    };

    onSave(updatedData, addressComponents);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Profile"
      submitText="Save Changes"
      onSubmit={handleSubmit}
      showButtons={false}
    >
      <div className="flex flex-col gap-5 max-w-[528px]">
        {/* Phone Number */}
        {/* Username */}
        <CustomInput
          label="Username"
          value={formData.username}
          onChange={(e) => handleChange('username', e.target.value)}
          placeholder="Enter your username"
          fullWidth
        />

        <CustomInput
          label="Mobile Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          fullWidth
        />
        {/* Government ID Type */}
        <CustomSelect
          label="Government ID Type"
          value={formData.governmentIdType || ''}
          onChange={(value) => handleChange('governmentIdType', value)}
          placeholder="Select ID type"
          options={[
            { value: 'passport', label: 'Passport' },
            { value: 'aadhar', label: 'Aadhar Card' },
            { value: 'pan', label: 'PAN Card' },
            { value: 'driving_license', label: 'Driving License' },
            { value: 'voter_id', label: 'Voter ID' },
          ]}
        />

        {/* Government ID Number */}
        <CustomInput
          label="Government ID Number"
          value={formData.governmentIdNumber || ''}
          onChange={(e) => handleChange('governmentIdNumber', e.target.value)}
          placeholder="Enter your ID number"
          fullWidth
        />
        <DatePicker
          label="Date of Birth"
          value={birthDate}
          onChange={handleBirthDateChange}
          placeholder="Select your date of birth"
          showYearNavigation={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomInput
            label="Address"
            value={addressComponents.address}
            onChange={(e) => handleAddressChange('address', e.target.value)}
            placeholder="Street address"
            fullWidth
          />
          <CustomInput
            label="City"
            value={addressComponents.city}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            placeholder="City"
            fullWidth
          />
          <CustomInput
            label="State"
            value={addressComponents.state}
            onChange={(e) => handleAddressChange('state', e.target.value)}
            placeholder="State"
            fullWidth
          />
        </div>
        <CustomInput
          label="Bio"
          variant="textarea"
          value={formData.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          rows={4}
          fullWidth
        />
        <div className="flex flex-col gap-3">
          <label className="text-neutral-900 text-sm font-bold font-['Satoshi']">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <MyImage
                src={previewUrl || formData.avatar || 'https://placehold.co/80x80'}
                alt="Avatar preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/80x80';
                }}
              />
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 file:cursor-pointer"
                disabled={isUploading}
              />
              <p className="text-xs text-gray-500 mt-1">
                {isUploading ? 'Uploading...' : 'Select a new profile picture (JPG, PNG, max 5MB)'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
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
            disabled={isLoading || isUploading}
            startIcon={
              (isLoading || isUploading) ? (
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
            {isUploading ? 'Uploading...' : isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
