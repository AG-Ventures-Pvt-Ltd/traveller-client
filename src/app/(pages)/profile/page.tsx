'use client'

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useGetData } from '@/services/useGetData';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import Modal from '@/common/ui/Modal';
import Button from '@/common/components/atoms/Button';
import MyImage from '@/common/ui/Image';
import { useRouter } from 'next/navigation';
import {
  ProfileDetailsTab,
  EditProfileModal,
  AddEmergencyContactModal,
  AddTravelerModal,
} from './components';
import {
  BookmarkSimpleIcon,
  ClockIcon,
  SuitcaseIcon,
  TicketIcon,
  CaretRightIcon,
  PencilSimpleIcon,
  SignOutIcon,
} from '@phosphor-icons/react';
import { ProfileData } from './types';
import { useDevice } from '@/common/hooks/useDevice';
import MobileProfilePage from './components/mobile/MobileProfilePage'


interface TravelerDetail {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  governmentIdType?: string;
  governmentIdNumber?: string;
}

const MENU_ITEMS = [
  { id: 'mytrips', label: 'My Trips', icon: SuitcaseIcon, href: '/profile/mytrips' },
  { id: 'bookmarks', label: 'Bookmarked Trips', icon: BookmarkSimpleIcon, href: '/profile/bookmarks' },
  { id: 'transactions', label: 'Transaction History', icon: ClockIcon, href: '/profile/transactions' },
  { id: 'tickets', label: 'Support Tickets', icon: TicketIcon, href: '/profile/tickets' },
];

export default function Page() {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEmergencyContactModalOpen, setIsEmergencyContactModalOpen] = useState(false);
  const [isTravelerModalOpen, setIsTravelerModalOpen] = useState(false);
  const [selectedTraveler, setSelectedTraveler] = useState<TravelerDetail | null>(null);
  const [isDeleteTravelerModalOpen, setIsDeleteTravelerModalOpen] = useState(false);
  const [travelerToDelete, setTravelerToDelete] = useState<TravelerDetail | null>(null);
  const [deleteUrl, setDeleteUrl] = useState('');

  const { mutate: updateProfile, isPending: isUpdatingProfile } = usePostData({
    url: API_ENDPOINTS.USER.UPDATE,
  });

  const { mutate: deleteGuestUser, isPending: isDeletingGuestUser } = usePostData({
    url: deleteUrl,
  });

  const { isMobile } = useDevice()

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

  const { data: userData, isLoading, error } = useGetData<{ fullName?: string; username?: string; bio?: string; email?: string; phone?: string; address?: string; city?: string; createdAt?: string; birthDate?: string; avatar?: string; governmentIdType?: string; governmentIdNumber?: string; emergencyContact?: { name: string; contactNumber: string } }>(API_ENDPOINTS.USER.ME(''),{ queryKey : ['user']});

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
      <div className="min-h-screen py-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 animate-pulse">
          <div className="flex items-center gap-6 bg-white rounded-3xl border-2 border-gray-200 p-8">
            <div className="w-24 h-24 rounded-full bg-gray-200" />
            <div className="flex-1 flex flex-col gap-3">
              <div className="h-6 bg-gray-200 rounded w-48" />
              <div className="h-4 bg-gray-200 rounded w-64" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    throw Error(error.message || 'Error Loading User Profile')
  }

  if (isMobile) {
    return <MobileProfilePage />
  }

  return (
    <div className="min-h-screen py-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        {/* Profile header card */}
        <div className="flex items-center gap-6 bg-white rounded-3xl border-2 border-gray-200 p-8">
          {profileData.avatar ? (
            profileData.avatar.startsWith('/') ? (
              <MyImage
                src={profileData.avatar}
                alt={profileData.name}
                rounded
                className="w-24 h-24 object-cover flex-shrink-0"
              />
            ) : (
              <Image
                src={profileData.avatar}
                alt={profileData.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              />
            )
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {profileData.name?.charAt(0) || 'W'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-neutral-900 line-clamp-1">
              {profileData.name}
            </h1>
            <p className="text-sm font-medium text-neutral-600 break-all">
              {profileData.email}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-5 py-3 bg-maintext text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
            >
              <PencilSimpleIcon size={20} weight="bold" />
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
            >
              <SignOutIcon size={20} weight="bold" />
              Logout
            </button>
          </div>
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className="flex items-center justify-between gap-3 px-5 py-5 bg-[#E2F4A6] rounded-2xl hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <Icon size={24} weight="bold" className="text-neutral-700" />
                  <span className="text-base font-medium text-neutral-900">{item.label}</span>
                </div>
                <CaretRightIcon size={22} weight="bold" className="text-neutral-500" />
              </button>
            );
          })}
        </div>

        {/* Profile details */}
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
      </div>

      <EditProfileModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profileData={profileData}
        onSave={handleSaveProfile}
        isLoading={isUpdatingProfile}
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
