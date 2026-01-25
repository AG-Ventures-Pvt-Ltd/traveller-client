'use client';

import React from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

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
        return <Mail className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'location':
        return <MapPin className="w-4 h-4" />;
      case 'calendar':
        return <Calendar className="w-4 h-4" />;
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