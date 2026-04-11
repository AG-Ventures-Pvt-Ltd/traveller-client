'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, WalletIcon } from '@phosphor-icons/react';
import { useGetData } from '@/services/useGetData';
import { useSession } from 'next-auth/react';
import usePostData from '@/services/usePostData';

interface WalletData {
  balance: number;
}

const WalletPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: walletData, isLoading, error } = useGetData<WalletData>(
    '/api/client/v1/wallet/balance',
    {
      queryKey: ['wallet-balance'],
    }
  );
  const { mutate: updateWallet, isPending: isUpdatingWallet } = usePostData({ 
    url: '/api/client/v1/wallet/update',
    retry: (failureCount, error) => (error as any)?.response?.status !== 409 
  });

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
              onError: (error) => {
                console.error('Failed to update wallet:', error);
              },
            }
          );
        }
      } catch (error) {
        console.error('Failed to parse spinWheelData:', error);
      }
    }
  }, [session?.user?.id, updateWallet]);

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-6 lg:px-9 py-6 sm:py-8 lg:py-10">
      <div className="max-w-[1440px] mx-auto">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeftIcon size={24} className="w-6 h-6 text-neutral-700" weight="regular" />
          </button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Satoshi'] text-neutral-900">
            Wondrr Wallet
          </h1>
        </div>
        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-10 lg:p-12 border-2 border-blue-100">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-4 bg-blue-500 rounded-full flex items-center justify-center">
              <WalletIcon size={32} className="w-8 h-8 text-white" weight="fill" />
            </div>
            <div>
              <p className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi'] mb-2">
                Total Wallet Balance
              </p>
              {isLoading ? (
                <div className="h-12 w-48 bg-blue-200 rounded-lg animate-pulse" />
              ) : error ? (
                <p className="text-red-600 text-lg font-bold font-['Satoshi']">
                  Failed to load balance
                </p>
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-bold font-['Satoshi'] text-neutral-900">
                    {walletData?.balance?.toLocaleString('en-IN') || '0'}
                  </span>
                  <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
                    Wondrr Cash
                  </span>
                  {isUpdatingWallet && (
                    <div className="ml-2 w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Info */}
          <div className="pt-8 border-t border-blue-200">
            <p className="text-neutral-600 text-sm sm:text-base font-medium font-['Satoshi'] mb-4">
              Use your wallet balance to book trips and enjoy discounts on your travels.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <p className="text-neutral-600 text-xs sm:text-sm font-medium font-['Satoshi']">
                  Cannot be withdrawn to your bank account
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <p className="text-neutral-600 text-xs sm:text-sm font-medium font-['Satoshi']">
                  Valid for 90 days from the date of addition
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h3 className="text-neutral-900 text-lg sm:text-xl font-bold font-['Satoshi'] mb-3">
              How to Add Money
            </h3>
            <p className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi']">
              Add funds to your wallet through various payment methods available in your account settings.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h3 className="text-neutral-900 text-lg sm:text-xl font-bold font-['Satoshi'] mb-3">
              Security
            </h3>
            <p className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi']">
              Your wallet balance is secure and encrypted. Only you can access your wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
