import { useEffect, useMemo } from 'react';
import { InfoIcon } from '@phosphor-icons/react';
import CustomSelect from '@/common/ui/CustomSelect';
import { useBookingFormStore } from '../hooks/useBookingFormStore';
import { notify } from '@/common/utils/notify';
import { usePathname } from 'next/navigation';
import { useDevice } from '@/common/hooks/useDevice';
import { CurrencyInrIcon } from '@phosphor-icons/react';
import Button from '@/common/ui/Buttons/Button';


interface TripOverviewCardProps {
    guests?: number;
    setGuests?: (guests: number) => void;
    meetingPoints?: any[];
    selectedMeetingPoint?: string;
    selectedMeetingPointIdx?: number;
    setSelectedMeetingPointIdx?: (idx: number) => void;
    batchDetails?: any;
    gap?: string
    displayPrice?:number
    handleBookNowClick?:() => void
}

function formatDate(date: Date) {
    return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata' });
}

function formatDay(date: Date) {
    return date.toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'Asia/Kolkata' });
}

export default function TripOverviewCard(props: TripOverviewCardProps) {

    const path = usePathname()

    const store = useBookingFormStore();

    const { isMobile } = useDevice()

    const guests = store.guests || props.guests || 1;
    const setGuests = useMemo(() =>
        store.setGuests || props.setGuests || (() => { }),
        [store.setGuests, props.setGuests]
    );
    const meetingPoints = store.meetingPoints || props.meetingPoints || [];
    const selectedMeetingPointIdx = store.selectedMeetingPointIdx ?? props.selectedMeetingPointIdx ?? 0;
    const setSelectedMeetingPointIdx = useMemo(() =>
        store.setSelectedMeetingPointIdx || props.setSelectedMeetingPointIdx || (() => { }),
        [store.setSelectedMeetingPointIdx, props.setSelectedMeetingPointIdx]
    );
    const batchDetails = store.batchDetails || props.batchDetails;

    const startDate = batchDetails?.startDateTime
        ? new Date(batchDetails.startDateTime)
        : null;

    const endDate = batchDetails?.endDateTime ? new Date(batchDetails.endDateTime) : null;

    const selectedPoint = meetingPoints[selectedMeetingPointIdx] ?? null;
    const hasExtraPrice = selectedPoint && selectedPoint.pickupPrice > 0;

    useEffect(() => {
        if (meetingPoints.length > 0) {
            setSelectedMeetingPointIdx(0);
        }
    }, [meetingPoints.length, setSelectedMeetingPointIdx]);


    return (
        <div className={`border border-[#D9D9D9] rounded-2xl px-[18px] pt-5 pb-4 flex flex-col gap-${props.gap || 5}`}>
            {batchDetails?.title && path.split('/')[1] !== 'profile' &&
                <p className="text-[16px] font-semibold text-black tracking-[-0.48px] leading-snug">
                    {batchDetails?.title}
                </p>}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-medium text-black tracking-[-0.36px]">
                        {startDate ? formatDate(startDate) : '—'}
                    </p>
                    <p className="text-xs text-black tracking-[-0.36px]">
                        {startDate ? formatDay(startDate) : ''}
                    </p>
                </div>
                <div className={`bg-[#FFD976] rounded-full px-2.5 py-1`}>
                    <p className="text-xs text-black tracking-[-0.36px]">
                        {batchDetails?.duration ? batchDetails?.duration : '—'}
                    </p>
                </div>
                <div className="flex flex-col gap-0.5 items-end">
                    <p className="text-xs font-medium text-black tracking-[-0.36px]">
                        {endDate ? formatDate(endDate) : '—'}
                    </p>
                    <p className="text-xs text-black tracking-[-0.36px]">
                        {endDate ? formatDay(endDate) : ''}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-xs text-black tracking-[-0.36px] whitespace-nowrap">No. of Pax :</p>
                {
                    props.guests ? <div>{props.guests}</div> :
                        (<div className="flex items-center gap-2.5">
                            <button
                                type="button"
                                onClick={() => setGuests(Math.max(1, guests - 1))}
                                className="w-8 h-8 rounded-full bg-[#448AFF] text-white flex items-center justify-center text-lg font-medium leading-none select-none"
                                aria-label="Decrease guests"
                            >
                                −
                            </button>
                            <p className="text-[19px] font-medium text-black tracking-[-0.58px] w-7 text-center">
                                {String(guests || 1)}
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    if (guests + 1 <= (batchDetails?.availableSeats || 0)) {
                                        setGuests(guests + 1);
                                    } else {
                                        notify.error(`Maximum available seats: ${batchDetails?.availableSeats || 0}`);
                                    }
                                }}
                                className="w-8 h-8 rounded-full bg-[#448AFF] text-white flex items-center justify-center text-lg font-medium leading-none select-none"
                                aria-label="Increase guests"
                            >
                                +
                            </button>
                        </div>)
                }
            </div>
            {props.selectedMeetingPoint && (
                <div className='flex items-center gap-2 text-xs text-black'>
                    <p className=" tracking-[-0.36px] whitespace-nowrap">Depart from :</p>
                    <p className='font-medium'>{props.selectedMeetingPoint}</p>
                </div>
            )}
            {(meetingPoints.length > 0) && (path.split('/')[1] !== 'profile') && (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs text-black tracking-[-0.36px] whitespace-nowrap">Depart from :</p>
                        <p>{props.selectedMeetingPoint}</p>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <CustomSelect
                                    value={selectedMeetingPointIdx.toString()}
                                    onChange={(value) => {
                                        const idx = Number(value);
                                        setSelectedMeetingPointIdx(idx);
                                    }}
                                    options={meetingPoints.map((point, idx) => ({
                                        value: idx.toString(),
                                        label: point.city || point.locationId,
                                    }))}
                                    className="w-32"
                                    id="meeting-point-select"
                                    size="compact"
                                    dropdownMaxHeight={100}
                                    dropdownWidth={100}
                                />
                            </div>
                            {hasExtraPrice && (
                                <p className="text-xs font-medium text-[#F44336] tracking-[-0.36px] whitespace-nowrap">
                                    +₹{selectedPoint.pickupPrice.toLocaleString('en-IN')}
                                </p>
                            )}
                        </div>
                    </div>
                    {hasExtraPrice && (
                        <div className="flex items-center gap-3">
                            <InfoIcon size={18} className="text-zinc-500 flex-shrink-0" />
                            <p className="text-xs text-black tracking-[-0.36px]">
                                Extra price may apply based on departure location
                            </p>
                        </div>
                    )}
                </div>
            )}
            {!isMobile && <div>
                <div className="rounded-2xl flex flex-col gap-2 mt-12">
                    <div>
                        <p className="text-xl font-bold text-black flex items-end">
                            <span className="flex items-center"><CurrencyInrIcon weight="bold" /> {props.displayPrice}/</span>
                            <span className="text-sm font-medium pl-1"> person</span>
                        </p>
                        <p className="font-medium">+5% GST</p>
                    </div>
                    <Button 
                        onClick={props.handleBookNowClick || (() => { })}
                        variant='purple'
                        className="font-semibold"
                    >
                        Book Now
                    </Button>
                </div>
            </div>}
        </div>
    );
}
