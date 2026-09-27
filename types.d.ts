import { Connection } from "mongoose";

declare global {
  var mongoose: {
    connection: Connection | null;
    promise: Promise<Connection> | null;
  };
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

declare module "next-auth" {
  interface User {
    _id?: string;
    fullName: string;
    type : "Traveler" | "Host"
  }
  interface Session {
    user?: {
      id: string;
      email: string;
      fullName?: string;
      type?:string;
      avatar?:string
    };
  }
}

interface RazorpayOptions {
  key: string;
  amount?: number;
  currency?: string;
  // One-time checkout uses order_id; SIP auto-pay setup uses subscription_id
  // (Razorpay's own mechanism for authorizing a recurring mandate via the
  // same embedded widget) — exactly one of the two is passed per call.
  order_id?: string;
  subscription_id?: string;
  name?: string;
  description?: string;
  theme?: { color?: string };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
    razorpay_subscription_id?: string;
  }) => void;
}

interface RazorpayInstance {
  open: () => void;
}
