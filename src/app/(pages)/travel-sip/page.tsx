'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useGetData } from '@/services/useGetData'
import { baseAPI } from '@/services/baseApi'
import { notify } from '@/common/utils/notify'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import BackButton from '@/common/ui/BackButton'
import { formatDate } from '@/common/utils/dateUtils'
import { SipPlanCard } from './components/SipPlanCard'
import { SubscribeSipModal } from './components/SubscribeSipModal'
import { CancelSipModal } from './components/CancelSipModal'
import type { SipPlan, SipSubscription } from './types'

const STATUS_LABELS: Record<SipSubscription['status'], string> = {
  pending_auth: 'Awaiting authorization',
  active: 'Active',
  completed: 'Completed',
  cancelled: 'Cancelled',
  failed_auth: 'Authorization failed',
}

const CURRENT_STATUSES: SipSubscription['status'][] = ['active', 'pending_auth']

const TravelSipPage = () => {
  const { status } = useSession()
  const router = useRouter()

  const [subscribeModal, setSubscribeModal] = useState<{ open: boolean; plan: SipPlan | null }>({ open: false, plan: null })
  const [cancelModal, setCancelModal] = useState<{ open: boolean; subscription: SipSubscription | null }>({ open: false, subscription: null })

  const { data: plansData, isLoading: plansLoading } = useGetData<SipPlan[]>(API_ENDPOINTS.SIP.PLANS, {
    queryKey: ['sip-plans'],
  })

  const { data: mySubsData, isLoading: subsLoading, refetch: refetchSubs } = useGetData<SipSubscription[]>(
    API_ENDPOINTS.SIP.MY_SUBSCRIPTIONS,
    { queryKey: ['sip-subscriptions-mine'], enabled: status === 'authenticated' }
  )

  const plans = plansData ?? []
  const mySubs = mySubsData ?? []
  const currentSips = mySubs.filter((s) => CURRENT_STATUSES.includes(s.status))
  const pastSips = mySubs.filter((s) => !CURRENT_STATUSES.includes(s.status))
  // A user may only have one live SIP at a time (enforced server-side too) —
  // once one is pending_auth/active, hide the plan list instead of letting
  // them attempt a second subscribe that the server will reject anyway.
  const hasBlockingSip = status === 'authenticated' && currentSips.length > 0

  const handleSubscribeClick = (plan: SipPlan) => {
    if (status === 'unauthenticated') {
      router.push('/auth')
      return
    }
    setSubscribeModal({ open: true, plan })
  }

  const handleCancel = async (subId: string) => {
    try {
      await baseAPI.post(API_ENDPOINTS.SIP.CANCEL(subId))
      notify.success('SIP cancelled')
      refetchSubs()
    } catch {
      notify.error('Failed to cancel SIP')
    }
  }

  const renderSipCard = (sub: SipSubscription) => {
    // Locked in at subscribe time (sip.controller.js) — stays fixed for this
    // subscription even if the plan's live cadenceAmounts/target change later.
    const target = sub.planSnapshot.targetAmount
    const bonus = sub.planSnapshot.totalPayout - sub.planSnapshot.targetAmount
    const pct = Math.min(100, Math.round((sub.cumulativePaidAmount / target) * 100))
    return (
      <div key={sub._id} className="border border-[#D9D9D9] rounded-2xl p-4 bg-white">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-black">
            {typeof sub.planId === 'object' ? sub.planId.name : 'SIP Plan'}
          </span>
          <span className="text-xs text-gray-500">{STATUS_LABELS[sub.status]}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-2 capitalize">
          <span>{sub.cadence} · ₹{sub.installmentAmount.toLocaleString('en-IN')}/installment</span>
          <span>Bonus: ₹{bonus.toLocaleString('en-IN')}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div className="bg-[#EEA0FF] h-2 rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>₹{sub.cumulativePaidAmount.toLocaleString('en-IN')} / ₹{target.toLocaleString('en-IN')}</span>
          {sub.nextScheduleDate && sub.status === 'active' && (
            <span>Next: {formatDate(sub.nextScheduleDate)}</span>
          )}
        </div>
        {(sub.status === 'active' || sub.status === 'pending_auth') && (
          <button
            onClick={() => setCancelModal({ open: true, subscription: sub })}
            className="text-xs text-red-500 mt-2 underline"
          >
            Cancel
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#fff9f4]">
      <div className="pt-8 px-4 pb-8">
        <div className="max-w-[600px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BackButton label="" />
            <h1 className="text-xl font-bold text-black">Travel SIP</h1>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Set up a recurring auto-pay toward your next trip. Every installment lands in your Wondrr Cash wallet immediately — hit your target and get a bonus on top.
          </p>

          {status === 'authenticated' && subsLoading && (
            <p className="text-sm text-gray-500 mb-6">Loading your SIPs…</p>
          )}

          {status === 'authenticated' && !subsLoading && currentSips.length > 0 && (
            <div className="mb-8">
              <h2 className="text-base font-bold text-black mb-3">Active SIP</h2>
              <div className="flex flex-col gap-3">
                {currentSips.map(renderSipCard)}
              </div>
            </div>
          )}

          {status === 'authenticated' && subsLoading ? null : hasBlockingSip ? (
            <p className="text-sm text-gray-500 mb-8">You already have an active SIP — new plans open up once it&apos;s completed or cancelled.</p>
          ) : (
            <div className="mb-8">
              <h2 className="text-base font-bold text-black mb-3">Plans</h2>
              {plansLoading ? (
                <p className="text-sm text-gray-500">Loading plans…</p>
              ) : plans.length === 0 ? (
                <p className="text-sm text-gray-500">No SIP plans available right now.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {plans.map((plan) => (
                    <SipPlanCard key={plan._id} plan={plan} onSubscribe={handleSubscribeClick} />
                  ))}
                </div>
              )}
            </div>
          )}

          {status === 'authenticated' && !subsLoading && pastSips.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-black mb-3">Past SIPs</h2>
              <div className="flex flex-col gap-3 opacity-80">
                {pastSips.map(renderSipCard)}
              </div>
            </div>
          )}
        </div>
      </div>

      <SubscribeSipModal
        isOpen={subscribeModal.open}
        plan={subscribeModal.plan}
        onClose={() => setSubscribeModal({ open: false, plan: null })}
        onSubscribed={() => refetchSubs()}
      />

      <CancelSipModal
        isOpen={cancelModal.open}
        subscription={cancelModal.subscription}
        onClose={() => setCancelModal({ open: false, subscription: null })}
        onConfirm={handleCancel}
      />
    </div>
  )
}

export default TravelSipPage
