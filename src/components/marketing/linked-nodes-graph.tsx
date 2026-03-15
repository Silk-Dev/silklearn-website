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
    x: 170,
    y: 0,
    radius: 18,
    driftX: 7,
    driftY: -8,
    duration: 5.8,
    delay: 0.1,
    haloOpacity: 0.14,
    shellOpacity: 0.5,
    coreOpacity: 0.88,
    strokeOpacity: 0.26,
  },
  {
    id: 'north',
    x: 88,
    y: 62,
    radius: 18,
    driftX: 7,
    driftY: -8,
    duration: 5.8,
    delay: 0.1,
    haloOpacity: 0.14,
    shellOpacity: 0.5,
    coreOpacity: 0.88,
    strokeOpacity: 0.26,
  },
  {
    id: 'west',
    x: 110,
    y: 210,
    radius: 26,
    driftX: -10,
    driftY: 8,
    duration: 6.4,
    delay: 0.2,
    haloOpacity: 0.16,
    shellOpacity: 0.56,
    coreOpacity: 0.9,
    strokeOpacity: 0.28,
  },
  {
    id: 'lower-west',
    x: 116,
    y: 314,
    radius: 22,
    driftX: 9,
    driftY: 10,
    duration: 7,
    delay: 0.3,
    haloOpacity: 0.14,
    shellOpacity: 0.54,
    coreOpacity: 0.88,
    strokeOpacity: 0.26,
  },
  {
    id: 'upper-mid',
    x: 230,
    y: 70,
    radius: 16,
    driftX: -8,
    driftY: -6,
    duration: 5.6,
    delay: 0.15,
    haloOpacity: 0.12,
    shellOpacity: 0.48,
    coreOpacity: 0.86,
    strokeOpacity: 0.24,
  },
  {
    id: 'center',
    x: 210,
    y: 160,
    radius: 30,
    driftX: 12,
    driftY: -9,
    duration: 6.8,
    delay: 0.35,
    haloOpacity: 0.17,
    shellOpacity: 0.58,
    coreOpacity: 0.92,
    strokeOpacity: 0.3,
  },
  {
    id: 'east',
    x: 340,
    y: 50,
    radius: 20,
    driftX: -9,
    driftY: 7,
    duration: 6.1,
    delay: 0.25,
    haloOpacity: 0.13,
    shellOpacity: 0.5,
    coreOpacity: 0.88,
    strokeOpacity: 0.24,
  },
  {
    id: 'anchor',
    x: 656,
    y: 398,
    radius: 500,
    driftX: -14,
    driftY: 12,
    duration: 8.5,
    delay: 0,
    haloOpacity: 0.1,
    shellOpacity: 0.4,
    coreOpacity: 0.94,
    strokeOpacity: 0.22,
  },
];

const connections: Connection[] = [
  {
    id: 'top-north-east',
    from: 'east',
    to: 'top-north',
    curveX: -20,
    curveY: -24,
    opacity: 0.18,
    width: 1.2,
  },
  {
    id: 'north-west',
    from: 'north',
    to: 'west',
    curveX: -20,
    curveY: 24,
    opacity: 0.18,
    width: 1.2,
  },
  {
    id: 'west-center',
    from: 'west',
    to: 'center',
    curveX: -12,
    curveY: -24,
    opacity: 0.2,
    width: 1.3,
  },
  {
    id: 'lower-west-center',
    from: 'lower-west',
    to: 'center',
    curveX: 4,
    curveY: 24,
    opacity: 0.18,
    width: 1.2,
  },
  {
    id: 'upper-mid-center',
    from: 'upper-mid',
    to: 'center',
    curveX: 4,
    curveY: -18,
    opacity: 0.16,
    width: 1.1,
  },
  {
    id: 'center-east',
    from: 'center',
    to: 'east',
    curveX: 22,
    curveY: -28,
    opacity: 0.18,
    width: 1.2,
  },
  {
    id: 'west-anchor',
    from: 'west',
    to: 'anchor',
    curveX: 30,
    curveY: -20,
    opacity: 0.24,
    width: 1.5,
  },
  {
    id: 'lower-west-anchor',
    from: 'lower-west',
    to: 'anchor',
    curveX: 34,
    curveY: 24,
    opacity: 0.22,
    width: 1.4,
  },
  {
    id: 'center-anchor',
    from: 'center',
    to: 'anchor',
    curveX: 56,
    curveY: -40,
    opacity: 0.28,
    width: 1.6,
  },
  {
    id: 'east-anchor',
    from: 'east',
    to: 'anchor',
    curveX: 30,
    curveY: -52,
    opacity: 0.22,
    width: 1.4,
  },
];

const nodeLookup = Object.fromEntries(sceneNodes.map((node) => [node.id, node])) as Record<string, SceneNode>;

function buildCurve(from: { x: number; y: number }, to: { x: number; y: number }, connection: Connection) {
  const controlX = (from.x + to.x) / 2 + connection.curveX;
  const controlY = (from.y + to.y) / 2 + connection.curveY;

  return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
}

export function LinkedNodesGraph() {
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const connectionRefs = useRef<Record<string, SVGPathElement | null>>({});

  useEffect(() => {
    const anchorNodeId = 'anchor';
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
      const anchorElement = nodeRefs.current[anchorNodeId];
      const secondaryElements = sceneNodes
        .filter((node) => node.id !== anchorNodeId)
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
            opacity: Math.min(connection.opacity + 0.08, 0.34),
            duration: 3.8 + index * 0.18,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      };

      if (anchorElement) {
        gsap.set(anchorElement, {
          opacity: 0,
          scale: 0.72,
          transformOrigin: `${nodeLookup[anchorNodeId].x}px ${nodeLookup[anchorNodeId].y}px`,
        });
      }

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
        onComplete: startAmbientMotion,
      });

      if (anchorElement) {
        revealTimeline.to(anchorElement, {
          opacity: 1,
          scale: 1,
          duration: 0.95,
        });
        revealTimeline.to({}, { duration: 0.15 });
      }

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

        revealTimeline.to(
          path,
          {
            opacity: connection.opacity,
            strokeDashoffset: 0,
            duration: 0.42,
          },
        );
      });
    });

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div className="relative min-h-[30rem] w-full overflow-hidden lg:h-full">
      <svg
        aria-hidden="true"
        className="relative block h-[30rem] w-full lg:h-full"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 640 380"
      >
        <defs>
          
          
          
          <filter id="linked-node-softness" x="-40%" y="-40%" width="180%" height="180%">
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
              stroke="oklch(from var(--primary) l c h / 0.24)"
              strokeLinecap="round"
              strokeWidth={connection.width}
            />
          );
        })}

        {sceneNodes.map((node) => {
          const highlightRadius = node.id === 'anchor' ? node.radius * 0.14 : node.radius * 0.2;
          const highlightOffset = node.id === 'anchor' ? node.radius * 0.24 : node.radius * 0.3;

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
                fill="url(#linked-node-halo)"
                filter="url(#linked-node-softness)"
                opacity={node.haloOpacity}
                r={node.radius * 1.14}
              />
              <circle
                cx={node.x}
                cy={node.y}
                data-part="shell"
                fill="url(#linked-node-shell)"
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
