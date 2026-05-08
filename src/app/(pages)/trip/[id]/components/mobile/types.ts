import React from 'react';
import { TripData, AvailableDate } from '../../types';

export interface NavSection {
    id: string;
    label: string;
}

export interface SectionRefs {
    overviewRef: React.RefObject<HTMLDivElement | null>;
    highlightsRef: React.RefObject<HTMLDivElement | null>;
    itineraryRef: React.RefObject<HTMLDivElement | null>;
    inclusionsRef: React.RefObject<HTMLDivElement | null>;
    reviewsRef: React.RefObject<HTMLDivElement | null>;
    tripSupportRef: React.RefObject<HTMLDivElement | null>;
    faqsRef: React.RefObject<HTMLDivElement | null>;
    cancellationPolicyRef: React.RefObject<HTMLDivElement | null>;
    refundPolicyRef: React.RefObject<HTMLDivElement | null>;
}

export interface HeroCarouselProps {
    images: string[];
    title: string;
    isBookmarked: boolean;
    onBack: () => void;
    onShare: () => void;
    onToggleBookmark: () => void;
}

export interface TabNavigationProps {
    sections: NavSection[];
    activeSection: string;
    onSectionClick: (sectionId: string) => void;
}

export interface HostedByProps {
    host: NonNullable<TripData['host']>;
    onPress: () => void;
}

export interface OverviewSectionProps {
    description: Record<string, string>;
    expanded: boolean;
    onToggle: () => void;
}

export interface BatchSelectionProps {
    batches: AvailableDate[];
    selectedBatch: number | null;
    onSelect: (index: number) => void;
    bestTimeToVisit?: string;
}

export interface Pricing {
    label: string;
    description: string;
    pricePerPerson: number;
}

export interface TravelOptionsProps {
    pricingList: Pricing[];
    selectedPricing: number | null;
    pricingInfoIndex: number | null;
    onSelect: (index: number) => void;
    onToggleInfo: (index: number) => void;
}

export interface ItinerarySectionProps {
    itinerary: NonNullable<TripData['itinerary']> | [];
    selectedDay: number;
    expandedDays: Record<number, boolean>;
    dayRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
    batchStartDate?: string | Date;
    onDaySelect: (index: number) => void;
    onDayToggle: (index: number) => void;
    isLoading?: boolean;
}

export interface InclusionsSectionProps {
    inclusions?: string[];
    exclusions?: string[];
}

export interface ReviewsSectionProps {
    reviews: NonNullable<TripData['reviews']>;
}

export interface FAQsSectionProps {
    faqs: NonNullable<TripData['faqs']>;
    expandedFaqs: Record<number, boolean>;
    onToggle: (index: number) => void;
}

export interface PoliciesSectionProps {
    cancellationPolicy?: TripData['cancellationPolicy'];
    refundPolicy?: TripData['refundPolicy'];
}

export interface BookingBarProps {
    selectedBatch: number | null;
    batches?: AvailableDate[];
    selectedPricing: number | null;
    pricingList: Pricing[];
    basePrice?: number;
    onBookNow: () => void;
}
