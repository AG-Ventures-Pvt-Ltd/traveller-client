'use client'

import { useParams, useRouter } from 'next/navigation';
import { useTripBasicDetails, useTripDetailedDetails } from '../../api';
import { useState, useEffect, useMemo, useRef } from 'react';
import { generateSlug } from '../../utils';
import Loader from "@/common/ui/Loader/Loader";
import { TripData, AvailableDate, ItineraryDay, Review, FAQ } from '../types';
import MyImage from "@/common/ui/Image";
import { Heart, Share2, Check, X } from 'lucide-react';
import { CaretDownIcon } from '@phosphor-icons/react';
import Footer from '../../../(landing)/Footer/Footer';

export default function TripDetailMobile() {
    const params = useParams();
    const slugParam = params.id;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const router = useRouter();
    const id = slug ? (slug.split('-').pop() || slug) : '';
    const [loadDetailed, setLoadDetailed] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const [expandedOverview, setExpandedOverview] = useState(false);
    const [selectedDay, setSelectedDay] = useState(0);
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({});
    const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 0: true });
    const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
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

    // Set default selected batch to closest date
    useEffect(() => {
        if (tripData?.tripBatches && tripData.tripBatches.length > 0) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let closestIndex = 0;
            let closestDifference = Infinity;

            tripData.tripBatches.forEach((batch: AvailableDate, index: number) => {
                const batchDate = new Date(batch.startDate as string);
                batchDate.setHours(0, 0, 0, 0);
                const difference = Math.abs(batchDate.getTime() - today.getTime());

                if (difference < closestDifference) {
                    closestDifference = difference;
                    closestIndex = index;
                }
            });

            setSelectedBatch(closestIndex);
        }
    }, [tripData?.tripBatches]);

    // Build available sections based on data
    const availableSections = useMemo(() => {
        const sections = [{ id: 'overview', label: 'Overview' }];
        if (tripData?.itinerary && tripData.itinerary.length > 0) {
            sections.push({ id: 'itinerary', label: 'Itinerary' });
        }
        if ((tripData?.inclusions && tripData.inclusions.length > 0) || (tripData?.exclusions && tripData.exclusions.length > 0)) {
            sections.push({ id: 'inclusions', label: 'Inclusions' });
        }
        if (tripData?.reviews && tripData.reviews.length > 0) {
            sections.push({ id: 'reviews', label: 'Reviews' });
        }
        if (tripData?.faqs && tripData.faqs.length > 0) {
            sections.push({ id: 'faqs', label: 'FAQs' });
        }
        // Always show cancellation and refund policies (they have static defaults)
        sections.push({ id: 'cancellation', label: 'Cancellation' });
        sections.push({ id: 'refund', label: 'Refund' });
        return sections;
    }, [tripData]);

    // Auto-scroll carousel effect
    useEffect(() => {
        if (!isAutoScrolling || !tripData?.images || tripData.images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => {
                const imageCount = tripData.images?.length || 0;
                return prev === imageCount - 1 ? 0 : prev + 1;
            });
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, [isAutoScrolling, tripData]);

    if (isBasicLoading || !tripData) return <Loader />;

    if (error) {
        throw Error(error.message)
    }

    const images = tripData.images || [];
    const totalImages = images.length;

    const handlePrevImage = () => {
        setIsAutoScrolling(false);
        setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
        setTimeout(() => setIsAutoScrolling(true), 5000); // Resume auto-scroll after 5 seconds
    };

    const handleNextImage = () => {
        setIsAutoScrolling(false);
        setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAutoScrolling(true), 5000); // Resume auto-scroll after 5 seconds
    };

    const handleShare = () => {
        if (typeof window !== 'undefined' && navigator.share) {
            navigator.share({
                title: tripData.title,
                text: tripData.description,
                url: window.location.href,
            });
        }
    };

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const toggleOverview = () => {
        setExpandedOverview(!expandedOverview);
    };

    const handleBookNow = () => {
        if (selectedBatch !== null && tripData.tripBatches && tripData.tripBatches[selectedBatch]) {
            const batchId = tripData.tripBatches[selectedBatch].batchId;
            router.push(`/trip/book/${generatedSlug}/${batchId}`);
        }
    };

    // Static policies data
    const staticCancellationPolicy = [
        { days: 'More than 7 days before', refund: '90% refund' },
        { days: '3-6 days before', refund: '50% refund' },
        { days: 'Less than 3 days before', refund: '10% refund' },
        { days: 'No show', refund: '0% refund' },
    ];

    const staticRefundPolicy = {
        description: 'Refunds are processed within 5-7 business days after cancellation approval.',
        terms: [
            'Cancellation must be made through our booking system',
            'Refunds will be issued to the original payment method',
            'Service fees may not be refundable',
            'Weather-related cancellations by operator receive full refund',
        ],
    };

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
        } catch {
            return dateString;
        }
    };

    // Scroll to section
    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
            overview: overviewRef,
            itinerary: itineraryRef,
            inclusions: inclusionsRef,
            reviews: reviewsRef,
            faqs: faqsRef,
            cancellation: cancellationPolicyRef,
            refund: refundPolicyRef,
        };

        const ref = refs[sectionId];
        if (ref?.current) {
            setTimeout(() => {
                ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 0);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section with Image and Overlays */}
            <div
                className="relative w-full h-90 overflow-hidden"
                onMouseEnter={() => setIsAutoScrolling(false)}
                onMouseLeave={() => setIsAutoScrolling(true)}
            >
                {/* Carousel Images */}
                <div className="relative w-full h-full">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute w-full h-full transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <MyImage
                                src={image || '/placeholder.jpg'}
                                alt={`${tripData.title} - Image ${index + 1}`}
                                className="w-full h-full"
                            />
                        </div>
                    ))}
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Back Button */}
                <div className="absolute top-5 left-5 z-20">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-500 hover:bg-pink-600 transition-colors"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                {/* Action Buttons (Share & Save) */}
                <div className="absolute top-5 right-5 z-20 flex gap-2">
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 transition-colors border border-white/20"
                    >
                        <Share2 className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={toggleBookmark}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 transition-colors border border-white/20"
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors ${isBookmarked ? 'text-red-500 fill-red-500' : 'text-white'
                                }`}
                        />
                    </button>
                </div>

                {/* Image Carousel Progress Indicators */}
                {totalImages > 1 && (
                    <div className="absolute bottom-6 left-0 right-0 z-30 flex gap-2 px-4 justify-center">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className="flex-1 h-1 bg-gray-600/60 rounded-full overflow-hidden shadow-lg cursor-pointer transition-all"
                                onClick={() => {
                                    setCurrentImageIndex(index);
                                    setIsAutoScrolling(false);
                                    setTimeout(() => setIsAutoScrolling(true), 5000);
                                }}
                            >
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white' : 'bg-transparent'
                                        }`}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Navigation Arrows */}
                {totalImages > 1 && (
                    <>
                        <button
                            onClick={handlePrevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors"
                        >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors"
                        >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {/* Content Section */}
            <div className="bg-[#fff9f4] min-h-screen">
                {/* Tab Navigation */}
                <div className="sticky top-0 z-20 bg-[#fff9f4] pt-4 px-4">
                    <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4">
                        {availableSections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`px-3 py-1 rounded-full font-bold text-lg whitespace-nowrap transition-all ${activeSection === section.id
                                        ? 'bg-yellow-400 text-black'
                                        : 'border-2 border-yellow-400 text-black hover:bg-yellow-50'
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-4 pb-32">
                    {/* Hosted By Section */}
                    {tripData.host && (
                        <button
                            onClick={() => router.push(`/${tripData.host?.username}`)}
                            className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity w-full"
                        >
                            <span className="text-md font-medium text-gray-600">Hosted By:</span>
                            {tripData.host.avatar ? (
                                <MyImage
                                    src={tripData.host.avatar}
                                    alt={tripData.host.name}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-xs text-black">
                                    {tripData.host.initials || tripData.host.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <p className="text-md font-semibold text-black">{tripData.host.name}</p>
                        </button>
                    )}

                    {/* Overview Section */}
                    <div ref={overviewRef} className="space-y-6 scroll-mt-24">
                        {/* Design 1: Trip Overview Section */}
                        <div className="bg-[#ededed] border border-[#dcdcdc] rounded-[16px] p-4">
                            <p className="text-md font-medium text-black mb-2">Overview</p>
                            <p className="text-base mb-2 leading-relaxed">
                                {expandedOverview
                                    ? tripData.description
                                    : `${tripData.description?.slice(0, 100)}...`}
                            </p>
                            <button
                                onClick={toggleOverview}
                                className="text-blue-500 hover:text-blue-600 text-xs font-medium underline transition-colors"
                            >
                                {expandedOverview ? 'see less' : 'see more'}
                            </button>
                        </div>

                        {/* Design 2: Departure Date Selector */}
                        {tripData.tripBatches && tripData.tripBatches.length > 0 && (
                            <div className="border border-[#d9d9d9] rounded-[16px] p-4">
                                <p className="text-md font-medium text-black mb-3">Available Departure Dates</p>
                                <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
                                    {tripData.tripBatches.map((batch: AvailableDate, index: number) => {
                                        const startDate = formatDate(batch.startDate as string);
                                        const [day, month] = startDate.split(' ');
                                        const price = batch.price || tripData.basePrice || 0;

                                        return (
                                            <div
                                                key={index}
                                                onClick={() => setSelectedBatch(index)}
                                                className={`flex-shrink-0 border-2 rounded-[14px] p-3 text-center w-20 transition-colors cursor-pointer ${selectedBatch === index
                                                        ? 'border-[#EEA0FF] bg-[#EEA0FF]'
                                                        : 'border-black bg-white hover:bg-yellow-50'
                                                    }`}
                                            >
                                                <p className="text-xs text-gray-600">{month}</p>
                                                <p className="text-sm font-medium">{day}</p>
                                                <p className="text-xs font-medium text-gray-900 mt-1">₹{price.toLocaleString()}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Location Section */}
                        <div>
                            <p className="font-bold text-base mb-2 text-black">Location</p>
                            <p className="text-sm text-gray-700">{tripData.location}</p>
                        </div>
                    </div>

                    {/* Itinerary Section */}
                    {tripData.itinerary && tripData.itinerary.length > 0 && (
                        <div ref={itineraryRef} className="bg-[#e2f4a6] border border-[#d9d9d9] rounded-[16px] scroll-mt-24 mt-6">
                            <div className='bg-[#e2f4a6] rounded-[16px] sticky top-18 z-10 p-4'>
                                <p className="text-md font-medium text-black mb-3">Trip Itinerary</p>
                                <div className="flex gap-2 overflow-x-auto bg-white p-3 rounded-2xl">
                                    {tripData.itinerary.map((_, dayIndex: number) => (
                                        <button
                                            key={dayIndex}
                                            className={`px-3 py-2 rounded-[11px] text-md font-medium whitespace-nowrap transition-all ${selectedDay === dayIndex || dayIndex === 0
                                                    ? 'bg-[#EEA0FF] text-black'
                                                    : 'border border-black text-black hover:bg-gray-100'
                                                }`}
                                            onClick={() => {
                                                setSelectedDay(dayIndex);
                                                setExpandedDays(prev => ({
                                                    ...prev,
                                                    [dayIndex]: true
                                                }));
                                                setTimeout(() => {
                                                    dayRefs.current[dayIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }, 100);
                                            }}
                                        >
                                            Day {dayIndex + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* All Days Content */}
                            <div className="bg-[#e2f4a6] p-4 pt-4 rounded-[16px] space-y-4 relative">                             
                                {tripData.itinerary.map((day: ItineraryDay, dayIndex: number) => (
                                    <div key={dayIndex} className="relative scroll-mt-24 " ref={(el) => { dayRefs.current[dayIndex] = el; }}>
                                        <button
                                            onClick={() => setExpandedDays(prev => ({
                                                ...prev,
                                                [dayIndex]: !prev[dayIndex]
                                            }))}
                                            className="w-full flex items-center justify-between gap-3 hover:opacity-80 transition-opacity"
                                        >
                                            <div className="flex items-center gap-3 ">
                                                <span className="bg-yellow-400 text-black rounded-full px-4 py-2 text-lg font-medium flex-shrink-0 relative">
                                                    Day {day.day}
                                                </span>
                                                <p className="font-bold text-md text-black text-left">{day.title}</p>
                                            </div>
                                            <CaretDownIcon
                                                size={20}
                                                weight="fill"
                                                className={`text-black flex-shrink-0 transition-transform ${
                                                    expandedDays[dayIndex] ? 'transform rotate-180' : ''
                                                }`}
                                            />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            expandedDays[dayIndex] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                            <div className="pl-23 pt-3">
                                                <p className="text-sm text-gray-700 pb-3 border-b border-[#d9d9d9] last:border-b-0">{day.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Inclusions & Exclusions Section */}
                    {((tripData.inclusions && tripData.inclusions.length > 0) || (tripData.exclusions && tripData.exclusions.length > 0)) && (
                        <div ref={inclusionsRef} className="border border-[#d9d9d9] rounded-[16px] p-4 mt-6 scroll-mt-24">
                            <p className="text-md font-medium text-black mb-6">Inclusions & Exclusions</p>

                            {/* Inclusions */}
                            {tripData.inclusions && tripData.inclusions.length > 0 && (
                                <div className="mb-4">
                                    <div className="space-y-2">
                                        {tripData.inclusions.map((item: string, index: number) => (
                                            <div key={`inclusion-${index}`} className="flex items-start gap-2">
                                                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Exclusions */}
                            {tripData.exclusions && tripData.exclusions.length > 0 && (
                                <div>
                                    <div className="space-y-2">
                                        {tripData.exclusions.map((item: string, index: number) => (
                                            <div key={`exclusion-${index}`} className="flex items-start gap-2">
                                                <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Reviews Section */}
                    {tripData.reviews && tripData.reviews.length > 0 && (
                        <div ref={reviewsRef} className="border border-gray-200 rounded-[16px] p-4 mt-6 scroll-mt-24">
                            <p className="text-xs font-medium text-black mb-3">Guest Reviews</p>
                            <div className="space-y-3">
                                {tripData.reviews.slice(0, 3).map((review: Review, index: number) => (
                                    <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="font-medium text-sm text-gray-800">{review.author}</p>
                                            <span className="text-xs text-yellow-500">★ {review.rating}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQs Section */}
                    {tripData.faqs && tripData.faqs.length > 0 && (
                        <div ref={faqsRef} className="bg-[#f5f5f5] border border-[#e0e0e0] rounded-[16px] p-4 mt-6 scroll-mt-24">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-md font-medium text-black">FAQs</p>
                            </div>
                            <div className="space-y-2">
                                {tripData.faqs.map((faq: FAQ, index: number) => (
                                    <div key={index} className="border border-[#d9d9d9] rounded-[12px] overflow-hidden">
                                        <button
                                            onClick={() => setExpandedFaqs(prev => ({
                                                ...prev,
                                                [index]: !prev[index]
                                            }))}
                                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors bg-white"
                                        >
                                            <p className="text-sm text-black font-medium text-left">{faq.question || 'Question for FAQ ?'}</p>
                                            <CaretDownIcon
                                                size={20}
                                                weight="fill"
                                                className={`text-black flex-shrink-0 transition-transform ${expandedFaqs[index] ? 'transform rotate-180' : ''
                                                    }`}
                                            />
                                        </button>
                                        {expandedFaqs[index] && (
                                            <div className="px-4 py-3 bg-white border-t border-[#e0e0e0]">
                                                <p className="text-sm text-gray-700">{faq.answer || ''}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cancellation Policy Section */}
                    <div ref={cancellationPolicyRef} className="bg-yellow-100 border border-yellow-200 rounded-[16px] p-4 mt-6 scroll-mt-24">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-md font-medium text-black">Cancellation Policy</p>
                        </div>
                        <div className="space-y-2">
                            {(tripData.cancellationPolicy || staticCancellationPolicy).map((policy: { days: string; refund: string }, index: number) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-yellow-200 last:border-b-0">
                                    <p className="text-sm text-gray-800">{policy.days}</p>
                                    <p className="text-sm font-bold text-gray-900">{policy.refund}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Refund Policy Section */}
                    <div ref={refundPolicyRef} className="bg-yellow-100 border border-yellow-200 rounded-[16px] p-4 mt-6 scroll-mt-24">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-md font-medium text-black">Refund Policy</p>
                        </div>
                        <div className="space-y-3">
                            <p className="text-sm text-gray-800">{(tripData.refundPolicy || staticRefundPolicy).description}</p>
                            <div className="space-y-2">
                                {(tripData.refundPolicy || staticRefundPolicy).terms.map((term: string, index: number) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <span className="text-sm font-bold text-gray-800 mt-0.5">•</span>
                                        <p className="text-sm text-gray-800">{term}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Bottom Booking CTA */}
                <div className="fixed bottom-0 left-0 right-0 bg-[#EEA0FF] px-4 py-4 flex items-center justify-between shadow-lg rounded-t-3xl z-20">
                    <div>
                        <p className="text-sm font-medium text-black">Last {selectedBatch !== null && tripData.tripBatches ? tripData.tripBatches[selectedBatch]?.seatsAvailable || 0 : 0} seats left !</p>
                        <p className="text-xl font-bold text-black">₹ {selectedBatch !== null && tripData.tripBatches ? tripData.tripBatches[selectedBatch]?.price || tripData.basePrice : tripData.basePrice}/ <span className="text-sm font-medium">person</span></p>
                    </div>
                    <button onClick={handleBookNow} className="bg-black text-white px-4 py-2 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
                        Book Now
                    </button>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}
