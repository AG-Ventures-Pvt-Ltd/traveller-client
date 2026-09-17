'use client'

import React from 'react'
import { CheckIcon } from '@phosphor-icons/react'
import Button from '@/common/ui/Buttons/Button'
import { bonusPct } from '../constants'
import type { SipPlan } from '../types'

interface SipPlanCardProps {
  plan: SipPlan
  onSubscribe: (plan: SipPlan) => void
}

export function SipPlanCard({ plan, onSubscribe }: SipPlanCardProps) {
  const rows = [
    <>Pay <span className="font-semibold text-neutral-900">₹{plan.targetAmount.toLocaleString('en-IN')}</span> in small installments</>,
    <>Get <span className="font-semibold text-neutral-900">+₹{plan.bonusAmount.toLocaleString('en-IN')}</span> bonus on completion</>,
    <>₹{plan.cadenceAmounts.daily.toLocaleString('en-IN')}/day · ₹{plan.cadenceAmounts.weekly.toLocaleString('en-IN')}/week · ₹{plan.cadenceAmounts.monthly.toLocaleString('en-IN')}/month</>,
  ]

  return (
    <div className="relative border border-[#D9D9D9] rounded-3xl p-6 flex flex-col gap-4 bg-white h-full transition-all hover:border-[#EEA0FF] hover:shadow-lg hover:-translate-y-0.5">
      <span className="absolute right-5 top-5 rounded-full bg-[#D0EF65] px-2.5 py-1 text-xs font-semibold text-neutral-900">
        +{bonusPct(plan)}% bonus
      </span>

      <div className="pr-24">
        <h3 className="text-lg font-semibold text-neutral-900">{plan.name}</h3>
        {plan.description && <p className="text-sm text-neutral-500 mt-1">{plan.description}</p>}
      </div>

      <div>
        <p className="text-xs text-neutral-500">You get</p>
        <p className="text-3xl font-bold text-neutral-900 font-['Satoshi']">₹{plan.totalPayout.toLocaleString('en-IN')}</p>
        <p className="text-xs text-neutral-500">in Wondrr Cash</p>
      </div>

      <ul className="flex flex-col gap-2 text-sm text-neutral-600">
        {rows.map((row, i) => (
          <li key={i} className="flex gap-2">
            <CheckIcon size={16} weight="bold" className="shrink-0 mt-0.5 text-[#c26bd6]" />
            <span>{row}</span>
          </li>
        ))}
      </ul>

      <Button variant="purple" fullWidth className="mt-auto font-semibold" onClick={() => onSubscribe(plan)}>
        Start this pass
      </Button>
    </div>
  )
}
