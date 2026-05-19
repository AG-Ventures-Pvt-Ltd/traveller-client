import React from 'react'
import {
    UserIcon,
    CurrencyInrIcon,
    CheckCircleIcon,
    CalendarCheckIcon,
    QrCodeIcon,
    PencilSimpleIcon,
    WarningCircleIcon,
    WarningDiamondIcon
} from '@phosphor-icons/react'
import MyImage from '@/common/ui/Image'
import { BookedTrip, TripStatus } from '../constants'
import { formatDate } from '@/common/utils/dateUtils'

interface BookedTripCardProps {
    trip: BookedTrip
    onViewDetails : () => void
    onViewQRTicket?: (id: string) => void
    onFillDetails?: (id: string) => void
    onPayNow?: (id: string) => void
    onWriteReview?: (id: string) => void
    onEditReview?: (id: string) => void
}

const STATUS_CONFIG: Record<TripStatus, { label: string; className: string }> = {
    confirmed : {
        label: 'Upcoming',
        className: 'bg-[#448AFF] text-white',
    },
    completed: {
        label: 'Completed',
        className: 'bg-[#E2F4A6]',
    },
    pending : {
        label : 'Pending',
        className : 'bg-[#E2F4A6]',
    },
    cancelled: {
        label: 'Cancelled',
        className: 'bg-[#FFC107]',
    },
}

const BookedTripCard: React.FC<BookedTripCardProps> = ({
    trip,
    onViewQRTicket,
    onViewDetails,
    onFillDetails,
    onPayNow,
    onWriteReview,
    onEditReview,
}) => {
    const {
        tripSlug,
        tripImage,
        title,
        hostName,
        bookedOn,
        travelers,
        amount,
        tripStatus,
        paymentStatus,
        tripDate,
        hasFilledDetails,
        hasReview,
    } = trip

    const statusConfig = STATUS_CONFIG[tripStatus]

    const formatTravelers = (travelers: any) => {
        // Handle if travelers is an array
        let names: string[] = [];
        if (Array.isArray(travelers)) {
            names = travelers.map(t => typeof t === 'string' ? t : t.name || 'Guest');
        } else if (typeof travelers === 'string') {
            // Handle if travelers is a comma-separated string
            names = travelers.split(',').map(n => n.trim()).filter(n => n);
        }
        
        if (names.length === 0) return 'No travelers';
        if (names.length === 1) return names[0];
        
        const extra = names.length - 1;
        const firstName = names[0].split(' ')[0];
        return `${firstName}+${extra}`;
    }
    
    const renderActions = () => {

        if (tripStatus == 'cancelled') {
            return <></>
        }

        if (tripStatus === 'completed' && !hasReview) {
            return (
                <>
                    <button
                        onClick={() => hasReview ? onEditReview?.(tripSlug) : onWriteReview?.(tripSlug)}
                        className="flex-1 py-2.5 rounded-xl bg-[#FFC107] text-sm font-normal flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
                    >
                        <PencilSimpleIcon size={16} weight="thin" />
                        Write a Review
                    </button>
                </>
            )
        }

        // Upcoming + payment pending: Pay Now + View Details
        if (paymentStatus === 'pending') {
            return (
                <>
                    <button
                        onClick={() => onPayNow?.(tripSlug)}
                        className="flex-1 py-2.5 rounded-xl bg-[#448AFF] text-white text-sm font-normal flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                        <CurrencyInrIcon size={16} weight="thin" />
                        Pay Now
                    </button>
                </>
            )
        }

        // Upcoming + paid + no details filled: Fill in Details + View Details
        if (tripStatus == 'confirmed' && !hasFilledDetails) {
            return (
                <>
                    <button
                        onClick={() => onFillDetails?.(tripSlug)}
                        className="flex-1 py-2.5 rounded-xl bg-[#FFC107] text-black text-sm font-normal flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                        <PencilSimpleIcon size={16} weight="thin" />
                        Fill in Details
                    </button>
                </>
            )
        }

        // Upcoming + paid + details filled: View QR Ticket + View Details
        return (
            <>
                {/* <button
                    onClick={() => onViewQRTicket?.(_id)}
                    className="flex-1 py-2.5 rounded-xl bg-[#448AFF] text-white text-sm font-normal flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <QrCodeIcon size={16} weight="thin" />
                    View QR Ticket
                </button> */}
            </>
        )
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="relative w-full h-36">
                <MyImage src={tripImage} alt={title} className="w-full h-full" />
                <span
                    className={`absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full ${statusConfig.className}`}
                >
                    {statusConfig.label}
                </span>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-base font-bold text-neutral-900 leading-snug line-clamp-2">
                    {title}
                </h3>
                <p className="text-xs font-medium text-[#B8B8B8]">
                    {hostName}
                    <span className="mx-1.5 inline-block w-1 h-1 rounded-full bg-[#B8B8B8] align-middle" />
                    Booked on {formatDate(bookedOn)}
                </p>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <UserIcon size={16} weight="thin" />
                        <span className="text-xs font-medium">
                            {formatTravelers(travelers)}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <CurrencyInrIcon size={16} weight="thin" />
                        <span className="text-xs font-medium">{amount.toLocaleString('en-IN')}/-</span>
                        {paymentStatus === 'paid' && (
                            <CheckCircleIcon size={16} weight="fill" className="text-green-500" />
                        )}
                        {((paymentStatus === 'pending') || (paymentStatus === 'failed')) && (
                            <WarningCircleIcon className='text-[#FFC107]' weight='fill' size={16} />
                        )}
                        {((paymentStatus === 'refunded') || (paymentStatus === 'failed')) && (
                            <WarningCircleIcon className='text-[#43A047]' weight='fill' size={16} />
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <CalendarCheckIcon size={16} weight="thin" />
                    <span className="text-xs font-medium">{formatDate(tripDate)}</span>
                </div>
                <div>
                    {paymentStatus == 'paid' && tripStatus == 'confirmed' && !hasFilledDetails &&  (
                        <div className='flex items-center gap-2 text-[#F44336]'>
                            <WarningDiamondIcon weight='thin' size={16}/>
                           <span className='text-xs'>You need to fill in all passenger details to get your ticket</span>
                        </div>
                    )}
                    {paymentStatus == 'refunded' && tripStatus == 'cancelled' && (
                        <div className='flex items-center gap-2 text-[#43A047]'>
                            <WarningDiamondIcon/>
                            <span className='text-xs'>Refunded</span>
                        </div>
                    )}
                </div>
                <div className="flex gap-3 mt-1">
                    {renderActions()}
                    <button
                        onClick={() => onViewDetails()}
                        className="flex-1 py-2.5 rounded-xl border border-neutral-900 text-sm font-normal text-neutral-900 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookedTripCard