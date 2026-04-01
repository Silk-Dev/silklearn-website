/**
 * SILKLEARN Marketing Analytics
 *
 * Core tracking utility. Fires to both PostHog (EU) and GA4.
 * Handles UTM first-touch/current-touch, consent gating, dev exclusion.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UTMProperties {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}

export interface FirstTouchProperties {
  ft_utm_source?: string;
  ft_utm_medium?: string;
  ft_utm_campaign?: string;
  ft_utm_content?: string;
  ft_referrer?: string;
}

export interface BaseProperties extends UTMProperties, FirstTouchProperties {
  page_path: string;
  page_title: string;
  referrer: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  app_env: string;
}

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, props?: Record<string, unknown>) => void;
      register: (props: Record<string, unknown>) => void;
      opt_in_capturing: () => void;
      opt_out_capturing: () => void;
      has_opted_in_capturing: () => boolean;
      has_opted_out_capturing: () => boolean;
    };
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const UTM_FIRST_KEY = 'sk_utm_first';
const CONSENT_KEY = 'silklearn_cookie_consent';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function getCurrentUTMs(): UTMProperties {
  const p = new URLSearchParams(window.location.search);
  const result: UTMProperties = {};
  const s = p.get('utm_source');
  const m = p.get('utm_medium');
  const c = p.get('utm_campaign');
  const co = p.get('utm_content');
  if (s) result.utm_source = s;
  if (m) result.utm_medium = m;
  if (c) result.utm_campaign = c;
  if (co) result.utm_content = co;
  return result;
}

function getFirstTouchUTMs(): FirstTouchProperties {
  try {
    const raw = localStorage.getItem(UTM_FIRST_KEY);
    if (!raw) return {};
    const p = JSON.parse(raw) as Record<string, string>;
    const result: FirstTouchProperties = {};
    if (p.utm_source) result.ft_utm_source = p.utm_source;
    if (p.utm_medium) result.ft_utm_medium = p.utm_medium;
    if (p.utm_campaign) result.ft_utm_campaign = p.utm_campaign;
    if (p.utm_content) result.ft_utm_content = p.utm_content;
    if (p.referrer) result.ft_referrer = p.referrer;
    return result;
  } catch {
    return {};
  }
}

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Persist first-touch UTMs on the first visit that includes UTM parameters.
 * Call on every page load — it's a no-op if already stored.
 */
export function captureUTMs(): void {
  const current = getCurrentUTMs();
  if (!current.utm_source) return;
  try {
    if (!localStorage.getItem(UTM_FIRST_KEY)) {
      localStorage.setItem(
        UTM_FIRST_KEY,
        JSON.stringify({ ...current, referrer: document.referrer, ts: Date.now() }),
      );
    }
  } catch {
    // localStorage unavailable — ignore
  }
}

/**
 * Register PostHog super properties (UTMs, device, env) so they attach to
 * every future capture call automatically.
 * Call once after PostHog loads and consent is confirmed.
 */
export function registerSuperProperties(): void {
  if (typeof window === 'undefined') return;
  if (!hasConsent()) return;
  const current = getCurrentUTMs();
  const firstTouch = getFirstTouchUTMs();
  window.posthog?.register({
    ...current,
    ...firstTouch,
    device_type: getDeviceType(),
    app_env: process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'local',
  });
}

/**
 * Returns true when this is internal/dev traffic that should not pollute
 * production reporting.
 */
export function isInternalTraffic(): boolean {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
  return (
    hostname === 'localhost' ||
    hostname.startsWith('127.') ||
    hostname.startsWith('192.168.') ||
    vercelEnv === 'preview' ||
    vercelEnv === 'development' ||
    new URLSearchParams(window.location.search).has('silklearn_internal')
  );
}

/**
 * Build the base properties attached to every event.
 */
export function getBaseProperties(): BaseProperties {
  return {
    ...getCurrentUTMs(),
    ...getFirstTouchUTMs(),
    page_path: window.location.pathname,
    page_title: document.title,
    referrer: document.referrer,
    device_type: getDeviceType(),
    app_env: process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'local',
  };
}

/**
 * Fire an analytics event to both PostHog and GA4.
 * Silent no-op on internal/dev traffic or if window is undefined.
 */
export function track(
  event: string,
  properties: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return;
  if (isInternalTraffic()) return;

  const props = { ...getBaseProperties(), ...properties };

  // PostHog — only when user consented
  if (hasConsent()) {
    window.posthog?.capture(event, props);
  }

  // GA4 — uses its own consent signals set in analytics.tsx
  window.gtag?.('event', event, props);
}
