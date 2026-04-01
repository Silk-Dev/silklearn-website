'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

const NODES = [
  { id: 0, cx: 40,  cy: 45  },
  { id: 1, cx: 135, cy: 28  },
  { id: 2, cx: 235, cy: 52  },
  { id: 3, cx: 75,  cy: 115 },
  { id: 4, cx: 195, cy: 100 },
  { id: 5, cx: 45,  cy: 170 },
  { id: 6, cx: 155, cy: 162 },
  { id: 7, cx: 240, cy: 150 },
] as const;

type NodeTuple = (typeof NODES)[number];

const EDGES: readonly [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 5], [3, 6], [4, 6], [4, 7],
];

function lineLen(a: NodeTuple, b: NodeTuple) {
  return Math.hypot(b.cx - a.cx, b.cy - a.cy);
}

export function WaitlistHeroGraph({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;

      const nodeEls = Array.from(svg.querySelectorAll<SVGCircleElement>('[data-node]'));
      const glowEls = Array.from(svg.querySelectorAll<SVGCircleElement>('[data-glow]'));
      const lineEls = Array.from(svg.querySelectorAll('[data-line]'));

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(nodeEls, { opacity: 1 });
        gsap.set(lineEls, { strokeDashoffset: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Pin transform origins to each circle's SVG coordinate center
        [...nodeEls, ...glowEls].forEach((el) => {
          gsap.set(el, {
            svgOrigin: `${el.cx.baseVal.value} ${el.cy.baseVal.value}`,
          });
        });

        const tl = gsap.timeline();

        // Nodes fade in with stagger: opacity 0→1, scale 0.85→1
        tl.from(nodeEls, {
          opacity: 0,
          scale: 0.85,
          duration: 0.5,
          stagger: 0.07,
          ease: 'back.out(1.4)',
        });

        // Lines draw in via strokeDashoffset after nodes appear
        tl.to(lineEls, {
          strokeDashoffset: 0,
          duration: 0.45,
          stagger: 0.055,
          ease: 'power2.out',
        }, '-=0.15');

        // Start recurring pulse loop
        tl.call(() => schedulePulse());

        function schedulePulse() {
          const idx = Math.floor(Math.random() * nodeEls.length);

          gsap.timeline({ delay: 3 })
            .to(nodeEls[idx], { scale: 1.15, duration: 0.3, ease: 'power2.out' })
            .to(glowEls[idx], { opacity: 0.45, scale: 1.6, duration: 0.3, ease: 'power2.out' }, '<')
            .to(nodeEls[idx], { scale: 1, duration: 0.3, ease: 'power2.in' })
            .to(glowEls[idx], { opacity: 0, scale: 1, duration: 0.3, ease: 'power2.in' }, '<')
            .call(schedulePulse);
        }
      });

      return () => mm.revert();
    },
    { scope: svgRef },
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 280 200"
      className={cn('h-48 w-full', className)}
      aria-hidden="true"
      role="presentation"
    >
      {/* Edges — drawn in via strokeDashoffset animation */}
      {EDGES.map(([fromId, toId]) => {
        const from = NODES[fromId];
        const to = NODES[toId];
        const len = lineLen(from, to);
        return (
          <line
            key={`${fromId}-${toId}`}
            data-line
            x1={from.cx}
            y1={from.cy}
            x2={to.cx}
            y2={to.cy}
            strokeWidth={1}
            strokeDasharray={len}
            strokeDashoffset={len}
            vectorEffect="non-scaling-stroke"
            style={{ stroke: 'var(--foreground)', strokeOpacity: 0.15 }}
          />
        );
      })}

      {/* Nodes — glow circle + main circle per node */}
      {NODES.map((node) => (
        <g key={node.id}>
          {/* Primary-colored glow, animated during pulse */}
          <circle
            data-glow
            cx={node.cx}
            cy={node.cy}
            r={7}
            style={{ fill: 'var(--primary)', opacity: 0 }}
          />
          {/* Main dot */}
          <circle
            data-node
            cx={node.cx}
            cy={node.cy}
            r={3.5}
            style={{ fill: 'var(--foreground)', fillOpacity: 0.35 }}
          />
        </g>
      ))}
    </svg>
  );
}
