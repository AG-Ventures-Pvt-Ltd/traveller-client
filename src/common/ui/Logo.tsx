import React from 'react'
import { useRouter } from 'next/navigation'

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const router = useRouter()

    return (
      <span role="link" tabIndex={0} aria-label="Wondrr home" className={`text-3xl font-extrabold cursor-pointer p-3 md:p-6 ${className}`} onClick={() => router.push('/dashboard')}>Wondrr</span>
    )
  }

  

export default Logo