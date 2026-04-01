import { ArrowRight, GitBranch } from 'lucide-react';
import { TransitionLink } from '@/components/marketing/page-transition';
import type { Metadata } from 'next';
import {
  MarketingCtaSection, MarketingHero, MarketingPageFrame, MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { getBreadcrumbSchema, getFaqPageSchema, getWebPageSchema } from '@/lib/structured-data';

export const metadata: Metadata = buildMetadata({
  title: 'The compiled structure, visible. Every edge inspectable before you follow it.',
  description: 'A visual synthesis canvas where the compiled dependency graph lives. Review every node, trace every edge to its source, resolve contradictions — before following the path.',
  path: '/features/canvas',
  keywords: ['canvas', 'knowledge graph', 'visual synthesis', 'dependency review'],
});

const bullets = [
  'Every edge traces back to the exact source passage that produced it',
  'Contradictions between sources surface as visual conflict nodes — you resolve them',
  'Share the reviewed canvas with your team or publish it publicly with one link',
];

const howItWorks = [
  { step: 'Compilation produces a draft canvas', detail: 'After SILKLEARN processes your source material, the dependency graph is laid out as a visual canvas — nodes, edges, source references, and flagged contradictions all visible at once.' },
  { step: 'Your team reviews together', detail: 'Invite teammates to the canvas. Walk through the graph together — each person can inspect nodes, check source provenance, and flag anything that needs a second opinion.' },
  { step: 'Node-by-node inspection', detail: 'Click any node to see its source document and passage. Click any edge to see why the dependency was drawn. Nothing is hidden behind a summary.' },
  { step: 'Resolve contradictions', detail: 'Where two sources disagree, a conflict node appears. Your team decides which source to trust — or marks it as an open question — and the graph updates.' },
  { step: 'Publish and share', detail: 'Once reviewed, publish the canvas. Share it with teammates via link, or make it publicly accessible for onboarding new members to the same verified knowledge.' },
];

const faqs = [
  { question: 'What does "visual dependency graph" mean?', answer: 'It means every concept your documents contain is a node, and every prerequisite relationship between concepts is a visible arrow. You can see the full structure of your compiled knowledge at a glance — not as a flat list, but as the graph it actually is.' },
  { question: 'Can my whole team review the same canvas?', answer: 'Yes. Canvas is built for collaborative review. Multiple teammates can be on the same canvas, each inspecting different nodes, leaving comments, and approving or flagging edges. The review is a team activity, not a solo one.' },
  { question: 'What happens to contradictions?', answer: 'When two sources give conflicting accounts of the same concept, Canvas surfaces them as visible conflict nodes. Your team sees exactly which sources disagree and on which concept, and you decide together which source to trust.' },
  { question: 'Can I share the canvas with people outside my team?', answer: 'Yes. You can generate a public share link for any reviewed canvas. Anyone with the link can view the dependency graph without needing an account.' },
];

export default function CanvasPage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
        { name: 'Home', url: absoluteUrl('/') },
        { name: 'Features', url: absoluteUrl('/features') },
        { name: 'Canvas', url: absoluteUrl('/features/canvas') },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageSchema({
        title: 'The compiled structure, visible. Every edge inspectable before you follow it.',
        description: 'A visual synthesis canvas where the compiled dependency graph lives. Review every node, trace every edge to its source, resolve contradictions — before following the path.',
        url: absoluteUrl('/features/canvas'),
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqPageSchema(faqs)) }} />
      <MarketingPageFrame>
        <MarketingHero
          kicker="Feature"
          title="The compiled structure, visible. Every edge inspectable before you follow it."
          description="Automated compilation gets the structure mostly right. Canvas is where your domain knowledge catches the rest. You see the full dependency graph — every concept node, every prerequisite edge, every contradiction flagged — and you review it before anyone follows the path. Nothing is trusted until it has been inspected."
          rightEyebrow="Why this matters"
          rightTitle="A feature is only valuable if it makes the compiled graph more defensible in real use."
          rightChildren={
            <div className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm leading-5 text-(--foreground)">
              This capability exists to make hidden knowledge structure inspectable and reusable instead of leaving it embedded in long source material.
            </div>
          }
        />
        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">What it does</p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                This feature turns hidden assumptions into something you can inspect.
              </h2>
            </>
          }
          right={
            <div>
              {bullets.map((bullet, index) => (
                <div key={bullet} className={index > 0 ? 'border-t border-(--border) pt-5' : ''}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <GitBranch className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Capability 0{index + 1}</p>
                  </div>
                  <p className="mt-4 text-sm leading-5 text-(--foreground)">{bullet}</p>
                </div>
              ))}
            </div>
          }
        />
        <section className="border-t border-(--border) px-6 py-14 sm:px-8 lg:px-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">In depth</p>
          <p className="mt-4 max-w-prose text-base leading-7 text-(--foreground)">
            Compilation produces a draft. Canvas is where that draft becomes trustworthy. The dependency graph is laid out visually: concepts as nodes, prerequisites as directed edges. Every node carries its source provenance — the exact passage it came from. Every contradiction your sources contain surfaces as a visible conflict. Your team reviews the compiled structure together, corrects what's wrong, approves what's right, and publishes the verified path. Canvas is the interface that turns a compiled knowledge graph into something an organization can stake its onboarding, compliance, and reasoning on.
          </p>
        </section>
        <section className="border-t border-(--border) px-6 py-14 sm:px-8 lg:px-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">How it works</p>
          <h2 className="mt-4 font-(family-name:--font-display) text-2xl tracking-tight text-(--foreground)">Step by step</h2>
          <ol className="mt-8 space-y-8">
            {howItWorks.map((item, i) => (
              <li key={i} className="grid grid-cols-[2rem_1fr] gap-4">
                <span className="text-sm font-bold text-(--muted-foreground) tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-sm font-semibold text-(--foreground)">{item.step}</p>
                  <p className="mt-1 text-sm leading-6 text-(--muted-foreground)">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="border-t border-(--border) px-6 py-14 sm:px-8 lg:px-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Common questions</p>
          <dl className="mt-8 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-t border-(--border) pt-6">
                <dt className="text-sm font-semibold text-(--foreground)">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-6 text-(--muted-foreground)">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Related paths</p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                See where this capability becomes operationally useful.
              </h2>
            </>
          }
          right={
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-(--border) p-4">
                <TransitionLink className="text-sm font-semibold text-(--foreground)" href="/use-cases/internal-docs-training">Research synthesis</TransitionLink>
              </div>
              <div className="border border-(--border) p-4">
                <TransitionLink className="text-sm font-semibold text-(--foreground)" href="/blog">Supporting guide</TransitionLink>
              </div>
              <div className="sm:col-span-2">
                <Button asChild><TransitionLink href="/waitlist">Join the waitlist</TransitionLink></Button>
              </div>
            </div>
          }
        />
        <MarketingCtaSection
          kicker="Next step"
          title="Use this capability to make the graph more defensible."
          actions={<Button asChild size="lg"><TransitionLink href="/waitlist">Request access<ArrowRight className="size-4" /></TransitionLink></Button>}
        />
      </MarketingPageFrame>
    </PageShell>
  );
}
