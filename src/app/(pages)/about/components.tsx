import { CircleCheckBig } from 'lucide-react';
import React from 'react';

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ProblemCard({ icon, title, description }: ProblemCardProps) {
  return (
    <div className="bg-yellow-50 rounded-3xl outline-2 outline-offset-[-1.84px] outline-orange-600/20 p-8">
      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex justify-center items-center mb-4">
        <div className="w-8 h-8 relative overflow-hidden">{icon}</div>
      </div>
      <div className="text-neutral-900 text-2xl font-bold font-['Satoshi'] leading-9 mb-4">{title}</div>
      <div className="text-neutral-700 text-base font-medium font-['Satoshi'] leading-6">{description}</div>
    </div>
  );
}

interface ApproachCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ApproachCard({ icon, title, description }: ApproachCardProps) {
  return (
    <div className="bg-white rounded-3xl outline-2 outline-offset-[-1.84px] outline-gray-200 p-8">
      <div className="w-14 h-14 bg-neutral-900 rounded-xl flex justify-center items-center mb-4">
        <div className="w-7 h-7 flex items-center justify-center text-white">{icon}</div>
      </div>
      <div className="text-neutral-900 text-lg font-bold font-['Satoshi'] leading-7 mb-4">{title}</div>
      <div className="text-neutral-700 text-base font-medium font-['Satoshi'] leading-5">{description}</div>
    </div>
  );
}

interface UserCardProps {
  title: string;
  description: string;
  features: string[];
  bg: string;
  textColor: string;
  icon: React.ReactNode;
}

export function UserCard({ title, description, features, bg, textColor,icon }: UserCardProps) {
  return (
    <div className={`${bg} rounded-3xl outline-2 outline-offset-[-1.84px] outline-neutral-900 p-8 flex-1`}>
      <div className={`w-16 h-16 text-white bg-black rounded-2xl flex justify-center items-center mb-4`}>
        {icon}
      </div>
      <div className={`${textColor} text-3xl font-bold font-['Satoshi'] leading-[48px] mb-4`}>{title}</div>
      <div className={`${textColor}/80 text-base font-medium font-['Satoshi'] leading-6 mb-8`}>{description}</div>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-0.5">
              <CircleCheckBig size={18}/>
            </div>
            <div className={`${textColor}/90 text-base font-medium font-['Satoshi'] leading-5`}>{feature}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PrincipleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function PrincipleCard({ icon, title, description }: PrincipleCardProps) {
  return (
    <div className="bg-white rounded-3xl outline-2 outline-offset-[-1.84px] outline-gray-200 p-10">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 bg-neutral-900 rounded-xl flex justify-center items-center">
          <div className="w-6 h-6 flex items-center justify-center text-white">{icon}</div>
        </div>
        <div className="text-neutral-900 text-2xl font-bold font-['Satoshi'] leading-9">{title}</div>
      </div>
      <div className="text-neutral-700 text-base font-medium font-['Satoshi'] leading-6">{description}</div>
    </div>
  );
}
