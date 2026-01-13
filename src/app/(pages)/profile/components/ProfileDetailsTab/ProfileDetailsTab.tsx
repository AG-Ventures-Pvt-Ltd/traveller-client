import { useGetData } from '@/services/useGetData';

interface EmergencyContact {
  name: string;
  contactNumber: string;
}


interface TravelerDetail {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  governmentIdType?: string;
  governmentIdNumber?: string;
}

interface ProfileDetailsTabProps {
  birthDate: string;
  emergencyContact?: EmergencyContact | null;
  onEditEmergencyContact: () => void;
  onAddTraveler: () => void;
  onEditTraveler: (traveler: TravelerDetail) => void;
  onDeleteTraveler: (traveler: TravelerDetail) => void;
}

export function ProfileDetailsTab({
  birthDate,
  emergencyContact: propEmergencyContact,
  onEditEmergencyContact,
  onAddTraveler,
  onEditTraveler,
  onDeleteTraveler,
}: ProfileDetailsTabProps) {
  const emergencyContact = propEmergencyContact || {
    name: 'Not added yet',
    contactNumber: 'Not added yet'
  };

  const { data: travelersData, isLoading: isLoadingTravelers } = useGetData<{ guestUsers: TravelerDetail[] }>('/api/client/v1/guestusers/me');

  const travelers = travelersData || { guestUsers: [] };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="bg-white rounded-3xl border-2 border-gray-200 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-start mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 font-['Satoshi']">
            Personal Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
              Date of Birth
            </span>
            <span className="text-neutral-900 text-base font-bold font-['Satoshi']">
              {birthDate}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl border-2 border-gray-200 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-start mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 font-['Satoshi']">
            Emergency Contact
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onEditEmergencyContact}
              className="p-2 bg-neutral-50 rounded-xl border-2 border-gray-200 hover:bg-neutral-100 transition-colors"
              title="Edit Emergency Contact"
            >
              <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none">
                <path
                  d="M10 2L12 4L5 11H3V9L10 2Z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
              Name
            </span>
            <span className="text-neutral-900 text-base font-bold font-['Satoshi']">
              {emergencyContact.name}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
              Phone Number
            </span>
            <span className="text-neutral-900 text-base font-bold font-['Satoshi']">
              {emergencyContact.contactNumber}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl border-2 border-gray-200 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 font-['Satoshi']">
              Saved Travelers
            </h2>
            <p className="text-neutral-700 text-sm font-medium font-['Satoshi'] mt-1">
              People you&apos;ve booked trips for previously
            </p>
          </div>
          <button
            onClick={onAddTraveler}
            className="px-3 sm:px-4 py-2 bg-neutral-900 text-white rounded-xl flex items-center gap-1.5 hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3V13M3 8H13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm font-bold font-['Satoshi']">Add Traveler</span>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {isLoadingTravelers ? (
            <div className="text-center py-8">
              <p className="text-neutral-500">Loading travelers...</p>
            </div>
          ) : travelers.guestUsers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-neutral-500">No saved travelers yet</p>
            </div>
          ) : (
            travelers.guestUsers.map((traveler, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-2xl border-2 border-gray-200 p-4 sm:p-6"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 font-['Satoshi']">
                    {traveler.fullName}
                  </h3>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => onEditTraveler(traveler)}
                      className="p-1.5 sm:p-2 bg-white rounded-lg border border-gray-300 hover:bg-neutral-100 transition-colors"
                      title="Edit Traveler"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M10 2L12 4L5 11H3V9L10 2Z"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDeleteTraveler(traveler)}
                      className="p-1.5 sm:p-2 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                      title="Delete Traveler"
                    >
                      <svg className="w-3.5 h-3.5 text-red-600" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2 3.5H12M5.5 3.5V2.5H8.5V3.5M3 3.5L3.5 11.5H10.5L11 3.5M5.5 6V9M8.5 6V9"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-neutral-700 text-xs font-medium font-['Satoshi']">
                      Email
                    </span>
                    <span className="text-neutral-900 text-sm font-bold font-['Satoshi']">
                      {traveler.email}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-neutral-700 text-xs font-medium font-['Satoshi']">
                      Phone Number
                    </span>
                    <span className="text-neutral-900 text-sm font-bold font-['Satoshi']">
                      {traveler.phone}
                    </span>
                  </div>
                  {traveler.governmentIdType && (
                    <div className="flex flex-col gap-1">
                      <span className="text-neutral-700 text-xs font-medium font-['Satoshi']">
                        Government ID Type
                      </span>
                      <span className="text-neutral-900 text-sm font-bold font-['Satoshi']">
                        {traveler.governmentIdType}
                      </span>
                    </div>
                  )}
                  {traveler.governmentIdNumber && (
                    <div className="flex flex-col gap-1">
                      <span className="text-neutral-700 text-xs font-medium font-['Satoshi']">
                        Government ID Number
                      </span>
                      <span className="text-neutral-900 text-sm font-bold font-['Satoshi']">
                        {traveler.governmentIdNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
