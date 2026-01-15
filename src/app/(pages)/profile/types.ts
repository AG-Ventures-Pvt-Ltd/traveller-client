export interface ProfileData {
  name: string;
  username: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
  birthDate: string;
  avatar: string;
  governmentIdType?: string;
  governmentIdNumber?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface TravelerDetail {
  name: string;
  relationship: string;
  birthDate: string;
  passport?: string;
}

export interface Trip {
  image: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  title: string;
  location: string;
  date: string;
  duration: string;
  host: string;
  price: string;
  paymentStatus?: string;
  bookingStatus?: string;
  hasReview?: boolean;
  isCompleted?: boolean;
  review?: {
    rating: number;
    text: string;
  };
}

export interface Review {
  image: string;
  title: string;
  rating: number;
  date: string;
  reviewText: string;
}

export interface StatCard {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  sublabel?: string;
}

export interface Tab {
  label: string;
  active: boolean;
}

export interface FilterOption {
  label: string;
  count: number;
  active: boolean;
}
