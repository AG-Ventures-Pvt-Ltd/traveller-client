'use client'

import React, { useState } from 'react'
import MobileModal from '@/common/ui/MobileModal'
import Button from '@/common/ui/Buttons/Button'
import usePostData from '@/services/usePostData'
import { getData } from '@/services/baseApi'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { openCashfreeSubscription } from '../services/cashfreeSubscription'
import { openRazorpaySubscription } from '../services/razorpaySubscription'
import type { SipPlan, SubscribeResponse, PaymentConfig } from '../types'

const CADENCES: { value: 'daily' | 'weekly' | 'monthly'; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

interface SubscribeSipModalProps {
  isOpen: boolean
  onClose: () => void
  plan: SipPlan | null
  onSubscribed: () => void
}

interface ApiResponse {
  data: SubscribeResponse
}

export function SubscribeSipModal({ isOpen, onClose, plan, onSubscribed }: SubscribeSipModalProps) {
  const [cadence, setCadence] = useState<'daily' | 'weekly' | 'monthly'>('weekly')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { mutateAsync: subscribe } = usePostData<ApiResponse>({
    url: API_ENDPOINTS.SIP.SUBSCRIBE,
    enableNotifications: false,
  })

  const amount = plan?.cadenceAmounts[cadence]

  const handleClose = () => {
    setCadence('weekly')
    onClose()
  }

  const handleSubmit = async () => {
    if (!plan) return
    setIsSubmitting(true)
    try {
      const response = await subscribe({ planId: plan._id, cadence }) as unknown as ApiResponse
      const { gateway, gatewaySubscriptionId, subscriptionSessionId } = response.data

      const config = await getData<PaymentConfig>(API_ENDPOINTS.PAYMENTS.CONFIG)

      const onComplete = () => {
        handleClose()
        onSubscribed()
      }

      if (gateway === 'cashfree' && subscriptionSessionId) {
        await openCashfreeSubscription(subscriptionSessionId, config.cashfreeMode || 'sandbox', onComplete)
      } else {
        openRazorpaySubscription(gatewaySubscriptionId, config.razorpayKeyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY!, onComplete)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MobileModal isOpen={isOpen} onClose={handleClose} title={plan ? `Subscribe: ${plan.name}` : 'Subscribe'}>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs text-gray-500 mb-2">Choose auto-pay frequency</p>
          <div className="grid grid-cols-3 gap-2">
            {CADENCES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCadence(c.value)}
                className={`py-3 rounded-xl text-sm font-medium border transition-colors flex flex-col items-center gap-0.5 ${
                  cadence === c.value
                    ? 'bg-[#EEA0FF] border-[#EEA0FF] text-black'
                    : 'border-[#D9D9D9] text-black hover:border-[#EEA0FF]'
                }`}
              >
                <span>{c.label}</span>
                <span className="text-xs opacity-70">₹{plan?.cadenceAmounts[c.value].toLocaleString('en-IN')}</span>
              </button>
            ))}
          </div>
          {cadence === 'daily' && (
            <p className="text-xs text-gray-500 mt-2">Daily auto-pay via UPI or net banking only — cards don&apos;t support daily debits.</p>
          )}
        </div>

        {plan && amount && (
          <p className="text-xs text-gray-500">
            Roughly {Math.ceil(plan.targetAmount / amount)} installments of ₹{amount.toLocaleString('en-IN')} to reach ₹{plan.targetAmount.toLocaleString('en-IN')}, then a ₹{plan.bonusAmount.toLocaleString('en-IN')} bonus lands in your Wondrr Cash wallet.
          </p>
        )}

        <Button
          variant="purple"
          fullWidth
          onClick={handleSubmit}
          disabled={!plan || isSubmitting}
        >
          {isSubmitting ? 'Setting up…' : 'Set up auto-pay'}
        </Button>
      </div>
    </MobileModal>
  )
}
