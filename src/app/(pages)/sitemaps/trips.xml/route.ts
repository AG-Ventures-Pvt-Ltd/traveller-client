// app/sitemaps/trips.xml/route.ts  ← dynamic trips

import { getServerData } from "@/services/serverApi";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";

interface SitemapTrip {
    slug: string;
}

export const revalidate = 86400;

export async function GET() {
    const baseUrl = 'https://wondrr.in';

    const trips: SitemapTrip[] = await getServerData(`${API_ENDPOINTS.TRIPS.GET_SLUGS_FOR_SITEMAP}`);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${trips.map((slug) => `
  <url>
    <loc>${baseUrl}/trip/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}