
export async function GET() {
    const baseUrl = 'https://wondrr.in';

    const today = new Date().toISOString().split('T')[0];

    const pages = [
        { url: '', priority: '1.0', changefreq: 'weekly', lastmod: today },
        { url: '/trips', priority: '0.9', changefreq: 'daily', lastmod: today },
{ url: '/blog', priority: '0.8', changefreq: 'daily', lastmod: today },
        { url: '/partner-with-us', priority: '0.7', changefreq: 'weekly', lastmod: today },
        { url: '/about', priority: '0.5', changefreq: 'monthly', lastmod: '2026-06-01' },
        { url: '/booking-policy', priority: '0.4', changefreq: 'monthly', lastmod: '2026-06-01' },
        { url: '/privacy-policy', priority: '0.3', changefreq: 'monthly', lastmod: '2026-06-01' },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${pages.map(p => `
  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}