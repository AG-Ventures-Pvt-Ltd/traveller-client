'use client'

import React, { useState } from 'react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { bonusPct } from '../constants'
import type { SipPlan } from '../types'

type Cadence = 'daily' | 'weekly' | 'monthly'

const UNIT: Record<Cadence, [string, string]> = {
  daily: ['day', 'days'],
  weekly: ['week', 'weeks'],
  monthly: ['month', 'months'],
}

interface SavingsCalculatorProps {
  plans: SipPlan[]
  // Razorpay can't bill daily — mirrors SubscribeSipModal's cadence gating.
  dailyAvailable: boolean
  onStart?: (plan: SipPlan) => void
}

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

export function SavingsCalculator({ plans, dailyAvailable, onStart }: SavingsCalculatorProps) {
  const [planId, setPlanId] = useState(plans[0]._id)
  const [cadence, setCadence] = useState<Cadence>('weekly')
  const plan = plans.find((p) => p._id === planId) ?? plans[0]
  const cadences: Cadence[] = dailyAvailable ? ['daily', 'weekly', 'monthly'] : ['weekly', 'monthly']

  const amount = plan.cadenceAmounts[cadence]
  const installments = Math.ceil(plan.targetAmount / amount)
  const targetShare = (plan.targetAmount / plan.totalPayout) * 100

  const chip = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
      active ? 'bg-[#EEA0FF] border-[#EEA0FF] text-neutral-900' : 'bg-white border-[#D9D9D9] text-neutral-900 hover:border-[#EEA0FF]'
    }`

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-3xl border border-[#D9D9D9] bg-white p-6 flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-3">1 · Pick a plan</p>
          <div className="flex flex-wrap gap-2">
            {plans.map((p) => (
              <button key={p._id} type="button" onClick={() => setPlanId(p._id)} className={chip(p._id === plan._id)}>
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-3">2 · How often you save</p>
          <div className="flex flex-wrap gap-2">
            {cadences.map((c) => (
              <button key={c} type="button" onClick={() => setCadence(c)} className={`${chip(c === cadence)} capitalize`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-auto rounded-2xl bg-[#FFF9F4] p-4">
          <p className="text-sm text-neutral-500">You set aside</p>
          <p className="text-4xl font-bold text-neutral-900 font-['Satoshi']">
            {inr(amount)}
            <span className="text-base font-medium text-neutral-500"> / {UNIT[cadence][0]}</span>
          </p>
          <p className="text-sm text-neutral-600 mt-1">
            for {installments} {UNIT[cadence][installments === 1 ? 0 : 1]} — auto-paid, nothing to remember.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-[#EEA0FF] p-6 flex flex-col gap-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-800">3 · What it becomes</p>
        <div>
          <p className="text-sm text-neutral-800">Wondrr Cash for your trip</p>
          <p className="text-4xl md:text-5xl font-bold text-neutral-900 font-['Satoshi']">{inr(plan.totalPayout)}</p>
        </div>

        <div className="flex h-4 w-full overflow-hidden rounded-full bg-white/50">
          <div className="bg-white transition-all duration-500" style={{ width: `${targetShare}%` }} />
          <div className="bg-[#D0EF65] flex-1" />
        </div>

        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <dt className="flex items-center gap-2 text-neutral-800">
              <span className="h-2.5 w-2.5 rounded-full bg-white" /> You pay
            </dt>
            <dd className="font-semibold text-neutral-900">{inr(plan.targetAmount)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="flex items-center gap-2 text-neutral-800">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D0EF65]" /> Wondrr adds
            </dt>
            <dd className="font-semibold text-neutral-900">
              +{inr(plan.bonusAmount)} <span className="font-medium text-neutral-700">({bonusPct(plan)}% bonus)</span>
            </dd>
          </div>
        </dl>

        {onStart && (
          <button
            type="button"
            onClick={() => onStart(plan)}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-neutral-900 hover:-translate-y-0.5 transition-transform"
          >
            Start {plan.name} <ArrowRightIcon size={16} weight="bold" />
          </button>
        )}
      </div>
    </div>
  )
}
