'use client'

import React from 'react'
import { WarningIcon } from '@phosphor-icons/react'
import { SupportTicket } from '../types'

const STATUS_CONFIG: Record<
  SupportTicket['status'],
  { label: string; color: string; bgColor: string }
> = {
  open: { label: 'Pending', color: '#F44336', bgColor: '#FFEBEE' },
  inProgress: { label: 'In Progress', color: '#FF9800', bgColor: '#FFF8E1' },
  resolved: { label: 'Resolved', color: '#43A047', bgColor: '#E8F5E9' },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

interface TicketItemProps {
  ticket: SupportTicket
  showDivider?: boolean
  onClick?: () => void
}

export function TicketItem({ ticket, showDivider, onClick }: TicketItemProps) {
  const config = STATUS_CONFIG[ticket.status] ?? STATUS_CONFIG.open

  return (
    <>
      <div
        className="flex items-center justify-between px-3 py-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg"
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: config.bgColor }}
          >
            <WarningIcon size={18} weight="thin" color={config.color} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-black">{ticket.type}</p>
            <p className="text-[10px] text-[#8f8f8f]">{formatDate(ticket.createdAt)}</p>
          </div>
        </div>
        <p className="text-sm font-normal" style={{ color: config.color }}>
          {config.label}
        </p>
      </div>
      {showDivider && <div className="mx-auto w-[233px] h-px bg-[#D9D9D9]" />}
    </>
  )
}
