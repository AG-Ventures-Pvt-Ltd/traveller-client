'use client'

import React, { useState } from 'react'
import type { AxiosError } from 'axios'
import {
  CaretDownIcon, PiggyBankIcon, CalendarCheckIcon, ChartLineUpIcon, GiftIcon, WalletIcon, ShieldCheckIcon,
  UsersThreeIcon, AirplaneTiltIcon, ArrowRightIcon, LinkSimpleIcon, CaretRightIcon,
} from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useGetData } from '@/services/useGetData'
import { baseAPI } from '@/services/baseApi'
import { notify } from '@/common/utils/notify'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import BackButton from '@/common/ui/BackButton'
import Footer from '../(landing)/components/Footer/Footer'
import { formatDate } from '@/common/utils/dateUtils'
import { SipPlanCard } from './components/SipPlanCard'
import { SubscribeSipModal } from './components/SubscribeSipModal'
import { CancelSipModal } from './components/CancelSipModal'
import { CreateGroupModal } from './components/CreateGroupModal'
import { JoinGroupModal } from './components/JoinGroupModal'
import { SavingsCalculator } from './components/SavingsCalculator'
import { PassTicket } from './components/PassTicket'
import { SIP_FAQS, CADENCE_UNIT, getPlanHighlights } from './constants'
import type { SipPlan, SipSubscription, PaymentConfig, SipGroupSummary } from './types'

const STATUS_LABELS: Record<SipSubscription['status'], string> = {
  pending_auth: 'Awaiting authorization',
  active: 'Active',
  completed: 'Completed',
  cancelled: 'Cancelled',
  failed_auth: 'Authorization failed',
}

const CURRENT_STATUSES: SipSubscription['status'][] = ['active', 'pending_auth']

const HOW_IT_WORKS = [
  { icon: PiggyBankIcon, title: 'Pick a plan' },
  { icon: CalendarCheckIcon, title: 'Auto-pay every {unit}' },
  { icon: WalletIcon, title: 'Lands in Wondrr Cash' },
  { icon: GiftIcon, title: 'Hit target, get bonus' },
]

const TRUST_POINTS = [
  { icon: WalletIcon, text: 'Credited to your wallet instantly' },
  { icon: ShieldCheckIcon, text: 'Cancel anytime, keep what you paid' },
  { icon: GiftIcon, text: 'Bonus credited automatically' },
]

// Mechanics mirror CreateGroupModal / group join flow (see SIP_FAQS).
const GROUP_STEPS = [
  { icon: UsersThreeIcon, title: 'Start a group', text: 'Once your pass is active' },
  { icon: LinkSimpleIcon, title: 'Share the code', text: 'Friends join within 7 days' },
  { icon: ChartLineUpIcon, title: 'Save together', text: 'Same plan, one shared total' },
]

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block">
    <span className="absolute inset-x-0 bottom-1 h-[8px] md:h-[10px] bg-[#D0EF65] rounded-sm z-0" />
    <span className="relative z-10">{children}</span>
  </span>
)

const SectionTitle = ({ title, subtitle, center }: { title: React.ReactNode; subtitle?: string; center?: boolean }) => (
  <div className={`flex flex-col gap-1.5 mb-6 ${center ? 'items-center text-center' : ''}`}>
    <h2 className="text-2xl md:text-[34px] font-semibold tracking-tight leading-tight text-neutral-900 font-['Satoshi']">{title}</h2>
    {subtitle && <p className="text-sm md:text-base text-neutral-500">{subtitle}</p>}
  </div>
)

const primaryBtn = 'inline-flex items-center justify-center gap-2 rounded-xl bg-[#EEA0FF] px-4 md:px-6 py-3 text-sm md:text-base whitespace-nowrap font-semibold text-neutral-900 hover:opacity-90 transition-opacity'
const secondaryBtn = 'inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 md:px-6 py-3 text-sm md:text-base whitespace-nowrap font-medium text-neutral-900 hover:border-[#EEA0FF] transition-colors'

// Smooth in-page jump; keeps the href so it still works without JS.
const smoothTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const target = document.querySelector(e.currentTarget.hash)
  if (!target) return
  e.preventDefault()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

// IST calendar-day string ('2026-09-11'), so a lexical >= comparison works.
const istDateStr = (d: Date | string) => new Date(d).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })

const TravelPassPage = () => {
  const { status } = useSession()
  const router = useRouter()

  const [subscribeModal, setSubscribeModal] = useState<{ open: boolean; plan: SipPlan | null }>({ open: false, plan: null })
  const [cancelModal, setCancelModal] = useState<{ open: boolean; subscription: SipSubscription | null }>({ open: false, subscription: null })
  const [createGroupOpen, setCreateGroupOpen] = useState(false)
  const [joinGroupOpen, setJoinGroupOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const { data: plansData, isLoading: plansLoading } = useGetData<SipPlan[]>(API_ENDPOINTS.SIP.PLANS, {
    queryKey: ['sip-plans'],
  })

  // Razorpay subscriptions can't bill more often than every 7 days, so it
  // rejects period:'daily' at interval:1 — Daily cadence only works on
  // Cashfree. Gate the option on the subscription gateway specifically —
  // it's set independently from the one-time booking/wallet gateway.
  const { data: paymentConfig } = useGetData<PaymentConfig>(API_ENDPOINTS.PAYMENTS.CONFIG, {
    queryKey: ['payment-config'],
  })

  const { data: mySubsData, isLoading: subsLoading, refetch: refetchSubs } = useGetData<SipSubscription[]>(
    API_ENDPOINTS.SIP.MY_SUBSCRIPTIONS,
    { queryKey: ['sip-subscriptions-mine'], enabled: status === 'authenticated' }
  )

  const { data: groupsData } = useGetData<{ groups: SipGroupSummary[]; invited: SipGroupSummary[] }>(
    API_ENDPOINTS.SIP.GROUPS.MINE,
    { queryKey: ['sip-groups-mine'], enabled: status === 'authenticated' }
  )

  const dailyAvailable = paymentConfig?.subscriptionGateway !== 'razorpay'
  const plans = plansData ?? []
  const stats = getPlanHighlights(plans, dailyAvailable)
  const mySubs = mySubsData ?? []
  const myGroups = groupsData?.groups ?? []
  const currentSips = mySubs.filter((s) => CURRENT_STATUSES.includes(s.status))
  const pastSips = mySubs.filter((s) => !CURRENT_STATUSES.includes(s.status))
  // A group is "previous" once the pass it was saving on has ended (subs carry
  // groupId) or its admin archived it. Anything else is the live group.
  const endedGroupIds = new Set(pastSips.map((s) => s.groupId).filter(Boolean))
  const isPreviousGroup = (g: SipGroupSummary) => g.status === 'archived' || endedGroupIds.has(g.groupId)
  const previousGroups = myGroups.filter(isPreviousGroup)
  const liveGroups = myGroups.filter((g) => !isPreviousGroup(g))
  const myGroup = liveGroups.find((g) => g.myRole === 'admin') || liveGroups[0]
  const hasActiveSip = currentSips.some((s) => s.status === 'active')
  // A user may only have one live SIP at a time (enforced server-side too) —
  // once one is pending_auth/active, hide the plan list instead of letting
  // them attempt a second subscribe that the server will reject anyway.
  const hasBlockingSip = status === 'authenticated' && currentSips.length > 0
  const subsReady = status !== 'authenticated' || !subsLoading
  const showPlans = subsReady && !hasBlockingSip

  const handleSubscribeClick = (plan: SipPlan) => {
    if (status === 'unauthenticated') {
      router.push('/auth')
      return
    }
    setSubscribeModal({ open: true, plan })
  }

  const handleJoinClick = () => {
    if (status === 'unauthenticated') {
      router.push('/auth')
      return
    }
    setJoinGroupOpen(true)
  }

  const handleJoinCode = (code: string) => {
    router.push(`/travel-pass/group/join/${code.toUpperCase()}`)
  }

  const handleCancel = async (subId: string) => {
    try {
      await baseAPI.post(API_ENDPOINTS.SIP.CANCEL(subId))
      notify.success('Travel Pass cancelled')
      refetchSubs()
    } catch (error) {
      // A 502 here means the gateway refused to stop the mandate — the auto-pay
      // is still live, so show what the server said rather than a generic line.
      const message = (error as AxiosError<{ message?: string }>)?.response?.data?.message
      notify.error(message || 'Failed to cancel Travel Pass')
    }
  }

  const planName = (sub: SipSubscription) => (typeof sub.planId === 'object' ? sub.planId.name : 'Travel Pass Plan')
  const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

  const renderActivePass = (sub: SipSubscription) => {
    // Locked in at subscribe time (sip.controller.js) — stays fixed for this
    // subscription even if the plan's live cadenceAmounts/target change later.
    const target = sub.planSnapshot.targetAmount
    const bonus = sub.planSnapshot.totalPayout - target
    const pct = Math.min(100, Math.round((sub.cumulativePaidAmount / target) * 100))
    // Guard against a stale nextScheduleDate (a missed installment webhook
    // before it advances again, or before the daily reconciliation worker
    // catches up) rendering an already-past date as "Next".
    const showNext = sub.nextScheduleDate && sub.status === 'active' && istDateStr(sub.nextScheduleDate) >= istDateStr(new Date())
    const tiles = [
      { icon: CalendarCheckIcon, label: 'Next debit', value: showNext ? formatDate(sub.nextScheduleDate!) : '—' },
      { icon: WalletIcon, label: `Per ${CADENCE_UNIT[sub.cadence]}`, value: inr(sub.installmentAmount) },
      { icon: GiftIcon, label: 'Bonus at finish', value: inr(bonus) },
    ]
    return (
      <div key={sub._id} className="rounded-3xl bg-neutral-900 text-white p-6 md:p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center gap-3">
          <span className="font-semibold text-lg">{planName(sub)}</span>
          <span className="text-xs rounded-full bg-[#D0EF65] px-3 py-1 font-medium text-neutral-900">{STATUS_LABELS[sub.status]}</span>
        </div>

        <div>
          <p className="text-sm text-white/60">Saved so far</p>
          <p className="text-[34px] md:text-[52px] font-bold leading-none tracking-tight font-['Satoshi'] mt-1">
            {inr(sub.cumulativePaidAmount)}
            <span className="text-lg font-normal text-white/50"> / {inr(target)}</span>
          </p>
        </div>

        <div>
          <div className="relative w-full bg-white/15 rounded-full h-3">
            <div className="bg-[#EEA0FF] h-3 rounded-full" style={{ width: `${pct}%` }} />
            <AirplaneTiltIcon
              size={22}
              weight="fill"
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-white"
              style={{ left: `${Math.max(pct, 3)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/60 mt-2">
            <span>{pct}% · {sub.installmentsPaidCount} installment{sub.installmentsPaidCount === 1 ? '' : 's'} paid</span>
            <span>{inr(Math.max(0, target - sub.cumulativePaidAmount))} to go</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-2xl bg-white/10 p-2.5 md:p-3 flex flex-col gap-1 md:gap-1.5">
              <t.icon size={18} className="text-[#EEA0FF]" />
              <span className="text-[11px] text-white/60 capitalize">{t.label}</span>
              <span className="text-[13px] md:text-base font-semibold leading-tight">{t.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setCancelModal({ open: true, subscription: sub })}
          className="self-start text-xs text-white/50 underline hover:text-red-400"
        >
          Cancel pass
        </button>
      </div>
    )
  }

  const renderPastSip = (sub: SipSubscription) => {
    const target = sub.planSnapshot.targetAmount
    const pct = Math.min(100, Math.round((sub.cumulativePaidAmount / target) * 100))
    const done = sub.status === 'completed'
    return (
      <div key={sub._id} className="rounded-2xl border border-[#D9D9D9] bg-white p-4 flex items-center gap-4">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${done ? 'bg-[#D0EF65]' : 'bg-neutral-100'}`}>
          {done ? <GiftIcon size={20} className="text-neutral-900" /> : <AirplaneTiltIcon size={20} className="text-neutral-400" />}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <span className="font-semibold text-neutral-900 truncate">{planName(sub)}</span>
            <span className="text-xs text-neutral-500 shrink-0">{STATUS_LABELS[sub.status]}</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-neutral-100">
            <div className={`h-1.5 rounded-full ${done ? 'bg-[#D0EF65]' : 'bg-neutral-300'}`} style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-neutral-500 mt-1.5">{inr(sub.cumulativePaidAmount)} of {inr(target)}</p>
        </div>
      </div>
    )
  }

  const renderGroupCard = (group: SipGroupSummary, previous = false) => (
    <button
      key={group.groupId}
      onClick={() => router.push(`/travel-pass/group/${group.groupId}`)}
      className={`w-full rounded-2xl p-4 flex items-center gap-4 text-left transition-colors ${
        previous ? 'border border-[#D9D9D9] bg-white hover:border-[#EEA0FF]' : 'bg-[#EEA0FF]/20 border border-[#EEA0FF] hover:bg-[#EEA0FF]/30'
      }`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEA0FF]">
        <UsersThreeIcon size={20} className="text-neutral-900" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-semibold text-neutral-900 truncate">{group.name}</span>
        <span className="block text-xs text-neutral-600">
          {group.memberCount} member{group.memberCount === 1 ? '' : 's'} · {inr(group.groupTotalContributed)} raised
        </span>
      </span>
      <CaretRightIcon size={18} className="text-neutral-500 shrink-0" />
    </button>
  )

  const hasHistory = pastSips.length > 0 || previousGroups.length > 0

  return (
    <div className="w-full min-h-screen bg-[#FFF9F4]">
      <div className="pt-8 px-4 pb-16">
        {/* Pass holders get a narrow, centred column with only their pass. */}
        <div className={`max-w-[600px] mx-auto flex flex-col ${hasBlockingSip ? 'gap-6 md:max-w-xl' : 'gap-12 md:gap-20 md:max-w-6xl'}`}>

          {/* ── Hero ─────────────────────────────────────────────── */}
          <section>
            {/* Mobile only — desktop has the navbar. */}
            <div className="flex items-center gap-3 mb-6 md:hidden">
              <BackButton label="" />
              <span className="rounded-full bg-[#EEA0FF]/25 px-4 py-1.5 text-base font-semibold text-neutral-900">Travel Pass</span>
            </div>

            {hasBlockingSip ? (
              <h1 className="text-[28px] md:text-[36px] font-bold leading-tight tracking-tight text-neutral-900 font-['Satoshi']">
                Your Travel Pass
              </h1>
            ) : (
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
              <div className="flex flex-col gap-5">
                <h1 className="text-[34px] md:text-[52px] font-bold leading-[1.1] tracking-tight text-neutral-900 font-['Satoshi']">
                  Your next trip, one small step <Highlight>at a time.</Highlight>
                </h1>
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-lg">
                  {stats ? `Just ₹${stats.fromAmount.toLocaleString('en-IN')} a ${stats.unit}` : 'A little every day'}, auto-saved into
                  Wondrr Cash. Hit your target, get a bonus on top.
                </p>
                <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap">
                  <a href="#plans" onClick={smoothTo} className={primaryBtn}>
                    See plans <ArrowRightIcon size={16} />
                  </a>
                  <a href="#groups" onClick={smoothTo} className={secondaryBtn}>
                    <UsersThreeIcon size={18} /> Save with friends
                  </a>
                </div>
                {stats && (
                  <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                    {[
                      [`₹${stats.fromAmount.toLocaleString('en-IN')}/${stats.unit}`, 'plans starting at'],
                      [`Up to ${stats.maxBonusPct}%`, 'bonus on completion'],
                    ].map(([value, label]) => (
                      <div key={label} className="flex flex-col-reverse">
                        <dt className="text-xs text-neutral-500">{label}</dt>
                        <dd className="text-xl md:text-2xl font-semibold text-neutral-900 font-['Satoshi']">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              {stats && (
                <div className="flex justify-center px-3 md:px-0 md:rotate-2">
                  <PassTicket plan={stats.featured} dailyAvailable={dailyAvailable} />
                </div>
              )}
            </div>
            )}
          </section>

          {status === 'authenticated' && subsLoading && (
            <p className="text-sm text-neutral-500 -mt-6">Loading your Travel Pass…</p>
          )}

          {/* ── Active pass: the only thing a holder sees ────────── */}
          {hasBlockingSip && (
            <section id="my-pass" className="flex flex-col gap-4">
              {currentSips.map(renderActivePass)}
              {myGroup ? renderGroupCard(myGroup) : hasActiveSip && (
                <button
                  onClick={() => setCreateGroupOpen(true)}
                  className="border-2 border-dashed border-[#D9D9D9] rounded-2xl p-4 text-left hover:border-[#EEA0FF] flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D0EF65]">
                    <UsersThreeIcon size={20} className="text-neutral-900" />
                  </span>
                  <span>
                    <span className="block font-semibold text-neutral-900">Start a group</span>
                    <span className="block text-sm text-neutral-500">Invite friends to save on this plan with you.</span>
                  </span>
                </button>
              )}
            </section>
          )}

          {/* A live group without a live pass (joined, not yet subscribed). */}
          {!hasBlockingSip && status === 'authenticated' && myGroup && (
            <section>
              <SectionTitle title="Your group" />
              {renderGroupCard(myGroup)}
            </section>
          )}

          {/* ── Plans ────────────────────────────────────────────── */}
          {showPlans && (
            <section id="plans" className="scroll-mt-24">
              <SectionTitle title="Pick your pass" subtitle="Every plan comes with a completion bonus." />
              {plansLoading ? (
                <div className="grid md:grid-cols-3 gap-4">
                  {[0, 1, 2].map((i) => <div key={i} className="h-80 rounded-3xl bg-neutral-200 animate-pulse" />)}
                </div>
              ) : plans.length === 0 ? (
                <p className="text-sm text-neutral-500">No Travel Pass plans available right now.</p>
              ) : (
                <div className="-mx-4 flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
                  {plans.map((plan) => (
                    <div key={plan._id} className="w-[82%] shrink-0 snap-center md:w-auto">
                      <SipPlanCard plan={plan} onSubscribe={handleSubscribeClick} dailyAvailable={dailyAvailable} />
                    </div>
                  ))}
                </div>
              )}

              {plans.length > 0 && (
                <ul className="mt-5 flex flex-col items-center gap-2 md:flex-row md:flex-wrap md:justify-center md:gap-x-6">
                  {TRUST_POINTS.map((point) => (
                    <li key={point.text} className="flex items-center gap-1.5 text-sm text-neutral-600">
                      <point.icon size={16} className="text-[#b35cc8]" />
                      {point.text}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* ── How it works ─────────────────────────────────────── */}
          {showPlans && (
          <section id="how" className="scroll-mt-24">
            <SectionTitle title={<>From savings to <Highlight>boarding.</Highlight></>} center />
            <ol className="relative grid grid-cols-4 gap-2">
              <div className="absolute left-[12%] right-[12%] top-6 md:top-7 border-t-2 border-dashed border-neutral-300" />
              {HOW_IT_WORKS.map((step, i) => (
                <li key={step.title} className="relative flex flex-col items-center text-center gap-2">
                  <span
                    className={`flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full border-4 border-[#FFF9F4] ${
                      i === HOW_IT_WORKS.length - 1 ? 'bg-[#D0EF65]' : 'bg-[#EEA0FF]'
                    }`}
                  >
                    <step.icon size={22} className="text-neutral-900" />
                  </span>
                  <p className="text-[11px] leading-tight md:text-sm font-medium text-neutral-900 max-w-[120px]">{step.title.replace('{unit}', stats?.unit ?? 'day')}</p>
                </li>
              ))}
            </ol>
          </section>
          )}

          {/* ── Calculator ───────────────────────────────────────── */}
          {showPlans && plans.length > 0 && (
            <section id="calculator" className="scroll-mt-24">
              <SectionTitle title={<>See what your pass <Highlight>becomes.</Highlight></>} />
              <SavingsCalculator plans={plans} dailyAvailable={dailyAvailable} onStart={handleSubscribeClick} />
            </section>
          )}

          {/* ── Groups ───────────────────────────────────────────── */}
          {showPlans && (
          <section id="groups" className="scroll-mt-24 rounded-3xl bg-[#FAEEFD] px-5 py-8 md:px-12 md:py-10">
            <SectionTitle title={<>Trips are better together. <Highlight>So is saving.</Highlight></>} center />
            <ol className="grid gap-2.5 md:grid-cols-3 md:gap-6">
              {GROUP_STEPS.map((step) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] items-center gap-x-3 rounded-2xl bg-white p-3.5 md:flex md:flex-col md:text-center md:gap-2 md:p-4">
                  <span className="row-span-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#EEA0FF]">
                    <step.icon size={20} className="text-neutral-900" />
                  </span>
                  <p className="text-sm font-medium text-neutral-900">{step.title}</p>
                  <p className="text-xs text-neutral-500">{step.text}</p>
                </li>
              ))}
            </ol>
            {!myGroup && (
              <div className="flex justify-center mt-6">
                <button onClick={handleJoinClick} className={secondaryBtn}>
                  <LinkSimpleIcon size={18} /> I have a group code
                </button>
              </div>
            )}
          </section>
          )}

          {/* ── History: finished passes + the groups they belonged to ── */}
          {!hasBlockingSip && status === 'authenticated' && !subsLoading && hasHistory && (
            <section className="grid md:grid-cols-2 gap-8">
              {pastSips.length > 0 && (
                <div>
                  <SectionTitle title="Past passes" />
                  <div className="flex flex-col gap-3">{pastSips.map(renderPastSip)}</div>
                </div>
              )}
              {previousGroups.length > 0 && (
                <div>
                  <SectionTitle title="Your previous groups" />
                  <div className="flex flex-col gap-3">{previousGroups.map((g) => renderGroupCard(g, true))}</div>
                </div>
              )}
            </section>
          )}

          {/* ── FAQ (also feeds FAQPage JSON-LD in layout.tsx) ───── */}
          {showPlans && (
          <section className="w-full md:mx-auto md:w-[80%]">
            <SectionTitle title="Questions, answered" />
            <div className="flex flex-col gap-2">
              {SIP_FAQS.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={faq.q} className="border border-[#d9d9d9] rounded-[12px] overflow-hidden bg-white">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-3 p-4 hover:bg-neutral-50 transition-colors text-left"
                    >
                      <p className="text-sm text-neutral-900 font-medium">{faq.q}</p>
                      <CaretDownIcon
                        size={20}
                        weight="thin"
                        className={`text-neutral-900 flex-shrink-0 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="px-4 pb-3 text-sm text-neutral-700">{faq.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
          )}
        </div>
      </div>

      <Footer />

      <SubscribeSipModal
        isOpen={subscribeModal.open}
        plan={subscribeModal.plan}
        activeGateway={paymentConfig?.subscriptionGateway}
        onClose={() => setSubscribeModal({ open: false, plan: null })}
        onSubscribed={() => refetchSubs()}
      />

      <CancelSipModal
        isOpen={cancelModal.open}
        subscription={cancelModal.subscription}
        onClose={() => setCancelModal({ open: false, subscription: null })}
        onConfirm={handleCancel}
      />

      <CreateGroupModal
        isOpen={createGroupOpen}
        onClose={() => setCreateGroupOpen(false)}
        onCreated={(groupId) => router.push(`/travel-pass/group/${groupId}`)}
      />

      <JoinGroupModal
        isOpen={joinGroupOpen}
        onClose={() => setJoinGroupOpen(false)}
        onJoin={handleJoinCode}
      />
    </div>
  )
}

export default TravelPassPage
