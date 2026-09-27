'use client'

import React from 'react'
import { CheckIcon } from '@phosphor-icons/react'
import Button from '@/common/ui/Buttons/Button'
import { bonusPct, CADENCE_UNIT, leadCadence } from '../constants'
import type { SipPlan } from '../types'

interface SipPlanCardProps {
  plan: SipPlan
  onSubscribe: (plan: SipPlan) => void
  dailyAvailable: boolean
}

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

export function SipPlanCard({ plan, onSubscribe, dailyAvailable }: SipPlanCardProps) {
  const lead = leadCadence(dailyAvailable)
  const others = (['weekly', 'monthly'] as const).filter((c) => c !== lead)
  const rows = [
    <>Pay <span className="font-semibold text-neutral-900">₹{plan.targetAmount.toLocaleString('en-IN')}</span> in small installments</>,
    <>Get <span className="font-semibold text-neutral-900">+₹{plan.bonusAmount.toLocaleString('en-IN')}</span> bonus on completion</>,
    <>Or {others.map((c) => `${inr(plan.cadenceAmounts[c])}/${CADENCE_UNIT[c]}`).join(' · ')}</>,
  ]

  return (
    <div className="relative border border-[#D9D9D9] rounded-3xl p-5 md:p-6 flex flex-col gap-4 bg-white h-full transition-all hover:border-[#EEA0FF] hover:shadow-lg hover:-translate-y-0.5">
      <span className="absolute right-5 top-5 rounded-full bg-[#D0EF65] px-2.5 py-1 text-xs font-semibold text-neutral-900">
        +{bonusPct(plan)}% bonus
      </span>

      <div className="pr-24">
        <h3 className="text-lg font-semibold text-neutral-900">{plan.name}</h3>
        {plan.description && <p className="text-sm text-neutral-500 mt-1">{plan.description}</p>}
      </div>

      <div>
        <p className="text-xs text-neutral-500">Save just</p>
        <p className="text-[32px] md:text-4xl font-bold text-neutral-900 font-['Satoshi']">
          {inr(plan.cadenceAmounts[lead])}
          <span className="text-base font-medium text-neutral-500">/{CADENCE_UNIT[lead]}</span>
        </p>
        <p className="text-sm text-neutral-600 mt-1">
          becomes <span className="font-semibold text-neutral-900">{inr(plan.totalPayout)}</span> in Wondrr Cash
        </p>
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
