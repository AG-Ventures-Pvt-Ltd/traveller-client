# GA4 Tracking v2 — implementation status

Work from the GA4 tracking PRD (website + server). Ship both repos together, or
`begin_checkout` lands with no `purchase` behind it.

- Client: `traveller-client`, branch `dev1`
- Server: `traveller-server`, branch `dev1` — checked out as a separate worktree at
  `../traveller-server-ga4` (the main checkout is on `dev2` with uncommitted SIP work)

## Funnel now emitted

```
view_item_list → select_item → view_item → add_to_cart → begin_checkout → add_payment_info → purchase (server)
                                                                                           ↘ payment_failed (server)
```
Plus `search`, `login`, `sign_up`, `refund` (server), `booking_success_view` (not a key event).

## Old → new

| Old | New | Where |
|---|---|---|
| `lp_view` | `page_view` + `view_item_list` | removed from `LandingClient`; lists fire their own |
| `trip_card_click` | `select_item` | both landing `CarouselCard`s, `TripSearchCard`, mobile `TripCard`, `HostTrips` |
| `trip_detail_view` | `view_item` | `trip/[id]/components/TripPage.tsx` |
| `book_now_click` | `add_to_cart` | `TripDetailDesktop`, `TripDetailMobile` |
| `booking_page_view` | `begin_checkout` | `trip/book/[id]/page.tsx` |
| `payment_initiated` | `add_payment_info` | `usePayment.ts` |
| `purchase` (client) | `purchase` (server MP) | removed from `trip/book/success`; sent from payment webhook |
| — | `payment_failed`, `refund` | server |
| `funnel_source`, `trip_id`, `trip_title`, `batch_id` | `items[]` + `item_list_name` | funnel-source sessionStorage helpers deleted |

`item_id` is the trip's 5-char code (`xsvwy`) everywhere, client and server — never
the URL slug. `item_list_name` values: `home`, `trips`, `search`, `blog`,
`operator:<handle>`, `explore:<state>`.

## Root causes fixed (not just renamed)

- **Double counting.** `trip_detail_view` fired from two components — `TripViewTracker`
  was dead code duplicating `TripPage`, and is deleted. `trackEventOnce(key, …)` in
  `common/utils/analytics.ts` makes `view_item`/`begin_checkout`/`view_item_list` fire
  once per tab, so a re-render, an auth redirect or a return from the payment page can't
  re-count them.
- **Paired `payment_initiated`.** `usePayment.startPayment` now refuses a second click
  while the order request is in flight — that double-submit was creating two orders too.
- **~25% of trip views missing.** The gtag stub used to load `afterInteractive`, so any
  event fired by a first-paint effect (direct landing, refresh) hit `window.gtag ===
  undefined` and was dropped. The stub is now `beforeInteractive`; events fired before
  `gtag.js` arrives queue in `dataLayer` and are processed on load.
- **Dev traffic.** GA/Clarity/Meta Pixel are gated on `NEXT_PUBLIC_ENV === 'PRODUCTION'`
  *and* on `location.hostname` being `wondrr.in`/`www.wondrr.in`, so a production build
  served from dev1/dev2/localhost/`*.vercel.app` sends nothing. `canTrack()` repeats the
  host check for every event.
- **No real revenue.** `purchase` now comes from the gateway webhook via the Measurement
  Protocol, after the booking is marked paid. `ga_client_id`/`ga_session_id` ride along on
  the order so the sale keeps the session's original traffic source.

## Server (traveller-server)

- `Payment` schema: `gaClientId`, `gaSessionId`, `gaPurchaseSentAt`, `gaRefundSentAt`
  (Mongo — no SQL migration needed; existing docs simply have them unset).
- `POST /payments` (`createPayment`): accepts `gaClientId` / `gaSessionId` and stores them,
  including on the reused-pending-order path so the paying session wins.
- `utils/analytics/ga4.js`: Measurement Protocol sender. Sends only when `MODE=PROD` and
  both env vars are set; `GA_DEBUG=true` routes to GA's validation endpoint.
- `utils/analytics/bookingEvents.js`: `purchase`, `payment_failed`, `refund`. Idempotent
  via the `ga*SentAt` stamps, and every path swallows its own errors — a GA failure must
  never make a webhook return non-200 and trigger a gateway retry.
- Hooked into `bookings/services/paymentService.js` (`handleSuccessfulPayment`,
  `handleFailedPayment`), which is the common funnel for **both** Razorpay and Cashfree —
  Razorpay is still the default gateway, so a Cashfree-only hook would have missed most
  payments.
- Refunds: `admin/payments/controller.js` `markPaymentRefund`.
- Cashfree normaliser now passes through `failureReason` (and distinguishes
  `user_dropped`), used for `payment_failed`.
- Tests: `src/utils/analytics/tests/ga4.test.js` (9 tests) — env gating, session_id as a
  string, client-id fallback, item shape.

## Not done in code — needs a human

1. **`GA_API_SECRET`** on the server `.env` (prod only), plus `GA_MEASUREMENT_ID=G-8ZL8763359`.
   GA4 Admin → Data streams → web stream → Measurement Protocol API secrets. Until it is
   set the server logs a warning and sends nothing. `dev1` has no `.env.example` (that file
   lives on the docker branch), so add the vars to the deployed `.env` directly.
2. **Validate once with `GA_DEBUG=true`** — the live endpoint returns 2xx for malformed
   payloads, the debug one returns `validationMessages`.
3. **Canonical host**: set `www.wondrr.in` → 308 → `wondrr.in` (or the reverse) in Vercel →
   Domains. Both hosts currently receive traffic.
4. **GA4 admin**: mark `purchase`, `begin_checkout`, `sign_up` as key events; unmark
   `payment_initiated`. Turn on the internal-traffic filter (the client already tags
   `traffic_type: 'internal'` for `@wondrr.in` sessions). Leave the old custom dimensions
   registered so history still reads.
5. **Confirm `CASHFREE_ENV=production` only in production** — `payments-test.cashfree.com`
   was appearing as a referrer on wondrr.in.
6. **Rebuild the funnel exploration** on the new event names, filtered to hostname
   `wondrr.in`.

## Deviations from the PRD (reality check)

- **No internal UTM links exist in the code.** The only `utm_*` writers are `ShareModal`
  (external shares — legitimate) and the WhatsApp deep links (`utm_location`). The
  `utm_source=landing` / `utm_source=trips` sessions in GA4 are coming from links set
  outside this repo (Instagram bio, broadcasts, etc.) — fix those at the source.
- **Server is Express + Mongo in Docker, not Next-on-Vercel.** Env gate is `MODE=PROD`
  (this service's own convention), not `VERCEL_ENV`; GA fields are schema fields, not a
  SQL migration; the hook point is the shared webhook handler, not a Cashfree route.
- **`isTest` trips**: no such flag exists on the trip schema, and we agreed to skip it —
  internal-traffic tagging covers team testing.
- **`item_category` (domestic/international)** is only set server-side when a trip has a
  country; `Trip.location` is a single place name, so most items will omit it. Add a
  country to the location schema if that dimension matters.
- **`sign_up` vs `login`** is decided from an auth-intent flag written to `sessionStorage`
  just before `signIn` (the OTP screen knows `mode`, the Google button knows `isLogin`);
  `AnalyticsIdentity` reads it when the session appears, which is the single place all four
  auth paths converge.
