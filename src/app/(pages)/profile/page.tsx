'use client'

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useGetData } from '@/services/useGetData';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import Modal from '@/common/ui/Modal';
import Button from '@/common/components/atoms/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ProfileCard,
  TabNavigation,
  TripFilterButtons,
  ProfileDetailsTab,
  EditProfileModal,
  UserTrips,
  AddReviewModal,
  ProfileCardSkeleton,
  AddEmergencyContactModal,
  AddTravelerModal,
  BookmarksTab,
} from './components';
import { ProfileData, Tab, FilterOption } from './types';

interface TravelerDetail {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  governmentIdType?: string;
  governmentIdNumber?: string;
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEmergencyContactModalOpen, setIsEmergencyContactModalOpen] = useState(false);
  const [isTravelerModalOpen, setIsTravelerModalOpen] = useState(false);
  const [selectedTripTitle, setSelectedTripTitle] = useState('');
  const [selectedTraveler, setSelectedTraveler] = useState<TravelerDetail | null>(null);
  const [isDeleteTravelerModalOpen, setIsDeleteTravelerModalOpen] = useState(false);
  const [travelerToDelete, setTravelerToDelete] = useState<TravelerDetail | null>(null);

  const [deleteUrl, setDeleteUrl] = useState('');

  // Initialize active tab from query params
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      const tabIndex = parseInt(tabParam, 10);
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex <= 3) {
        setActiveTab(tabIndex);
      }
    }
  }, [searchParams]);

  const { mutate: updateProfile, isPending: isUpdatingProfile } = usePostData({
    url: API_ENDPOINTS.USER.UPDATE,
  });

  const { mutate: deleteGuestUser, isPending: isDeletingGuestUser } = usePostData({
    url: deleteUrl,
  });

  useEffect(() => {
    if (travelerToDelete?._id) {
      setDeleteUrl(API_ENDPOINTS.GUEST_USERS.DELETE(travelerToDelete._id));
    }
  }, [travelerToDelete?._id]);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    username: '',
    bio: '',
    email: '',
    phone: '',
    address: '',
    memberSince: '',
    birthDate: '',
    avatar: '',
    governmentIdType: '',
    governmentIdNumber: ''
  });

  const { data: userData, isLoading, error } = useGetData<{ fullName?: string; username?: string; bio?: string; email?: string; phone?: string; address?: string; city?: string; createdAt?: string; birthDate?: string; avatar?: string; governmentIdType?: string; governmentIdNumber?: string; emergencyContact?: { name: string; contactNumber: string } }>(API_ENDPOINTS.USER.ME);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not added yet';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch {
      return 'Not added yet';
    }
  };

  useEffect(() => {
    if (userData) {
      setProfileData({
        name: userData.fullName || 'Not added yet',
        username: userData.username || 'Not added yet',
        bio: userData.bio || 'Not added yet',
        email: userData.email || 'Not added yet',
        phone: userData.phone || 'Not added yet',
        address: userData.address || userData.city || 'Not added yet',
        memberSince: formatDate(userData.createdAt || ''),
        birthDate: userData.birthDate || 'Not added yet',
        avatar: userData.avatar || "",
        governmentIdType: userData.governmentIdType || 'Not added yet',
        governmentIdNumber: userData.governmentIdNumber || 'Not added yet'
      });
    }
  }, [userData]);

  const tabs: Tab[] = [
    { label: 'Profile Details', active: activeTab === 0 },
    { label: 'My Trips', active: activeTab === 1 },
    { label: 'My Reviews', active: activeTab === 2 },
    { label: 'My Bookmarks', active: activeTab === 3 },
  ];

  const filters: FilterOption[] = [
    { label: 'All Trips', count: 0, active: activeFilter === 0 },
    { label: 'Upcoming', count: 0, active: activeFilter === 1 },
    { label: 'Completed', count: 0, active: activeFilter === 2 },
  ];

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth' });
  };

  const handleSaveProfile = (updatedData: ProfileData, addressComponents: { address: string; city: string; state: string }) => {
    const updatePayload = {
      username: updatedData.username,
      birthDate: updatedData.birthDate,
      bio: updatedData.bio,
      address: {
        address: addressComponents.address,
        city: addressComponents.city,
        state: addressComponents.state,
      },
      avatar: updatedData.avatar,
      mobileNumber: updatedData.phone,
      governmentIdType: updatedData.governmentIdType,
      governmentIdNumber: updatedData.governmentIdNumber,
    };

    updateProfile(updatePayload, {
      onSuccess: () => {
        setProfileData(updatedData);
      },
      onError: (error: Error) => {
        void error;
      },
    });
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    // Update query params to persist tab state
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', index.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (index: number) => {
    setActiveFilter(index);
  };

  const handleAddReview = (tripTitle: string) => {
    setSelectedTripTitle(tripTitle);
    setIsWriteReviewModalOpen(true);
  };

  const handleEditEmergencyContact = () => {
    setIsEmergencyContactModalOpen(true);
  };

  const handleAddTraveler = () => {
    setSelectedTraveler(null);
    setIsTravelerModalOpen(true);
  };

  const handleEditTraveler = (traveler: TravelerDetail) => {
    setSelectedTraveler(traveler);
    setIsTravelerModalOpen(true);
  };

  const handleDeleteTraveler = (traveler: TravelerDetail) => {
    setTravelerToDelete(traveler);
    setIsDeleteTravelerModalOpen(true);
  };

  const handleConfirmDeleteTraveler = () => {
    if (travelerToDelete?._id) {
      deleteGuestUser({}, {
        onSuccess: () => {
          setIsDeleteTravelerModalOpen(false);
          setTravelerToDelete(null);
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-8">
          <ProfileCardSkeleton />
          <div className="flex gap-4">
            <div className="h-10 bg-gray-200 rounded-xl w-32 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded-xl w-32 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded-xl w-32 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded-xl w-32 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    throw Error(error.message || 'Error Loading User Profile')
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6 sm:gap-8">
        <ProfileCard
          profileData={profileData}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              sublabel={stat.sublabel}
            />
          ))}
        </div> */}
        <TabNavigation tabs={tabs} onTabChange={handleTabChange} />
        {activeTab === 1 && (
          <>
            <TripFilterButtons filters={filters} onFilterChange={handleFilterChange} />
            <UserTrips
              activeFilter={activeFilter}
              onAddReview={handleAddReview}
            />
          </>
        )}
        {activeTab === 2 && (
          <div className="flex flex-col gap-6">
            <div className="text-center py-12">
              <p className="text-neutral-700 text-lg font-['Satoshi']">No reviews yet</p>
            </div>
          </div>
        )}
        {activeTab === 3 && (
          <BookmarksTab />
        )}
        {activeTab === 0 && (
          <ProfileDetailsTab
            birthDate={profileData.birthDate}
            governmentIdType={profileData.governmentIdType}
            governmentIdNumber={profileData.governmentIdNumber}
            emergencyContact={userData?.emergencyContact ? {
              name: userData.emergencyContact.name,
              contactNumber: userData.emergencyContact.contactNumber
            } : null}
            onEditEmergencyContact={handleEditEmergencyContact}
            onAddTraveler={handleAddTraveler}
            onEditTraveler={handleEditTraveler}
            onDeleteTraveler={handleDeleteTraveler}
          />
        )}
      </div>
      <EditProfileModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profileData={profileData}
        onSave={handleSaveProfile}
        isLoading={isUpdatingProfile}
      />
      <AddReviewModal
        open={isWriteReviewModalOpen}
        onClose={() => setIsWriteReviewModalOpen(false)}
        tripTitle={selectedTripTitle}
      />
      <AddEmergencyContactModal
        open={isEmergencyContactModalOpen}
        onClose={() => setIsEmergencyContactModalOpen(false)}
        existingContact={userData?.emergencyContact ? {
          name: userData.emergencyContact.name,
          contactNumber: userData.emergencyContact.contactNumber
        } : null}
      />
      <AddTravelerModal
        open={isTravelerModalOpen}
        onClose={() => setIsTravelerModalOpen(false)}
        existingTraveler={selectedTraveler}
      />
      <Modal
        title="Delete Traveler"
        open={isDeleteTravelerModalOpen}
        onClose={() => setIsDeleteTravelerModalOpen(false)}
        showButtons={false}
      >
        <div className="flex flex-col gap-4">
          <p className="text-neutral-700">
            Are you sure you want to delete <span className="font-semibold">{travelerToDelete?.fullName}</span>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outlined"
              onClick={() => setIsDeleteTravelerModalOpen(false)}
              className="flex-1"
              disabled={isDeletingGuestUser}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmDeleteTraveler}
              className="flex-1 bg-red-600 hover:bg-red-700"
              disabled={isDeletingGuestUser}
            >
              {isDeletingGuestUser ? 'Deleting...' : 'Delete Traveler'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}