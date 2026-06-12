// app/sitemaps/trips.xml/route.ts  ← dynamic trips

import { getServerData } from "@/services/serverApi";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";

interface SitemapTrip {
    slug: string;
    updatedAt?: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function GET() {
    const baseUrl = 'https://wondrr.in';

    const trips: SitemapTrip[] = await getServerData(`${API_ENDPOINTS.TRIPS.GET_SLUGS_FOR_SITEMAP}`);
    const today = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${trips.map((trip) => {
    const slug = typeof trip === 'string' ? trip : trip.slug;
    const lastmod = typeof trip === 'object' && trip.updatedAt
      ? trip.updatedAt.split('T')[0]
      : today;
    return `
  <url>
    <loc>${baseUrl}/trip/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}