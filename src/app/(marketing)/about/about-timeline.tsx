'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type TimelineItem = {
  date: string;
  label: string;
  title: string;
  desc: string;
  type: 'past' | 'now' | 'future';
};

const pastItems: TimelineItem[] = [
  {
    date: 'Day 1.5',
    label: 'The Reset begins',
    title: 'Skill synthesis → the insight',
    desc: '"The knowledge already exists. The structure doesn\'t."',
    type: 'past',
  },
  {
    date: 'Day 2',
    label: 'Product vision',
    title: 'Dependency-ordered paths from your own sources',
    desc: "Obsidian's graph depth. roadmap.sh's structured paths. Your content.",
    type: 'past',
  },
  {
    date: 'Day 3',
    label: 'Architecture',
    title: 'Human-in-the-loop reframe',
    desc: 'AI generates structure. You inspect before you follow. NP-hard becomes solvable.',
    type: 'past',
  },
  {
    date: 'Month 1',
    label: 'Shipped',
    title: 'Dependency mapping engine',
    desc: 'First private tests. The structure was always there.',
    type: 'past',
  },
  {
    date: 'Month 2',
    label: 'Shipped',
    title: 'Canvas review layer',
    desc: 'Visual graph. Inspect every connection before you follow the path.',
    type: 'past',
  },
  {
    date: 'Month 3',
    label: 'Shipped',
    title: 'The Reset + 30+ blog posts',
    desc: 'Building in public. SEO foundation. The knowledge layer starts here.',
    type: 'past',
  },
];

const nowItem: TimelineItem = {
  date: 'Now',
  label: 'Private beta',
  title: 'Waitlist open',
  desc: 'Working with early users. MCP integration in progress.',
  type: 'now',
};

const futureItems: TimelineItem[] = [
  {
    date: 'Next',
    label: 'Coming soon',
    title: 'MCP integration',
    desc: 'Any AI agent can call the synthesis engine directly. RaaS.',
    type: 'future',
  },
  {
    date: 'Q3 2026',
    label: 'Coming soon',
    title: 'More source types',
    desc: 'Video, audio, images, social, API feeds. Any source. Any format.',
    type: 'future',
  },
  {
    date: 'Vision',
    label: 'The long game',
    title: 'Community knowledge paths',
    desc: 'Community-forged, contested, living paths. The next Wikipedia — for understanding.',
    type: 'future',
  },
];

function TimelineRow({
  item,
  setRef,
}: {
  item: TimelineItem;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={setRef} className="relative pl-8 pb-10 last:pb-0">
      {/* Dot — box-shadow creates background ring that separates dot from the line behind it */}
      <div
        className={cn(
          'absolute left-0 top-[5px] size-3.5 rounded-full',
          item.type === 'past' && 'bg-(--muted-foreground)',
          item.type === 'now' && 'bg-(--primary)',
          item.type === 'future' && 'border border-(--border) bg-(--background)',
        )}
        style={{ boxShadow: '0 0 0 3px var(--background)' }}
      >
        {item.type === 'now' && (
          <span className="absolute inset-0 rounded-full bg-(--primary) animate-ping opacity-50" />
        )}
      </div>

      {/* Inner wrapper: future items get opacity-50 so GSAP can animate
          the outer container from 0→1 while future items still land at 50% */}
      <div className={cn(item.type === 'future' && 'opacity-50')}>
        <div className="flex items-baseline gap-2 mb-1.5">
          <span
            className={cn(
              'text-[0.63rem] font-semibold uppercase tracking-[0.14em]',
              item.type === 'now' ? 'text-(--primary)' : 'text-(--muted-foreground)',
            )}
          >
            {item.date}
          </span>
          <span className="text-[0.60rem] uppercase tracking-[0.10em] text-(--muted-foreground)/60">
            {item.label}
          </span>
        </div>

        <h3
          className={cn(
            'text-sm font-medium leading-snug tracking-[-0.01em]',
            item.type === 'future' ? 'text-(--muted-foreground)' : 'text-(--foreground)',
          )}
        >
          {item.title}
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-(--muted-foreground)">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const line = lineRef.current;
      const items = itemRefs.current.filter((el): el is HTMLDivElement => el !== null);
      if (!line || items.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(line, { scaleY: 1, transformOrigin: 'top center' });
        gsap.set(items, { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });
        gsap.set(items, { opacity: 0, y: 20 });

        gsap.to(line, {
          scaleY: 1,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Single animated solid line — scaleY: 0→1 from top */}
      <div
        ref={lineRef}
        className="absolute left-[7px] top-2 bottom-2 w-px bg-(--border)"
      />

      {/* Past + Now items */}
      {[...pastItems, nowItem].map((item, i) => (
        <TimelineRow
          key={item.date}
          item={item}
          setRef={el => {
            itemRefs.current[i] = el;
          }}
        />
      ))}

      {/* Future items — dashed overlay sits on top of the solid line in this section.
          The overlay uses alternating transparent/--background stops to erase the solid
          line in the "gap" segments, creating a native dashed appearance. */}
      <div className="relative">
        <div
          className="absolute left-[7px] top-0 bottom-0 w-px pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent 0px, transparent 5px, var(--background) 5px, var(--background) 11px)',
          }}
        />
        {futureItems.map((item, i) => (
          <TimelineRow
            key={item.date}
            item={item}
            setRef={el => {
              itemRefs.current[pastItems.length + 1 + i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
