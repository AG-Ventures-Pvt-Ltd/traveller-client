// Hand-written copy per state, keyed by upper-case stateCode. Intentionally empty:
// the page renders the intro / FAQ sections (and FAQPage JSON-LD) only for states
// that have an entry here, so no state ships with invented copy.
//   intro: 150-300 words. faqs: 3-4 — best season, pickup from Delhi,
//   typical group size, solo / female traveller safety.
export interface StateContent {
  intro: string;
  faqs: { question: string; answer: string }[];
}

export const STATE_CONTENT: Record<string, StateContent> = {};

// States below still need copy (priority order, by search demand).
// TODO(content): UK (Uttarakhand), HP (Himachal Pradesh)

// A state with fewer upcoming trips than this is noindexed and left out of the sitemap.
export const MIN_INDEXABLE_TRIPS = 2;
