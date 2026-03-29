import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  Eye,
  FileStack,
  GitFork,
  History,
  Link2,
  ListChecks,
  Plug,
  RefreshCw,
  Route,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { ProductHeroGraph } from '../../components/marketing/product-hero-graph';
import { ProductScrollSections } from '../../components/marketing/product-scroll-sections';

import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';

type ProductSummaryItem = {
  label: string;
  title: string;
  copy: string;
  detail?: string;
  icon: LucideIcon;
};

const productSummary: ProductSummaryItem[] = [
  {
    label: 'Output 1',
    title: 'Learning path',
    copy:
      'A prerequisite-ordered sequence your engineers follow from day one. Not a pile of docs - an actual order.',
    icon: Route,
  },
  {
    label: 'Output 2',
    title: 'Rollout checklist',
    copy:
      'Steps in dependency order. Teams see what must be done first - before a handoff depends on it.',
    icon: ListChecks,
  },
  {
    label: 'Output 3',
    title: 'Compliance review queue',
    copy:
      'Flagged items with source links, reviewer names, and timestamps. Ready to export for an audit.',
    icon: ShieldCheck,
  },
  {
    label: 'Output 4',
    title: 'AI context bundle',
    copy:
      'Structured context for your internal AI assistant - in the right order, from reviewed source. Not a retrieval guess.',
    icon: BrainCircuit,
  },
];

const productFeatureCards = [
  {
    label: '01',
    title: 'Works with your existing docs',
    copy: 'PDF, MD, DOCX, Notion, Confluence. No reformatting.',
    icon: FileStack,
  },
  {
    label: '02',
    title: 'Finds the order your docs already imply',
    copy: "Extracts the prerequisite structure. Doesn't invent it.",
    icon: GitFork,
  },
  {
    label: '03',
    title: 'Leaders review before anything ships',
    copy: 'Visual graph. Accept, reject, or flag every connection.',
    icon: Eye,
  },
  {
    label: '04',
    title: 'Audit trail built automatically',
    copy: 'Timestamps and reviewer names logged as you review.',
    icon: History,
  },
  {
    label: '05',
    title: 'Surfaces contradictions between docs',
    copy: 'When two docs disagree, a conflict flag appears. You decide.',
    icon: AlertTriangle,
  },
  {
    label: '06',
    title: 'Every output linked to source',
    copy: 'Every item traces back to the exact doc section it came from.',
    icon: Link2,
  },
  {
    label: '07',
    title: 'Integrations',
    copy: 'Notion · Confluence · Drive · GitHub · Slack · API (beta)',
    icon: Plug,
  },
  {
    label: '08',
    title: 'Update and re-publish',
    copy: 'Docs change? Re-compile, review the delta, republish. Done.',
    icon: RefreshCw,
  },
] as const;

export const metadata: Metadata = buildMetadata({
  title: 'Knowledge Compilation Platform',
  description:
    'Go deeper on how SILKLEARN compiles document stacks into reviewable graphs, approval workflows, and reusable outputs for onboarding, rollout, AI, and compliance.',
  path: '/product',
  keywords: [
    'knowledge compilation infrastructure',
    'docs to learning paths',
    'reviewable context bundles',
  ],
});

export default function ProductPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <section className="border-b border-(--border)">
          <div className="grid lg:grid-cols-[1fr_1px_1fr]">
            <div className="px-6  sm:px-8 lg:px-10 lg:py-30">
              <div className="max-w-165">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                  THE PRODUCT
                </p>
                <h1 className="mt-6 max-w-[15ch] font-(family-name:--font-display) text-[clamp(2.35rem,3.2vw,3.7rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                  Your docs, organized into a path your team can actually follow.
                </h1>
                <p className="mt-5 max-w-[50ch] text-[1.03rem] leading-7 text-(--muted-foreground)">
                  Not a course builder. Not a RAG pipeline. SILKLEARN reads what you already have and turns it into a structured, leader-approved path — in the right order, from day one.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg">
                    <TransitionLink href="/waitlist">
                      Request Early Access
                      <ArrowRight className="size-4" />
                    </TransitionLink>
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden bg-(--border) lg:block" />

            <div className="hidden border-t border-(--border) sm:block lg:flex lg:items-stretch lg:border-t-0">
              <ProductHeroGraph />
            </div>
          </div>
        </section>

        <ProductScrollSections />

        <section className="grid border-b border-(--border) lg:grid-cols-[1fr_1px_1.3fr]">
          <div className="p-6 sm:p-8 lg:flex lg:h-full lg:flex-col lg:justify-center lg:p-10">
            <h2 className="max-w-[13ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              What you get out of one reviewed graph.
            </h2>
            
          </div>

          <div className="hidden bg-(--border) lg:block" />

          <div>
            {productSummary.map((item, index) => (
              <div
                key={item.label}
                className={`grid gap-4 p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:p-8 ${index > 0 ? 'border-t border-(--border)' : ''}`}
              >
                <div className="flex size-11 items-center justify-center rounded-xl border border-[oklch(from_var(--primary)_l_c_h/0.14)] bg-(--card) text-(--primary)">
                  <item.icon className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-[1.05rem] leading-tight text-(--foreground)">{item.title}</h3>
                  <p className="mt-3 max-w-[42ch] text-sm leading-5 text-(--muted-foreground)">{item.copy}</p>
                  {item.detail ? (
                    <p className="mt-3 max-w-[42ch] text-sm leading-5 text-(--muted-foreground)">{item.detail}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid border-t border-(--border)">
          <div className="p-6 sm:p-8 lg:p-10 lg:pt-16">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              Capabilities
            </p>
            <h2 className="mt-4 font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Core capabilities, laid out directly.
            </h2>
          </div>
        </section>

        <section className="grid border-b border-(--border) lg:grid-cols-2">
          {productFeatureCards.map((card, index) => (
            <div
              key={card.label}
              className={`px-6 py-8 sm:px-8 lg:px-10 lg:py-10 ${index > 0 ? 'border-t border-(--border)' : ''} ${index % 2 === 1 ? 'lg:border-l' : ''} ${index < 2 ? 'lg:border-t-0' : ''}`}
            >
              <div className="flex items-center gap-2.5">
                <card.icon className="size-4 text-(--muted-foreground)" />
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                  {card.label}
                </p>
              </div>
              <h3 className="mt-3 max-w-[22ch] text-[1.15rem] leading-tight tracking-[-0.02em] text-(--foreground)">
                {card.title}
              </h3>
              <p className="mt-4 max-w-[38ch] text-sm leading-6 text-(--muted-foreground)">{card.copy}</p>
            </div>
          ))}
        </section>

        <section className="grid lg:grid-cols-[1fr_1px_auto]">
          <div className="p-6 sm:p-8 lg:p-10 lg:py-14">
            
            <h2 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.25rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Ready to see what's inside your document stack?
            </h2>
          </div>

          <div className="hidden  lg:block" />

          <div className="border-t border-(--border) p-6 sm:p-8 lg:flex lg:items-center lg:gap-4 lg:border-t-0 lg:p-10 lg:py-14">
            <Button asChild size="lg">
              <TransitionLink href="/waitlist">
                Request Early Access
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <TransitionLink href="/waitlist">Or book a 20-minute walkthrough with the team</TransitionLink>
            </Button>
          </div>
        </section>
      </MarketingPageFrame>
    </PageShell>
  );
}