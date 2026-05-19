'use client'

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useTripBasicDetails, useTripDetailedDetails } from '../../../api';
import { useState, useEffect, useMemo, useRef } from 'react';
import { generateSlug } from '../../../utils';
import Loader from '@/common/ui/Loader/Loader';
import { TripData } from '../../types';
import { sortBatchesByDate } from './utils';
import { NAV_SECTION_IDS } from './constants';
import { NavSection, SectionRefs } from './types';
import { getSeatsDisplay } from '@/common/utils/seatsDisplay';
import { StarIcon } from '@phosphor-icons/react';
import { useBookMarking } from '@/common/hooks/useBookMarking';

// Above-fold — static imports
import HeroCarousel from './components/HeroCarousel';
import TabNavigation from './components/TabNavigation';
import BatchSelection from './components/BatchSelection';
import HostedBy from './components/HostedBy';
import OverviewSection from './components/OverviewSection';
import TravelOptions from './components/TravelOptions';
import BookingBar from '@/app/(pages)/trip/common/ui/BookingBar';
import WhatsAppButton from './components/WhatsAppButton';

// Below-fold — lazy loaded so initial render is lean
const TripHighlights = dynamic(() => import('./components/TripHighlights'), { ssr: false });
const ItinerarySection = dynamic(() => import('./components/ItinerarySection'), { ssr: false });
const InclusionsSection = dynamic(() => import('./components/InclusionsSection'), { ssr: false });
const FAQsSection = dynamic(() => import('./components/FAQsSection'), { ssr: false });
const CancellationPolicySection = dynamic(
    () => import('./components/PoliciesSection').then(m => ({ default: m.CancellationPolicySection })),
    { ssr: false }
);
const MobileReviewSection = dynamic(
    () => import('@/app/(pages)/[id]/components/mobile/components/MobileReviewSection').then(m => ({ default: m.MobileReviewSection })),
    { ssr: false }
);
const SafetySupportSection = dynamic(() => import('./components/SafetySupportSection'), { ssr: false });
const Footer = dynamic(() => import('../../../../(landing)/Footer/Footer'), { ssr: false });


export default function TripDetailMobile() {

    const params = useParams();
    const slugParam = params.id;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const router = useRouter();
    const id = slug ? (slug.split('-').pop() || slug) : '';
    const [expandedOverview, setExpandedOverview] = useState(false);
    const [selectedDay, setSelectedDay] = useState(0);
    const [activeSection, setActiveSection] = useState<string>(NAV_SECTION_IDS.OVERVIEW);
    const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({});
    const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 0: true });
    const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
    const [selectedPricing, setSelectedPricing] = useState<number | null>(null);
    const [pricingInfoIndex, setPricingInfoIndex] = useState<number | null>(null);
    const [generatedSlug, setGeneratedSlug] = useState<string>('');
    const [averageRating, setAverageRating] = useState<string>('0');

    // Section refs for smooth scrolling
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

    const tripData = useMemo(() => basicData ? { ...basicData, ...(detailedData || {}) } as TripData : null, [basicData, detailedData]);

    const sortedBatches = useMemo(
        () => tripData?.tripBatches ? sortBatchesByDate(tripData.tripBatches) : [],
        [tripData?.tripBatches]
    );

    const selectedBatchData = selectedBatch !== null && sortedBatches[selectedBatch] ? sortedBatches[selectedBatch] : null;
    const seatsDisplay = selectedBatchData ? getSeatsDisplay(selectedBatchData.totalSeats) : '';

    const boardingPoint = selectedBatchData?.meetingPoint && selectedBatchData.meetingPoint.length > 0
        ? selectedBatchData.meetingPoint.length === 1
            ? selectedBatchData.meetingPoint[0]
            : `${selectedBatchData.meetingPoint[0]} +${selectedBatchData.meetingPoint.length - 1}`
        : '';

    useEffect(() => {
        if (tripData && tripData.title && slug) {
            const slug_generated = generateSlug(tripData.title, id);

            setGeneratedSlug(slug_generated);

            if (slug !== slug_generated) {
                window.history.replaceState(
                    {},
                    '',
                    `/trip/${slug_generated}`
                );
            }
        }
    }, [tripData, slug, id]);

    const { isBookmarked, toggle: toggleBookmark } = useBookMarking(id || '', tripData?.isBookmarked ?? false);

    useEffect(() => {
        if (sortedBatches.length > 0) {
            setSelectedBatch(0);
        }
    }, [sortedBatches]);

    useEffect(() => {
        const pricingList = tripData?.pricing.pricings
        if (pricingList && pricingList.length > 0) {
            setSelectedPricing(0);
        } else {
            setSelectedPricing(null);
        }
    }, [tripData?.pricing]);

    // Build available sections based on data
    const availableSections = useMemo<NavSection[]>(() => {
        const sections: NavSection[] = [{ id: NAV_SECTION_IDS.OVERVIEW, label: 'Overview' }];

        if (tripData?.highlights && tripData.highlights.length > 0) {
            sections.push({ id: NAV_SECTION_IDS.HIGHLIGHTS, label: 'Highlights' });
        }

        if (tripData?.itinerary && tripData.itinerary.length > 0) {
            sections.push({ id: NAV_SECTION_IDS.ITINERARY, label: 'Itinerary' });
        }

        if ((tripData?.inclusions && tripData.inclusions.length > 0) || (tripData?.exclusions && tripData.exclusions.length > 0)) {
            sections.push({ id: NAV_SECTION_IDS.INCLUSIONS, label: 'Inclusions' });
        }

        if (tripData?.reviews && tripData.reviews.length > 0) {
            sections.push({ id: NAV_SECTION_IDS.REVIEWS, label: 'Reviews' });
        }

        sections.push({ id: NAV_SECTION_IDS.TRIP_SUPPORT, label: 'Trip Support' });

        if (tripData?.faqs && tripData.faqs.length > 0) {
            sections.push({ id: NAV_SECTION_IDS.FAQS, label: 'FAQs' });
        }

        sections.push({ id: NAV_SECTION_IDS.CANCELLATION, label: 'Cancellation' });
        return sections;
    }, [tripData]);


    const pricingList = useMemo(() => {
        return tripData?.pricing?.pricings || [];
    }, [tripData?.pricing]);

    if (isBasicLoading || !tripData) return <Loader />;

    if (error) {
        throw Error(error.message);
    }

    const images = tripData.images || [];

    const displayPrice = selectedPricing !== null && pricingList.length > 0
        ? pricingList[selectedPricing].pricePerPerson.toLocaleString('en-IN')
        : 0;

    const handleShare = () => {
        if (typeof window !== 'undefined' && navigator.share) {
            navigator.share({ title: tripData.title, text: tripData.description, url: window.location.href });
        }
    };

    const handleBookNow = () => {
        if (selectedBatch !== null && sortedBatches[selectedBatch]) {
            const batchId = sortedBatches[selectedBatch].batchId;
            router.push(`/trip/book/${generatedSlug}?batchId=${batchId}`);
        }
    };

    const sectionRefs: SectionRefs = {
        overviewRef, highlightsRef, itineraryRef, inclusionsRef, reviewsRef, tripSupportRef, faqsRef, cancellationPolicyRef, refundPolicyRef,
    };

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
            [NAV_SECTION_IDS.OVERVIEW]: sectionRefs.overviewRef,
            [NAV_SECTION_IDS.HIGHLIGHTS]: sectionRefs.highlightsRef,
            [NAV_SECTION_IDS.ITINERARY]: sectionRefs.itineraryRef,
            [NAV_SECTION_IDS.INCLUSIONS]: sectionRefs.inclusionsRef,
            [NAV_SECTION_IDS.REVIEWS]: sectionRefs.reviewsRef,
            [NAV_SECTION_IDS.TRIP_SUPPORT]: sectionRefs.tripSupportRef,
            [NAV_SECTION_IDS.FAQS]: sectionRefs.faqsRef,
            [NAV_SECTION_IDS.CANCELLATION]: sectionRefs.cancellationPolicyRef,
        };
        const ref = refMap[sectionId];
        if (ref?.current) {
            setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <HeroCarousel
                images={images}
                title={tripData.title}
                isBookmarked={isBookmarked}
                onBack={() => router.back()}
                onShare={handleShare}
                onToggleBookmark={toggleBookmark}
            />
            <div className="bg-[#fff9f4] min-h-screen">
                <TabNavigation
                    sections={availableSections}
                    activeSection={activeSection}
                    onSectionClick={scrollToSection}
                />

                <div className='px-6'>
                    <div className='flex justify-between'>
                        <p className='font-bold text-2xl'>{basicData?.title}</p>
                        <div className='bg-[#616161] text-white flex items-center my-0 px-2 rounded-xl'>
                            <StarIcon weight='fill' className='text-[#FFC107] mr-1' />
                            <span className='font-bold'>{averageRating}
                                {/* <span className='font-normal'> ({detailedData?.totalReviews})</span> */}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-4 pb-32">

                    <div ref={overviewRef} className="space-y-6 scroll-mt-24">
                        {sortedBatches.length > 0 && (
                            <BatchSelection
                                batches={sortedBatches}
                                selectedBatch={selectedBatch}
                                onSelect={setSelectedBatch}
                                bestTimeToVisit={basicData?.bestTimeToVisit}
                            />
                        )}
                        {tripData?.host && (
                            <HostedBy
                                host={tripData.host}
                                onPress={() => router.push(`/${tripData.host!.username}`)}
                            />
                        )}
                        <OverviewSection
                            description={{
                                destination: basicData?.location?.split(',')[0] || '',
                                seats: seatsDisplay,
                                duration: basicData?.duration || "",
                                difficulty: basicData?.difficulty || "",
                                boardingPoint,
                                certificates: detailedData?.host?.certificates || []
                            }}
                            expanded={expandedOverview}
                            onToggle={() => setExpandedOverview(!expandedOverview)}
                        />

                        <div className="space-y-4">
                            {pricingList.length > 1 && (
                                <TravelOptions
                                    pricingList={pricingList}
                                    selectedPricing={selectedPricing}
                                    pricingInfoIndex={pricingInfoIndex}
                                    onSelect={(index) => { setSelectedPricing(index); setPricingInfoIndex(null); }}
                                    onToggleInfo={(index) => setPricingInfoIndex(pricingInfoIndex === index ? null : index)}
                                />
                            )}
                        </div>
                    </div>
                    {tripData.highlights && tripData.highlights.length > 0 && (
                        <div ref={highlightsRef} className="scroll-mt-20">
                            <TripHighlights highlights={tripData.highlights} />
                        </div>
                    )}
                    {(isDetailedLoading || (tripData.itinerary && tripData.itinerary.length > 0)) && (
                        <div ref={itineraryRef} className="scroll-mt-20 mb-6">
                            <ItinerarySection
                                itinerary={tripData.itinerary || []}
                                selectedDay={selectedDay}
                                expandedDays={expandedDays}
                                dayRefs={dayRefs}
                                batchStartDate={selectedBatch !== null && sortedBatches[selectedBatch] ? sortedBatches[selectedBatch].startDate || sortedBatches[selectedBatch].startDateTime : undefined}
                                onDaySelect={(index) => {
                                    setSelectedDay(index);
                                    setExpandedDays(prev => ({ ...prev, [index]: true }));
                                    requestAnimationFrame(() => {
                                        requestAnimationFrame(() => {
                                            const el = dayRefs.current[index];
                                            const stickyHeight = 176;
                                            if (el) {
                                                const top = el.getBoundingClientRect().top + window.scrollY - stickyHeight - 16;
                                                window.scrollTo({ top, behavior: 'smooth' });
                                            }
                                        });
                                    });
                                }}
                                onDayToggle={(index) => setExpandedDays(prev => ({ ...prev, [index]: !prev[index] }))}
                                isLoading={isDetailedLoading}
                            />
                        </div>
                    )}

                    {((tripData.inclusions && tripData.inclusions.length > 0) || (tripData.exclusions && tripData.exclusions.length > 0)) && (
                        <div ref={inclusionsRef} className="scroll-mt-20">
                            <InclusionsSection
                                inclusions={tripData.inclusions}
                                exclusions={tripData.exclusions}
                            />
                        </div>
                    )}
                    <div ref={reviewsRef} className='scroll-mt-20 mt-6'>
                        <MobileReviewSection tripId={id} onAverageRatingChange={setAverageRating} />
                    </div>

                    <div ref={tripSupportRef} className="scroll-mt-20 my-6">
                        <SafetySupportSection />
                    </div>

                    {tripData.faqs && tripData.faqs.length > 0 && (
                        <div ref={faqsRef} className="scroll-mt-20">
                            <FAQsSection
                                faqs={tripData.faqs}
                                expandedFaqs={expandedFaqs}
                                onToggle={(index) => setExpandedFaqs(prev => ({ ...prev, [index]: !prev[index] }))}
                            />
                        </div>
                    )}

                    <div ref={cancellationPolicyRef} className="scroll-mt-20">
                        <CancellationPolicySection cancellationPolicy={tripData.cancellationPolicy} />
                    </div>
                </div>

                <WhatsAppButton
                    tripTitle={tripData.title}
                    tripSlug={id}
                    className="bottom-[104px]"
                />

                <BookingBar
                    displayPrice={displayPrice}
                    onBookNow={handleBookNow}
                />

                <Footer />
            </div>
        </div>
    );
}
