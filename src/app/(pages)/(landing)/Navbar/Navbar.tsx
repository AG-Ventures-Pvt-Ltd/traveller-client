'use client'

import React, { useState, useEffect } from 'react'
import Logo from '@/common/components/atoms/Logo/Logo'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User, Menu, X } from 'lucide-react'
import { usePathname } from "next/navigation"
import './Navbar.module.css'
import { navItems, authenticatedNavItems, hiddenPaths } from './constants'

const Navbar = () => {

  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  const handleNavigation = (route: string) => {
    router.push(route);
    setMobileMenuOpen(false); 
  };

  return <></>

  return (
    <>
      <div className='px-2 md:px-9 py-5 bg-white/96 flex items-center border-b border-b-[#EDEDED] sticky top-0 z-50'>
        <div className='flex-1 flex items-center gap-2.5'>
          <div className='flex-1 flex flex-col items-start justify-center'>
            <Logo />
          </div>
          <div className='flex-1 flex justify-end items-center'>
            <div className='flex items-center gap-3 md:gap-12'>
              <div className='hidden md:flex items-center gap-12'>
                {navItems.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => handleNavigation(item.route)}
                    className='flex items-center gap-1.5 text-[#121212] font-bold cursor-pointer hover:text-gray-600 transition-colors whitespace-nowrap'
                  >
                    {item.title}
                    {item.isNew && (
                      <span className='text-[12px] font-bold px-1.5 py-0.5 rounded-full bg-[#E8674A]/10 text-[#C4532A] leading-none'>
                        New
                      </span>
                    )}
                  </div>
                ))}
                {status === 'authenticated' && authenticatedNavItems.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => handleNavigation(item.route)}
                    className='flex flex-col items-start text-[#121212] font-bold cursor-pointer hover:text-gray-600 transition-colors whitespace-nowrap'
                  >
                    {item.title}
                  </div>
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
                  <div
                    className='p-2 bg-black rounded-full flex items-center gap-2.5 cursor-pointer hover:bg-gray-800 transition-colors'
                    onClick={() => router.push('/profile')}
                  >
                    <User className='text-white w-5 h-5' />
                  </div>
                )}
                {status === 'unauthenticated' && (
                  <button
                    className='px-3 py-2 bg-black rounded-xl flex items-center gap-2.5 whitespace-nowrap hover:bg-gray-800 transition-colors'
                    onClick={() => router.push('/auth')}
                  >
                    <div className='flex flex-col justify-center text-white text-sm font-bold'>
                      Sign In
                    </div>
                  </button>
                )}
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
                aria-label='Toggle menu'
              >
                {mobileMenuOpen ? (
                  <X className='w-6 h-6 text-[#121212]' />
                ) : (
                  <Menu className='w-6 h-6 text-[#121212]' />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black/50 z-40 top-[73px]'
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div
        className={`md:hidden fixed top-[73px] left-0 right-0 bg-white border-b border-[#EDEDED] shadow-lg z-40 transition-all duration-300 ease-in-out ${mobileMenuOpen
          ? 'max-h-[400px] opacity-100'
          : 'max-h-0 opacity-0 overflow-hidden'
          }`}
      >
        <div className='flex flex-col py-4'>
          {navItems.map((item, index) => (
            <div
              key={item.title}
              onClick={() => handleNavigation(item.route)}
              className={`px-6 py-4 text-[#121212] font-bold cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 whitespace-nowrap flex items-center gap-2 ${mobileMenuOpen ? 'animate-[slideIn_0.3s_ease-out_forwards]' : 'opacity-0'
                }`}
              style={{
                animationDelay: mobileMenuOpen ? `${index * 0.05}s` : '0s',
              }}
            >
              {item.title}
              {item.isNew && (
                <span className='text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#E8674A]/10 text-[#C4532A] leading-none'>
                  New
                </span>
              )}
            </div>
          ))}
         {status === "authenticated" && authenticatedNavItems.map((item, index) => (
            <div
              key={item.title}
              onClick={() => handleNavigation(item.route)}
              className={`px-6 py-4 text-[#121212] font-bold cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 whitespace-nowrap ${mobileMenuOpen ? 'animate-[slideIn_0.3s_ease-out_forwards]' : 'opacity-0'
                }`}
              style={{
                animationDelay: mobileMenuOpen ? `${(navItems.length + index) * 0.05}s` : '0s',
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar