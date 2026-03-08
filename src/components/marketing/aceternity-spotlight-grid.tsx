import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type SpotlightItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type AceternitySpotlightGridProps = {
  items: SpotlightItem[];
  className?: string;
};

export function AceternitySpotlightGrid({ items, className }: AceternitySpotlightGridProps) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2 xl:grid-cols-3', className)}>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-[24px] border border-[rgba(10,25,49,0.08)] bg-white p-6 shadow-[0_14px_50px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
          >
            <div className="pointer-events-none absolute -top-18 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[rgba(31,63,122,0.16)] blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,26,45,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,26,45,0.03)_1px,transparent_1px)] bg-[size:28px_28px] opacity-50" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(10,25,49,0.08)] bg-[rgba(31,63,122,0.08)] text-(--primary)">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-[1.1rem] font-semibold leading-tight tracking-[-0.03em] text-(--foreground)">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-(--muted-foreground)">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}