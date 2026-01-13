import { Achievement, PerformanceMetric } from "./types";


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


export const TABS = [
  { id: "trips" as const, label: "Available Trips", count: 6 },
  { id: "reviews" as const, label: "Guest Reviews", count: 412 },
];


