// app/sitemap.xml/route.ts  ← sitemap index (central one)
export async function GET() {
    
    const baseUrl = 'https://wondrr.in';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
                        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                        <sitemap>
                            <loc>${baseUrl}/sitemaps/pages.xml</loc>
                            <lastmod>${new Date().toISOString()}</lastmod>
                        </sitemap>
                        <sitemap>
                            <loc>${baseUrl}/sitemaps/trips.xml</loc>
                            <lastmod>${new Date().toISOString()}</lastmod>
                        </sitemap>
                        </sitemapindex>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}