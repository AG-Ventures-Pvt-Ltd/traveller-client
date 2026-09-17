'use client'

import React, { useState } from 'react'
import type { AxiosError } from 'axios'
import {
  CaretDownIcon, PiggyBankIcon, CalendarCheckIcon, ChartLineUpIcon, GiftIcon, WalletIcon, ShieldCheckIcon,
  UsersThreeIcon, AirplaneTiltIcon, CheckCircleIcon, XCircleIcon, ArrowRightIcon, LinkSimpleIcon,
} from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useGetData } from '@/services/useGetData'
import { baseAPI } from '@/services/baseApi'
import { notify } from '@/common/utils/notify'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import BackButton from '@/common/ui/BackButton'
import Footer from '../(landing)/components/Footer/Footer'
import ExploreByDestination from '../(landing)/components/common/ExploreByDestination/ExploreByDestination'
import { formatDate } from '@/common/utils/dateUtils'
import { SipPlanCard } from './components/SipPlanCard'
import { SubscribeSipModal } from './components/SubscribeSipModal'
import { CancelSipModal } from './components/CancelSipModal'
import { CreateGroupModal } from './components/CreateGroupModal'
import { JoinGroupModal } from './components/JoinGroupModal'
import { SavingsCalculator } from './components/SavingsCalculator'
import { PassTicket } from './components/PassTicket'
import { SIP_FAQS, getPlanHighlights } from './constants'
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
  { icon: PiggyBankIcon, title: 'Pick a plan', text: 'Choose a target amount and bonus that fits your next trip.' },
  { icon: CalendarCheckIcon, title: 'Auto-pay on schedule', text: 'Daily, weekly or monthly installments are debited automatically.' },
  { icon: ChartLineUpIcon, title: 'Watch it add up', text: 'Every installment lands in your Wondrr Cash wallet instantly.' },
  { icon: GiftIcon, title: 'Get your bonus, go', text: 'Reach the target, the bonus is credited on top — then book your trip.' },
]

const TRUST_POINTS = [
  { icon: WalletIcon, text: 'Credited to your wallet instantly' },
  { icon: ShieldCheckIcon, text: 'Cancel anytime, keep what you paid' },
  { icon: GiftIcon, text: 'Bonus credited automatically' },
  { icon: UsersThreeIcon, text: 'Save together in a group' },
]

// Mechanics mirror CreateGroupModal / group join flow (see SIP_FAQS).
const GROUP_STEPS = [
  { title: 'Start your pass, then a group', text: 'Once your Travel Pass is active, create a group in one tap.' },
  { title: 'Share your 6-character code', text: 'Send the code or link to the friends you’re travelling with.' },
  { title: 'Friends join within 7 days', text: 'They save on the same plan, schedule and amount as you. Joining a few days late? They pay the missed installments once and stay in sync.' },
  { title: 'Track it together', text: 'See every member and the group’s total on one shared page.' },
]

const COMPARISON = [
  { alone: 'Remember to move money every time', pass: 'Auto-pay does it for you on schedule' },
  { alone: 'Savings quietly get spent on other things', pass: 'Credited to Wondrr Cash, set aside for travel' },
  { alone: 'No reward for sticking with it', pass: 'A bonus on top when you hit your target' },
  { alone: 'Everyone in the gang saves separately', pass: 'One group, one plan, one shared total' },
]

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block">
    <span className="absolute inset-x-0 bottom-1 h-[8px] md:h-[10px] bg-[#D0EF65] rounded-sm z-0" />
    <span className="relative z-10">{children}</span>
  </span>
)

const SectionTitle = ({ title, subtitle }: { title: React.ReactNode; subtitle?: string }) => (
  <div className="flex flex-col gap-1.5 mb-6">
    <h2 className="text-2xl md:text-[34px] font-semibold tracking-tight leading-tight text-neutral-900 font-['Satoshi']">{title}</h2>
    {subtitle && <p className="text-sm md:text-base text-neutral-500">{subtitle}</p>}
  </div>
)

const primaryBtn = 'inline-flex items-center justify-center gap-2 rounded-xl bg-[#EEA0FF] px-6 py-3 font-semibold text-neutral-900 hover:opacity-90 transition-opacity'
const secondaryBtn = 'inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 font-medium text-neutral-900 hover:border-[#EEA0FF] transition-colors'

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
  const stats = getPlanHighlights(plans)
  const mySubs = mySubsData ?? []
  const myGroups = groupsData?.groups ?? []
  const adminGroup = myGroups.find((g) => g.myRole === 'admin' && g.status === 'active')
  const memberGroup = myGroups.find((g) => g.myRole === 'member')
  const myGroup = adminGroup || memberGroup
  const currentSips = mySubs.filter((s) => CURRENT_STATUSES.includes(s.status))
  const pastSips = mySubs.filter((s) => !CURRENT_STATUSES.includes(s.status))
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

  const renderSipCard = (sub: SipSubscription) => {
    // Locked in at subscribe time (sip.controller.js) — stays fixed for this
    // subscription even if the plan's live cadenceAmounts/target change later.
    const target = sub.planSnapshot.targetAmount
    const bonus = sub.planSnapshot.totalPayout - sub.planSnapshot.targetAmount
    const pct = Math.min(100, Math.round((sub.cumulativePaidAmount / target) * 100))
    return (
      <div key={sub._id} className="border border-[#D9D9D9] rounded-2xl p-5 bg-white">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-neutral-900">
            {typeof sub.planId === 'object' ? sub.planId.name : 'Travel Pass Plan'}
          </span>
          <span className="text-xs rounded-full bg-[#EEA0FF]/20 px-2.5 py-1 text-neutral-800">{STATUS_LABELS[sub.status]}</span>
        </div>
        <div className="flex justify-between text-xs text-neutral-500 mb-3 capitalize">
          <span>{sub.cadence} · ₹{sub.installmentAmount.toLocaleString('en-IN')}/installment</span>
          <span>Bonus: ₹{bonus.toLocaleString('en-IN')}</span>
        </div>
        <div className="relative w-full bg-neutral-100 rounded-full h-3 mb-2">
          <div className="bg-[#EEA0FF] h-3 rounded-full" style={{ width: `${pct}%` }} />
          <AirplaneTiltIcon
            size={18}
            weight="fill"
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-neutral-800"
            style={{ left: `${Math.max(pct, 3)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-neutral-600">
          <span>₹{sub.cumulativePaidAmount.toLocaleString('en-IN')} / ₹{target.toLocaleString('en-IN')} · {pct}%</span>
          {/* Guard against a stale nextScheduleDate (a missed installment webhook
              before it advances again, or before the daily reconciliation worker
              catches up) rendering an already-past date as "Next". */}
          {sub.nextScheduleDate && sub.status === 'active' && istDateStr(sub.nextScheduleDate) >= istDateStr(new Date()) && (
            <span>Next: {formatDate(sub.nextScheduleDate)}</span>
          )}
        </div>
        {(sub.status === 'active' || sub.status === 'pending_auth') && (
          <button
            onClick={() => setCancelModal({ open: true, subscription: sub })}
            className="text-xs text-red-500 mt-3 underline"
          >
            Cancel
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#FFF9F4]">
      <div className="pt-8 px-4 pb-16">
        <div className="max-w-[600px] md:max-w-6xl mx-auto flex flex-col gap-14 md:gap-20">

          {/* ── Hero ─────────────────────────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <BackButton label="" />
              <span className="rounded-full bg-[#EEA0FF]/25 px-3 py-1 text-xs font-medium text-neutral-800">Travel Pass</span>
            </div>

            <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
              <div className="flex flex-col gap-5">
                <h1 className="text-[34px] md:text-[52px] font-bold leading-[1.1] tracking-tight text-neutral-900 font-['Satoshi']">
                  Your next trip, one small step <Highlight>at a time.</Highlight>
                </h1>
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-lg">
                  Auto-save a little every day, week or month into your Wondrr Cash wallet — alone or with your travel
                  gang. Hit your target and we add a bonus on top.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={hasBlockingSip ? '#my-pass' : '#plans'} className={primaryBtn}>
                    {hasBlockingSip ? 'View my pass' : 'See plans'} <ArrowRightIcon size={16} />
                  </a>
                  <a href="#groups" className={secondaryBtn}>
                    <UsersThreeIcon size={18} /> Save with friends
                  </a>
                </div>
                {stats && (
                  <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                    {[
                      [`Up to ${stats.maxBonusPct}%`, 'bonus on completion'],
                      [`₹${stats.minWeekly.toLocaleString('en-IN')}/week`, 'plans starting at'],
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
                <div className="flex justify-center md:rotate-2">
                  <PassTicket plan={stats.featured} dailyAvailable={dailyAvailable} />
                </div>
              )}
            </div>
          </section>

          {/* ── Your pass (signed in) ────────────────────────────── */}
          {status === 'authenticated' && subsLoading && (
            <p className="text-sm text-neutral-500 -mt-6">Loading your Travel Pass…</p>
          )}

          {status === 'authenticated' && !subsLoading && (currentSips.length > 0 || myGroup) && (
            <section id="my-pass" className="scroll-mt-24">
              <SectionTitle title="Your Travel Pass" />
              <div className="grid md:grid-cols-2 gap-4">
                {currentSips.map(renderSipCard)}
                {myGroup ? (
                  <div
                    onClick={() => router.push(`/travel-pass/group/${myGroup.groupId}`)}
                    className="rounded-2xl p-5 bg-[#EEA0FF]/20 border border-[#EEA0FF] cursor-pointer flex flex-col justify-between gap-3 hover:bg-[#EEA0FF]/30"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-neutral-900">{myGroup.name}</span>
                      <span className="text-xs text-neutral-600">{myGroup.memberCount} member{myGroup.memberCount === 1 ? '' : 's'}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-neutral-600">Your group</span>
                      <span className="text-xl font-semibold text-neutral-900 font-['Satoshi']">
                        ₹{myGroup.groupTotalContributed.toLocaleString('en-IN')} <span className="text-xs font-normal text-neutral-600">raised</span>
                      </span>
                    </div>
                  </div>
                ) : hasActiveSip && (
                  <button
                    onClick={() => setCreateGroupOpen(true)}
                    className="border-2 border-dashed border-[#D9D9D9] rounded-2xl p-5 text-left hover:border-[#EEA0FF] flex items-center gap-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D0EF65]">
                      <UsersThreeIcon size={22} className="text-neutral-900" />
                    </span>
                    <span>
                      <span className="block font-semibold text-neutral-900">Start a group</span>
                      <span className="block text-sm text-neutral-500">Invite friends to save toward this plan with you.</span>
                    </span>
                  </button>
                )}
              </div>
              {hasBlockingSip && (
                <p className="text-sm text-neutral-500 mt-4">New plans open up once your current pass is completed or cancelled.</p>
              )}
            </section>
          )}

          {/* ── Plans (kept high so users see them early) ────────── */}
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
                <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:items-stretch">
                  {plans.map((plan) => (
                    <SipPlanCard key={plan._id} plan={plan} onSubscribe={handleSubscribeClick} />
                  ))}
                </div>
              )}

              {plans.length > 0 && (
                <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2">
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
          <section id="how" className="scroll-mt-24">
            <SectionTitle title={<>From savings to <Highlight>boarding.</Highlight></>} subtitle="Four steps. You only do the first one." />
            <ol className="relative grid md:grid-cols-4 gap-6 md:gap-4">
              <div className="hidden md:block absolute left-[12%] right-[12%] top-7 border-t-2 border-dashed border-neutral-300" />
              <div className="md:hidden absolute top-4 bottom-4 left-7 border-l-2 border-dashed border-neutral-300" />
              {HOW_IT_WORKS.map((step, i) => (
                <li key={step.title} className="relative flex md:flex-col md:items-center md:text-center gap-4">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[#FFF9F4] ${
                      i === HOW_IT_WORKS.length - 1 ? 'bg-[#D0EF65]' : 'bg-[#EEA0FF]'
                    }`}
                  >
                    <step.icon size={24} className="text-neutral-900" />
                  </span>
                  <div>
                    <p className="text-xs text-neutral-400 mb-1">Step {i + 1}</p>
                    <p className="font-semibold text-neutral-900">{step.title}</p>
                    <p className="text-sm text-neutral-500 leading-relaxed mt-1 md:max-w-[220px]">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Calculator ───────────────────────────────────────── */}
          {plans.length > 0 && (
            <section id="calculator" className="scroll-mt-24">
              <SectionTitle
                title={<>See what your pass <Highlight>becomes.</Highlight></>}
                subtitle="Pick a plan and a pace — these are the real numbers."
              />
              <SavingsCalculator
                plans={plans}
                dailyAvailable={dailyAvailable}
                onStart={showPlans ? handleSubscribeClick : undefined}
              />
            </section>
          )}

          {/* ── Groups ───────────────────────────────────────────── */}
          <section id="groups" className="scroll-mt-24 rounded-3xl bg-[#FAEEFD] px-5 py-8 md:px-12 md:py-12">
            <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-700 mb-4">
                  <UsersThreeIcon size={14} /> Travel Pass Groups
                </span>
                <SectionTitle
                  title={<>Trips are better together. <Highlight>So is saving.</Highlight></>}
                  subtitle="Planning Goa with the gang? Save for it as a group, so nobody drops out at the last minute."
                />
                <ol className="flex flex-col gap-4">
                  {GROUP_STEPS.map((step, i) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-medium text-neutral-900">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-neutral-900">{step.title}</p>
                        <p className="text-sm text-neutral-600 leading-relaxed">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="flex flex-wrap gap-3 mt-6">
                  {status === 'authenticated' && hasActiveSip && !myGroup ? (
                    <button onClick={() => setCreateGroupOpen(true)} className={primaryBtn}>
                      Start a group <ArrowRightIcon size={16} />
                    </button>
                  ) : myGroup ? (
                    <button onClick={() => router.push(`/travel-pass/group/${myGroup.groupId}`)} className={primaryBtn}>
                      Open my group <ArrowRightIcon size={16} />
                    </button>
                  ) : showPlans && (
                    <a href="#plans" className={primaryBtn}>
                      Pick a plan to start <ArrowRightIcon size={16} />
                    </a>
                  )}
                  {!myGroup && !hasBlockingSip && (
                    <button onClick={handleJoinClick} className={secondaryBtn}>
                      <LinkSimpleIcon size={18} /> I have a group code
                    </button>
                  )}
                </div>
              </div>

              {/* Illustrative group card — no real data */}
              <div className="rounded-3xl bg-white p-6 shadow-sm flex flex-col gap-5 md:-rotate-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-neutral-400">Example group</p>
                    <p className="font-semibold text-neutral-900">Goa Gang 🌴</p>
                  </div>
                  <span className="rounded-full bg-[#F4F4F4] px-3 py-1.5 font-mono text-sm tracking-widest text-neutral-800">GOA24X</span>
                </div>
                <div className="flex items-center">
                  {['A', 'R', 'S', 'P', 'K'].map((initial, i) => (
                    <span
                      key={initial}
                      className={`-ml-2 first:ml-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-sm font-medium text-neutral-900 ${
                        i % 2 ? 'bg-[#D0EF65]' : 'bg-[#EEA0FF]'
                      }`}
                    >
                      {initial}
                    </span>
                  ))}
                  <span className="ml-3 text-sm text-neutral-500">5 friends, one plan</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {[['You', 72], ['Rhea', 72], ['Sam', 64]].map(([name, pct]) => (
                    <div key={name} className="flex items-center gap-3 text-sm">
                      <span className="w-12 text-neutral-600">{name}</span>
                      <div className="flex-1 h-2 rounded-full bg-neutral-100">
                        <div className="h-2 rounded-full bg-[#EEA0FF]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-[#FFF9F4] px-4 py-3 text-sm text-neutral-600">
                  Everyone&apos;s on the same schedule — the trip happens when the group&apos;s ready.
                </div>
              </div>
            </div>
          </section>

          {/* ── Why ──────────────────────────────────────────────── */}
          <section>
            <SectionTitle
              title={<>Trips rarely get cancelled. <Highlight>They get postponed.</Highlight></>}
              subtitle="Usually because the money went somewhere else first. Travel Pass fixes that."
            />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-[#D9D9D9] bg-white p-6">
                <p className="font-medium text-neutral-500 mb-4">Saving on your own</p>
                <ul className="flex flex-col gap-4">
                  {COMPARISON.map((row) => (
                    <li key={row.alone} className="flex gap-3 text-neutral-500">
                      <XCircleIcon size={22} className="shrink-0 text-neutral-300" />
                      {row.alone}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-[#EEA0FF] p-6">
                <p className="font-semibold text-neutral-900 mb-4">With Travel Pass</p>
                <ul className="flex flex-col gap-4">
                  {COMPARISON.map((row) => (
                    <li key={row.pass} className="flex gap-3 text-neutral-900">
                      <CheckCircleIcon size={22} weight="fill" className="shrink-0 text-white" />
                      {row.pass}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Where it takes you ───────────────────────────────── */}
          <section>
            <div className="md:hidden">
              <ExploreByDestination
                variant="mobile"
                title="Where your pass can take you"
                subtitle="Spend your Wondrr Cash on group trips across these destinations."
              />
            </div>
            <div className="hidden md:block">
              <ExploreByDestination
                variant="desktop"
                title="Where your pass can take you"
                subtitle="Spend your Wondrr Cash on group trips across these destinations."
              />
            </div>
          </section>

          {status === 'authenticated' && !subsLoading && pastSips.length > 0 && (
            <section>
              <SectionTitle title="Past Travel Passes" />
              <div className="grid md:grid-cols-2 gap-4 opacity-80">
                {pastSips.map(renderSipCard)}
              </div>
            </section>
          )}

          {/* ── FAQ ──────────────────────────────────────────────── */}
          <section className="md:w-[80%] md:mx-auto w-full">
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

          {/* ── Closing CTA ──────────────────────────────────────── */}
          {showPlans && plans.length > 0 && (
            <section className="relative overflow-hidden rounded-3xl bg-[#D0EF65] px-6 py-10 md:px-14 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <AirplaneTiltIcon size={220} weight="thin" className="absolute -right-8 -bottom-12 text-neutral-900/10 pointer-events-none" />
              <div className="relative">
                <h2 className="text-[28px] md:text-[40px] font-semibold tracking-tight leading-[1.15] text-neutral-900 font-['Satoshi']">
                  The trip won&apos;t plan itself.
                  <br />
                  The saving can.
                </h2>
                <p className="text-neutral-700 mt-2">Set it up once — takes about a minute.</p>
              </div>
              <a href="#plans" className={`relative whitespace-nowrap ${primaryBtn}`}>
                Start my Travel Pass <ArrowRightIcon size={16} />
              </a>
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
