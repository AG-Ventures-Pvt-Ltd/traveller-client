'use client'

import React, { useState } from 'react'
import type { AxiosError } from 'axios'
import MobileModal from '@/common/ui/MobileModal'
import { notify } from '@/common/utils/notify'
import Button from '@/common/ui/Buttons/Button'
import usePostData from '@/services/usePostData'
import { getData } from '@/services/baseApi'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { openCashfreeSubscription } from '../services/cashfreeSubscription'
import { openRazorpaySubscription } from '../services/razorpaySubscription'
import { openCashfree } from '@/app/(pages)/trip/book/[id]/[batchId]/services/cashfree'
import { openRazorpay } from '@/app/(pages)/trip/book/[id]/[batchId]/services/razorpay'
import { PolicyAgreementCheckbox } from './PolicyAgreementCheckbox'
import type { SipPlan, SubscribeResponse, PaymentConfig } from '../types'

const CADENCES: { value: 'daily' | 'weekly' | 'monthly'; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

// Group-subscribe context — cadence/amount are the group's, not chosen here.
export interface GroupSubscribeContext {
  groupId: string
  planName: string
  targetAmount: number
  totalPayout: number
  bonusAmount: number
  cadence: 'daily' | 'weekly' | 'monthly'
  installmentAmount: number
  upfrontAmount: number
  upfrontInstallments: number
}

interface SubscribeSipModalProps {
  isOpen: boolean
  onClose: () => void
  plan: SipPlan | null
  activeGateway?: 'razorpay' | 'cashfree'
  onSubscribed: () => void
  group?: GroupSubscribeContext | null
}

interface ApiResponse {
  data: SubscribeResponse
}

// Waits for the one-time upfront checkout to actually finish before the
// caller opens the subscription checkout next — openCashfree resolves its own
// promise on popup close, openRazorpay only fires a handler callback, so both
// are normalized to one awaitable here.
const runUpfrontCheckout = (
  order: { amount: number; orderId: string; paymentSessionId?: string | null },
  gateway: 'razorpay' | 'cashfree',
  config: PaymentConfig,
) => new Promise<void>((resolve) => {
  if (gateway === 'cashfree' && order.paymentSessionId) {
    openCashfree({ ...order, paymentSessionId: order.paymentSessionId }, 'sip_upfront', config.cashfreeMode || 'sandbox', () => resolve())
  } else {
    openRazorpay({ ...order, paymentSessionId: order.paymentSessionId ?? undefined }, 'sip_upfront', config.razorpayKeyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY!, () => resolve())
  }
})

export function SubscribeSipModal({ isOpen, onClose, plan, activeGateway, onSubscribed, group }: SubscribeSipModalProps) {
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

  const amount = group ? group.installmentAmount : plan?.cadenceAmounts[cadence]
  const targetAmount = group ? group.targetAmount : plan?.targetAmount
  const bonusAmount = group ? group.bonusAmount : plan?.bonusAmount
  const title = group ? `Join ${group.planName}` : plan ? `Subscribe: ${plan.name}` : 'Subscribe'

  const handleClose = () => {
    setCadence('weekly')
    setAgreed(false)
    onClose()
  }

  const handleSubmit = async () => {
    if (!plan && !group) return
    setIsSubmitting(true)
    try {
      const payload = group ? { groupId: group.groupId } : { planId: plan!._id, cadence }
      const response = await subscribe(payload) as unknown as ApiResponse
      const { gateway, gatewaySubscriptionId, subscriptionSessionId, upfront } = response.data

      const config = await getData<PaymentConfig>(API_ENDPOINTS.PAYMENTS.CONFIG)

      if (upfront) {
        await runUpfrontCheckout(
          { amount: upfront.amount, orderId: upfront.orderId, paymentSessionId: upfront.paymentSessionId },
          config.gateway,
          config,
        )
      }

      const onComplete = () => {
        handleClose()
        onSubscribed()
      }

      if (gateway === 'cashfree') {
        // Never fall through to Razorpay's widget for a Cashfree subscription —
        // it would open checkout against an id Razorpay has never heard of.
        if (!subscriptionSessionId) {
          throw new Error('Missing Cashfree subscription session')
        }
        await openCashfreeSubscription(subscriptionSessionId, config.cashfreeMode || 'sandbox', onComplete)
      } else {
        openRazorpaySubscription(gatewaySubscriptionId, config.razorpayKeyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY!, onComplete)
      }
    } catch (error) {
      // usePostData runs with notifications off, so without this the user taps
      // Confirm and nothing at all happens — a 409 (already has a live SIP) or a
      // gateway error would be silent.
      const message = (error as AxiosError<{ message?: string }>)?.response?.data?.message
      notify.error(message || 'Could not start your Travel Pass. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MobileModal isOpen={isOpen} onClose={handleClose} title={title}>
      <div className="flex flex-col gap-6 md:w-[420px] md:min-h-[380px] justify-between">
        <div className="flex flex-col gap-6">
          {group ? (
            <div>
              <p className="text-xs text-gray-500 mb-2">Auto-pay frequency (set by the group)</p>
              <div className="py-3 px-4 rounded-xl border border-[#EEA0FF] bg-[#EEA0FF]/10 text-sm font-medium text-black capitalize flex justify-between">
                <span>{group.cadence}</span>
                <span>₹{group.installmentAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ) : (
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
          )}

          {group && group.upfrontAmount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-black">
              One-time upfront <strong>₹{group.upfrontAmount.toLocaleString('en-IN')}</strong> ({group.upfrontInstallments} installment{group.upfrontInstallments > 1 ? 's' : ''} through today), then ₹{group.installmentAmount.toLocaleString('en-IN')}/{group.cadence}.
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Amount per installment</span>
              <span className="font-medium text-black">₹{amount?.toLocaleString('en-IN')}</span>
            </div>
            {targetAmount && amount && (
              <div className="flex justify-between">
                <span className="text-gray-500">Total installments</span>
                <span className="font-medium text-black">{Math.ceil(targetAmount / amount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Target</span>
              <span className="font-medium text-black">₹{targetAmount?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bonus on completion</span>
              <span className="font-medium text-black">₹{bonusAmount?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <PolicyAgreementCheckbox checked={agreed} onChange={setAgreed} />

          <Button
            variant="purple"
            fullWidth
            onClick={handleSubmit}
            disabled={(!plan && !group) || !agreed || isSubmitting}
          >
            {isSubmitting ? 'Setting up…' : group ? 'Confirm & Join' : 'Confirm & Subscribe'}
          </Button>
        </div>
      </div>
    </MobileModal>
  )
}
