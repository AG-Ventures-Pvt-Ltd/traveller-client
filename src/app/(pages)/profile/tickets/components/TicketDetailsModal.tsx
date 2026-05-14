'use client'

import React from 'react'
import { X, WarningIcon, CheckCircleIcon, ClockIcon } from '@phosphor-icons/react'
import MobileModal from '@/common/ui/MobileModal'
import { SupportTicket } from '../types'
import MyImage from '@/common/ui/Image'

interface TicketDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  ticket: SupportTicket | null
}

const STATUS_CONFIG = {
  open: {
    label: 'Pending',
    color: '#F44336',
    bgColor: '#FFEBEE',
    icon: WarningIcon,
  },
  inProgress: {
    label: 'In Progress',
    color: '#FF9800',
    bgColor: '#FFF8E1',
    icon: ClockIcon,
  },
  resolved: {
    label: 'Resolved',
    color: '#43A047',
    bgColor: '#E8F5E9',
    icon: CheckCircleIcon,
  },
} as const

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function TicketDetailsModal({ isOpen, onClose, ticket }: TicketDetailsModalProps) {
  if (!ticket) return null

  const statusConfig = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open
  const StatusIcon = statusConfig.icon

  return (
    <MobileModal isOpen={isOpen} onClose={onClose} title={`${ticket._id}`}>
      <div className="flex flex-col gap-6">
        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium"
            style={{
              backgroundColor: statusConfig.bgColor,
              color: statusConfig.color,
            }}
          >
            <StatusIcon size={16} weight="fill" />
            {statusConfig.label}
          </div>
        </div>

        {/* Ticket Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <p className="text-sm text-black">{ticket.type}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <p className="text-sm text-black leading-relaxed">{ticket.description}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Created On
            </label>
            <p className="text-sm text-black">{formatDate(ticket.createdAt)}</p>
          </div>

          {/* Attachments */}
          {ticket.attachments && ticket.attachments.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ticket.attachments.map((url, index) => (
                  <div key={index} className="relative">
                    <MyImage
                      src={url}
                      alt={`Attachment ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reply for resolved tickets */}
          {ticket.status === 'resolved' && ticket.reply && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-green-800 mb-2">
                Support Response
              </label>
              <p className="text-sm text-green-700 leading-relaxed">{ticket.reply}</p>
            </div>
          )}
        </div>
      </div>
    </MobileModal>
  )
}