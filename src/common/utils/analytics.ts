// GA4 event helper — only fires in production (gtag loaded only when isEnvProd)
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

// Funnel source stored in sessionStorage so it survives navigation within the session.
// Cleared on purchase so repeat visits start fresh.
const FUNNEL_SOURCE_KEY = 'wondrr_funnel_source';

export function setFunnelSource(source: 'landing' | 'search' | 'direct') {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(FUNNEL_SOURCE_KEY, source);
  }
}

export function getFunnelSource(): string {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(FUNNEL_SOURCE_KEY) || 'direct';
  }
  return 'direct';
}

export function clearFunnelSource() {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem(FUNNEL_SOURCE_KEY);
  }
}
