'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SOURCE_NODES = [
  { x: 80, y: 45, label: 'Source 1' },
  { x: 80, y: 100, label: 'Source 2' },
  { x: 80, y: 155, label: 'Source 3' },
];

const CENTRAL = { x: 300, y: 100 };

const OUTPUT_NODES = [
  { x: 520, y: 45, label: 'Path A' },
  { x: 520, y: 100, label: 'Path B' },
  { x: 520, y: 155, label: 'Path C' },
];

const IN_PATHS = [
  'M 80 45 C 175 45 225 95 300 100',
  'M 80 100 C 190 100 210 100 300 100',
  'M 80 155 C 175 155 225 105 300 100',
];

const OUT_PATHS = [
  'M 300 100 C 375 100 425 58 520 45',
  'M 300 100 C 390 100 430 100 520 100',
  'M 300 100 C 375 100 425 142 520 155',
];

export function FeaturesHeroGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceRefs = useRef<(SVGGElement | null)[]>([]);
  const centralRef = useRef<SVGGElement | null>(null);
  const outputRefs = useRef<(SVGGElement | null)[]>([]);
  const inPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const outPathRefs = useRef<(SVGPathElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ── Initial hidden state ──────────────────────────────────────
        SOURCE_NODES.forEach(({ x, y }, i) => {
          const el = sourceRefs.current[i];
          if (!el) return;
          gsap.set(el, { opacity: 0, scale: 0.5, transformOrigin: `${x}px ${y}px` });
        });

        OUTPUT_NODES.forEach(({ x, y }, i) => {
          const el = outputRefs.current[i];
          if (!el) return;
          gsap.set(el, { opacity: 0, scale: 0.5, transformOrigin: `${x}px ${y}px` });
        });

        if (centralRef.current) {
          gsap.set(centralRef.current, {
            opacity: 0,
            scale: 0.5,
            transformOrigin: `${CENTRAL.x}px ${CENTRAL.y}px`,
          });
        }

        [...inPathRefs.current, ...outPathRefs.current].forEach((path) => {
          if (!path) return;
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        });

        // ── After entrance: start looping flows + central pulse ───────
        const startLoops = () => {
          if (centralRef.current) {
            gsap.to(centralRef.current, {
              scale: 1.06,
              duration: 1.8,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              transformOrigin: `${CENTRAL.x}px ${CENTRAL.y}px`,
            });
          }

          inPathRefs.current.forEach((path, i) => {
            if (!path) return;
            const len = path.getTotalLength();
            gsap.fromTo(
              path,
              { strokeDashoffset: len, opacity: 0 },
              {
                strokeDashoffset: 0,
                opacity: 0.55,
                duration: 1.2,
                ease: 'power2.out',
                repeat: -1,
                repeatDelay: 1.1,
                delay: i * 0.22,
                immediateRender: false,
              },
            );
          });

          outPathRefs.current.forEach((path, i) => {
            if (!path) return;
            const len = path.getTotalLength();
            gsap.fromTo(
              path,
              { strokeDashoffset: len, opacity: 0 },
              {
                strokeDashoffset: 0,
                opacity: 0.45,
                duration: 1.1,
                ease: 'power2.out',
                repeat: -1,
                repeatDelay: 1.1,
                delay: 0.5 + i * 0.22,
                immediateRender: false,
              },
            );
          });
        };

        // ── Entrance timeline ─────────────────────────────────────────
        const tl = gsap.timeline({ delay: 0.2, onComplete: startLoops });

        const sourcesVisible = sourceRefs.current.filter((el): el is SVGGElement => el !== null);
        tl.to(sourcesVisible, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.7)',
        });

        inPathRefs.current.forEach((path, i) => {
          if (!path) return;
          tl.to(
            path,
            { strokeDashoffset: 0, opacity: 0.55, duration: 0.85, ease: 'power2.out' },
            i === 0 ? '-=0.2' : undefined,
          );
        });

        tl.to(
          centralRef.current,
          { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' },
          '-=0.3',
        );

        outPathRefs.current.forEach((path, i) => {
          if (!path) return;
          tl.to(
            path,
            { strokeDashoffset: 0, opacity: 0.45, duration: 0.85, ease: 'power2.out' },
            i === 0 ? '-=0.2' : undefined,
          );
        });

        const outputsVisible = outputRefs.current.filter((el): el is SVGGElement => el !== null);
        tl.to(
          outputsVisible,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'back.out(1.7)',
          },
          '-=0.35',
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} aria-hidden="true" className="relative w-full select-none">
      <svg
        aria-hidden="true"
        className="w-full overflow-visible"
        role="presentation"
        viewBox="0 0 600 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="fhg-node-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(from var(--primary) l c h / 0.22)" />
            <stop offset="100%" stopColor="oklch(from var(--primary) l c h / 0)" />
          </radialGradient>
          <radialGradient id="fhg-central-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(from var(--primary) l c h / 0.3)" />
            <stop offset="100%" stopColor="oklch(from var(--primary) l c h / 0)" />
          </radialGradient>
          <filter id="fhg-node-blur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="fhg-central-blur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Incoming convergence paths */}
        {IN_PATHS.map((d, i) => (
          <path
            key={`in-${i}`}
            ref={(el) => {
              inPathRefs.current[i] = el;
            }}
            d={d}
            fill="none"
            stroke="oklch(from var(--primary) l c h / 0.72)"
            strokeLinecap="round"
            strokeWidth={1.3}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Outgoing fan paths */}
        {OUT_PATHS.map((d, i) => (
          <path
            key={`out-${i}`}
            ref={(el) => {
              outPathRefs.current[i] = el;
            }}
            d={d}
            fill="none"
            stroke="oklch(from var(--primary) l c h / 0.62)"
            strokeLinecap="round"
            strokeWidth={1.15}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Source nodes */}
        {SOURCE_NODES.map(({ x, y, label }, i) => (
          <g
            key={`source-${i}`}
            ref={(el) => {
              sourceRefs.current[i] = el;
            }}
          >
            <circle
              cx={x}
              cy={y}
              fill="url(#fhg-node-halo)"
              filter="url(#fhg-node-blur)"
              opacity={0.7}
              r={22}
            />
            <circle
              cx={x}
              cy={y}
              fill="oklch(from var(--primary) l c h / 0.07)"
              r={13}
              stroke="oklch(from var(--foreground) l c h / 0.15)"
              strokeWidth={1}
            />
            {/* Document icon */}
            <rect
              fill="none"
              height={13}
              rx={1.5}
              stroke="oklch(from var(--foreground) l c h / 0.5)"
              strokeWidth={0.9}
              vectorEffect="non-scaling-stroke"
              width={10}
              x={x - 5}
              y={y - 6.5}
            />
            <line
              stroke="oklch(from var(--foreground) l c h / 0.38)"
              strokeLinecap="round"
              strokeWidth={0.8}
              vectorEffect="non-scaling-stroke"
              x1={x - 3}
              x2={x + 3}
              y1={y - 2}
              y2={y - 2}
            />
            <line
              stroke="oklch(from var(--foreground) l c h / 0.38)"
              strokeLinecap="round"
              strokeWidth={0.8}
              vectorEffect="non-scaling-stroke"
              x1={x - 3}
              x2={x + 3}
              y1={y + 1.5}
              y2={y + 1.5}
            />
            <text
              fill="oklch(from var(--foreground) l c h / 0.4)"
              fontSize={9}
              fontWeight={500}
              letterSpacing="0.03em"
              textAnchor="middle"
              x={x}
              y={y + 24}
            >
              {label}
            </text>
          </g>
        ))}

        {/* Central synthesis node */}
        <g
          ref={(el) => {
            centralRef.current = el;
          }}
        >
          <circle
            cx={CENTRAL.x}
            cy={CENTRAL.y}
            fill="url(#fhg-central-halo)"
            filter="url(#fhg-central-blur)"
            opacity={0.55}
            r={38}
          />
          <circle
            cx={CENTRAL.x}
            cy={CENTRAL.y}
            fill="oklch(from var(--primary) l c h / 0.1)"
            r={22}
            stroke="oklch(from var(--primary) l c h / 0.28)"
            strokeWidth={1}
          />
          <circle
            cx={CENTRAL.x}
            cy={CENTRAL.y}
            fill="var(--background)"
            r={14}
            stroke="oklch(from var(--foreground) l c h / 0.22)"
            strokeWidth={1}
          />
          <circle
            cx={CENTRAL.x}
            cy={CENTRAL.y}
            fill="oklch(from var(--primary) l c h / 0.75)"
            r={4.5}
          />
          <text
            fill="oklch(from var(--primary) l c h / 0.7)"
            fontSize={9.5}
            fontWeight={600}
            letterSpacing="0.05em"
            textAnchor="middle"
            x={CENTRAL.x}
            y={CENTRAL.y + 35}
          >
            Synthesis
          </text>
        </g>

        {/* Output nodes */}
        {OUTPUT_NODES.map(({ x, y, label }, i) => (
          <g
            key={`output-${i}`}
            ref={(el) => {
              outputRefs.current[i] = el;
            }}
          >
            <circle
              cx={x}
              cy={y}
              fill="url(#fhg-node-halo)"
              filter="url(#fhg-node-blur)"
              opacity={0.6}
              r={20}
            />
            <circle
              cx={x}
              cy={y}
              fill="oklch(from var(--primary) l c h / 0.07)"
              r={11}
              stroke="oklch(from var(--foreground) l c h / 0.13)"
              strokeWidth={1}
            />
            <circle
              cx={x}
              cy={y}
              fill="oklch(from var(--primary) l c h / 0.6)"
              opacity={0.85}
              r={3.5}
            />
            <text
              fill="oklch(from var(--foreground) l c h / 0.4)"
              fontSize={9}
              fontWeight={500}
              letterSpacing="0.03em"
              textAnchor="middle"
              x={x}
              y={y + 22}
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
