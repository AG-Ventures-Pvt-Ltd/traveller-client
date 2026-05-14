'use client'

import React, { useState } from 'react'
import MobileModal from '@/common/ui/MobileModal'
import Button from '@/common/ui/Buttons/Button'

const QUICK_AMOUNTS = [100, 250, 500, 1000]

interface AddBalanceModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (amount: number) => void
  isSubmitting?: boolean
}

export function AddBalanceModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: AddBalanceModalProps) {
  const [raw, setRaw] = useState('')

  const amount = parseInt(raw, 10)
  const isValid = !isNaN(amount) && amount >= 1

  const handleClose = () => {
    setRaw('')
    onClose()
  }

  const handleSubmit = () => {
    if (!isValid) return
    onSubmit(amount)
  }

  return (
    <MobileModal isOpen={isOpen} onClose={handleClose} title="Add Wondrr Cash">
      <div className="flex flex-col gap-6">
        {/* Amount input */}
        <div>
          <label className="block text-sm font-medium mb-2">Enter amount</label>
          <div className="flex items-center gap-2 border border-[#D9D9D9] rounded-2xl px-4 py-3">
            <span className="text-lg font-semibold text-black">₹</span>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              min={1}
              placeholder="0"
              value={raw}
              onChange={(e) => setRaw(e.target.value.replace(/[^0-9]/g, ''))}
              className="flex-1 bg-transparent text-2xl font-bold text-black placeholder:text-gray-300 outline-none"
            />
          </div>
        </div>

        {/* Quick select */}
        <div>
          <p className="text-xs text-gray-500 mb-2">Quick add</p>
          <div className="grid grid-cols-4 gap-2">
            {QUICK_AMOUNTS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setRaw(String(q))}
                className={`py-2 rounded-xl text-sm font-medium border transition-colors ${
                  amount === q
                    ? 'bg-[#EEA0FF] border-[#EEA0FF] text-black'
                    : 'border-[#D9D9D9] text-black hover:border-[#EEA0FF]'
                }`}
              >
                ₹{q}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="purple"
          fullWidth
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Processing…' : `Pay ₹${isValid ? amount.toLocaleString('en-IN') : '0'}`}
        </Button>
      </div>
    </MobileModal>
  )
}
