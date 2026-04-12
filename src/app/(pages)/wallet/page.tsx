'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { InfoIcon, CaretDown } from '@phosphor-icons/react';
import { useGetData } from '@/services/useGetData';
import { useSession } from 'next-auth/react';
import usePostData from '@/services/usePostData';
import BackButton from '@/common/ui/BackButton';

interface WalletData {
  balance: number;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const WalletPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  const { data: walletData, isLoading, error } = useGetData<WalletData>(
    '/api/client/v1/wallet/balance',
    {
      queryKey: ['wallet-balance'],
    }
  );
  const { mutate: updateWallet, isPending: isUpdatingWallet } = usePostData({ 
    url: '/api/client/v1/wallet/update',
    retry: (failureCount, error) => {
      const axiosError = error as { response?: { status: number } };
      return axiosError?.response?.status !== 409;
    }
  });

  // FAQ items
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'How to add money to wondrr cash?',
      answer: 'You can add money to your Wondrr Cash wallet through various payment methods available in your account settings. Visit the wallet section and select your preferred payment method.'
    },
    {
      id: 2,
      question: 'Is my money safe in here?',
      answer: 'Yes, your wallet balance is completely safe. All transactions are encrypted and secured with industry-standard security protocols. Your funds are protected at all times.'
    },
    {
      id: 3,
      question: 'Can I withdraw the amount I have won through wondrr?',
      answer: 'Wondrr Cash rewards can only be used for booking trips on our platform. They cannot be withdrawn to your bank account. However, they provide great value for your upcoming travel plans!'
    }
  ];

  // Check spinWheelData and update wallet on mount
  useEffect(() => {
    const spinWheelData = localStorage.getItem('spinWheelData');
    if (spinWheelData && session?.user?.id) {
      try {
        const data = JSON.parse(spinWheelData);
        
        // Only make API call if not already claimed
        if (!data.claimed) {
          const payload = {
            rewardAmount: data.rewardAmount,
            timestamp: data.timestamp,
          };
          
          updateWallet(
            payload,
            {
              onSuccess: () => {
                // Mark as claimed and update localStorage
                const updatedData = {
                  ...data,
                  claimed: true,
                };
                localStorage.setItem('spinWheelData', JSON.stringify(updatedData));
              },
              onError: () => {
                // Handle wallet update error silently
              },
            }
          );
        }
      } catch {
        // Handle JSON parse error silently
      }
    }
  }, [session?.user?.id, updateWallet]);

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="w-full min-h-screen bg-[#fff9f4]">
      {/* Sticky Floating Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#fff9f4]">
        <div className=" px-4 py-4 flex items-center justify-between">
          <BackButton label=''/>
          <button
            onClick={handleProfileClick}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-300 hover:opacity-80 transition-opacity flex-shrink-0 overflow-hidden relative"
            aria-label="Go to profile"
          >
            {session?.user?.avatar ? (
              <Image 
                src={session.user.avatar} 
                alt="Profile" 
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-white">
                {session?.user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="mt-32 px-4 pb-8">
        <div className="max-w-[393px] mx-auto">
          {/* Balance Section */}
          <div className="text-center mb-8">
            <p className="text-sm text-black font-normal mb-2">balance</p>
            
            {isLoading ? (
              <div className="h-16 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto" />
            ) : error ? (
              <p className="text-red-600 text-lg font-bold">Failed to load balance</p>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span className="text-7xl font-bold text-black">
                  ₹{walletData?.balance?.toLocaleString('en-IN') || '0'}
                </span>
                {isUpdatingWallet && (
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            )}
            
            <p className="text-2xl px-8 text-black font-normal mt-6">
              you can use wondrr cash to save while booking trips !
            </p>
          </div>

          {/* Info Banner */}
          <div className="flex gap-3 items-start bg-[#FFC107] rounded-2xl p-3 mb-8">
            <InfoIcon 
              size={16} 
              className="w-4 h-4 text-black flex-shrink-0 mt-0.5" 
              weight="thin"
            />
            <p className="text-sm text-black font-normal">
              Rewards are only valid till 90 days from the date of addition.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="space-y-3">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="border border-[#d9d9d9] rounded-xl overflow-hidden transition-all duration-300"
              >
                {/* FAQ Header */}
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm text-black font-normal text-left">
                    {item.question}
                  </p>
                  <CaretDown 
                    size={16} 
                    className={`w-4 h-4 text-black flex-shrink-0 transition-transform duration-300 ${
                      expandedFAQ === item.id ? 'rotate-180' : ''
                    }`}
                    weight="thin"
                  />
                </button>

                {/* FAQ Content */}
                {expandedFAQ === item.id && (
                  <div className="border-t border-[#d9d9d9] bg-gray-50 p-4">
                    <p className="text-sm text-gray-700 font-normal">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
