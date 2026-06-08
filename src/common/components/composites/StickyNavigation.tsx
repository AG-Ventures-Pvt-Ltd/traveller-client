'use client';

import React from 'react';
import { HouseIcon, PaperPlaneTiltIcon, UserCircleIcon } from '@phosphor-icons/react';
import { useRouter, usePathname } from 'next/navigation';
import { useDevice } from '@/common/hooks/useDevice';

interface StickyNavigationProps {
  showProfile?: boolean;
}

const ACTIVE_ROUTES = ['/','/profile','/auth' ];

const StickyNavigation: React.FC<StickyNavigationProps> = ({
  showProfile = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const { isDesktop, isHydrated } = useDevice()

const isActiveRoute =
  pathname === '/' ||
  ACTIVE_ROUTES.some(
    route => route !== '/' && pathname === route
  );

  if (!isActiveRoute) {
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

  if (!isHydrated || isDesktop) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-4 z-40">
      <div className="flex items-center gap-1 bg-[#454545] rounded-full px-2.5 py-2.5 sm:px-3 sm:py-3 shadow-lg">
        {/* Home Button */}
        <button
          onClick={handleHomeClick}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
            isActive('/') 
              ? 'bg-[#EEA0FF] text-black' 
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Home"
        >
          <HouseIcon size={24} weight="thin" />
        </button>

        {/* Share Button */}
        <button
          onClick={handleTripsClick}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
            isActive('/trips') 
              ? 'bg-[#EEA0FF] text-black' 
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Trips"
        >
          <PaperPlaneTiltIcon size={24} weight="thin" />
        </button>

        {/* Profile Button */}
        {showProfile && (
          <button
            onClick={handleProfileClick}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
              isActive('/profile') || isActive('/auth')
                ? 'bg-[#EEA0FF] text-black' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Profile"
          >
            <UserCircleIcon size={24} weight="thin" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StickyNavigation;
