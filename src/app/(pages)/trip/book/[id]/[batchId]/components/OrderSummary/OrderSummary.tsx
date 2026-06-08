import React, { useEffect } from 'react';
import { Users, IndianRupee, Calendar, Shield, Check, Phone } from 'lucide-react';
import MyImage from '@/common/ui/Image';
import Card from '@/common/ui/Card';
import OrderSummarySkeleton from './OrderSummarySkeleton';
import Divider from '@/common/ui/Divider';
import { useBookingStore } from '../../store/useBookingStore';
import { useTripDetailsStore } from '../../store/useTripDetailsStore';
import { OrderSummaryProps } from '../types';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface BatchDetails {
  tripImage: string;
  tripTitle: string;
  tripLocation: string;
  availableSeats: number;
  startDate: string;
  startTime: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ tripId, batchId, guests = 1 }) => {
  const actualTripId = tripId ? (tripId.split('-').pop() || tripId) : '';

  const setTotalAmount = useBookingStore((state) => state.setTotalAmount);
  const couponCode = useBookingStore((state) => state.couponCode);
  const referralCode = useBookingStore((state) => state.referralCode);

  const { tripDetails, isLoading, fetchTripDetails } = useTripDetailsStore();

  const { data: batchDetails, isLoading : isBatchLoading } = useGetData<BatchDetails>(batchId ? API_ENDPOINTS.TRIPS.BATCH_DETAILS(batchId) : '');

  useEffect(() => {
    if (actualTripId && batchId && guests > 0) {
      fetchTripDetails(actualTripId, batchId, guests, couponCode, referralCode);
    }
  }, [actualTripId, batchId, guests, couponCode, referralCode, fetchTripDetails]);

  const grandTotal = tripDetails ? tripDetails.grandTotal : 0;

  useEffect(() => {
    if (grandTotal > 0) {
      setTotalAmount(grandTotal);
    }
  }, [grandTotal, setTotalAmount]);


  if (isLoading || isBatchLoading) return <OrderSummarySkeleton />;

  if (!tripDetails) {
    return (
      <div className="flex-1 flex items-center justify-center">No data available</div>
    )
  }
  return (
    <Card variant='fill' className="w-full rounded-3xl p-4 sm:p-5 bg-white!">
      <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
        <div className="relative aspect-[2/2] rounded-2xl overflow-hidden w-full sm:w-[20%] lg:w-[32%] h-48 sm:h-auto">
          <MyImage
            src={batchDetails?.tripImage || ''}
            alt={'Cover Image'}
            fill
            className="h-full w-full"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-3">
          <h3 className="text-neutral-900 text-base sm:text-lg font-bold font-['Satoshi'] leading-tight">
            {batchDetails?.tripTitle}
          </h3>
          <p className="text-neutral-600 text-xs sm:text-sm font-medium font-['Satoshi']">
            {batchDetails?.tripLocation}
          </p>
          <p className="text-orange-600 text-xs sm:text-sm font-bold font-['Satoshi'] mt-1">
            {batchDetails?.availableSeats} seats left
          </p>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <Users className="w-4 h-4 text-neutral-700" strokeWidth={1.33} />
          <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
            {guests} Traveler{guests > 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-neutral-700" strokeWidth={1.33} />
          <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
            {batchDetails?.startDate ? new Date(batchDetails.startDate).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'Asia/Kolkata',
            }) : ''} • {batchDetails?.startTime || ''}
          </span>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <span className="text-neutral-700 text-xs sm:text-sm font-medium font-['Satoshi'] flex items-center">
            Tour (<IndianRupee size={12} className="sm:w-[14px] sm:h-[14px]" />{tripDetails.basePrice} x {guests})
          </span>
          <span className="text-neutral-900 text-xs sm:text-sm font-bold font-['Satoshi'] flex items-center">
            <IndianRupee size={14} className="sm:w-[16px] sm:h-[16px]" />{tripDetails.grandTotalWithoutFee}
          </span>
        </div>
        {(tripDetails.roomSharingCostTotal ?? 0) > 0 && (
          <div className="flex justify-between items-start">
            <span className="text-neutral-700 text-xs sm:text-sm font-medium font-['Satoshi'] flex items-center">
              Room Sharing Cost (<IndianRupee size={12} /> {tripDetails.roomSharingCost} x {guests})
            </span>
            <span className="text-neutral-900 text-xs sm:text-sm font-bold font-['Satoshi'] flex items-center">
              <IndianRupee size={12} className="sm:w-[14px] sm:h-[14px]" />
              {tripDetails.roomSharingCostTotal}
            </span>
          </div>
        )}
        <div className="flex justify-between items-start">
          <span className="text-neutral-700 text-xs sm:text-sm font-medium font-['Satoshi']">
            Convenience Fee
          </span>
          <span className="text-neutral-900 text-xs sm:text-sm font-bold font-['Satoshi'] flex items-center">
            <IndianRupee size={12} className="sm:w-[14px] sm:h-[14px]" />{tripDetails.serviceFee}
          </span>
        </div>
        {tripDetails.discount > 0 && (
          <div className="flex justify-between items-start">
            <span className="text-green-600 text-xs sm:text-sm font-medium font-['Satoshi']">
              Discount
            </span>
            <span className="text-green-600 text-xs sm:text-sm font-bold font-['Satoshi'] flex items-center">
              -<IndianRupee size={12} className="sm:w-[14px] sm:h-[14px]" />{tripDetails.discount}
            </span>
          </div>
        )}
        {(tripDetails.referralDiscount ?? 0) > 0 && (
          <div className="flex justify-between items-start">
            <span className="text-blue-600 text-xs sm:text-sm font-medium font-['Satoshi']">
              Referral Discount
            </span>
            <span className="text-blue-600 text-xs sm:text-sm font-bold font-['Satoshi'] flex items-center">
              -<IndianRupee size={12} className="sm:w-[14px] sm:h-[14px]" />{tripDetails.referralDiscount}
            </span>
          </div>
        )}
      </div>
      <Divider />
      <div className="flex justify-between items-center">
        <span className="text-neutral-900 text-base sm:text-lg font-bold font-['Satoshi']">
          Total Price
        </span>
        <span className="text-neutral-900 text-2xl sm:text-3xl font-bold font-['Satoshi'] flex items-center">
          <IndianRupee size={24} className="sm:w-[32px] sm:h-[32px]" />{tripDetails.grandTotal}
        </span>
      </div>
      <Divider />
      <div className='flex flex-col gap-2'>
        <h3 className='font-bold text-sm sm:text-base'>Book with confidence</h3>
        <div className='flex items-center gap-2'>
          <Shield size={14} className="sm:w-[16px] sm:h-[16px]" strokeWidth={2.5} />
          <p className="text-xs sm:text-sm">Secure payment processing</p>
        </div>
        <div className='flex items-center gap-2'>
          <Check size={14} className="sm:w-[16px] sm:h-[16px]" strokeWidth={2.5} />
          <p className="text-xs sm:text-sm">Instant confirmation</p>
        </div>
        <div className='flex items-center gap-2'>
          <Phone size={14} className="sm:w-[16px] sm:h-[16px]" strokeWidth={2.5} />
          <p className="text-xs sm:text-sm">24/7 customer support</p>
        </div>
      </div>
    </Card>
  );
};

export default OrderSummary;