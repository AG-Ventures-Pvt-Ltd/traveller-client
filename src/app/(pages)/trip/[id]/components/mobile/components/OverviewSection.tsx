'use client'

import { OverviewSectionProps } from '../types';
import { OVERVIEW_PREVIEW_LENGTH } from '../constants';

export default function OverviewSection({ description, expanded, onToggle }: OverviewSectionProps) {
    return (
        <div className="bg-[#ededed] border border-[#dcdcdc] rounded-[16px] p-4">
            <p className="text-md font-medium text-black mb-2">Overview</p>
            <p className="text-base mb-2 leading-relaxed">
                {expanded ? description : `${description?.slice(0, OVERVIEW_PREVIEW_LENGTH)}...`}
            </p>
            <button
                onClick={onToggle}
                className="text-blue-500 hover:text-blue-600 text-xs font-medium underline transition-colors"
            >
                {expanded ? 'see less' : 'see more'}
            </button>
        </div>
    );
}
