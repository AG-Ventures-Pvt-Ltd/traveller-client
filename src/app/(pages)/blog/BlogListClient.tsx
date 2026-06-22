'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Compass } from 'lucide-react';
import Footer from '../(landing)/components/Footer/Footer';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { formatDate, resolveCover, tintFor } from './utils';

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

interface Props {
  initialBlogs: BlogSummary[];
  initialTotal: number;
  categories: string[];
}

const LIMIT = 12;
const SHADOWS = ['#FFC107', '#D0EF65', '#BFE3FF', '#FFE3DA'];

function Cover({ blog, sizes }: { blog: BlogSummary; sizes: string }) {
  const src = resolveCover(blog.coverImage);
  if (src) {
    return (
      <Image src={src} alt={blog.title || 'Article'} fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-105" />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: tintFor(blog.title) }}>
      <Compass size={44} className="text-neutral-900/40" />
    </div>
  );
}

function Meta({ blog, className = '' }: { blog: BlogSummary; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-xs font-medium text-neutral-500 ${className}`}>
      {blog.createdAt && <span>{formatDate(blog.createdAt)}</span>}
      {blog.readTime ? (
        <>
          <span className="h-1 w-1 rounded-full bg-neutral-300" />
          <span className="inline-flex items-center gap-1"><Clock size={12} />{blog.readTime} min</span>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCard({ blog }: { blog: BlogSummary }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-[28px] border-2 border-neutral-900 bg-white shadow-[10px_10px_0_0_#D0EF65]"
    >
      <Link href={`/blog/${blog.slug}`} className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-neutral-900 lg:border-b-0 lg:border-r-2">
          <Cover blog={blog} sizes="(max-width: 1024px) 100vw, 50vw" />
          <span className="absolute left-4 top-4 rounded-full border-2 border-neutral-900 bg-[#D0EF65] px-3 py-1 text-xs font-bold text-neutral-900">
            ★ Featured
          </span>
        </div>
        <div className="flex flex-col gap-4 p-6 sm:p-8">
          {blog.category && (
            <span className="w-fit rounded-full border-2 border-neutral-900 px-3 py-1 text-xs font-bold text-neutral-900" style={{ backgroundColor: tintFor(blog.category) }}>
              {blog.category}
            </span>
          )}
          <h2 className="text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl">{blog.title}</h2>
          {blog.excerpt && <p className="line-clamp-3 text-base leading-relaxed text-neutral-600">{blog.excerpt}</p>}
          <Meta blog={blog} className="mt-1" />
          <div className="mt-auto flex items-center justify-between pt-2">
            <p className="text-sm font-semibold text-neutral-900">{blog.authorName || 'Wondrr Team'}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-900 transition-all group-hover:gap-2.5">
              Read article <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function BlogCard({ blog, index }: { blog: BlogSummary; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.05, 0.3) }}
      className="group flex flex-col overflow-hidden rounded-3xl border-2 border-neutral-900 bg-white transition-transform duration-300 hover:-translate-y-1.5"
      style={{ boxShadow: `6px 6px 0 0 ${SHADOWS[index % SHADOWS.length]}` }}
    >
      <Link href={`/blog/${blog.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b-2 border-neutral-900">
          <Cover blog={blog} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          {blog.category && (
            <span className="absolute left-3 top-3 rounded-full border-2 border-neutral-900 bg-white px-2.5 py-1 text-xs font-bold text-neutral-900">
              {blog.category}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h2 className="line-clamp-2 text-lg font-bold leading-snug text-neutral-900">{blog.title}</h2>
          {blog.excerpt && <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">{blog.excerpt}</p>}
          <Meta blog={blog} className="mt-auto pt-2" />
          <div className="flex items-center justify-between border-t-2 border-dashed border-neutral-200 pt-3">
            <p className="text-sm font-semibold text-neutral-700">{blog.authorName || 'Wondrr Team'}</p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-neutral-900 transition-all group-hover:gap-2">
              Read <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogListClient({ initialBlogs, initialTotal, categories }: Props) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBlogs = useCallback(async (p: number, cat: string, append: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.BLOGS.LIST(p, LIMIT, cat || undefined));
      const json = await res.json();
      const next: BlogSummary[] = json.data.blogs ?? [];
      setBlogs((prev) => (append ? [...prev, ...next] : next));
      setTotal(json.data.total ?? 0);
    } catch {
      // silent — keep current list
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCategory = (cat: string) => {
    const next = cat === activeCategory ? '' : cat;
    setActiveCategory(next);
    setPage(1);
    fetchBlogs(1, next, false);
  };

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchBlogs(next, activeCategory, true);
  };

  const totalPages = Math.ceil(total / LIMIT);
  const showFeatured = !activeCategory && blogs.length > 0;
  const gridBlogs = showFeatured ? blogs.slice(1) : blogs;

  return (
    <main className="min-h-screen bg-[#FFF9F4]">
      <div className="px-3 pt-3 sm:px-5 sm:pt-5">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[32px] border-2 border-neutral-900 bg-white px-5 py-14 shadow-[10px_10px_0_0_#111] sm:px-10 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #111 1px, transparent 0)',
              backgroundSize: '26px 26px',
              maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 72%)',
            }}
          />
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-900 bg-[#FFC107] px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900">
              <BookOpen size={14} /> Wondrr Blog
            </span>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl">
              Travel tips, stories &{' '}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-1 z-0 h-[14px] rounded-sm bg-[#D0EF65] sm:h-[18px]" />
                <span className="relative z-10">guides</span>
              </span>
            </h1>
            <p className="max-w-xl text-base text-neutral-600 sm:text-lg">
              Real advice from people who actually travel — treks, road trips, solo adventures and everything in between.
            </p>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Category pills */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {['', ...categories].map((cat) => {
              const on = activeCategory === cat;
              return (
                <button
                  key={cat || 'all'}
                  onClick={() => handleCategory(cat)}
                  className={`rounded-full border-2 border-neutral-900 px-4 py-2 text-sm font-semibold transition-all ${
                    on ? 'bg-[#D0EF65] text-neutral-900' : 'bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {cat || 'All'}
                </button>
              );
            })}
          </div>
        )}

        <p className="mb-6 text-sm font-medium text-neutral-500">
          {total} article{total !== 1 ? 's' : ''}{activeCategory && ` in ${activeCategory}`}
        </p>

        {loading && blogs.length === 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl border-2 border-neutral-200 bg-neutral-100" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <BookOpen size={48} className="text-neutral-300" />
            <p className="text-lg text-neutral-500">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {showFeatured && <FeaturedCard blog={blogs[0]} />}
            {gridBlogs.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridBlogs.map((blog, i) => (
                  <BlogCard key={blog._id} blog={blog} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {page < totalPages && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="rounded-2xl border-2 border-neutral-900 bg-neutral-900 px-8 py-3.5 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#D0EF65] disabled:opacity-50"
            >
              {loading ? 'Loading…' : 'Load more articles'}
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
