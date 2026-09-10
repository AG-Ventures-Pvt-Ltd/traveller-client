'use client'

import Link from 'next/link';
import { CurrencyInrIcon, WhatsappLogoIcon, ShieldCheckIcon } from '@phosphor-icons/react';
import { Plane } from 'lucide-react';
import MyImage from '@/common/ui/Image';
import Button from '@/common/ui/Buttons/Button';
import BatchSelection from '../../mobile/components/BatchSelection';
import { WHATSAPP_PHONE_NUMBER } from '../../constants';
import { AvailableDate, TripData } from '../../../types';
import { sortBatchesByDate } from '../../utils';

export interface BookingPanelProps {
    displayPrice: string | number;
    sortedBatches: ReturnType<typeof sortBatchesByDate>;
    selectedBatch: number | null;
    onSelectBatch: (index: number) => void;
    bestTimeToVisit?: string;
    pricingList: Array<{ label: string; description: string; pricePerPerson: number }>;
    selectedPricing: number | null;
    pricingInfoIndex: number | null;
    onSelectPricing: (index: number) => void;
    onTogglePricingInfo: (index: number) => void;
    onBookNow: () => void;
    isBooking: boolean;
    tripTitle: string;
    tripSlug: string;
    host?: TripData['host'];
    seatsLeft?: number;
}

export default function BookingPanel({
    displayPrice, sortedBatches, selectedBatch, onSelectBatch, bestTimeToVisit,
    onBookNow, isBooking, tripTitle, tripSlug, host,
}: BookingPanelProps) {
    const handleWhatsApp = () => {
        const msg = `https://wondrr.in/trip/${tripSlug}\n\n Hi, I want to book the "${tripTitle}" trip. \nPlease help me confirm my spot.`;
        window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <div className="bg-white rounded-[28px] overflow-hidden shadow-[0_16px_50px_rgba(238,160,255,0.30)]">
            {/* Price header */}
            <div className="bg-[#EEA0FF] px-6 pt-5 pb-6 relative overflow-hidden">
                <Plane className="absolute -right-3 -top-2 w-20 h-20 text-black opacity-[0.07] rotate-[25deg] pointer-events-none" />
                <p className="text-[11px] font-bold text-black/55 mb-1">Starting from</p>
                <p className="text-[2.1rem] font-bold text-black flex items-baseline gap-0.5 leading-none">
                    <CurrencyInrIcon weight="bold" size={26} className="self-center" />
                    {displayPrice}
                    <span className="text-base font-semibold ml-1 text-black/70">/person</span>
                </p>
            </div>

            <div className="p-4 space-y-3.5">
                {sortedBatches.length > 0 && (
                    <BatchSelection batches={sortedBatches} selectedBatch={selectedBatch} onSelect={onSelectBatch} bestTimeToVisit={bestTimeToVisit} />
                )}
                <Button variant='purple' fullWidth onClick={onBookNow} disabled={isBooking || sortedBatches.length === 0} className='font-semibold'>
                    {sortedBatches.length === 0 ? 'No dates available' : isBooking ? 'Redirecting…' : 'Book Now'}
                </Button>
                <Button className='!bg-white flex justify-center gap-2 border border-[#D9D9D9]' onClick={handleWhatsApp} fullWidth>
                    <WhatsappLogoIcon size={24} weight="fill" className='text-[#1ba84e]' />
                    <span className='text-black font-semibold'>Chat with an Expert</span>
                </Button>

                {/* Hosted by */}
                {host && (
                    <div className="border-t-2 border-dashed border-[#f0e8de] pt-3.5">
                        <p className="text-sm font-bold mb-1 pl-1">Hosted by</p>
                        <Link href={`/${host.username}`} className="flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity group">
                            {host.avatar ? (
                                <MyImage src={host.avatar} alt={host.name} rounded className="w-12 h-12 shrink-0" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-[#FFD976] flex items-center justify-center font-black text-lg text-black shrink-0">
                                    {(host.initials || host.name.charAt(0)).toUpperCase()}
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-black truncate">{host.name}</p>
                                {host.certificates?.includes('certified') && (
                                    <span className="flex items-center gap-1 text-xs font-semibold text-[#43A047] mt-0.5">
                                        <ShieldCheckIcon weight="fill" size={13} /> Wondrr Verified
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
