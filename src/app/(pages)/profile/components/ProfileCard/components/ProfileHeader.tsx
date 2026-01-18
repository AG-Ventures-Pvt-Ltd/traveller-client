'use client';

import React from 'react';

interface ProfileHeaderProps {
  username: string;
  onEditProfile: () => void;
  onLogout?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, onEditProfile, onLogout }) => {
  const isNotAdded = username === 'Not added yet';
  
  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex flex-col gap-2 flex-1">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-['Satoshi'] leading-tight ${
          isNotAdded ? 'text-gray-400 italic' : 'text-maintext'
        }`}>
          {isNotAdded ? username : `@${username}`}
        </h1>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          className="bg-maintext text-white p-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center"
          onClick={onEditProfile}
          title="Edit Profile"
        >
          <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none">
            <path d="M11 2L14 5L5 14H2V11L11 2Z" stroke="currentColor" strokeWidth="1.33" />
          </svg>
        </button>
        {onLogout && (
          <button
            className="bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
            onClick={onLogout}
            title="Logout"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline font-['Satoshi'] font-bold">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;