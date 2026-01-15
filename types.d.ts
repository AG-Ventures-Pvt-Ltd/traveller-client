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
  amount: number;
  currency: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
}

interface RazorpayInstance {
  open: () => void;
}
