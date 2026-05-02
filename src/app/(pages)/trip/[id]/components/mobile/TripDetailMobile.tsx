'use client'

import { useParams, useRouter } from 'next/navigation';
import { useTripBasicDetails, useTripDetailedDetails } from '../../../api';
import { useState, useEffect, useMemo, useRef } from 'react';
import { generateSlug } from '../../../utils';
import Loader from '@/common/ui/Loader/Loader';
import { TripData } from '../../types';
import Footer from '../../../../(landing)/Footer/Footer';
import HeroCarousel from './components/HeroCarousel';
import TabNavigation from './components/TabNavigation';
import TripHighlights from './components/TripHighlights';
import HostedBy from './components/HostedBy';
import OverviewSection from './components/OverviewSection';
import BatchSelection from './components/BatchSelection';
import TravelOptions from './components/TravelOptions';
import ItinerarySection from './components/ItinerarySection';
import InclusionsSection from './components/InclusionsSection';
import ReviewsSection from './components/ReviewsSection';
import FAQsSection from './components/FAQsSection';
import { CancellationPolicySection } from './components/PoliciesSection';
import BookingBar from './components/BookingBar';
import { sortBatchesByDate } from './utils';
import { NAV_SECTION_IDS } from './constants';
import { NavSection, SectionRefs } from './types';
import { getSeatsDisplay } from '@/common/utils/seatsDisplay';
import { StarIcon } from '@phosphor-icons/react';


export default function TripDetailMobile() {

    const params = useParams();
    const slugParam = params.id;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const router = useRouter();
    const id = slug ? (slug.split('-').pop() || slug) : '';
    const [loadDetailed, setLoadDetailed] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [expandedOverview, setExpandedOverview] = useState(false);
    const [selectedDay, setSelectedDay] = useState(0);
    const [activeSection, setActiveSection] = useState<string>(NAV_SECTION_IDS.OVERVIEW);
    const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({});
    const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 0: true });
    const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
    const [selectedPricing, setSelectedPricing] = useState<number | null>(null);
    const [pricingInfoIndex, setPricingInfoIndex] = useState<number | null>(null);
    const [generatedSlug, setGeneratedSlug] = useState<string>('');

    // Section refs for smooth scrolling
    const overviewRef = useRef<HTMLDivElement>(null);
    const itineraryRef = useRef<HTMLDivElement>(null);
    const inclusionsRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);
    const faqsRef = useRef<HTMLDivElement>(null);
    const cancellationPolicyRef = useRef<HTMLDivElement>(null);
    const refundPolicyRef = useRef<HTMLDivElement>(null);
    const dayRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const { data: basicData, isLoading: isBasicLoading, error } = useTripBasicDetails(id as string);
    const { data: detailedData } = useTripDetailedDetails(id as string, loadDetailed);

    useEffect(() => {
        if (basicData && !loadDetailed) {
            setLoadDetailed(true);
        }
    }, [basicData, loadDetailed]);

    const tripData = useMemo(() => basicData ? { ...basicData, ...(detailedData || {}) } as TripData : null, [basicData, detailedData]);

    const sortedBatches = useMemo(
        () => tripData?.tripBatches ? sortBatchesByDate(tripData.tripBatches) : [],
        [tripData?.tripBatches]
    );

    const selectedBatchData = selectedBatch !== null && sortedBatches[selectedBatch] ? sortedBatches[selectedBatch] : null;
    const seatsDisplay = selectedBatchData ? getSeatsDisplay(selectedBatchData.seatsAvailable) : '';

    useEffect(() => {
        if (tripData && tripData.title && slug) {
            const slug_generated = generateSlug(tripData.title, id);
            setGeneratedSlug(slug_generated);
            if (slug !== slug_generated) {
                router.replace(`/trip/${slug_generated}`);
            }
        }
    }, [tripData, slug, router, id]);

    useEffect(() => {
        if (tripData?.isBookmarked !== undefined) {
            setIsBookmarked(tripData.isBookmarked);
        }
    }, [tripData?.isBookmarked]);

    // Set default selected batch to first (earliest) batch
    useEffect(() => {
        if (sortedBatches.length > 0) {
            setSelectedBatch(0);
        }
    }, [sortedBatches]);

    // Set default selected pricing when trip data loads
    useEffect(() => {
        const pricingList = tripData?.pricing.pricings
        if (pricingList && pricingList.length > 0) {
            setSelectedPricing(0);
        } else {
            setSelectedPricing(null);
        }
    }, [tripData?.pricing, tripData?.pricings]);

    // Build available sections based on data
    const availableSections = useMemo<NavSection[]>(() => {
        const sections: NavSection[] = [{ id: NAV_SECTION_IDS.OVERVIEW, label: 'Overview' }];
        if (tripData?.itinerary && tripData.itinerary.length > 0) {
            sections.push({ id: NAV_SECTION_IDS.ITINERARY, label: 'Itinerary' });
        }
        if ((tripData?.inclusions && tripData.inclusions.length > 0) || (tripData?.exclusions && tripData.exclusions.length > 0)) {
            sections.push({ id: NAV_SECTION_IDS.INCLUSIONS, label: 'Inclusions' });
        }
        if (tripData?.reviews && tripData.reviews.length > 0) {
            sections.push({ id: NAV_SECTION_IDS.REVIEWS, label: 'Reviews' });
        }
        if (tripData?.faqs && tripData.faqs.length > 0) {
            sections.push({ id: NAV_SECTION_IDS.FAQS, label: 'FAQs' });
        }
        sections.push({ id: NAV_SECTION_IDS.CANCELLATION, label: 'Cancellation' });
        sections.push({ id: NAV_SECTION_IDS.REFUND, label: 'Refund' });
        return sections;
    }, [tripData]);

    if (isBasicLoading || !tripData) return <Loader />;

    if (error) {
        throw Error(error.message);
    }

    const images = tripData.images || [];
    const pricingList = tripData.pricing.pricings || tripData.pricings || [];

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
        overviewRef, itineraryRef, inclusionsRef, reviewsRef, faqsRef, cancellationPolicyRef, refundPolicyRef,
    };

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
            [NAV_SECTION_IDS.OVERVIEW]: sectionRefs.overviewRef,
            [NAV_SECTION_IDS.ITINERARY]: sectionRefs.itineraryRef,
            [NAV_SECTION_IDS.INCLUSIONS]: sectionRefs.inclusionsRef,
            [NAV_SECTION_IDS.REVIEWS]: sectionRefs.reviewsRef,
            [NAV_SECTION_IDS.FAQS]: sectionRefs.faqsRef,
            [NAV_SECTION_IDS.CANCELLATION]: sectionRefs.cancellationPolicyRef,
            [NAV_SECTION_IDS.REFUND]: sectionRefs.refundPolicyRef,
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
                onToggleBookmark={() => setIsBookmarked(!isBookmarked)}
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
                            <span className='font-bold'>{detailedData?.rating}<span className='font-normal'> ({detailedData?.totalReviews})</span></span>
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
                        <OverviewSection
                            description={{ destination : basicData?.location?.split(',')[0] || '', seats : seatsDisplay ,  }}
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
                        <div className="px-4 py-4 mt-6 border border-[#D9D9D9] rounded-2xl">
                            <TripHighlights highlights={tripData.highlights} />
                        </div>
                    )}
                    {tripData.itinerary && tripData.itinerary.length > 0 && (
                        <div ref={itineraryRef} className="scroll-mt-24 mb-6">
                            <ItinerarySection
                                itinerary={tripData.itinerary}
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
                            />
                        </div>
                    )}
                    {tripData?.host && (
                        <HostedBy
                            host={tripData.host}
                            onPress={() => router.push(`/${tripData.host!.username}`)}
                        />
                    )}
                    {((tripData.inclusions && tripData.inclusions.length > 0) || (tripData.exclusions && tripData.exclusions.length > 0)) && (
                        <div ref={inclusionsRef} className="scroll-mt-24">
                            <InclusionsSection
                                inclusions={tripData.inclusions}
                                exclusions={tripData.exclusions}
                            />
                        </div>
                    )}

                    {tripData.reviews && tripData.reviews.length > 0 && (
                        <div ref={reviewsRef} className="scroll-mt-24">
                            <ReviewsSection reviews={tripData.reviews} />
                        </div>
                    )}

                    {tripData.faqs && tripData.faqs.length > 0 && (
                        <div ref={faqsRef} className="scroll-mt-24">
                            <FAQsSection
                                faqs={tripData.faqs}
                                expandedFaqs={expandedFaqs}
                                onToggle={(index) => setExpandedFaqs(prev => ({ ...prev, [index]: !prev[index] }))}
                            />
                        </div>
                    )}

                    <div ref={cancellationPolicyRef} className="scroll-mt-24">
                        <CancellationPolicySection cancellationPolicy={tripData.cancellationPolicy} />
                    </div>
                </div>

                <BookingBar
                    selectedBatch={selectedBatch}
                    batches={sortedBatches}
                    selectedPricing={selectedPricing}
                    pricingList={pricingList}
                    basePrice={tripData.basePrice}
                    onBookNow={handleBookNow}
                />

                <Footer />
            </div>
        </div>
    );
}
