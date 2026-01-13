'use client';

import React from 'react';

interface ProfileBioProps {
  bio: string;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ bio }) => {
  const isNotAdded = bio === 'Not added yet';
  
  return (
    <p className={`text-base font-medium font-['Satoshi'] leading-6 max-w-2xl ${
      isNotAdded ? 'text-gray-400 italic' : 'text-subtext'
    }`}>
      {bio}
    </p>
  );
};

export default ProfileBio;