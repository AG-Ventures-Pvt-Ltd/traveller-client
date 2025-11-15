

import React from 'react'
import Button from '@/common/components/atoms/Button'
import Logo from '@/common/components/atoms/Logo/Logo'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const navItems = ['Discover', 'Review', 'More']

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    return parts.map(part => part.charAt(0)).join('').toUpperCase();
  };

  return (
    <div className='flex justify-between mx-24 my-12 items-center'>
        <Logo/>
        <div className='flex gap-20 text-2xl'>
            {navItems.map((item) => (
                <h2 key={item}>{item}</h2>
            ))}
        </div>
        {session?.user ? (
          <div 
            className='w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold cursor-pointer'
            onClick={() => router.push('/profile')}
          >
            {getInitials(session.user.fullName)}
          </div>
        ) : (
          <Button>Signup</Button>
        )}
    </div>
  )
}

export default Navbar