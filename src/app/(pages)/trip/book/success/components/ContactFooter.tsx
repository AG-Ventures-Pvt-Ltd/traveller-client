import React from 'react';

const ContactFooter: React.FC = () => (
  <div className="flex gap-1 text-base text-center flex-wrap justify-center">
    <span className="text-neutral-700 font-medium">Need help? Contact us at</span>
    <a href="mailto:support@wondrr.com" className="text-neutral-900 font-bold underline">
      support@wondrr.com
    </a>
    <span className="text-neutral-700 font-medium">or call</span>
    <a href="tel:+966123456789" className="text-neutral-900 font-bold underline">
      +966 123 456 789
    </a>
  </div>
);

export default ContactFooter;