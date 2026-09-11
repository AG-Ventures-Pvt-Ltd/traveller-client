'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useGetData } from '@/services/useGetData'
import { baseAPI } from '@/services/baseApi'
import { notify } from '@/common/utils/notify'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import BackButton from '@/common/ui/BackButton'
import Button from '@/common/ui/Buttons/Button'
import { formatDate } from '@/common/utils/dateUtils'
import { SubscribeSipModal, type GroupSubscribeContext } from '../../../components/SubscribeSipModal'
import type { SipGroupJoinPreview, PaymentConfig } from '../../../types'

const GroupJoinPage = () => {
  const params = useParams<{ code: string }>()
  const code = (params.code || '').toUpperCase()
  const { status } = useSession()
  const router = useRouter()

  const [isJoining, setIsJoining] = useState(false)
  const [subscribeGroup, setSubscribeGroup] = useState<GroupSubscribeContext | null>(null)

  const { data: preview, isLoading, isError } = useGetData<SipGroupJoinPreview>(
    API_ENDPOINTS.SIP.GROUPS.JOIN_PREVIEW(code),
    { queryKey: ['sip-group-join-preview', code], enabled: status === 'authenticated' && !!code, retry: false }
  )

  const { data: paymentConfig } = useGetData<PaymentConfig>(API_ENDPOINTS.PAYMENTS.CONFIG, { queryKey: ['payment-config'] })

  React.useEffect(() => {
    if (preview?.alreadyMember) {
      router.replace(`/travel-sip/group/${preview.groupId}`)
    }
  }, [preview, router])

  const handleSignIn = () => {
    router.push(`/auth?redirectUrl=${encodeURIComponent(`/travel-sip/group/join/${code}`)}`)
  }

  const handleJoin = async () => {
    if (!preview) return
    setIsJoining(true)
    try {
      await baseAPI.post(API_ENDPOINTS.SIP.GROUPS.JOIN(code))
      setSubscribeGroup({
        groupId: preview.groupId,
        planName: preview.plan.name,
        targetAmount: preview.plan.targetAmount,
        totalPayout: preview.plan.totalPayout,
        bonusAmount: preview.plan.bonusAmount,
        cadence: preview.cadence,
        installmentAmount: preview.installmentAmount,
        upfrontAmount: preview.upfrontAmount,
        upfrontInstallments: preview.upfrontInstallments,
      })
    } catch {
      notify.error('Failed to join group')
    } finally {
      setIsJoining(false)
    }
  }

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full min-h-screen bg-[#fff9f4]">
      <div className="pt-8 px-4 pb-8">
        <div className="max-w-[600px] mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <BackButton label="" to="/travel-sip" />
            <h1 className="text-xl font-bold text-black">Join Travel SIP group</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  )

  if (status === 'unauthenticated') {
    return (
      <Shell>
        <div className="border border-[#D9D9D9] rounded-2xl p-6 bg-white text-center">
          <p className="text-sm text-gray-600 mb-1">You&apos;ve been invited to join a Travel SIP group</p>
          <p className="text-3xl font-bold text-black tracking-widest my-4">{code}</p>
          <Button variant="purple" fullWidth onClick={handleSignIn}>Sign in to join</Button>
        </div>
      </Shell>
    )
  }

  if (status === 'loading' || isLoading) {
    return (
      <Shell>
        <p className="text-sm text-gray-500">Loading…</p>
      </Shell>
    )
  }

  if (isError || !preview) {
    return (
      <Shell>
        <div className="border border-[#D9D9D9] rounded-2xl p-6 bg-white text-center">
          <p className="text-sm text-gray-600 mb-4">That group code isn&apos;t valid.</p>
          <Button variant="primary" fullWidth onClick={() => router.push('/travel-sip')}>Back to Travel SIP</Button>
        </div>
      </Shell>
    )
  }

  if (preview.alreadyMember) {
    return (
      <Shell>
        <p className="text-sm text-gray-500">Taking you to the group…</p>
      </Shell>
    )
  }

  if (preview.joinWindowClosed) {
    return (
      <Shell>
        <div className="border border-[#D9D9D9] rounded-2xl p-6 bg-white text-center">
          <p className="text-sm text-gray-600">Joining for <strong>{preview.groupName}</strong> closed on {formatDate(preview.joinClosesAt)}.</p>
        </div>
      </Shell>
    )
  }

  if (preview.hasActiveSip) {
    return (
      <Shell>
        <div className="border border-[#D9D9D9] rounded-2xl p-6 bg-white text-center">
          <p className="text-sm text-gray-600 mb-4">You already have a Travel SIP running. You can&apos;t join a group until it&apos;s cancelled or complete.</p>
          <Button variant="primary" fullWidth onClick={() => router.push('/travel-sip')}>Go to my SIP</Button>
        </div>
      </Shell>
    )
  }

  return (
    <Shell>
      <div className="border border-[#D9D9D9] rounded-2xl p-6 bg-white">
        <p className="text-sm text-gray-600 mb-1">You&apos;re joining</p>
        <h2 className="text-lg font-bold text-black mb-4">{preview.groupName}</h2>

        <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Plan</span>
            <span className="font-medium text-black">{preview.plan.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Installment</span>
            <span className="font-medium text-black capitalize">₹{preview.installmentAmount.toLocaleString('en-IN')} / {preview.cadence}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Target</span>
            <span className="font-medium text-black">₹{preview.plan.targetAmount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Bonus on completion</span>
            <span className="font-medium text-black">₹{preview.plan.bonusAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {preview.upfrontAmount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-black mb-4">
            You&apos;re joining on Day {preview.daysElapsed} — a one-time upfront payment of <strong>₹{preview.upfrontAmount.toLocaleString('en-IN')}</strong> ({preview.upfrontInstallments} installment{preview.upfrontInstallments > 1 ? 's' : ''} through today), then ₹{preview.installmentAmount.toLocaleString('en-IN')}/{preview.cadence}.
          </div>
        )}

        <Button variant="purple" fullWidth onClick={handleJoin} disabled={isJoining}>
          {isJoining ? 'Joining…' : 'Join group'}
        </Button>
      </div>

      <SubscribeSipModal
        isOpen={!!subscribeGroup}
        plan={null}
        group={subscribeGroup}
        activeGateway={paymentConfig?.subscriptionGateway}
        onClose={() => setSubscribeGroup(null)}
        onSubscribed={() => {
          if (subscribeGroup) router.push(`/travel-sip/group/${subscribeGroup.groupId}`)
        }}
      />
    </Shell>
  )
}

export default GroupJoinPage
