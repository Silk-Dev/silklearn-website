'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// viewBox="0 0 640 200"
// Source nodes  : x=16, w=80, h=24 — right edge x=96  — centers y={40,80,120,160}
// Synthesis node: cx=320, cy=100, r=28  — left edge x=292, right edge x=348
// Output nodes  : x=536, w=96, h=26  — left edge x=536 — centers y={44,100,156}

const SRC_PATH_DATA = [
  'M 96 40  C 190 40  250 100 292 100',
  'M 96 80  C 210 80  260 100 292 100',
  'M 96 120 C 210 120 260 100 292 100',
  'M 96 160 C 190 160 250 100 292 100',
] as const;

const OUT_PATH_DATA = [
  'M 348 100 C 420 100 470  44 536  44',
  'M 348 100 L 536 100',
  'M 348 100 C 420 100 470 156 536 156',
] as const;

const SOURCE_LABELS = ['Papers', 'Videos', 'Docs', 'Links'] as const;
// rect y-tops → rect centers at 40, 80, 120, 160
const SRC_Y = [28, 68, 108, 148] as const;

const OUTPUT_LABELS: [string, string][] = [
  ['Dependency', 'Map'],
  ['Context', 'Bundle'],
  ['Learning', 'Path'],
];
// rect y-tops → rect centers at 44, 100, 156
const OUT_Y = [31, 87, 143] as const;

// Dash unit for the continuous flow loop (dash=6, gap=12, period=18)
const DASH_PERIOD = 18;

export function UseCasesFlowIllustration() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const srcPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const outPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const srcNodeRefs = useRef<(SVGGElement | null)[]>([]);
  const outNodeRefs = useRef<(SVGGElement | null)[]>([]);
  const synthRef = useRef<SVGGElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // Show everything at final state immediately
        gsap.set([...srcNodeRefs.current, ...outNodeRefs.current, synthRef.current], {
          opacity: 1,
          y: 0,
        });
        const allPaths = [
          ...srcPathRefs.current,
          ...outPathRefs.current,
        ].filter((p): p is SVGPathElement => p !== null);
        allPaths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: 0, opacity: 0.28 });
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ── Initial hidden states ──────────────────────────────────────────
        gsap.set(srcNodeRefs.current, { opacity: 0, y: -8 });
        gsap.set(outNodeRefs.current, { opacity: 0 });
        gsap.set(synthRef.current, { opacity: 0, scale: 0.6, svgOrigin: '320 100' });

        const srcPaths = srcPathRefs.current.filter((p): p is SVGPathElement => p !== null);
        const outPaths = outPathRefs.current.filter((p): p is SVGPathElement => p !== null);

        [...srcPaths, ...outPaths].forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: '6 12', strokeDashoffset: len, opacity: 0 });
        });

        // ── Reveal timeline ────────────────────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 85%',
            once: true,
          },
        });

        // 1. Source nodes stagger in (y: -8 → 0, opacity: 0 → 1)
        tl.to(srcNodeRefs.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: 'back.out(1.7)',
        });

        // 2. Converging paths draw in via strokeDashoffset
        tl.to(
          srcPaths,
          {
            strokeDashoffset: 0,
            opacity: 0.28,
            duration: 0.65,
            stagger: 0.06,
            ease: 'power2.out',
          },
          '-=0.15',
        );

        // 3. Synthesis node entrance
        tl.to(
          synthRef.current,
          {
            opacity: 1,
            scale: 1,
            svgOrigin: '320 100',
            duration: 0.55,
            ease: 'back.out(1.7)',
          },
          '-=0.1',
        );

        // 4. Diverging paths draw out via strokeDashoffset
        tl.to(
          outPaths,
          {
            strokeDashoffset: 0,
            opacity: 0.34,
            duration: 0.65,
            stagger: 0.09,
            ease: 'power2.out',
          },
          '-=0.05',
        );

        // 5. Output nodes appear
        tl.to(
          outNodeRefs.current,
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.07,
            ease: 'power2.out',
          },
          '-=0.3',
        );

        // 6. After reveal: kick off looping animations
        tl.call(() => {
          // Synthesis gentle pulse (scale 1 → 1.04 yoyo, sine.inOut)
          gsap.to(synthRef.current, {
            scale: 1.04,
            svgOrigin: '320 100',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          // Continuous dash-flow along all paths
          [...srcPaths, ...outPaths].forEach((p, i) => {
            gsap.to(p, {
              strokeDashoffset: -DASH_PERIOD,
              duration: 1.4 + i * 0.08,
              ease: 'none',
              repeat: -1,
            });
          });
        });
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} aria-hidden="true">
      <svg
        viewBox="0 0 640 200"
        className="w-full"
        style={{ height: 'auto' }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ── Converging paths (sources → synthesis) ── */}
        {SRC_PATH_DATA.map((d, i) => (
          <path
            key={`sp-${i}`}
            ref={(el) => {
              srcPathRefs.current[i] = el;
            }}
            d={d}
            fill="none"
            stroke="oklch(from var(--foreground) l c h / 0.5)"
            strokeWidth={1.2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* ── Diverging paths (synthesis → outputs) ── */}
        {OUT_PATH_DATA.map((d, i) => (
          <path
            key={`op-${i}`}
            ref={(el) => {
              outPathRefs.current[i] = el;
            }}
            d={d}
            fill="none"
            stroke="oklch(from var(--primary) l c h / 0.65)"
            strokeWidth={1.2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* ── Source nodes (left column) ── */}
        {SOURCE_LABELS.map((label, i) => (
          <g
            key={label}
            ref={(el) => {
              srcNodeRefs.current[i] = el;
            }}
          >
            <rect
              x={16}
              y={SRC_Y[i]}
              width={80}
              height={24}
              fill="oklch(from var(--foreground) l c h / 0.05)"
              stroke="oklch(from var(--foreground) l c h / 0.14)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={56}
              y={SRC_Y[i] + 15}
              textAnchor="middle"
              fontSize={9}
              fill="oklch(from var(--foreground) l c h / 0.75)"
              style={{ fontFamily: 'var(--font-sans)' }}
              fontWeight="500"
              letterSpacing="0.04em"
            >
              {label}
            </text>
          </g>
        ))}

        {/* ── Synthesis center node ── */}
        <g
          ref={(el) => {
            synthRef.current = el;
          }}
        >
          {/* Outer glow */}
          <circle cx={320} cy={100} r={36} fill="oklch(from var(--primary) l c h / 0.07)" />
          {/* Main ring */}
          <circle
            cx={320}
            cy={100}
            r={28}
            fill="oklch(from var(--primary) l c h / 0.1)"
            stroke="oklch(from var(--primary) l c h / 0.32)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={320}
            y={96}
            textAnchor="middle"
            fontSize={8}
            fill="oklch(from var(--primary) l c h / 0.95)"
            style={{ fontFamily: 'var(--font-sans)' }}
            fontWeight="700"
            letterSpacing="0.1em"
          >
            SILK
          </text>
          <text
            x={320}
            y={108}
            textAnchor="middle"
            fontSize={6.5}
            fill="oklch(from var(--primary) l c h / 0.7)"
            style={{ fontFamily: 'var(--font-sans)' }}
            fontWeight="500"
            letterSpacing="0.06em"
          >
            Synthesis
          </text>
        </g>

        {/* ── Output nodes (right column) ── */}
        {OUTPUT_LABELS.map(([line1, line2], i) => (
          <g
            key={`${line1}-${line2}`}
            ref={(el) => {
              outNodeRefs.current[i] = el;
            }}
          >
            <rect
              x={536}
              y={OUT_Y[i]}
              width={96}
              height={26}
              fill="oklch(from var(--primary) l c h / 0.07)"
              stroke="oklch(from var(--primary) l c h / 0.22)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={584}
              y={OUT_Y[i] + 11}
              textAnchor="middle"
              fontSize={7.5}
              fill="oklch(from var(--primary) l c h / 0.85)"
              style={{ fontFamily: 'var(--font-sans)' }}
              fontWeight="600"
              letterSpacing="0.02em"
            >
              {line1}
            </text>
            <text
              x={584}
              y={OUT_Y[i] + 21}
              textAnchor="middle"
              fontSize={7.5}
              fill="oklch(from var(--primary) l c h / 0.65)"
              style={{ fontFamily: 'var(--font-sans)' }}
              fontWeight="500"
              letterSpacing="0.02em"
            >
              {line2}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
