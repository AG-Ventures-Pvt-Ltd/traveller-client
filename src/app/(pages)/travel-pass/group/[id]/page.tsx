'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useGetData } from '@/services/useGetData'
import { getData, baseAPI } from '@/services/baseApi'
import { notify } from '@/common/utils/notify'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import BackButton from '@/common/ui/BackButton'
import { formatDate } from '@/common/utils/dateUtils'
import { GroupMemberList } from '../../components/GroupMemberList'
import { InviteMembersForm } from '../../components/InviteMembersForm'
import { SubscribeSipModal, type GroupSubscribeContext } from '../../components/SubscribeSipModal'
import type { SipGroupDetail, SipGroupMemberRow, SipGroupJoinPreview, PaymentConfig } from '../../types'

const GroupDashboardPage = () => {
  const params = useParams<{ id: string }>()
  const groupId = params.id
  const { status } = useSession()
  const router = useRouter()

  const [subscribeGroup, setSubscribeGroup] = useState<GroupSubscribeContext | null>(null)
  const [preparingSetup, setPreparingSetup] = useState(false)

  const { data: detail, isLoading, refetch } = useGetData<SipGroupDetail>(
    API_ENDPOINTS.SIP.GROUPS.DETAIL(groupId),
    { queryKey: ['sip-group-detail', groupId], enabled: status === 'authenticated' && !!groupId }
  )

  const { data: paymentConfig } = useGetData<PaymentConfig>(API_ENDPOINTS.PAYMENTS.CONFIG, { queryKey: ['payment-config'] })

  const handleCopyCode = () => {
    if (!detail) return
    navigator.clipboard.writeText(detail.joinCode).then(() => notify.success('Code copied'))
  }

  const handleSetupSip = async () => {
    if (!detail) return
    setPreparingSetup(true)
    try {
      // Recompute upfrontAmount/upfrontInstallments for right now — subscribe
      // itself locks the final numbers server-side.
      const preview = await getData<SipGroupJoinPreview>(API_ENDPOINTS.SIP.GROUPS.JOIN_PREVIEW(detail.joinCode))
      setSubscribeGroup({
        groupId: detail.groupId,
        planName: detail.plan.name,
        targetAmount: detail.plan.targetAmount,
        totalPayout: detail.plan.totalPayout,
        bonusAmount: detail.plan.bonusAmount,
        cadence: detail.cadence,
        installmentAmount: detail.installmentAmount,
        upfrontAmount: preview.upfrontAmount,
        upfrontInstallments: preview.upfrontInstallments,
      })
    } catch {
      notify.error('Could not load setup details')
    } finally {
      setPreparingSetup(false)
    }
  }

  const handleRemoveMember = async (member: SipGroupMemberRow) => {
    if (!detail) return
    if (!window.confirm(`Remove ${member.name} from the group?`)) return
    try {
      await baseAPI.delete(API_ENDPOINTS.SIP.GROUPS.REMOVE_MEMBER(detail.groupId, member.memberId))
      notify.success('Member removed')
      refetch()
    } catch {
      notify.error('Failed to remove member')
    }
  }

  const handleLeave = async () => {
    if (!detail) return
    if (!window.confirm('Leave this group? Your Travel Pass will keep running on its own.')) return
    try {
      await baseAPI.post(API_ENDPOINTS.SIP.GROUPS.LEAVE(detail.groupId))
      notify.success('Left the group')
      router.push('/travel-pass')
    } catch {
      notify.error('Failed to leave group')
    }
  }

  const handleArchive = async () => {
    if (!detail) return
    if (!window.confirm('Archive this group? The code will stop working — everyone keeps their own Travel Pass.')) return
    try {
      await baseAPI.post(API_ENDPOINTS.SIP.GROUPS.ARCHIVE(detail.groupId))
      notify.success('Group archived')
      refetch()
    } catch {
      notify.error('Failed to archive group')
    }
  }

  if (status === 'unauthenticated') {
    router.replace('/auth')
    return null
  }

  if (isLoading || !detail) {
    return (
      <div className="w-full min-h-screen bg-[#fff9f4] flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading group…</p>
      </div>
    )
  }

  const isAdmin = detail.myRole === 'admin'
  const joinClosed = new Date(detail.joinClosesAt).getTime() < Date.now()
  const pct = detail.groupTargetTotal > 0 ? Math.min(100, Math.round((detail.groupTotalContributed / detail.groupTargetTotal) * 100)) : 0

  return (
    <div className="w-full min-h-screen bg-[#fff9f4]">
      <div className="pt-8 px-4 pb-8">
        <div className="max-w-[600px] mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <BackButton label="" to="/travel-pass" />
            <h1 className="text-xl font-bold text-black truncate">{detail.groupName}</h1>
          </div>

          <div className="border border-[#D9D9D9] rounded-2xl p-5 bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{detail.plan.name}</span>
              <span className="text-xs text-gray-500">
                {detail.status === 'archived' ? 'Archived' : joinClosed ? 'Joining closed' : `Joining closes ${formatDate(detail.joinClosesAt)}`}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-[#EEA0FF] h-2 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex justify-between text-sm text-black font-medium mb-3">
              <span>₹{detail.groupTotalContributed.toLocaleString('en-IN')} raised</span>
              <span className="text-gray-500 font-normal capitalize">{detail.cadence} · ₹{detail.installmentAmount.toLocaleString('en-IN')}</span>
            </div>

            {detail.status === 'active' && !joinClosed && (
              <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-gray-500 mb-1">Group code</p>
                  <p className="text-2xl font-bold text-black tracking-widest">{detail.joinCode}</p>
                </div>
                <button onClick={handleCopyCode} className="text-xs font-medium text-black border border-[#D9D9D9] rounded-lg px-3 py-2 hover:border-[#EEA0FF]">
                  Copy
                </button>
              </div>
            )}
          </div>

          {detail.myStatus === 'joined' && (
            <button
              onClick={handleSetupSip}
              disabled={preparingSetup}
              className="w-full bg-[#EEA0FF] text-black font-medium rounded-xl py-4 disabled:opacity-60"
            >
              {preparingSetup ? 'Loading…' : 'Set up your Travel Pass'}
            </button>
          )}

          {isAdmin && detail.status === 'active' && (
            <div className="border border-[#D9D9D9] rounded-2xl p-5 bg-white">
              <InviteMembersForm groupId={detail.groupId} onInvited={refetch} />
            </div>
          )}

          <div>
            <h2 className="text-base font-bold text-black mb-3">Members</h2>
            <GroupMemberList members={detail.members} isAdmin={isAdmin} onRemove={handleRemoveMember} />
          </div>

          <div className="pt-2">
            {isAdmin ? (
              detail.status === 'active' && (
                <button onClick={handleArchive} className="text-xs text-red-500 underline">
                  Archive group
                </button>
              )
            ) : (
              <button onClick={handleLeave} className="text-xs text-red-500 underline">
                Leave group
              </button>
            )}
          </div>
        </div>
      </div>

      <SubscribeSipModal
        isOpen={!!subscribeGroup}
        plan={null}
        group={subscribeGroup}
        activeGateway={paymentConfig?.subscriptionGateway}
        onClose={() => setSubscribeGroup(null)}
        onSubscribed={() => refetch()}
      />
    </div>
  )
}

export default GroupDashboardPage
