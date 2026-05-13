import React from 'react'
import { ProfileData } from '../../types'
import Image from 'next/image'
import MyImage from '@/common/ui/Image'


interface MobileProfileCardProps {
  profileData: ProfileData
}

const MobileProfileCard: React.FC<MobileProfileCardProps> = ({ profileData }) => {

  return (
    <div className="flex items-center gap-4 py-6">
      {profileData.avatar ? (
        profileData.avatar.startsWith('/') ? (
          <MyImage
            src={profileData.avatar}
            alt={profileData.name}
            rounded
            className="w-20 h-20 object-cover"
          />
        ) : (
          <Image
            src={profileData.avatar}
            alt={profileData.name}
            width={0}
            height={0}
            className="w-20 h-20 rounded-full object-cover"
          />
        )
      ) : (
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
          {profileData.name?.charAt(0) || 'W'}
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-xl font-medium text-neutral-900 line-clamp-1">
          {profileData.name}
        </h2>
        <p className="text-xs font-medium break-all">
          {profileData.email}
        </p>
      </div>
    </div>
  )
}

export default MobileProfileCard
