'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, User, Tag, ArrowLeft } from 'lucide-react';
import Footer from '../../(landing)/Footer/Footer';
import { sanitizeHtml } from '@/common/utils/sanitizeHtml';

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
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  blog: Blog;
  image: string | null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPostClient({ blog, image }: Props) {
  return (
    <main className="min-h-screen bg-[#FFF9F4]">
      {/* Hero */}
      <section className="bg-neutral-900 text-white">
        {image && (
          <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <Image
              src={image}
              alt={blog.title}
              fill
              className="object-cover opacity-40"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
          </div>
        )}
        <div className={`max-w-4xl mx-auto px-5 md:px-9 ${image ? '-mt-32 relative z-10' : 'pt-16'} pb-12`}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-neutral-400 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-neutral-300 truncate max-w-[200px]">{blog.title}</span>
          </nav>

          {/* Category */}
          <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full mb-4">
            {blog.category}
          </span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black leading-tight mb-6"
          >
            {blog.title}
          </motion.h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-neutral-300 text-sm">
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <User size={14} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{blog.authorName || 'Wondrr Team'}</p>
                <p className="text-neutral-400 text-xs">{blog.authorRole || 'Wondrr Team'}</p>
              </div>
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(blog.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {blog.readTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-5 md:px-9 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Content */}
          <article>
            {blog.excerpt && (
              <p className="text-xl text-neutral-600 leading-relaxed border-l-4 border-neutral-900 pl-5 mb-10 italic">
                {blog.excerpt}
              </p>
            )}

            <div
              className="
                prose prose-neutral max-w-none
                prose-headings:font-black prose-headings:text-neutral-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-neutral-700 prose-p:leading-[1.85] prose-p:text-base
                prose-a:text-neutral-900 prose-a:font-semibold prose-a:underline prose-a:underline-offset-2
                prose-strong:text-neutral-900 prose-strong:font-bold
                prose-ul:text-neutral-700 prose-li:leading-relaxed
                prose-ol:text-neutral-700
                prose-blockquote:border-neutral-900 prose-blockquote:text-neutral-600 prose-blockquote:not-italic
                prose-img:rounded-2xl prose-img:shadow-md
                prose-hr:border-neutral-200
              "
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
            />

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-neutral-200">
                <Tag size={14} className="text-neutral-400 mt-0.5" />
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author card */}
            <div className="mt-12 p-6 bg-white rounded-2xl border border-neutral-200 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-lg">
                  {(blog.authorName || 'W')[0].toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-neutral-900 font-bold">{blog.authorName || 'Wondrr Team'}</p>
                <p className="text-neutral-500 text-sm">{blog.authorRole || 'Wondrr Team'}</p>
                <p className="text-neutral-600 text-sm mt-2 leading-relaxed">
                  Passionate about making group travel easy, safe, and unforgettable for travellers across India.
                </p>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-neutral-700 font-semibold hover:text-neutral-900 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 flex flex-col gap-6">
              {/* Reading progress card */}
              <div className="p-5 bg-white rounded-2xl border border-neutral-200">
                <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wide mb-3">In this article</p>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock size={14} />
                  {blog.readTime} min read
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600 mt-2">
                  <Tag size={14} />
                  {blog.category}
                </div>
              </div>

              {/* CTA */}
              <div className="p-5 bg-neutral-900 text-white rounded-2xl">
                <p className="font-black text-lg mb-2">Ready to explore?</p>
                <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                  Browse group trips with verified hosts across India.
                </p>
                <Link
                  href="/trips"
                  className="block text-center px-4 py-2.5 bg-white text-neutral-900 rounded-xl font-bold text-sm hover:bg-neutral-100 transition-colors"
                >
                  Browse Trips
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
