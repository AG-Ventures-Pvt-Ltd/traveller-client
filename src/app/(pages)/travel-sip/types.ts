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

export interface SubscribeResponse {
  subscriptionDocId: string;
  gateway: 'razorpay' | 'cashfree';
  gatewaySubscriptionId: string;
  subscriptionSessionId: string | null;
}

export interface PaymentConfig {
  gateway: 'razorpay' | 'cashfree';
  razorpayKeyId?: string;
  cashfreeMode?: 'sandbox' | 'production';
}
