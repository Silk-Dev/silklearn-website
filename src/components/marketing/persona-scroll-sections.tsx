"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/marketing/scroll-animations";

gsap.registerPlugin(ScrollTrigger);

export interface PersonaScrollSectionsProps {
  persona: {
    id: string;
    selector: string;
    description?: string;
    details?: string[];
    [key: string]: any;
  };
}


export function PersonaScrollSections({ persona }: PersonaScrollSectionsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Compose up to 7 sections from persona fields
  const baseSections = [
    persona.problem && {
      title: 'Problem',
      copy: persona.problem,
    },
    persona.solution && {
      title: 'Solution',
      copy: persona.solution,
    },
    ...(Array.isArray(persona.outcomes)
      ? persona.outcomes.map((o, i) => ({
          title: o.label || `Outcome ${i + 1}`,
          copy: o.value,
        }))
      : []),
  ].filter(Boolean);

  // Always 5 nodes: fill with placeholders if needed
  const sectionCount = 5;
  const sections = Array.from({ length: sectionCount }, (_, i) =>
    baseSections[i] || {
      title: persona.selector,
      copy: '',
    }
  );


  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;
    const sectionEls = sectionRefs.current.filter((section): section is HTMLElement => section !== null);
    if (!container || !progress || sectionEls.length === 0) return;
    const firstSection = sectionEls[0];
    const lastSection = sectionEls[sectionEls.length - 1];
    gsap.set(progress, {
      scaleY: 0,
      transformOrigin: "top top",
    });
    // Progress bar should start at the top of the first section and end at the top of the last section
    const tween = gsap.to(progress, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: firstSection,
        start: "top 30%",
        endTrigger: lastSection,
        end: "top 30%+=1",
        scrub: true,
      },
    });
    // Use more accurate scroll trigger points: each node becomes active when its section top reaches 30% of viewport height
    const triggers = sectionEls.map((section, index) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 30%",
        end:
          index < sectionEls.length - 1
            ? "bottom 30%"
            : "top 30%+=1", // last section: activate as soon as top hits 30% (no lag)
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      })
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [persona.id]);

  const nodePositions = Array.from({ length: sectionCount }, (_, index) =>
    Number(sectionCount) === 1 ? 0 : (index / (Number(sectionCount) - 1)) * 100
  );

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
                    <div
                      className={`relative z-10 flex size-6 items-center justify-center rounded-full border transition-[border-color,background-color,box-shadow] duration-200 ease-out ${isActive ? "border-[oklch(from_var(--primary)_l_c_h/0.35)] bg-[oklch(from_var(--primary)_l_c_h/0.12)] shadow-[0_0_0_4px_oklch(from_var(--primary)_l_c_h/0.08)]" : "border-[oklch(from_var(--foreground)_l_c_h/0.14)] bg-(--background)"}`}
                    >
                      <div
                        className={`size-2 rounded-full transition-colors duration-200 ease-out ${isActive ? "bg-(--primary)" : "bg-[oklch(from_var(--foreground)_l_c_h/0.22)]"}`}
                      />
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
        {sections.map((section, index) => (
          <article
            key={index}
            ref={(element) => {
              sectionRefs.current[index] = element;
            }}
            className={`px-6 py-10 sm:px-8 lg:px-10 lg:py-20 min-h-[220px] lg:min-h-[280px] ${index > 0 ? "border-t border-(--border)" : ""}`}
          >
            <ScrollReveal start="top 92%">
              <h2 className="mt-4 max-w-[28ch] font-(family-name:--font-display) text-[clamp(1.35rem,2.2vw,1.85rem)] leading-tight tracking-[-0.01em] text-(--foreground)">{section.title}</h2>
              <p className="mt-5 max-w-[66ch] text-[1rem] leading-7 text-(--foreground)">{section.copy}</p>
            </ScrollReveal>
          </article>
        ))}
      </div>
    </section>
  );
}
