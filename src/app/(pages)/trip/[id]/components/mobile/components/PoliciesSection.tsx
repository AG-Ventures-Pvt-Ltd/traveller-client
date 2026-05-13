'use client'

import { PoliciesSectionProps } from '../types';
import { STATIC_CANCELLATION_POLICY } from '../constants';
import CollapsibleCard from '@/common/ui/CollapsibleCard';


export function CancellationPolicySection({ cancellationPolicy }: Pick<PoliciesSectionProps, 'cancellationPolicy'>) {
    const tiers = cancellationPolicy?.refundTiers?.length
        ? cancellationPolicy.refundTiers
        : STATIC_CANCELLATION_POLICY;


    return (
        <CollapsibleCard title='Cancellation Policy' className="bg-[#FFEAB2] border border-[#D9D9D9] rounded-[16px] mt-6 scroll-mt-24">
            <div className="space-y-2 px-4 pb-4">
                {tiers.map((policy, index) => (
                    <div key={index} className="flex items-start justify-between py-2 border-b border-yellow-200 last:border-b-0">
                        <p className="text-sm text-gray-800 flex-1 mr-4">{policy.daysBeforeCancellation} days before the trip</p>
                        <p className="text-sm font-bold text-gray-900 flex-shrink-0">{policy.refundPercentage} %</p>
                    </div>
                ))}
            </div>
        </CollapsibleCard>
    );
}
