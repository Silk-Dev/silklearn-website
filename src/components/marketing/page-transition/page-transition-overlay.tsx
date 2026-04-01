'use client';

/**
 * Persistent page-transition overlay.
 * Lives in the layout (not the template) so it never remounts between
 * navigations and GSAP inline styles are never clobbered by React.
 */
export function PageTransitionOverlay() {
  return (
    <div
      id="curve-transition"
      className="pointer-events-none fixed inset-0 z-100 overflow-hidden"
      style={{ visibility: 'hidden' }}
    >
      <svg
        id="curve-svg"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.6231 0.1880 259.8145)" />
            <stop offset="100%" stopColor="oklch(0.6231 0.1880 259.8145)" />
          </linearGradient>
        </defs>
        <path
          id="curve-path"
          d="M 0,0 Q 50,-15 100,0 L 100,100 Q 50,115 0,100 Z"
          fill="url(#curveGradient)"
        />
      </svg>

      <div
        id="page-name-display"
        className="absolute inset-0 flex items-center justify-center opacity-0"
      >
        <span
          className="text-5xl font-semibold tracking-[-0.04em] text-(--background) md:text-6xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        />
      </div>
    </div>
  );
}
