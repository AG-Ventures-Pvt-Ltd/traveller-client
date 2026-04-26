'use client';

import React, { useEffect } from 'react';
import { Users, Calendar, BadgeAlert } from 'lucide-react';
import BackButton from '@/common/ui/BackButton';
import MyImage from '@/common/ui/Image';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { useTripDetailsStore } from '../../store/useTripDetailsStore';
import { useBookingStore } from '../../store/useBookingStore';
import { EmergencyContact } from '../types';

interface BatchDetails {
    tripImage: string;
    tripTitle: string;
    tripLocation: string;
    hostName?: string;
    availableSeats: number;
    startDate: string;
    startTime: string;
}

interface ReviewInfoProps {
    tripId: string;
    batchId: string;
    guests: number;
    emergencyContact: EmergencyContact;
    selectedPricingLabel?: string;
    onBack?: () => void;
    onContinue: () => void;
    isProcessing?: boolean;
}

export default function ReviewInfo({
    tripId,
    batchId,
    guests,
    emergencyContact,
    selectedPricingLabel,
    onBack,
    onContinue,
    isProcessing = false,
}: ReviewInfoProps) {
    const actualTripId = tripId ? (tripId.split('-').pop() || tripId) : '';

    const couponCode = useBookingStore((state) => state.couponCode);
    const roomSharing = useBookingStore((state) => state.roomSharing);
    const referralCode = useBookingStore((state) => state.referralCode);

    const { tripDetails, fetchTripDetails } = useTripDetailsStore();

    const { data: batchDetails } = useGetData<BatchDetails>(
        batchId ? API_ENDPOINTS.TRIPS.BATCH_DETAILS(batchId) : ''
    );

    useEffect(() => {
        if (actualTripId && batchId && guests > 0) {
            fetchTripDetails(actualTripId, batchId, guests, couponCode, roomSharing, referralCode);
        }
    }, [actualTripId, batchId, guests, couponCode, roomSharing, referralCode, fetchTripDetails]);

    const isEmergencyContactSaved =
        !!(emergencyContact.name?.trim() && emergencyContact.contactNumber?.trim());

    const formattedDate = batchDetails?.startDate
        ? new Date(batchDetails.startDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
          })
        : '';

    return (
        <div className="flex flex-col min-h-screen bg-stone-50">
            {/* Header */}
            <div className="px-5 pt-14 pb-4">
                <BackButton label="Review information" onClick={onBack} className="gap-4" />
            </div>

            {/* Card */}
            <div className="mx-5 rounded-2xl border border-zinc-300 overflow-hidden flex flex-col">
                {/* Trip Header */}
                <div className="flex items-start justify-between gap-3 px-4 pt-5 pb-4">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <h2 className="text-black text-xl font-semibold leading-snug">
                            {batchDetails?.tripTitle || '—'}
                        </h2>
                        <div className="flex items-center gap-1">
                            <span className="text-black text-xs">
                                by{' '}
                                <span className="font-semibold">
                                    {batchDetails?.hostName || batchDetails?.tripLocation || '—'}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        <MyImage
                            src={batchDetails?.tripImage || ''}
                            alt={batchDetails?.tripTitle || 'Trip image'}
                            className="w-full h-full"
                            objectFit="cover"
                            fill={false}
                        />
                    </div>
                </div>

                <div className="mx-4 border-t border-zinc-300" />

                {/* Trip Meta */}
                <div className="flex flex-col gap-3 px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <Users className="w-6 h-6 text-black flex-shrink-0" strokeWidth={1.5} />
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

                    {selectedPricingLabel && (
                        <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 flex items-center justify-center text-black text-xs flex-shrink-0">🛏</span>
                            <span className="text-black text-xs">{selectedPricingLabel}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2.5">
                        <Calendar className="w-6 h-6 text-black flex-shrink-0" strokeWidth={1.5} />
                        <span className="text-black text-xs">{formattedDate}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <BadgeAlert
                                className={`w-6 h-6 flex-shrink-0 ${isEmergencyContactSaved ? 'text-green-600' : 'text-red-500'}`}
                                strokeWidth={1.5}
                            />
                            <span className={`text-xs ${isEmergencyContactSaved ? 'text-black' : 'text-red-500'}`}>
                                {isEmergencyContactSaved
                                    ? emergencyContact.name
                                    : 'Emergency contact not saved'}
                            </span>
                        </div>
                        {!isEmergencyContactSaved && (
                            <span className="text-blue-500 text-xs underline cursor-pointer" onClick={onBack}>
                                fill now
                            </span>
                        )}
                    </div>
                </div>

                <div className="mx-4 border-t border-zinc-300" />

                {/* Pricing Breakdown */}
                {tripDetails && (
                    <div className="flex flex-col gap-2.5 px-4 py-4">
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-600 text-xs">Tour price</span>
                            <span className="text-black text-xs">₹{tripDetails.grandTotalWithoutFee}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-zinc-600 text-xs">Convenience fee</span>
                            <span className="text-black text-xs">₹{tripDetails.serviceFee}</span>
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

            {/* Spacer */}
            <div className="flex-1" />

            {/* Continue Button */}
            <div className="px-5 py-7 bg-stone-50">
                <button
                    onClick={onContinue}
                    disabled={isProcessing}
                    className="w-full py-4 bg-fuchsia-300 rounded-xl text-black text-base font-normal text-center active:opacity-80 transition-opacity disabled:opacity-60"
                >
                    {isProcessing ? 'Processing...' : 'Continue to booking Summary'}
                </button>
            </div>
        </div>
    );
}
