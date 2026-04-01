import { ArrowRight, Cpu, GitBranch, LayoutTemplate } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { FloatingCta } from '@/components/marketing/floating-cta';
import { Button } from '@/components/ui/button';

import type { Metadata } from 'next';

import {
  MarketingCtaSection,
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { featurePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

const featureSignals = [
  "You have the sources. You still don't know which one to open first.",
  "Two of your sources disagree. Neither one flags it.",
  "AI answers your questions. It doesn't tell you which question to ask first.",
];

export const metadata: Metadata = buildMetadata({
  title: 'Dependency Mapping That Finds the Structure in Any Source',
  description:
    'SILKLEARN reads across your sources, maps what depends on what, and hands you a dependency-ordered path — one you inspect before you follow.',
  path: '/features',
  keywords: ['SILKLEARN features', 'dependency mapping', 'document learning path', 'knowledge dependency map', 'contradiction detection'],
});

export default function FeaturesPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description="Every source you're learning from — papers, videos, docs, Notion pages, API references, posts — was structured by someone who already knew where to start. They organized it in the order that made sense to them, which is almost never the order that makes sense to you. SILKLEARN synthesizes across heterogeneous sources, maps what depends on what, and surfaces the dependency-ordered path your material never made explicit."
          kicker="Features"
          rightChildren={
            <div className="grid gap-3">
              {featureSignals.map((signal) => (
                <div key={signal} className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm font-medium text-(--foreground)">
                  {signal}
                </div>
              ))}
            </div>
          }
          rightEyebrow="Why it exists"
          rightTitle="Three things every other tool assumes you already know."
          title="Dependency mapping that finds the structure in any source."
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Capabilities
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                The dependency structure is in your sources. You inspect it before you follow it.
              </h2>
            </>
          }
          right={
            <div>
              {featurePages.map((page, index) => {
                const Icon = index === 0 ? GitBranch : index === 1 ? LayoutTemplate : Cpu;
                const label = index === 0 ? 'Structure extraction' : index === 1 ? 'Synthesis canvas' : 'AI integration';

                return (
                  <div key={page.slug} className={index > 0 ? 'border-t border-(--border) pt-6' : ''}>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 max-sm:size-8 items-center justify-center border border-(--border) text-(--primary)">
                        <Icon className="size-4.5" />
                      </div>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                        {label}
                      </p>
                    </div>
                    {page.comingSoon ? (
                      <p className="mt-4 text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)">
                        {page.title}
                        <span className="ml-2 inline-flex items-center rounded-full bg-(--muted) px-2 py-0.5 text-[11px] font-medium tracking-wide text-(--muted-foreground) ring-1 ring-inset ring-(--border)">
                          Coming soon
                        </span>
                      </p>
                    ) : (
                      <TransitionLink className="group mt-4 block" href={`/features/${page.slug}`}>
                        <h3 className="text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground) transition-colors duration-150 group-hover:underline underline-offset-4 decoration-1 decoration-(--border) group-hover:decoration-(--foreground)">
                          {page.title}
                        </h3>
                      </TransitionLink>
                    )}
                    <p className="mt-3 max-w-[56ch] text-sm leading-5 text-(--muted-foreground)">{page.description}</p>
                  </div>
                );
              })}
            </div>
          }
        />

        <section className="grid border-b border-(--border) lg:grid-cols-[1fr_1px_1fr]">
          <div className="p-6 sm:p-8 lg:p-10 lg:flex lg:flex-col lg:justify-center">
            <div className="flex items-center gap-2">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Enterprise
              </p>
              <span className="rounded-full bg-[oklch(from_var(--primary)_l_c_h/0.12)] px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-(--primary)">
                Coming soon
              </span>
            </div>
            <h2 className="mt-4 max-w-[14ch] font-(family-name:--font-display) text-display-md leading-none tracking-[-0.02em] text-(--foreground)">
              Private deployment. Your knowledge stays on your infrastructure.
            </h2>
            <p className="mt-4 max-w-[48ch] text-sm leading-6 text-(--muted-foreground)">
              For organizations where the knowledge is sensitive, large, or deeply integrated. Run SILKLEARN on your own infrastructure — same compilation engine, no external data transfer.
            </p>
          </div>

          <div className="hidden bg-(--border) lg:block" />

          <div className="grid content-start gap-0 divide-y divide-(--border) p-6 sm:p-8 lg:p-10">
            {[
              { label: 'Private cloud deployment', detail: 'On-prem or private VPC. Your compiled knowledge never leaves your infrastructure.' },
              { label: 'SSO & RBAC', detail: 'Single sign-on with your identity provider. Role-based access control across workspaces.' },
              { label: 'Audit logs', detail: 'Full provenance on every compilation, review decision, and published artifact.' },
              { label: 'Volume operation commits', detail: 'Annual contracts with committed operation volumes and negotiated rates.' },
              { label: 'Priority support & onboarding', detail: 'Dedicated support and migration assistance for large knowledge repositories.' },
            ].map((item) => (
              <div key={item.label} className="py-4 first:pt-0 last:pb-0">
                <p className="text-sm font-medium text-(--foreground)">{item.label}</p>
                <p className="mt-1 text-sm text-(--muted-foreground)">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <MarketingCtaSection
          actions={
            <Button asChild size="lg" className="active:scale-[0.97] transition-transform duration-[160ms] ease-out">
              <TransitionLink href="/waitlist">
                Request access
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
          }
          kicker="Next step"
          title="The reading order is already in your sources. Let's find it."
        />
      </MarketingPageFrame>
      <FloatingCta />
    </PageShell>
  );
}