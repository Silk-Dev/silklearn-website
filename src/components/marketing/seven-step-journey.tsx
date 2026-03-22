import { Fragment, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 7-step journey data (adjust content and coordinates as needed)
const stageJourney = [
  {
    label: 'Step 1',
    title: 'Start',
    description: 'This is the beginning of the journey.',
    point: { x: -100, y: 350 },
    connector: { x: -100, y: 420 },
    card: { x: 60, y: 340 },
  },
  {
    label: 'Step 2',
    title: 'Second Step',
    description: 'Continue to the next phase.',
    point: { x: 100, y: 250 },
    connector: { x: 100, y: 320 },
    card: { x: 220, y: 240 },
  },
  {
    label: 'Step 3',
    title: 'Third Step',
    description: 'Progressing further.',
    point: { x: 250, y: 180 },
    connector: { x: 250, y: 250 },
    card: { x: 370, y: 170 },
  },
  {
    label: 'Step 4',
    title: 'Fourth Step',
    description: 'Halfway through.',
    point: { x: 400, y: 140 },
    connector: { x: 400, y: 210 },
    card: { x: 520, y: 130 },
  },
  {
    label: 'Step 5',
    title: 'Fifth Step',
    description: 'Getting closer.',
    point: { x: 550, y: 120 },
    connector: { x: 550, y: 190 },
    card: { x: 670, y: 110 },
  },
  {
    label: 'Step 6',
    title: 'Sixth Step',
    description: 'Almost there.',
    point: { x: 700, y: 110 },
    connector: { x: 700, y: 180 },
    card: { x: 820, y: 100 },
  },
  {
    label: 'Step 7',
    title: 'Finish',
    description: 'Journey complete.',
    point: { x: 850, y: 100 },
    connector: { x: 850, y: 170 },
    card: { x: 970, y: 90 },
  },
];

const stageJourneyCurvePath = 'M -210 420 C 100 50 800 120 1100 100';
const stageJourneyViewBox = { width: 960, height: 480 };
const stageJourneyDefaultOffsetX = 0;
const stageJourneyCardOffsetX = 0;

export function SevenStepJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cardLayout, setCardLayout] = useState({ scale: 1, offsetX: 0, offsetY: 0 });

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
    const resizeObserver = new ResizeObserver(updateCardScale);
    resizeObserver.observe(section);
    return () => resizeObserver.disconnect();
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
      if (reduceMotion) return;
      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
          toggleActions: 'play none none none',
        },
      });
      timeline.to(drawPaths[0], { duration: 1.2, strokeDashoffset: 0 });
      stageJourney.forEach((_, index) => {
        const connector = drawPaths[index + 1];
        const dot = dots[index];
        const card = cards[index];
        timeline.to(connector, { duration: 0.22, strokeDashoffset: 0 }, index === 0 ? '-=0.62' : '-=0.02');
        timeline.to(dot, { duration: 0.24, opacity: 1, scale: 1, ease: 'back.out(1.8)' }, '<');
        timeline.to(card, { duration: 0.42, opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }, '<');
      });
    });
    return () => context.revert();
  }, []);

  return (
    <div ref={sectionRef} className="mt-10 w-full">
      <div className="relative h-[480px] overflow-hidden">
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
            className="absolute w-[180px] p-4"
            style={{
              left: `${cardLayout.offsetX + (stage.card.x - stageJourneyDefaultOffsetX + stageJourneyCardOffsetX) * cardLayout.scale}px`,
              top: `${cardLayout.offsetY + stage.card.y * cardLayout.scale}px`,
              transform: `scale(${cardLayout.scale})`,
              transformOrigin: 'top left',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-(--muted-foreground)">{stage.label}</p>
            <h3 className="mt-2 text-base font-medium text-(--foreground)">{stage.title}</h3>
            <p className="mt-1 text-sm text-(--muted-foreground)">{stage.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
