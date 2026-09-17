'use client'

import React, { useState } from 'react'
import MobileModal from '@/common/ui/MobileModal'
import Button from '@/common/ui/Buttons/Button'

interface JoinGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onJoin: (code: string) => void
}

export function JoinGroupModal({ isOpen, onClose, onJoin }: JoinGroupModalProps) {
  const [code, setCode] = useState('')

  const handleClose = () => {
    setCode('')
    onClose()
  }

  const handleSubmit = () => {
    const trimmed = code.trim()
    if (!trimmed) return
    onJoin(trimmed)
    handleClose()
  }

  return (
    <MobileModal isOpen={isOpen} onClose={handleClose} title="Join a group">
      <div className="flex flex-col gap-6 md:w-[380px]">
        <div>
          <p className="text-xs text-gray-500 mb-2">Group code</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Have a group code?"
            maxLength={6}
            autoFocus
            className="w-full border border-[#D9D9D9] rounded-xl px-4 py-3 text-sm text-black outline-none focus:border-[#EEA0FF] tracking-widest"
          />
        </div>
        <Button variant="purple" fullWidth onClick={handleSubmit} disabled={!code.trim()}>
          Join
        </Button>
      </div>
    </MobileModal>
  )
}
