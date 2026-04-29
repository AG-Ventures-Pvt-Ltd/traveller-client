'use client';

import React, { useEffect, useRef } from 'react';
import { UsersThreeIcon, CalendarIcon, MapPinLineIcon, CarIcon, ForkKnifeIcon, TagIcon } from '@phosphor-icons/react';
import MyImage from '@/common/ui/Image';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { useTripDetailsStore } from '../../../[batchId]/store/useTripDetailsStore';
import { useBookingStore } from '../../../[batchId]/store/useBookingStore';
import { useBookingNavStore } from '../../../[batchId]/store/useBookingNavStore';

interface BatchDetails {
    tripImage: string;
    title: string;
    tripLocation: string;
    hostName?: string;
    availableSeats: number;
    startDateTime: string;
}

interface ReviewInfoProps {
    tripId: string;
    batchId: string;
    onContinue: () => void;
}

export default function ReviewInfo({
    tripId,
    batchId,
    onContinue,
}: ReviewInfoProps) {
    const actualTripId = tripId ? (tripId.split('-').pop() || tripId) : '';

    const {
        guests,
        selectedBatchId,
        selectedMeetingPoint,
        selectedAddOn,
        selectedExtraAddOn,
        selectedTransportAddOn,
        selectedActivityAddOn,
        selectedTravelOption,
        foodPreference,
        couponCode,
        referralCode,
        personalDetails,
    } = useBookingStore();

    const resolvedBatchId = selectedBatchId || batchId;

    const { tripDetails, fetchTripDetails } = useTripDetailsStore();

    const { data: batchDetails } = useGetData<BatchDetails>(
        resolvedBatchId ? API_ENDPOINTS.TRIPS.BATCH_DETAILS(resolvedBatchId) : ''
    );

    useEffect(() => {
        if (actualTripId && resolvedBatchId && guests > 0) {
            const addOnIds = [
                selectedAddOn?._id,
                selectedExtraAddOn?._id,
                selectedTransportAddOn?._id,
                selectedActivityAddOn?._id,
            ].filter((id): id is string => Boolean(id));

            fetchTripDetails(
                actualTripId,
                resolvedBatchId,
                guests,
                couponCode,
                referralCode,
                personalDetails?.email,
                selectedMeetingPoint?.locationId,
                addOnIds,
                selectedTravelOption?._id,
            );
        }
    }, [
        actualTripId,
        resolvedBatchId,
        guests,
        couponCode,
        referralCode,
        personalDetails?.email,
        selectedMeetingPoint?.locationId,
        selectedAddOn?._id,
        selectedExtraAddOn?._id,
        selectedTransportAddOn?._id,
        selectedActivityAddOn?._id,
        selectedTravelOption?._id,
        fetchTripDetails,
    ]);

    const { setContinueAction } = useBookingNavStore();
    const continueRef = useRef(onContinue);
    continueRef.current = onContinue;
    useEffect(() => {
        setContinueAction(() => continueRef.current());
    }, [setContinueAction]);

    const formattedDate = batchDetails?.startDateTime
        ? new Date(batchDetails.startDateTime).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
          })
        : '';

    return (
        <div className="px-4 pb-4">
            {/* Card */}
            <div className="mx-5 rounded-2xl border border-zinc-300 overflow-hidden flex flex-col">
                {/* Trip Header */}
                <div className="flex items-start justify-between gap-3 px-4 pt-5 pb-4">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <h2 className="text-black text-xl font-semibold leading-snug">
                            {batchDetails?.title || '—'}
                        </h2>
                        <div className="flex items-center gap-1">
                            <span className="text-black text-xs">
                                by{' '}
                                <span className="font-semibold">
                                    {batchDetails?.hostName || '—'}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        <MyImage
                            src={batchDetails?.tripImage || ''}
                            alt={batchDetails?.title || 'Trip image'}
                            className="w-full h-full"
                            objectFit="cover"
                            fill={false}
                        />
                    </div>
                </div>

                <div className="mx-4 border-t border-zinc-300" />

                {/* Trip Meta */}
                <div className="flex flex-col gap-3 px-4 py-4">
                    {/* Guests */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <UsersThreeIcon size={24} weight="light" className="text-black flex-shrink-0" />
                            <span className="text-black text-xs">
                                {guests} Traveler{guests > 1 ? 's' : ''}
                            </span>
                        </div>
                        {(batchDetails?.availableSeats ?? 0) > 0 && (
                            <span className="text-blue-500 text-xs underline">
                                {batchDetails?.availableSeats} more seats left
                            </span>
                        )}
                    </div>

                    {/* Departure date */}
                    <div className="flex items-center gap-2.5">
                        <CalendarIcon size={24} weight="light" className="text-black flex-shrink-0" />
                        <span className="text-black text-xs">{formattedDate || '—'}</span>
                    </div>

                    {/* Meeting point */}
                    {selectedMeetingPoint && (
                        <div className="flex items-center gap-2.5">
                            <MapPinLineIcon size={24} weight="light" className="text-black flex-shrink-0" />
                            <span className="text-black text-xs">
                                {selectedMeetingPoint.city || selectedMeetingPoint.locationId}
                            </span>
                        </div>
                    )}

                    {/* Travel option */}
                    {selectedTravelOption && (
                        <div className="flex items-center gap-2.5">
                            <CarIcon size={24} weight="light" className="text-black flex-shrink-0" />
                            <span className="text-black text-xs">{selectedTravelOption.label}</span>
                        </div>
                    )}

                    {/* Add-on */}
                    {selectedAddOn && (
                        <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 flex items-center justify-center text-black text-xs flex-shrink-0">🛏</span>
                            <span className="text-black text-xs">
                                {selectedAddOn.label}
                            </span>
                        </div>
                    )}

                    {/* Food preference */}
                    {foodPreference && (
                        <div className="flex items-center gap-2.5">
                            <ForkKnifeIcon size={24} weight="light" className="text-black flex-shrink-0" />
                            <span className="text-black text-xs capitalize">{foodPreference} meal</span>
                        </div>
                    )}

                    {/* Coupon / Referral applied */}
                    {(couponCode || referralCode) && (
                        <div className="flex items-center gap-2.5">
                            <TagIcon size={24} weight="light" className="text-black flex-shrink-0" />
                            <span className="text-black text-xs">
                                {couponCode && <span className="text-green-600 font-medium">{couponCode}</span>}
                                {couponCode && referralCode && <span className="text-zinc-400"> · </span>}
                                {referralCode && <span className="text-green-600 font-medium">{referralCode}</span>}
                            </span>
                        </div>
                    )}

                    {/* Personal details */}
                    {personalDetails && (
                        <div className="flex flex-col gap-0.5 pt-1 border-t border-zinc-200">
                            <span className="text-zinc-500 text-xs">Traveler</span>
                            <span className="text-black text-xs font-medium">{personalDetails.fullName}</span>
                            <span className="text-zinc-500 text-xs">{personalDetails.email} · {personalDetails.phone}</span>
                        </div>
                    )}
                </div>

                <div className="mx-4 border-t border-zinc-300" />

                {/* Pricing Breakdown */}
                {tripDetails && (
                    <div className="flex flex-col gap-2.5 px-4 py-4">
                        {(tripDetails.priceBreakdown ?? []).map((item) => (
                            <div key={item._id} className="flex justify-between items-center">
                                <span className="text-zinc-600 text-xs">
                                    {item.label}
                                    {item.quantity > 1 && (
                                        <span className="text-zinc-400"> ×{item.quantity}</span>
                                    )}
                                </span>
                                <span className="text-black text-xs">₹{item.total.toLocaleString('en-IN')}</span>
                            </div>
                        ))}

                        <div className="flex justify-between items-center">
                            <span className="text-zinc-600 text-xs">Convenience fee</span>
                            <span className="text-black text-xs">₹{tripDetails.serviceFee.toLocaleString('en-IN')}</span>
                        </div>

                        {(tripDetails.roomSharingCostTotal ?? 0) > 0 && (
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-600 text-xs">Room sharing</span>
                                <span className="text-black text-xs">₹{tripDetails.roomSharingCostTotal}</span>
                            </div>
                        )}

                        {tripDetails.discount > 0 && (
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-600 text-xs">
                                    Coupon{' '}
                                    {tripDetails.appliedCoupon?.code && (
                                        <span className="text-green-600">{tripDetails.appliedCoupon.code}</span>
                                    )}
                                </span>
                                <span className="text-green-600 text-xs">-₹{tripDetails.discount}</span>
                            </div>
                        )}

                        {(tripDetails.referralDiscount ?? 0) > 0 && (
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-600 text-xs">
                                    Referral code{' '}
                                    {referralCode && (
                                        <span className="text-green-600">{referralCode}</span>
                                    )}
                                </span>
                                <span className="text-green-600 text-xs">-₹{tripDetails.referralDiscount}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-1">
                            <span className="text-black text-xl font-semibold">Total Value</span>
                            <span className="text-black text-xl font-semibold">₹{tripDetails.grandTotal}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
