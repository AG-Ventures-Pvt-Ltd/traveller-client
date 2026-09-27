'use client'

import React, { useState } from 'react'
import Button from '@/common/ui/Buttons/Button'
import { baseAPI } from '@/services/baseApi'
import { notify } from '@/common/utils/notify'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'

interface InviteMembersFormProps {
  groupId: string
  onInvited: () => void
}

export function InviteMembersForm({ groupId, onInvited }: InviteMembersFormProps) {
  const [emailsInput, setEmailsInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInvite = async () => {
    const emails = emailsInput
      .split(/[,\s]+/)
      .map((e) => e.trim())
      .filter(Boolean)

    if (emails.length === 0) return

    setIsSubmitting(true)
    try {
      const res = await baseAPI.post(API_ENDPOINTS.SIP.GROUPS.INVITE(groupId), { emails })
      const results = res.data?.data as { email: string; status: string }[] | undefined
      const invited = results?.filter((r) => r.status === 'invited').length || 0
      notify.success(invited > 0 ? `Invited ${invited} ${invited === 1 ? 'person' : 'people'}` : 'No new invites sent')
      setEmailsInput('')
      onInvited()
    } catch {
      notify.error('Failed to send invites')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-gray-500">Invite by email (comma or space separated)</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={emailsInput}
          onChange={(e) => setEmailsInput(e.target.value)}
          placeholder="friend@example.com"
          className="flex-1 border border-[#D9D9D9] rounded-xl px-4 py-3 text-sm text-black outline-none focus:border-[#EEA0FF]"
        />
        <Button variant="purple" onClick={handleInvite} disabled={!emailsInput.trim() || isSubmitting} className="!py-0 px-5">
          {isSubmitting ? 'Sending…' : 'Invite'}
        </Button>
      </div>
    </div>
  )
}
