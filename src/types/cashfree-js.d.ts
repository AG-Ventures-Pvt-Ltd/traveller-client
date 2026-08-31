// @cashfreepayments/cashfree-js ships no types of its own.
declare module "@cashfreepayments/cashfree-js" {
  interface CashfreeCheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: "_self" | "_blank" | "_modal" | HTMLElement;
  }
  interface CashfreeCheckoutResult {
    error?: { message?: string; [key: string]: unknown };
    redirect?: boolean;
    paymentDetails?: { paymentMessage?: string; [key: string]: unknown };
  }
  interface CashfreeSubscriptionsCheckoutOptions {
    subsSessionId: string;
    redirectTarget?: "_self" | "_blank" | "_modal" | HTMLElement;
  }
  interface CashfreeInstance {
    checkout: (options: CashfreeCheckoutOptions) => Promise<CashfreeCheckoutResult>;
    subscriptionsCheckout: (options: CashfreeSubscriptionsCheckoutOptions) => Promise<CashfreeCheckoutResult>;
  }
  export function load(config: { mode: "sandbox" | "production" }): Promise<CashfreeInstance>;
}
