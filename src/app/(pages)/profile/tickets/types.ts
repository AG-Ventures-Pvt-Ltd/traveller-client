export interface SupportTicket {
  _id: string
  type: string
  description: string
  status: 'open' | 'inProgress' | 'resolved'
  createdAt: string
  attachments?: string[]
  reply?: string
}

export const TICKET_TYPES = [
  'Booking Issues',
  'Refunds & Cancellations',
  'Login & Account Issues',
  'Payment Problems',
  'Report Trip/Content',
  'Problem Creating Trips',
  'Data Export/Download Issues',
  'Bug Report',
  'Feature Request',
  'UI/UX Feedback',
  'Offers & Coupons Help',
  'Other',
] as const

export type TicketType = (typeof TICKET_TYPES)[number]

export const TICKET_TYPE_OPTIONS = TICKET_TYPES.map((t) => ({ value: t, label: t }))
