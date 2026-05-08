'use client'

import { CaretDownIcon } from '@phosphor-icons/react';
import { FAQ } from '../../../types';
import { FAQsSectionProps } from '../types';
import CollapsibleCard from '@/common/ui/CollapsibleCard';


export default function FAQsSection({ faqs, expandedFaqs, onToggle }: FAQsSectionProps) {
    return (
        <CollapsibleCard className="border border-[#e0e0e0] rounded-[16px] mt-6 scroll-mt-24" title='FAQs'>
            <div className="space-y-2 px-4">
                {faqs.map((faq: FAQ, index: number) => (
                    <div key={index} className="border border-[#d9d9d9] rounded-[12px] overflow-hidden">
                        <button
                            onClick={() => onToggle(index)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                            <p className="text-sm text-black font-medium text-left">
                                {faq.question || 'Question for FAQ ?'}
                            </p>
                            <CaretDownIcon
                                size={20}
                                weight="thin"
                                className={`text-black flex-shrink-0 transition-transform ${
                                    expandedFaqs[index] ? 'transform rotate-180' : ''
                                }`}
                            />
                        </button>
                        {expandedFaqs[index] && (
                            <div className="px-4 pb-3">
                                <p className="text-sm text-gray-700">{faq.answer || ''}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </CollapsibleCard>
    );
}
