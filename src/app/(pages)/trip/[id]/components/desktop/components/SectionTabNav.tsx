import { NavSection } from '../../types';
import { TAB_NAV_TOP } from '../../constants';

export interface SectionTabNavProps {
    sections: NavSection[];
    activeSection: string;
    onSectionClick: (sectionId: string) => void;
}

export default function SectionTabNav({ sections, activeSection, onSectionClick }: SectionTabNavProps) {
    return (
        <div className="sticky z-30 bg-[#FCF3EB]/95 backdrop-blur border-b-2 border-[#efe7dd] mt-3" style={{ top: `${TAB_NAV_TOP}px` }}>
            <div className="mx-auto px-16 py-3">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => onSectionClick(section.id)}
                            className={`px-4 py-1.5 rounded-full font-bold whitespace-nowrap transition-all text-sm ${activeSection === section.id
                                ? 'bg-yellow-400 text-black'
                                : 'border-2 border-yellow-400 text-black hover:bg-yellow-50'
                                }`}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
