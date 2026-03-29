'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';

import { LottiePlaceholder } from '@/components/marketing/lottie-placeholder';
import { ProductLinkedNodesGraph } from './product-linked-nodes-graph';

const incomingFlowLinks = [
  { id: 'incoming-top', path: 'M 356 126 L 458 126 C 470 126 472 130 472 143 L 472 173 C 472 183 476 187 486 187 L 560 187' },
  { id: 'incoming-mid', path: 'M 358 157 L 420 157 C 440 157 440 157 440 169 L 440 185 C 440 196 440 196 452 196 L 560 196' },
  { id: 'incoming-mid-mirror', path: 'M 358 243 L 420 243 C 440 243 440 243 440 231 L 440 215 C 440 204 440 204 452 204 L 560 204' },
  { id: 'incoming-top-mirror', path: 'M 356 274 L 458 274 C 470 274 472 270 472 257 L 472 227 C 472 217 476 213 486 213 L 560 213' },
];

const outgoingFlowLinks = [
  { id: 'outgoing-top', path: 'M 604 187 L 664 187' },
  { id: 'outgoing-mid', path: 'M 604 196 L 664 196' },
  { id: 'outgoing-mid-mirror', path: 'M 604 204 L 664 204' },
  { id: 'outgoing-top-mirror', path: 'M 604 213 L 664 213' },
];

const documentItems = [
  'Arch spec.pdf',
  'Support runbook.docx',
  'Onboarding guide.md',
  'Access policy.pdf',
  'Incident checklist.docx',
  'Enablement notes.md',
];

export function ProductHeroGraph() {
  const trackRef = useRef<HTMLDivElement>(null);
  const flowPathRefs = useRef<Record<string, SVGPathElement | null>>({});
  const processingNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return;
    }

    const distance = track.scrollHeight / 2;
    const connectorPaths = Object.values(flowPathRefs.current).filter(
      (path): path is SVGPathElement => path !== null,
    );
    const processingNode = processingNodeRef.current;

    const context = gsap.context(() => {
      const tween = gsap.fromTo(
        track,
        { y: 0 },
        {
          y: -distance,
          duration: 14,
          ease: 'none',
          repeat: -1,
        },
      );

      connectorPaths.forEach((path, index) => {
        const pathLength = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 0,
        });

        gsap.timeline({ repeat: -1, repeatDelay: 0.4, delay: index * 0.18 })
          .to(path, {
            strokeDashoffset: 0,
            opacity: Number(path.dataset.id?.startsWith('incoming') ? 0.22 : 0.18),
            duration: 1.1,
            ease: 'power2.out',
          })
          .to(path, {
            opacity: Number(path.dataset.id?.startsWith('incoming') ? 0.14 : 0.12),
            duration: 0.9,
            ease: 'sine.inOut',
          });
      });

      if (processingNode) {
        gsap.to(processingNode, {
          scale: 1.06,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        const halo = processingNode.querySelector<HTMLElement>('[data-processing-halo]');
        if (halo) {
          gsap.to(halo, {
            scale: 1.14,
            opacity: 0.3,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      }

      return () => {
        tween.kill();
      };
    });

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div className="relative h-full min-h-[360px] w-full overflow-hidden px-6 py-8">
      <div className="absolute inset-0 " />


      <div
        aria-hidden="true"
        className="absolute inset-0"
        data-product-hero-animation-root
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 400"
        >
          {[...incomingFlowLinks, ...outgoingFlowLinks].map((link) => (
            <path
              key={link.id}
              ref={(element) => {
                flowPathRefs.current[link.id] = element;
              }}
              d={link.path}
              data-id={link.id}
              fill="none"
              opacity="0"
              stroke="oklch(from var(--primary) l c h / 0.72)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={link.id.startsWith('incoming') ? 1.35 : 1.15}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="pointer-events-none absolute left-[58%] top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div ref={processingNodeRef} className="relative flex h-20 w-20 items-center justify-center">
            <div
              data-processing-halo
              className="absolute inset-0 rounded-full bg-[oklch(from_var(--primary)_l_c_h/0.16)] blur-xl"
            />
            <div className="absolute inset-[0.45rem] rounded-full bg-[oklch(from_var(--primary)_l_c_h/0.12)] ring-1 ring-[oklch(from_var(--foreground)_l_c_h/0.08)]" />
            <div className="absolute inset-[1.25rem] rounded-full bg-(--body-background) ring-1 ring-[oklch(from_var(--foreground)_l_c_h/0.22)]" />
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
          <div className="absolute top-1/2 left-8 h-[14rem] w-full max-w-[20rem] -translate-y-1/2 overflow-hidden lg:left-10">
            <div ref={trackRef} className="absolute inset-x-4 top-0 flex flex-col gap-3 py-4">
              {[...documentItems, ...documentItems].map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center gap-3  px-3 py-3"
                >
                  <LottiePlaceholder
                    label="Lottie · File"
                    description="File animation"
                    animationSrc="/silklearn/animations/file.json"
                    height="h-8"
                    animationClassName="h-full w-full max-h-full max-w-full"
                    className="h-8 w-8 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-(--muted-foreground)">
                      Document
                    </div>
                    <div className="mt-1 truncate text-xs leading-4 text-(--foreground)">{item}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 right-6 h-[12rem] w-[11rem] -translate-y-1/2 opacity-90 lg:right-10">
            <ProductLinkedNodesGraph />
          </div>
        </div>
      </div>
    </div>
  );
}