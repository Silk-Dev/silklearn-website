'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

import { ScrollReveal } from '@/components/marketing/scroll-animations';

gsap.registerPlugin(ScrollTrigger);

export function ProductScrollSections() {
  const containerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;

    if (!container || !progress) return;

    gsap.set(progress, {
      scaleY: 0,
      transformOrigin: 'top top',
    });

    const tween = gsap.to(progress, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    const triggers = sectionRefs.current
      .map((section, index) => {
        if (!section) return null;

        return ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      })
      .filter((trigger): trigger is ScrollTrigger => trigger !== null);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const sectionCount: number = 4;

  const nodePositions = Array.from({ length: sectionCount }, (_, index) => {
    if (sectionCount === 1) return 0;

    return (index / (sectionCount - 1)) * 100;
  });

  return (
    <section ref={containerRef} className="grid border-b border-(--border) lg:grid-cols-[30%_1px_minmax(0,1fr)]">
      <div className="hidden lg:block">
        <div className="sticky top-28 flex h-[calc(100vh-9rem)] justify-center pt-14 pb-14">
          <div className="relative h-full w-[3px] bg-[oklch(from_var(--foreground)_l_c_h/0.12)]">
            <div ref={progressRef} className="absolute inset-x-0 top-0 h-full origin-top bg-(--primary)" />

            {nodePositions.map((position, index) => {
              const isActive = index <= activeIndex;
              const isCurrent = index === activeIndex;

              return (
                <div
                  key={index}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${position}%` }}
                >
                  <div className="relative flex size-6 items-center justify-center">
                    {isCurrent ? (
                      <div className="absolute inset-[-6px] rounded-full border border-[oklch(from_var(--primary)_l_c_h/0.28)] animate-ping" />
                    ) : null}
                    <div className={`relative z-10 flex size-6 items-center justify-center rounded-full border transition-[border-color,background-color,box-shadow] duration-200 ${isActive ? 'border-[oklch(from_var(--primary)_l_c_h/0.35)] bg-[oklch(from_var(--primary)_l_c_h/0.12)] shadow-[0_0_0_4px_oklch(from_var(--primary)_l_c_h/0.08)]' : 'border-[oklch(from_var(--foreground)_l_c_h/0.14)] bg-(--background)'}`}>
                      <div className={`size-2 rounded-full transition-colors duration-200 ${isActive ? 'bg-(--primary)' : 'bg-[oklch(from_var(--foreground)_l_c_h/0.22)]'}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hidden bg-(--border) lg:block" />

      <div>
        <article
          ref={(element) => {
            sectionRefs.current[0] = element;
          }}
          className="px-6 py-10 sm:px-8 lg:px-10 lg:py-14"
        >
          <ScrollReveal start="top 92%">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              Compilation engine
            </p>

            <h2 className="mt-4 max-w-[18ch] font-(family-name:--font-display) text-[clamp(1.85rem,3vw,2.75rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Compilation: prerequisite logic extracted from the source, not invented.
            </h2>

            <p className="mt-5 max-w-[66ch] text-[1rem] leading-7 text-(--foreground)">
              The compilation engine parses your document stack — PDF, Markdown, DOCX, Notion exports, Confluence exports — and builds an initial dependency graph. It reads heading structure, semantic flow, and explicit cross-references across all uploaded documents.
            </p>

            <p className="mt-5 max-w-[66ch] text-sm leading-6 text-(--muted-foreground)">
              Every node in the graph links back to the exact section of the exact document it came from. Provenance is non-negotiable. You always know where a piece of knowledge originated.
            </p>

            <div className="mt-8 border-t border-(--border) pt-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Supported formats
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="border border-(--border) px-3 py-2 text-sm leading-5 text-(--foreground)">PDF</div>
                <div className="border border-(--border) px-3 py-2 text-sm leading-5 text-(--foreground)">Markdown</div>
                <div className="border border-(--border) px-3 py-2 text-sm leading-5 text-(--foreground)">DOCX</div>
                <div className="border border-(--border) px-3 py-2 text-sm leading-5 text-(--foreground)">Notion export</div>
                <div className="border border-(--border) px-3 py-2 text-sm leading-5 text-(--foreground)">Confluence export</div>
                <div className="border border-(--border) px-3 py-2 text-sm leading-5 text-(--foreground)">GitHub (coming soon)</div>
                <div className="border border-(--border) px-3 py-2 text-sm leading-5 text-(--foreground)">Google Drive (coming soon)</div>
              </div>
            </div>
          </ScrollReveal>
        </article>

        <article
          ref={(element) => {
            sectionRefs.current[1] = element;
          }}
          className="border-t border-(--border) px-6 py-10 sm:px-8 lg:px-10 lg:py-14"
        >
          <ScrollReveal start="top 92%">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              Review layer
            </p>

            <h2 className="mt-4 max-w-[18ch] font-(family-name:--font-display) text-[clamp(1.85rem,3vw,2.75rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Review: leaders approve the structure before it drives anything.
            </h2>

            <p className="mt-5 max-w-[66ch] text-[1rem] leading-7 text-(--foreground)">
              The compiled graph lands in a visual review interface. Leaders inspect every node and edge — accept, reject, or flag each connection. When two documents contradict each other, a conflict flag surfaces automatically for human resolution.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3 border border-(--border) p-4">
                <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-(--primary)" />
                <p className="text-sm leading-6 text-(--foreground)">Visual graph inspector</p>
              </div>
              <div className="flex gap-3 border border-(--border) p-4">
                <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-(--primary)" />
                <p className="text-sm leading-6 text-(--foreground)">Edge accept / reject / flag</p>
              </div>
              <div className="flex gap-3 border border-(--border) p-4">
                <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-(--primary)" />
                <p className="text-sm leading-6 text-(--foreground)">Conflict reconciliation</p>
              </div>
              <div className="flex gap-3 border border-(--border) p-4">
                <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-(--primary)" />
                <p className="text-sm leading-6 text-(--foreground)">Approval gate</p>
              </div>
              <div className="flex gap-3 border border-(--border) p-4 sm:col-span-2">
                <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-(--primary)" />
                <p className="text-sm leading-6 text-(--foreground)">Full audit trail (timestamps + reviewer names)</p>
              </div>
            </div>

            <div className="pt-3">
              <p className="max-w-[62ch] text-sm leading-6 text-(--muted-foreground)">
                Nothing reaches teams until the structure is signed off. The audit trail is generated automatically — no manual logging required.
              </p>
            </div>
          </ScrollReveal>
        </article>

        <article
          ref={(element) => {
            sectionRefs.current[2] = element;
          }}
          className="border-t border-(--border) px-6 py-10 sm:px-8 lg:px-10 lg:py-14"
        >
          <ScrollReveal start="top 92%">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              Distribution layer
            </p>

            <h2 className="mt-4 max-w-[18ch] font-(family-name:--font-display) text-[clamp(1.85rem,3vw,2.75rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Distribution: one reviewed graph, four usable outputs.
            </h2>

            <div className="mt-8 grid sm:grid-cols-2">
              <div className="p-6 sm:p-8">
                <h3 className="max-w-[18ch] text-[1.15rem] leading-tight tracking-[-0.02em] text-(--foreground)">
                  Prerequisite-ordered learning path
                </h3>
                <p className="mt-4 max-w-[34ch] text-sm leading-6 text-(--muted-foreground)">
                  A sequence teams can follow from day one. No pile of docs, no guessing what to read first.
                </p>
              </div>
              <div className="border-t border-(--border) p-6 sm:border-t-0 sm:border-l sm:p-8">
                <h3 className="max-w-[18ch] text-[1.15rem] leading-tight tracking-[-0.02em] text-(--foreground)">
                  Rollout milestone checklist
                </h3>
                <p className="mt-4 max-w-[34ch] text-sm leading-6 text-(--muted-foreground)">
                  Dependency-locked steps that surface the order before handoffs depend on it being correct.
                </p>
              </div>
              <div className="border-t border-(--border) p-6 sm:p-8">
                <h3 className="max-w-[18ch] text-[1.15rem] leading-tight tracking-[-0.02em] text-(--foreground)">
                  AI context bundle
                </h3>
                <p className="mt-4 max-w-[34ch] text-sm leading-6 text-(--muted-foreground)">
                  A structured, minimum-context payload for internal LLM assistants. Prerequisite-ordered, grounded in reviewed source.
                </p>
              </div>
              <div className="border-t border-(--border) p-6 sm:border-l sm:p-8">
                <h3 className="max-w-[18ch] text-[1.15rem] leading-tight tracking-[-0.02em] text-(--foreground)">
                  Compliance review queue
                </h3>
                <p className="mt-4 max-w-[34ch] text-sm leading-6 text-(--muted-foreground)">
                  Flagged items with source links, reviewer assignments, and timestamps. Ready for audit export.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </article>

        <article
          ref={(element) => {
            sectionRefs.current[3] = element;
          }}
          className="border-t border-(--border) px-6 py-10 sm:px-8 lg:px-10 lg:py-14"
        >
          <ScrollReveal start="top 92%">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              Integrations
            </p>

            <h2 className="mt-4 max-w-[18ch] font-(family-name:--font-display) text-[clamp(1.85rem,3vw,2.75rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Works with the tools your docs already live in.
            </h2>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <div className="flex min-h-18 items-center justify-between gap-3 border border-(--border) px-4 py-4">
                <span className="text-sm font-medium leading-5 text-(--foreground)">Notion</span>
              </div>
              <div className="flex min-h-18 items-center justify-between gap-3 border border-(--border) px-4 py-4">
                <span className="text-sm font-medium leading-5 text-(--foreground)">Confluence</span>
              </div>
              <div className="flex min-h-18 items-center justify-between gap-3 border border-(--border) px-4 py-4">
                <span className="text-sm font-medium leading-5 text-(--foreground)">Google Drive</span>
                <span className="border border-(--border) px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Coming soon</span>
              </div>
              <div className="flex min-h-18 items-center justify-between gap-3 border border-(--border) px-4 py-4">
                <span className="text-sm font-medium leading-5 text-(--foreground)">GitHub (Markdown)</span>
                <span className="border border-(--border) px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Coming soon</span>
              </div>
              <div className="flex min-h-18 items-center justify-between gap-3 border border-(--border) px-4 py-4">
                <span className="text-sm font-medium leading-5 text-(--foreground)">Slack (delivery)</span>
                <span className="border border-(--border) px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Coming soon</span>
              </div>
              <div className="flex min-h-18 items-center justify-between gap-3 border border-(--border) px-4 py-4">
                <span className="text-sm font-medium leading-5 text-(--foreground)">Custom API</span>
                <span className="border border-(--border) px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Coming soon</span>
              </div>
            </div>
          </ScrollReveal>
        </article>
      </div>
    </section>
  );
}