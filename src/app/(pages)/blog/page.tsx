import { Metadata } from 'next';
import { getServerData } from '@/services/serverApi';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import BlogListClient from './BlogListClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Travel Blog — Tips, Guides & Stories | Wondrr',
  description:
    "Explore travel tips, destination guides, adventure stories, and solo travel advice from the Wondrr team — India's group travel platform.",
  alternates: { canonical: 'https://wondrr.in/blog' },
  openGraph: {
    title: 'Travel Blog — Tips, Guides & Stories | Wondrr',
    description:
      'Explore travel tips, destination guides, adventure stories, and solo travel advice from the Wondrr team.',
    url: 'https://wondrr.in/blog',
    type: 'website',
  },
};

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
