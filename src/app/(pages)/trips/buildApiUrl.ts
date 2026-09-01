import { FilterValues, MONTH_NAMES } from './types';

export const TRIPS_PAGE_SIZE = 12;

export const EMPTY_FILTERS: FilterValues = {
  states: [],
  minBudget: null,
  maxBudget: null,
  numberOfDays: null,
  month: null,
  international: false,
  sort: '',
};

/** How many months ahead the month picker offers. */
const MONTH_CHOICES = 12;

const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * 'September' for a 'YYYY-MM' key. No year: the picker only ever offers the next twelve
 * months, so each month name appears exactly once and a year would just be noise.
 */
export function formatMonthKey(key: string): string {
  const m = Number(key.split('-')[1]);
  return MONTH_NAMES[m - 1] ?? '';
}

/** The next MONTH_CHOICES months, starting with the current one. */
export function monthOptions(): { key: string; label: string }[] {
  const now = new Date();
  return Array.from({ length: MONTH_CHOICES }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const key = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
    return { key, label: formatMonthKey(key) };
  });
}

/**
 * Expands a 'YYYY-MM' month into the inclusive day range the API filters on.
 * Day 0 of the following month is the last day of this one, so month length and leap
 * years are handled by the Date constructor rather than by a table.
 */
function monthToRange(month: string): { startDate: string; endDate: string } | null {
  const [y, m] = month.split('-').map(Number);
  if (!y || !m || m < 1 || m > 12) return null;
  const last = new Date(y, m, 0).getDate();
  return {
    startDate: `${y}-${pad2(m)}-01`,
    endDate: `${y}-${pad2(m)}-${pad2(last)}`,
  };
}

export interface TripsSearchParams {
  destination?: string | null;
  qParam?: string | null;
  hostParam?: string | null;
  statusParam?: string | null;
  page?: number;
}

/** Splits a sort value like 'price_asc' into the API's sortBy/sortOrder pair. */
function splitSort(sort: string): { sortBy: string; sortOrder: string } | null {
  if (!sort) return null;
  const idx = sort.lastIndexOf('_');
  if (idx === -1) return null;
  return { sortBy: sort.slice(0, idx), sortOrder: sort.slice(idx + 1) };
}

/** True when the user has narrowed the results in any way. Drives the empty state and chips. */
export function hasActiveFilters(f: FilterValues): boolean {
  return (
    f.states.length > 0 ||
    f.minBudget !== null ||
    f.maxBudget !== null ||
    f.numberOfDays !== null ||
    f.month !== null ||
    f.international
  );
}

export function countActiveFilters(f: FilterValues): number {
  return (
    f.states.length +
    (f.minBudget !== null || f.maxBudget !== null ? 1 : 0) +
    (f.numberOfDays !== null ? 1 : 0) +
    (f.month !== null ? 1 : 0) +
    (f.international ? 1 : 0)
  );
}

/**
 * Reads filter state out of the URL. The URL is the single source of truth so filters
 * survive refresh, back/forward and sharing.
 */
export function parseFilters(params: URLSearchParams | Record<string, string | undefined>): FilterValues {
  const get = (k: string): string | null => {
    if (params instanceof URLSearchParams) return params.get(k);
    return params[k] ?? null;
  };
  const list = (k: string) => (get(k) || '').split(',').map((s) => s.trim()).filter(Boolean);
  const num = (k: string) => {
    const raw = get(k);
    if (raw === null || raw === '') return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  };

  const month = get('month');

  return {
    states: list('states'),
    minBudget: num('minBudget'),
    maxBudget: num('maxBudget'),
    numberOfDays: num('numberOfDays'),
    month: month && /^\d{4}-\d{2}$/.test(month) ? month : null,
    international: get('international') === 'true',
    sort: get('sort') || '',
  };
}

/** Serialises filter state back into a query string, omitting anything at its default. */
export function filtersToQuery(f: FilterValues): URLSearchParams {
  const sp = new URLSearchParams();
  if (f.states.length) sp.set('states', f.states.join(','));
  if (f.minBudget !== null) sp.set('minBudget', String(f.minBudget));
  if (f.maxBudget !== null) sp.set('maxBudget', String(f.maxBudget));
  if (f.numberOfDays !== null) sp.set('numberOfDays', String(f.numberOfDays));
  if (f.month) sp.set('month', f.month);
  if (f.international) sp.set('international', 'true');
  if (f.sort) sp.set('sort', f.sort);
  return sp;
}

// Shared by the server page (initial fetch) and both client trees (desktop
// pagination, mobile infinite scroll) so the query key always matches — a
// mismatched key would bypass the HydrationBoundary cache and refetch.
export function buildTripsApiUrl(filters: FilterValues, params: TripsSearchParams): string {
  const { destination, qParam, hostParam, statusParam, page = 1 } = params;
  const search = new URLSearchParams();

  if (filters.minBudget !== null) search.append('minBudget', String(filters.minBudget));
  if (filters.maxBudget !== null) search.append('maxBudget', String(filters.maxBudget));
  if (filters.numberOfDays !== null) search.append('numberOfDays', String(filters.numberOfDays));
  if (filters.states.length) search.append('states', filters.states.join(','));
  if (filters.international) search.append('international', 'true');

  // The UI picks a month; the API filters on a day range.
  if (filters.month) {
    const range = monthToRange(filters.month);
    if (range) {
      search.append('startDate', range.startDate);
      search.append('endDate', range.endDate);
    }
  }

  const sort = splitSort(filters.sort);
  if (sort) {
    search.append('sortBy', sort.sortBy);
    search.append('sortOrder', sort.sortOrder);
  }

  if (hostParam) search.append('host', hostParam);
  if (statusParam) search.append('status', statusParam);

  // Pagination applies to both endpoints. It used to be appended only on the destination
  // branch, so on the `q` branch page 2 produced a URL identical to page 1 — same
  // react-query key, same cached object, and the infinite scroll silently stalled.
  search.append('page', page.toString());
  search.append('limit', TRIPS_PAGE_SIZE.toString());

  if (qParam) {
    search.append('q', qParam);
    return `api/client/v1/trips/v2/search?${search.toString()}`;
  }

  if (destination) search.append('destination', destination);

  return `api/client/v1/trips/search?${search.toString()}`;
}
