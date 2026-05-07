import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/common/ui/avatar'

interface HostAvatarProps {
  avatar?: string
  fullName?: string
  className?: string
}

const HostAvatar: React.FC<HostAvatarProps> = ({ avatar, fullName, className }) => {
  return (
    <Avatar className={`w-24 h-24 border-4 border-white ${className || ''}`}>
      {avatar ? (
        <AvatarImage src={avatar} alt={fullName || 'Host'} />
      ) : null}
      <AvatarFallback name={fullName}>
        {fullName ? fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'W'}
      </AvatarFallback>
    </Avatar>
  )
}

export default HostAvatar