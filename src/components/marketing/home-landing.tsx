'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

import { LinkedNodesGraph } from '@/components/marketing/linked-nodes-graph';
import { LottiePlaceholder } from '@/components/marketing/lottie-placeholder';
import { ScrollReveal, StaggerReveal } from '@/components/marketing/scroll-animations';
import { WaitlistForm } from '@/components/waitlist-form';
import { Button } from '@/components/ui/button';
import { type HomePageContent } from '@/lib/site-content';
import { getFaqPageSchema } from '@/lib/structured-data';

gsap.registerPlugin(ScrollTrigger);

const trustMarks = [
  'Engineering onboarding',
  'Platform operations',
  'Support enablement',
  'Compliance handoff',
  'AI context packaging',
  'Internal documentation systems',
];

const operatingModes = [
  {
    title: 'Make prerequisite order obvious before teams make mistakes',
    body: 'Turn architecture docs, onboarding notes, and runbooks into a reviewed sequence so teams stop guessing what comes first.',
    animationSrc: '/silklearn/animations/compile-docs-to-graph.json',
    eyebrow: 'Compile',
    metrics: ['See what must be learned first', 'Keep every step tied to source'],
  },
  {
    title: 'Reuse one compiled graph across onboarding, rollout, and AI',
    body: 'Build one reviewed structure that feeds onboarding, rollout review, and AI context delivery without rebuilding the logic each time.',
    animationSrc: '/silklearn/animations/graph_to_lanes.json',
    eyebrow: 'Consolidate',
    metrics: ['One structure, multiple outputs', 'Leader-approved context bundles'],
  },
];

const actionPanels = [
  {
    step: 'Step 01',
    src: '/silklearn/animations/step-01-document-scan.json',
    title: 'Start with the real document stack, not a rewritten summary',
    summary: 'Document boundaries stay visible so leaders can see what was actually compiled, what remains unresolved, and what still needs human review.',
    rows: [
      'Architecture spec.pdf',
      'Support escalation runbook.docx',
      'Internal onboarding handbook.md',
    ],
    note: 'Source provenance preserved',
  },
  {
    step: 'Step 02',
    src: '/silklearn/animations/step-02.json',
    title: 'Surface the dependency order before a rollout depends on it',
    summary: 'The graph makes hidden prerequisite logic visible before onboarding, handoff, or internal AI depends on it being correct.',
    rows: [
      'Auth model -> Access policy',
      'Access policy -> Incident recovery',
      'Incident recovery -> Escalation workflow',
    ],
    note: 'Cross-document links reviewed',
  },
  {
    step: 'Step 03',
    src: '/silklearn/animations/step-03.json',
    title: 'Ship outputs teams can actually use',
    summary: 'Teams publish onboarding ramps, review queues, and minimum-context bundles from the same compiled structure instead of rebuilding from scratch.',
    rows: [
      'Engineering onboarding path',
      'Support agent context bundle',
      'Leader review queue',
    ],
    note: 'Outputs stay reviewable',
  },
];

type StageJourneyStage = {
  label: string;
  title: string;
  description: string;
  point: {
    x: number;
    y: number;
  };
  connector: {
    x: number;
    y: number;
  };
  card: {
    x: number;
    y: number;
  };
};

const stageJourney: StageJourneyStage[] = [
  {
    label: 'Stage A',
    title: 'Compile the source stack',
    description: 'Turn dense internal documents into a starting map teams can understand before they improvise.',
    point: { x: -100, y: 305 },
    connector: { x: -100, y: 400 },
    card: { x: 124, y: 300 },
  },
  {
    label: 'Stage B',
    title: 'Expose hidden prerequisite order',
    description: 'Make dependency logic visible before onboarding, rollout, or a cross-team handoff depends on it.',
    point: { x: 180, y: 168 },
    connector: { x: 180, y: 263 },
    card: { x: 404, y: 163 },
  },
  {
    label: 'Stage C',
    title: 'Reuse the graph across teams',
    description: 'Feed onboarding, operational review, and internal AI context from one reviewed structure.',
    point: { x: 460, y: 107 },
    connector: { x: 460, y: 202 },
    card: { x: 684, y: 102 },
  },
  {
    label: 'Stage D',
    title: 'Standardize transfer without losing review',
    description: 'Keep outputs consistent, traceable, and leader-reviewable as more teams reuse the same logic.',
    point: { x: 740, y: 85 },
    connector: { x: 740, y: 180 },
    card: { x: 964, y: 80 },
  },
];

const stageJourneyCurvePath = 'M -210 407 C 98 36 819 89 1100 75';
const stageJourneyDefaultViewportWidth = 1188;
const stageJourneyDefaultOffsetX = (stageJourneyDefaultViewportWidth - 960) / 2;
const stageJourneyCardOffsetX = -64;
const stageJourneyViewBox = {
  width: 960,
  height: 460,
};

type HomeLandingProps = {
  content: HomePageContent;
  isSanityConfigured: boolean;
};

function StageJourneyCurve() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cardLayout, setCardLayout] = useState({
    scale: 1,
    offsetX: stageJourneyDefaultOffsetX,
    offsetY: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateCardScale = () => {
      const width = section.clientWidth;
      const height = section.clientHeight;
      if (!width || !height) return;

      const scale = Math.min(width / stageJourneyViewBox.width, height / stageJourneyViewBox.height, 1);
      const renderedWidth = stageJourneyViewBox.width * scale;
      const renderedHeight = stageJourneyViewBox.height * scale;

      setCardLayout({
        scale,
        offsetX: (width - renderedWidth) / 2,
        offsetY: (height - renderedHeight) / 2,
      });
    };

    updateCardScale();

    const resizeObserver = new ResizeObserver(() => {
      updateCardScale();
    });

    resizeObserver.observe(section);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const drawPaths = Array.from(section.querySelectorAll<SVGPathElement>('[data-stage-draw-path]'));
    const dots = Array.from(section.querySelectorAll<SVGGElement>('[data-stage-dot]'));
    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-stage-card]'));

    if (drawPaths.length === 0) return;

    const context = gsap.context(() => {
      drawPaths.forEach((path) => {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: reduceMotion ? 0 : length,
        });
      });

      gsap.set(dots, {
        opacity: reduceMotion ? 1 : 0,
        scale: reduceMotion ? 1 : 0.7,
        transformOrigin: 'center center',
      });

      gsap.set(cards, {
        opacity: reduceMotion ? 1 : 0,
        x: reduceMotion ? 0 : -24,
        y: reduceMotion ? 0 : 14,
        filter: reduceMotion ? 'blur(0px)' : 'blur(8px)',
      });

      if (reduceMotion) {
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
          toggleActions: 'play none none none',
        },
      });

      timeline.to(drawPaths[0], {
        duration: 1.2,
        strokeDashoffset: 0,
      });

      stageJourney.forEach((_, index) => {
        const connector = drawPaths[index + 1];
        const dot = dots[index];
        const card = cards[index];

        timeline.to(connector, {
          duration: 0.22,
          strokeDashoffset: 0,
        }, index === 0 ? '-=0.62' : '-=0.02');

        timeline.to(dot, {
          duration: 0.24,
          opacity: 1,
          scale: 1,
          ease: 'back.out(1.8)',
        }, '<');

        timeline.to(card, {
          duration: 0.42,
          opacity: 1,
          x: 0,
          y: 0,
          filter: 'blur(0px)',
        }, '<');
      });
    });

    return () => {
      context.revert();
    };
  }, []);

  return (
    <>
      <div className="mt-10 grid gap-4 lg:hidden">
        {stageJourney.map((stage) => (
          <div key={stage.label} className="border border-(--border) p-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">{stage.label}</p>
            <h3 className="mt-3 text-base font-medium leading-5 text-(--foreground)">{stage.title}</h3>
            <p className="mt-2 text-sm leading-5 text-(--muted-foreground)">{stage.description}</p>
          </div>
        ))}
      </div>

      <div ref={sectionRef} className="mt-10 hidden lg:block">
        <div className="relative h-[460px] overflow-hidden">
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            fill="none"
            viewBox={`0 0 ${stageJourneyViewBox.width} ${stageJourneyViewBox.height}`}
          >
            <defs>
              <linearGradient id="stage-journey-curve-gradient" x1="0" x2={stageJourneyViewBox.width} y1="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
                <stop offset="75%" stopColor="var(--primary)" stopOpacity="1" />
                <stop offset="90%" stopColor="var(--primary)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={stageJourneyCurvePath}
              data-stage-draw-path
              stroke="url(#stage-journey-curve-gradient)"
              strokeLinecap="round"
              strokeWidth="2.5"
            />

            {stageJourney.map((stage) => (
              <Fragment key={stage.label}>
                <path
                  d={`M ${stage.point.x} ${stage.point.y} L ${stage.connector.x} ${stage.connector.y}`}
                  data-stage-draw-path
                  stroke="var(--primary)"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
                <g data-stage-dot transform={`translate(${stage.point.x} ${stage.point.y})`}>
                  <circle fill="var(--background)" opacity="0.96" r="11" stroke="var(--primary)" strokeWidth="1.5" />
                  <circle fill="var(--primary)" r="4" />
                </g>
              </Fragment>
            ))}
          </svg>

          {stageJourney.map((stage) => (
            <article
              key={stage.label}
              data-stage-card
              className="absolute w-[224px] p-4"
              style={{
                left: `${cardLayout.offsetX + (stage.card.x - stageJourneyDefaultOffsetX + stageJourneyCardOffsetX) * cardLayout.scale}px`,
                top: `${cardLayout.offsetY + stage.card.y * cardLayout.scale}px`,
                transform: `scale(${cardLayout.scale})`,
                transformOrigin: 'top left',
              }}
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">{stage.label}</p>
              <h3 className="mt-3 text-[1.02rem] font-medium leading-5 text-(--foreground)">{stage.title}</h3>
              <p className="mt-2 text-sm leading-5 text-(--muted-foreground)">{stage.description}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export function HomeLanding({ content, isSanityConfigured }: HomeLandingProps) {
  const [activeActionPanel, setActiveActionPanel] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const actionPanelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const updateActiveActionPanel = () => {
      const viewportCenter = window.innerHeight * 0.45;
      let nextActivePanel = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      actionPanelRefs.current.forEach((panel, index) => {
        if (!panel) return;

        const rect = panel.getBoundingClientRect();
        const panelCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(panelCenter - viewportCenter);

        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          nextActivePanel = index;
        }
      });

      setActiveActionPanel((currentActivePanel) => (
        currentActivePanel === nextActivePanel ? currentActivePanel : nextActivePanel
      ));
    };

    updateActiveActionPanel();
    window.addEventListener('scroll', updateActiveActionPanel, { passive: true });
    window.addEventListener('resize', updateActiveActionPanel);

    return () => {
      window.removeEventListener('scroll', updateActiveActionPanel);
      window.removeEventListener('resize', updateActiveActionPanel);
    };
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFaqPageSchema(content.faq)),
        }}
        type="application/ld+json"
      />

      {/* Outer rails — border-left + border-right form the two continuous vertical lines */}
      <div className="border-x border-(--border)  ">

        <div className="grid lg:grid-cols-[1fr_1px_1fr] ">
          <div className="px-6 py-10 sm:px-8 lg:px-10 lg:py-50">
            <div className="max-w-125">

              <h1 className=" font-(family-name:--font-display) text-[clamp(2.4rem,3vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                {content.headline}
              </h1>

              <div className="mt-2 max-w-[56ch] text-[1.02rem] leading-7 text-(--muted-foreground)">
                {content.subheadline}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" >
                  <a href={content.primaryCtaHref}>
                    {content.primaryCtaLabel}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={content.secondaryCtaHref}>{content.secondaryCtaLabel}</a>
                </Button>
              </div>

              
            </div>
          </div>

          {/* Structural vertical divider — a real 1px column, not an absolute div */}
          <div className="hidden bg-(--border) lg:block" />

          <div className="hidden border-t border-(--border) sm:block lg:flex lg:items-end lg:border-t-0">
            <LinkedNodesGraph />
          </div>
        </div>



        {/* ── SOLUTIONS ── centered header then 2-col grid */}
        <div className="border-t border-(--border) px-6 py-12 sm:px-8 lg:px-10 lg:pt-50 lg:pb-30">
          <ScrollReveal className="mx-auto max-w-140 text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">SILKLEARN solutions</p>
            <h2 className="mt-4 font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Two ways teams use SILKLEARN to reduce guesswork.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid  lg:grid-cols-[1fr_1px_1fr]">
          {operatingModes.map((mode, i) => {
            return (
              <Fragment key={mode.title}>
                {i > 0 && <div className="bg-(--border) max-lg:h-px" />}
                <ScrollReveal className="flex h-full flex-col p-6 sm:p-8 lg:p-10">
                  <div>
                    <h3 className="text-[1.5rem] leading-tight tracking-[-0.02em] text-(--foreground)">{mode.eyebrow}</h3>
                    <p className="mt-3 max-w-[48ch] text-sm leading-5 text-(--muted-foreground)">
                      {mode.title}. {mode.body}
                    </p>
                  </div>

                  <LottiePlaceholder
                    animationSrc={mode.animationSrc}
                    className="mt-auto pt-8"
                    description={mode.eyebrow === 'Compile'
                      ? 'Animated diagram: raw document pages (PDF, MD, DOCX) feed into a funnel that outputs a structured dependency graph with nodes and directed edges. Nodes light up in sequence to show prerequisite order being discovered.'
                      : 'Animated diagram: a single compiled graph branches into three output lanes — an onboarding path, a review queue, and an AI context bundle. Each lane pulses to show reuse from one source structure.'}
                    height="h-48"
                    label={`Lottie · ${mode.eyebrow}`}
                  />

                </ScrollReveal>
              </Fragment>
            );
          })}
        </div>

        {/* ── IN ACTION ── left rail + stacked cards, Rollups pattern */}
        <div className="grid border-t border-(--border) lg:grid-cols-[1fr_1px_2fr] pt-50">
          <ScrollReveal className="hidden p-6 sm:p-8 lg:block lg:py-48 lg:sticky lg:top-28 lg:self-start">
            

            <div className="mt-8">
              {actionPanels.map((panel, index) => (
                <div
                  key={panel.step}
                  className={`flex items-start gap-3 border-t border-(--border) border-l-2 py-3 pl-4 text-sm leading-5 transition-[background-color,border-color,color,opacity] duration-200 first:border-t-0 ${activeActionPanel === index ? 'border-l-(--primary) bg-[oklch(from_var(--primary)_l_c_h/0.08)] text-(--foreground)' : 'border-l-transparent text-(--muted-foreground) opacity-65'}`}
                >
                  <span className={`mt-0.5 w-4 shrink-0 text-sm font-semibold transition-colors duration-200 ${activeActionPanel === index ? 'text-(--primary)' : 'text-(--muted-foreground)'}`}>
                    {index + 1}
                  </span>
                  <span className={activeActionPanel === index ? 'font-medium' : ''}>{panel.note}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
            
          {/* Structural divider between left rail and cards */}
          <div className="hidden  lg:block" />
            
            <div>
              <div className="border-b border-(--border) px-6 pt-6 pb-20 sm:px-8 sm:pt-8 lg:px-10">
                <h2 className="text-[2.5rem] leading-tight tracking-[-0.02em] text-(--foreground)">
                  Silklearn in action
                </h2>
                <p className="mt-3 max-w-[42ch] text-sm leading-5 text-(--muted-foreground)">
                  Three common situations in which companies use SILKLEARN. Don&apos;t see your use case? There are many more. Contact us.
                </p>
              </div>
              <div className='border-l border-t border-(--border)'>
                {actionPanels.map((panel, i) => (
                  <div
                    key={panel.step}
                    ref={(element) => {
                      actionPanelRefs.current[i] = element;
                    }}
                  >
                    <div className={`grid lg:grid-cols-[1.3fr_1px_1fr]${i > 0 ? ' border-t border-(--border)' : ''}`}>
                      {/* Illustration / data side */}
                      <div className="flex items-center p-6 sm:p-8 lg:p-10">
                      
                          <LottiePlaceholder
                            animationSrc={panel.src}
                            animationClassName="h-full w-full max-h-full max-w-full"
                            className="w-full"
                            description={panel.step === 'Step 01'
                              ? 'Animated stack of documents fanning out with file-type badges, then being drawn into a scanning beam that highlights headings and structure.'
                              : panel.step === 'Step 02'
                                ? 'Animated dependency graph building itself: nodes appear one by one, then directed edges draw between them showing prerequisite order. Cross-document links highlight in a different color.'
                                : 'Animated split view: a compiled graph on the left emits three output artifacts to the right — a learning path, a review checklist, and a context bundle — each sliding into place.'}
                            height="h-44 sm:h-48"
                            label={`Lottie · ${panel.step}`}
                          />
                          
                      </div>

                      {/* Structural divider */}
                      <div className="hidden bg-(--border) lg:block" />

                      {/* Text side */}
                      <div className="border-t border-(--border) p-6 sm:p-8 lg:border-t-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">{panel.step}</p>
                        <h3 className="mt-4 max-w-[16ch] text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)">{panel.title}</h3>
                        <p className="mt-4 text-sm leading-5 text-(--muted-foreground)">{panel.summary}</p>
                        <a className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-(--foreground)" href="#waitlist">
                          Learn more
                          <ArrowRight className="size-4" />
                        </a>
                      </div>
                    </div>
                    
                    {i < 2 && (
                      <div key={panel.step + 10} className="grid border-t border-(--border) lg:grid-cols-[1.3fr_1px_1fr] lg:py-15">
                      </div>
                    )}
                  </div>
                
                ))}
              </div>
            </div>
        </div>

        {/* ── STAGES ── left text block + right sidebar, Rollups "Used by companies" */}
        <div className="grid border-t border-(--border) ">
          <div className="p-6 sm:p-8 lg:p-10 lg:pt-50 lg:mb-35">
            <ScrollReveal>
            <h2 className=" font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Built for teams where missing context creates expensive mistakes.
            </h2>
            </ScrollReveal>

            <StageJourneyCurve />
          </div>
          <div className='flex justify-end relative '>
            <ScrollReveal className=" p-6 sm:p-8 lg:absolute lg:z-10 lg:-mt-20 lg:ml-0 lg:max-w-[23rem]  lg:p-10 lg:-top-70">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Why this works</p>
              <h3 className="mt-4 max-w-[16ch] text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)">
                When order is visible, teams ramp faster and handoffs break less often.
              </h3>
              <p className="mt-4 text-sm leading-5 text-(--muted-foreground)">
                Teams can only reuse internal knowledge safely when the order, provenance, and downstream implications are visible before rollout, onboarding, or AI delivery.
              </p>

              <div className="mt-6">
                <Button asChild size="lg">
                  <a href="#waitlist">
                    Request early access
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>

        </div>


          
        {/* ── CORE PILLARS ── */}
        <div className="grid border-t border-(--border) lg:grid-cols-[1fr_1px_1.3fr]">
          <ScrollReveal className="p-6 sm:p-8 lg:p-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Core pillars</p>
            <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Structure is the product. Everything else is downstream.
            </h2>
          </ScrollReveal>

          <div className="hidden bg-(--border) lg:block" />

          <StaggerReveal stagger={0.1}>
            {content.pillars.map((pillar, i) => (
              <div key={pillar.title} className={`grid gap-4 p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:p-8${i > 0 ? ' border-t border-(--border)' : ''}`}>
                <div className="flex size-11 items-center justify-center rounded-xl border border-[oklch(from_var(--primary)_l_c_h/0.14)] bg-(--card) text-(--primary)">
                  <CheckCircle2 className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-[1.05rem] leading-tight text-(--foreground)">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-5 text-(--muted-foreground)">{pillar.description}</p>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>

        <div className="grid border-t border-(--border) ">
          <ScrollReveal className="p-6 sm:p-8 lg:p-10 lg:pt-50">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Common questions</p>
            <h2 className="mt-4  font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Core questions, answered directly.
            </h2>
          </ScrollReveal>
        </div>
        {/* ── FAQ ── */}
        <div className="grid  lg:grid-cols-[0.3fr_1fr] lg:pt-20 lg:pb-30">
          <div></div>


          <StaggerReveal stagger={0.1}>
            {content.faq.map((item, i) => (
              <div key={item.question} className={`px-6 py-6 sm:px-8${i > 0 ? ' border-t border-(--border)' : ''}`}>
                <button
                  aria-controls={`faq-panel-${i}`}
                  aria-expanded={openFaqIndex === i}
                  className="group flex w-full items-start justify-between gap-4 text-left transition-colors duration-200"
                  onClick={() => setOpenFaqIndex((currentIndex) => (currentIndex === i ? null : i))}
                  type="button"
                >
                  <h3 className="text-base font-semibold text-(--foreground) transition-colors duration-200 group-hover:text-(--primary)">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`mt-0.5 size-4 shrink-0 text-(--muted-foreground) transition-[transform,color] duration-300 ${openFaqIndex === i ? 'rotate-180 text-(--foreground)' : ''}`}
                  />
                </button>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${openFaqIndex === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  id={`faq-panel-${i}`}
                >
                  <div
                    className={`overflow-hidden pr-8 transition-[opacity,transform,padding] duration-300 ease-out ${openFaqIndex === i ? 'pt-3 opacity-100 translate-y-0' : 'pt-0 opacity-0 -translate-y-1'}`}
                  >
                    <p className="text-sm leading-5 text-(--muted-foreground)">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>

        {/* ── WAITLIST ── */}
        <div className="grid border-t border-(--border) lg:grid-cols-[1fr_1px_1fr]" id="waitlist">
          <ScrollReveal className="grid content-start gap-2 px-8 py-15 ">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Early access</p>
            <h2 className="max-w-[12ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              See whether your document stack is a fit for early access.
            </h2>
            <p className="max-w-[56ch] text-base leading-5 text-(--muted-foreground)">
              Early access is for leaders using private docs for onboarding, operational handoffs, compliance review, or internal AI context. If missing dependency order is slowing the team down, this is what the beta is built for.
            </p>

           
          </ScrollReveal>

          <div className="hidden bg-(--border) lg:block" />

          <ScrollReveal className="border-t border-(--border) px-8 py-15 lg:border-t-0 ">
            <WaitlistForm />
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}