import React from 'react'
import { useRouter } from 'next/navigation'

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const router = useRouter()

    return (
      <h1 className={`text-3xl font-extrabold cursor-pointer p-3 md:p-6 ${className}`} onClick={() => router.push('/dashboard')}>Wondrr</h1>
    )
  }

  

export default Logo