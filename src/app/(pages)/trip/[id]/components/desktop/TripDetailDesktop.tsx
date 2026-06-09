'use client'

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useTripBasicDetails, useTripDetailedDetails } from '../../../api';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { generateSlug } from '../../../utils';
import Loader from '@/common/ui/Loader/Loader';
import { TripData } from '../../types';
import { sortBatchesByDate } from '../mobile/utils';
import { NAV_SECTION_IDS } from '../mobile/constants';
import { NavSection, SectionRefs } from '../mobile/types';
import { getSeatsDisplay } from '@/common/utils/seatsDisplay';
import {
    StarIcon, CurrencyInrIcon, WhatsappLogoIcon, ShieldCheckIcon,
    MapPinIcon, ClockIcon, MountainsIcon, UsersThreeIcon, SignpostIcon,
    GenderFemaleIcon, HeartIcon,
} from '@phosphor-icons/react';
import { Heart, Share2, ChevronLeft, ChevronRight, X, Images, Plane, Compass, Sun } from 'lucide-react';
import MyImage from '@/common/ui/Image';
import { useBookMarking } from '@/common/hooks/useBookMarking';

import BatchSelection from '../mobile/components/BatchSelection';
import TravelOptions from '../mobile/components/TravelOptions';
import WhatsAppButton from '../mobile/components/WhatsAppButton';
import Button from '@/common/ui/Buttons/Button';
import CollapsibleCard from '@/common/ui/CollapsibleCard';

const TripHighlights = dynamic(() => import('../mobile/components/TripHighlights'), { ssr: false });
const ItinerarySection = dynamic(() => import('../mobile/components/ItinerarySection'), { ssr: false });
const InclusionsSection = dynamic(() => import('../mobile/components/InclusionsSection'), { ssr: false });
const FAQsSection = dynamic(() => import('../mobile/components/FAQsSection'), { ssr: false });
const CancellationPolicySection = dynamic(
    () => import('../mobile/components/PoliciesSection').then(m => ({ default: m.CancellationPolicySection })),
    { ssr: false }
);
const MobileReviewSection = dynamic(
    () => import('@/app/(pages)/[id]/components/mobile/components/MobileReviewSection').then(m => ({ default: m.MobileReviewSection })),
    { ssr: false }
);
const SafetySupportSection = dynamic(() => import('../mobile/components/SafetySupportSection'), { ssr: false });
const Footer = dynamic(() => import('../../../../(landing)/Footer/Footer'), { ssr: false });

const WHATSAPP_PHONE_NUMBER = '919667427187';
// Site navbar is sticky top-0 (~72px). Tab nav sits below it.
const TAB_NAV_TOP = 72;
const PANEL_STICKY_TOP = 160; // navbar + tab nav + gap

// ─── Fullscreen Lightbox ───────────────────────────────────────────────────
function ImageLightbox({ images, title, initialIndex, onClose }: {
    images: string[];
    title: string;
    initialIndex: number;
    onClose: () => void;
}) {
    const [current, setCurrent] = useState(initialIndex);
    const total = images.length;

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') setCurrent(p => p === total - 1 ? 0 : p + 1);
            if (e.key === 'ArrowLeft') setCurrent(p => p === 0 ? total - 1 : p - 1);
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [total, onClose]);

    return (
        <div className="fixed inset-0 z-[100] bg-[#1a1410] flex flex-col select-none">
            <div className="flex items-center justify-between px-8 py-4 border-b border-white/10 shrink-0">
                <p className="text-white font-bold truncate max-w-lg">{title}</p>
                <div className="flex items-center gap-5 shrink-0">
                    <span className="text-white/50 text-sm font-medium">{current + 1} / {total}</span>
                    <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center px-20">
                <div className="relative w-full h-full flex items-center justify-center">
                    <MyImage
                        src={images[current] || '/placeholder.jpg'}
                        alt={`${title} — photo ${current + 1}`}
                        objectFit="contain"
                        fill={false}
                        width={1400}
                        height={900}
                        style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 200px)', objectFit: 'contain' }}
                    />
                </div>
                {total > 1 && (
                    <>
                        <button onClick={() => setCurrent(p => p === 0 ? total - 1 : p - 1)} className="absolute left-5 w-12 h-12 rounded-full bg-white/10 hover:bg-[#EEA0FF] hover:text-black border border-white/15 flex items-center justify-center transition-colors text-white">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={() => setCurrent(p => p === total - 1 ? 0 : p + 1)} className="absolute right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-[#EEA0FF] hover:text-black border border-white/15 flex items-center justify-center transition-colors text-white">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {total > 1 && (
                <div className="flex gap-2 px-8 py-4 overflow-x-auto scrollbar-hide justify-center shrink-0">
                    {images.map((img, i) => (
                        <button key={i} onClick={() => setCurrent(i)} className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-[#EEA0FF] opacity-100' : 'border-transparent opacity-45 hover:opacity-75'}`}>
                            <MyImage src={img} alt="" className="w-full h-full" objectFit="cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Image Gallery (main + side stack) ─────────────────────────────────────
function DesktopImageGallery({ images, title, onOpen, isBookmarked, onShare, onToggleBookmark }: {
    images: string[];
    title: string;
    onOpen: (index: number) => void;
    isBookmarked: boolean;
    onShare: () => void;
    onToggleBookmark: () => void;
}) {
    if (images.length === 0) return null;
    const main = images[0];
    const side = images.slice(1, 3);
    const extra = images.length - 3;

    return (
        <div className="relative">
            <div className="flex gap-3 rounded-[28px] overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.10)]" style={{ height: '460px' }}>
                {/* Main */}
                <div className={`overflow-hidden cursor-zoom-in group relative ${side.length > 0 ? 'flex-[3]' : 'flex-1'}`} onClick={() => onOpen(0)}>
                    <MyImage src={main || '/placeholder.jpg'} alt={title} className="w-full h-full transition-transform duration-[600ms] group-hover:scale-[1.04]" objectFit="cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                {/* Side */}
                {side.length > 0 && (
                    <div className="flex-[2] flex flex-col gap-3">
                        {side.map((img, i) => {
                            const showOverlay = i === side.length - 1 && extra > 0;
                            return (
                                <div key={i} className="flex-1 relative overflow-hidden cursor-zoom-in group" onClick={() => onOpen(i + 1)}>
                                    <MyImage src={img} alt={`${title} photo ${i + 2}`} className="w-full h-full transition-transform duration-[600ms] group-hover:scale-[1.04]" objectFit="cover" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                    {showOverlay && (
                                        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-1" onClick={(e) => { e.stopPropagation(); onOpen(i + 1); }}>
                                            <span className="text-white text-4xl font-black leading-none">+{extra}</span>
                                            <span className="text-white/80 text-sm font-medium">more</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Floating share / save — top right of gallery */}


            {/* See all photos */}
            <button onClick={() => onOpen(0)} className="absolute bottom-5 right-5 flex items-center gap-2 text-sm font-bold text-black bg-white px-4 py-2.5 rounded-full hover:bg-[#FFC107] transition-colors shadow-lg">
                <Images className="w-4 h-4" />
                See all {images.length} photos
            </button>
        </div>
    );
}

// ─── Branded Fact Cards ────────────────────────────────────────────────────
function FactCards({ location, duration, difficulty, boardingPoint, seats, certificates }: {
    location?: string;
    duration?: string;
    difficulty?: string;
    boardingPoint?: string;
    seats?: string;
    certificates?: string[];
}) {
    const facts = [
        { Icon: MapPinIcon, label: 'Destination', value: location, bg: '#D0EF65' },
        { Icon: ClockIcon, label: 'Duration', value: duration, bg: '#EEA0FF' },
        { Icon: MountainsIcon, label: 'Difficulty', value: difficulty, bg: '#FFD976' },
        { Icon: UsersThreeIcon, label: 'Group Size', value: seats, bg: '#E2F4A6' },
        { Icon: SignpostIcon, label: 'Boarding', value: boardingPoint, bg: '#FFEAB2' },
    ].filter((f): f is { Icon: typeof MapPinIcon; label: string; value: string; bg: string } => !!f.value);

    const certMap: Record<string, { label: string; Icon: typeof GenderFemaleIcon; color: string }> = {
        'female-friendly': { label: 'Female Friendly', Icon: GenderFemaleIcon, color: '#E050FF' },
        'solo-friendly': { label: 'Loved by Solo Travelers', Icon: HeartIcon, color: '#FF5A5F' },
    };
    const certs = (certificates || []).filter(c => certMap[c]);

    if (facts.length === 0 && certs.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-3">
            {facts.map((f, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl pl-2.5 pr-5 py-2.5 hover:-translate-y-0.5 transition-transform" style={{ backgroundColor: f.bg }}>
                    <div className="w-10 h-10 rounded-xl bg-white/55 flex items-center justify-center shrink-0">
                        <f.Icon size={22} />
                    </div>
                    <div>
                        <p className="text-[11px] text-black font-semibold">{f.label}</p>
                        <p className="text-sm font-bold text-black leading-tight">{f.value}</p>
                    </div>
                </div>
            ))}
            {certs.map(c => {
                const data = certMap[c];
                return (
                    <div key={c} className="flex items-center gap-2 rounded-2xl px-4 py-2.5" style={{ backgroundColor: `${data.color}1a` }}>
                        <data.Icon size={20} weight="duotone" style={{ color: data.color }} />
                        <span className="text-sm font-semibold" style={{ color: data.color }}>{data.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Section heading w/ lime underline ─────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-2xl font-black text-black mb-4 relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 rounded-sm z-0" />
            <span className="relative z-10">{children}</span>
        </h2>
    );
}

// ─── Floating Booking Panel ────────────────────────────────────────────────
function BookingPanel({
    displayPrice, sortedBatches, selectedBatch, onSelectBatch, bestTimeToVisit,
    pricingList, selectedPricing, pricingInfoIndex, onSelectPricing, onTogglePricingInfo,
    onBookNow, isBooking, tripTitle, tripSlug, host, onHostPress, seatsLeft,
}: {
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
    onHostPress: () => void;
    seatsLeft?: number;
}) {
    const handleWhatsApp = () => {
        const msg = `https://wondrr.in/trip/${tripSlug}\n\n Hi, I want to book the "${tripTitle}" trip. \nPlease help me confirm my spot.`;
        window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <div className="bg-white rounded-[28px] overflow-hidden shadow-[0_16px_50px_rgba(238,160,255,0.30)]">
            {/* Price header */}
            <div className="bg-[#EEA0FF] px-6 pt-5 pb-6 relative overflow-hidden">
                <Plane className="absolute -right-3 -top-2 w-20 h-20 text-black opacity-[0.07] rotate-[25deg] pointer-events-none" />
                <p className="text-[11px] font-bold text-black/55 uppercase tracking-widest mb-1">Starting from</p>
                <p className="text-[2.1rem] font-black text-black flex items-baseline gap-0.5 leading-none">
                    <CurrencyInrIcon weight="bold" size={26} className="self-center" />
                    {displayPrice}
                    <span className="text-base font-semibold ml-1 text-black/70">/person</span>
                </p>
            </div>

            <div className="p-4 space-y-3.5">
                {sortedBatches.length > 0 && (
                    <BatchSelection batches={sortedBatches} selectedBatch={selectedBatch} onSelect={onSelectBatch} bestTimeToVisit={bestTimeToVisit} />
                )}
                {pricingList.length > 1 && (
                    <TravelOptions pricingList={pricingList} selectedPricing={selectedPricing} pricingInfoIndex={pricingInfoIndex} onSelect={onSelectPricing} onToggleInfo={onTogglePricingInfo} />
                )}
                <Button variant='purple' fullWidth onClick={onBookNow} disabled={isBooking} className='font-semibold'>
                    {isBooking ? 'Redirecting…' : 'Book Now'}
                </Button>
                <Button className='!bg-white flex justify-center gap-2 border border-[#D9D9D9]' onClick={handleWhatsApp} fullWidth>
                    <WhatsappLogoIcon size={24} weight="fill" className='text-[#1ba84e]' />
                    <span className='text-black font-semibold'>Chat with an Expert</span>
                </Button>

                {/* Hosted by */}
                {host && (
                    <div className="border-t-2 border-dashed border-[#f0e8de] pt-3.5">
                        <p className="text-sm font-bold mb-1 pl-1">Hosted by</p>
                        <button onClick={onHostPress} className="flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity group">
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
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function TripDetailDesktop() {
    const params = useParams();
    const slugParam = params.id;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const router = useRouter();
    const id = slug ? (slug.split('-').pop() || slug) : '';

    const [selectedDay, setSelectedDay] = useState(0);
    const [activeSection, setActiveSection] = useState<string>(NAV_SECTION_IDS.OVERVIEW);
    const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({});
    const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 0: true });
    const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
    const [selectedPricing, setSelectedPricing] = useState<number | null>(null);
    const [pricingInfoIndex, setPricingInfoIndex] = useState<number | null>(null);
    const [generatedSlug, setGeneratedSlug] = useState<string>('');
    const [averageRating, setAverageRating] = useState<string>('0');
    const [isBooking, setIsBooking] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const overviewRef = useRef<HTMLDivElement>(null);
    const highlightsRef = useRef<HTMLDivElement>(null);
    const itineraryRef = useRef<HTMLDivElement>(null);
    const inclusionsRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);
    const tripSupportRef = useRef<HTMLDivElement>(null);
    const faqsRef = useRef<HTMLDivElement>(null);
    const cancellationPolicyRef = useRef<HTMLDivElement>(null);
    const refundPolicyRef = useRef<HTMLDivElement>(null);
    const dayRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const { data: basicData, isLoading: isBasicLoading, error } = useTripBasicDetails(id as string);
    const { data: detailedData, isLoading: isDetailedLoading } = useTripDetailedDetails(id as string, true);

    const tripData = useMemo(
        () => basicData ? { ...basicData, ...(detailedData || {}) } as TripData : null,
        [basicData, detailedData]
    );

    const sortedBatches = useMemo(
        () => tripData?.tripBatches ? sortBatchesByDate(tripData.tripBatches) : [],
        [tripData?.tripBatches]
    );

    const selectedBatchData = selectedBatch !== null ? sortedBatches[selectedBatch] ?? null : null;
    const seatsDisplay = selectedBatchData ? getSeatsDisplay(selectedBatchData.totalSeats) : '';

    const boardingPoint = selectedBatchData?.meetingPoint?.length
        ? selectedBatchData.meetingPoint.length === 1
            ? selectedBatchData.meetingPoint[0]
            : `${selectedBatchData.meetingPoint[0]} +${selectedBatchData.meetingPoint.length - 1}`
        : '';

    useEffect(() => {
        if (tripData?.title && slug) {
            const generated = generateSlug(tripData.title, id);
            setGeneratedSlug(generated);
            if (slug !== generated) window.history.replaceState({}, '', `/trip/${generated}`);
        }
    }, [tripData, slug, id]);

    useEffect(() => {
        if (generatedSlug) router.prefetch(`/trip/book/${generatedSlug}`);
    }, [generatedSlug, router]);

    const { isBookmarked, toggle: toggleBookmark } = useBookMarking(id || '', tripData?.isBookmarked ?? false);

    useEffect(() => {
        if (sortedBatches.length > 0) setSelectedBatch(0);
    }, [sortedBatches]);

    useEffect(() => {
        const list = tripData?.pricing?.pricings;
        setSelectedPricing(list?.length ? 0 : null);
    }, [tripData?.pricing]);

    const availableSections = useMemo<NavSection[]>(() => {
        const s: NavSection[] = [{ id: NAV_SECTION_IDS.OVERVIEW, label: 'Overview' }];
        if (tripData?.highlights?.length) s.push({ id: NAV_SECTION_IDS.HIGHLIGHTS, label: 'Highlights' });
        if (tripData?.itinerary?.length) s.push({ id: NAV_SECTION_IDS.ITINERARY, label: 'Itinerary' });
        if (tripData?.inclusions?.length || tripData?.exclusions?.length) s.push({ id: NAV_SECTION_IDS.INCLUSIONS, label: 'Inclusions' });
        if (tripData?.reviews?.length) s.push({ id: NAV_SECTION_IDS.REVIEWS, label: 'Reviews' });
        s.push({ id: NAV_SECTION_IDS.TRIP_SUPPORT, label: 'Trip Support' });
        if (tripData?.faqs?.length) s.push({ id: NAV_SECTION_IDS.FAQS, label: 'FAQs' });
        s.push({ id: NAV_SECTION_IDS.CANCELLATION, label: 'Cancellation' });
        return s;
    }, [tripData]);

    const pricingList = useMemo(() => tripData?.pricing?.pricings || [], [tripData?.pricing]);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);

    const sectionRefs: SectionRefs = {
        overviewRef, highlightsRef, itineraryRef, inclusionsRef,
        reviewsRef, tripSupportRef, faqsRef, cancellationPolicyRef, refundPolicyRef,
    };

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
            [NAV_SECTION_IDS.OVERVIEW]: overviewRef,
            [NAV_SECTION_IDS.HIGHLIGHTS]: highlightsRef,
            [NAV_SECTION_IDS.ITINERARY]: itineraryRef,
            [NAV_SECTION_IDS.INCLUSIONS]: inclusionsRef,
            [NAV_SECTION_IDS.REVIEWS]: reviewsRef,
            [NAV_SECTION_IDS.TRIP_SUPPORT]: tripSupportRef,
            [NAV_SECTION_IDS.FAQS]: faqsRef,
            [NAV_SECTION_IDS.CANCELLATION]: cancellationPolicyRef,
        };
        const ref = refMap[sectionId];
        if (ref?.current) setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    };

    if (isBasicLoading || !tripData) return <Loader />;
    if (error) throw Error(error.message);

    const images = tripData.images || [];

    const displayPrice = selectedPricing !== null && pricingList.length > 0
        ? pricingList[selectedPricing].pricePerPerson.toLocaleString('en-IN')
        : 0;

    const handleShare = () => {
        if (typeof window === 'undefined') return;
        if (navigator.share) navigator.share({ title: tripData.title, text: tripData.description, url: window.location.href });
        else navigator.clipboard?.writeText(window.location.href);
    };

    const handleBookNow = () => {
        if (selectedBatch !== null && sortedBatches[selectedBatch]) {
            setIsBooking(true);
            router.push(`/trip/book/${generatedSlug}?batchId=${sortedBatches[selectedBatch].batchId}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#FCF3EB]">

            {/* ── HERO: gallery first ────────────────────────────── */}
            <section className=" mx-auto px-16">
                {/* Gallery */}
                <DesktopImageGallery
                    images={images}
                    title={tripData.title}
                    onOpen={(i) => setLightboxIndex(i)}
                    isBookmarked={isBookmarked}
                    onShare={handleShare}
                    onToggleBookmark={toggleBookmark}
                />

                {/* Title block (below images) — decorative travel icons around it */}
                <div className="relative overflow-hidden mt-6">
                    <Plane className="absolute right-[10%] w-16 h-16 text-neutral-900 opacity-[0.05] rotate-[20deg] pointer-events-none" />
                    <Compass className="absolute top-10 right-[16%] w-12 h-12 text-neutral-900 opacity-[0.05] -rotate-6 pointer-events-none" />
                    <Sun className="absolute -top-2 right-[30%] w-12 h-12 text-neutral-900 opacity-[0.04] rotate-45 pointer-events-none" />

                    <div className="relative z-10">

                        <div className="flex items-start justify-between gap-6">
                            <div className='flex gap-4 items-center'>
                                <h1 className="text-[2.6rem] leading-[1.08] font-bold text-black max-w-3xl tracking-tight">
                                    {basicData?.title}
                                </h1>
                                <div className="flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-2xl shrink-0">
                                    <StarIcon weight="fill" className="text-[#FFC107]" size={16} />
                                    <span className="font-black">{averageRating}</span>
                                </div>
                            </div>
                            <div className=" top-5 right-5 flex gap-2.5 z-20">
                                <button onClick={(e) => { e.stopPropagation(); handleShare(); }} className="w-11 h-11 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-lg transition-colors">
                                    <Share2 className="w-[18px] h-[18px] text-black" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); toggleBookmark(); }} className="w-11 h-11 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-lg transition-colors">
                                    <Heart className={`w-[18px] h-[18px] transition-colors ${isBookmarked ? 'text-[#FF5A5F] fill-[#FF5A5F]' : 'text-black'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fact cards */}

            </section>

            {/* ── Sticky tab nav ─────────────────────────────────── */}
            <div className="sticky z-30 bg-[#FCF3EB]/95 backdrop-blur border-b-2 border-[#efe7dd] mt-3" style={{ top: `${TAB_NAV_TOP}px` }}>
                <div className="mx-auto px-16 py-3">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {availableSections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`px-4 py-1.5 rounded-full font-bold whitespace-nowrap transition-all text-sm ${activeSection === section.id
                                    ? 'bg-yellow-400 text-black'
                                    : 'border-2 border-yellow-400 text-black hover:bg-yellow-50'
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── TWO COLUMN ─────────────────────────────────────── */}
            <div className="mx-auto px-16 py-8">
                <div className="flex gap-10">

                    {/* Left content */}
                    <div className="flex-1 min-w-0 space-y-7">

                        {/* About / overview */}
                        <div ref={overviewRef} className="scroll-mt-[140px]">
                            <div className=" pb-2">
                                <FactCards
                                    location={basicData?.location}
                                    duration={basicData?.duration}
                                    difficulty={basicData?.difficulty}
                                    boardingPoint={boardingPoint}
                                    seats={seatsDisplay}
                                    certificates={detailedData?.host?.certificates || []}
                                />
                            </div>
                            {/* Group travel highlight */}
                            <div className="mt-5 bg-[#D0EF65] rounded-3xl px-6 py-5 relative overflow-hidden flex items-center gap-4">
                                <UsersThreeIcon className="absolute -right-3 -bottom-4 w-28 h-28 text-black opacity-[0.08] pointer-events-none" weight="duotone" />
                                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center shrink-0">
                                    <UsersThreeIcon size={28} weight="duotone" className="text-[#D0EF65]" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-lg font-semibold text-black leading-tight">Travel with like-minded strangers</p>
                                    <p className="text-sm font-medium text-black/70 mt-0.5">Small, capped groups — solo-friendly, vetted hosts, real connections.</p>
                                </div>
                            </div>
                            {tripData.description && (
                                <CollapsibleCard title='About this trip' className='mt-6'>
                                    <p className="text-[15px] pl-4 pr-6 pb-2 text-justify">
                                        {tripData.description}
                                    </p>
                                </CollapsibleCard>
                            )}

                        </div>

                        {/* Highlights */}
                        {tripData.highlights && tripData.highlights.length > 0 && (
                            <div ref={highlightsRef} className="scroll-mt-[140px]">
                                <TripHighlights highlights={tripData.highlights} />
                            </div>
                        )}

                        {/* Itinerary — override mobile day-strip sticky offset so it parks below desktop tab nav */}
                        {(isDetailedLoading || (tripData.itinerary && tripData.itinerary.length > 0)) && (
                            <div ref={itineraryRef} className="scroll-mt-[140px] [&_.sticky]:!top-[128px] [&_.sticky]:!z-20">
                                <ItinerarySection
                                    itinerary={tripData.itinerary || []}
                                    selectedDay={selectedDay}
                                    expandedDays={expandedDays}
                                    dayRefs={dayRefs}
                                    batchStartDate={
                                        selectedBatch !== null && sortedBatches[selectedBatch]
                                            ? sortedBatches[selectedBatch].startDate || sortedBatches[selectedBatch].startDateTime
                                            : undefined
                                    }
                                    onDaySelect={(index) => {
                                        setSelectedDay(index);
                                        setExpandedDays(prev => ({ ...prev, [index]: true }));
                                        requestAnimationFrame(() => requestAnimationFrame(() => {
                                            const el = dayRefs.current[index];
                                            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 220, behavior: 'smooth' });
                                        }));
                                    }}
                                    onDayToggle={(index) => setExpandedDays(prev => ({ ...prev, [index]: !prev[index] }))}
                                    isLoading={isDetailedLoading}
                                />
                            </div>
                        )}

                        {/* Inclusions */}
                        {((tripData.inclusions?.length ?? 0) > 0 || (tripData.exclusions?.length ?? 0) > 0) && (
                            <div ref={inclusionsRef} className="scroll-mt-[140px]">
                                <InclusionsSection inclusions={tripData.inclusions} exclusions={tripData.exclusions} />
                            </div>
                        )}

                        {/* Reviews */}
                        <div ref={reviewsRef} className="scroll-mt-[140px]">
                            <MobileReviewSection tripId={id} onAverageRatingChange={setAverageRating} />
                        </div>

                        {/* Safety */}
                        <div ref={tripSupportRef} className="scroll-mt-[140px]">
                            <SafetySupportSection />
                        </div>

                        {/* FAQs */}
                        {tripData.faqs && tripData.faqs.length > 0 && (
                            <div ref={faqsRef} className="scroll-mt-[140px]">
                                <FAQsSection
                                    faqs={tripData.faqs}
                                    expandedFaqs={expandedFaqs}
                                    onToggle={(i) => setExpandedFaqs(prev => ({ ...prev, [i]: !prev[i] }))}
                                />
                            </div>
                        )}

                        {/* Cancellation */}
                        <div ref={cancellationPolicyRef} className="scroll-mt-[140px]">
                            <CancellationPolicySection cancellationPolicy={tripData.cancellationPolicy} />
                        </div>
                    </div>

                    {/* Right floating panel */}
                    <div className="w-[390px] shrink-0">
                        <div style={{ position: 'sticky', top: `${PANEL_STICKY_TOP}px` }}>
                            <BookingPanel
                                displayPrice={displayPrice}
                                sortedBatches={sortedBatches}
                                selectedBatch={selectedBatch}
                                onSelectBatch={setSelectedBatch}
                                bestTimeToVisit={basicData?.bestTimeToVisit}
                                pricingList={pricingList}
                                selectedPricing={selectedPricing}
                                pricingInfoIndex={pricingInfoIndex}
                                onSelectPricing={(i) => { setSelectedPricing(i); setPricingInfoIndex(null); }}
                                onTogglePricingInfo={(i) => setPricingInfoIndex(pricingInfoIndex === i ? null : i)}
                                onBookNow={handleBookNow}
                                isBooking={isBooking}
                                tripTitle={tripData.title}
                                tripSlug={id}
                                host={tripData.host}
                                onHostPress={() => tripData.host && router.push(`/${tripData.host.username}`)}
                                seatsLeft={selectedBatchData?.seatsAvailable}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {lightboxIndex !== null && (
                <ImageLightbox images={images} title={tripData.title} initialIndex={lightboxIndex} onClose={closeLightbox} />
            )}
        </div>
    );
}
