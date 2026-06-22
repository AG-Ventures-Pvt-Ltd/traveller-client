# Wondrr.in — Recommended Site Structure
**Status:** Current vs. Target architecture

---

## Current URL Structure (Live)

```
wondrr.in/                        ← Homepage (SSR done ✅)
wondrr.in/trips                   ← All trips listing
wondrr.in/girls-trips             ← All Girls Trips (page exists)
wondrr.in/explore/[stateCode]     ← State destination pages (exist, not in sitemap ⚠️)
wondrr.in/trip/[id]               ← Individual trip page (SSR done ✅)
wondrr.in/blog                    ← Blog (EMPTY ❌)
wondrr.in/about                   ← About page
wondrr.in/how-we-work             ← How We Work
wondrr.in/privacy-policy          ← Privacy
wondrr.in/search                  ← Search
```

**Missing:** No category pages for trip types, no destination guide pages, no departure-city pages, no FAQ/knowledge hub.

---

## Target URL Structure (Recommended)

### Core Product Pages
```
wondrr.in/                                          ← Homepage
wondrr.in/trips/                                    ← All Trips (canonical listing)
wondrr.in/trips/india/                              ← India Trips
wondrr.in/trips/india/spiti-valley/                 ← Spiti Valley Trips (NEW)
wondrr.in/trips/india/ladakh/                       ← Ladakh Trips (NEW)
wondrr.in/trips/india/manali/                       ← Manali Trips (NEW)
wondrr.in/trips/india/meghalaya/                    ← Meghalaya Trips (NEW)
wondrr.in/trips/india/kashmir/                      ← Kashmir Trips (NEW)
wondrr.in/trips/india/rajasthan/                    ← Rajasthan Trips (NEW)
wondrr.in/trips/india/kerala/                       ← Kerala Trips (NEW)
wondrr.in/trips/india/uttarakhand/                  ← Uttarakhand Trips (NEW)
wondrr.in/trips/india/himachal-pradesh/             ← Himachal Trips (NEW)
wondrr.in/trips/india/goa/                          ← Goa Trips (NEW)
wondrr.in/trips/international/                      ← International Trips
wondrr.in/trips/international/bali/                 ← Bali (NEW)
wondrr.in/trips/international/vietnam/              ← Vietnam (NEW)
wondrr.in/trips/international/thailand/             ← Thailand (NEW)
wondrr.in/trips/international/nepal/                ← Nepal (NEW)
wondrr.in/trips/international/europe/               ← Europe (NEW)
```

### Trip Type Category Pages
```
wondrr.in/group-trips/                              ← Group Trips hub (NEW)
wondrr.in/group-trips/treks/                        ← All Treks (NEW)
wondrr.in/group-trips/bike-trips/                   ← Bike Trips (NEW)
wondrr.in/group-trips/weekend-getaways/             ← Weekend Getaways (NEW)
wondrr.in/group-trips/backpacking/                  ← Backpacking (NEW)
wondrr.in/group-trips/budget-trips/                 ← Budget Under ₹5,000 (NEW)
wondrr.in/group-trips/international/                ← International Group Tours (NEW)
wondrr.in/girls-trips/                              ← All Girls Trips (EXISTS)
```

### Departure City Pages (High Commercial Intent)
```
wondrr.in/trips-from/delhi/                         ← Group Trips from Delhi (NEW)
wondrr.in/trips-from/mumbai/                        ← Group Trips from Mumbai (NEW)
wondrr.in/trips-from/bangalore/                     ← Group Trips from Bangalore (NEW)
wondrr.in/trips-from/pune/                          ← Group Trips from Pune (NEW)
wondrr.in/trips-from/hyderabad/                     ← Group Trips from Hyderabad (NEW)
```

### Blog Structure
```
wondrr.in/blog/                                     ← Blog hub (EXISTS, empty)
wondrr.in/blog/destination-guides/                  ← Category (NEW)
wondrr.in/blog/destination-guides/spiti-valley-travel-guide/
wondrr.in/blog/destination-guides/ladakh-travel-guide/
wondrr.in/blog/destination-guides/meghalaya-travel-guide/
wondrr.in/blog/travel-tips/                         ← Category (NEW)
wondrr.in/blog/travel-tips/solo-travel-india-guide/
wondrr.in/blog/travel-tips/group-travel-tips/
wondrr.in/blog/travel-tips/packing-list-himalayan-trek/
wondrr.in/blog/stories/                             ← Traveler Stories (NEW)
wondrr.in/blog/stories/strangers-to-friends/
wondrr.in/blog/seasonal/                            ← Seasonal Guides (NEW)
wondrr.in/blog/seasonal/best-places-to-visit-in-july-india/
wondrr.in/blog/seasonal/monsoon-trips-india/
wondrr.in/blog/seasonal/best-winter-trips-india/
wondrr.in/blog/operator-spotlight/                  ← Unique to Wondrr (NEW)
wondrr.in/blog/operator-spotlight/top-group-travel-companies-india/
```

### Trust / Authority Pages
```
wondrr.in/about/                                    ← About Wondrr (EXISTS)
wondrr.in/how-we-work/                              ← How We Work (EXISTS)
wondrr.in/partner-with-us/                          ← Partner/Operators
wondrr.in/operators/                                ← Operator Directory (NEW — major SEO asset)
wondrr.in/operators/[operator-slug]/                ← Individual operator pages (NEW)
wondrr.in/faq/                                      ← FAQ Hub (NEW)
wondrr.in/reviews/                                  ← All Reviews (NEW)
```

---

## URL Naming Rules

1. Lowercase, hyphenated, no underscores
2. Match search query language: `/spiti-valley/` not `/spiti/`
3. Destination names: common search form (`/ladakh/` not `/leh-ladakh/`)
4. Trip type: generic terms that match search (`/treks/` not `/trekking-experiences/`)
5. Blog slugs: match exact keyword target (`/solo-travel-india-guide/` not `/guide-to-solo-travel/`)

---

## Internal Linking Architecture

### Hub-and-Spoke Model
Each destination/trip-type category page is a HUB linking to:
- Relevant trip listings (spokes)
- Related blog posts (spokes)
- Related trip types (cross-hub)

### Footer Link Strategy (CaptureATrip-style)
Current footer has: Privacy, Refund, Blog — only 3 links.

**Add these footer columns:**
```
Popular Destinations          Trip Types               Quick Links
├── Spiti Valley Trips        ├── Weekend Getaways      ├── About Wondrr
├── Ladakh Trips              ├── Himalayan Treks       ├── How We Work
├── Manali Trips              ├── Bike Trips            ├── Partner With Us
├── Meghalaya Trips           ├── All Girls Trips       ├── Blog
├── Kashmir Trips             ├── Budget Trips          ├── FAQ
├── Kerala Trips              ├── International Tours   ├── Reviews
├── Rajasthan Trips           └── Backpacking Trips     ├── Privacy Policy
└── All Trips                                           └── Refund Policy

Departures
├── Trips from Delhi
├── Trips from Mumbai
├── Trips from Bangalore
├── Trips from Pune
└── Trips from Hyderabad
```

**Why:** CaptureATrip's 26-link footer passes link equity to all destination pages. Every page on Wondrr will then link to key destination pages, dramatically improving their crawl priority and ranking signal.

---

## Sitemap Updates Needed

Current sitemap coverage gaps (from memory notes):
- `/explore/[stateCode]` pages exist but NOT in sitemap — fix immediately
- Add all new category pages when created
- Set `changefreq="weekly"` for trip listing pages, `"monthly"` for blog posts
- `priority` hierarchy: Home=1.0, Destination hubs=0.9, Trip pages=0.8, Blog=0.7

---

## Priority Build Order

| Priority | URL Pattern | Effort | SEO Impact |
|----------|-------------|--------|------------|
| P0 | Fix `/explore/` in sitemap | 30min | High — pages indexed |
| P0 | Footer link expansion | 2hrs | High — sitewide crawl equity |
| P1 | `/trips/india/[destination]/` pages (top 5) | 1-2 days each | Very High |
| P1 | `/group-trips/weekend-getaways/` | 1 day | High |
| P1 | `/trips-from/delhi/` | 1 day | High (commercial) |
| P2 | `/group-trips/treks/`, `/group-trips/bike-trips/` | 1 day each | High |
| P2 | `/trips-from/mumbai/`, `/trips-from/bangalore/` | 1 day each | Medium-High |
| P3 | `/operators/` directory | 3-5 days | High (E-E-A-T) |
| P3 | `/faq/` hub with FAQPage schema | 1 day | Medium |
