// Title / description builders for dynamic pages. Every builder returns text that
// fits Google's display limits (title <= 60, description <= 155) by dropping
// optional clauses in a fixed order — never by truncating mid-word.

export const MAX_TITLE = 60;
export const MAX_DESC = 155;
const BRAND = ' | Wondrr';

export const formatINR = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

/** First candidate that fits, else the last (shortest) one. */
const firstFit = (max: number, ...candidates: string[]) =>
  candidates.find((c) => c.length <= max) ?? candidates[candidates.length - 1];

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "7 Nov" — fixed table (not toLocaleDateString) so server and client agree. */
export const formatShortDate = (d: string | Date) => {
  const date = new Date(d);
  return isNaN(date.getTime()) ? '' : `${date.getUTCDate()} ${SHORT_MONTHS[date.getUTCMonth()]}`;
};

export function exploreMeta(state: string, minPrice: number | undefined, upcoming: number) {
  const title = typeof minPrice === 'number' && minPrice > 0
    ? firstFit(
        MAX_TITLE,
        `${state} Group Trips & Treks from ${formatINR(minPrice)}${BRAND}`,
        `${state} Group Trips & Treks from ${formatINR(minPrice)}`,
      )
    : firstFit(MAX_TITLE, `${state} Group Trips & Trek Packages${BRAND}`, `${state} Group Trips & Trek Packages`);
  const description = `${upcoming} upcoming group ${upcoming === 1 ? 'trip' : 'trips'} in ${state}: treks, road trips and weekend getaways from verified operators. Compare dates, prices and itineraries.`;
  return { title, description };
}

interface TripMetaInput {
  name: string; // seoName, falling back to the trip title
  isTrek: boolean;
  days: number;
  price?: number;
  nextBatch?: string | Date;
  pickupCity?: string;
  inclusions?: string[];
  operator?: string;
}

export function tripMeta(t: TripMetaInput) {
  const nights = Math.max(t.days - 1, 0);
  const dn = `${t.days}D/${nights}N`;
  const from = typeof t.price === 'number' && t.price > 0 ? ` from ${formatINR(t.price)}` : '';
  const year = t.nextBatch ? new Date(t.nextBatch).getUTCFullYear() : undefined;

  let title: string;
  if (t.isTrek) {
    const base = /\btrek$/i.test(t.name) ? t.name : `${t.name} Trek`;
    title = firstFit(
      MAX_TITLE,
      `${base}${year ? ` ${year}` : ''}: ${dn} Group Package${from}`,
      `${base}${year ? ` ${year}` : ''}: ${dn} Group Package`,
      `${t.name} ${dn} Package`,
    );
  } else {
    title = firstFit(
      MAX_TITLE,
      `${t.name} Package ${dn}${from}${BRAND}`,
      `${t.name} Package ${dn}${from}`,
      `${t.name} ${dn} Package`,
    );
  }

  const [i1, i2] = t.inclusions ?? [];
  const start = `${t.days}-day group trip${t.pickupCity ? ` from ${t.pickupCity}` : ''}`;
  const date = t.nextBatch ? formatShortDate(t.nextBatch) : '';
  const lead = `${start}${date ? `, next batch ${date}` : ''}.`;
  const incl = i1 && i2 ? ` ${i1} and ${i2} included.` : '';
  const mid = ' Day-wise itinerary, cost and FAQs.';
  const description = firstFit(
    MAX_DESC,
    `${lead}${incl}${mid}${t.operator ? ` Run by ${t.operator}, verified on Wondrr.` : ''}`,
    `${lead}${incl}${mid} Verified operator.`,
    `${lead}${mid} Verified operator.`,
  );
  return { title, description };
}

export function hostMeta(o: { name: string; city?: string; trips?: number; rating?: number; reviews?: number; hasReviews: boolean }) {
  const label = o.hasReviews ? 'Upcoming Trips & Reviews' : 'Upcoming Trips & Verified Profile';
  const head = o.city
    ? `${o.name}, ${o.city}: ${label}`
    : `${o.name} ${o.hasReviews ? 'Upcoming Trips, Reviews & Prices' : label}`;
  const title = firstFit(MAX_TITLE, `${head}${BRAND}`, head, `${o.name}: Upcoming Trips${BRAND}`, `${o.name}: Upcoming Trips`);
  const poss = /s$/i.test(o.name) ? `${o.name}'` : `${o.name}'s`;
  const rated = o.hasReviews && o.rating && o.reviews ? `, rated ${o.rating}/5 by ${o.reviews} travellers` : '';
  const listed = o.trips ? ` ${o.trips} ${o.trips === 1 ? 'trip' : 'trips'} listed${rated}.` : '';
  const description = firstFit(
    MAX_DESC,
    `See ${poss} upcoming group trips, batch dates and prices in one place.${listed} Verified operator on Wondrr.`,
    `See ${poss} upcoming group trips, batch dates and prices in one place. Verified operator on Wondrr.`,
  );
  return { title, description };
}
