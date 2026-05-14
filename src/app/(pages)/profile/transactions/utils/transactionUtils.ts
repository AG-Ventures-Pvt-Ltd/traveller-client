import { WalletTransaction, TransactionEntry } from '../types'
import { BookedTrip } from '../../mytrips/constants'

export function getTransactionLabel(tx: WalletTransaction): string {
  if (tx.refId) {
    return tx.refId.title ?? tx.refId.name ?? reasonLabel(tx.reason)
  }
  return reasonLabel(tx.reason)
}

function reasonLabel(reason: WalletTransaction['reason']): string {
  const labels: Record<WalletTransaction['reason'], string> = {
    signup_bonus: 'Signup Bonus',
    trip_cashback: 'Trip Cashback',
    booking_payment: 'Booking Payment',
    refund: 'Refund',
    admin_adjustment: 'Admin Adjustment',
    referral_bonus: 'Referral Bonus',
    wallet_topup: 'Wallet Top-up',
  }
  return labels[reason] ?? reason
}

export function formatTransactionDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatAmount(amount: number, type: 'credit' | 'debit'): string {
  const formatted = `₹${amount.toLocaleString('en-IN')}`
  return type === 'credit' ? `+${formatted}` : `-${formatted}`
}

/** Map a raw wallet transaction to a unified TransactionEntry */
export function walletTxToEntry(tx: WalletTransaction): TransactionEntry {
  return {
    id: tx._id,
    label: getTransactionLabel(tx),
    date: tx.createdAt,
    type: tx.type,
    amount: tx.amount,
    source: 'wallet',
  }
}

/** Map a booked trip to a unified TransactionEntry (only completed/refunded) */
export function tripToEntry(trip: BookedTrip): TransactionEntry | null {
  const status = (trip.paymentStatus as string)
  if (status === 'completed' || status === 'paid') {
    return {
      id: trip._id + '-pay',
      label: trip.title,
      date: trip.bookedOn,
      type: 'debit',
      amount: trip.amount,
      source: 'trip',
    }
  }
  if (status === 'refunded') {
    return {
      id: trip._id + '-refund',
      label: `Refund – ${trip.title}`,
      date: trip.bookedOn,
      type: 'credit',
      amount: trip.amount,
      source: 'trip',
    }
  }
  return null
}

/** Merge wallet + trip entries and sort newest-first */
export function mergeAndSort(entries: TransactionEntry[]): TransactionEntry[] {
  return [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
