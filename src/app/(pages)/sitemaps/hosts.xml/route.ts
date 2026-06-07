// app/sitemaps/trips.xml/route.ts  ← dynamic trips

import { getServerData } from "@/services/serverApi";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";

interface SitemapTrip {
    slug: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = 604800;

export async function GET() {

    const baseUrl = 'https://wondrr.in';

    const hosts: SitemapTrip[] = await getServerData(`${API_ENDPOINTS.USER.HOST_IDS_FOR_SITEMAP}`);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${hosts.map((username) => `
  <url>
    <loc>${baseUrl}/${username}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}