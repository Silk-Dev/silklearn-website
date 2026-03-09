'use client';

import { useState } from 'react';
import { ArrowUpRight, FileStack, GitBranch, ListChecks, Workflow } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type WorkflowStage = {
  title: string;
  summary: string;
  panelEyebrow: string;
  panelTitle: string;
  panelDescription: string;
  rows: string[];
  stats: Array<{ label: string; value: string }>;
};

const stages: WorkflowStage[] = [
  {
    title: 'Compile the source base',
    summary: 'Bring in dense documents, specs, and internal references without flattening them into anonymous chunks.',
    panelEyebrow: 'Source intake',
    panelTitle: 'Structured input, not random uploads',
    panelDescription:
      'SILKLEARN keeps document boundaries and provenance visible so every downstream segment can be traced back to the source.',
    rows: [
      'Architecture spec.pdf',
      'Onboarding handbook.md',
      'Support escalation runbook.docx',
      'Internal glossary.notion export',
    ],
    stats: [
      { label: 'Sources', value: '14 files' },
      { label: 'Coverage', value: '3 teams' },
    ],
  },
  {
    title: 'Map the dependency order',
    summary: 'Turn the material into segments and prerequisite logic so teams can see what must be understood first.',
    panelEyebrow: 'Dependency graph',
    panelTitle: 'A graph leaders can actually inspect',
    panelDescription:
      'Segments are linked by prerequisite logic, overlap is reconciled, and the output becomes reviewable before rollout.',
    rows: [
      'Auth model -> Session flow',
      'Session flow -> Access policy',
      'Access policy -> Incident recovery',
      'Incident recovery -> Escalation workflow',
    ],
    stats: [
      { label: 'Segments', value: '95 nodes' },
      { label: 'Edges', value: '241 links' },
    ],
  },
  {
    title: 'Review and ship outputs',
    summary: 'Approve the compiled graph and turn it into learning paths, onboarding flows, or AI-ready context bundles.',
    panelEyebrow: 'Review loop',
    panelTitle: 'Outputs that are ready for real use',
    panelDescription:
      'Leaders review changes, confirm the sequence, and publish artifacts grounded in source material instead of guesswork.',
    rows: [
      'Engineering onboarding path',
      'Minimum context bundle for support agents',
      'Review queue for unresolved dependencies',
      'Rollout notes for team leads',
    ],
    stats: [
      { label: 'Artifacts', value: '4 outputs' },
      { label: 'Review', value: 'Leader approved' },
    ],
  },
];

const icons = [FileStack, GitBranch, Workflow] as const;

export function HomeProcessShowcase() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedStage = stages[selectedIndex];

  return (
    <section className="grid gap-8 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_22px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.86fr_1.14fr] lg:px-8 lg:py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--primary)">How it works</p>
        <h2 className="mt-4 max-w-[9.5ch] font-(family-name:--font-display) text-[clamp(2.55rem,4.8vw,4rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground)">
          Rebuild the order hidden inside the documents.
        </h2>
        <p className="mt-4 max-w-[56ch] text-base leading-5 text-(--muted-foreground)">
          The workflow follows the same discipline as the reference: a clear left-to-right story with one active system view at a time.
        </p>

        <div className="mt-8 grid gap-3">
          {stages.map((stage, index) => {
            const Icon = icons[index];

            return (
              <button
                key={stage.title}
                className={cn(
                  'grid gap-2 rounded-3xl border px-5 py-5 text-left transition-colors',
                  selectedIndex === index
                    ? 'border-[rgba(31,63,122,0.24)] bg-[rgba(245,248,253,0.94)]'
                    : 'border-(--border) bg-white hover:bg-[rgba(248,250,253,0.9)]',
                )}
                onClick={() => setSelectedIndex(index)}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(31,63,122,0.08)] text-(--primary)">
                    <Icon className="size-4.5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-(--foreground)">{stage.title}</p>
                    <p className="mt-1 text-sm leading-6 text-(--muted-foreground)">{stage.summary}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Card className="overflow-hidden rounded-[28px] border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] shadow-none">
        <CardHeader className="border-b border-(--border) pb-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--primary)">
                {selectedStage.panelEyebrow}
              </p>
              <CardTitle className="mt-3 text-[1.55rem] leading-tight">{selectedStage.panelTitle}</CardTitle>
              <CardDescription className="mt-3 max-w-[54ch] text-sm leading-6">
                {selectedStage.panelDescription}
              </CardDescription>
            </div>
            <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-[rgba(31,63,122,0.18)] bg-white text-(--primary) sm:flex">
              <ArrowUpRight className="size-5" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-6 pt-6 xl:grid-cols-[1fr_220px]">
          <div className="rounded-3xl border border-[rgba(10,25,49,0.08)] bg-white p-5">
            <div className="mb-4 flex items-center justify-between border-b border-(--border) pb-4">
              <div>
                <p className="text-sm font-semibold text-(--foreground)">{selectedStage.panelTitle}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-(--muted-foreground)">Live preview</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(31,63,122,0.08)] text-(--primary)">
                <ListChecks className="size-4" />
              </div>
            </div>

            <div className="grid gap-3">
              {selectedStage.rows.map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-between rounded-[18px] border border-[rgba(10,25,49,0.08)] bg-[rgba(248,250,253,0.9)] px-4 py-3"
                >
                  <span className="text-sm font-medium text-(--foreground)">{row}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-(--muted-foreground)">
                    mapped
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {selectedStage.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[22px] border border-[rgba(10,25,49,0.08)] bg-[rgba(255,255,255,0.88)] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-(--foreground)">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}