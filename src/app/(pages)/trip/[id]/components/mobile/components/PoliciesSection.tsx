'use client'

import { PoliciesSectionProps } from '../types';
import { STATIC_CANCELLATION_POLICY, STATIC_REFUND_POLICY } from '../constants';

export function CancellationPolicySection({ cancellationPolicy }: Pick<PoliciesSectionProps, 'cancellationPolicy'>) {
    const tiers = cancellationPolicy?.refundTiers?.length
        ? cancellationPolicy.refundTiers
        : STATIC_CANCELLATION_POLICY;


    return (
        <div className="bg-[#FFEAB2] border border-[#D9D9D9] rounded-[16px] p-4 mt-6 scroll-mt-24">
            <p className="text-md font-medium text-black mb-4">Cancellation Policy</p>
            <div className="space-y-2">
                {tiers.map((policy, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-yellow-200 last:border-b-0">
                        <p className="text-sm text-gray-800">{policy.daysBeforeCancellation} days before the trip</p>
                        <p className="text-sm font-bold text-gray-900">{policy.refundPercentage} %</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function RefundPolicySection({ refundPolicy }: Pick<PoliciesSectionProps, 'refundPolicy'>) {
    const policy = refundPolicy || STATIC_REFUND_POLICY;

    return (
        <div className="bg-yellow-100 border border-yellow-200 rounded-[16px] p-4 mt-6 scroll-mt-24">
            <p className="text-md font-medium text-black mb-3">Refund Policy</p>
            <div className="space-y-3">
                <p className="text-sm text-gray-800">{policy.description}</p>
                <div className="space-y-2">
                    {policy.terms.map((term, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <span className="text-sm font-bold text-gray-800 mt-0.5">•</span>
                            <p className="text-sm text-gray-800">{term}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
