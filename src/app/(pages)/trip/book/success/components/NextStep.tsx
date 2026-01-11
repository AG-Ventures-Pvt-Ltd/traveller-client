import React from 'react';

interface NextStepProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  iconBg?: string;
}

const NextStep: React.FC<NextStepProps> = ({
  icon: Icon,
  title,
  description,
  iconBg = 'bg-green-700'
}) => (
  <div className="flex gap-4">
    <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="flex flex-col gap-1.5">
      <h3 className="text-base font-bold text-neutral-900">{title}</h3>
      <p className="text-base font-medium text-neutral-700 leading-5">{description}</p>
    </div>
  </div>
);

export default NextStep;