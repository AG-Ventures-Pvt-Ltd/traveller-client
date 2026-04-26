'use client'

import { Check, X } from 'lucide-react';
import { InclusionsSectionProps } from '../types';

export default function InclusionsSection({ inclusions, exclusions }: InclusionsSectionProps) {
    return (
        <div className="border border-[#d9d9d9] rounded-[16px] p-4 mt-6 scroll-mt-24">
            <p className="text-md font-medium text-black mb-6">Inclusions & Exclusions</p>

            {inclusions && inclusions.length > 0 && (
                <div className="mb-4">
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
                <div className="space-y-2">
                    {exclusions.map((item, index) => (
                        <div key={`exclusion-${index}`} className="flex items-start gap-2">
                            <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{item}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
