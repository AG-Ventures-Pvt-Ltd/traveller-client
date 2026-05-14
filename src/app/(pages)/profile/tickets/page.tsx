'use client'

import React, { useState } from 'react'
import { TicketIcon } from '@phosphor-icons/react'
import BackButton from '@/common/ui/BackButton'
import Button from '@/common/components/atoms/Button'
import CollapsibleCard from '@/common/ui/CollapsibleCard'
import usePostData from '@/services/usePostData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { useTickets } from './hooks/useTickets'
import { TicketItem } from './components/TicketItem'
import { RaiseTicketModal } from './components/RaiseTicketModal'
import { TicketDetailsModal } from './components/TicketDetailsModal'
import { SupportTicket } from './types'

export default function SupportTicketsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const { data: tickets, isLoading, refetch } = useTickets()

  const { mutate: createTicket, isPending: isCreating } = usePostData({
    url: API_ENDPOINTS.SUPPORT.CREATE_TICKET,
    onSuccess: () => {
      setIsModalOpen(false)
      refetch()
    },
  })

  const hasTickets = !!tickets && tickets.length > 0

  const handleRaiseTicket = (type: string, description: string, attachments?: string[]) => {
    createTicket({ type, description, attachments })
  }

  const handleTicketClick = (ticket: SupportTicket) => {
    setSelectedTicket(ticket)
    setIsDetailsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#FFF9F4] pb-28">
      <BackButton label="Back to Profile" to="/profile" className="mt-6" />

      <h1 className="text-4xl font-bold mt-6 mb-6 tracking-tight">Your Support Tickets</h1>

      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-[80px] rounded-2xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !hasTickets && (
        <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
          <p className="text-base font-medium text-black max-w-[298px] leading-relaxed">
            We see that there are no active support tickets of yours
          </p>
          <TicketIcon size={84} weight="thin" className="text-neutral-400" />
        </div>
      )}

      {/* Ticket list */}
      {!isLoading && hasTickets && (
        <CollapsibleCard title="Support Tickets" defaultOpen className="mb-4">
          {tickets.map((ticket, index) => (
            <TicketItem
              key={ticket._id}
              ticket={ticket}
              showDivider={index < tickets.length - 1}
              onClick={() => handleTicketClick(ticket)}
            />
          ))}
        </CollapsibleCard>
      )}

      {/* Sticky bottom action */}
      {!isLoading && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#FFF9F4] px-4 py-6">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 px-4 bg-[#FFC107]! text-black! rounded-xl font-normal"
            fullWidth
          >
            Raise a new ticket
          </Button>
        </div>
      )}

      <RaiseTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRaiseTicket}
        isSubmitting={isCreating}
      />

      <TicketDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  )
}
