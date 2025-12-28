import React from 'react';

const SecureCheckout = () => {
  return (
    <div className="flex items-center gap-3">
      <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="3" width="16" height="18" rx="2" />
      </svg>
      <div>
        <span className="text-black text-base font-semibold font-dm-sans block">
          Secure Checkout - SSL Encrypted
        </span>
        <p className="text-[#818EA1] text-base font-dm-sans leading-[26.4px]">
          Ensuring your financial and personal details are secure <br />
          during every transaction.
        </p>
      </div>
    </div>
  );
};

export default SecureCheckout;
