import React from 'react';

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
