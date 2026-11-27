'use client'

import React, { useState, useEffect } from 'react'
import Logo from '@/common/components/atoms/Logo/Logo'
import DesktopLocationSelector from '../DesktopLanding/components/LocationSelector'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { User } from 'lucide-react'
import { usePathname } from "next/navigation"
import './Navbar.module.css'
import { navItems, authenticatedNavItems, hiddenPaths } from './constants'

const Navbar = () => {

  const { status } = useSession();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hideNav = hiddenPaths.some(path => pathname.startsWith(path));

  // Hide navbar on mobile devices
  if (!isHydrated || isMobile || hideNav) {
    return <></>
  }

  return (
    <>
      <div className='px-2 md:px-9 py-5 bg-[#FFF9F4] flex items-center sticky top-0 z-50'>
        <div className='flex-1 flex items-center gap-2.5'>
          <div className='flex-1 flex items-center justify-start gap-6'>
            <Logo />
            {(pathname === '/' || pathname === '/trips' || pathname === '/treks') && <DesktopLocationSelector />}
          </div>
          <div className='flex-1 flex justify-end items-center'>
            <div className='flex items-center gap-3 md:gap-12'>
              <div className='hidden md:flex items-center gap-12'>
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.route}
                    className={`flex items-center gap-1.5 text-[#121212] cursor-pointer hover:text-gray-600 transition-colors whitespace-nowrap text-xl ${(item.route === '/' ? pathname === '/' : pathname.startsWith(item.route)) ? 'font-semibold' : ''}`}
                  >
                    {item.title}
                    {item.isNew && (
                      <span className='text-[12px] font-bold px-1.5 py-0.5 rounded-full bg-[#E8674A]/10 text-[#C4532A] leading-none'>
                        New
                      </span>
                    )}
                  </Link>
                ))}
                {status === 'authenticated' && authenticatedNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.route}
                    className='flex items-center text-[#121212] cursor-pointer hover:text-gray-600 transition-colors whitespace-nowrap text-xl'
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className='flex flex-col items-start'>
                {status === 'loading' && (
                  <div className='p-2 bg-gray-200 rounded-full flex items-center gap-2.5 animate-pulse relative overflow-hidden'>
                    <div className='w-4 h-4 bg-gray-300 rounded-full animate-pulse'></div>
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent animate-pulse'></div>
                  </div>
                )}
                {status === 'authenticated' && (
                  <Link
                    href='/profile'
                    aria-label='Profile'
                    className='p-2 bg-black rounded-full flex items-center gap-2.5 cursor-pointer'
                  >
                    <User className='text-white w-5 h-5' />
                  </Link>
                )}
                {status === 'unauthenticated' && (
                  <Link
                    href='/auth'
                    className='!px-4 py-1.5 bg-[#EEA0FF] rounded-xl flex items-center gap-2.5 whitespace-nowrap text-lg'
                  >
                      Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar