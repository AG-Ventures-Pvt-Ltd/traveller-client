import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  number?: string;
  icon?: LucideIcon;
  title: string;
  useNumberBadge?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  number, 
  icon: Icon,
  title,
  useNumberBadge = true
}) => {
  return (
    <div className="flex items-center gap-3">
      {useNumberBadge && number ? (
        <div className="w-8 h-8 bg-neutral-900 rounded-full flex justify-center items-center flex-shrink-0">
          <span className="text-white text-sm font-bold font-['Satoshi']">{number}</span>
        </div>
      ) : Icon ? (
        <Icon className="w-6 h-6 text-neutral-900" />
      ) : null}
      <h2 className="text-neutral-900 text-xl font-bold font-['Satoshi']">{title}</h2>
    </div>
  );
};

export default SectionHeader;
