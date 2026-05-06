

export const CAROUSEL_AUTO_SCROLL_INTERVAL = 4000;
export const CAROUSEL_RESUME_DELAY = 5000;
export const OVERVIEW_PREVIEW_LENGTH = 100;

export const STATIC_CANCELLATION_POLICY: Array<{ daysBeforeCancellation: string; refundPercentage: string }> = [
    { daysBeforeCancellation: 'More than 7 days before', refundPercentage: '90' },
    { daysBeforeCancellation: '3-6 days before', refundPercentage: '50' },
    { daysBeforeCancellation: 'Less than 3 days before', refundPercentage: '10' },
    { daysBeforeCancellation: 'No show', refundPercentage: '0' },
];

export const STATIC_REFUND_POLICY = {
    description: 'Refunds are processed within 5-7 business days after cancellation approval.',
    terms: [
        'Cancellation must be made through our booking system',
        'Refunds will be issued to the original payment method',
        'Service fees may not be refundable',
        'Weather-related cancellations by operator receive full refund',
    ],
};

export const NAV_SECTION_IDS = {
    OVERVIEW: 'overview',
    ITINERARY: 'itinerary',
    INCLUSIONS: 'inclusions',
    REVIEWS: 'reviews',
    FAQS: 'faqs',
    CANCELLATION: 'cancellation',
    REFUND: 'refund',
} as const;


