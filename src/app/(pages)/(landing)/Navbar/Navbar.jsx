

import React from 'react'
import Button from '@/common/components/atoms/Button'
import Logo from '@/common/components/atoms/Logo/Logo'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { usePathname } from "next/navigation";


const navItems = [
          { title : 'Trips', route : "/trips" }, 
          { title : 'About', route : "/about" }, 
        ]

const hiddenPaths = ['/auth', '/verify']

const Navbar = () => {

  const { data: session } = useSession();

  const router = useRouter();

  const pathname = usePathname();

  const hideNav = hiddenPaths.some(path => pathname.startsWith(path));

  if (hideNav) {
    return <></>
  }

  return (
    <div className='px-9 py-5 bg-white/96 flex items-center border-b border-b-[#EDEDED] sticky top-0 z-50'>
      <div className='flex-1 flex items-center gap-2.5'>
        <div className='flex-1 flex flex-col items-start justify-center'>
          <Logo />
        </div>
        <div className='flex-1 flex justify-end items-center'>
          <div className='flex items-center gap-5'>
            {navItems.map((item) => (
              <div key={item.title} onClick={() => router.push(item.route)} className='flex flex-col items-start text-[#121212] font-bold cursor-pointer'>
                {item.title}
              </div>
            ))}
            <div className='flex flex-col items-start'>
              {session?.user ? (
                <div
                  className='p-2 bg-black rounded-full flex items-center gap-2.5 cursor-pointer'
                  onClick={() => router.push('/profile')}
                >
                  <User className='text-white' />
                </div>
              ) : (
                <button
                  className='px-[17px] py-2 bg-black rounded-xl flex items-center gap-2.5'
                  onClick={() => router.push('/auth')}
                >
                  <div className='flex flex-col justify-center text-white text-[15.4px] font-bold leading-[20.8px]'>
                    Sign In
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar