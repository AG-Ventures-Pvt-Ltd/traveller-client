

import React from 'react'
import Button from '@/common/components/atoms/Button'
import Logo from '@/common/components/atoms/Logo/Logo'


const navItems = ['Discover', 'Review', 'More']

const Navbar = () => {
  return (
    <div className='flex justify-between mx-24 my-12 items-center'>
        <Logo/>
        <div className='flex gap-20 text-2xl'>
            {navItems.map((item) => (
                <h2 key={item}>{item}</h2>
            ))}
        </div>
        <Button>Signup</Button>
    </div>
  )
}

export default Navbar