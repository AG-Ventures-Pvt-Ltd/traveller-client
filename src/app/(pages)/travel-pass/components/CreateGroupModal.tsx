'use client'

import React, { useState } from 'react'
import MobileModal from '@/common/ui/MobileModal'
import Button from '@/common/ui/Buttons/Button'
import usePostData from '@/services/usePostData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'

interface CreateGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (groupId: string) => void
}

interface CreateGroupResponse {
  data: { group: { _id: string }; joinCode: string; joinUrl: string }
}

export function CreateGroupModal({ isOpen, onClose, onCreated }: CreateGroupModalProps) {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { mutateAsync: createGroup } = usePostData<CreateGroupResponse>({
    url: API_ENDPOINTS.SIP.GROUPS.CREATE,
  })

  const handleClose = () => {
    setName('')
    onClose()
  }

  const handleSubmit = async () => {
    if (!name.trim()) return
    setIsSubmitting(true)
    try {
      const response = await createGroup({ name: name.trim() }) as unknown as CreateGroupResponse
      handleClose()
      onCreated(response.data.group._id)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MobileModal isOpen={isOpen} onClose={handleClose} title="Start a group">
      <div className="flex flex-col gap-6 md:w-[380px]">
        <div>
          <p className="text-xs text-gray-500 mb-2">Group name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Goa Squad"
            maxLength={60}
            className="w-full border border-[#D9D9D9] rounded-xl px-4 py-3 text-sm text-black outline-none focus:border-[#EEA0FF]"
          />
        </div>
        <p className="text-xs text-gray-600">
          Friends can join with a 6-character code for 7 days. Everyone subscribes on your same plan, cadence, and amount.
        </p>
        <Button variant="purple" fullWidth onClick={handleSubmit} disabled={!name.trim() || isSubmitting}>
          {isSubmitting ? 'Creating…' : 'Create group'}
        </Button>
      </div>
    </MobileModal>
  )
}
