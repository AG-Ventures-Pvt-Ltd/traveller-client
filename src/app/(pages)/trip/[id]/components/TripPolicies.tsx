import { FileText, ShieldCheck } from "lucide-react";
import { TripPoliciesProps } from '../types';
import Card from "@/common/ui/Card";


export function TripPolicies({

  cancellationRules = [
    { timing: "More than 7 days before", refund: "100% refund" },
    { timing: "3-7 days before", refund: "50% refund" },
    { timing: "Less than 3 days before", refund: "No refund" },
    { timing: "No-show", refund: "No refund" },
  ],
  refundTerms = [
    { text: "Cancellation must be made through our booking system" },
    { text: "Refunds will be issued to the original payment method" },
    { text: "Service fees may not be refundable" },
    { text: "Weather-related cancellations by operator receive full refund" },
  ],

  refundProcessingTime = "Refunds are processed within 5-7 business days after cancellation approval.",

}: TripPoliciesProps) {
  return (
    <div className="flex flex-col gap-6 my-8">
      <h2 className="text-xl font-bold text-[#0F172B] tracking-tight mb-0">Policies</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#0F172B]" />
            <h3 className="text-base font-bold text-[#0F172B] leading-6">
              Cancellation Policy
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            {cancellationRules.map((rule, index) => (
              <div
                key={index}
                className={`flex justify-between items-center py-2 ${
                  index !== cancellationRules.length - 1
                    ? "border-b border-[#E2E8F0]"
                    : ""
                }`}
              >
                <span className="text-sm text-[#334155] leading-5">
                  {rule.timing}
                </span>
                <span className="text-sm font-medium text-[#0F172B] leading-5">
                  {rule.refund}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#0F172B]" />
            <h3 className="text-base font-bold text-[#0F172B] leading-6">Refund Policy</h3>
          </div>
          <p className="text-sm text-[#334155] leading-6">
            {refundProcessingTime}
          </p>
          <div className="flex flex-col gap-2">
            {refundTerms.map((term, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0F172B] mt-2 flex-shrink-0" />
                <span className="text-sm text-[#334155] leading-5">
                  {term.text}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
