import type { ReactNode } from 'react';

import { ScrollReveal } from '@/components/marketing/scroll-animations';
import { cn } from '@/lib/utils';

type MarketingPageFrameProps = {
  children: ReactNode;
  className?: string;
};

export function MarketingPageFrame({ children, className }: MarketingPageFrameProps) {
  return <div className={cn('border-x border-(--border)', className)}>{children}</div>;
}

type MarketingHeroProps = {
  kicker: string;
  title: string;
  titleAs?: 'h1' | 'h2';
  titleClassName?: string;
  description: string;
  actions?: ReactNode;
  rightEyebrow?: string;
  rightTitle?: string;
  rightChildren: ReactNode;
  className?: string;
};

export function MarketingHero({
  kicker,
  title,
  titleAs: TitleTag = 'h1',
  titleClassName,
  description,
  actions,
  rightEyebrow,
  rightTitle,
  rightChildren,
  className,
}: MarketingHeroProps) {
  return (
    <section className={cn('grid lg:grid-cols-[1fr_1px_1fr]', className)}>
      <ScrollReveal className="px-6 py-14 sm:px-8 lg:px-10 lg:py-20" start="top 95%">
        <div className="max-w-130">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
            {kicker}
          </p>
          <TitleTag className={cn('mt-6 max-w-[11ch] font-(family-name:--font-display) leading-none tracking-[-0.02em] text-(--foreground) max-sm:max-w-none', titleClassName ?? 'text-display-xl max-sm:text-display-lg')}>
            {title}
          </TitleTag>
          <p className="mt-5 max-w-[58ch] text-[1rem] leading-5 text-(--muted-foreground)">
            {description}
          </p>

          {actions ? <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div> : null}
        </div>
      </ScrollReveal>

      <div className="hidden bg-(--border) lg:block" />

      <ScrollReveal className="border-t border-(--border) px-6 py-14 sm:px-8 lg:border-t-0 lg:px-10 lg:py-20" delay={0.15} start="top 95%">
        {rightEyebrow ? (
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
            {rightEyebrow}
          </p>
        ) : null}
        {rightTitle ? (
          <h2 className="mt-4  text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)">
            {rightTitle}
          </h2>
        ) : null}
        <div className={cn((rightEyebrow || rightTitle) && 'mt-6')}>{rightChildren}</div>
      </ScrollReveal>
    </section>
  );
}

type MarketingSplitSectionProps = {
  left: ReactNode;
  right: ReactNode;
  leftClassName?: string;
  rightClassName?: string;
  className?: string;
  stickyLeft?: boolean;
};

export function MarketingSplitSection({
  left,
  right,
  leftClassName,
  rightClassName,
  className,
  stickyLeft = false,
}: MarketingSplitSectionProps) {
  return (
    <section className={cn('grid border-t border-b border-(--border) lg:grid-cols-[1fr_1px_1.3fr]', className)}>
      <ScrollReveal
        className={cn(
          'p-6 sm:p-8 lg:p-10',
          stickyLeft && 'lg:sticky lg:top-28 lg:self-start',
          leftClassName,
        )}
      >
        {left}
      </ScrollReveal>

      <div className="hidden bg-(--border) lg:block" />

      <ScrollReveal className={cn('border-t border-(--border) p-6 sm:p-8 lg:border-t-0 lg:p-10', rightClassName)} delay={0.12}>
        {right}
      </ScrollReveal>
    </section>
  );
}

type MarketingCtaSectionProps = {
  kicker: string;
  title: string;
  description?: string;
  actions: ReactNode;
};

export function MarketingCtaSection({
  kicker,
  title,
  description,
  actions,
}: MarketingCtaSectionProps) {
  return (
    <section className="grid border-t border-(--border) lg:grid-cols-[1fr_1px_auto]">
      <ScrollReveal className="p-6 sm:p-8 lg:p-10">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
          {kicker}
        </p>
        <h2 className="mt-4 max-w-[14ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-[56ch] text-base leading-5 text-(--muted-foreground)">
            {description}
          </p>
        ) : null}
      </ScrollReveal>

      <div className="hidden bg-(--border) lg:block" />

      <ScrollReveal className="border-t border-(--border) p-6 sm:p-8 lg:flex lg:items-center lg:border-t-0 lg:p-10" delay={0.15}>
        {actions}
      </ScrollReveal>
    </section>
  );
}