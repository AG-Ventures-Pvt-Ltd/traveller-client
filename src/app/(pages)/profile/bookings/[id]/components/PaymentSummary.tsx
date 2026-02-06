import React from 'react';
import { CreditCard, IndianRupee } from 'lucide-react';

interface PaymentDetails {
  tripPrice: number;
  status: string;
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
        <div className={`mt-2 px-4 pt-3 pb-2 rounded-xl ${
          payment.status === 'pending' || payment.status === 'failed' 
            ? 'bg-yellow-50 border border-yellow-200' 
            : 'bg-green-50 border border-green-200'
        }`}>
          <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">Payment Status</p>
          <p className={`text-sm font-bold font-['Satoshi'] mt-1 ${
            payment.status === 'pending' || payment.status === 'failed' 
              ? 'text-yellow-700' 
              : 'text-green-700'
          }`}>
            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
          </p>
        </div>

        <div className="mt-2 px-4 pt-3 pb-2 bg-neutral-50 rounded-xl">
          <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">Payment Method</p>
          <div className="flex items-center gap-2 mt-1">
            <CreditCard className="w-4 h-4 text-neutral-900" />
            <p className="text-neutral-900 text-sm font-bold font-['Satoshi']">{payment.paymentMethod}</p>
          </div>
        </div>

        {payment.status === 'completed' && (
          <div className="mt-2 px-4 pt-3 pb-2 bg-neutral-50 rounded-xl">
            <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">Total Paid</p>
            <div className="flex items-center gap-1 mt-1">
              <IndianRupee className="w-4 h-4 text-neutral-900" />
              <p className="text-neutral-900 text-sm font-bold font-['Satoshi']">{payment.tripPrice.toLocaleString()}</p>
            </div>
          </div>
        )}

        <div className="mt-2 px-4 pt-3 pb-2 bg-neutral-50 rounded-xl">
          <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">Payment ID</p>
          <p className="text-neutral-900 text-sm font-bold font-['Satoshi'] mt-1 break-all">{payment.gatewayTransactionId}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
