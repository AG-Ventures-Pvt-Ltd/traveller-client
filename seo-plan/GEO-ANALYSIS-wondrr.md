# GEO Analysis — wondrr.in

Audit date: 2026-08-25
Method: Direct `curl` fetch of raw HTML (no JS execution) for homepage, robots.txt,
llms.txt, sitemap tree, one trip detail page, one blog post, the About page, and the
Trips listing page. No DataForSEO MCP tools were available in this environment, so
platform-level citation scores are heuristic estimates based on technical/content
signals, not live-measured citation rates. Brand-mention presence on third-party
platforms (Reddit, YouTube, LinkedIn activity) could not be reliably verified — no
WebSearch tool was available and JS-rendered search UIs (YouTube, Reddit) return
empty shells to a plain fetch. These are flagged as unverified below rather than
guessed.

Pages fetched:
- https://wondrr.in/ (homepage)
- https://wondrr.in/robots.txt
- https://wondrr.in/llms.txt
- https://wondrr.in/rsl-license.txt
- https://wondrr.in/sitemap.xml (+ 5 sub-sitemaps: pages, trips, hosts, blog, explore)
- https://wondrr.in/trip/brahmatal-trek-wpnrw
- https://wondrr.in/blog/spiti-valley-bike-trip-full-itinerary-route-and-real-costs-0zcozk
- https://wondrr.in/about
- https://wondrr.in/trips

---

## 1. GEO Readiness Score: 69/100

| Dimension | Weight | Score /100 | Weighted |
|---|---|---|---|
| Citability | 25% | 78 | 19.5 |
| Structural Readability | 20% | 65 | 13.0 |
| Multi-Modal Content | 15% | 50 | 7.5 |
| Authority & Brand Signals | 20% | 55 | 11.0 |
| Technical Accessibility | 20% | 90 | 18.0 |
| **Total** | | | **69.0** |

Wondrr is unusually far along for a startup: `llms.txt` exists, an RSL license is
published, robots.txt explicitly allows the major AI search crawlers, pages are
server-rendered, and blog/about/trip pages carry Article/FAQPage/Breadcrumb schema
with a real author, dates, and question-phrased passages inside the 134-167 word
citation sweet spot. The score is held back by two things: no third-party authority
signals (no Wikipedia, no YouTube, unverifiable Reddit presence) and a structural
defect on the trip detail template — the highest-volume page type on the site has
**no `<h1>` tag**.

---

## 2. Platform Breakdown (heuristic — not live-measured)

| Platform | Est. Score /100 | Reasoning |
|---|---|---|
| Google AI Overviews | 66 | Strong schema (FAQPage/Article/Breadcrumb), clean SSR, sitemap present. Held back by missing H1 on trip pages and no Wikipedia/knowledge-graph presence. |
| ChatGPT (search/browse) | 68 | GPTBot + OAI-SearchBot explicitly allowed; `llms.txt` present (OpenAI has stated it looks for these); short direct FAQ answers are exactly ChatGPT's preferred citation shape. |
| Perplexity | 67 | PerplexityBot explicitly allowed; direct-answer FAQ blocks and specific-number passages ("140 words," "₹35,000," "9-day itinerary") are Perplexity's preferred citation pattern. |
| Bing Copilot | 58 | No explicit Bingbot/BingPreview rule (falls to permissive wildcard, so not blocked), but weaker authority signals (no Wikipedia/LinkedIn engagement data) hurt Bing's index-quality-weighted ranking more than the others. |

Only 11% of domains are cited by both ChatGPT and Google AI Overviews — the schema
and llms.txt investment already made here is what puts Wondrr in a position to be
one of them, but the H1 gap and thin authority signals are the limiting factors.

---

## 3. AI Crawler Access Status (robots.txt)

```
User-agent: *
Disallow: /verify/*
Disallow: /auth/

User-agent: *
Allow: /llms.txt

User-agent: GPTBot        → Allow: /
User-agent: ClaudeBot     → Allow: /
User-agent: Google-Extended → Allow: /
User-agent: PerplexityBot → Allow: /
User-agent: Googlebot     → Allow: /
User-agent: OAI-SearchBot → Allow: /
User-agent: anthropic-ai  → Allow: /

Sitemap: https://wondrr.in/sitemap.xml
```

| Crawler | Status | Notes |
|---|---|---|
| GPTBot | Allowed (explicit) | |
| OAI-SearchBot | Allowed (explicit) | |
| ChatGPT-User | Allowed (implicit, via wildcard `*`) | Not named explicitly. Real-time ChatGPT browsing uses this UA distinctly from OAI-SearchBot — worth naming explicitly for clarity even though it isn't blocked today. |
| ClaudeBot | Allowed (explicit) | |
| PerplexityBot | Allowed (explicit) | |
| CCBot (Common Crawl) | Allowed (implicit, via wildcard) | Not blocked, despite `llms.txt` stating "AI training: Not permitted without written consent." Common Crawl is a primary training-data source for many LLMs — this is an enforcement gap against the site's own stated policy. |
| anthropic-ai | Allowed (explicit) | Note: this is Anthropic's *training* crawler (separate from ClaudeBot, which is the search/agent crawler). Explicitly allowing it contradicts the llms.txt "no training without consent" clause — likely unintentional. |
| Bytespider (TikTok/ByteDance) | Allowed (implicit, via wildcard) | Same policy/enforcement mismatch as CCBot. |
| cohere-ai | Allowed (implicit, via wildcard) | Same policy/enforcement mismatch as CCBot. |

Only `/verify/*` and `/auth/` are blocked sitewide — these are account/auth flows, not
content, so there's no accidental blocking of indexable pages. No page-level
`<meta name="robots">` tags were found on any of the 5 fetched pages (homepage, trip,
blog, about, trips listing) — all default to `index,follow`, which is correct.

**Key inconsistency to fix:** llms.txt says training is "Not permitted without
written consent," but robots.txt explicitly allows `anthropic-ai` (a training
crawler) and implicitly allows CCBot/Bytespider/cohere-ai via the open wildcard.
Either loosen the llms.txt language or add explicit `Disallow: /` blocks for the
training-only crawlers the skill flags (CCBot, anthropic-ai, cohere-ai) to match
stated policy.

---

## 4. llms.txt Status: Present, well-formed

`https://wondrr.in/llms.txt` returns 200 and follows the emerging llms.txt
convention closely: H1 name, blockquote summary, `## Key Pages`, `## Trip
Categories`, `## Pricing`, `## Verified Hosts`, `## Content`, `## Contact`,
`## Notes`, `## Licensing`, and an `## RSL: 1.0` section linking to
`/rsl-license.txt`.

Strengths:
- Concise entity summary in the first paragraph (what Wondrr is, how it differs
  from WhatsApp-coordinated group trips, the 15-traveler cap) — this is exactly
  the kind of self-contained definition AI answer engines lift verbatim.
- Explicit pricing range and contact info (email + 2 phone numbers) — useful for
  transactional/local-intent queries.
- Links to sitemap.xml for full URL discovery instead of trying to enumerate
  hundreds of trip/blog URLs inline.

Gaps:
- No `dateModified`/last-updated marker on the llms.txt file itself, so crawlers
  can't tell how fresh the trip-category and pricing figures are.
- The `## RSL: 1.0` reference points to a **plain-text** license file
  (`/rsl-license.txt`), not a machine-readable RSL XML document. The real RSL
  1.0 spec (rslstandard.org) expects a `License:` directive in robots.txt
  pointing to an `application/rsl+xml` resource with per-content-type
  `<permits>`/`<prohibits>` elements so crawlers can parse licensing terms
  programmatically. What's published today is human-readable only — good for an
  LLM reading llms.txt, but it won't be picked up by anything parsing robots.txt
  for a `License:` line.

Recommendation: add a `License:` directive to robots.txt pointing to a proper
RSL XML file (or keep the current txt as a fallback and add the XML variant) so
the licensing terms are enforceable by RSL-aware crawlers, not just readable by
LLMs that happen to fetch llms.txt.

---

## 5. Brand Mention Analysis

| Signal | Status | Confidence |
|---|---|---|
| Wikipedia entity page | **Confirmed absent** — `en.wikipedia.org/wiki/Wondrr` returns 404 | High (directly checked) |
| YouTube presence | **Unknown** — no YouTube URL in the site's own `sameAs` schema (only Instagram + LinkedIn listed); a live YouTube search couldn't be verified because YouTube's search results page requires JS and returned an empty shell to a plain fetch | Unverified — flagged, not guessed |
| Reddit presence | **Unknown** — Reddit search (including the lighter old.reddit.com endpoint) is not reachable via automated fetch in this environment | Unverified — flagged, not guessed |
| LinkedIn company page | Self-asserted only — `linkedin.com/company/wondrr` appears in the site's own Organization schema `sameAs`, confirming the page exists as a URL, but follower count/activity level could not be checked (requires authenticated access) | Self-reported, not independently verified |
| Instagram | Self-asserted — `instagram.com/wondrr.in` in `sameAs` | Self-reported, not independently verified |

Per the skill's brand-signal weighting, **YouTube mentions correlate strongest
with AI citation likelihood (~0.737)**, ahead of Reddit and Wikipedia. Wondrr's
own structured data doesn't even claim a YouTube channel, which — combined with
the confirmed absence of a Wikipedia page — is the single biggest lever left
unpulled in the Authority & Brand Signals dimension. This should be treated as a
priority gap to close (a real channel + `sameAs` entry) rather than assumed fine
because it can't be disproven.

---

## 6. Passage-Level Citability

### Homepage
Body text is present in raw (pre-JS) HTML — 21,872 characters. H1 is a marketing
tagline ("What's your next escape, Traveller?"), not a definitional statement, so
it doesn't itself function as a citable answer. The homepage carries no FAQPage
schema (About and Trip pages do) — a missed opportunity, since "What is Wondrr?"
/ "How does group travel booking work?" style Q&A would fit naturally here and
is exactly the content already written for the About page's FAQ.

### Blog post (`/blog/spiti-valley-bike-trip-...`) — best-performing page in this audit
Section-by-section word counts (trafilatura-equivalent manual boilerplate strip):

| Section | Words | In 134-167 optimal band? |
|---|---|---|
| What it actually costs | 140 | **Yes** |
| A 9-day riding itinerary | 122 | Close |
| The short version (summary) | 184 | Slightly over |
| Best time to ride | 99 | Under |
| Altitude is the real challenge | 110 | Under |
| How many days do you need for a Spiti bike trip? (H3) | 29 | Under (by design — FAQ-style) |
| Is a Spiti bike trip hard for beginners? (H3) | 34 | Under (by design — FAQ-style) |

This page is a strong GEO template: question-phrased H3s ("How many days do you
need for a Spiti bike trip?", "Is there mobile network in Spiti?"), specific
numbers (₹, dates, altitude in feet), a byline ("Wondrr Team," dated, 6-min
read), and an explicit `Article` schema with `datePublished`/`dateModified`.
The short FAQ-style answers (20-35 words) are appropriately terse for direct
citation; the longer narrative sections mostly land close to the 134-167 word
target already. **This page should be the template other blog posts and trip
pages are measured against.**

### Trip detail page (`/trip/brahmatal-trek-wpnrw`)
817 words of real body content, `FAQPage` schema with 4 Q&A pairs, `TouristTrip`
schema, breadcrumbs — good bones. But:
- **No `<h1>` anywhere in the page.** The trip title ("Brahmatal Trek · 6 Days in
  Lohajung, Uttarakhand") exists only in `<title>` and JSON-LD, not in a
  heading. Confirmed by grepping all `<h1>`–`<h6>` tags: only 3× `<h3>` and 2×
  `<h4>` exist on the entire page.
- The 6-day itinerary ("Day 1... Day 6") appears to live in an accordion/tab
  component without semantic heading markup, so each day isn't independently
  extractable as an answer block.
- FAQ answers are short (15-20 words each) — fine for direct citation but not
  self-contained enough to stand alone if extracted without the question text
  attached (e.g., "A magical session where we observe the Moon, planets..."
  needs "What is Astro Nite?" for context — the schema pairs them correctly,
  but the visible HTML FAQ block should be checked for the same pairing).

This is the single highest-leverage template fix available — trip pages are the
highest-volume content type per the sitemap (`sitemaps/trips.xml`), so this
defect is replicated across every trip listing, not just this one page.

### Trips listing page (`/trips`)
Only ~253 words of real prose, mostly filter-widget labels ("Destination,"
"Price Range," "Duration," "Difficulty"). This is expected and fine for a
filter/listing page — it is not meant to be an answer page — but it means the
`/trips` URL itself has near-zero citability and shouldn't be relied on to rank
for "best group trips in India"-style queries; that job falls to `/` and to
category/blog content instead.

---

## 7. Server-Side Rendering Check

All 5 fetched pages return full content in the raw `curl` response with **no JS
execution required**:

| Page | Raw HTML size | Body text (chars) | `__NEXT_DATA__` present? |
|---|---|---|---|
| Homepage | 120 KB | 21,872 | No |
| Trip detail | 90 KB | 4,889 | No |
| Blog post | 66 KB | 8,939 | No |
| About | 92 KB | 3,322 | No |
| Trips listing | 114 KB | 1,400 (expected — filter UI) | No |

No `id="__next"` empty-shell div and no `__NEXT_DATA__` blob were found — this
looks like a Next.js App Router site using React Server Components / streaming
SSR rather than a client-rendered SPA shell. Titles, meta descriptions,
canonical tags, Open Graph tags, and all JSON-LD blocks are present in the raw
HTML. **This is the strongest dimension in the audit** — an AI crawler that does
a plain HTTP fetch (no headless browser) gets essentially the same content a
human sees. No SSR remediation is needed.

---

## 8. Top 5 Highest-Impact Changes

| # | Change | Effort | Impact |
|---|---|---|---|
| 1 | Add a real `<h1>` to the trip detail template (wrap the existing title text — it's already computed and shown, just needs the tag) | XS (1 template edit, propagates to all trip pages via sitemap) | High — fixes the highest-volume page type's core structural signal sitewide |
| 2 | Close the robots.txt/llms.txt policy mismatch: either add explicit `Disallow: /` for CCBot, anthropic-ai, cohere-ai (training-only crawlers) to match the "no training without consent" claim in llms.txt, or soften the llms.txt licensing language to match current robots.txt behavior | XS (few lines) | Medium — currently the site's stated IP policy and its enforcement disagree, which undermines the RSL/licensing effort already made |
| 3 | Establish a real YouTube presence and add it to the Organization `sameAs` schema (even a handful of trip-recap or destination videos) | M (content production, not code) | High — strongest single brand-citation correlation signal per the skill's weighting (~0.737), and currently entirely absent from both the schema and (as far as verifiable) the platform itself |
| 4 | Add `FAQPage` schema + a short Q&A block to the homepage (reuse the About page's "What is Wondrr?" pattern) | XS-S (content already exists on About page, needs a homepage excerpt) | Medium — homepage currently has no direct-answer block despite being the most-crawled URL |
| 5 | Give trip-page itinerary days (`Day 1`, `Day 2`...) semantic headings (`<h3>`/`<h4>`) instead of accordion-only markup, so each day is independently extractable | S (template change) | Medium — improves passage-level extractability for the itinerary content, which is the most detailed/unique part of every trip page |

---

## 9. Schema Recommendations

Already implemented well: `TravelAgency` (org-level, sitewide), `WebSite` +
`SearchAction`, `Article` (blog, with `Person` author + `datePublished`/
`dateModified`), `AboutPage`, `TouristTrip`, `FAQPage`, `BreadcrumbList` — this
is a genuinely above-average schema footprint for a startup site.

Recommended additions:
- **`FAQPage` on the homepage** — reuse About page Q&A content, or a shorter
  homepage-specific subset ("What is Wondrr?", "How much do group trips cost?").
- **`Product`/`Offer` on trip pages** — `TouristTrip` is present, but adding
  `offers: { @type: Offer, price, priceCurrency: "INR", availability }` would
  let AI shopping/answer surfaces (and Google's product-rich results) surface
  price directly, which is currently only in visible text, not structured data.
- **`AggregateRating`/`Review` on trip pages**, if the visible "4.8★" ratings
  shown on trip cards have underlying review data — currently the star ratings
  are rendered as text/UI only and aren't in any JSON-LD block that was fetched.
- **`VideoObject`** once YouTube content exists (pairs with recommendation #3
  above).
- **`Organization.sameAs`** — add YouTube and any Reddit/community presence once
  established, to close the brand-signal gap in Section 5.
- Consider a **`License:` directive in robots.txt** pointing to a machine-
  readable RSL XML file, as noted in Section 4.

---

## 10. Content Reformatting Suggestions (specific passages)

1. **Trip page title → H1.** Wrap the existing `<title>` text
   ("Brahmatal Trek · 6 Days in Lohajung, Uttarakhand") in an `<h1>` at the top
   of the visible trip page body. No new copy needed — the string already
   exists and is already used in `<title>` and JSON-LD `name`.

2. **Homepage direct-answer block.** Add a short paragraph near the top,
   independent of the hero tagline, e.g.: *"Wondrr is a group travel
   marketplace where solo travellers in India book fixed-departure trips from
   50+ verified travel brands. Every host is vetted, every trip has a set
   departure date, and groups are capped at 15 travellers."* (This is
   essentially the llms.txt summary — reuse it verbatim; it's already written
   and already close to the 40-60 word direct-answer target for a lead-in
   sentence.)

3. **Trip FAQ answers — verify question/answer pairing in visible HTML, not
   just JSON-LD.** E.g. the visible answer "A magical session where we observe
   the Moon, planets, and the night sky through a telescope" should be
   rendered directly under its visible question "What is Astro Nite?" (not just
   paired in the schema) so a crawler extracting visible text — not just
   structured data — still gets a self-contained answer.

4. **"What it actually costs" section (blog post) is the citability template
   to replicate.** At 140 words, specific INR figures, and a direct opening
   sentence ("Costs vary a lot with season, group size and whether you rent or
   ride your own, so treat these as planning brackets rather than quotes:"),
   this is close to ideal. New blog posts and trip-page "Pricing" sections
   should be written to this same length/directness pattern rather than
   left as bare number lists.

5. **Itinerary days on trip pages** ("Day 1: Dehradun/Rishikesh to Lohajung...")
   currently read as continuous text inside what's likely a tab/accordion
   component. Reformat each day as its own labeled block (`Day 1: <title>` as
   a mini-heading + 2-3 sentence self-contained description) matching the
   blog post's "A 9-day riding itinerary" section, which already does this
   well (~122 words, one line per day, each day understandable without reading
   the others).
