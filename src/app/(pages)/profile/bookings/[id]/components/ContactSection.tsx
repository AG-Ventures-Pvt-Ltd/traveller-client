import React from 'react';
import { Phone, User } from 'lucide-react';

interface ContactInfo {
  emergencyName: string;
  emergencyPhone: string;
}

interface ContactSectionProps {
  contact: ContactInfo;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Emergency Contact */}
      <div className="px-4 pt-4 pb-3 bg-neutral-50 rounded-xl flex flex-col gap-3">
        <p className="text-neutral-900 text-sm font-bold font-['Satoshi']">Emergency Contact</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-neutral-700" />
            <div className="flex flex-col">
              <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">Name</p>
              <p className="text-neutral-900 text-xs font-bold font-['Satoshi']">{contact.emergencyName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-neutral-700" />
            <div className="flex flex-col">
              <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">Phone</p>
              <p className="text-neutral-900 text-xs font-bold font-['Satoshi']">{contact.emergencyPhone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
