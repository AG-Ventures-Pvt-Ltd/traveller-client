'use client';

import React from 'react';
import { House, PaperPlaneTilt, UserCircleIcon } from '@phosphor-icons/react';
import { useRouter, usePathname } from 'next/navigation';

interface StickyNavigationProps {
  showProfile?: boolean;
}

const HIDDEN_ROUTES = ['/trip/', '/wallet', '/auth', '/verify', '/profile/'];

const StickyNavigation: React.FC<StickyNavigationProps> = ({
  showProfile = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isHiddenRoute = HIDDEN_ROUTES.some(route => pathname.startsWith(route));

  if (isHiddenRoute) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleTripsClick = () => {
    router.push('/trips');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex items-center gap-1 bg-[#2a2a2a] rounded-full px-2 py-2 sm:px-3 sm:py-3 shadow-lg">
        {/* Home Button */}
        <button
          onClick={handleHomeClick}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
            isActive('/') 
              ? 'bg-[#EEA0FF] text-black' 
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Home"
        >
          <House size={20} weight="thin" />
        </button>

        {/* Share Button */}
        <button
          onClick={handleTripsClick}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
            isActive('/trips') 
              ? 'bg-[#EEA0FF] text-black' 
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Trips"
        >
          <PaperPlaneTilt size={20} weight="thin" />
        </button>

        {/* Profile Button */}
        {showProfile && (
          <button
            onClick={handleProfileClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              isActive('/profile') 
                ? 'bg-[#EEA0FF] text-black' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Profile"
          >
            <UserCircleIcon size={22} weight="thin" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StickyNavigation;
