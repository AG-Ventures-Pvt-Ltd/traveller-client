import React from 'react'
import { signOut } from 'next-auth/react'
import Button from '@/common/components/atoms/Button'

const LogoutSection: React.FC = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth' })
  }

  return (
    <div className="px-4 mt-8">
      <Button variant="outlined" onClick={handleLogout} className="w-full">
        Logout
      </Button>
    </div>
  )
}

export default LogoutSection
