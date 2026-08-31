'use client'

import React, { useState } from 'react'
import MobileModal from '@/common/ui/MobileModal'
import Button from '@/common/ui/Buttons/Button'
import { PolicyAgreementCheckbox } from './PolicyAgreementCheckbox'
import type { SipSubscription } from '../types'

interface CancelSipModalProps {
  isOpen: boolean
  onClose: () => void
  subscription: SipSubscription | null
  onConfirm: (subId: string) => Promise<void>
}

export function CancelSipModal({ isOpen, onClose, subscription, onConfirm }: CancelSipModalProps) {
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = () => {
    setAgreed(false)
    onClose()
  }

  const handleConfirm = async () => {
    if (!subscription) return
    setIsSubmitting(true)
    try {
      await onConfirm(subscription._id)
      handleClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MobileModal isOpen={isOpen} onClose={handleClose} title="Cancel SIP">
      <div className="flex flex-col gap-6">
        <div className="bg-red-50 rounded-xl p-4 flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Plan</span>
            <span className="font-medium text-black">
              {subscription && typeof subscription.planId === 'object' ? subscription.planId.name : 'SIP Plan'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Paid so far</span>
            <span className="font-medium text-black">₹{subscription?.cumulativePaidAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <p className="text-xs text-gray-600">
          Cancelling stops all future installments immediately and can&apos;t be undone or resumed. Since the target hasn&apos;t been reached, the completion bonus will not be credited — only what you&apos;ve already paid stays in your Wondrr Cash wallet.
        </p>

        <PolicyAgreementCheckbox checked={agreed} onChange={setAgreed} />

        <div className="flex gap-2">
          <Button
            variant="primary"
            fullWidth
            onClick={handleClose}
            className="!bg-white !text-black border border-[#D9D9D9]"
          >
            Keep my SIP
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={handleConfirm}
            disabled={!subscription || !agreed || isSubmitting}
            className="!bg-white !text-red-500 border-2 border-red-500"
          >
            {isSubmitting ? 'Cancelling…' : 'Confirm Cancellation'}
          </Button>
        </div>
      </div>
    </MobileModal>
  )
}
