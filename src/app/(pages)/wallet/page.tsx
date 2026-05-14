'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { InfoIcon } from '@phosphor-icons/react';
import { useGetData } from '@/services/useGetData';
import { useSession } from 'next-auth/react';
import BackButton from '@/common/ui/BackButton';
import MyImage from '@/common/ui/Image';
import { TransactionList } from '../profile/transactions/components/TransactionList';
import { useWalletTransactions } from '../profile/transactions/hooks/useTransactions';
import { walletTxToEntry } from '../profile/transactions/utils/transactionUtils';
import Button from '@/common/ui/Buttons/Button';
import { formatDate } from '@/common/utils/dateUtils';
import { usePayment } from '../trip/book/[id]/[batchId]/hooks/usePayment';
import { AddBalanceModal } from './components/AddBalanceModal';


interface WalletData {
  balance: number;
  expiryDate: string | null;
  expiryAmount: number;
}

const WalletPage = () => {

  const router = useRouter();
  const { data: session } = useSession();

  const [isAddBalanceOpen, setIsAddBalanceOpen] = useState(false)
  const [isPaymentPending, setIsPaymentPending] = useState(false)

  const { data: walletData, isLoading, error, refetch } = useGetData<WalletData>(
    '/api/client/v1/wallet/balance',
    {
      queryKey: ['wallet-balance'],
    }
  );

  const { data: txData, isLoading: txLoading } = useWalletTransactions(50, 0);

  const { startWalletPayment } = usePayment({
    onWalletSuccess: () => {
      setIsPaymentPending(false)
      setIsAddBalanceOpen(false)
      refetch()
    },
  })

  const handleAddBalance = async (amount: number) => {
    setIsPaymentPending(true)
    await startWalletPayment({ amount })
    setIsPaymentPending(false)
  }

  const walletEntries = useMemo(
    () => (txData?.transactions ?? []).map(walletTxToEntry),
    [txData]
  );

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="w-full min-h-screen bg-[#fff9f4]">
      {/* Sticky Floating Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className=" px-4 py-4 flex items-center justify-between">
          <BackButton label='' />
          <button
            onClick={handleProfileClick}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-300 hover:opacity-80 transition-opacity flex-shrink-0 overflow-hidden relative"
            aria-label="Go to profile"
          >
            {session?.user?.avatar ? (
              <MyImage
                src={session.user.avatar}
                alt="Profile"
                width={0}
                height={0}
                className='w-full h-full'
              />
            ) : (
              <span className="text-sm font-semibold text-white">
                {session?.user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="pt-32 px-4 pb-8">
        <div className="max-w-[393px] mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-black font-normal mb-2">balance</p>

            {isLoading ? (
              <div className="h-16 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto" />
            ) : error ? (
              <p className="text-red-600 text-lg font-bold">Failed to load balance</p>
            ) : (
              <span className="text-6xl font-bold text-black">
                ₹{walletData?.balance?.toLocaleString('en-IN') || '0'}
              </span>
            )}
            <p className="text-xl px-8 text-black font-normal mt-6">
              you can use wondrr cash to save while booking trips !
            </p>
          </div>

          {/* Info Banner */}
          <div className="flex gap-3 items-center bg-[#FFC107] rounded-2xl p-3 mb-6">
            <InfoIcon
              size={16}
              className="w-4 h-4 text-black flex-shrink-0"
              weight="thin"
            />
            <p className="text-xs text-black font-normal">
              {walletData?.expiryDate && walletData?.expiryAmount > 0
                ? `₹${walletData.expiryAmount.toLocaleString('en-IN')} expiring on ${formatDate(walletData.expiryDate)}`
                : 'Rewards are only valid till 90 days from the date of addition.'
              }
            </p>
          </div>
          <p className="text-black text-center font-normal bg-[#E2F4A6] p-3 mb-6 rounded-xl">
            Use ₹{walletData?.balance?.toLocaleString('en-IN') || '0'} for your next trip
          </p>

          {/* Wallet Transaction History */}
          <div className="mb-6">
            <TransactionList
              entries={walletEntries}
              isLoading={txLoading}
              title="Transaction History"
            />
          </div>
          <div className='fixed bottom-0 left-0 right-0 px-4 py-6'>
            <Button variant='purple' fullWidth onClick={() => setIsAddBalanceOpen(true)}>
              Add Balance
            </Button>
          </div>

          <AddBalanceModal
            isOpen={isAddBalanceOpen}
            onClose={() => setIsAddBalanceOpen(false)}
            onSubmit={handleAddBalance}
            isSubmitting={isPaymentPending}
          />
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
