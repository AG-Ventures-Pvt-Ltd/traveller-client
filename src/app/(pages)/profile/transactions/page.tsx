'use client'

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/common/ui/BackButton'
import { TransactionList } from './components/TransactionList'
import { useWalletTransactions, useTripPayments, useWalletBalance } from './hooks/useTransactions'
import { walletTxToEntry, tripToEntry, mergeAndSort } from './utils/transactionUtils'

const PAGE_SIZE = 50 // load all wallet transactions at once for merged view

export default function TransactionsPage() {
  const router = useRouter()

  const { data: walletData, isLoading: walletLoading } = useWalletTransactions(PAGE_SIZE, 0)
  const { data: tripPayments, isLoading: tripsLoading } = useTripPayments()
  const { data: balanceData } = useWalletBalance()

  const isLoading = walletLoading || tripsLoading

  const entries = useMemo(() => {
    const walletEntries = (walletData?.transactions ?? []).map(walletTxToEntry)
    const tripEntries = (tripPayments ?? [])
      .map(tripToEntry)
      .filter((e): e is NonNullable<ReturnType<typeof tripToEntry>> => e !== null)
    return mergeAndSort([...walletEntries, ...tripEntries])
  }, [walletData, tripPayments])

  return (
    <div className="min-h-screen bg-[#FFF9F4] px-4 pt-4 pb-28">
      <BackButton label="Back to Profile" to="/profile" className="mt-6" />

      <h1 className="text-4xl font-bold mt-6 mb-6 tracking-tight">
        Your Transactions
      </h1>

      {balanceData !== undefined && (
        <div className="mb-4 bg-white border border-[#d9d9d9] rounded-2xl px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-neutral-500">Wallet Balance</span>
          <span className="text-base font-semibold text-black">
            ₹{(balanceData.balance ?? 0).toLocaleString('en-IN')}
          </span>
        </div>
      )}

      <TransactionList
        entries={entries}
        isLoading={isLoading}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-[#FFF9F4] px-4 pb-6 pt-3">
        <button
          onClick={() => router.push('/profile')}
          className="w-full bg-[#FFC107] text-black font-medium text-sm py-4 rounded-xl"
        >
          Done
        </button>
      </div>
    </div>
  )
}
