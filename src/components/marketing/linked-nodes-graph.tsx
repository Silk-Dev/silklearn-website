'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap/dist/gsap';

type NodeId = 'source' | 'verify' | 'graph' | 'review' | 'rollout' | 'bundle' | 'handoff';
type NodeTone = 'primary' | 'accent' | 'ink';

type GraphNode = {
  id: NodeId;
  label: string;
  detail: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  labelWidth: number;
  tone: NodeTone;
};

const nodes: GraphNode[] = [
  {
    id: 'source',
    label: 'Source intake',
    detail: 'Private docs loaded',
    x: 92,
    y: 152,
    labelX: 24,
    labelY: -24,
    labelWidth: 154,
    tone: 'accent',
  },
  {
    id: 'verify',
    label: 'Validation',
    detail: 'Inputs checked',
    x: 210,
    y: 230,
    labelX: 22,
    labelY: -26,
    labelWidth: 136,
    tone: 'accent',
  },
  {
    id: 'graph',
    label: 'Dependency graph',
    detail: 'Order compiled',
    x: 322,
    y: 150,
    labelX: 26,
    labelY: -56,
    labelWidth: 160,
    tone: 'accent',
  },
  {
    id: 'review',
    label: 'Leader review',
    detail: 'Conflicts resolved',
    x: 540,
    y: 132,
    labelX: -172,
    labelY: -24,
    labelWidth: 150,
    tone: 'accent',
  },
  {
    id: 'rollout',
    label: 'Team rollout',
    detail: 'Paths published',
    x: 548,
    y: 302,
    labelX: -170,
    labelY: 14,
    labelWidth: 148,
    tone: 'accent',
  },
  {
    id: 'bundle',
    label: 'AI bundle',
    detail: 'Context packed',
    x: 102,
    y: 304,
    labelX: 24,
    labelY: 10,
    labelWidth: 142,
    tone: 'accent',
  },
  {
    id: 'handoff',
    label: 'Handoff',
    detail: 'Ready to share',
    x: 430,
    y: 244,
    labelX: 22,
    labelY: 10,
    labelWidth: 134,
    tone: 'accent',
  },
];

const edges = [
  { id: 'source-verify', from: 'source', to: 'verify' },
  { id: 'verify-graph', from: 'verify', to: 'graph' },
  { id: 'graph-review', from: 'graph', to: 'review' },
  { id: 'graph-handoff', from: 'graph', to: 'handoff' },
  { id: 'handoff-rollout', from: 'handoff', to: 'rollout' },
  { id: 'source-bundle', from: 'source', to: 'bundle' },
  { id: 'bundle-rollout', from: 'bundle', to: 'rollout' },
] as const;

const zones = [
  { id: 'zone-a', cx: 156, cy: 230, rx: 150, ry: 116 },
  { id: 'zone-b', cx: 324, cy: 188, rx: 176, ry: 118 },
  { id: 'zone-c', cx: 506, cy: 214, rx: 152, ry: 118 },
] as const;

const sparkleDots = [
  { id: 'spark-1', cx: 60, cy: 60, r: 0.95 },
  { id: 'spark-2', cx: 180, cy: 100, r: 1.05 },
  { id: 'spark-3', cx: 260, cy: 60, r: 0.9 },
  { id: 'spark-4', cx: 340, cy: 140, r: 1.1 },
  { id: 'spark-5', cx: 420, cy: 100, r: 0.95 },
  { id: 'spark-6', cx: 500, cy: 140, r: 1.05 },
  { id: 'spark-7', cx: 580, cy: 100, r: 0.9 },
  { id: 'spark-8', cx: 100, cy: 300, r: 1.05 },
  { id: 'spark-9', cx: 220, cy: 340, r: 0.95 },
  { id: 'spark-10', cx: 340, cy: 300, r: 1.1 },
  { id: 'spark-11', cx: 460, cy: 340, r: 1 },
  { id: 'spark-12', cx: 580, cy: 300, r: 0.95 },
] as const;

const toneStyles: Record<NodeTone, CSSProperties> = {
  primary: {
    '--node-core': 'oklch(from var(--background) l c h / 0.98)',
    '--node-shell': 'oklch(from var(--background) l c h / 0.34)',
    '--node-shell-outer': 'oklch(from var(--background) l c h / 0.16)',
    '--node-stroke': 'oklch(from var(--background) l c h / 0.62)',
    '--node-highlight': 'oklch(from var(--background) l c h / 0.92)',
  } as CSSProperties,
  accent: {
    '--node-core': 'oklch(from var(--background) l c h / 0.98)',
    '--node-shell': 'oklch(from var(--background) l c h / 0.32)',
    '--node-shell-outer': 'oklch(from var(--background) l c h / 0.14)',
    '--node-stroke': 'oklch(from var(--background) l c h / 0.56)',
    '--node-highlight': 'oklch(from var(--background) l c h / 0.9)',
  } as CSSProperties,
  ink: {
    '--node-core': 'oklch(from var(--background) l c h / 0.96)',
    '--node-shell': 'oklch(from var(--background) l c h / 0.28)',
    '--node-shell-outer': 'oklch(from var(--background) l c h / 0.12)',
    '--node-stroke': 'oklch(from var(--background) l c h / 0.5)',
    '--node-highlight': 'oklch(from var(--background) l c h / 0.84)',
  } as CSSProperties,
};

const nodeLookup = Object.fromEntries(nodes.map((node) => [node.id, node])) as Record<NodeId, GraphNode>;

export function LinkedNodesGraph() {
  const nodeRefs = useRef<Record<NodeId, SVGGElement | null>>({
    source: null,
    verify: null,
    graph: null,
    review: null,
    rollout: null,
    bundle: null,
    handoff: null,
  });
  const edgeRefs = useRef<Record<string, SVGLineElement | null>>({});
  const sparkleRefs = useRef<Record<string, SVGCircleElement | null>>({});

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateEdges = () => {
      edges.forEach((edge) => {
        const line = edgeRefs.current[edge.id];
        const fromElement = nodeRefs.current[edge.from];
        const toElement = nodeRefs.current[edge.to];

        if (!line || !fromElement || !toElement) {
          return;
        }

        const fromNode = nodeLookup[edge.from];
        const toNode = nodeLookup[edge.to];
        const fromX = Number(gsap.getProperty(fromElement, 'x')) || 0;
        const fromY = Number(gsap.getProperty(fromElement, 'y')) || 0;
        const toX = Number(gsap.getProperty(toElement, 'x')) || 0;
        const toY = Number(gsap.getProperty(toElement, 'y')) || 0;

        line.setAttribute('x1', String(fromNode.x + fromX));
        line.setAttribute('y1', String(fromNode.y + fromY));
        line.setAttribute('x2', String(toNode.x + toX));
        line.setAttribute('y2', String(toNode.y + toY));
      });
    };

    updateEdges();

    if (reduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      nodes.forEach((node, index) => {
        const element = nodeRefs.current[node.id];

        if (!element) {
          return;
        }

        const offsetX = index % 2 === 0 ? 12 + index * 2 : -14 - index * 2;
        const offsetY = index % 2 === 0 ? -10 - index : 9 + index;

        gsap.to(element, {
          x: offsetX,
          y: offsetY,
          duration: 5.8 + index * 0.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          onUpdate: updateEdges,
        });

        gsap.to(element, {
          rotate: index % 2 === 0 ? 1.6 : -1.8,
          transformOrigin: `${node.x}px ${node.y}px`,
          duration: 7.6 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        const halo = element.querySelector<SVGCircleElement>('[data-part="halo"]');
        const core = element.querySelector<SVGCircleElement>('[data-part="core"]');
        const outerShell = element.querySelector<SVGCircleElement>('[data-part="shell"]');
        const highlight = element.querySelector<SVGCircleElement>('[data-part="highlight"]');

        if (halo) {
          gsap.to(halo, {
            attr: { r: 36 },
            opacity: 0.68,
            duration: 4.8 + index * 0.35,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        if (outerShell) {
          gsap.to(outerShell, {
            attr: { r: 24 },
            opacity: 0.82,
            duration: 4.2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        if (core) {
          gsap.to(core, {
            attr: { r: 9.6 },
            duration: 3.8 + index * 0.22,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        if (highlight) {
          gsap.to(highlight, {
            opacity: 0.9,
            duration: 3.4 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      });

      edges.forEach((edge, index) => {
        const line = edgeRefs.current[edge.id];

        if (!line) {
          return;
        }

        gsap.to(line, {
          strokeDashoffset: -34,
          duration: 4.6 + index * 0.3,
          repeat: -1,
          ease: 'none',
        });

        gsap.to(line, {
          opacity: 0.6,
          duration: 3.4 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      sparkleDots.forEach((sparkle, index) => {
        const element = sparkleRefs.current[sparkle.id];

        if (!element) {
          return;
        }

        gsap.to(element, {
          opacity: 1,
          duration: 1.6 + (index % 4) * 0.22,
          repeat: -1,
          yoyo: true,
          delay: index * 0.12,
          ease: 'sine.inOut',
        });

        gsap.to(element, {
          attr: { r: sparkle.r + 0.55 },
          duration: 1.9 + (index % 3) * 0.2,
          repeat: -1,
          yoyo: true,
          delay: index * 0.08,
          ease: 'sine.inOut',
        });
      });
    });

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div className="relative min-h-[30rem] overflow-hidden">

      <svg
        aria-hidden="true"
        className="relative block h-[30rem] w-full"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 640 380"
      >
        <defs>
          <filter id="linked-zone-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="24" />
          </filter>
          <pattern
            id="linked-dot-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
          >
            <circle
              cx="20"
              cy="20"
              r="1.45"
              fill="oklch(from var(--background) l c h / 0.96)"
            />
          </pattern>
        </defs>

        <rect
          x="0"
          y="0"
          width="640"
          height="380"
          fill="url(#linked-dot-grid)"
          opacity="0.62"
        />

        {sparkleDots.map((sparkle) => (
          <circle
            key={sparkle.id}
            ref={(element) => {
              sparkleRefs.current[sparkle.id] = element;
            }}
            cx={sparkle.cx}
            cy={sparkle.cy}
            fill="oklch(from var(--background) l c h / 0.98)"
            opacity="0.38"
            r={sparkle.r}
          />
        ))}

        {zones.map((zone) => (
          <ellipse
            key={zone.id}
            cx={zone.cx}
            cy={zone.cy}
            fill="oklch(from var(--foreground) l c h / 0.02)"
            filter="url(#linked-zone-blur)"
            rx={zone.rx}
            ry={zone.ry}
          />
        ))}

        {edges.map((edge) => {
          const fromNode = nodeLookup[edge.from];
          const toNode = nodeLookup[edge.to];

          return (
            <line
              key={edge.id}
              ref={(element) => {
                edgeRefs.current[edge.id] = element;
              }}
              className=""
              opacity="0.22"
              stroke="oklch(from var(--background) l c h / 0.92)"
              strokeLinecap="round"
              strokeWidth="1.5"
              x1={fromNode.x}
              x2={toNode.x}
              y1={fromNode.y}
              y2={toNode.y}
            />
          );
        })}

        {nodes.map((node) => (
          <g
            key={node.id}
            ref={(element) => {
              nodeRefs.current[node.id] = element;
            }}
            style={toneStyles[node.tone]}
          >
            <circle
              cx={node.x}
              cy={node.y}
              data-part="halo"
              fill="var(--node-shell-outer)"
              opacity="0.42"
              r="32"
            />
            <circle
              cx={node.x}
              cy={node.y}
              data-part="shell"
              fill="var(--node-shell)"
              opacity="0.82"
              r="21"
              stroke="var(--node-stroke)"
              strokeWidth="1"
            />
            <circle
              cx={node.x}
              cy={node.y}
              data-part="core"
              fill="var(--node-core)"
              r="8.2"
            />
            <circle
              cx={node.x - 6}
              cy={node.y - 6}
              data-part="highlight"
              fill="var(--node-highlight)"
              opacity="0.46"
              r="2.6"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}