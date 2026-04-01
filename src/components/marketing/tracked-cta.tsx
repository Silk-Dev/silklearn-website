'use client';

import type { ComponentProps } from 'react';
import { TransitionLink } from './page-transition';
import { track } from '@/lib/analytics';

type Props = ComponentProps<typeof TransitionLink> & {
  trackEvent?: 'cta_primary_clicked' | 'cta_secondary_clicked';
  trackPayload?: Record<string, unknown>;
};

/**
 * Drop-in replacement for TransitionLink that fires an analytics event on click.
 * Use inside `<Button asChild>` just like TransitionLink.
 */
export function TrackedTransitionLink({
  trackEvent,
  trackPayload,
  onClick,
  ...props
}: Props) {
  return (
    <TransitionLink
      {...props}
      onBeforeNavigate={() => {
        if (trackEvent) track(trackEvent, trackPayload ?? {});
      }}
      onClick={onClick}
    />
  );
}
