'use client';

import React from 'react';
import ProfileHeader from './components/ProfileHeader';
import ProfileBio from './components/ProfileBio';
import ContactInfo from './components/ContactInfo';
import ProfilePicture from './components/ProfilePicture';

interface ProfileData {
  name: string;
  username: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
  avatar: string;
}

interface ProfileCardProps {
  profileData: ProfileData;
  onEditProfile: () => void;
  onLogout?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profileData, onEditProfile, onLogout }) => {
  return (
    <div className="w-full bg-gradient-to-b from-neutral-50 to-gray-200 rounded-3xl border-2 border-gray-200 p-8 md:p-12">
      <div className="flex flex-col md:flex-row gap-8">
        <ProfilePicture imageSrc={profileData.avatar} />
        <div className="flex-1 flex flex-col gap-4">
          <ProfileHeader
            username={profileData.username}
            onEditProfile={onEditProfile}
            onLogout={onLogout}
          />
          <ProfileBio bio={profileData.bio} />
          <ContactInfo
            name={profileData.name}
            email={profileData.email}
            phone={profileData.phone}
            address={profileData.address}
            memberSince={profileData.memberSince}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;