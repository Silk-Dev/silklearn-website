'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';

type SceneNode = {
  id: string;
  x: number;
  y: number;
  radius: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  haloOpacity: number;
  shellOpacity: number;
  coreOpacity: number;
  strokeOpacity: number;
};

type Connection = {
  id: string;
  from: string;
  to: string;
  curveX: number;
  curveY: number;
  opacity: number;
  width: number;
};

const sceneNodes: SceneNode[] = [
  {
    id: 'top-north',
    x: 152,
    y: 84,
    radius: 18,
    driftX: 6,
    driftY: -7,
    duration: 5.8,
    delay: 0.1,
    haloOpacity: 0.14,
    shellOpacity: 0.5,
    coreOpacity: 0.88,
    strokeOpacity: 0.26,
  },
  {
    id: 'north',
    x: 234,
    y: 74,
    radius: 20,
    driftX: 8,
    driftY: -6,
    duration: 5.9,
    delay: 0.12,
    haloOpacity: 0.14,
    shellOpacity: 0.5,
    coreOpacity: 0.88,
    strokeOpacity: 0.26,
  },
  {
    id: 'west',
    x: 126,
    y: 192,
    radius: 24,
    driftX: -9,
    driftY: 7,
    duration: 6.2,
    delay: 0.2,
    haloOpacity: 0.16,
    shellOpacity: 0.56,
    coreOpacity: 0.9,
    strokeOpacity: 0.28,
  },
  {
    id: 'center',
    x: 214,
    y: 176,
    radius: 28,
    driftX: 10,
    driftY: -8,
    duration: 6.6,
    delay: 0.3,
    haloOpacity: 0.17,
    shellOpacity: 0.58,
    coreOpacity: 0.92,
    strokeOpacity: 0.3,
  },
  {
    id: 'upper-mid',
    x: 300,
    y: 118,
    radius: 17,
    driftX: -7,
    driftY: -5,
    duration: 5.6,
    delay: 0.15,
    haloOpacity: 0.12,
    shellOpacity: 0.48,
    coreOpacity: 0.86,
    strokeOpacity: 0.24,
  },
  {
    id: 'upper-east',
    x: 334,
    y: 168,
    radius: 14,
    driftX: -6,
    driftY: -4,
    duration: 5.4,
    delay: 0.18,
    haloOpacity: 0.11,
    shellOpacity: 0.46,
    coreOpacity: 0.84,
    strokeOpacity: 0.22,
  },
  {
    id: 'east',
    x: 306,
    y: 226,
    radius: 20,
    driftX: -8,
    driftY: 6,
    duration: 6.1,
    delay: 0.25,
    haloOpacity: 0.13,
    shellOpacity: 0.5,
    coreOpacity: 0.88,
    strokeOpacity: 0.24,
  },
  {
    id: 'lower-east',
    x: 284,
    y: 282,
    radius: 16,
    driftX: -7,
    driftY: 5,
    duration: 5.7,
    delay: 0.28,
    haloOpacity: 0.12,
    shellOpacity: 0.47,
    coreOpacity: 0.85,
    strokeOpacity: 0.23,
  },
  {
    id: 'lower-west',
    x: 178,
    y: 274,
    radius: 22,
    driftX: 8,
    driftY: 9,
    duration: 6.8,
    delay: 0.35,
    haloOpacity: 0.14,
    shellOpacity: 0.54,
    coreOpacity: 0.88,
    strokeOpacity: 0.26,
  },
  {
    id: 'south-mid',
    x: 236,
    y: 304,
    radius: 15,
    driftX: 6,
    driftY: 7,
    duration: 5.9,
    delay: 0.32,
    haloOpacity: 0.11,
    shellOpacity: 0.45,
    coreOpacity: 0.84,
    strokeOpacity: 0.22,
  },
];

const connections: Connection[] = [
  {
    id: 'top-north-to-center',
    from: 'top-north',
    to: 'center',
    curveX: -26,
    curveY: -4,
    opacity: 0.17,
    width: 1.1,
  },
  {
    id: 'north-to-upper-mid',
    from: 'north',
    to: 'upper-mid',
    curveX: 22,
    curveY: -18,
    opacity: 0.17,
    width: 1.15,
  },
  {
    id: 'north-to-center',
    from: 'north',
    to: 'center',
    curveX: -18,
    curveY: 14,
    opacity: 0.17,
    width: 1.1,
  },
  {
    id: 'upper-mid-to-upper-east',
    from: 'upper-mid',
    to: 'upper-east',
    curveX: 18,
    curveY: -10,
    opacity: 0.15,
    width: 1.05,
  },
  {
    id: 'west-to-center',
    from: 'west',
    to: 'center',
    curveX: -22,
    curveY: -12,
    opacity: 0.2,
    width: 1.3,
  },
  {
    id: 'center-to-east',
    from: 'center',
    to: 'east',
    curveX: 26,
    curveY: -8,
    opacity: 0.18,
    width: 1.2,
  },
  {
    id: 'east-to-upper-east',
    from: 'east',
    to: 'upper-east',
    curveX: 20,
    curveY: -18,
    opacity: 0.16,
    width: 1.08,
  },
  {
    id: 'center-to-lower-west',
    from: 'center',
    to: 'lower-west',
    curveX: -8,
    curveY: 26,
    opacity: 0.15,
    width: 1.05,
  },
  {
    id: 'east-to-lower-east',
    from: 'east',
    to: 'lower-east',
    curveX: 14,
    curveY: 20,
    opacity: 0.16,
    width: 1.08,
  },
  {
    id: 'lower-west-to-south-mid',
    from: 'lower-west',
    to: 'south-mid',
    curveX: 0,
    curveY: 18,
    opacity: 0.15,
    width: 1.05,
  },
  {
    id: 'south-mid-to-lower-east',
    from: 'south-mid',
    to: 'lower-east',
    curveX: 2,
    curveY: 18,
    opacity: 0.16,
    width: 1.08,
  },
];

const nodeLookup = Object.fromEntries(sceneNodes.map((node) => [node.id, node])) as Record<string, SceneNode>;

function buildCurve(from: { x: number; y: number }, to: { x: number; y: number }, connection: Connection) {
  const controlX = (from.x + to.x) / 2 + connection.curveX;
  const controlY = (from.y + to.y) / 2 + connection.curveY;

  return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
}

export function ProductLinkedNodesGraph() {
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const connectionRefs = useRef<Record<string, SVGPathElement | null>>({});

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getNodePosition = (node: SceneNode) => {
      const element = nodeRefs.current[node.id];
      const offsetX = element ? Number(gsap.getProperty(element, 'x')) || 0 : 0;
      const offsetY = element ? Number(gsap.getProperty(element, 'y')) || 0 : 0;

      return {
        x: node.x + offsetX,
        y: node.y + offsetY,
      };
    };

    const updateConnections = () => {
      connections.forEach((connection) => {
        const path = connectionRefs.current[connection.id];

        if (!path) {
          return;
        }

        const from = getNodePosition(nodeLookup[connection.from]);
        const to = getNodePosition(nodeLookup[connection.to]);

        path.setAttribute('d', buildCurve(from, to, connection));
      });
    };

    updateConnections();

    if (reduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      const secondaryElements = sceneNodes
        .map((node) => nodeRefs.current[node.id])
        .filter((element): element is SVGGElement => element !== null);

      const startAmbientMotion = () => {
        sceneNodes.forEach((node, index) => {
          const element = nodeRefs.current[node.id];

          if (!element) {
            return;
          }

          gsap.to(element, {
            x: node.driftX,
            y: node.driftY,
            duration: node.duration,
            delay: node.delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            onUpdate: updateConnections,
          });

          gsap.to(element, {
            rotate: index % 2 === 0 ? 1.2 : -1.2,
            transformOrigin: `${node.x}px ${node.y}px`,
            duration: node.duration + 1.8,
            delay: node.delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          const shell = element.querySelector<SVGCircleElement>('[data-part="shell"]');
          const halo = element.querySelector<SVGCircleElement>('[data-part="halo"]');
          const core = element.querySelector<SVGCircleElement>('[data-part="core"]');
          const highlight = element.querySelector<SVGCircleElement>('[data-part="highlight"]');

          if (halo) {
            gsap.to(halo, {
              attr: { r: node.radius * 1.24 },
              opacity: node.haloOpacity + 0.05,
              duration: node.duration - 1.2,
              delay: node.delay,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          }

          if (shell) {
            gsap.to(shell, {
              attr: { r: node.radius * 0.88 },
              opacity: Math.min(node.shellOpacity + 0.08, 0.72),
              duration: node.duration - 1,
              delay: node.delay,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          }

          if (core) {
            gsap.to(core, {
              attr: { r: node.radius * 0.48 },
              duration: node.duration - 1.6,
              delay: node.delay,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          }

          if (highlight) {
            gsap.to(highlight, {
              opacity: 0.62,
              duration: node.duration - 2,
              delay: node.delay,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          }
        });

        connections.forEach((connection, index) => {
          const path = connectionRefs.current[connection.id];

          if (!path) {
            return;
          }

          gsap.to(path, {
            opacity: Math.min(connection.opacity + 0.1, 0.46),
            duration: 3.8 + index * 0.18,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      };

      secondaryElements.forEach((element) => {
        const nodeId = element.dataset.nodeId;
        const node = nodeId ? nodeLookup[nodeId] : null;

        if (!node) {
          return;
        }

        gsap.set(element, {
          opacity: 0,
          scale: 0.62,
          y: 16,
          transformOrigin: `${node.x}px ${node.y}px`,
        });
      });

      connections.forEach((connection) => {
        const path = connectionRefs.current[connection.id];

        if (!path) {
          return;
        }

        const pathLength = path.getTotalLength();

        gsap.set(path, {
          opacity: 0,
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
      });

      const revealTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.3,
        onComplete: () => {
          startAmbientMotion();
        },
      });

      if (secondaryElements.length > 0) {
        revealTimeline.to(secondaryElements, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.04,
        });
        revealTimeline.to({}, { duration: 0.35 });
      }

      connections.forEach((connection) => {
        const path = connectionRefs.current[connection.id];

        if (!path) {
          return;
        }

        revealTimeline.to(path, {
          opacity: connection.opacity,
          strokeDashoffset: 0,
          duration: 0.42,
        });
      });
    });

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <svg
        aria-hidden="true"
        className="relative block h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        viewBox="48 0 320 340"
      >
        <defs>
          <radialGradient id="product-linked-node-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(from var(--primary) l c h / 0.24)" />
            <stop offset="70%" stopColor="oklch(from var(--primary) l c h / 0.12)" />
            <stop offset="100%" stopColor="oklch(from var(--primary) l c h / 0)" />
          </radialGradient>
          <radialGradient id="product-linked-node-shell" cx="34%" cy="30%" r="78%">
            <stop offset="0%" stopColor="oklch(from var(--primary) l c h / 0.2)" />
            <stop offset="58%" stopColor="oklch(from var(--primary) l c h / 0.11)" />
            <stop offset="100%" stopColor="oklch(from var(--primary) l c h / 0.06)" />
          </radialGradient>
          <filter id="product-linked-node-softness" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {connections.map((connection) => {
          const from = nodeLookup[connection.from];
          const to = nodeLookup[connection.to];

          return (
            <path
              key={connection.id}
              ref={(element) => {
                connectionRefs.current[connection.id] = element;
              }}
              d={buildCurve(from, to, connection)}
              fill="none"
              opacity={connection.opacity}
              stroke="oklch(from var(--primary) l c h / 0.82)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={connection.width}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {sceneNodes.map((node) => {
          return (
            <g
              key={node.id}
              data-node-id={node.id}
              ref={(element) => {
                nodeRefs.current[node.id] = element;
              }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                data-part="halo"
                fill="url(#product-linked-node-halo)"
                filter="url(#product-linked-node-softness)"
                opacity={node.haloOpacity}
                r={node.radius * 1.14}
              />
              <circle
                cx={node.x}
                cy={node.y}
                data-part="shell"
                fill="url(#product-linked-node-shell)"
                opacity={node.shellOpacity}
                r={node.radius * 0.82}
                stroke="oklch(from var(--foreground) l c h / 0.08)"
                strokeWidth={node.radius > 100 ? 1.5 : 1}
              />
              <circle
                cx={node.x}
                cy={node.y}
                data-part="core"
                fill="var(--body-background)"
                opacity={node.coreOpacity}
                r={node.radius * 0.44}
                stroke={`oklch(from var(--foreground) l c h / ${node.strokeOpacity})`}
                strokeWidth={node.radius > 100 ? 1.25 : 0.9}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}