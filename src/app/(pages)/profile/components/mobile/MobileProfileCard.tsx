import React from 'react'
import MyImage from '@/common/ui/Image'
import { ProfileData } from '../../types'

interface MobileProfileCardProps {
  profileData: ProfileData
}

const MobileProfileCard: React.FC<MobileProfileCardProps> = ({ profileData }) => {
  return (
    <div className="flex items-center gap-4 px-4 py-6">
      {profileData.avatar ? (
        <MyImage
          src={profileData.avatar}
          alt={profileData.name}
          className="w-20 h-20 rounded-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
          {profileData.name?.charAt(0) || 'U'}
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-base font-medium text-neutral-900 line-clamp-1">
          {profileData.name}
        </h2>
        <p className="text-sm font-medium line-clamp-1">{profileData.email}</p>
      </div>
    </div>
  )
}

export default MobileProfileCard
