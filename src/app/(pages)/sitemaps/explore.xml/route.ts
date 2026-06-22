import { getServerData } from "@/services/serverApi";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";

interface ExploreState {
    stateCode: string;
    name: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = 604800; // 1 week — states change rarely

export async function GET() {
    const baseUrl = 'https://wondrr.in';
    const today = new Date().toISOString().split('T')[0];

    let states: ExploreState[] = [];
    try {
        const data = await getServerData<{ states: ExploreState[] }>(
            API_ENDPOINTS.LANDING_PAGE.EXPLORE_STATES
        );
        states = data?.states ?? [];
    } catch {
        // Return empty sitemap on API failure rather than breaking
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${states.map((state) => `
  <url>
    <loc>${baseUrl}/explore/${state.stateCode}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}
