export type TripStatus = 'upcoming' | 'completed' | 'cancelled'
export type PaymentStatus = 'paid' | 'pending' | 'failed'

export interface BookedTrip {
  slug: string
  image: string
  title: string
  organizer: string
  bookedOn: string
  travelerName: string
  extraTravelers: number
  amount: number
  status: TripStatus
  paymentStatus: PaymentStatus
  tripDate: string
  hasFilledDetails: boolean
  hasReview: boolean
}

export const BOOKED_TRIPS: BookedTrip[] = [
  {
    slug: '1',
    image: '/development/ZpkjJP0W.png',
    title: 'Manali Kasol Getaway Title extends like this and for',
    organizer: 'Cliffseas Travels',
    bookedOn: '20th April, 2026',
    travelerName: 'Shreyansh A.',
    extraTravelers: 2,
    amount: 8000,
    status: 'upcoming',
    paymentStatus: 'paid',
    tripDate: '23rd April, 2026',
    hasFilledDetails: true,
    hasReview: false,
  },
  {
    slug: '2',
    image: '/development/ZpkjJP0W.png',
    title: 'Goa Beach Escape – Sunsets, Seafood & Serenity',
    organizer: 'Wanderlust Co.',
    bookedOn: '10th March, 2026',
    travelerName: 'Shreyansh A.',
    extraTravelers: 1,
    amount: 12500,
    status: 'upcoming',
    paymentStatus: 'pending',
    tripDate: '5th May, 2026',
    hasFilledDetails: false,
    hasReview: false,
  },
  {
    slug: '3',
    image: '/development/ZpkjJP0W.png',
    title: 'Rajasthan Royal Heritage Tour',
    organizer: 'Heritage Trails',
    bookedOn: '1st Jan, 2026',
    travelerName: 'Shreyansh A.',
    extraTravelers: 0,
    amount: 15000,
    status: 'completed',
    paymentStatus: 'paid',
    tripDate: '15th Feb, 2026',
    hasFilledDetails: true,
    hasReview: false,
  },
  {
    slug: '4',
    image: '/development/ZpkjJP0W.png',
    title: 'Kerala Backwaters & Ayurveda Retreat',
    organizer: 'Green Escapes',
    bookedOn: '5th Dec, 2025',
    travelerName: 'Shreyansh A.',
    extraTravelers: 3,
    amount: 9800,
    status: 'completed',
    paymentStatus: 'paid',
    tripDate: '20th Jan, 2026',
    hasFilledDetails: true,
    hasReview: true,
  },
  {
    slug: '5',
    image: '/development/ZpkjJP0W.png',
    title: 'Ladakh Adventure Circuit – High Passes & Lakes',
    organizer: 'Altitude Tours',
    bookedOn: '18th Feb, 2026',
    travelerName: 'Shreyansh A.',
    extraTravelers: 1,
    amount: 22000,
    status: 'cancelled',
    paymentStatus: 'failed',
    tripDate: '10th April, 2026',
    hasFilledDetails: false,
    hasReview: false,
  },
  {
    slug: '6',
    image: '/development/ZpkjJP0W.png',
    title: 'Coorg Coffee Trails & Misty Mountains',
    organizer: 'Nature Nooks',
    bookedOn: '2nd April, 2026',
    travelerName: 'Shreyansh A.',
    extraTravelers: 0,
    amount: 6500,
    status: 'upcoming',
    paymentStatus: 'paid',
    tripDate: '12th May, 2026',
    hasFilledDetails: false,
    hasReview: false,
  },
]
