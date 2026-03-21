'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

/**
 * Lottie illustration placeholder.
 *
 * Renders a dashed-border frame with a human-readable description
 * of what the Lottie animation should depict. Replace each instance
 * with a real <DotLottieReact /> or inline SVG once the illustrations
 * are designed and exported from After Effects / Rive / Lottie.
 */

type LottiePlaceholderProps = {
  /** Short label shown above the description */
  label: string;
  /** Detailed description of what the animation should show */
  description: string;
  /** Imported Lottie JSON data */
  animationData?: object;
  /** Public path to a Lottie JSON file */
  animationSrc?: string;
  /** Tailwind height class (default: h-56) */
  height?: string;
  animationClassName?: string;
  className?: string;
};

function StepOneDocumentScanAnimation() {
  return (
    <div className="doc-scan-animation">
      <div className="doc doc-pdf">
        <span className="badge">PDF</span>
        <span className="line line-heading" />
        <span className="line" />
        <span className="line line-short" />
      </div>

      <div className="doc doc-docx">
        <span className="badge">DOCX</span>
        <span className="line line-heading" />
        <span className="line" />
        <span className="line line-short" />
      </div>

      <div className="doc doc-md">
        <span className="badge">MD</span>
        <span className="line line-heading" />
        <span className="line" />
        <span className="line line-short" />
      </div>

      <div className="pull-lane" />

      <div className="scanner">
        <div className="scanner-surface">
          <span className="scan-heading" />
          <span className="scan-line scan-line-1" />
          <span className="scan-line scan-line-2" />
          <span className="scan-line scan-line-3" />
          <span className="scan-line scan-line-4" />
        </div>
        <div className="scanner-beam" />
      </div>

      <style>{`
        .doc-scan-animation {
          position: relative;
          height: 100%;
          min-height: 7rem;
          overflow: hidden;
        }

        .doc {
          position: absolute;
          width: 5.5rem;
          height: 4.5rem;
          border: 1px solid color-mix(in oklab, var(--primary) 24%, white);
          background: color-mix(in oklab, white 94%, var(--primary) 6%);
          box-shadow: 0 4px 18px color-mix(in oklab, var(--primary) 10%, transparent);
          padding: 0.7rem 0.6rem;
        }

        .doc-pdf {
          left: 10%;
          top: 26%;
          animation: docPdf 4.8s cubic-bezier(0.45, 0, 0.2, 1) infinite;
        }

        .doc-docx {
          left: 15%;
          top: 19%;
          animation: docDocx 4.8s cubic-bezier(0.45, 0, 0.2, 1) infinite;
        }

        .doc-md {
          left: 20%;
          top: 12%;
          animation: docMd 4.8s cubic-bezier(0.45, 0, 0.2, 1) infinite;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 2.35rem;
          height: 1.1rem;
          border: 1px solid color-mix(in oklab, var(--primary) 18%, white);
          color: var(--primary);
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .line,
        .scan-line,
        .scan-heading {
          display: block;
          height: 0.22rem;
          margin-top: 0.38rem;
          background: color-mix(in oklab, var(--primary) 14%, white);
        }

        .line-heading,
        .scan-heading {
          width: 72%;
          margin-top: 0.55rem;
          background: color-mix(in oklab, var(--primary) 24%, white);
        }

        .line-short,
        .scan-line-3 {
          width: 64%;
        }

        .scan-line-4 {
          width: 52%;
        }

        .pull-lane {
          position: absolute;
          left: 42%;
          top: 50%;
          width: 14%;
          height: 1px;
          background: linear-gradient(90deg, color-mix(in oklab, var(--primary) 0%, transparent), color-mix(in oklab, var(--primary) 42%, transparent));
        }

        .scanner {
          position: absolute;
          right: 7%;
          top: 10%;
          width: 6.75rem;
          height: 5.75rem;
          border: 1px solid color-mix(in oklab, var(--primary) 22%, white);
          background: color-mix(in oklab, white 96%, var(--primary) 4%);
          overflow: hidden;
        }

        .scanner-surface {
          position: absolute;
          inset: 0;
          padding: 0.9rem 0.8rem;
        }

        .scanner-beam {
          position: absolute;
          top: 0.35rem;
          bottom: 0.35rem;
          width: 1.2rem;
          background: linear-gradient(180deg, color-mix(in oklab, var(--primary) 14%, transparent), color-mix(in oklab, var(--primary) 42%, transparent), color-mix(in oklab, var(--primary) 14%, transparent));
          box-shadow: 0 0 18px color-mix(in oklab, var(--primary) 28%, transparent);
          filter: blur(0.4px);
          animation: beamSweep 4.8s ease-in-out infinite;
        }

        .scan-heading,
        .scan-line {
          animation: scanPulse 4.8s ease-in-out infinite;
        }

        .scan-line-1 { animation-delay: 0.05s; }
        .scan-line-2 { animation-delay: 0.1s; }
        .scan-line-3 { animation-delay: 0.15s; }
        .scan-line-4 { animation-delay: 0.2s; }

        @keyframes docPdf {
          0%, 14% { transform: translate(0, 0) rotate(-12deg); opacity: 1; }
          32% { transform: translate(4px, 1px) rotate(-17deg); opacity: 1; }
          68% { transform: translate(108px, -6px) rotate(-4deg); opacity: 0.92; }
          82% { transform: translate(126px, -6px) rotate(-2deg); opacity: 0.18; }
          100% { transform: translate(0, 0) rotate(-12deg); opacity: 1; }
        }

        @keyframes docDocx {
          0%, 14% { transform: translate(0, 0) rotate(-5deg); opacity: 1; }
          32% { transform: translate(6px, 0) rotate(-8deg); opacity: 1; }
          68% { transform: translate(104px, 2px) rotate(-1deg); opacity: 0.92; }
          82% { transform: translate(122px, 2px) rotate(0deg); opacity: 0.18; }
          100% { transform: translate(0, 0) rotate(-5deg); opacity: 1; }
        }

        @keyframes docMd {
          0%, 14% { transform: translate(0, 0) rotate(2deg); opacity: 1; }
          32% { transform: translate(8px, -1px) rotate(4deg); opacity: 1; }
          68% { transform: translate(100px, 6px) rotate(1deg); opacity: 0.92; }
          82% { transform: translate(118px, 6px) rotate(0deg); opacity: 0.18; }
          100% { transform: translate(0, 0) rotate(2deg); opacity: 1; }
        }

        @keyframes beamSweep {
          0%, 34% { left: -1.4rem; opacity: 0; }
          44% { left: 0.55rem; opacity: 0.55; }
          64% { left: 4.4rem; opacity: 0.85; }
          78% { left: 6rem; opacity: 0; }
          100% { left: 6rem; opacity: 0; }
        }

        @keyframes scanPulse {
          0%, 40%, 100% {
            background: color-mix(in oklab, var(--primary) 14%, white);
            opacity: 0.72;
          }
          50%, 66% {
            background: color-mix(in oklab, var(--primary) 34%, white);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export function LottiePlaceholder({
  label,
  description,
  animationData,
  animationSrc,
  height = 'h-56',
  animationClassName = 'h-[78%] w-[78%] max-h-full max-w-full',
  className,
}: LottiePlaceholderProps) {
  const [resolvedAnimationData, setResolvedAnimationData] = useState<object | null>(animationData ?? null);
  const isStepOneAnimation = label === 'Lottie · Step 01';

  useEffect(() => {
    if (animationData) {
      setResolvedAnimationData(animationData);
      return;
    }

    if (!animationSrc) {
      setResolvedAnimationData(null);
      return;
    }

    let isCancelled = false;

    const loadAnimation = async () => {
      try {
        const response = await fetch(animationSrc);

        if (!response.ok) {
          throw new Error(`Failed to load animation from ${animationSrc}`);
        }

        const payload = await response.json() as object;

        if (!isCancelled) {
          setResolvedAnimationData(payload);
        }
      } catch {
        if (!isCancelled) {
          setResolvedAnimationData(null);
        }
      }
    };

    void loadAnimation();

    return () => {
      isCancelled = true;
    };
  }, [animationData, animationSrc]);

  return (
    <div className={className}>
      {resolvedAnimationData ? (
        <div className={`flex ${height} w-full items-center justify-center overflow-hidden`}>
          <Lottie
            animationData={resolvedAnimationData}
            autoplay
            className={animationClassName}
            loop
          />
        </div>
      ) :(
      <div
        aria-hidden
        className={`flex ${height} flex-col border border-dashed border-[oklch(from_var(--primary)_l_c_h/0.22)] bg-[oklch(from_var(--primary)_l_c_h/0.03)] px-6 ${isStepOneAnimation ? 'justify-start pt-4 text-left' : 'items-center justify-center text-center'}`}
      >
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-(--primary)">
          {label}
        </p>
        {!resolvedAnimationData ?  (
          <p className="mt-2 max-w-[44ch] text-[0.78rem] leading-4 text-(--muted-foreground)">
            {description}
          </p>
        ):''}
      </div>)}
    </div>
  );
}
