import type { SipPlan } from './types'

export const bonusPct = (plan: SipPlan) => Math.round((plan.bonusAmount / plan.targetAmount) * 100)

// Headline numbers for marketing copy (landing banner + page hero). Weekly is
// used for "from ₹X" because Daily isn't offered on the Razorpay gateway.
export const getPlanHighlights = (plans: SipPlan[]) =>
  plans.length === 0
    ? null
    : {
        maxBonusPct: Math.max(...plans.map(bonusPct)),
        minWeekly: Math.min(...plans.map((p) => p.cadenceAmounts.weekly)),
        // Plan with the best bonus % — the one we showcase on the ticket visual.
        featured: plans.reduce((a, b) => (bonusPct(b) > bonusPct(a) ? b : a)),
      }

/**
 * Plain-text FAQ reused by both the on-page accordion (page.tsx) and the
 * FAQPage JSON-LD in layout.tsx. Answers are kept factual to how Travel Pass
 * actually works (mechanics pulled from SubscribeSipModal/CancelSipModal/
 * CreateGroupModal) so the page reads as a citable, trustworthy reference.
 */
export const SIP_FAQS = [
  {
    q: 'What is Travel Pass?',
    a: 'Travel Pass is a recurring auto-pay you set up toward a future trip. Every installment — daily, weekly or monthly — is credited to your Wondrr Cash wallet immediately, and hitting your target unlocks a bonus on top.',
  },
  {
    q: 'How does the completion bonus work?',
    a: "Each plan has a fixed target amount and a bonus. The bonus is credited to your Wondrr Cash wallet only once you've paid the full target amount through your installments — it is not paid out if the Travel Pass is cancelled early.",
  },
  {
    q: 'Can I choose how often I pay?',
    a: 'Yes. Depending on the plan, you can auto-pay daily, weekly or monthly. The amount per installment is fixed for the cadence you pick when you subscribe.',
  },
  {
    q: 'What happens if I cancel my Travel Pass?',
    a: "Cancelling stops all future installments immediately and can't be undone or resumed. If you haven't reached your target yet, the completion bonus is not credited — but everything you've already paid stays in your Wondrr Cash wallet.",
  },
  {
    q: 'Can I have more than one active Travel Pass?',
    a: "No, only one Travel Pass can be active at a time. Once your current one is completed or cancelled, you're free to start a new one.",
  },
  {
    q: 'How do Travel Pass groups work?',
    a: 'Once you have an active Travel Pass, you can start a group and share a 6-character join code with friends. Anyone who joins within the 7-day window subscribes on the same plan, cadence and installment amount as you.',
  },
  {
    q: 'Is my Wondrr Cash the same as real money?',
    a: 'Wondrr Cash is a wallet balance credited from your Travel Pass installments and bonus, redeemable toward bookings on Wondrr — it is not a bank deposit or investment product.',
  },
]
