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
  title: 'Your compiled knowledge, available to every AI that asks for it.',
  description: 'SILKLEARN becomes an MCP server. Any AI that supports Model Context Protocol — Claude, Cursor, Copilot — can pull dependency-ordered, contradiction-resolved knowledge from your compiled workspaces.',
  path: '/features/mcp-integration',
  keywords: ['MCP', 'model context protocol', 'AI integration', 'knowledge context'],
});

const bullets = [
  'Connect any MCP-compatible AI to your compiled SILKLEARN workspace',
  'Skills and extensions for Cursor, Claude, Copilot, and Windsurf',
  'Agents get the minimum sufficient context — not a raw document dump',
];

const howItWorks = [
  { step: 'Compile your knowledge first', detail: 'Run your documents through SILKLEARN. The result is a dependency graph with every concept ordered, every contradiction flagged, and every node linked to its source.' },
  { step: 'Enable MCP server', detail: 'With one toggle, your compiled workspace becomes an MCP server. Any AI tool that supports the Model Context Protocol can connect to it.' },
  { step: 'Install the skill or extension', detail: 'Install the SILKLEARN skill for your preferred tool — Cursor, Claude Desktop, GitHub Copilot, or Windsurf. The skill knows how to query your compiled workspace.' },
  { step: 'AI pulls compiled context', detail: 'When your AI agent needs context, it queries SILKLEARN instead of raw documents. It gets the minimum sufficient nodes — in dependency order — for whatever task it is working on.' },
  { step: 'Contradictions are already resolved', detail: 'By the time context reaches your AI, your team has already reviewed and resolved the contradictions in the source material. No silent inconsistencies in the prompt.' },
];

const faqs = [
  { question: 'What is MCP?', answer: 'Model Context Protocol is an open standard that lets AI clients (like Claude or Cursor) connect to external data sources and tools. When SILKLEARN exposes your compiled knowledge as an MCP server, your AI tools can query it directly — structured, ordered context instead of raw document retrieval.' },
  { question: 'Which AI tools will be supported?', answer: 'Any tool that supports MCP — Claude Desktop, Cursor, GitHub Copilot (via extensions), and Windsurf at launch. We are also building dedicated skills and plugins for each tool for the best integration experience.' },
  { question: 'When is this available?', answer: 'MCP integration is coming soon. Join the waitlist to be notified when it ships.' },
  { question: 'How is this different from giving an AI my documents directly?', answer: 'Raw documents give the AI too much or the wrong context. SILKLEARN\'s compiled version gives it the exact nodes required for the task, in dependency order, with contradictions already resolved. The AI reasons better because the context is better.' },
];

export default function McpIntegrationPage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
        { name: 'Home', url: absoluteUrl('/') },
        { name: 'Features', url: absoluteUrl('/features') },
        { name: 'MCP Integration', url: absoluteUrl('/features/mcp-integration') },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageSchema({
        title: 'Your compiled knowledge, available to every AI that asks for it.',
        description: 'SILKLEARN becomes an MCP server. Any AI that supports Model Context Protocol — Claude, Cursor, Copilot — can pull dependency-ordered, contradiction-resolved knowledge from your compiled workspaces.',
        url: absoluteUrl('/features/mcp-integration'),
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqPageSchema(faqs)) }} />
      <MarketingPageFrame>
        <MarketingHero
          kicker="Feature"
          title="Your compiled knowledge, available to every AI that asks for it."
          description="Your compiled knowledge graph — structured, dependency-ordered, contradiction-resolved — available to any AI tool via Model Context Protocol. Instead of pasting raw documents into a prompt, your AI gets the compiled version: the minimum sufficient context, in the right order, with conflicts already flagged."
          rightEyebrow="Why this matters"
          rightTitle="A feature is only valuable if it makes the compiled graph more defensible in real use."
          rightChildren={
            <>
              <div className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm leading-5 text-(--foreground)">
                This capability exists to make hidden knowledge structure inspectable and reusable instead of leaving it embedded in long source material.
              </div>
              <p className="mt-3 text-sm text-(--muted-foreground)">MCP integration is in progress. <TransitionLink href="/waitlist" className="underline">Join the waitlist</TransitionLink> to be notified when it ships.</p>
            </>
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
            Most AI tools get context wrong. They retrieve document chunks based on query similarity — which means they bring in fragments, miss prerequisites, and include contradictions the user doesn't know about. SILKLEARN's MCP integration changes this. Your compiled knowledge graph — with its dependency order, conflict flags, and source provenance — becomes an MCP server that any AI client can connect to. Claude, Cursor, GitHub Copilot, and Windsurf can pull exactly the nodes required for the task at hand, in the order they need to be processed, with contradictions already surfaced. The agent doesn't guess at context. It gets the compiled version.
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
                <TransitionLink className="text-sm font-semibold text-(--foreground)" href="/use-cases/ai-context-preparation">AI context preparation</TransitionLink>
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
