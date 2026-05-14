import React from 'react'
import { ArrowUpRightIcon, ArrowDownLeftIcon } from '@phosphor-icons/react'
import { TransactionEntry } from '../types'
import { formatTransactionDate, formatAmount } from '../utils/transactionUtils'

interface TransactionItemProps {
  entry: TransactionEntry
  showDivider?: boolean
}

export function TransactionItem({ entry, showDivider = true }: TransactionItemProps) {
  const isCredit = entry.type === 'credit'
  const date = formatTransactionDate(entry.date)
  const amount = formatAmount(entry.amount, entry.type)

  return (
    <>
      <div className="flex items-center justify-between py-3 px-3">
        <div className="flex items-center gap-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: isCredit ? '#E2F4A6' : '#FFB9B9' }}
          >
            {isCredit ? (
              <ArrowDownLeftIcon size={20} weight="thin" />
            ) : (
              <ArrowUpRightIcon size={20} weight="thin" />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[12px] text-black tracking-tight line-clamp-1 max-w-[180px]">
              {entry.label}
            </p>
            <p className="text-[10px] text-[#8f8f8f] tracking-tight">{date}</p>
          </div>
        </div>

        <p
          className="text-[14px] font-normal tracking-tight whitespace-nowrap"
          style={{ color: isCredit ? '#43A047' : '#F44336' }}
        >
          {amount}
        </p>
      </div>

      {showDivider && <div className="h-px bg-gray-200 mx-3" />}
    </>
  )
}
