import { HostProfile, Achievement, PerformanceMetric, Trip, Review, RatingDistribution } from "./types";

export const MOCK_HOST_PROFILE: HostProfile = {
  id: "1",
  name: "AlUla Tours & Adventures",
  initials: "AT",
  tagline: "Licensed Tour Operator • Since 2018",
  description:
    "We are a locally-owned tour company specializing in authentic desert experiences. Our certified guides are passionate about sharing the beauty and history of AlUla with travelers from around the world. With years of experience and deep local knowledge, we create unforgettable journeys that connect you with the heart of Arabia.",
  stats: {
    yearsWithPlatform: 3,
    successfulTrips: 847,
    happyGuests: 2341,
  },
  rating: 4.9,
  reviewCount: 412,
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    icon: "award",
    title: "Top Rated Host",
    description: "Maintained 4.9+ rating",
  },
  {
    id: "2",
    icon: "verified",
    title: "Verified Operator",
    description: "Licensed & insured",
  },
  {
    id: "3",
    icon: "trophy",
    title: "Superhost 2024",
    description: "Excellence award",
  },
  {
    id: "4",
    icon: "message",
    title: "Quick Responder",
    description: "< 1 hour response time",
  },
];

export const PERFORMANCE_METRICS: PerformanceMetric[] = [
  {
    id: "1",
    icon: "chart",
    value: "98%",
    label: "Response Rate",
    description: "Replies to inquiries quickly",
  },
  {
    id: "2",
    icon: "clock",
    value: "< 1 hour",
    label: "Response Time",
    description: "Average time to respond",
  },
  {
    id: "3",
    icon: "check",
    value: "99%",
    label: "Confirmation Rate",
    description: "Accepts most bookings",
  },
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: "1",
    title: "Desert Journey Through AlUla",
    location: "AlUla, Saudi Arabia",
    category: "Adventure",
    rating: 4.8,
    reviewCount: 127,
    duration: "4-5 hours",
    price: 89,
    imageUrl: "https://placehold.co/436x240",
  },
  {
    id: "2",
    title: "Ancient Wonders of Hegra",
    location: "AlUla, Saudi Arabia",
    category: "Cultural",
    rating: 4.9,
    reviewCount: 94,
    duration: "6-7 hours",
    price: 129,
    imageUrl: "https://placehold.co/436x240",
  },
  {
    id: "3",
    title: "Sunset Rock Formations Tour",
    location: "AlUla, Saudi Arabia",
    category: "Photography",
    rating: 4.7,
    reviewCount: 83,
    duration: "3-4 hours",
    price: 75,
    imageUrl: "https://placehold.co/436x240",
  },
  {
    id: "4",
    title: "Family Desert Safari",
    location: "AlUla, Saudi Arabia",
    category: "Family",
    rating: 4.9,
    reviewCount: 76,
    duration: "5 hours",
    price: 99,
    imageUrl: "https://placehold.co/436x240",
  },
  {
    id: "5",
    title: "Cultural Heritage Experience",
    location: "AlUla, Saudi Arabia",
    category: "Cultural",
    rating: 5.0,
    reviewCount: 45,
    duration: "8 hours",
    price: 159,
    imageUrl: "https://placehold.co/436x240",
  },
  {
    id: "6",
    title: "Stargazing Desert Night",
    location: "AlUla, Saudi Arabia",
    category: "Night Tour",
    rating: 4.8,
    reviewCount: 62,
    duration: "4 hours",
    price: 95,
    imageUrl: "https://placehold.co/436x240",
  },
];

export const TABS = [
  { id: "trips" as const, label: "Available Trips", count: 6 },
  { id: "reviews" as const, label: "Guest Reviews", count: 412 },
];

export const RATING_DISTRIBUTION: RatingDistribution[] = [
  { stars: 5, count: 387, percentage: 94 },
  { stars: 4, count: 21, percentage: 5 },
  { stars: 3, count: 3, percentage: 0.7 },
  { stars: 2, count: 1, percentage: 0.2 },
  { stars: 1, count: 0, percentage: 0 },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    reviewerName: "Michael Thompson",
    reviewerInitials: "MT",
    reviewerLocation: "London, UK",
    rating: 5,
    tripName: "Desert Journey Through AlUla",
    date: "January 2025",
    comment:
      "AlUla Tours & Adventures provided an exceptional experience. The organization was flawless, guides were professional, and every detail was carefully planned. Highly recommend!",
  },
  {
    id: "2",
    reviewerName: "Sofia Garcia",
    reviewerInitials: "SG",
    reviewerLocation: "Barcelona, Spain",
    rating: 5,
    tripName: "Ancient Wonders of Hegra",
    date: "December 2024",
    comment:
      "One of the best tour companies I've worked with. Their local knowledge and passion for AlUla really shines through. The entire team goes above and beyond.",
  },
  {
    id: "3",
    reviewerName: "David Kim",
    reviewerInitials: "DK",
    reviewerLocation: "Seoul, South Korea",
    rating: 5,
    tripName: "Family Desert Safari",
    date: "December 2024",
    comment:
      "Professional, punctual, and personable. They made our family trip unforgettable. The guides were patient with kids and shared fascinating stories.",
  },
  {
    id: "4",
    reviewerName: "Isabella Romano",
    reviewerInitials: "IR",
    reviewerLocation: "Rome, Italy",
    rating: 4,
    tripName: "Desert Journey Through AlUla",
    date: "November 2024",
    comment:
      "Great experience overall. The tour was well-organized and our guide was very knowledgeable. Would love to see more vegetarian food options.",
  },
  {
    id: "5",
    reviewerName: "Ahmed Hassan",
    reviewerInitials: "AH",
    reviewerLocation: "Dubai, UAE",
    rating: 5,
    tripName: "Sunset Rock Formations Tour",
    date: "November 2024",
    comment:
      "Outstanding service from start to finish. As someone who has taken many tours, I can say this company sets the bar high. Every detail was perfect.",
  },
  {
    id: "6",
    reviewerName: "Emily Watson",
    reviewerInitials: "EW",
    reviewerLocation: "Sydney, Australia",
    rating: 5,
    tripName: "Cultural Heritage Experience",
    date: "October 2024",
    comment:
      "The team's passion for sharing AlUla's culture is evident in everything they do. They truly care about creating meaningful experiences for guests.",
  },
];
