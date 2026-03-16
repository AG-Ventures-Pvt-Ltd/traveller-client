export type FilterType = 'upcoming' | 'past';

export const ITEMS_PER_PAGE = 6;

export const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'upcoming', label: 'Upcoming Trips' },
  { key: 'past', label: 'Past Trips' },
];

export const LOCATION_OPTIONS = [
  { value: 'all', label: 'All Locations' },
  { value: 'paris', label: 'Paris' },
  { value: 'bali', label: 'Bali' },
  { value: 'london', label: 'London' },
  { value: 'sydney', label: 'Sydney' },
];
