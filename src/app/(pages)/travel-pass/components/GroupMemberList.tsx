'use client'

import React from 'react'
import type { SipGroupMemberRow } from '../types'

// Roster label is derived from the linked SipSubscription.status, not just the
// member row's own status — an 'invited'/'joined' row with no subscription yet
// reads off member.status directly, but a 'subscribed'/'cancelled' row's real
// state (still setting up vs live vs stopped vs completed) lives on the sub.
const labelFor = (member: SipGroupMemberRow): string => {
  if (member.status === 'invited') return 'Invited'
  if (member.status === 'joined') return 'Joined'
  if (member.status === 'subscribed') {
    if (member.subscriptionStatus === 'active') return 'Active'
    return 'Awaiting setup' // pending_auth — mandate not confirmed yet
  }
  if (member.status === 'cancelled') {
    return member.subscriptionStatus === 'completed' ? 'Completed' : 'Stopped'
  }
  return member.status
}

const badgeClass = (member: SipGroupMemberRow): string => {
  const label = labelFor(member)
  if (label === 'Active') return 'bg-green-100 text-green-700'
  if (label === 'Completed') return 'bg-[#EEA0FF]/30 text-black'
  if (label === 'Stopped') return 'bg-red-100 text-red-600'
  if (label === 'Awaiting setup') return 'bg-amber-100 text-amber-700'
  return 'bg-gray-100 text-gray-600'
}

interface GroupMemberListProps {
  members: SipGroupMemberRow[]
  isAdmin: boolean
  onRemove?: (member: SipGroupMemberRow) => void
}

export function GroupMemberList({ members, isAdmin, onRemove }: GroupMemberListProps) {
  return (
    <div className="flex flex-col gap-2">
      {members.map((member) => (
        <div key={member.memberId} className="flex items-center justify-between border border-[#D9D9D9] rounded-xl px-4 py-3 bg-white">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-black truncate">{member.name}</span>
              {member.role === 'admin' && <span className="text-[10px] text-gray-500 border border-gray-300 rounded px-1.5 py-0.5">Admin</span>}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {member.status !== 'invited' && `Joined Day ${member.dayJoined}${member.upfrontAmount > 0 ? ` · ₹${member.upfrontAmount.toLocaleString('en-IN')} upfront` : ''}`}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <div className="font-semibold text-black text-sm">₹{member.contributed.toLocaleString('en-IN')}</div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${badgeClass(member)}`}>{labelFor(member)}</span>
            </div>
            {isAdmin && member.role !== 'admin' && onRemove && (
              <button onClick={() => onRemove(member)} className="text-xs text-red-500 underline">
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
