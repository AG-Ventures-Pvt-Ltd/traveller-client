'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ChevronRight, BookOpen } from 'lucide-react';
import Footer from '../(landing)/Footer/Footer';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.06 },
  }),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function BlogCard({ blog, index }: { blog: BlogSummary; index: number }) {
  const coverSrc = blog.coverImage
    ? blog.coverImage.startsWith('http')
      ? blog.coverImage
      : `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${blog.coverImage}`
    : null;

  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="group flex flex-col bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <Link href={`/blog/${blog.slug}`} className="block">
        {/* Cover image */}
        <div className="relative w-full aspect-[16/9] bg-neutral-100 overflow-hidden">
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
              <BookOpen size={40} className="text-neutral-400" />
            </div>
          )}
          {/* Category badge */}
          <span className="absolute top-3 left-3 px-3 py-1 bg-neutral-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            {blog.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h2 className="text-neutral-900 font-bold text-lg leading-snug line-clamp-2 group-hover:text-neutral-600 transition-colors">
            {blog.title}
          </h2>

          {blog.excerpt && (
            <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3">
              {blog.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-3 text-neutral-400 text-xs mt-auto pt-2 border-t border-neutral-100">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(blog.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {blog.readTime} min
            </span>
          </div>

          {/* Author */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-700 text-sm font-semibold">{blog.authorName || 'Wondrr Team'}</p>
              <p className="text-neutral-400 text-xs">{blog.authorRole || 'Wondrr Team'}</p>
            </div>
            <span className="flex items-center gap-1 text-neutral-900 text-xs font-semibold group-hover:gap-2 transition-all">
              Read <ChevronRight size={14} />
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

  const fetchBlogs = useCallback(async (p: number, cat: string) => {
    setLoading(true);
    try {
      const url = API_ENDPOINTS.BLOGS.LIST(p, LIMIT, cat || undefined);
      const res = await fetch(url);
      const json = await res.json();
      setBlogs(json.data.blogs ?? []);
      setTotal(json.data.total ?? 0);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCategory = (cat: string) => {
    const next = cat === activeCategory ? '' : cat;
    setActiveCategory(next);
    setPage(1);
    fetchBlogs(1, next);
  };

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchBlogs(next, activeCategory);
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <main className="min-h-screen bg-[#FFF9F4]">
      {/* Hero */}
      <section className="bg-neutral-900 text-white px-5 md:px-9 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6">
              <BookOpen size={14} />
              Wondrr Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              Travel Tips, Stories<br />& Destination Guides
            </h1>
            <p className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Real advice from people who actually travel — treks, road trips, solo adventures,
              and everything in between.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-9 py-10 md:py-16">
        {/* Category filter */}
        {categories.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-10">
            <button
              onClick={() => handleCategory('')}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                !activeCategory
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all flex items-center gap-1 ${
                  activeCategory === cat
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <Tag size={12} />
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Count */}
        <p className="text-neutral-500 text-sm mb-6">{total} article{total !== 1 ? 's' : ''}</p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 bg-neutral-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500 text-lg">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <BlogCard key={blog._id} blog={blog} index={i} />
            ))}
          </div>
        )}

        {/* Load more */}
        {page < totalPages && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-3 bg-neutral-900 text-white rounded-full font-semibold hover:bg-neutral-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
