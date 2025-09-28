'use client'

import Button from '@/common/components/atoms/Button'
import React from 'react'
import { useLogin, providers } from '../../../hooks/useLogin'
import Image from 'next/image'



export const GoogleLogin = () => {

  const { signInWithGoogle } = useLogin(providers.GOOGLE)

  return (
    <Button
      onClick={() => signInWithGoogle?.()}
      className="flex items-center gap-2 border rounded px-6 py-2 justify-center w-full"
    >
      <Image 
          src="https://www.svgrepo.com/show/475656/google-color.svg" 
          alt="Google" 
          width={24} 
          height={24} 
      />
      Login with Google
    </Button>
  )
}

