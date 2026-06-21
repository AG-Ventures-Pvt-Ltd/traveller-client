export * from '../types';

import { TripData, AvailableDate } from '../../types';
import React from 'react';
import { NavSection } from '../types';

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
}

export interface OverviewSectionProps {
    description: Record<string, string | string[] | boolean>;
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
    selectedPricing: number | null;
    pricingList: Pricing[];
    basePrice?: number;
    onBookNow: () => void;
}
