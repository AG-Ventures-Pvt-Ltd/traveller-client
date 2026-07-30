import sanitizeHtmlLib from 'sanitize-html';

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr', 'div', 'span',
  'ul', 'ol', 'li',
  'blockquote', 'a', 'img',
  'strong', 'b', 'em', 'i', 'u', 's', 'del', 'mark',
  'code', 'pre',
  'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption',
];

const ALLOWED_ATTRIBUTES: sanitizeHtmlLib.IOptions['allowedAttributes'] = {
  '*': ['id', 'class'],
  a: ['href', 'target', 'rel', 'title'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
  th: ['colspan', 'rowspan'],
  td: ['colspan', 'rowspan'],
};

export function sanitizeHtml(html: string | undefined | null): string {
  if (!html) return '';
  return sanitizeHtmlLib(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    transformTags: {
      a: sanitizeHtmlLib.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    },
  });
}
