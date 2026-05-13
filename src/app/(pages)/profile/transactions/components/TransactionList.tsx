'use client'

import React from 'react'
import { TransactionEntry } from '../types'
import { TransactionItem } from './TransactionItem'
import CollapsibleCard from '@/common/ui/CollapsibleCard'

interface TransactionListProps {
  entries: TransactionEntry[]
  isLoading: boolean
  hasMore?: boolean
  onLoadMore?: () => void
  title?: string
}

export function TransactionList({
  entries,
  isLoading,
  hasMore = false,
  onLoadMore,
  title = 'Transaction History',
}: TransactionListProps) {
  return (
    <CollapsibleCard title={title} defaultOpen={true}>
      {isLoading && entries.length === 0 && (
        <div className="flex flex-col divide-y divide-gray-200">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-3 py-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0" />
              <div className="flex flex-col gap-1 flex-1">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
                <div className="h-2 bg-gray-100 rounded animate-pulse w-20" />
              </div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-14" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && entries.length === 0 && (
        <div className="text-center py-8 text-sm text-neutral-400">
          No transactions yet
        </div>
      )}

      {entries.map((entry, i) => (
        <TransactionItem
          key={entry.id}
          entry={entry}
          showDivider={i < entries.length - 1 || hasMore}
        />
      ))}

      {hasMore && onLoadMore && (
        <div className="text-center py-3">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="text-[12px] text-[#448aff] underline disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'view more'}
          </button>
        </div>
      )}
    </CollapsibleCard>
  )
}
