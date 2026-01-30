import React from 'react';
import { CreditCard, DollarSign, Headphones } from 'lucide-react';

const PaymentsSupportSection = () => {
  const features = [
    {
      icon: CreditCard,
      title: 'Secure online payments',
      description:
        'All transactions are encrypted and protected with industry-standard security measures. Your payment information is always safe with us.',
    },
    {
      icon: DollarSign,
      title: 'Transparent pricing',
      description:
        'No hidden fees or surprise charges. See the complete cost breakdown including taxes and fees before you book your trip.',
    },
    {
      icon: Headphones,
      title: 'Dedicated support before and during the trip',
      description:
        'Our support team is available 24/7 to assist you with any questions or concerns throughout your entire journey.',
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center justify-center bg-neutral-50 rounded-full px-4 py-2 self-start">
            <span className="text-neutral-900 text-sm font-medium font-['Satoshi'] leading-5">
              Trust &amp; Safety
            </span>
          </div>
          <h2 className="text-4xl font-medium font-['Satoshi'] leading-10">
            <span className="text-neutral-900">Payments, Support </span>
            <span className="text-neutral-700">&amp; Safety</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-neutral-50 rounded-2xl p-6 flex flex-col gap-4"
              >
                {/* Icon */}
                <div className="size-14 bg-neutral-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconComponent size={24} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-neutral-900 text-xl font-bold font-['Satoshi'] leading-7">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-700 text-base font-medium font-['Satoshi'] leading-6">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PaymentsSupportSection;
