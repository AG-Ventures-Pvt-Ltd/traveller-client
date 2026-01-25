import React from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentDetails {
  tripPrice: number;
  // total: number;
  paymentMethod: string;
  gatewayTransactionId:string;
}

interface PaymentSummaryProps {
  payment: PaymentDetails;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ payment }) => {
  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 md:p-8 flex flex-col gap-6 sticky top-6">
      <h2 className="text-neutral-900 text-xl font-bold font-['Satoshi']">Payment Summary</h2>
      
      <div className="flex flex-col gap-4">

        {/* Total */}
        {/* <div className="flex justify-between items-center">
          <span className="text-neutral-900 text-base font-bold font-['Satoshi']">
            Total
          </span>
          <span className="text-neutral-900 text-2xl font-bold font-['Satoshi'] flex items-center">
            <IndianRupee className="w-5 h-5" />
            {payment.total.toLocaleString()}
          </span>
        </div> */}

        {/* Payment Method */}
        <div className="mt-2 px-4 pt-3 pb-2 bg-neutral-50 rounded-xl">
          <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">Payment Method</p>
          <div className="flex items-center gap-2 mt-1">
            <CreditCard className="w-4 h-4 text-neutral-900" />
            <p className="text-neutral-900 text-sm font-bold font-['Satoshi']">{payment.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
