import { CalendarCheckIcon, UsersIcon, XIcon } from '@phosphor-icons/react';
import MyImage from '@/common/ui/Image';
import type { ElementType } from 'react';

interface BookingDetailsItem {
    key: string;
    icon: ElementType;
    getValue: (booking: TripSummaryCardProps['booking'], formattedDate?: string) => string;
    condition: (booking: TripSummaryCardProps['booking']) => boolean;
    className?: string;
}

interface TripSummaryCardProps {
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

const TripSummaryCard: React.FC<TripSummaryCardProps> = ({ trip, booking }) => {
    const formattedDate = trip.startDateTime
        ? new Date(trip.startDateTime).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        : '';

    const bookingDetailsMap: BookingDetailsItem[] = [
        {
            key: 'travelers',
            icon: UsersIcon,
            getValue: (booking) => `${booking.numberOfPeople} Traveler${booking.numberOfPeople > 1 ? 's' : ''}`,
            condition: () => true,
            className: '',
        },
        // {
        //     key: 'mealPreference',
        //     icon: ForkKnifeIcon,
        //     getValue: (booking) => `${booking.mealPreference} meal`,
        //     condition: (booking) => !!booking.mealPreference,
        //     className: 'capitalize',
        // },
        {
            key: 'departureDate',
            icon: CalendarCheckIcon,
            getValue: (booking, formattedDate) => formattedDate || '—',
            condition: () => true,
            className: '',
        },
    ];

    return (
        <div className="rounded-2xl border border-zinc-300 overflow-hidden flex flex-col">
            {/* Trip Header */}
            <div className="flex items-start justify-between gap-3 px-4 pt-5 pb-4">
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <h2 className="text-black text-xl font-semibold leading-snug">
                        {trip.title || '—'}
                    </h2>
                    <div className="flex items-center gap-1">
                        <span className="text-black text-xs">
                            by{' '}
                            <span className="font-semibold">
                                {trip.hostName || '—'}
                            </span>
                        </span>
                    </div>
                </div>
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <MyImage
                        src={trip.tripImage || ''}
                        alt={trip.title || 'Trip image'}
                        width={96}
                        height={96}
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
                    const shouldShow = item.condition(booking);
                    if (!shouldShow) return null;

                    return (
                        <div key={item.key} className="flex items-center gap-2.5">
                            <IconComponent size={24} weight="thin" className="text-black flex-shrink-0" />
                            <span className={`text-black text-xs ${item.className || ''}`}>
                                {item.getValue(booking, formattedDate)}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="mx-4 border-t border-zinc-300" />

            <div className="flex justify-between items-center px-4 pt-4">
                <span className="text-zinc-600 text-xs flex items-center gap-1">
                    {booking.pricingTierSnapshot.label}
                    {booking.numberOfPeople > 1 && (
                        <span className="flex items-center gap-1">
                            <XIcon weight='regular' size={12} />
                            {booking.numberOfPeople}
                        </span>
                    )}
                </span>
                <span className="text-black text-xs">₹ {booking.pricingTierSnapshot.pricePerPerson.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex flex-col gap-2.5 px-4 pt-2 pb-4">

                {(booking.addOns ?? []).map((item,idx) => (
                    <div key={`addOn_${idx}`} className="flex justify-between items-center">
                        <span className="text-zinc-600 text-xs flex items-center gap-1">
                            {item.label}
                            {item.quantity > 1 && (
                                <span className="flex items-center gap-1">
                                    <XIcon weight='regular' size={12} />
                                    {item.quantity}
                                </span>
                            )}
                        </span>
                        <span className="text-black text-xs">₹{item.pricePerPerson.toLocaleString('en-IN')}</span>
                    </div>
                ))}

                {(booking.discounts ?? []).map((discount) => (
                    <div key={discount._id} className="flex justify-between items-center">
                        <span className="text-zinc-600 text-xs">
                            {discount.type === 'coupon' ? 'Coupon' : discount.type === 'referral' ? "Referral" : "Wondrr Cash"}
                            <span className="text-[#43A047] ml-1">
                                {discount.label}
                            </span>
                        </span>
                        <span className="text-[#43A047] text-xs">-₹{discount.amount.toLocaleString('en-IN')}</span>
                    </div>
                ))}

                <div className="flex justify-between items-center pt-1">
                    <span className="text-black text-xl font-semibold">Total Value</span>
                    <span className="text-black text-xl font-semibold">₹{booking.pricingSnapshot.grandTotal}</span>
                </div>
            </div>
        </div>
    );
};

export default TripSummaryCard;