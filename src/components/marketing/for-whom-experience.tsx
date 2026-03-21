'use client';

import { useRef, useState } from 'react';

import { ForWhomSelector } from '@/components/marketing/for-whom-selector';
import { MarketingSplitSection } from '@/components/marketing/page-structure';
import { LottiePlaceholder } from './lottie-placeholder';

type PersonaOutcome = {
  label: string;
  value: string;
};

type ForWhomPersona = {
  id: string;
  selector: string;
  eyebrow: string;
  title: string;
  animationSrc: string;
  problem: string;
  solution: string;
  outcomes: readonly PersonaOutcome[];
};

type ForWhomExperienceProps = {
  personas: readonly ForWhomPersona[];
};

export function ForWhomExperience({ personas }: ForWhomExperienceProps) {
  const [selectedId, setSelectedId] = useState<string | null>(personas[0]?.id ?? null);
  const secondaryMenuRef = useRef<HTMLDivElement | null>(null);

  const selectedPersona = personas.find((persona) => persona.id === selectedId) ?? null;

  const scrollToSecondaryMenu = () => {
    const target = secondaryMenuRef.current;

    if (!target) {
      return;
    }


    // Decrease offset so the secondary menu appears a bit higher (closer to the top)
    const headerOffset = window.innerWidth >= 640 ? 110 : 60;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
  };

  const handleTopSelect = (id: string) => {
    setSelectedId(id);
    window.history.replaceState(null, '', `#${id}`);

    window.requestAnimationFrame(() => {
      scrollToSecondaryMenu();
    });
  };

  const handleTabSelect = (id: string) => {
    setSelectedId(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      <section className="border-b border-(--border)">
        <div className="grid lg:grid-cols-[1fr_1px_1fr]">
          <div className="px-6 py-14 sm:px-8 lg:px-10 lg:py-38">
            <div className="max-w-150">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                For whom
              </p>
              <h1 className="mt-6 max-w-[14ch] font-(family-name:--font-display) text-[clamp(2.35rem,3.2vw,3.7rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                Built for teams where missing context creates expensive mistakes.
              </h1>
              <p className="mt-5 max-w-[58ch] text-[1.03rem] leading-7 text-(--muted-foreground)">
                Choose your team. See the reviewed path SILKLEARN builds from your docs.
              </p>
            </div>
          </div>

          <div className="hidden bg-(--border) lg:block" />

          <div>
            <ForWhomSelector personas={personas} selectedId={selectedId} onSelect={handleTopSelect} />
          </div>
        </div>
      </section>

      <section
        ref={secondaryMenuRef}
        className="scroll-mt-34 border-b border-(--border) sm:scroll-mt-38"
      >
        <div className="">
          <div className="flex w-full overflow-x-auto">
            {personas.map((persona) => {
              const isActive = persona.id === selectedId;

                return (
                  <button
                    key={persona.id}
                    aria-pressed={isActive}
                    className={`flex-1 flex flex-row items-center justify-center gap-3 border-r border-(--border) px-4 py-4 text-base font-medium transition-colors last:border-r-0 cursor-pointer ${
                      isActive
                        ? 'bg-[oklch(from_var(--foreground)_l_c_h/0.05)] text-(--foreground)'
                        : 'text-(--muted-foreground) hover:bg-[oklch(from_var(--foreground)_l_c_h/0.03)] hover:text-(--foreground)'
                    }`}
                    onClick={() => handleTabSelect(persona.id)}
                    type="button"
                  >
                  <span className="flex items-center justify-center">
                    <LottiePlaceholder
                      animationSrc={persona.animationSrc}
                      animationClassName="h-14 w-14 max-h-14 max-w-14"
                      className="flex items-center justify-center"
                      description={`${persona.selector} workflow animation`}
                      height="h-14"
                      label={persona.selector}
                    />
                  </span>
                  <span className="flex items-center justify-center h-full text-base sm:text-lg font-medium">{persona.selector}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {selectedPersona ? (
        <MarketingSplitSection
          className="border-t-0 py-20"
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                {selectedPersona.eyebrow}
              </p>
              <h2 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                {selectedPersona.title}
              </h2>
            </>
          }
          right={
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Problem
              </p>
              <p className="mt-4 max-w-[60ch] text-sm leading-6 text-(--foreground)">{selectedPersona.problem}</p>

              <p className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                What SILKLEARN does for you
              </p>
              <p className="mt-4 max-w-[60ch] text-sm leading-6 text-(--foreground)">{selectedPersona.solution}</p>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {selectedPersona.outcomes.map((outcome) => (
                  <div key={outcome.label} className="border border-(--border) px-4 py-4">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      {outcome.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-(--foreground)">{outcome.value}</p>
                  </div>
                ))}
              </div>
            </div>
          }
        />
      ) : null}
    </>
  );
}