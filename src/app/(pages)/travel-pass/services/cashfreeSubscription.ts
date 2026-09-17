'use client'

import { load as loadCashfree } from "@cashfreepayments/cashfree-js";

// Cashfree's subscriptionsCheckout() promise resolves once the hosted page
// redirects back, regardless of outcome — the real status is confirmed
// server-side via the webhook-driven SIP status, same pattern as the
// one-time checkout() flow in trip booking.
export const openCashfreeSubscription = async (
  subscriptionSessionId: string,
  cashfreeMode: 'sandbox' | 'production',
  onComplete: (subscriptionSessionId: string) => void,
) => {
  const cashfree = await loadCashfree({ mode: cashfreeMode });

  await cashfree.subscriptionsCheckout({
    subsSessionId: subscriptionSessionId,
    redirectTarget: '_self',
  });

  onComplete(subscriptionSessionId);
};
