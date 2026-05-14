'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/common/ui/BackButton'
import { TransactionList } from './components/TransactionList'
import { useWalletTransactions, useTripPayments } from './hooks/useTransactions'
import { walletTxToEntry, tripToEntry, mergeAndSort } from './utils/transactionUtils'
import { WalletTransaction } from './types'
import Button from '@/common/ui/Buttons/Button'

const PAGE_SIZE = 10

export default function TransactionsPage() {
  const router = useRouter()
  const [offset, setOffset] = useState(0)
  const [allWalletTx, setAllWalletTx] = useState<WalletTransaction[]>([])

  const { data: walletData, isLoading: walletLoading } = useWalletTransactions(PAGE_SIZE, offset)
  const { data: tripPayments, isLoading: tripsLoading } = useTripPayments()

  useEffect(() => {
    if (walletData?.transactions) {
      setAllWalletTx(prev => offset === 0 ? walletData.transactions : [...prev, ...walletData.transactions])
    }
  }, [walletData, offset])

  const isLoading = (offset === 0 && walletLoading) || tripsLoading
  const hasMore = walletData?.transactions?.length === PAGE_SIZE

  const onLoadMore = () => {
    setOffset(prev => prev + PAGE_SIZE)
  }

  const entries = useMemo(() => {
    const walletEntries = allWalletTx.map(walletTxToEntry)
    const tripEntries = (tripPayments ?? [])
      .map(tripToEntry)
      .filter((e): e is NonNullable<ReturnType<typeof tripToEntry>> => e !== null)
    return mergeAndSort([...walletEntries, ...tripEntries])
  }, [allWalletTx, tripPayments])

  return (
    <div className="min-h-screen bg-[#FFF9F4] pb-28">
      <BackButton label="Back to Profile" to="/profile" className="mt-6" />

      <h1 className="text-4xl font-bold mt-6 mb-6 tracking-tight">
        Your <br/>Transactions
      </h1>

      <TransactionList
        entries={entries}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-[#FFF9F4] px-4 pb-6 pt-3">
        <Button fullWidth variant='yellow' onClick={() => router.push('/profile')}>
          Done
        </Button>
      </div>
    </div>
  )
}
