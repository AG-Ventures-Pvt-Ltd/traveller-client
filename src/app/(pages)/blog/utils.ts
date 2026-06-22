/** Shared helpers for the blog list + post UIs. */

export function formatDate(iso: string, long = false): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: long ? 'long' : 'short',
    year: 'numeric',
  })
}

/** Resolve a cover image path to an absolute URL (CloudFront for relative paths). */
export function resolveCover(coverImage?: string | null): string | null {
  if (!coverImage) return null
  return coverImage.startsWith('http')
    ? coverImage
    : `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL ?? ''}${coverImage}`
}

/** Deterministic brand tint for a string (category / fallback covers). */
const TINTS = ['#D0EF65', '#FFC107', '#BFE3FF', '#FFE3DA', '#EDF7D6', '#F0F7FE']
export function tintFor(key?: string | null): string {
  const s = key ?? ''
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return TINTS[h % TINTS.length]
}

/**
 * Some posts store `content` as plain text (paragraphs separated by blank lines)
 * rather than HTML. Wrap those in <p> tags so they render as real paragraphs.
 * Content that already contains block HTML is returned unchanged.
 */
export function normalizeContentToHtml(content?: string | null): string {
  if (!content) return ''
  if (/<(p|h[1-6]|ul|ol|li|blockquote|div|br|img|table|figure)\b/i.test(content)) return content
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${block.replace(/\n/g, '<br/>')}</p>`)
    .join('')
}

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Inject stable `id`s into the post's h2/h3 headings and return a table of
 * contents. Runs on already-sanitized HTML, so only our own slug strings are
 * inserted.
 */
export function processContent(html: string): { html: string; toc: TocItem[] } {
  if (!html) return { html: '', toc: [] }
  const toc: TocItem[] = []
  const used = new Set<string>()

  const slugify = (s: string) => {
    const base = s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section'
    let candidate = base
    let n = 2
    while (used.has(candidate)) candidate = `${base}-${n++}`
    used.add(candidate)
    return candidate
  }

  const processed = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, lvl: string, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, '').trim()
      if (!text) return match
      const existing = attrs.match(/\bid=["']([^"']+)["']/)
      const id = existing ? existing[1] : slugify(text)
      toc.push({ id, text, level: Number(lvl) as 2 | 3 })
      const newAttrs = existing ? attrs : `${attrs} id="${id}"`
      return `<h${lvl}${newAttrs}>${inner}</h${lvl}>`
    },
  )

  return { html: processed, toc }
}
