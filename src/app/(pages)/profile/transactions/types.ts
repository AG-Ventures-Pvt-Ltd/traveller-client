export interface WalletTransaction {
  _id: string
  type: 'credit' | 'debit'
  reason: 'signup_bonus' | 'trip_cashback' | 'booking_payment' | 'refund' | 'admin_adjustment' | 'referral_bonus' | 'wallet_topup'
  amount: number
  refType: 'TripBatch' | 'Booking' | 'Referral' | 'Payment' | null
  refId: { title?: string; name?: string } | null
  status: 'pending' | 'active' | 'used' | 'expired'
  createdAt: string
}

export interface TransactionsResponse {
  transactions: WalletTransaction[]
  count: number
}

export interface WalletBalance {
  balance: number
}

/** Normalised entry shown in the transactions list */
export interface TransactionEntry {
  id: string
  /** Display label */
  label: string
  date: string
  type: 'credit' | 'debit'
  amount: number
  /** origin of this entry */
  source: 'wallet' | 'trip'
}
