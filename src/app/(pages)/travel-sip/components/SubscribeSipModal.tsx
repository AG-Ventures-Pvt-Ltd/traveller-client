'use client'

import React, { useState } from 'react'
import MobileModal from '@/common/ui/MobileModal'
import Button from '@/common/ui/Buttons/Button'
import usePostData from '@/services/usePostData'
import { getData } from '@/services/baseApi'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { openCashfreeSubscription } from '../services/cashfreeSubscription'
import { openRazorpaySubscription } from '../services/razorpaySubscription'
import { PolicyAgreementCheckbox } from './PolicyAgreementCheckbox'
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
  activeGateway?: 'razorpay' | 'cashfree'
  onSubscribed: () => void
}

interface ApiResponse {
  data: SubscribeResponse
}

export function SubscribeSipModal({ isOpen, onClose, plan, activeGateway, onSubscribed }: SubscribeSipModalProps) {
  const [cadence, setCadence] = useState<'daily' | 'weekly' | 'monthly'>('weekly')
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Razorpay subscriptions reject period:'daily' at interval:1 (7-day
  // minimum) — only offer Daily when Cashfree is the active gateway.
  const availableCadences = activeGateway === 'razorpay' ? CADENCES.filter((c) => c.value !== 'daily') : CADENCES

  const { mutateAsync: subscribe } = usePostData<ApiResponse>({
    url: API_ENDPOINTS.SIP.SUBSCRIBE,
    enableNotifications: false,
  })

  const amount = plan?.cadenceAmounts[cadence]

  const handleClose = () => {
    setCadence('weekly')
    setAgreed(false)
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
      <div className="flex flex-col gap-6 md:w-[420px] md:min-h-[380px] justify-between">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-2">Choose auto-pay frequency</p>
            <div className={`grid gap-2 ${availableCadences.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {availableCadences.map((c) => (
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
          </div>

          <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Amount per installment</span>
              <span className="font-medium text-black">₹{amount?.toLocaleString('en-IN')}</span>
            </div>
            {plan && amount && (
              <div className="flex justify-between">
                <span className="text-gray-500">Total installments</span>
                <span className="font-medium text-black">{Math.ceil(plan.targetAmount / amount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Target</span>
              <span className="font-medium text-black">₹{plan?.targetAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bonus on completion</span>
              <span className="font-medium text-black">₹{plan?.bonusAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <PolicyAgreementCheckbox checked={agreed} onChange={setAgreed} />

          <Button
            variant="purple"
            fullWidth
            onClick={handleSubmit}
            disabled={!plan || !agreed || isSubmitting}
          >
            {isSubmitting ? 'Setting up…' : 'Confirm & Subscribe'}
          </Button>
        </div>
      </div>
    </MobileModal>
  )
}
