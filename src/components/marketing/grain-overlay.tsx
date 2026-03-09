'use client';

import { useEffect, useState } from 'react';

const PAGE_TRANSITION_DONE_EVENT = 'silklearn:page-transition-in-done';
const GRAIN_IDLE_DELAY_MS = 1600;

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function GrainOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const reveal = () => {
      setIsVisible(true);
    };

    const handleTransitionDone = () => {
      reveal();
    };

    const idleWindow = window as IdleWindow;
    const timeoutId = window.setTimeout(reveal, GRAIN_IDLE_DELAY_MS);
    const idleId = idleWindow.requestIdleCallback?.(reveal, { timeout: GRAIN_IDLE_DELAY_MS + 400 });

    window.addEventListener(PAGE_TRANSITION_DONE_EVENT, handleTransitionDone, { once: true });

    return () => {
      window.clearTimeout(timeoutId);

      if (typeof idleId === 'number') {
        idleWindow.cancelIdleCallback?.(idleId);
      }

      window.removeEventListener(PAGE_TRANSITION_DONE_EVENT, handleTransitionDone);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-2 bg-[url('/grain.png')] bg-contain bg-repeat opacity-100"
    />
  );
}