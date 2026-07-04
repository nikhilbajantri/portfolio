// Lightweight client-side analytics dispatch utilities

export function trackEvent(eventName: string, data: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  
  // Custom endpoint logging or console telemetry in dev mode
  if (import.meta.env.DEV) {
    console.log(`[Telemetry] Event: ${eventName}`, data);
  } else {
    // Dispatch to external provider (e.g. Cloudflare, Plausible, custom serverless endpoint)
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ eventName, data, timestamp: Date.now() }) });
  }
}

export function trackPageView(path: string) {
  trackEvent('page_view', { path, referrer: document.referrer });
}

export function trackSearch(query: string, resultsCount: number) {
  trackEvent('search', { query, resultsCount, isZeroResult: resultsCount === 0 });
}
