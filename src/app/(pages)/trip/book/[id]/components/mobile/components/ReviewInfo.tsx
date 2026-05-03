'use client';

import { useEffect } from 'react';
import { UserListIcon, CalendarCheckIcon, UsersIcon, CrossIcon, ForkKnifeIcon } from '@phosphor-icons/react';
import MyImage from '@/common/ui/Image';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { useBookingNavStore } from '../../../[batchId]/store/useBookingNavStore';
import { ReviewSkeleton } from '../BookingStepSkeletons';
import { usePayment } from '../../../[batchId]/hooks/usePayment';
import { useSearchParams } from 'next/navigation';


interface BookingData {
    user: {
        fullName: string;
        email: string;
        phoneNumber: string;
    };
    trip: {
        title: string;
        hostName?: string;
        tripImage?: string;
        startDateTime: string;
    };
    booking: {
        numberOfPeople: number;
        mealPreference?: string;
        pricingTierSnapshot: {
            label: string;
            pricePerPerson: number;
        };
        addOns?: Array<{
            _id: string;
            label: string;
            pricePerPerson: number;
            quantity: number;
        }>;
        discounts?: Array<{
            type: string;
            label: string;
            amount: number;
            _id: string;
        }>;
        pricingSnapshot: {
            grandTotal: number;
        };
    };
}

const bookingDetailsMap = [
    {
        key: 'travelers',
        icon: UsersIcon,
        getValue: (data: BookingData) => `${data.booking.numberOfPeople} Traveler${data.booking.numberOfPeople > 1 ? 's' : ''}`,
        condition: () => true,
    },
    {
        key: 'mealPreference',
        icon: ForkKnifeIcon,
        getValue: (data: BookingData) => `${data.booking.mealPreference} meal`,
        condition: (data: BookingData) => !!data.booking.mealPreference,
        className: 'capitalize',
    },
    {
        key: 'departureDate',
        icon: CalendarCheckIcon,
        getValue: (data: BookingData, formattedDate: string) => formattedDate || '—',
        condition: () => true,
    },
];

const discountMap = (discounts: BookingData['booking']['discounts']) => {
    return (discounts ?? []).map((discount) => ({
        key: discount._id,
        label: `${discount.type === 'coupon' ? 'Coupon' : discount.type} ${discount.label}`,
        amount: discount.amount,
        isDiscount: true,
    }));
};


export default function ReviewInfo() {

    const { setContinueAction } = useBookingNavStore();

    useEffect(() => {
        setContinueAction(() => { });
    }, [setContinueAction]);


    const searchParams = useSearchParams();

    const bookingIdFromQuery = searchParams.get('bookingId');
    const existingBookingId = bookingIdFromQuery;

    const { data: bookingData, isLoading: isbookingDataLoading } = useGetData<BookingData>(existingBookingId ? API_ENDPOINTS.BOOKINGS.GET_BY_ID(existingBookingId) : "")

    const formattedDate = bookingData?.trip.startDateTime
        ? new Date(bookingData?.trip.startDateTime).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        : '';

    const { startPayment } = usePayment()

    useEffect(() => {

        if (existingBookingId) {
            setContinueAction(() => startPayment({ bookingId: existingBookingId }))
        }
    }, [])

    if (isbookingDataLoading || !bookingData) {
        return <ReviewSkeleton />;
    }

    return (
        <div className="px-4 pb-4 flex flex-col gap-4">

            <div className="border border-[#D9D9D9] rounded-[16px] flex items-center gap-[26px] px-[19px] py-[21px]">
                <UserListIcon size={24} weight="thin" className="text-black flex-shrink-0" />
                <div className="flex flex-col gap-[7px] text-black">
                    <p className="font-medium text-[16px] tracking-[-0.48px] leading-normal">
                        {bookingData.user.fullName}
                    </p>
                    <div className="flex flex-col gap-[3px] text-[13px] tracking-[-0.39px]">
                        <p>{bookingData.user.email}</p>
                        <p>+91 {bookingData.user.phoneNumber}</p>
                    </div>
                </div>
            </div>

            {/* Summary card */}
            <div className="rounded-2xl border border-zinc-300 overflow-hidden flex flex-col">
                {/* Trip Header */}
                <div className="flex items-start justify-between gap-3 px-4 pt-5 pb-4">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <h2 className="text-black text-xl font-semibold leading-snug">
                            {bookingData.trip.title || '—'}
                        </h2>
                        <div className="flex items-center gap-1">
                            <span className="text-black text-xs">
                                by{' '}
                                <span className="font-semibold">
                                    {bookingData.trip.hostName || '—'}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        <MyImage
                            src={bookingData.trip.tripImage || ''}
                            alt={bookingData.trip.title || 'Trip image'}
                            className="w-full h-full"
                            objectFit="cover"
                            fill={false}
                        />
                    </div>
                </div>

                <div className="mx-4 border-t border-zinc-300" />

                <div className="flex flex-col gap-3 px-4 py-4">
                    {bookingDetailsMap.map((item) => {
                        const IconComponent = item.icon;
                        const shouldShow = item.condition(bookingData);
                        if (!shouldShow) return null;

                        return (
                            <div key={item.key} className="flex items-center gap-2.5">
                                <IconComponent size={24} weight="thin" className="text-black flex-shrink-0" />
                                <span className={`text-black text-xs ${item.className || ''}`}>
                                    {item.getValue(bookingData, formattedDate)}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="mx-4 border-t border-zinc-300" />

                <div className="flex justify-between items-center px-4 pt-4">
                    <span className="text-zinc-600 text-xs">
                        {bookingData.booking.pricingTierSnapshot.label}
                        {bookingData.booking.numberOfPeople > 1 && (
                            <span className="text-zinc-400"> <CrossIcon weight='thin' /> {bookingData.booking.numberOfPeople}</span>
                        )}
                    </span>
                    <span className="text-black text-xs">₹ {bookingData.booking.pricingTierSnapshot.pricePerPerson.toLocaleString('en-IN')}</span>
                </div>
                {/* Pricing Breakdown */}

                <div className="flex flex-col gap-2.5 px-4 py-4">

                    {(bookingData.booking.addOns ?? []).map((item) => (
                        <div key={item._id} className="flex justify-between items-center">
                            <span className="text-zinc-600 text-xs">
                                {item.label}
                                {item.quantity > 1 && (
                                    <span className="text-zinc-400"> <CrossIcon weight='thin' /> {item.quantity}</span>
                                )}
                            </span>
                            <span className="text-black text-xs">₹{item.pricePerPerson.toLocaleString('en-IN')}</span>
                        </div>
                    ))}

                    {(bookingData.booking.discounts ?? []).map((discount) => (
                        <div key={discount._id} className="flex justify-between items-center">
                            <span className="text-zinc-600 text-xs">
                                {discount.type == 'coupon' ? 'Coupon' : discount.type == 'coupon' ? "referral" : "Wondrr Cash" }
                                <span className="text-[#43A047] ml-1">
                                    {discount.label}
                                </span>
                            </span>
                            <span className="text-[#43A047] text-xs">-₹{discount.amount.toLocaleString('en-IN')}</span>
                        </div>
                    ))}

                    <div className="flex justify-between items-center pt-1">
                        <span className="text-black text-xl font-semibold">Total Value</span>
                        <span className="text-black text-xl font-semibold">₹{bookingData.booking.pricingSnapshot.grandTotal}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
