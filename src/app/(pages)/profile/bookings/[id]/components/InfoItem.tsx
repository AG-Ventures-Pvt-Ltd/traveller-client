import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2.5">
    <div className="w-10 h-10 bg-neutral-50 rounded-full flex justify-center items-center flex-shrink-0">
      <Icon className="w-4 h-4 text-neutral-700" />
    </div>
    <div className="flex flex-col">
      <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">{label}</p>
      <p className="text-neutral-900 text-sm font-bold font-['Satoshi']">{value}</p>
    </div>
  </div>
);

export default InfoItem;
