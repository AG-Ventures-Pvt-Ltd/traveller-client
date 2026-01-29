import { Gift, Users, Calendar, Award, Shield, AlertTriangle } from 'lucide-react'

export const REFERRAL_POLICY_SECTIONS = [
    { id: 'overview', title: 'Overview', icon: Gift },
    { id: 'definitions', title: 'Definitions', icon: Users },
    { id: 'eligibility', title: 'Eligibility', icon: Shield },
    { id: 'benefits', title: 'Referral Benefits', icon: Award },
    { id: 'criteria', title: 'Success Criteria', icon: AlertTriangle },
    { id: 'timewindow', title: 'Time Window', icon: Calendar },
    { id: 'reward', title: 'Reward Structure', icon: Gift },
    { id: 'redemption', title: 'Redemption & Cooldown', icon: Calendar },
    { id: 'verification', title: 'Verification & Anti-Fraud', icon: Shield },
    { id: 'processing', title: 'Processing', icon: Award },
    { id: 'transferability', title: 'Non-Transferability', icon: AlertTriangle },
    { id: 'fraud', title: 'Fraud & Disqualification', icon: Shield },
    { id: 'modification', title: 'Modification', icon: AlertTriangle },
]

export const REFERRAL_POLICY_CONTENT = {
    lastUpdated: "January 29, 2026",
    title: "Referral Program – Terms & Conditions",
    overview: {
        description: 'These Referral Program Terms & Conditions ("Terms") govern participation in the referral program ("Program") offered by the Company. By participating in the Program, the user agrees to be bound by these Terms.'
    },
    definitions: [
        {
            term: "Company",
            definition: "refers to the travel brand operating the Program."
        },
        {
            term: "User / Referrer",
            definition: "means a registered account holder participating in the Program."
        },
        {
            term: "Referred User",
            definition: "means a new customer who uses a valid referral code."
        },
        {
            term: "Successful Referral",
            definition: "means a referral code usage that results in a completed and non-cancelled booking, subject to verification."
        },
        {
            term: "Convenience Fee Waiver",
            definition: "means a 100% discount on the applicable convenience fee granted to the Referred User."
        },
        {
            term: "Reward",
            definition: "means the free trip benefit worth ₹5,999, subject to these Terms."
        }
    ],
    eligibility: {
        title: "Eligibility",
        items: [
            "Participation in the Program is available only to registered users with a valid account.",
            "Users are strictly prohibited from using their own referral code, directly or indirectly.",
            "Referred users must be first-time customers with no prior bookings or accounts with the Company.",
            "Only one referral benefit may be earned per referred user."
        ]
    },
    benefits: {
        title: "Referral Benefits to Referred Users",
        items: [
            'Each successful application of a referral code entitles the Referred User to a <strong>100% waiver of the applicable convenience fee</strong> on their booking.',
            "The convenience fee waiver is independent of and distinct from discount coupons and does not reduce the base trip price.",
            "The convenience fee waiver may not be combined with other offers unless expressly permitted by the Company."
        ]
    },
    criteria: {
        title: "Successful Referral Criteria",
        mainCondition: "A referral shall be deemed successful only when:",
        conditions: [
            "a valid referral code is applied at the time of booking,",
            "full payment is completed,",
            "the booking is not cancelled or refunded, and",
            "the trip is successfully completed."
        ],
        additionalItems: [
            "Cancelled, refunded, or reversed bookings shall not be counted as successful referrals.",
            "The number of travelers in a booking is irrelevant; only the number of times the referral code is successfully used will be considered.",
            "Each successful use of a referral code counts as one (1) referral."
        ]
    },
    timeWindow: {
        title: "Referral Time Window",
        highlight: "Important: 90-Day Rolling Period",
        items: [
            'To qualify for the Reward, the User must complete <strong>eight (8) successful referrals</strong> within a rolling period of <strong>ninety (90) days</strong>.',
            "Only successful referrals completed within the immediately preceding 90-day period shall be counted.",
            "Referrals falling outside this period shall automatically expire for reward eligibility."
        ]
    },
    reward: {
        title: "Reward Structure",
        items: [
            'Upon completion of eight (8) successful referrals within the defined period, the User shall become eligible for one (1) <strong>free trip valued at ₹5,999</strong>.',
            "The Reward has no cash value and cannot be exchanged for cash, credits, or alternative benefits.",
            "The Reward is applicable only on trips designated by the Company and is subject to availability and operational constraints."
        ]
    },
    redemption: {
        title: "Redemption Frequency, Cooldown & Annual Cap",
        highlight: "⚠️ Important Limits Apply",
        items: [
            'A User may redeem a referral Reward only <strong>once in any six (6) month period</strong>.',
            'A maximum of <strong>two (2) referral Rewards</strong> may be redeemed by a User in a single calendar year.',
            "Upon redemption of a Reward, no referral activity shall be counted toward a new reward for the next six (6) months from the date of redemption.",
            "Any referrals made during the cooldown period shall not be counted and shall lapse automatically."
        ]
    },
    verification: {
        title: "Verification & Anti-Fraud Measures",
        items: [
            "The Company reserves the right to conduct verification checks on both the Referrer and the Referred User to prevent fraudulent, fake, or dummy bookings.",
            "Verification may include identity verification, payment validation, booking behavior analysis, and manual review.",
            "If any booking is deemed non-genuine or abusive, the Company may disqualify the referral and revoke associated benefits."
        ]
    },
    processing: {
        title: "Redemption & Processing",
        items: [
            'Redemption of the Reward may take up to <strong>ninety (90) days</strong> from the date of the eighth successful referral.',
            "Reward redemption is subject to internal verification, operational feasibility, and business conditions determined solely by the Company.",
            "The Company does not guarantee immediate redemption and shall not be liable for delays within the stated timeframe."
        ]
    },
    transferability: {
        title: "Non-Transferability",
        items: [
            "The Reward may be redeemed only by the User who earned it.",
            'The Reward is strictly <strong>non-transferable</strong> and may not be shared, sold, gifted, or moved between accounts.',
            "Any attempt to transfer or misuse the Reward shall result in forfeiture."
        ]
    },
    fraud: {
        title: "Fraud, Abuse & Disqualification",
        highlight: "⚠️ Zero Tolerance Policy",
        items: [
            "Any misuse of the Program, including self-referrals, creation of multiple accounts, or manipulation, may result in immediate disqualification.",
            "The Company reserves the right to revoke referrals, rewards, and suspend or terminate accounts at its sole discretion."
        ]
    },
    modification: {
        title: "Modification or Termination",
        items: [
            "The Company reserves the right to modify, suspend, or terminate the Program or these Terms at any time without prior notice.",
            "Continued participation constitutes acceptance of the updated Terms."
        ]
    },
    footer: {
        title: "Questions?",
        content: "If you have any questions about our Referral Program, please contact us at",
        email: "support@wondrr.in"
    }
}
