'use client'

import React from 'react'
import Button from '@/common/ui/Buttons/Button'
import type { SipPlan } from '../types'

interface SipPlanCardProps {
  plan: SipPlan
  onSubscribe: (plan: SipPlan) => void
}

export function SipPlanCard({ plan, onSubscribe }: SipPlanCardProps) {
  return (
    <div className="border border-[#D9D9D9] rounded-3xl p-6 flex flex-col gap-4 bg-white">
      <div>
        <h3 className="text-lg font-bold text-black">{plan.name}</h3>
        {plan.description && <p className="text-sm text-gray-500 mt-1">{plan.description}</p>}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-black">₹{plan.totalPayout.toLocaleString('en-IN')}</span>
        <span className="text-sm text-gray-500">in Wondrr Cash</span>
      </div>

      <div className="flex flex-col gap-1 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Save up to</span>
          <span className="font-semibold">₹{plan.targetAmount.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span>Bonus on completion</span>
          <span className="font-semibold text-green-600">+₹{plan.bonusAmount.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span>Daily</span>
          <span className="font-semibold">₹{plan.cadenceAmounts.daily.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span>Weekly</span>
          <span className="font-semibold">₹{plan.cadenceAmounts.weekly.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span>Monthly</span>
          <span className="font-semibold">₹{plan.cadenceAmounts.monthly.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <Button variant="purple" fullWidth onClick={() => onSubscribe(plan)}>
        Subscribe
      </Button>
    </div>
  )
}
