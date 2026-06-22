import React from 'react'
import { useRouter } from 'next/navigation'

const Logo = ({ className = '' }) => {
  const router = useRouter()

  return (
    <span role="link" tabIndex={0} aria-label="Wondrr home" className={`text-3xl font-bold cursor-pointer ${className}`} onClick={() => router.push('/')}>Wondrr</span>
  )
}


export default Logo