'use client'

import { TabNavigationProps } from '../types';

export default function TabNavigation({ sections, activeSection, onSectionClick }: TabNavigationProps) {
    return (
        <div className="sticky top-0 z-20 bg-[#fff9f4] pt-4 px-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => onSectionClick(section.id)}
                        className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
                            activeSection === section.id
                                ? 'bg-yellow-400 text-black'
                                : 'border border-yellow-400 text-black hover:bg-yellow-50'
                        }`}
                    >
                        {section.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
