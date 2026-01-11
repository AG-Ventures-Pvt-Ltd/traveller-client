import React from 'react';

interface InfoBoxProps {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 flex gap-4">
    <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="flex flex-col gap-1">
      <p className="text-xs font-bold text-neutral-700">{label}</p>
      <p className="text-base font-bold text-neutral-900">{value}</p>
    </div>
  </div>
);

export default InfoBox;