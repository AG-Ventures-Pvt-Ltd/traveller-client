import React from 'react'
import Button from '../../../../../../common/components/atoms/Button'
import { providers, useLogin } from '../../../hooks/useLogin'
import Image from 'next/image'

export const FacebookLogin = () => {

    const { signInWithFacebook } = useLogin(providers.FACEBOOK)

  return (
    <Button
      onClick={() => signInWithFacebook?.()}
      className="flex items-center gap-2 border rounded px-6 py-2 justify-center w-full"
    >
      <Image 
          src="https://www.svgrepo.com/show/452196/facebook-1.svg" 
          alt="Google" 
          width={30} 
          height={30} 
      />
      Login with Facebook
    </Button>
  )
}
