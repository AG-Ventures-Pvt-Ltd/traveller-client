export interface SipCadenceAmounts {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface SipPlan {
  _id: string;
  name: string;
  description?: string;
  targetAmount: number;
  totalPayout: number;
  bonusAmount: number;
  cadenceAmounts: SipCadenceAmounts;
}

export interface SipSubscription {
  _id: string;
  planId: { _id: string; name: string; description?: string } | string;
  installmentAmount: number;
  cadence: 'daily' | 'weekly' | 'monthly';
  status: 'pending_auth' | 'active' | 'completed' | 'cancelled' | 'failed_auth';
  gateway: 'razorpay' | 'cashfree';
  cumulativePaidAmount: number;
  installmentsPaidCount: number;
  planSnapshot: { targetAmount: number; totalPayout: number };
  nextScheduleDate?: string;
  startDate?: string;
  completedAt?: string;
  cancelledAt?: string;
}

export interface UpfrontCheckoutHandle {
  orderId: string;
  paymentSessionId: string | null;
  amount: number;
  installments: number;
}

export interface SubscribeResponse {
  subscriptionDocId: string;
  gateway: 'razorpay' | 'cashfree';
  gatewaySubscriptionId: string;
  subscriptionSessionId: string | null;
  upfront: UpfrontCheckoutHandle | null;
}

// ─── Groups ─────────────────────────────────────────────────────────────────

export type SipGroupMemberStatus = 'invited' | 'joined' | 'subscribed' | 'cancelled' | 'left';

export interface SipGroupSummary {
  groupId: string;
  name: string;
  status: 'active' | 'archived';
  myRole: 'admin' | 'member';
  myStatus: SipGroupMemberStatus;
  memberCount: number;
  groupTotalContributed: number;
  joinClosesAt: string;
}

export interface SipGroupMemberRow {
  memberId: string;
  name: string;
  role: 'admin' | 'member';
  status: SipGroupMemberStatus;
  dayJoined: number;
  upfrontAmount: number;
  subscriptionStatus?: string;
  contributed: number;
  installmentsPaidCount: number;
}

export interface SipGroupDetail {
  groupName: string;
  groupId: string;
  joinCode: string;
  joinUrl: string;
  status: 'active' | 'archived';
  cadence: 'daily' | 'weekly' | 'monthly';
  installmentAmount: number;
  startDate: string;
  joinClosesAt: string;
  plan: { name: string; targetAmount: number; totalPayout: number; bonusAmount: number };
  groupTotalContributed: number;
  groupTargetTotal: number;
  myRole: 'admin' | 'member';
  myStatus: SipGroupMemberStatus;
  members: SipGroupMemberRow[];
}

export interface SipGroupJoinPreview {
  groupId: string;
  groupName: string;
  cadence: 'daily' | 'weekly' | 'monthly';
  installmentAmount: number;
  plan: { name: string; targetAmount: number; totalPayout: number; bonusAmount: number };
  daysElapsed: number;
  joinClosesAt: string;
  joinWindowClosed: boolean;
  upfrontAmount: number;
  upfrontInstallments: number;
  alreadyMember: boolean;
  hasActiveSip: boolean;
}

export interface PaymentConfig {
  gateway: 'razorpay' | 'cashfree';
  // Independent from `gateway` — SIP subscriptions can run on a different
  // gateway than one-time bookings/wallet top-ups.
  subscriptionGateway: 'razorpay' | 'cashfree';
  razorpayKeyId?: string;
  cashfreeMode?: 'sandbox' | 'production';
}
