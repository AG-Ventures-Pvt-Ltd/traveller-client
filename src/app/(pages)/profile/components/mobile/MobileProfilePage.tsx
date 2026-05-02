'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ProfileCardSkeleton } from '..'
import MobileProfileCard from './MobileProfileCard'
import MenuSection from './MenuSection'
import LogoutSection from './LogoutSection'
import DeleteTravelerModal from './DeleteTravelerModal'
import {
  EditProfileModal,
  AddReviewModal,
  AddEmergencyContactModal,
  AddTravelerModal,
} from '..'
import { useMobileProfileData } from './useMobileProfileData'
import BackButton from '@/common/ui/BackButton'


const MobileProfilePage = () => {
  const router = useRouter()
  const {
    // Modal states
    isEditModalOpen,
    setIsEditModalOpen,
    isWriteReviewModalOpen,
    setIsWriteReviewModalOpen,
    isEmergencyContactModalOpen,
    setIsEmergencyContactModalOpen,
    isTravelerModalOpen,
    setIsTravelerModalOpen,
    isDeleteTravelerModalOpen,
    setIsDeleteTravelerModalOpen,
    selectedTraveler,
    selectedTripTitle,
    travelerToDelete,
    // Profile data
    profileData,
    userData,
    isLoading,
    error,
    isUpdatingProfile,
    isDeletingGuestUser,
    // Handlers
    handleSaveProfile,
    handleConfirmDeleteTraveler,
  } = useMobileProfileData()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4">
        <ProfileCardSkeleton />
      </div>
    )
  }

  if (error) {
    throw Error(error.message || 'Error Loading User Profile')
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      <BackButton label='Profile' className='my-4' to='/'/>
      <MobileProfileCard profileData={profileData} />
      {/* <StatsSection /> */}
      <MenuSection onEditProfile={() => setIsEditModalOpen(true)} router={router} />
      <LogoutSection />
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
          contactNumber: userData.emergencyContact.contactNumber,
        } : null}
      />
      <AddTravelerModal
        open={isTravelerModalOpen}
        onClose={() => setIsTravelerModalOpen(false)}
        existingTraveler={selectedTraveler}
      />
      <DeleteTravelerModal
        open={isDeleteTravelerModalOpen}
        onClose={() => setIsDeleteTravelerModalOpen(false)}
        traveler={travelerToDelete}
        isDeletingGuestUser={isDeletingGuestUser}
        onConfirmDelete={handleConfirmDeleteTraveler}
      />
    </div>
  )
}

export default MobileProfilePage