'use client'

import { Check, X } from 'lucide-react';
import { InclusionsSectionProps } from '../types';
import CollapsibleCard from '@/common/ui/CollapsibleCard';


export default function InclusionsSection({ inclusions, exclusions }: InclusionsSectionProps) {
    return (
        <CollapsibleCard title='What’s Included ?' className="border border-[#d9d9d9] rounded-[16px] mt-6 scroll-mt-24">
            {inclusions && inclusions.length > 0 && (
                <div className="mb-4 px-4">
                    <div className="space-y-2">
                        {inclusions.map((item, index) => (
                            <div key={`inclusion-${index}`} className="flex items-start gap-2">
                                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {exclusions && exclusions.length > 0 && (
                <div className="space-y-2 px-4">
                    {exclusions.map((item, index) => (
                        <div key={`exclusion-${index}`} className="flex items-start gap-2">
                            <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{item}</span>
                        </div>
                    ))}
                </div>
            )}
        </CollapsibleCard>
    );
}
