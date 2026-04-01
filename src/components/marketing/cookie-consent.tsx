'use client';

import { useState, useEffect } from 'react';
import { TransitionLink } from '@/components/marketing/page-transition';
import { Button } from '@/components/ui/button';
import { registerSuperProperties } from '@/lib/analytics';

const CONSENT_KEY = 'silklearn_cookie_consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === 'accepted') {
      // Already consented — re-opt in on load (in case of new session)
      window.posthog?.opt_in_capturing();
      registerSuperProperties();
    } else {
      window.posthog?.opt_out_capturing();
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    window.posthog?.opt_in_capturing();
    registerSuperProperties();
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    window.posthog?.opt_out_capturing();
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 max-sm:bottom-20 z-50 border-t border-(--border) bg-(--background)">
      <div className="mx-auto flex max-w-400 flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-(--muted-foreground)">
          We use privacy-first analytics to understand how people use the product. No ads, no cross-site tracking.{' '}
          <TransitionLink href="/privacy" className="underline underline-offset-3 hover:text-(--foreground)">
            Privacy policy
          </TransitionLink>
        </p>
        <div className="flex shrink-0 gap-3">
          <Button size="sm" variant="outline" onClick={handleDecline}>
            No thanks
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
