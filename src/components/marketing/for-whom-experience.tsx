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
    window.location.href = `/for-teams/${id}`;
  };

  const handleTabSelect = (id: string) => {
    setSelectedId(id);
    window.history.replaceState(null, '', `#${id}`);
    window.requestAnimationFrame(() => {
      scrollToSecondaryMenu();
    });
  };

  return (
    <>
      <section className="border-b border-(--border)">
        <div className="grid lg:grid-cols-[1fr_1px_1fr]">
          <div className="px-6 py-14 sm:px-8 lg:px-10 lg:py-41">
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

     
    </>
  );
}