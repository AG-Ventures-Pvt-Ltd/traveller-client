import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServerData } from '@/services/serverApi';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { JsonLd, SITE_URL } from '@/common/seo/JsonLd';
import BlogPostClient from './BlogPostClient';

export const dynamic = 'force-dynamic';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  authorName: string;
  authorRole: string;
  metaTitle: string;
  metaDescription: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

async function fetchBlog(slug: string): Promise<Blog | null> {
  try {
    return await getServerData<Blog>(API_ENDPOINTS.BLOGS.BY_SLUG(slug));
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    notFound();
  }

  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || blog.excerpt || `Read ${blog.title} on the Wondrr travel blog.`;
  const url = `${SITE_URL}/blog/${blog.slug}`;
  const image = blog.coverImage
    ? blog.coverImage.startsWith('http')
      ? blog.coverImage
      : `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${blog.coverImage}`
    : `${SITE_URL}/assets/png/banner.png`;

  return {
    title: `${title} | Wondrr Blog`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.authorName || 'Wondrr Team'],
      tags: blog.tags,
      images: [{ url: image, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    notFound();
  }

  const url = `${SITE_URL}/blog/${blog.slug}`;
  const image = blog.coverImage
    ? blog.coverImage.startsWith('http')
      ? blog.coverImage
      : `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${blog.coverImage}`
    : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt || blog.metaDescription,
    url,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    image: image ? [image] : undefined,
    author: {
      '@type': 'Person',
      name: blog.authorName || 'Wondrr Team',
      jobTitle: blog.authorRole || 'Wondrr Team',
      worksFor: {
        '@type': 'Organization',
        name: 'Wondrr',
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wondrr',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/png/logo.png`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: blog.tags?.join(', '),
    articleSection: blog.category,
    timeRequired: `PT${blog.readTime}M`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: blog.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <BlogPostClient blog={blog} image={image} />
    </>
  );
}
