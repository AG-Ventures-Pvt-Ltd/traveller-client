'use client';

import React from 'react';

interface ContactItemProps {
  label: string;
  value: string;
  iconType: 'email' | 'phone' | 'location' | 'calendar';
  className?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ label, value, iconType, className = '' }) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'email':
        return (
          <div className="w-4 h-4 relative overflow-hidden">
            <div className="w-3.5 h-1 left-[1.50px] top-[5.25px] absolute outline outline-offset-[-0.75px] outline-subtext" />
            <div className="w-3.5 h-3 left-[1.50px] top-[3px] absolute outline outline-offset-[-0.75px] outline-subtext" />
          </div>
        );
      case 'phone':
        return (
          <div className="w-4 h-4 relative overflow-hidden">
            <div className="w-3.5 h-3.5 left-[1.50px] top-[1.50px] absolute outline outline-offset-[-0.75px] outline-subtext" />
          </div>
        );
      case 'location':
        return (
          <div className="w-4 h-4 relative overflow-hidden">
            <div className="w-3 h-3.5 left-[3px] top-[1.50px] absolute outline outline-offset-[-0.75px] outline-subtext" />
            <div className="w-1 h-1 left-[6.75px] top-[5.25px] absolute outline outline-offset-[-0.75px] outline-subtext" />
          </div>
        );
      case 'calendar':
        return (
          <div className="w-4 h-4 relative overflow-hidden">
            <div className="w-0 h-[3px] left-[6px] top-[1.50px] absolute outline outline-offset-[-0.75px] outline-subtext" />
            <div className="w-0 h-[3px] left-[12px] top-[1.50px] absolute outline outline-offset-[-0.75px] outline-subtext" />
            <div className="w-3.5 h-3.5 left-[2.25px] top-[3px] absolute outline outline-offset-[-0.75px] outline-subtext" />
            <div className="w-3.5 h-0 left-[2.25px] top-[7.50px] absolute outline outline-offset-[-0.75px] outline-subtext" />
          </div>
        );
      default:
        return null;
    }
  };

  const isNotAdded = value === 'Not added yet';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center flex-shrink-0">
        {renderIcon()}
      </div>
      <div className="flex flex-col">
        <span className="text-subtext text-xs font-medium font-['Satoshi'] leading-4">
          {label}
        </span>
        <span className={`text-sm font-bold font-['Satoshi'] leading-5 ${ isNotAdded ? 'text-gray-400 italic font-medium' : 'text-maintext'}`}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default ContactItem;