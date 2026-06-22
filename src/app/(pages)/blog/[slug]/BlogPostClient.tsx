'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Clock, Compass, Link2, List, Share2 } from 'lucide-react';
import Footer from '../../(landing)/components/Footer/Footer';
import { sanitizeHtml } from '@/common/utils/sanitizeHtml';
import { formatDate, normalizeContentToHtml, processContent, tintFor, type TocItem } from '../utils';

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

function ShareRow({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const share = (platform: 'wa' | 'x') => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title || 'Wondrr');
    const href =
      platform === 'wa'
        ? `https://wa.me/?text=${text}%20${url}`
        : `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(href, '_blank', 'noopener,noreferrer');
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };
  const btn =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-900 bg-white transition-colors hover:bg-[#D0EF65]';
  return (
    <div className="flex items-center gap-2">
      <button onClick={copy} aria-label="Copy link" className={btn}>
        {copied ? <Check size={16} strokeWidth={3} /> : <Link2 size={16} />}
      </button>
      <button onClick={() => share('wa')} aria-label="Share on WhatsApp" className={btn}>
        <Share2 size={16} />
      </button>
      <button onClick={() => share('x')} aria-label="Share on X" className={`${btn} w-auto px-3 text-sm font-bold`}>
        X
      </button>
    </div>
  );
}

function TableOfContents({ toc, activeId }: { toc: TocItem[]; activeId: string }) {
  return (
    <nav aria-label="Table of contents" className="rounded-2xl border-2 border-neutral-900 bg-white p-5">
      <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
        <List size={14} /> In this article
      </p>
      <ul className="flex flex-col gap-1">
        {toc.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              className={`block rounded-lg py-1 pl-3 text-sm transition-colors ${t.level === 3 ? 'pl-6' : ''} ${
                activeId === t.id ? 'bg-[#D0EF65] font-semibold text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {t.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function BlogPostClient({ blog, image }: Props) {
  const { html, toc } = useMemo(
    () => processContent(sanitizeHtml(normalizeContentToHtml(blog.content))),
    [blog.content],
  );
  const articleRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min((h.scrollTop / max) * 100, 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (toc.length === 0 || !articleRef.current) return;
    const headings = Array.from(articleRef.current.querySelectorAll('h2[id], h3[id]'));
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id);
        }
      },
      { rootMargin: '-90px 0px -70% 0px', threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc]);

  const author = blog.authorName || 'Wondrr Team';

  return (
    <main className="min-h-screen bg-[#FFF9F4]">
      {/* Reading progress */}
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
        <div className="h-full bg-[#D0EF65] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="mx-auto max-w-5xl px-5 pt-10 sm:px-8 sm:pt-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-neutral-900">Blog</Link>
          <span>/</span>
          <span className="truncate text-neutral-700">{blog.title}</span>
        </nav>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-5">
          {blog.category && (
            <span className="w-fit rounded-full border-2 border-neutral-900 px-3 py-1 text-xs font-bold text-neutral-900" style={{ backgroundColor: tintFor(blog.category) }}>
              {blog.category}
            </span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold leading-[1.12] tracking-tight text-neutral-900 sm:text-5xl"
          >
            {blog.title}
          </motion.h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500">
            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-900 bg-[#FFC107] text-sm font-bold text-neutral-900">
                {author[0].toUpperCase()}
              </span>
              <span className="font-semibold text-neutral-900">{author}</span>
            </span>
            {blog.createdAt && <span>{formatDate(blog.createdAt, true)}</span>}
            {blog.readTime ? (
              <span className="inline-flex items-center gap-1"><Clock size={14} />{blog.readTime} min read</span>
            ) : null}
          </div>
        </div>

        {/* Cover */}
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-[28px] border-2 border-neutral-900 shadow-[8px_8px_0_0_#111]">
          {image ? (
            <Image src={image} alt={blog.title || 'Cover'} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: tintFor(blog.title) }}>
              <Compass size={64} className="text-neutral-900/40" />
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
          <article ref={articleRef}>
            {blog.excerpt && (
              <p className="mb-10 rounded-2xl border-2 border-neutral-900 bg-white p-5 text-lg font-medium leading-relaxed text-neutral-700 shadow-[5px_5px_0_0_#D0EF65]">
                {blog.excerpt}
              </p>
            )}

            {/* Mobile TOC */}
            {toc.length > 1 && (
              <details className="mb-8 rounded-2xl border-2 border-neutral-900 bg-white p-4 lg:hidden">
                <summary className="flex cursor-pointer items-center gap-2 text-sm font-bold text-neutral-900">
                  <List size={16} /> In this article
                </summary>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className={`block text-sm text-neutral-600 ${t.level === 3 ? 'pl-4' : ''}`}>{t.text}</a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t-2 border-dashed border-neutral-200 pt-8">
                {blog.tags.map((tag) => (
                  <span key={tag} className="rounded-full border-2 border-neutral-900 bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm font-semibold text-neutral-700">Share</span>
              <ShareRow title={blog.title} />
            </div>

            {/* Author */}
            <div className="mt-10 flex items-start gap-4 rounded-3xl border-2 border-neutral-900 bg-white p-6 shadow-[6px_6px_0_0_#111]">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-neutral-900 bg-[#FFC107] text-lg font-bold text-neutral-900">
                {author[0].toUpperCase()}
              </span>
              <div>
                <p className="font-bold text-neutral-900">{author}</p>
                {blog.authorRole && <p className="text-sm text-neutral-500">{blog.authorRole}</p>}
              </div>
            </div>

            <div className="mt-10">
              <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-neutral-700 transition-colors hover:text-neutral-900">
                <ArrowLeft size={16} /> Back to blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-10 flex flex-col gap-6">
              {toc.length > 1 && <TableOfContents toc={toc} activeId={activeId} />}

              <div className="rounded-2xl border-2 border-neutral-900 bg-[#D0EF65] p-5 shadow-[6px_6px_0_0_#111]">
                <p className="text-lg font-bold text-neutral-900">Ready to explore?</p>
                <p className="mt-1 text-sm leading-relaxed text-neutral-800">Browse verified group trips across India.</p>
                <Link
                  href="/trips"
                  className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                >
                  Browse trips
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
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
