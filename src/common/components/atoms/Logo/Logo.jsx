import React from 'react'
import { useRouter } from 'next/navigation'

const Logo = ({ className = '' }) => {
  const router = useRouter()

  return (
    <h1 className={`text-3xl font-extrabold cursor-pointer ${className}`} onClick={() => router.push('/')}>Wondrr</h1>
  )
}


export default Logo