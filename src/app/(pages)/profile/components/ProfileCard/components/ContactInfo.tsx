'use client';

import React from 'react';
import ContactItem from './ContactItem';

interface ContactInfoProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ name, email, phone, address, memberSince }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ContactItem label="Full Name" value={name} iconType="email" />
      <ContactItem label="Email" value={email} iconType="email" />
      <ContactItem label="Phone" value={phone} iconType="phone" />
      <ContactItem label="Location" value={address} iconType="location" />
      <ContactItem label="Member Since" value={memberSince} iconType="calendar" />
    </div>
  );
};

export default ContactInfo;