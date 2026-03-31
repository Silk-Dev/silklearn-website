'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

import { ScrollReveal } from '@/components/marketing/scroll-animations';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stepSections = [
  {
    label: 'Step 1',
    title: 'Upload',
    copy:
      "Drop in what you're trying to learn, exactly as it exists. Research papers, codebase docs, textbooks, SOPs, onboarding notes — any format, any structure. SILKLEARN reads it as-is.",
    detail:
      'Supported: PDF, Markdown, DOCX, Notion export, Confluence export. GitHub and Google Drive coming soon.',
  },
  {
    label: 'Step 2',
    title: 'Review',
    copy:
      'See the structure the system compiled. The dependency graph shows what concepts build on each other. Contradictions surface where your sources disagree. You check the map before you follow it.',
    detail:
      "Inspect every connection. Accept it, reject it, or flag it for further review. The compiled structure doesn't become your path until you've verified it makes sense.",
  },
  {
    label: 'Step 3',
    title: 'Follow',
    copy:
      'Work through the path the system built. Your documents, in the order they actually depend on each other — not the order someone uploaded them, not alphabetical, not by date.',
    detail:
      'Export as a structured reading list, share with a collaborator, or feed as structured context to an AI system that needs the right order, not a retrieval guess.',
  },
] as const;

export function ProductScrollSections() {
  const containerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const container = containerRef.current;
    const progress = progressRef.current;
    const sections = sectionRefs.current.filter((section): section is HTMLElement => section !== null);

    if (!container || !progress || sections.length === 0) return;

    const firstSection = sections[0];
    const lastSection = sections[sections.length - 1];

    gsap.set(progress, {
      scaleY: 0,
      transformOrigin: 'top top',
    });

    gsap.to(progress, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: firstSection,
        start: 'center center',
        endTrigger: lastSection,
        end: 'center center',
        scrub: true,
      },
    });

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'center center',
        end: index < sections.length - 1 ? 'bottom center' : 'bottom top',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });
  });

  const sectionCount: number = stepSections.length;

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
                    {null}
                    <div className={`relative z-10 flex size-6 items-center justify-center rounded-full border transition-[border-color,background-color,box-shadow] duration-200 ease-out ${isActive ? 'border-[oklch(from_var(--primary)_l_c_h/0.35)] bg-[oklch(from_var(--primary)_l_c_h/0.12)] shadow-[0_0_0_4px_oklch(from_var(--primary)_l_c_h/0.08)]' : 'border-[oklch(from_var(--foreground)_l_c_h/0.14)] bg-(--background)'}`}>
                      <div className={`size-2 rounded-full transition-colors duration-200 ease-out ${isActive ? 'bg-(--primary)' : 'bg-[oklch(from_var(--foreground)_l_c_h/0.22)]'}`} />
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
        {stepSections.map((section, index) => (
          <article
            key={section.label}
            ref={(element) => {
              sectionRefs.current[index] = element;
            }}
            className={`px-6 py-10 sm:px-8 lg:px-10 lg:py-20 ${index > 0 ? 'border-t border-(--border)' : ''}`}
          >
            <ScrollReveal start="top 92%">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                {section.label}
              </p>

              <h2 className="mt-4 max-w-[18ch] font-(family-name:--font-display) text-display-md leading-none tracking-[-0.02em] text-(--foreground)">
                {section.title}
              </h2>

              <p className="mt-5 max-w-[66ch] text-[1rem] leading-7 text-(--foreground)">
                {section.copy}
              </p>

              <p className="mt-5 max-w-[66ch] text-sm leading-6 text-(--muted-foreground)">
                {section.detail}
              </p>
            </ScrollReveal>
          </article>
        ))}
      </div>
    </section>
  );
}