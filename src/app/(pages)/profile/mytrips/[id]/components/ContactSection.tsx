import React, { useState, useEffect } from 'react';
import { UserIcon, PhoneIcon } from '@phosphor-icons/react';
import CustomInput from '@/common/ui/CustomInput';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { useGetData } from '@/services/useGetData';


export interface EmergencyContact {
  name: string;
  contactNumber: string;
  countryCode : string;
}

interface ContactSectionProps {
  onDataChange?: (hasChanges: boolean, data: EmergencyContact | null) => void;
  onReset?: () => void;
}


const ContactSection: React.FC<ContactSectionProps> = ({ onDataChange, onReset }) => {

    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [originalData, setOriginalData] = useState({ name: '', contactNumber: '', countryCode: '+91' });
    const [validationErrors, setValidationErrors] = useState<{ contactNumber?: string }>({});

    const validatePhoneNumber = (phone: string): string | undefined => {
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.length !== 10) {
            return 'Phone number must be exactly 10 digits';
        }
        return undefined;
    };

    const { data: emergencyContact, isLoading } = useGetData<EmergencyContact>(API_ENDPOINTS.USER.GET_EMERGENCY_CONTACT);

    useEffect(() => {
        if (emergencyContact) {
            const data = {
                name: emergencyContact.name || '',
                contactNumber: emergencyContact.contactNumber || '',
                countryCode: emergencyContact.countryCode || '+91'
            };
            setName(data.name);
            setContactNumber(data.contactNumber);
            setCountryCode(data.countryCode);
            setOriginalData(data);
        }
    }, [emergencyContact]);

    const hasChanges = () => {
        const hasDataChanges = name !== originalData.name || 
               contactNumber !== originalData.contactNumber || 
               countryCode !== originalData.countryCode;
        return hasDataChanges && !validationErrors.contactNumber;
    };

    const getCurrentData = (): EmergencyContact | null => {
        if (validationErrors.contactNumber) {
            return null;
        }
        return {
            name,
            contactNumber,
            countryCode
        };
    };

    // Notify parent of changes
    useEffect(() => {
        if (onDataChange) {
            const currentData = getCurrentData();
            onDataChange(hasChanges(), currentData);
        }
    }, [name, contactNumber, countryCode, validationErrors, onDataChange]);

    // Reset to original data when parent requests
    useEffect(() => {
        if (onReset && emergencyContact) {
            const data = {
                name: emergencyContact.name || '',
                contactNumber: emergencyContact.contactNumber || '',
                countryCode: emergencyContact.countryCode || '+91'
            };
            setName(data.name);
            setContactNumber(data.contactNumber);
            setCountryCode(data.countryCode);
        }
    }, [onReset, emergencyContact]);

    const handleFieldChange = (field: 'name' | 'contactNumber' | 'countryCode', value: string) => {
        if (field === 'name') setName(value);
        else if (field === 'contactNumber') {
            setContactNumber(value);
            const error = validatePhoneNumber(value);
            setValidationErrors({ contactNumber: error });
        }
        else if (field === 'countryCode') setCountryCode(value);
    };

    if (isLoading) {
        return (
            <CollapsibleCard title='Emergency Contact'>
                <div className='px-4 pb-5 flex flex-col gap-1.5'>
                    <div className='h-12 bg-gray-200 rounded animate-pulse'></div>
                    <div className='h-12 bg-gray-200 rounded animate-pulse'></div>
                </div>
            </CollapsibleCard>
        );
    }

    return (
        <CollapsibleCard title='Emergency Contact'>
            <div className='px-4 pb-5 flex flex-col gap-1.5'>
                <CustomInput 
                    value={name} 
                    onChange={(e) => handleFieldChange('name', e.target.value)} 
                    placeholder='Full Name' 
                    icon={UserIcon}
                />
                <CustomInput 
                    value={contactNumber} 
                    onChange={(e) => handleFieldChange('contactNumber', e.target.value)} 
                    placeholder='Phone Number' 
                    icon={PhoneIcon}
                    type="tel"
                    error={!!validationErrors.contactNumber}
                />
            </div>
        </CollapsibleCard>
    );
};

export default ContactSection;
