'use client'

import React from 'react'
import { AirplaneTiltIcon } from '@phosphor-icons/react'
import type { SipPlan } from '../types'

interface PassTicketProps {
  plan: SipPlan
  dailyAvailable?: boolean
  // Colour of the surface behind the ticket, so the perforation notches blend in.
  notchClass?: string
}

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

// Boarding-pass style summary of a plan — used by the page hero and the landing banner.
export function PassTicket({ plan, dailyAvailable = true, notchClass = 'bg-[#FFF9F4]' }: PassTicketProps) {
  const cadences = (['daily', 'weekly', 'monthly'] as const).filter((c) => c !== 'daily' || dailyAvailable)

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute -inset-2 rounded-[2rem] bg-[#D0EF65] -rotate-3" />
      <div className="relative rounded-3xl bg-[#EEA0FF] overflow-hidden shadow-lg text-neutral-900">
        <div className="p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center gap-2">
            <span className="text-[11px] font-semibold tracking-[0.2em]">WONDRR · TRAVEL PASS</span>
            <span className="text-xs font-medium truncate">{plan.name}</span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase text-neutral-700">You pay</p>
              <p className="text-2xl font-bold font-['Satoshi']">{inr(plan.targetAmount)}</p>
            </div>
            <div className="flex-1 flex items-center gap-1 pb-3">
              <div className="flex-1 border-t-2 border-dashed border-neutral-900/30" />
              <AirplaneTiltIcon size={20} weight="fill" />
              <div className="flex-1 border-t-2 border-dashed border-neutral-900/30" />
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase text-neutral-700">You get</p>
              <p className="text-2xl font-bold font-['Satoshi']">{inr(plan.totalPayout)}</p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center">
          <span className={`absolute -left-3 h-6 w-6 rounded-full ${notchClass}`} />
          <div className="mx-5 flex-1 border-t-2 border-dashed border-white/70" />
          <span className={`absolute -right-3 h-6 w-6 rounded-full ${notchClass}`} />
        </div>

        <div className="p-5 flex flex-col gap-3">
          <div className="flex gap-6">
            {cadences.map((c) => (
              <div key={c}>
                <p className="text-[11px] uppercase text-neutral-700">{c}</p>
                <p className="font-semibold">{inr(plan.cadenceAmounts[c])}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-2.5">
            <span className="text-sm">Bonus on completion</span>
            <span className="rounded-full bg-[#D0EF65] px-3 py-1 text-sm font-semibold">+{inr(plan.bonusAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
