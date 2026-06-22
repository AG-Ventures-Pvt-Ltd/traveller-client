# Wondrr.in — SEO Implementation Roadmap
**Date:** June 2026 | Builds on audit completed June 2026 (score 51/100)

---

## What's Already Done (Technical Foundation ✅)

From the June 2026 audit and implementation:
- JSON-LD schema: Organization, WebSite, TravelAgency, TouristTrip, BreadcrumbList
- Canonical URLs (self-referencing)
- Real OG/Twitter meta tags
- llms.txt at `/public/llms.txt`
- Security headers in `next.config.ts`
- Homepage SSR (force-dynamic, 438 words + 17 links in initial HTML)
- Trip pages SSR (itinerary, description, FAQs in initial HTML)
- Internal link fixes (trip cards → `<Link>`, destination cards → `<a>`)
- Footer improved (Company section added)
- Soft-404 fix (notFound() on failed meta fetch)
- Sitewide H1 fix

**Remaining technical debt from audit:**
- `/explore/[stateCode]` pages NOT in sitemap — fix immediately
- Performance: unused JS ~324KiB, mobile LCP slow
- `OAI-SearchBot` not in robots.txt explicit allow
- Junk host row in backend (hdscjhdsch) in sitemap
- Stray `/HomePage` route — index-bloat risk

---

## Phase 1 — Quick Wins (Weeks 1-2, July 2026)

**Goal:** Fix all remaining technical debt and start content engine.

### Technical Fixes
| Task | File | Effort | Impact |
|------|------|--------|--------|
| Add `/explore/` URLs to sitemap | `src/app/(pages)/sitemaps/` | 1hr | High — pages now indexed |
| Add OAI-SearchBot to robots.txt | `public/robots.txt` | 15min | Medium — Bing Copilot citability |
| Expand footer link columns (4 columns per SITE-STRUCTURE.md) | Footer component | 2hrs | High — crawl equity to all destinations |
| Add meta descriptions to ALL pages (currently missing) | Each page's metadata | 3hrs | High — CTR from SERPs |
| Delete junk `hdscjhdsch` host from backend HOST_IDS_FOR_SITEMAP | Backend | 30min | Low |
| Add `noindex` to `/HomePage` route (or delete it) | Route file | 15min | Low |

### robots.txt Addition
```
User-agent: OAI-SearchBot
Allow: /

User-agent: anthropic-ai
Allow: /
```

### Meta Descriptions to Write (all currently missing)
| Page | Target Meta Description (≤160 chars) |
|------|--------------------------------------|
| Homepage | Browse 500+ group trips from India's top verified travel brands. Small groups of 15. Safe adventures for solo travelers. |
| /trips | Explore curated group trips across India and abroad. Verified operators, groups capped at 15. Book on Wondrr. |
| /girls-trips | Curated all-girls group trips across India. Safe, fun, verified travel brands. Small groups of 15. Browse and book now. |
| /about | Wondrr is India's group travel marketplace — 50+ verified brands, one platform. Meet like-minded travelers, cap of 15 per group. |
| /how-we-work | Discover how Wondrr curates and verifies India's top group travel operators. Safe trips, verified brands, groups of 15 max. |
| /blog | Travel guides, destination deep-dives, solo travel tips, and group travel stories from Wondrr. |

### Content: Start Publishing (Week 2)
- Publish Blog Post #1: "Solo Travel in India: The Complete Beginner's Guide (2026)"
- Publish Blog Post #2: "Group Trips in India: Everything You Need to Know"
- Submit guest post #1 to Medium (01-group-travel-psychology.md)
- Publish LinkedIn article (#4 Dzukou Valley)

---

## Phase 2 — Content Foundation (Weeks 3-8, July-August 2026)

**Goal:** 16 blog posts live. First destination category pages. Start appearing in SERPs.

### Content (2 posts/week)
- Follow CONTENT-CALENDAR.md Month 1 + Month 2 schedule exactly
- Every post must include: author byline, FAQPage schema, internal links to trip pages

### New Pages to Build
| Page | URL | Effort | Priority |
|------|-----|--------|---------|
| Spiti Valley destination hub | `/trips/india/spiti-valley/` | 2 days | P1 |
| Ladakh destination hub | `/trips/india/ladakh/` | 2 days | P1 |
| Weekend Getaways category | `/group-trips/weekend-getaways/` | 1 day | P1 |
| Trips from Delhi | `/trips-from/delhi/` | 1 day | P1 |
| Manali destination hub | `/trips/india/manali/` | 1 day | P2 |
| Trips from Mumbai | `/trips-from/mumbai/` | 1 day | P2 |

### Page Template Requirements for Destination Hubs
Each `/trips/india/[destination]/` page needs:
- H1: "Group Trips to [Destination] | Wondrr"
- 200-300 word intro with primary keyword + 2-3 related keywords
- Filtered trip listings (API: filter by destination)
- "About [Destination]" section (100-150 words)
- "Best time to visit" section
- FAQ section (5 Q&As) with FAQPage schema
- Internal links: related blog post + other destinations
- BreadcrumbList schema: Home > Group Trips > India > [Destination]

### Guest Post Submissions (Weeks 3-5)
Continue per CONTENT-CALENDAR.md schedule — YourStory, Tripoto, Quora.

---

## Phase 3 — Authority Building (Weeks 9-16, Sept-Oct 2026)

**Goal:** 40 blog posts, complete destination hub network, begin link acquisition, GEO score to 60+.

### Content
- Follow Month 3-4 calendar
- Start "Traveler Stories" series (1/month) — interview actual Wondrr travelers
- Publish first "Operator Spotlight" post (introduces a Wondrr partner brand)

### Site Architecture Completion
| Page | URL | Priority |
|------|-----|---------|
| Meghalaya destination hub | `/trips/india/meghalaya/` | P1 |
| Trekking category hub | `/group-trips/treks/` | P1 |
| Bike Trips category hub | `/group-trips/bike-trips/` | P1 |
| Bali international hub | `/trips/international/bali/` | P2 |
| Trips from Bangalore | `/trips-from/bangalore/` | P2 |
| Operator directory | `/operators/` | P2 |

### Link Building
- All 10 guest posts submitted by end of Phase 2
- New guest post targets: Hindustan Times Travel, Indian Express Travel, Economic Times
- Reach out to travel YouTubers for Wondrr trip reviews
- Target "best group travel companies India" listicles — email site owners for inclusion

### Technical: Performance
- Audit and remove/code-split unused JS (target: reduce from 324KiB)
- Mobile LCP improvement (lazy-load hero image, preconnect CDN)
- Run Lighthouse audit; target LCP < 2.5s on mobile

### YouTube Launch
- Create Wondrr Travel YouTube channel
- Upload first 3 videos (see CONTENT-CALENDAR.md YouTube section)
- Embed relevant YouTube videos in blog posts

---

## Phase 4 — Scale & Compound (Months 5-12, Nov 2026 – June 2027)

**Goal:** 100+ blog posts, rank top 5 for primary keywords, 3x organic traffic.

### Content Velocity
- Increase to 3 posts/week (hire 1 travel writer if needed)
- Add Web Stories for top 5 posts (like JustWravel)
- Newsletter launch (Substack or native) — build email list

### Authority Signals
- Pursue 2-3 press features (YourStory startup story — blog #2 should pave the way)
- Wikipedia entity creation for Wondrr brand
- Crunchbase / AngelList / LinkedIn company page enrichment
- Reddit presence: r/IndiaTravel answers that reference Wondrr trips

### Schema Expansion
- Add `Event` schema to upcoming group trips (departure dates)
- Add `Review` schema to operator pages
- Add `ItemList` schema to all category listing pages
- Implement `SpeakableSpecification` for voice search potential

### International SEO (if targeting NRIs / expats)
- hreflang for `en-in` vs `en-us` (if relevant)
- Separate landing pages for Indian diaspora planning India trips

---

## KPI Tracking Dashboard

| Metric | Baseline (June 2026) | 3 Month Target | 6 Month Target | 12 Month Target |
|--------|---------------------|----------------|----------------|-----------------|
| Blog posts published | 0 | 24 | 50+ | 120+ |
| Organic sessions/month | ~0 (est.) | 500-1,000 | 3,000-5,000 | 15,000-25,000 |
| Keywords ranking top 50 | ~0 | 50+ | 200+ | 500+ |
| Keywords ranking top 10 | 0 | 5-10 | 30-50 | 100+ |
| Domain Authority (Moz) | ~10-15 (est.) | 15-20 | 20-25 | 30+ |
| Backlinks (referring domains) | <10 (est.) | 20-30 | 50+ | 100+ |
| GEO Citability Score | 38/100 | 55/100 | 65/100 | 75/100 |
| Indexed pages | ~15 | 60+ | 150+ | 300+ |
| Blog-driven bookings | 0 | 5-10/month | 20-30/month | 80-100/month |

---

## Resource Requirements

| Role | Hours/Week | Phase |
|------|------------|-------|
| Developer (technical SEO) | 4-6hrs | Phase 1-2 |
| Content writer (travel) | 10-15hrs | Phase 2+ (or founder-written initially) |
| SEO strategist (reviews + adjusts) | 2hrs | Ongoing |
| YouTube creator/editor | 4-6hrs | Phase 3+ |

**Minimum viable start (founder-only):** 2 blog posts/week + technical fixes from Phase 1.  
**Monthly cost if outsourced:** ₹20,000-40,000/month for freelance travel writer producing 8 posts.

---

## What NOT to Do

- Don't buy backlinks — domain is new, easy to over-optimize and trigger penalty
- Don't publish thin AI-generated posts without human editing and expertise signals
- Don't create destination pages without actual trip inventory for that destination
- Don't copy competitor content structure exactly — use Wondrr's marketplace angle as differentiator
- Don't add a root-level `loading.tsx` back (breaks 404 status — documented in memory)
