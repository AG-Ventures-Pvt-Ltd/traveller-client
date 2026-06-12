import { getServerData } from '@/services/serverApi';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface BlogSlug {
  slug: string;
  updatedAt?: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = 43200; // 12 hours

export async function GET() {
  const baseUrl = 'https://wondrr.in';
  const today = new Date().toISOString().split('T')[0];

  let blogs: BlogSlug[] = [];
  try {
    blogs = await getServerData<BlogSlug[]>(API_ENDPOINTS.BLOGS.SITEMAP);
  } catch {
    blogs = [];
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  ${blogs.map((b) => {
    const lastmod = b.updatedAt ? b.updatedAt.split('T')[0] : today;
    return `<url>
    <loc>${baseUrl}/blog/${b.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n  ')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
