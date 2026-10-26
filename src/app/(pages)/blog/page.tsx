import { Metadata } from 'next';
import { getServerData } from '@/services/serverApi';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import BlogListClient from './BlogListClient';

export const dynamic = 'force-dynamic';

const BLOG_TITLE = 'Wondrr Travel Blog: Honest Trek & Destination Guides';
const BLOG_IMAGE = [{ url: 'https://wondrr.in/png/metadata.png', width: 3944, height: 1584, alt: "Wondrr — group trips from India's top travel brands" }];

// Post count is read from the API so the "80+" claim can't go stale; below 80 we
// drop the number rather than overstate it.
export async function generateMetadata(): Promise<Metadata> {
  let total = 0;
  try {
    total = (await getServerData<{ total: number }>(API_ENDPOINTS.BLOGS.LIST(1, 1)))?.total ?? 0;
  } catch {}
  const guides = total >= 80 ? `${Math.floor(total / 10) * 10}+ guides` : 'Guides';
  const description = `Route distances, best time to visit, trek difficulty and real costs. ${guides} to Himalayan treks, road trips and weekend getaways in India.`;
  return {
    title: BLOG_TITLE,
    description,
    alternates: { canonical: 'https://wondrr.in/blog' },
    openGraph: {
      title: BLOG_TITLE, description, url: 'https://wondrr.in/blog', type: 'website',
      siteName: 'Wondrr', locale: 'en_IN', images: BLOG_IMAGE,
    },
    twitter: { card: 'summary_large_image', title: BLOG_TITLE, description, images: ['https://wondrr.in/png/metadata.png'] },
  };
}

interface BlogSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  authorName: string;
  authorRole: string;
  readTime: number;
  createdAt: string;
}

interface BlogsPayload {
  blogs: BlogSummary[];
  total: number;
  totalPages: number;
}

interface CategoriesPayload {
  categories: string[];
}

export default async function BlogPage() {
  let initialBlogs: BlogSummary[] = [];
  let initialTotal = 0;
  let categories: string[] = [];

  try {
    const [blogsData, categoriesData] = await Promise.all([
      getServerData<BlogsPayload>(API_ENDPOINTS.BLOGS.LIST(1, 12)),
      getServerData<CategoriesPayload>(API_ENDPOINTS.BLOGS.CATEGORIES),
    ]);
    initialBlogs = blogsData.blogs ?? [];
    initialTotal = blogsData.total ?? 0;
    categories = categoriesData.categories ?? [];
  } catch {
    // Client will fetch on hydration
  }

  return (
    <>
      {/* SSR content for crawlers */}
      <p className="sr-only">
        Wondrr&apos;s travel blog features tips for group travel, solo adventures, destination guides,
        packing lists, and stories from real travellers exploring India and beyond.
      </p>
      <BlogListClient
        initialBlogs={initialBlogs}
        initialTotal={initialTotal}
        categories={categories}
      />
    </>
  );
}
