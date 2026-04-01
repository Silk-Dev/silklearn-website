'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── 01 · Works with your existing docs ────────────────────────────────────

export function Illustration01() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(SVGGElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const nodeGroupRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const badges = badgeRefs.current.filter((el): el is SVGGElement => el !== null);
        const paths = pathRefs.current.filter((el): el is SVGPathElement => el !== null);
        const nodeGroup = nodeGroupRef.current;
        if (!badges.length || !paths.length || !nodeGroup) return;

        paths.forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        });
        gsap.set(badges, { opacity: 0, x: -8 });
        gsap.set(nodeGroup, { opacity: 0, scale: 0.6, transformOrigin: '176px 40px' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        tl
          .to(badges, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' })
          .to(
            paths,
            { strokeDashoffset: 0, opacity: 0.5, duration: 0.9, stagger: 0.15, ease: 'power2.out' },
            '-=0.2',
          )
          .to(nodeGroup, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }, '-=0.4')
          .to(nodeGroup, {
            scale: 1.15,
            repeat: -1,
            yoyo: true,
            duration: 1.4,
            ease: 'sine.inOut',
            transformOrigin: '176px 40px',
          });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const paths = pathRefs.current.filter((el): el is SVGPathElement => el !== null);
        paths.forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: 0, opacity: 0.5 });
        });
        badgeRefs.current.forEach((b) => {
          if (b) gsap.set(b, { opacity: 1, x: 0 });
        });
        if (nodeGroupRef.current) gsap.set(nodeGroupRef.current, { opacity: 1, scale: 1 });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} aria-hidden="true" className="relative h-full w-full overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 200 80"
      >
        {/* File-type badges: PDF, MD, DOCX */}
        {(['PDF', 'MD', 'DOCX'] as const).map((label, i) => (
          <g
            key={label}
            ref={(el) => {
              badgeRefs.current[i] = el;
            }}
          >
            <rect
              fill="oklch(from var(--foreground) l c h / 0.05)"
              height="16"
              rx="2"
              stroke="oklch(from var(--foreground) l c h / 0.12)"
              strokeWidth="0.8"
              width="44"
              x="4"
              y={12 + i * 24}
            />
            <text
              dominantBaseline="middle"
              fill="var(--muted-foreground)"
              fontSize="6"
              fontWeight="600"
              letterSpacing="0.12em"
              textAnchor="middle"
              x="26"
              y={20 + i * 24}
            >
              {label}
            </text>
          </g>
        ))}

        {/* Converging flow paths → processing node */}
        <path
          ref={(el) => {
            pathRefs.current[0] = el;
          }}
          d="M 52 20 C 80 20 100 40 116 40 L 164 40"
          stroke="oklch(from var(--primary) l c h / 0.6)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={(el) => {
            pathRefs.current[1] = el;
          }}
          d="M 52 44 L 116 44 C 130 44 145 40 164 40"
          stroke="oklch(from var(--primary) l c h / 0.6)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={(el) => {
            pathRefs.current[2] = el;
          }}
          d="M 52 68 C 80 68 100 44 116 44 C 130 44 145 40 164 40"
          stroke="oklch(from var(--primary) l c h / 0.6)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Processing node */}
        <g ref={nodeGroupRef}>
          <circle
            cx="176"
            cy="40"
            fill="oklch(from var(--primary) l c h / 0.08)"
            r="10"
            stroke="oklch(from var(--primary) l c h / 0.3)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="176" cy="40" fill="var(--primary)" r="4" />
        </g>
      </svg>
    </div>
  );
}

// ─── 02 · Finds the order your docs already imply ──────────────────────────

export function Illustration02() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeAbcRefs = useRef<(SVGGElement | null)[]>([]);
  const nodeDRef = useRef<SVGGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const nodesABC = nodeAbcRefs.current.filter((el): el is SVGGElement => el !== null);
        const paths = pathRefs.current.filter((el): el is SVGPathElement => el !== null);
        const nodeD = nodeDRef.current;
        if (!nodesABC.length || !paths.length || !nodeD) return;

        gsap.set(nodesABC, { opacity: 0 });
        paths.forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        });
        gsap.set(nodeD, { opacity: 0, scale: 0, transformOrigin: '165px 40px' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        tl
          .to(nodesABC, { opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out' })
          .to(
            paths,
            { strokeDashoffset: 0, opacity: 0.5, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
            '-=0.1',
          )
          .to(nodeD, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.2');
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const paths = pathRefs.current.filter((el): el is SVGPathElement => el !== null);
        paths.forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: 0, opacity: 0.5 });
        });
        nodeAbcRefs.current.forEach((n) => {
          if (n) gsap.set(n, { opacity: 1 });
        });
        if (nodeDRef.current) gsap.set(nodeDRef.current, { opacity: 1, scale: 1 });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} aria-hidden="true" className="relative h-full w-full overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 200 80"
      >
        {/* Dependency edges: A→B, A→C, B→D, C→D */}
        {(['M 42 36 L 78 22', 'M 42 44 L 78 58', 'M 102 22 L 153 36', 'M 102 58 L 153 44'] as const).map(
          (d, i) => (
            <path
              key={i}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              d={d}
              stroke="oklch(from var(--primary) l c h / 0.6)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ),
        )}

        {/* Nodes A (30,40), B (90,18), C (90,62) */}
        {(
          [
            { cx: 30, cy: 40 },
            { cx: 90, cy: 18 },
            { cx: 90, cy: 62 },
          ] as const
        ).map((pos, i) => (
          <g
            key={i}
            ref={(el) => {
              nodeAbcRefs.current[i] = el;
            }}
          >
            <circle
              cx={pos.cx}
              cy={pos.cy}
              fill="oklch(from var(--primary) l c h / 0.08)"
              r="10"
              stroke="oklch(from var(--primary) l c h / 0.3)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={pos.cx} cy={pos.cy} fill="var(--primary)" r="4" />
          </g>
        ))}

        {/* Node D — terminal output, slightly larger and more vivid */}
        <g ref={nodeDRef}>
          <circle
            cx="165"
            cy="40"
            fill="oklch(from var(--primary) l c h / 0.15)"
            r="12"
            stroke="oklch(from var(--primary) l c h / 0.5)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="165" cy="40" fill="var(--primary)" r="5" />
        </g>
      </svg>
    </div>
  );
}

// ─── 03 · Leaders review before anything ships ─────────────────────────────

const PILL_DATA = [
  {
    label: '✓ accept',
    y: 11,
    fill: 'oklch(from var(--primary) l c h / 0.12)',
    stroke: 'oklch(from var(--primary) l c h / 0.3)',
    textFill: 'oklch(from var(--primary) l c h / 0.8)',
  },
  {
    label: '✗ reject',
    y: 33,
    fill: 'oklch(0.55 0.18 22 / 0.12)',
    stroke: 'oklch(0.55 0.18 22 / 0.35)',
    textFill: 'oklch(0.55 0.18 22 / 0.8)',
  },
  {
    label: '⚑ flag',
    y: 55,
    fill: 'oklch(0.7 0.15 65 / 0.12)',
    stroke: 'oklch(0.7 0.15 65 / 0.35)',
    textFill: 'oklch(0.7 0.15 65 / 0.8)',
  },
] as const;

export function Illustration03() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftNodeRefs = useRef<(SVGGElement | null)[]>([]);
  const leftConnRefs = useRef<(SVGPathElement | null)[]>([]);
  const centralNodeRef = useRef<SVGGElement>(null);
  const rightConnRefs = useRef<(SVGPathElement | null)[]>([]);
  const pillRefs = useRef<(SVGGElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const leftNodes = leftNodeRefs.current.filter((el): el is SVGGElement => el !== null);
        const leftConns = leftConnRefs.current.filter((el): el is SVGPathElement => el !== null);
        const centralNode = centralNodeRef.current;
        const rightConns = rightConnRefs.current.filter((el): el is SVGPathElement => el !== null);
        const pills = pillRefs.current.filter((el): el is SVGGElement => el !== null);
        if (!leftNodes.length || !centralNode || !pills.length) return;

        gsap.set(leftNodes, { opacity: 0 });
        [...leftConns, ...rightConns].forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        });
        gsap.set(centralNode, { opacity: 0, scale: 0, transformOrigin: '100px 40px' });
        gsap.set(pills, { opacity: 0, x: 16 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        tl
          .to(leftNodes, { opacity: 1, stagger: 0.1, duration: 0.35, ease: 'power2.out' })
          .to(
            leftConns,
            { strokeDashoffset: 0, opacity: 0.4, stagger: 0.1, duration: 0.4, ease: 'power2.out' },
            '-=0.2',
          )
          .to(centralNode, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, '-=0.1')
          .to(
            rightConns,
            { strokeDashoffset: 0, opacity: 0.4, stagger: 0.1, duration: 0.35, ease: 'power2.out' },
            '-=0.1',
          )
          .to(pills, { opacity: 1, x: 0, stagger: 0.12, duration: 0.35, ease: 'power2.out' }, '-=0.15')
          // brief brightness peak, then settle
          .to(pills, { opacity: 0.78, stagger: 0.08, duration: 0.5, ease: 'sine.inOut' });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        leftNodeRefs.current.forEach((n) => {
          if (n) gsap.set(n, { opacity: 1 });
        });
        if (centralNodeRef.current) gsap.set(centralNodeRef.current, { opacity: 1, scale: 1 });
        pillRefs.current.forEach((p) => {
          if (p) gsap.set(p, { opacity: 0.78, x: 0 });
        });
        [...leftConnRefs.current, ...rightConnRefs.current].forEach((p) => {
          if (!p) return;
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: 0, opacity: 0.4 });
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} aria-hidden="true" className="relative h-full w-full overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 200 80"
      >
        {/* Left connector paths → central node */}
        {(
          [
            'M 29 18 C 50 18 75 36 88 40',
            'M 29 40 L 88 40',
            'M 29 62 C 50 62 75 44 88 40',
          ] as const
        ).map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              leftConnRefs.current[i] = el;
            }}
            d={d}
            stroke="oklch(from var(--primary) l c h / 0.5)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Right connector paths central node → pills */}
        {(['M 112 37 L 124 18', 'M 112 40 L 124 40', 'M 112 43 L 124 62'] as const).map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              rightConnRefs.current[i] = el;
            }}
            d={d}
            stroke="oklch(from var(--primary) l c h / 0.4)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.7"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Left input nodes */}
        {([18, 40, 62] as const).map((cy, i) => (
          <g
            key={i}
            ref={(el) => {
              leftNodeRefs.current[i] = el;
            }}
          >
            <circle
              cx="22"
              cy={cy}
              fill="oklch(from var(--primary) l c h / 0.08)"
              r="7"
              stroke="oklch(from var(--primary) l c h / 0.25)"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="22" cy={cy} fill="var(--primary)" r="2.5" />
          </g>
        ))}

        {/* Central review node */}
        <g ref={centralNodeRef}>
          <circle
            cx="100"
            cy="40"
            fill="oklch(from var(--primary) l c h / 0.12)"
            r="12"
            stroke="oklch(from var(--primary) l c h / 0.4)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="100" cy="40" fill="var(--primary)" r="5" />
        </g>

        {/* Review outcome pills */}
        {PILL_DATA.map((pill, i) => (
          <g
            key={i}
            ref={(el) => {
              pillRefs.current[i] = el;
            }}
          >
            <rect
              fill={pill.fill}
              height="14"
              rx="7"
              stroke={pill.stroke}
              strokeWidth="0.7"
              width="52"
              x="124"
              y={pill.y}
            />
            <text
              dominantBaseline="middle"
              fill={pill.textFill}
              fontSize="5.5"
              fontWeight="600"
              textAnchor="middle"
              x="150"
              y={pill.y + 7}
            >
              {pill.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── 04 · Every review decision is logged as it happens ────────────────────

const LOG_ENTRIES = [
  { timestamp: '12:04:31', reviewer: 'Jesser', action: 'Accepted' },
  { timestamp: '12:06:18', reviewer: 'Ali', action: 'Flagged' },
  { timestamp: '12:09:44', reviewer: 'Maya', action: 'Rejected' },
  { timestamp: '12:11:02', reviewer: 'Kai', action: 'Accepted' },
] as const;

const DOT_CY = [14, 30, 46, 62] as const;

export function Illustration04() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<(SVGGElement | null)[]>([]);
  const rowRefs = useRef<(SVGGElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const lineEl = timelineLineRef.current;
        const dots = dotRefs.current.filter((el): el is SVGGElement => el !== null);
        const rows = rowRefs.current.filter((el): el is SVGGElement => el !== null);
        if (!lineEl || !dots.length || !rows.length) return;

        const lineLen = lineEl.getTotalLength();
        // strokeDasharray must be set once; fromTo handles strokeDashoffset each loop
        gsap.set(lineEl, { strokeDasharray: lineLen });

        // Set transform-origin per dot so scale animates from the dot's center
        DOT_CY.forEach((cy, i) => {
          const dot = dots[i];
          if (dot) gsap.set(dot, { transformOrigin: `30px ${cy}px` });
        });

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        tl
          .fromTo(
            lineEl,
            { strokeDashoffset: lineLen, opacity: 0 },
            { strokeDashoffset: 0, opacity: 0.3, duration: 0.5, ease: 'power2.out' },
          )
          .fromTo(
            dots,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, stagger: 0.18, duration: 0.3, ease: 'back.out(1.4)' },
          )
          .fromTo(
            rows,
            { opacity: 0, x: 10 },
            { opacity: 1, x: 0, stagger: 0.18, duration: 0.35, ease: 'power2.out' },
            '-=0.36',
          )
          // hold, then fade everything out before the next loop iteration
          .to([lineEl, ...dots, ...rows], { opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.8');
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const lineEl = timelineLineRef.current;
        if (lineEl) {
          const len = lineEl.getTotalLength();
          gsap.set(lineEl, { strokeDasharray: len, strokeDashoffset: 0, opacity: 0.3 });
        }
        dotRefs.current.forEach((d) => {
          if (d) gsap.set(d, { opacity: 1, scale: 1 });
        });
        rowRefs.current.forEach((r) => {
          if (r) gsap.set(r, { opacity: 1, x: 0 });
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} aria-hidden="true" className="relative h-full w-full overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 200 80"
      >
        {/* Vertical timeline spine */}
        <path
          ref={timelineLineRef}
          d="M 30 8 L 30 72"
          stroke="oklch(from var(--foreground) l c h / 0.1)"
          strokeLinecap="round"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Timeline dots */}
        {DOT_CY.map((cy, i) => (
          <g
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
          >
            <circle
              cx="30"
              cy={cy}
              fill="oklch(from var(--primary) l c h / 0.2)"
              r="3.5"
              stroke="oklch(from var(--primary) l c h / 0.5)"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="30" cy={cy} fill="var(--primary)" r="1.8" />
          </g>
        ))}

        {/* Log entry rows */}
        {LOG_ENTRIES.map((entry, i) => (
          <g
            key={i}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
          >
            {/* Timestamp badge */}
            <rect
              fill="oklch(from var(--foreground) l c h / 0.06)"
              height="8"
              rx="1.5"
              stroke="oklch(from var(--foreground) l c h / 0.1)"
              strokeWidth="0.5"
              width="32"
              x="42"
              y={DOT_CY[i] - 4}
            />
            <text
              dominantBaseline="middle"
              fill="var(--muted-foreground)"
              fontFamily="monospace"
              fontSize="4.5"
              textAnchor="middle"
              x="58"
              y={DOT_CY[i]}
            >
              {entry.timestamp}
            </text>

            {/* Reviewer pill */}
            <rect
              fill="oklch(from var(--primary) l c h / 0.1)"
              height="8"
              rx="1.5"
              stroke="oklch(from var(--primary) l c h / 0.2)"
              strokeWidth="0.5"
              width="26"
              x="78"
              y={DOT_CY[i] - 4}
            />
            <text
              dominantBaseline="middle"
              fill="oklch(from var(--primary) l c h / 0.7)"
              fontSize="4.5"
              fontWeight="600"
              textAnchor="middle"
              x="91"
              y={DOT_CY[i]}
            >
              {entry.reviewer}
            </text>

            {/* Action label */}
            <text
              dominantBaseline="middle"
              fill="var(--muted-foreground)"
              fontSize="4.5"
              x="108"
              y={DOT_CY[i]}
            >
              {entry.action}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── 05 · Surfaces contradictions between docs ─────────────────────────────

export function Illustration05() {
  const containerRef      = useRef<HTMLDivElement>(null);
  const docARef           = useRef<SVGGElement>(null);
  const docBRef           = useRef<SVGGElement>(null);
  const pathLeftRef       = useRef<SVGPathElement>(null);
  const pathRightRef      = useRef<SVGPathElement>(null);
  const conflictGroupRef  = useRef<SVGGElement>(null);
  const conflictDiamondRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const pathLeft      = pathLeftRef.current;
        const pathRight     = pathRightRef.current;
        const conflictGroup = conflictGroupRef.current;
        const conflictDiamond = conflictDiamondRef.current;
        if (!pathLeft || !pathRight || !conflictGroup || !conflictDiamond) return;

        const leftLen  = pathLeft.getTotalLength();
        const rightLen = pathRight.getTotalLength();

        gsap.set(docARef.current,  { opacity: 0, x: -20 });
        gsap.set(docBRef.current,  { opacity: 0, x: 20 });
        gsap.set(pathLeft,  { strokeDasharray: leftLen,  strokeDashoffset: leftLen,  opacity: 0 });
        gsap.set(pathRight, { strokeDasharray: rightLen, strokeDashoffset: rightLen, opacity: 0 });
        gsap.set(conflictGroup, { scale: 0, transformOrigin: '50% 50%', opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        // 1. Doc nodes slide in from outside
        tl.to([docARef.current, docBRef.current], {
          opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05,
        })
          // 2. Paths draw toward the center simultaneously
          .to(
            [pathLeft, pathRight],
            { strokeDashoffset: 0, opacity: 0.5, duration: 0.6, ease: 'power2.inOut' },
            '-=0.2',
          )
          // 3. Conflict diamond pops in
          .to(
            conflictGroup,
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
            '-=0.05',
          )
          // 4+5. Continuous loops
          .add(() => {
            gsap.to(conflictDiamond, {
              scale: 1.12, opacity: 0.8, repeat: -1, yoyo: true,
              duration: 1.2, ease: 'sine.inOut', transformOrigin: '50% 50%',
            });
            gsap.to([pathLeft, pathRight], {
              opacity: 0.2, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });
          });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(docARef.current, { opacity: 1, x: 0 });
        gsap.set(docBRef.current, { opacity: 1, x: 0 });
        const pl = pathLeftRef.current;
        const pr = pathRightRef.current;
        if (pl) gsap.set(pl, { strokeDasharray: pl.getTotalLength(), strokeDashoffset: 0, opacity: 0.5 });
        if (pr) gsap.set(pr, { strokeDasharray: pr.getTotalLength(), strokeDashoffset: 0, opacity: 0.5 });
        gsap.set(conflictGroupRef.current, { scale: 1, opacity: 1 });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <svg
        viewBox="0 0 200 80"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Doc A — slides in from left */}
        <g ref={docARef}>
          <rect
            x="30" y="28" width="36" height="24" rx="2"
            fill="oklch(from var(--foreground) l c h / 0.04)"
            stroke="oklch(from var(--foreground) l c h / 0.18)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x="48" y="40" textAnchor="middle" dominantBaseline="middle"
            fontSize="6" fill="var(--foreground)" fillOpacity="0.55"
          >
            Doc A
          </text>
        </g>

        {/* Left path: A right-edge (66) → diamond center (100), draws L→R = toward center */}
        <path
          ref={pathLeftRef}
          d="M 66 40 L 100 40"
          stroke="oklch(from var(--primary) l c h / 0.6)"
          strokeWidth="1" strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Right path: reversed so dashoffset draw-in goes B left-edge (134) → center (100) */}
        <path
          ref={pathRightRef}
          d="M 134 40 L 100 40"
          stroke="oklch(from var(--primary) l c h / 0.6)"
          strokeWidth="1" strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Conflict diamond */}
        <g ref={conflictGroupRef}>
          <path
            ref={conflictDiamondRef}
            d="M 100 28 L 108 40 L 100 52 L 92 40 Z"
            fill="oklch(from #ee5555 l c h / 0.15)"
            stroke="oklch(from #ee5555 l c h / 0.6)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x="100" y="40" textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fill="#cc4444"
          >
            conflict
          </text>
        </g>

        {/* Doc B — slides in from right */}
        <g ref={docBRef}>
          <rect
            x="134" y="28" width="36" height="24" rx="2"
            fill="oklch(from var(--foreground) l c h / 0.04)"
            stroke="oklch(from var(--foreground) l c h / 0.18)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x="152" y="40" textAnchor="middle" dominantBaseline="middle"
            fontSize="6" fill="var(--foreground)" fillOpacity="0.55"
          >
            Doc B
          </text>
        </g>
      </svg>
    </div>
  );
}

// ─── 06 · Every output linked to source ────────────────────────────────────

export function Illustration06() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const sourceBoxRef    = useRef<SVGGElement>(null);
  const outputPillRef   = useRef<SVGGElement>(null);
  const dashPathRef     = useRef<SVGPathElement>(null);
  const arrowRef        = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const path = dashPathRef.current;
        if (!path) return;

        const len = path.getTotalLength();

        gsap.set(sourceBoxRef.current,  { opacity: 0, x: -15 });
        gsap.set(outputPillRef.current, { opacity: 0, x: 15 });
        // Draw-in: use full-length single dash so dashoffset drives the reveal
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        gsap.set(arrowRef.current, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        // 1. Source and output appear
        tl.to(
          [sourceBoxRef.current, outputPillRef.current],
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.06 },
        )
          // 3. Dashed path draws in
          .to(path, { strokeDashoffset: 0, opacity: 1, duration: 1.0, ease: 'power2.inOut' }, '-=0.2')
          // 4. Arrowhead appears
          .to(arrowRef.current, { opacity: 1, duration: 0.2 })
          // 5. Switch to repeating 3 3 dashes for flowing effect
          .add(() => {
            gsap.set(path, { strokeDasharray: '3 3' });
            gsap.fromTo(
              path,
              { strokeDashoffset: 0 },
              { strokeDashoffset: -12, duration: 1.5, repeat: -1, ease: 'none' },
            );
          });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([sourceBoxRef.current, outputPillRef.current, arrowRef.current], {
          opacity: 1, x: 0,
        });
        const p = dashPathRef.current;
        if (p) gsap.set(p, { strokeDasharray: '3 3', strokeDashoffset: 0, opacity: 1 });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <svg
        viewBox="0 0 200 80"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Source box */}
        <g ref={sourceBoxRef}>
          <rect
            x="8" y="24" width="54" height="32" rx="2"
            fill="oklch(from var(--foreground) l c h / 0.04)"
            stroke="oklch(from var(--foreground) l c h / 0.12)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x="35" y="37" textAnchor="middle" dominantBaseline="middle"
            fontSize="7" fontWeight="700" fill="var(--primary)"
          >
            § 2.3
          </text>
          <text
            x="35" y="47" textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fill="var(--muted-foreground)"
          >
            Support runbook
          </text>
        </g>

        {/* Dashed connector: source right-edge (62,40) curves up to pill top-left (138,32) */}
        <path
          ref={dashPathRef}
          d="M 62 40 C 90 40 110 32 138 32"
          stroke="oklch(from var(--primary) l c h / 0.5)"
          strokeWidth="1" strokeLinecap="round"
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
        />

        {/* Arrowhead at path endpoint (138,32) */}
        <path
          ref={arrowRef}
          d="M 134 29 L 138 32 L 134 35"
          stroke="oklch(from var(--primary) l c h / 0.5)"
          strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Output pill */}
        <g ref={outputPillRef}>
          <rect
            x="138" y="32" width="52" height="16" rx="8"
            fill="oklch(from var(--primary) l c h / 0.1)"
            stroke="oklch(from var(--primary) l c h / 0.3)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x="164" y="40" textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fill="var(--foreground)"
          >
            Learning path
          </text>
        </g>
      </svg>
    </div>
  );
}

// ─── 07 · Integrations ─────────────────────────────────────────────────────

const IL07_NODES = [
  { cx: 30,  cy: 22, label: 'Notion'  },
  { cx: 70,  cy: 22, label: 'Drive'   },
  { cx: 110, cy: 22, label: 'GitHub'  },
  { cx: 150, cy: 22, label: 'Slack'   },
  { cx: 30,  cy: 58, label: 'Conf.'   },
  { cx: 70,  cy: 58, label: 'Linear'  },
  { cx: 110, cy: 58, label: 'API'     },
  { cx: 150, cy: 58, label: 'Zapier'  },
] as const;

// Segments between circle edges (r=12); horizontal gaps = 16px, vertical gaps = 12px
const IL07_LINES = [
  { x1: 42,  y1: 22, x2: 58,  y2: 22 },
  { x1: 82,  y1: 22, x2: 98,  y2: 22 },
  { x1: 122, y1: 22, x2: 138, y2: 22 },
  { x1: 42,  y1: 58, x2: 58,  y2: 58 },
  { x1: 82,  y1: 58, x2: 98,  y2: 58 },
  { x1: 122, y1: 58, x2: 138, y2: 58 },
  { x1: 30,  y1: 34, x2: 30,  y2: 46 },
  { x1: 70,  y1: 34, x2: 70,  y2: 46 },
  { x1: 110, y1: 34, x2: 110, y2: 46 },
  { x1: 150, y1: 34, x2: 150, y2: 46 },
] as const;

export function Illustration07() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const nodeGroupRefs  = useRef<(SVGGElement    | null)[]>(Array(8).fill(null));
  const brightDotRefs  = useRef<(SVGCircleElement | null)[]>(Array(8).fill(null));
  const lineRefs       = useRef<(SVGLineElement  | null)[]>(Array(10).fill(null));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const nodeGroups = nodeGroupRefs.current.filter(Boolean) as SVGGElement[];
        const brightDots = brightDotRefs.current.filter(Boolean) as SVGCircleElement[];
        const lines      = lineRefs.current.filter(Boolean)      as SVGLineElement[];

        gsap.set([nodeGroups, lines], { opacity: 0 });
        gsap.set(brightDots, { opacity: 0 });

        // Repeating loop: sequentially light up then ripple-dim
        const loopTl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, paused: true });
        loopTl
          .to(brightDots, { opacity: 1, stagger: 0.16, duration: 0.22, ease: 'power2.out' })
          .to({}, { duration: 0.5 })
          .to(brightDots, {
            opacity: 0,
            stagger: { each: 0.12, from: 'end' },
            duration: 0.18,
            ease: 'power2.in',
          })
          .to({}, { duration: 0.3 });

        // Entrance, then kick off the loop
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        masterTl
          .to(nodeGroups, { opacity: 1, stagger: 0.07, duration: 0.3, ease: 'power2.out' })
          .to(lines, { opacity: 1, stagger: 0.04, duration: 0.22, ease: 'power2.out' }, '-=0.2')
          .add(() => { loopTl.play(); });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const nodeGroups = nodeGroupRefs.current.filter(Boolean);
        const brightDots = brightDotRefs.current.filter(Boolean);
        const lines      = lineRefs.current.filter(Boolean);
        gsap.set([nodeGroups, lines], { opacity: 1 });
        gsap.set(brightDots, { opacity: 1 });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <svg
        viewBox="0 0 200 80"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Grid connector lines */}
        {IL07_LINES.map((line, i) => (
          <line
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="oklch(from var(--foreground) l c h / 0.06)"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Service nodes */}
        {IL07_NODES.map((node, i) => (
          <g key={i} ref={(el) => { nodeGroupRefs.current[i] = el; }}>
            {/* Outer ring */}
            <circle
              cx={node.cx} cy={node.cy} r="12"
              fill="oklch(from var(--foreground) l c h / 0.04)"
              stroke="oklch(from var(--foreground) l c h / 0.12)"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
            {/* Dim base dot (always visible once node fades in) */}
            <circle
              cx={node.cx} cy={node.cy} r="5"
              fill="oklch(from var(--primary) l c h / 0.3)"
            />
            {/* Bright dot — animated by the loop */}
            <circle
              ref={(el) => { brightDotRefs.current[i] = el; }}
              cx={node.cx} cy={node.cy} r="5"
              fill="var(--primary)"
            />
            {/* Label below circle */}
            <text
              x={node.cx} y={node.cy + 17}
              textAnchor="middle" dominantBaseline="hanging"
              fontSize="4.5"
              fill="var(--muted-foreground)"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── 08 · Update and re-publish ────────────────────────────────────────────

export function Illustration08() {
  const containerRef     = useRef<HTMLDivElement>(null);
  const v1BoxRef         = useRef<SVGGElement>(null);
  const pathV1NodeRef    = useRef<SVGPathElement>(null);
  const processingRef    = useRef<SVGGElement>(null);
  const haloRef          = useRef<SVGCircleElement>(null);
  const pathNodeV2Ref    = useRef<SVGPathElement>(null);
  const v2BoxRef         = useRef<SVGGElement>(null);
  const deltaBadgeRef    = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const p1 = pathV1NodeRef.current;
        const p2 = pathNodeV2Ref.current;
        if (!p1 || !p2) return;

        const len1 = p1.getTotalLength();
        const len2 = p2.getTotalLength();

        gsap.set(v1BoxRef.current,      { opacity: 0, x: -12 });
        gsap.set(p1,                    { strokeDasharray: len1, strokeDashoffset: len1, opacity: 0 });
        gsap.set(processingRef.current, { scale: 0, transformOrigin: '50% 50%', opacity: 0 });
        gsap.set(p2,                    { strokeDasharray: len2, strokeDashoffset: len2, opacity: 0 });
        gsap.set(v2BoxRef.current,      { scale: 0.85, transformOrigin: '50% 50%', opacity: 0 });
        gsap.set(deltaBadgeRef.current, { scale: 0,    transformOrigin: '50% 50%', opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        // 1. v1 box appears
        tl.to(v1BoxRef.current, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' })
          // 2. Path v1 → node draws in
          .to(p1, { strokeDashoffset: 0, opacity: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.1')
          // 3. Processing node scales in
          .to(processingRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' }, '-=0.1')
          // 4. Path node → v2 draws in
          .to(p2, { strokeDashoffset: 0, opacity: 1, duration: 0.5, ease: 'power2.inOut' })
          // 5. v2 box bounces in
          .to(v2BoxRef.current, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.3)' }, '-=0.15')
          // 6. Delta badge pops in
          .to(deltaBadgeRef.current, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' })
          // 7. Start continuous halo pulse
          .add(() => {
            gsap.to(haloRef.current, {
              scale: 1.14, opacity: 0.3, duration: 1.8,
              repeat: -1, yoyo: true, ease: 'sine.inOut',
              transformOrigin: '50% 50%',
            });
          });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [v1BoxRef.current, processingRef.current, v2BoxRef.current, deltaBadgeRef.current],
          { opacity: 1, scale: 1, x: 0 },
        );
        const p1 = pathV1NodeRef.current;
        const p2 = pathNodeV2Ref.current;
        if (p1) gsap.set(p1, { strokeDasharray: p1.getTotalLength(), strokeDashoffset: 0, opacity: 1 });
        if (p2) gsap.set(p2, { strokeDasharray: p2.getTotalLength(), strokeDashoffset: 0, opacity: 1 });
        gsap.set(haloRef.current, { opacity: 0.16, scale: 1 });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <svg
        viewBox="0 0 200 80"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          {/* Isolated filter ID to avoid collisions with other illustrations */}
          <filter id="il08-halo" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* v1 box */}
        <g ref={v1BoxRef}>
          <rect
            x="8" y="28" width="38" height="24" rx="2"
            fill="oklch(from var(--foreground) l c h / 0.04)"
            stroke="oklch(from var(--foreground) l c h / 0.12)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x="27" y="40" textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontWeight="700" fill="var(--muted-foreground)"
          >
            v1
          </text>
        </g>

        {/* Path: v1 right-edge (46) → node left boundary (88) */}
        <path
          ref={pathV1NodeRef}
          d="M 46 40 L 88 40"
          stroke="oklch(from var(--primary) l c h / 0.5)"
          strokeWidth="1.2" strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Processing node */}
        <g ref={processingRef}>
          {/* Pulsing halo */}
          <circle
            ref={haloRef}
            cx="100" cy="40" r="16"
            fill="oklch(from var(--primary) l c h / 0.16)"
            filter="url(#il08-halo)"
          />
          {/* Outer ring */}
          <circle
            cx="100" cy="40" r="10"
            fill="oklch(from var(--foreground) l c h / 0.04)"
            stroke="oklch(from var(--foreground) l c h / 0.12)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          {/* Inner dot */}
          <circle cx="100" cy="40" r="4" fill="var(--primary)" />
        </g>

        {/* Path: node right boundary (112) → near v2 left-edge (150) */}
        <path
          ref={pathNodeV2Ref}
          d="M 112 40 L 150 40"
          stroke="oklch(from var(--primary) l c h / 0.5)"
          strokeWidth="1.2" strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* v2 box */}
        <g ref={v2BoxRef}>
          <rect
            x="154" y="28" width="38" height="24" rx="2"
            fill="oklch(from var(--foreground) l c h / 0.04)"
            stroke="oklch(from var(--primary) l c h / 0.3)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x="173" y="40" textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontWeight="700" fill="var(--primary)"
          >
            v2
          </text>
        </g>

        {/* Delta badge — floats above v2 box */}
        <g ref={deltaBadgeRef}>
          <rect
            x="154" y="14" width="22" height="10" rx="5"
            fill="oklch(from var(--primary) l c h / 0.15)"
            stroke="oklch(from var(--primary) l c h / 0.4)"
            strokeWidth="0.7"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x="165" y="19" textAnchor="middle" dominantBaseline="middle"
            fontSize="6" fill="var(--primary)"
          >
            Δ 3
          </text>
          <text
            x="165" y="27" textAnchor="middle" dominantBaseline="middle"
            fontSize="4" fill="var(--muted-foreground)"
          >
            3 sections updated
          </text>
        </g>
      </svg>
    </div>
  );
}
