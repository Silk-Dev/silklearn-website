'use client';

import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

const SCROLL_THRESHOLDS = [25, 50, 75, 90] as const;
const TIME_THRESHOLDS_S = [30, 60, 120, 300] as const;

/**
 * Combined page analytics hook.
 * Tracks: scroll depth, time-on-page thresholds, section views, form abandoned.
 * Drop into template.tsx (remounts on every route change) so it resets per page.
 */
export function usePageAnalytics() {
  useScrollDepth();
  useTimeOnPage();
  useSectionViewed();
  useFormAbandoned();
}

function useScrollDepth() {
  useEffect(() => {
    const fired = new Set<number>();

    function onScroll() {
      const el = document.documentElement;
      const scrolled = el.scrollTop + el.clientHeight;
      const total = el.scrollHeight;
      if (total <= el.clientHeight) return;

      const pct = Math.round((scrolled / total) * 100);
      for (const threshold of SCROLL_THRESHOLDS) {
        if (pct >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          track('scroll_depth_reached', {
            scroll_percent: threshold,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

function useTimeOnPage() {
  const enteredAt = useRef<number>(0);

  useEffect(() => {
    enteredAt.current = Date.now();
    const fired = new Set<number>();

    const timers = TIME_THRESHOLDS_S.map((s) =>
      window.setTimeout(() => {
        if (fired.has(s)) return;
        fired.add(s);
        track('time_on_page_threshold', { seconds_elapsed: s });
      }, s * 1000),
    );

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      const elapsed = Math.round((Date.now() - enteredAt.current) / 1000);
      if (elapsed >= 5) {
        track('page_left', { seconds_elapsed: elapsed });
      }
    };
  }, []);
}

function useSectionViewed() {
  useEffect(() => {
    const observed = new Set<string>();
    const sections = document.querySelectorAll<HTMLElement>('[data-section]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = (entry.target as HTMLElement).dataset.section;
          if (!name || observed.has(name)) continue;
          observed.add(name);
          track('section_viewed', { section_name: name });
        }
      },
      { threshold: 0.35 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}

function useFormAbandoned() {
  useEffect(() => {
    let formInteracted = false;
    let formSubmitted = false;

    const onFocus = (e: FocusEvent) => {
      if ((e.target as HTMLElement).closest('form')) formInteracted = true;
    };

    const onSubmit = () => {
      formSubmitted = true;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && formInteracted && !formSubmitted) {
        track('form_abandoned', { form_id: 'waitlist' });
      }
    };

    document.addEventListener('focusin', onFocus);
    document.addEventListener('submit', onSubmit);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('submit', onSubmit);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);
}
