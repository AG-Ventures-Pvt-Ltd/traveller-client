import React, { useState, useEffect, useRef } from 'react';
import { UserIcon, EnvelopeIcon, PhoneIcon, IdentificationCardIcon } from '@phosphor-icons/react';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import CustomInput from '@/common/ui/CustomInput';
import { useGetData } from '@/services/useGetData';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface TravelerSectionProps {
  bookingId : string;
  onDataChange?: (hasChanges: boolean, data: TravelerUpdatePayload | null) => void;
  onReset?: () => void;
}

interface BookingTravelersApiResponse {
  mainTraveler : {
    fullName : string;
    email: string;
    phoneNumber : string;
    governmentIdNumber : string;
  };
  guests : Array<{
    _id : string;
    fullName : string;
    email: string;
    phoneNumber : string;
    governmentIdNumber : string;
  }>;
  numberOfPeople : number;
}

interface TravelerUpdatePayload {
  mainTraveler : {
    fullName : string;
    email: string;
    phoneNumber : string;
    governmentIdNumber : string;
  };
  guests : Array<{
    _id?: string;
    fullName : string;
    phoneNumber : string;
    governmentIdNumber : string;
  }>;
  numberOfPeople : number;
}



const TravelerSection: React.FC<TravelerSectionProps> = ({bookingId, onDataChange, onReset}) => {

  const { data : travelers } = useGetData<BookingTravelersApiResponse>(API_ENDPOINTS.BOOKINGS.GET_TRAVELERS(bookingId))

  const [mainTravelerData, setMainTravelerData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    governmentIdNumber: ''
  });

  const [guestTravelersData, setGuestTravelersData] = useState<Array<{
    _id?: string;
    fullName: string;
    phoneNumber: string;
    governmentIdNumber: string;
  }>>([]);

  const [validationErrors, setValidationErrors] = useState<{
    main: { phoneNumber?: string; governmentIdNumber?: string };
    guests: Array<{ phoneNumber?: string; governmentIdNumber?: string }>;
  }>({
    main: {},
    guests: []
  });

  const validatePhoneNumber = (phone: string): string | undefined => {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      return 'Phone number must be exactly 10 digits';
    }
    return undefined;
  };

  const validateGovernmentId = (id: string): string | undefined => {
    const digitsOnly = id.replace(/\D/g, '');
    if (digitsOnly.length !== 12) {
      return 'Government ID must be exactly 12 digits';
    }
    return undefined;
  };

  const formatGovernmentId = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length <= 4) {
      return digitsOnly;
    } else if (digitsOnly.length <= 8) {
      return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4)}`;
    } else {
      return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4, 8)}-${digitsOnly.slice(8, 12)}`;
    }
  };

  const [originalData, setOriginalData] = useState<{
    mainTraveler: typeof mainTravelerData;
    guests: Array<{
      _id?: string;
      fullName: string;
      phoneNumber: string;
      governmentIdNumber: string;
    }>;
  }>({
    mainTraveler: { fullName: '', email: '', phoneNumber: '', governmentIdNumber: '' },
    guests: []
  });

  // Assuming UPDATE_IN_BOOKING_FLOW can be used for updating travelers
  const { mutate: updateTravelers } = usePostData({
    url: API_ENDPOINTS.BOOKINGS.UPDATE_TRVELERS_DATA(bookingId),
    enableNotifications: false,
    onSuccess: () => {
      // Handle success if needed
    },
    onError: () => {
      // Handle error if needed
    }
  });

  useEffect(() => {
    if (travelers) {
      const mainData = {
        fullName: travelers.mainTraveler?.fullName || '',
        email: travelers.mainTraveler?.email || '',
        phoneNumber: travelers.mainTraveler?.phoneNumber || '',
        governmentIdNumber: travelers.mainTraveler?.governmentIdNumber || ''
      };

      const guestsData = (travelers.guests || []).map(guest => ({
        _id: guest?._id,
        fullName: guest?.fullName || '',
        phoneNumber: guest?.phoneNumber || '',
        governmentIdNumber: guest?.governmentIdNumber || ''
      }));

      setMainTravelerData(mainData);
      setGuestTravelersData(guestsData);
      setOriginalData({ mainTraveler: mainData, guests: guestsData });
    }
  }, [travelers]);

  const hasChanges = () => {
    const mainChanged = JSON.stringify(mainTravelerData) !== JSON.stringify(originalData.mainTraveler);
    const guestsChanged = JSON.stringify(guestTravelersData) !== JSON.stringify(originalData.guests);
    const hasErrors = validationErrors.main.phoneNumber || validationErrors.main.governmentIdNumber ||
                      validationErrors.guests.some(guest => guest.phoneNumber || guest.governmentIdNumber);
    return (mainChanged || guestsChanged) && !hasErrors;
  };

  const getCurrentData = (): TravelerUpdatePayload | null => {
    // Check if main traveler has validation errors
    if (validationErrors.main.phoneNumber || validationErrors.main.governmentIdNumber) {
      return null;
    }

    // Check if any guest has validation errors
    for (const guestError of validationErrors.guests) {
      if (guestError.phoneNumber || guestError.governmentIdNumber) {
        return null;
      }
    }

    return {
      mainTraveler: mainTravelerData,
      guests: guestTravelersData.map(guest => ({
        ...(guest._id && { _id: guest._id }),
        fullName: guest.fullName,
        phoneNumber: guest.phoneNumber,
        governmentIdNumber: guest.governmentIdNumber.replace(/-/g, '') // Remove formatting for API
      })),
      numberOfPeople: travelers?.numberOfPeople || 1
    };
  };

  // Notify parent of changes
  useEffect(() => {
    if (onDataChange && travelers) {
      const currentData = getCurrentData();
      onDataChange(hasChanges(), currentData);
    }
  }, [mainTravelerData, guestTravelersData, validationErrors, onDataChange, travelers]);

  // Reset to original data when parent requests
  useEffect(() => {
    if (onReset && travelers) {
      const mainData = {
        fullName: travelers.mainTraveler?.fullName || '',
        email: travelers.mainTraveler?.email || '',
        phoneNumber: travelers.mainTraveler?.phoneNumber || '',
        governmentIdNumber: travelers.mainTraveler?.governmentIdNumber || ''
      };

      const guestsData = (travelers.guests || []).map(guest => ({
        _id: guest?._id,
        fullName: guest?.fullName || '',
        phoneNumber: guest?.phoneNumber || '',
        governmentIdNumber: guest?.governmentIdNumber || ''
      }));

      setMainTravelerData(mainData);
      setGuestTravelersData(guestsData);
    }
  }, [onReset, travelers]);

  const handleFieldChange = (
    travelerType: 'main' | 'guest',
    index: number,
    field: keyof typeof mainTravelerData,
    value: string
  ) => {
    let processedValue = value;

    // Format government ID
    if (field === 'governmentIdNumber') {
      processedValue = formatGovernmentId(value);
    }

    if (travelerType === 'main') {
      setMainTravelerData(prev => ({ ...prev, [field]: processedValue }));

      // Validate
      if (field === 'phoneNumber') {
        const error = validatePhoneNumber(processedValue);
        setValidationErrors(prev => ({
          ...prev,
          main: { ...prev.main, phoneNumber: error }
        }));
      } else if (field === 'governmentIdNumber') {
        const error = validateGovernmentId(processedValue.replace(/-/g, ''));
        setValidationErrors(prev => ({
          ...prev,
          main: { ...prev.main, governmentIdNumber: error }
        }));
      }
    } else {
      setGuestTravelersData(prev => {
        const newGuests = [...prev];
        if (!newGuests[index]) {
          newGuests[index] = { _id: undefined, fullName: '', phoneNumber: '', governmentIdNumber: '' };
        }
        newGuests[index] = { ...newGuests[index], [field]: processedValue };
        return newGuests;
      });

      // Validate guest
      setValidationErrors(prev => {
        const newGuestsErrors = [...prev.guests];
        if (!newGuestsErrors[index]) {
          newGuestsErrors[index] = {};
        }

        if (field === 'phoneNumber') {
          newGuestsErrors[index].phoneNumber = validatePhoneNumber(processedValue);
        } else if (field === 'governmentIdNumber') {
          newGuestsErrors[index].governmentIdNumber = validateGovernmentId(processedValue.replace(/-/g, ''));
        }

        return {
          ...prev,
          guests: newGuestsErrors
        };
      });
    }
  };

  if (!travelers) {
    return null; 
  }

  return (
    <div className='flex flex-col gap-4'>

      <CollapsibleCard title={`Primary Traveler`}>
          <div className='px-4 pb-5 flex flex-col gap-1.5'>
            <CustomInput 
              placeholder='Full Name' 
              icon={UserIcon} 
              value={mainTravelerData.fullName} 
              onChange={(e) => handleFieldChange('main', 0, 'fullName', e.target.value)}
            />
            <CustomInput 
              placeholder='Email' 
              icon={EnvelopeIcon} 
              value={mainTravelerData.email} 
              onChange={(e) => handleFieldChange('main', 0, 'email', e.target.value)}
              readOnly 
            />
            <CustomInput 
              placeholder='Phone Number' 
              icon={PhoneIcon} 
              value={mainTravelerData.phoneNumber} 
              onChange={(e) => handleFieldChange('main', 0, 'phoneNumber', e.target.value)}
              error={!!validationErrors.main.phoneNumber}
            />
            <CustomInput 
              placeholder='Govt. ID Number (Adhaar)' 
              icon={IdentificationCardIcon} 
              value={mainTravelerData.governmentIdNumber} 
              onChange={(e) => handleFieldChange('main', 0, 'governmentIdNumber', e.target.value)}
              error={!!validationErrors.main.governmentIdNumber}
            />
          </div>
        </CollapsibleCard>

      {Array.from({ length: travelers.numberOfPeople - 1 }, (_, idx) => {
        const guestData = guestTravelersData[idx] || { fullName: '', phoneNumber: '', governmentIdNumber: '' };
        return (
          <CollapsibleCard title={`Traveler ${idx + 2}`} key={`traveler-${idx + 2}`}>
            <div className='px-4 pb-5 flex flex-col gap-1.5'>
              <CustomInput 
                placeholder='Full Name' 
                icon={UserIcon} 
                value={guestData.fullName} 
                onChange={(e) => handleFieldChange('guest', idx, 'fullName', e.target.value)}
              />
              <CustomInput 
                placeholder='Phone Number' 
                icon={PhoneIcon} 
                value={guestData.phoneNumber} 
                onChange={(e) => handleFieldChange('guest', idx, 'phoneNumber', e.target.value)}
                error={!!validationErrors.guests[idx]?.phoneNumber}
              />
              <CustomInput 
                placeholder='Govt. ID Number (Adhaar)' 
                icon={IdentificationCardIcon} 
                value={guestData.governmentIdNumber} 
                onChange={(e) => handleFieldChange('guest', idx, 'governmentIdNumber', e.target.value)}
                error={!!validationErrors.guests[idx]?.governmentIdNumber}
              />
            </div>
          </CollapsibleCard>
        );
      })}
    </div>
  );
};

export default TravelerSection;
