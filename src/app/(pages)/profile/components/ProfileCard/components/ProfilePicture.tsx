'use client';

import React from 'react';
import { User } from 'lucide-react';
import MyImage from '@/common/ui/Image';

interface ProfilePictureProps {
  imageSrc: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ imageSrc }) => {
  return (
    <div className="flex-shrink-0">
      <div className="w-40 h-40 p-1 bg-white rounded-3xl shadow-lg border-4 border-white overflow-hidden">
        {imageSrc ? (
          <MyImage 
            src={imageSrc} 
            alt="Profile" 
            className="w-full h-full" 
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
            <User size={64} className="text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;