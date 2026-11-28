'use client';

import React from 'react';
import Link from 'next/link';
import { HouseIcon, PersonSimpleHikeIcon, HeadsetIcon, UserCircleIcon } from '@phosphor-icons/react';
import TripIcon from '@/common/components/atoms/TripIcon';
import { usePathname } from 'next/navigation';
import { useDevice } from '@/common/hooks/useDevice';

interface StickyNavigationProps {
  showProfile?: boolean;
}

const ACTIVE_ROUTES = ['/', '/profile', '/auth', '/contact'];

const StickyNavigation: React.FC<StickyNavigationProps> = ({
  showProfile = true,
}) => {
  const pathname = usePathname();
  const { isDesktop, isHydrated } = useDevice();

  if (!ACTIVE_ROUTES.includes(pathname) || !isHydrated || isDesktop) {
    return null;
  }

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  const items = [
    { href: '/', label: 'Home', Icon: HouseIcon, active: isActive('/') },
    { href: '/trips', label: 'Trips', Icon: TripIcon, active: isActive('/trips') },
    { href: '/treks', label: 'Treks', Icon: PersonSimpleHikeIcon, active: isActive('/treks') },
    { href: '/contact', label: 'Contact', Icon: HeadsetIcon, active: isActive('/contact') },
    ...(showProfile
      ? [{ href: '/profile', label: 'Profile', Icon: UserCircleIcon, active: isActive('/profile') || isActive('/auth') }]
      : []),
  ];

  return (
    <div className="fixed bottom-6 right-4 z-40">
      <div className="flex items-center gap-1 bg-[#454545] rounded-full px-2.5 py-2.5 sm:px-3 sm:py-3 shadow-lg">
        {items.map(({ href, label, Icon, active }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors active:scale-90 ${
              active ? 'bg-[#EEA0FF] text-black' : 'text-white hover:bg-white/10'
            }`}
          >
            <Icon size={24} weight="thin" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StickyNavigation;
