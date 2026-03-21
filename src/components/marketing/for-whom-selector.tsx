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
    <>

      <div className="grid auto-rows-fr gap-px bg-transparent sm:grid-cols-2 py-20">
        {personas.map((persona) => (
          <button
            key={persona.id}
            aria-pressed={selectedId === persona.id}
            className={`grid h-full grid-rows-[1fr_auto] cursor-pointer bg-transparent text-center transition-colors hover:bg-[oklch(from_var(--foreground)_l_c_h/0.03)] ${
              selectedId === persona.id ? 'bg-[oklch(from_var(--foreground)_l_c_h/0.04)]' : ''
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
            <div className="border-t border-(--border) px-4 py-3 text-center">
              <p className="font-(family-name:--font-display) text-[1rem] leading-none tracking-[-0.02em] text-(--foreground)">
                {persona.selector}
              </p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}