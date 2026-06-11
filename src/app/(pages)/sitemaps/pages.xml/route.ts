
export async function GET() {
    const baseUrl = 'https://wondrr.in';

    const pages = [
        { url: '', priority: '1.0', changefreq: 'weekly' },
        { url: '/trips', priority: '0.9', changefreq: 'daily' },
        { url: '/booking-policy', priority: '0.7', changefreq: 'monthly' },
        { url: '/partner-with-us', priority: '0.7', changefreq: 'weekly' },
        { url: '/about', priority: '0.5', changefreq: 'monthly' },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${pages.map(p => `
  <url>
    <loc>${baseUrl}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}