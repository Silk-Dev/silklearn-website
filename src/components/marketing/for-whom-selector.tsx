'use client';

import { LottiePlaceholder } from '@/components/marketing/lottie-placeholder';

type PersonaSelectorItem = {
  id: string;
  selector: string;
  animationSrc: string;
};

type ForWhomSelectorProps = {
  personas: readonly PersonaSelectorItem[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
};

export function ForWhomSelector({ personas, selectedId = null, onSelect }: ForWhomSelectorProps) {
  const handleSelect = (id: string) => {
    if (onSelect) {
      onSelect(id);
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-0 bg-transparent h-full w-full">
      {personas.map((persona) => (
        <button
          key={persona.id}
          aria-pressed={selectedId === persona.id}
          className={`grid h-full w-full grid-rows-[1fr_auto] cursor-pointer border border-(--border)  text-center shadow-sm transition-all duration-150 hover:shadow-md hover:border-(--primary) hover:bg-[oklch(0.95_0.01_247.84)] dark:hover:bg-[oklch(0.2686_0_0)] ${
            selectedId === persona.id ? 'border-(--border)  shadow-md' : ''
          }`}
          onClick={() => handleSelect(persona.id)}
          type="button"
        >
          <LottiePlaceholder
            animationSrc={persona.animationSrc}
            animationClassName="h-full w-full max-h-full max-w-full"
            className="mx-auto flex h-full w-full max-w-[15rem] items-center justify-center px-4 py-4"
            description={`${persona.selector} workflow animation`}
            height="h-40 sm:h-44"
            label={persona.selector}
          />
          <div className="px-4 py-5 text-center">
            <p className="font-(family-name:--font-display) text-[1.2rem] leading-none tracking-[-0.02em] text-(--foreground)">
              {persona.selector}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}