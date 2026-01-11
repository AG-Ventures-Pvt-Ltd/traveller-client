import React, { useEffect } from 'react';
import { Users, IndianRupee, Calendar, Shield, Check, Phone } from 'lucide-react';
import MyImage from '@/common/ui/Image';
import Card from '@/common/ui/Card';
import OrderSummarySkeleton from './OrderSummarySkeleton';
import Divider from '@/common/ui/Divider';
import { useBookingStore } from '../../store/useBookingStore';
import { useTripDetailsStore } from '../../store/useTripDetailsStore';
import { OrderSummaryProps } from '../types';

const OrderSummary: React.FC<OrderSummaryProps> = ({ tripId, batchId, guests = 1 }) => {
  const actualTripId = tripId ? (tripId.split('-').pop() || tripId) : '';
  
  const setTotalAmount = useBookingStore((state) => state.setTotalAmount);
  const couponCode = useBookingStore((state) => state.couponCode);
  
  const { tripDetails, isLoading, error, fetchTripDetails } = useTripDetailsStore();

  useEffect(() => {
    if (actualTripId && batchId) {
      fetchTripDetails(actualTripId, batchId, guests, couponCode);
    }
  }, [actualTripId, batchId, guests, couponCode, fetchTripDetails]);

  const grandTotal = tripDetails ? tripDetails.grandTotal : 0;

  useEffect(() => {
    if (grandTotal > 0) {
      setTotalAmount(grandTotal);
    }
  }, [grandTotal, setTotalAmount]);

  if (isLoading) return <OrderSummarySkeleton />;

  if (error) { 
    return (
      <div className="flex-1 flex items-center justify-center">{error?.message || 'Error loading trip details'}</div>
    )
  };
  if (!tripDetails) { 
      return (
      <div className="flex-1 flex items-center justify-center">No data available</div>
    )
  }
  return (
    <Card variant='fill' className="w-full rounded-3xl p-5 bg-white!">
      <div className='flex gap-4'>
        <div className="relative aspect-[2/2] rounded-2xl overflow-hidden w-[32%]">
          <MyImage
            src={tripDetails.tripImages}
            alt={tripDetails.title}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-neutral-900 text-lg font-bold font-['Satoshi'] ">
            {tripDetails.title}
          </h3>
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
            {new Date(tripDetails.selectedDateDetails.startDate).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })} • {tripDetails.selectedDateDetails.startTime}
          </span>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <span className="text-neutral-700 text-sm font-medium font-['Satoshi'] flex items-center">
            Tour (<IndianRupee size={14} />{tripDetails.basePrice} × {guests})
          </span>
          <span className="text-neutral-900 text-sm font-bold font-['Satoshi'] flex items-center">
            <IndianRupee size={16} />{tripDetails.grandTotalWithoutFee}
          </span>
        </div>
        {tripDetails.discount > 0 && (
          <div className="flex justify-between items-start">
            <span className="text-green-600 text-sm font-medium font-['Satoshi']">
              Discount
            </span>
            <span className="text-green-600 text-sm font-bold font-['Satoshi'] flex items-center">
              -<IndianRupee size={14} />{tripDetails.discount}
            </span>
          </div>
        )}
        <div className="flex justify-between items-start">
          <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
            Platform Fee
          </span>
          <span className="text-neutral-900 text-sm font-bold font-['Satoshi'] flex items-center">
            <IndianRupee size={14} />{tripDetails.serviceFee}
          </span>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between items-center">
        <span className="text-neutral-900 text-lg font-bold font-['Satoshi']">
          Total Price
        </span>
        <span className="text-neutral-900 text-3xl font-bold font-['Satoshi'] flex items-center">
          <IndianRupee size={32} />{tripDetails.grandTotal}
        </span>
      </div>
      <Divider />
      <div className='flex flex-col gap-2 '>
        <h3 className='font-bold'>Book with confidence</h3>
        <div className='flex items-center gap-2'>
            <Shield size={16} strokeWidth={2.5}/>
            <p>Secure payment processing</p>
        </div>
        <div className='flex items-center gap-2'>
          <Check size={16} strokeWidth={2.5}/>
          <p>Instant confirmation</p>
        </div>
        <div className='flex items-center gap-2'>
          <Phone size={16} strokeWidth={2.5}/>
          <p>24/7 customer support</p>
        </div>
      </div>
    </Card>
  );
};

export default OrderSummary;