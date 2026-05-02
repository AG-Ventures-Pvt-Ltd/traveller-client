'use client'

import React from 'react'
import BackButton from '@/common/ui/BackButton'
import Button from '@/common/ui/Buttons/Button'
import { QrCodeIcon } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

const TicketsPage = () => {
  // Mock data - in real app this would come from props/route params
  const passengerName = "Shreyansh"
  const tripDate = "20-04-2026"
  
  const router = useRouter()

  return (
    <div className="min-h-screen pb-24">
      {/* Back Button */}
      <div className="pt-6">
        <BackButton label="Back to Home" to={'/profile/mytrips'}/>
      </div>

      {/* Title */}
      <div className="pt-8">
        <h1 className="text-4xl font-bold text-black mb-2">
          Your access ticket
        </h1>
        <p className="text-base text-black">
          show this QR to your trip captain to verify yourself
        </p>
      </div>

      <div className="pt-8 ">
        <div className="relative bg-[#E2F4A6] rounded-lg p-4 mx-auto max-w-sm">
          <div className="absolute inset-0 rounded-lg">
            <div className="absolute -top-3 left-4 right-4 flex justify-between">
              {Array.from({ length: 9 }, (_, i) => (
                <div key={`top-${i}`} className="w-6 h-6 bg-[#FFF9F4] rounded-full" />
              ))}
            </div>
            <div className="absolute -bottom-3 left-4 right-4 flex justify-between">
              {Array.from({ length: 9 }, (_, i) => (
                <div key={`bottom-${i}`} className="w-6 h-6 bg-[#FFF9F4] rounded-full" />
              ))}
            </div>
            <div className="absolute -left-3 top-4 bottom-4 flex flex-col justify-between">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={`left-${i}`} className="w-6 h-6 bg-[#FFF9F4] rounded-full" />
              ))}
            </div>
            <div className="absolute -right-3 top-4 bottom-4 flex flex-col justify-between">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={`right-${i}`} className="w-6 h-6 bg-[#FFF9F4] rounded-full" />
              ))}
            </div>
          </div>

          {/* Ticket Content */}
          <div className="relative z-10 pt-8 pb-8">
            {/* Passenger Name */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-black">
                {passengerName}
              </h2>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center mb-6">
              <div className="w-56 h-56 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <QrCodeIcon size={80} className="text-gray-400" />
              </div>
            </div>

            {/* Date */}
            <div className="text-center">
              <p className="text-sm text-black">
                {tripDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Done Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FFF9F4] p-6 pt-4">
        <Button
          variant="yellow"
          fullWidth
          onClick={() => router.push('/profile/mytrips')}
        >
          Done
        </Button>
      </div>
    </div>
  )
}

export default TicketsPage