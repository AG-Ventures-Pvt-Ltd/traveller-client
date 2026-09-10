# /trips Page Redesign — Implementation Plan

**Status:** implemented 2026-08-27 (not committed — see "Outcome" at the end)
**Date:** 2026-08-27
**Repos:** `traveller-client` (UI) + `traveller-server` (API fields + filter bugs)
**Branches:** verify current branch in each repo before starting; PRs target `production`

---

## Goal

`/trips` is where users land when they search for a trip. Rebuild it so the cards do the
selling: colorful (brand palette only), information-dense, fully clickable, with an
auto-sliding image carousel and the next departure date. Make the filters actually work.

---

## What exists today

| Layer | File | Notes |
|---|---|---|
| Server page | `src/app/(pages)/trips/page.tsx` | SSR fetch + UA-based mobile guess, hydration boundary |
| Client shell | `trips/TripsPageClient.tsx` | Desktop tree; forks to mobile at `<768px` |
| Desktop filters | `trips/components/TripFilters.tsx` | Sidebar, 5 filters |
| Mobile filters | `trips/components/FilterModal.tsx` | **Duplicate** of the above, already diverged |
| Desktop list | `trips/components/TripList.tsx` → `TripSearchCard.tsx` | White card, "View Details" button |
| Mobile list | `trips/components/mobile/TripListsMobile.tsx` → `mobile/TripCard.tsx` | Already colored |
| URL builder | `trips/buildApiUrl.ts` | Shared by server + both client trees |
| Dead code | `trips/components/RangeCalendar.tsx` | 184 lines, imported nowhere |

Design language is already established by `(landing)/components/DesktopLanding/components/CarouselCard.tsx`:
colored background + `border-[10px]` in the same color + `rounded-3xl`, inner image `rounded-2xl`,
and a stretched `<Link className="absolute inset-0 z-0">` for whole-card click. **Reuse this, don't invent.**

### Brand palette (from `globals.css` + existing components)

| Token | Hex | Use |
|---|---|---|
| Purple | `#EEA0FF` | Primary accent, card variant 1 |
| Yellow | `#FFD976` | Card variant 2 |
| Lime | `#E2F4A6` / `#D0EF65` | Card variant 3, active filter state |
| Cream | `#FFF9F4` | Page background (`--color-background`) |
| Ink | `#121212` | Text (`--color-maintext`) |
| Sub | `#404040` | Secondary text (`--color-subtext`) |
| Blue | `#448AFF` | Info / links |

No new colors. No greys as the primary card surface.

---

## Bugs found (fix as part of this work, not after)

### Server (`traveller-server/src/client/trips/services.js`)

1. **`nearestDate` is not the nearest date.** In `searchAndFilterTripsService`, line ~764
   sorts batches with `$sortArray: { sortBy: { startDate: 1 } }`. The `tripbatches` model has
   **`startDateTime`**, not `startDate` — there is no such field. The sort is a no-op, so
   `nearestDate` is whichever batch Mongo returned first. It is also not filtered to future
   batches, so a *past* batch can be picked. Shipping a "Next: 14 Sep" badge on top of this
   would display wrong dates.
   *Reference implementation already correct in the same file:* `textSearchTripsService`
   line ~1867 uses `startDateTime: { $gte: new Date() }` + `$sort: { startDateTime: 1 }`.

2. **Date filter matches nothing.** Line ~688 filters `tripBatches.$elemMatch.startDate` —
   same nonexistent field. `?startDate=&endDate=` silently returns unfiltered results today.

3. **`?q=` path ignores most filters.** `textSearchTripsService` only accepts
   `q, page, limit, states, international, numberOfDays`. Price, difficulty, category, and
   sort are dropped, so on a search-results page those filters silently do nothing.

4. **`sortBy` goes straight into `$sort` unvalidated** (line ~841,
   `{ [sortBy]: sortOrder === 'asc' ? 1 : -1 }`). Needs a whitelist before we expose a sort UI.

### Client

5. **Two filter components, diverged defaults.** `FilterModal` initialises
   `priceRange=20000` / `durationRange=14`; `TripFilters` initialises both to `null`. A mobile
   user who opens the modal, ticks only "Easy", and hits Apply also silently sends
   `maxBudget=20000` and `numberOfDays=14`.

6. **Price cap hardcoded at ₹20,000.** Any trip above ₹20k is unreachable through the UI.

7. **"Duration" is mislabelled.** The slider sends `numberOfDays`, which the server applies as
   *at most* N days (`$lte`). The UI presents it as a range.

8. **Infinite scroll dies on `?q=` results.** `buildTripsApiUrl` returns early on the `q` path
   without appending `page`/`limit`. Page 2 produces an identical URL → identical react-query
   cache entry → the accumulate effect never re-fires → `isFetchingMore` latches `true` forever.

9. **Filters are not in the URL.** Refresh, back button, and sharing all lose filter state.

---

## Part A — `traveller-server`

Separate PR. No new queries or lookups; both pipelines already join the data.

### A1. Fix `nearestDate` in `searchAndFilterTripsService`

- Filter `filteredTripBatches` to `startDateTime >= new Date()` alongside the existing status exclusions.
- `$sortArray` by `startDateTime: 1`.
- Fix the `startDate`/`endDate` filter at line ~688 to use `startDateTime`.

### A2. Extend the `$project` (line ~825)

Add, keeping every existing key untouched so no consumer breaks:

Shipped as `tripCardProjection` in `queryHelpers.js`, shared by both pipelines. After the
card design settled it was trimmed to only what the card actually renders:

```js
images:        { $slice: [{ $ifNull: ['$tripImages', []] }, 5] },
nextStartDate: <soonest upcoming batch>.startDateTime,   // explicit null when none
state:         { $ifNull: ['$location.state', ''] },
totalReviews:  { $ifNull: ['$totalReviews', 0] },
```

`nextEndDate`, `seatsLeft`, `totalBatches`, `category`, `difficulty`, `tags`, `country`,
`isFemaleOnly` and `createdAt` were projected during the redesign and dropped once the final
card stopped showing them. `category` and `difficulty` are still **filterable** — filters run
on the raw document before `$project`, so removing them from the response costs nothing.

`image` stays as-is (first element) so existing callers of this endpoint —
`useFeaturedTrips`, `useHomePageTrips`, `HostTrips`, profile pages — keep working unchanged.

### A3. Mirror the same fields in `textSearchTripsService`'s `$project`

Sourced from the existing `$nextBatch` lookup (`{ $arrayElemAt: ['$nextBatch', 0] }`).

### A4. Accept the full filter set on `/v2/search`

Extend `textSearchTripsService` to also take `minBudget`, `maxBudget`, `difficulties`,
`category`, `sortBy`, `sortOrder` and apply them with the same semantics as
`searchAndFilterTripsService`, so a filter behaves identically on both paths.

### A5. Whitelist `sortBy`

```js
const SORT_FIELDS = { rating: 'rating', price: 'price', nextStartDate: 'nextStartDate', createdAt: 'createdAt' };
const sortField = SORT_FIELDS[sortBy] ?? 'rating';
```

### A6. Price-range bounds

`getTripPriceBoundsService` returns the catalogue's min/max as `filterMeta`, so the price
slider sizes itself to real data instead of a hardcoded ₹20k. Computed over *all* published
trips, not the filtered set — a facet branch would inherit the price filter and collapse the
slider as the user narrowed it. Memoised for 5 minutes.

The extremes move as hosts publish and reprice, which the slider has to survive:

- **`roundBounds` rounds outward to a coarse step** (1k / 5k / 10k, scaled to the catalogue)
  rather than to the exact extremes, so any ceiling in the same bucket produces the same
  domain and the track doesn't shift under the user between visits.
- **A `MIN_SPAN` floor** keeps the slider draggable when every trip costs about the same;
  a zero-width track also forced the lower handle below the domain and threw the filled bar
  off the rail.
- **The client widens the track to include the current selection** (`Math.min`/`Math.max`
  against `minBudget`/`maxBudget`), so a budget carried in from a shared or bookmarked URL
  is honoured and labelled truthfully instead of being silently clamped to today's bounds.
- A stale cached ceiling can't hide trips: a handle parked at the top commits `null`, i.e.
  no upper bound, so pricier trips published since remain reachable.

### A7. Tests

`traveller-server` tests use a ReplSet for transactions and require collections to be
pre-created (see project memory). Add cases to `src/client/trips/tests/`:
- nearest batch is the soonest **future** batch, not an arbitrary or past one
- `startDate`/`endDate` filter narrows results
- `maxBudget` and `difficulties` narrow results on the `?q=` path
- unknown `sortBy` falls back to `rating` instead of throwing

---

## Part B — Filters (client)

### B1. One component, two shells

Delete `FilterModal.tsx`'s duplicated body. New `trips/components/filters/TripFiltersPanel.tsx`
holds all filter UI and state. `TripFilters.tsx` (sidebar) and `FilterModal.tsx` (mobile
bottom sheet via existing `MobileModal`) become thin wrappers around it. One source of truth
for defaults — kills bug #5 structurally.

### B2. URL is the state

Filters live in the query string (`?states=Goa,Kerala&maxBudget=15000&difficulty=easy&sort=price_asc`),
read with `useSearchParams`, written with `router.replace(..., { scroll: false })`.
`buildTripsApiUrl` derives from the URL rather than from component state. Fixes #9, makes
filtered views shareable, and gives the back button correct behaviour.

Filter state must survive the desktop/mobile fork, so it is read at the `TripsPageClient`
level and passed down — not owned by either subtree.

### B3. Fix the `q`-path pagination bug

`buildTripsApiUrl` appends `page`/`limit` on **both** branches. Fixes #8.

### B4. Filter set

Revised after review — category, difficulty and the from/to date pair were cut, and the
date range became a month picker.

| Filter | Control | Param | Notes |
|---|---|---|---|
| States | Multi-select (keep `StatesDropdown`) | `states` | was labelled "Destination" |
| Departure month | Scrolling list: Any month + next 12 months | `month` | 'YYYY-MM' in the URL, expanded to `startDate`/`endDate` in `buildTripsApiUrl`; depends on A1. Full month names, no year — the window is exactly 12 months so each name is unique |
| Price | Dual-handle range | `minBudget`,`maxBudget` | bounds from A6, not hardcoded |
| Trip length | Chips: Any / ≤2 / ≤5 / ≤8 days | `numberOfDays` | chips are clearer than a slider for the `$lte` semantics |
| International | Toggle | `international` | existing |
| Sort | Dropdown: Recommended / Price ↑ / Price ↓ / Rating / Departing soonest | `sortBy`,`sortOrder` | **new** — depends on A5 |

Cut: **Category** and **Difficulty** (still filterable via the API, just not exposed), and
the free from/to date inputs — the "To" input overflowed the rail, and a month is the unit
people actually plan in. Both remain shown on the card, they are just not filters.

The desktop rail has **no card, border or background**: it sits on the page background and
is `sticky top-24` (clearing the `sticky top-0` navbar), with its own `max-h`/scroll so it
stays usable on short viewports. Its column must not be `self-start` — that collapses the
column to content height and leaves sticky nothing to travel within.

### B5. Feedback affordances

- Active-filter chip row above the results, each with an individual `×`, plus "Clear all".
- Filter count badge on the mobile Filters button.
- Live result count in the heading (`{total} trips found`), already available in `pagination`.
- Mobile sheet: sticky "Show {n} trips" apply button.

Desktop keeps the explicit Apply button (avoids a request per slider tick); checkbox/chip
filters apply immediately, range sliders apply on release.

---

## Part C — Trip cards

### C1. Desktop — `TripSearchCard`

Revised across review rounds. The white inner panel, seats-left, difficulty, category
badges and the "View details" button were all cut. A two-per-row grid with a vertical card
was tried and reverted — the layout is back to one full-width horizontal card per row:

```
┌──────────────────────────────────────────────┐
│ ┌────────┐  Manali Backpacking Trip          │
│ │ IMG ●○○│  by Wondrr Trips ✓                │
│ │ ♡  ★4.8│  📍 Manali, HP    🕐 4D•3N        │
│ └────────┘  🗓 Next: 14 Sep  +2 more dates   │
│             From ₹8,999 /person         (→)  │
└──────────────────────────────────────────────┘
```

- Card surface cycles `#FFD976` → `#EEA0FF` → `#E2F4A6` by index. **The colour is the card**:
  content sits directly on it, no white panel and no coloured frame around a white body.
  Text is black at varying opacity, which all three brand colours carry.
- **No "View details" button.** The whole card is the target, so a button was a second
  control for the same action. The price anchors the bottom-left and a filled arrow sits
  bottom-right, sliding on `group-hover` to carry the affordance.
- The media slot is a fixed 300×200, so the carousel is passed `sizes="300px"` — `MyImage`'s
  generic viewport-relative default would otherwise guess badly for it.

### C2. Image carousel — `TripImageCarousel`

Shared by desktop and mobile.

- Renders `images[]` from A2; falls back to `[image]` when the array is empty or has one item,
  in which case it renders a plain `<MyImage>` with no carousel chrome.
- Auto-advance ~3.5s, pauses on hover/touch, dot indicators, swipe on mobile.
- Uses `IntersectionObserver` so off-screen cards don't animate.
- Respects `prefers-reduced-motion`: no auto-advance, dots still navigate.
- Only the first slide gets `priority`; the rest lazy-load — the page renders 12 cards and
  eagerly loading 60 images would wreck LCP.
- No new dependency. `framer-motion` is already installed if a spring is wanted, but a CSS
  transform track is enough.

### C3. Departure strip

Derived from `nextStartDate` + `totalBatches`:
- "Next: 14 Sep" (or "Departs today")
- `totalBatches > 1` → "+N more dates"
- past-date guard: if `nextStartDate` is absent or in the past, render nothing rather than a
  stale date.

Seats-left, difficulty and category badges were cut after review — the card kept only what
someone scanning a results list actually decides on. `seatsLeft` is still returned by the
API and remains available if a scarcity cue is wanted later.

Date format: `14 Sep` (`en-IN`), with year appended when it isn't the current year.

### C4. Mobile — rework `mobile/TripCard.tsx`

Keeps the existing colored full-bleed card and its `useBookMarking` hook; adds the carousel,
next-date strip, difficulty/category chips, and rating count. Already fully clickable — no
change needed there.

### C5. Skeletons

Update `TripListSkeleton.tsx` and `mobile/SkeletonCard.tsx` to match the new card geometry,
otherwise loading→loaded shifts layout (CLS).

---

## Part D — Page shell

- Cream `#FFF9F4` background on desktop too (mobile already has it).
- Heading + result count + sort control in one row; active-filter chips beneath.
- Better empty state: which filters are active, one-tap "Clear all", cross-sell to `/trips`
  unfiltered.
- Keep `loading.tsx` as-is — per project memory, a `loading.tsx` returning near-empty markup
  is what caused the soft-404 issue; do not touch it during this work.
- Preserve SSR + `HydrationBoundary`: the query key must still match between server and client
  or the initial fetch is wasted. When filters move to the URL, the server page must build its
  key from the same `searchParams`.

---

## Files touched

**traveller-server**
- `src/client/trips/services.js` — A1–A6
- `src/client/trips/controller.js` — pass new params to `textSearchTrips`
- `src/client/trips/queryHelpers.js` — extract a shared `nextBatchProjection` used by both pipelines
- `src/client/trips/tests/*` — A7

**traveller-client**
- `trips/types.ts` — new Trip fields
- `trips/buildApiUrl.ts` — new params, fix `q`-path pagination
- `trips/page.tsx` — read filter params from `searchParams`
- `trips/TripsPageClient.tsx` — URL-driven filter state
- `trips/components/filters/TripFiltersPanel.tsx` — **new**, shared
- `trips/components/filters/ActiveFilterChips.tsx` — **new**
- `trips/components/filters/SortDropdown.tsx` — **new**
- `trips/components/TripFilters.tsx`, `FilterModal.tsx` — reduced to shells
- `trips/components/TripSearchCard.tsx` — rewritten
- `trips/components/TripImageCarousel.tsx` — **new**, shared
- `trips/components/mobile/TripCard.tsx`, `TripListsMobile.tsx` — updated
- `trips/components/TripListSkeleton.tsx`, `mobile/SkeletonCard.tsx` — updated
- `trips/components/RangeCalendar.tsx` — revived for the date filter (or deleted if dates are cut)

---

## Order of work

1. **A** (server) first — the client card can't be built against fields that don't exist.
2. **B3 + B1** — fix the pagination bug and de-duplicate filters before adding to them.
3. **C2** carousel, then **C1/C4** cards.
4. **B2/B4/B5** URL sync + new filters + chips.
5. **D** shell, skeletons, empty states.

Steps 2–5 are client-only and can proceed against a locally-running server from step 1.

---

## Test plan

- [ ] Desktop `/trips`: cards colored, whole card navigates to `/trip/{slug}`, bookmark and host link do **not** navigate to the trip
- [ ] Carousel auto-advances, pauses on hover, single-image trips show no dots, reduced-motion honoured
- [ ] Next-departure date matches the trip detail page's earliest future batch
- [ ] Seats-left matches `totalSeats - (totalBookings + externalBookedSeats)`
- [ ] Trip priced above ₹20,000 is reachable through the price filter
- [ ] Each filter narrows results on **both** `/trips` and `/trips?q=goa`
- [ ] Filters survive refresh; back button steps through filter states; filtered URL shares correctly
- [ ] Infinite scroll loads page 2+ on `?q=` results without duplicates
- [ ] Mobile sheet and desktop sidebar produce identical results for identical selections
- [ ] Applying only Difficulty does not silently also apply a price/duration cap
- [ ] SSR HTML contains trip cards (view-source, JS disabled) — SEO
- [ ] No CLS on skeleton → loaded transition
- [ ] Existing consumers of `/trips/search` (`useFeaturedTrips`, `useHomePageTrips`, `HostTrips`, profile) still render

---

## Out of scope

- `/trip/[id]` detail page
- Map view / geo search
- Saved searches, price alerts
- Server-side pagination → cursor migration

---

## Outcome

Implemented on `traveller-client@dev1` and `traveller-server@dev2`. Nothing committed.

### Deviations from the plan

| Planned | Shipped | Why |
|---|---|---|
| Revive `RangeCalendar.tsx` for the date filter | Deleted it; used two native `<input type="date">` | 184 lines replaced by a platform control that already does the job |
| Duplicated fetch logic left in both trees | Extracted `useTripFeed.ts`, used by desktop and mobile | The `q`-path pagination bug existed because that logic was maintained twice |
| Price bounds from a `$facet` branch | Separate memoised `getTripPriceBoundsService` | A facet branch inherits the price filter, so the slider would collapse as you narrowed it |

### Extra bugs found and fixed beyond the original list

- `nearestDate` sorted on `startDate`, a field that does not exist on `tripbatches` — the "next departure" was an arbitrary batch and could be in the past. Same wrong field broke the `startDate`/`endDate` filter.
- The `deleted` batch status was missing from the browse pipeline's exclusions, so removed batches still counted toward a trip's dates.
- The `?q=` pipeline had no bookmark lookup, so saved trips always rendered unsaved in search results.
- Trips with no pricing document serialised without a `price` key at all, crashing `price.toLocaleString()` on the results page.
- `category` was compared case-sensitively against values the Trip pre-save hook lowercases, so the display casing ("Adventure") matched nothing.
- A date-filtered card still showed the soonest departure overall, contradicting the window the user had just applied.
- The trip-length filter measured the batch's start-to-end span while the card displayed itinerary days, and `/v2/search` filtered on itinerary days — three different notions of "length".
- `formatDepartureDate` used `toLocaleDateString('en-IN')`, which yields "Sept" on Node and "Sep" in browsers — a hydration mismatch. Now formatted from a fixed month table.
- `hasMore` derived from in-flight query data would unmount the infinite-scroll sentinel mid-load, disconnecting the observer permanently. Now held in state.

### Verification

- `traveller-server`: 44/44 trip tests pass (15 in the new `tripSearchCards.test.js`), including a test that pins the exact response key set so the payload can't silently regrow. Two unrelated suites (`stories`, `S3Upload`, `profile`) are flaky in this repo independent of these changes — confirmed by stashing.
- `traveller-client`: `tsc --noEmit` clean, `eslint` clean, `next build` succeeds.
- Every filter, the sort control and both pagination paths verified against the running dev stack through server-rendered HTML.
- **Not verified:** rendered appearance in a real browser — the Chrome extension did not respond. Auto-advance timing, hover-pause, dot navigation, tap targets and the mobile layout all still need a human look.

### Dev data

Nine upcoming batches were seeded into `traveller_dev1` so the page has something to show; every pre-existing batch is in the past. To remove them (they are the only future-dated batches in that database):

```js
db.tripbatches.deleteMany({ startDateTime: { $gt: new Date() } })
```
