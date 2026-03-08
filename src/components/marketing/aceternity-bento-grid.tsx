import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type BentoItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  eyebrow?: string;
  bullets?: string[];
  className?: string;
  dark?: boolean;
};

type AceternityBentoGridProps = {
  items: BentoItem[];
  className?: string;
};

export function AceternityBentoGrid({ items, className }: AceternityBentoGridProps) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-6', className)}>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={cn(
              'group relative overflow-hidden rounded-[28px] border p-6 transition duration-300',
              item.dark
                ? 'border-[rgba(31,63,122,0.16)] bg-[linear-gradient(180deg,#162f58_0%,#1f447e_100%)] text-white shadow-[0_24px_90px_rgba(15,23,42,0.14)]'
                : 'border-[rgba(10,25,49,0.08)] bg-white text-(--foreground) shadow-[0_16px_60px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:shadow-[0_24px_80px_rgba(15,23,42,0.08)]',
              item.className,
            )}
          >
            <div
              className={cn(
                'pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100',
                item.dark
                  ? 'bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_48%)]'
                  : 'bg-[radial-gradient(circle_at_top_left,rgba(31,63,122,0.14),transparent_48%)]',
              )}
            />
            <div
              className={cn(
                'pointer-events-none absolute inset-0 opacity-60',
                item.dark
                  ? 'bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]'
                  : 'bg-[linear-gradient(rgba(16,26,45,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,26,45,0.03)_1px,transparent_1px)] bg-[size:32px_32px]',
              )}
            />

            <div className="relative flex h-full flex-col">
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-2xl border',
                  item.dark
                    ? 'border-white/12 bg-white/10 text-white'
                    : 'border-[rgba(10,25,49,0.08)] bg-[rgba(31,63,122,0.08)] text-(--primary)',
                )}
              >
                <Icon className="size-5" />
              </div>

              {item.eyebrow ? (
                <p
                  className={cn(
                    'mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em]',
                    item.dark ? 'text-[rgba(255,255,255,0.56)]' : 'text-(--primary)',
                  )}
                >
                  {item.eyebrow}
                </p>
              ) : null}

              <h3 className="mt-3 text-[1.2rem] font-semibold leading-tight tracking-[-0.03em]">{item.title}</h3>
              <p
                className={cn(
                  'mt-3 text-sm leading-6',
                  item.dark ? 'text-[rgba(255,255,255,0.76)]' : 'text-(--muted-foreground)',
                )}
              >
                {item.description}
              </p>

              {item.bullets?.length ? (
                <div className="mt-6 grid gap-2">
                  {item.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className={cn(
                        'rounded-[18px] border px-3 py-2 text-sm leading-6',
                        item.dark
                          ? 'border-white/10 bg-white/8 text-white'
                          : 'border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] text-(--foreground)',
                      )}
                    >
                      {bullet}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}