import { useState, useEffect } from 'react'
import { useGetData } from '@/services/useGetData'
import usePostData from '@/services/usePostData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { ProfileData } from '../../types'

interface TravelerDetail {
  _id?: string
  fullName: string
  email: string
  phone: string
  governmentIdType?: string
  governmentIdNumber?: string
}

interface UserData {
  fullName?: string
  username?: string
  bio?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  createdAt?: string
  birthDate?: string
  avatar?: string
  governmentIdType?: string
  governmentIdNumber?: string
  emergencyContact?: { name: string; contactNumber: string }
}

export const useMobileProfileData = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false)
  const [isEmergencyContactModalOpen, setIsEmergencyContactModalOpen] = useState(
    false
  )
  const [isTravelerModalOpen, setIsTravelerModalOpen] = useState(false)
  const [selectedTraveler, setSelectedTraveler] = useState<TravelerDetail | null>(
    null
  )
  const [selectedTripTitle, setSelectedTripTitle] = useState('')
  const [deleteUrl, setDeleteUrl] = useState('')
  const [isDeleteTravelerModalOpen, setIsDeleteTravelerModalOpen] = useState(
    false
  )
  const [travelerToDelete, setTravelerToDelete] = useState<TravelerDetail | null>(
    null
  )
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
    governmentIdNumber: '',
  })

  const { mutate: updateProfile, isPending: isUpdatingProfile } = usePostData({
    url: API_ENDPOINTS.USER.UPDATE,
  })

  const { mutate: deleteGuestUser, isPending: isDeletingGuestUser } = usePostData(
    {
      url: deleteUrl,
    }
  )

  const { data: userData, isLoading, error } = useGetData<UserData>(
    API_ENDPOINTS.USER.ME(''), { queryKey : ['user','profile']}
  )

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not added yet'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    } catch {
      return 'Not added yet'
    }
  }

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
        avatar: userData.avatar || '',
        governmentIdType: userData.governmentIdType || 'Not added yet',
        governmentIdNumber: userData.governmentIdNumber || 'Not added yet',
      })
    }
  }, [userData])

  useEffect(() => {
    if (travelerToDelete?._id) {
      setDeleteUrl(API_ENDPOINTS.GUEST_USERS.DELETE(travelerToDelete._id))
    }
  }, [travelerToDelete?._id])

  const handleSaveProfile = (
    updatedData: ProfileData,
    addressComponents: { address: string; city: string; state: string }
  ) => {
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
    }

    updateProfile(updatePayload, {
      onSuccess: () => {
        setProfileData(updatedData)
      },
      onError: (error: Error) => {
        void error
      },
    })
  }

  const handleConfirmDeleteTraveler = () => {
    if (travelerToDelete?._id) {
      deleteGuestUser(
        {},
        {
          onSuccess: () => {
            setIsDeleteTravelerModalOpen(false)
            setTravelerToDelete(null)
          },
        }
      )
    }
  }

  return {
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
    setSelectedTraveler,
    selectedTripTitle,
    setSelectedTripTitle,
    travelerToDelete,
    setTravelerToDelete,
    // Profile data
    profileData,
    setProfileData,
    userData,
    isLoading,
    error,
    isUpdatingProfile,
    isDeletingGuestUser,
    // Handlers
    handleSaveProfile,
    handleConfirmDeleteTraveler,
  }
}
