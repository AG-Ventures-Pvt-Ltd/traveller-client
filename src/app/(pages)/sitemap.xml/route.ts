// app/sitemap.xml/route.ts  ← sitemap index (central one)
export async function GET() {
    
    const baseUrl = 'https://wondrr.in';

    const sitemaps = ['pages.xml', 'trips.xml', 'hosts.xml', 'blog.xml'];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
                        <sitemapindex  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
                        ${sitemaps.map(sitemap => `
                        <sitemap>
                            <loc>${baseUrl}/sitemaps/${sitemap}</loc>
                            <lastmod>${new Date().toISOString()}</lastmod>
                        </sitemap>`).join('')}
                        </sitemapindex>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}