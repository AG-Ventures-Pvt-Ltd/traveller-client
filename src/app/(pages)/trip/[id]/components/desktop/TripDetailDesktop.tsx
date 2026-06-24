'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useTripBasicDetails, useTripDetailedDetails } from '../../../api';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { generateSlug } from '../../../utils';
import Loader from '@/common/ui/Loader/Loader';
import { TripData } from '../../types';
import { sortBatchesByDate } from '../utils';
import { NAV_SECTION_IDS, PANEL_STICKY_TOP } from '../constants';
import { NavSection } from '../types';
import { getSeatsDisplay } from '@/common/utils/seatsDisplay';
import {
    StarIcon, UsersThreeIcon,
} from '@phosphor-icons/react';
import { Heart, Share2, Plane, Compass, Sun } from 'lucide-react';
import { useBookMarking } from '@/common/hooks/useBookMarking';
import { trackEvent, getFunnelSource } from '@/common/utils/analytics';
import CollapsibleCard from '@/common/ui/CollapsibleCard';

const ImageLightbox = dynamic(() => import('./components/ImageLightbox'), { ssr: false });
import DesktopImageGallery from './components/DesktopImageGallery';
import FactCards from './components/FactCards';
import BookingPanel from './components/BookingPanel';
import SectionTabNav from './components/SectionTabNav';

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
const Footer = dynamic(() => import('../../../../(landing)/components/Footer/Footer'), { ssr: false });

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
            const batchId = sortedBatches[selectedBatch].batchId;
            trackEvent('book_now_click', {
                trip_id: id,
                trip_title: tripData?.title,
                batch_id: batchId,
                funnel_source: getFunnelSource(),
            });
            setIsBooking(true);
            router.push(`/trip/book/${generatedSlug}?batchId=${batchId}`);
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
            </section>

            {/* ── Sticky tab nav ─────────────────────────────────── */}
            <SectionTabNav
                sections={availableSections}
                activeSection={activeSection}
                onSectionClick={scrollToSection}
            />

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
                                <CollapsibleCard title='Vibe of the trip' className='mt-6'>
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
