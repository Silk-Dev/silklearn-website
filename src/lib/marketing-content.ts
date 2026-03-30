export type NavItem = {
  href: string;
  label: string;
};

export type FeaturePage = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  bullets: string[];
  useCaseHref: string;
  guideHref: string;
  howItWorks?: { step: string; detail: string }[];
  faqs?: { question: string; answer: string }[];
  deepSummary?: string;
};

export type UseCasePage = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  outcomes: string[];
  featureHref: string;
  guideHref: string;
};

export type GuidePage = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  featureHref: string;
  useCaseHref: string;
};

export const primaryNavigation: NavItem[] = [
  { href: '/product', label: 'How it works' },
  { href: '/for-teams', label: 'For Teams' },
  { href: '/features', label: 'Features' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/blog', label: 'Blog' },
  { href: '/the-reset', label: 'The Reset' },
];

export const featurePages: FeaturePage[] = [
  {
    slug: 'dependency-mapping',
    title: 'Compile Dependency Order From Source Material',
    description:
      'Expose prerequisite structure across dense documents so teams and AI systems receive knowledge in a defensible order.',
    summary:
      'SILKLEARN turns hidden assumptions into explicit edges so teams can see what must come first, what unlocks the next concept, and where review is still required.',
    bullets: [
      'Turns implicit expert order into explicit prerequisite edges',
      'Reduces wasted onboarding and search time caused by wrong sequencing',
      'Produces a graph that can power roadmaps, briefings, and context bundles',
    ],
    useCaseHref: '/use-cases/engineering-onboarding',
    guideHref: '/blog',
    deepSummary: `Most internal documents don't fail because the information is wrong — they fail because the reading order is wrong. When a new engineer opens a stack of runbooks, they have no visible signal about what to read first. When a team lead prepares a rollout, they have to manually reconstruct which steps block others. SILKLEARN's dependency mapping feature makes that prerequisite structure explicit. It turns what used to be buried in expert memory into a graph your team can inspect, review, and reuse.`,
    howItWorks: [
      { step: 'Ingest source material', detail: 'SILKLEARN ingests your documents — runbooks, specs, standards, training notes — and begins identifying the conceptual relationships between sections.' },
      { step: 'Surface implicit edges', detail: 'Using structural analysis, it finds where one concept assumes another has been understood — and makes those assumptions into explicit prerequisite edges.' },
      { step: 'Build the graph', detail: 'The result is a directed acyclic graph (DAG) showing which concepts must come before others. The order is extracted from the source, not invented.' },
      { step: 'Leader review', detail: 'Before the graph is used, a designated leader reviews the dependency edges, corrects exceptions, and approves the sequence. The graph doesn\'t ship without sign-off.' },
      { step: 'Output to team', detail: 'The approved graph becomes the onboarding path, rollout checklist, or context bundle — in the exact order the material demands.' },
    ],
    faqs: [
      { question: 'How is this different from a manually written onboarding guide?', answer: 'A manually written guide reflects what the author remembered to include on the day they wrote it. SILKLEARN\'s dependency map is extracted from the actual source documents your team uses, so it stays grounded in what the docs actually say — not what one person thought they should say.' },
      { question: 'Does this work with unstructured documents?', answer: 'Yes. SILKLEARN is designed specifically for dense, unstructured source material — internal wikis, PDF runbooks, Notion pages, Confluence spaces. You don\'t need clean structure to start.' },
      { question: 'What happens when the source documents change?', answer: 'The compiled graph becomes a stable reference point. When source material changes, leaders can flag the relevant nodes for re-review and update the sequence without rebuilding from scratch.' },
      { question: 'Who reviews the dependency graph?', answer: 'Whoever owns the knowledge domain — usually a senior engineer, team lead, or subject matter expert. The review step is built into the workflow, not optional.' },
    ],
  },
  {
    slug: 'leader-review',
    title: 'Review Compiled Outputs Before Rollout',
    description:
      'Keep humans in the loop so compiled outputs can be inspected, corrected, and trusted before they affect team execution.',
    summary:
      'SILKLEARN does not ask leaders to trust a black box. It gives them a reviewable graph with provenance, dependency logic, and visible downstream implications.',
    bullets: [
      'Review nodes, edges, and sequence before launch',
      'Catch domain-specific exceptions that flat retrieval and generic course tools miss',
      'Build trust with a visible path from source documents to final artifact',
    ],
    useCaseHref: '/use-cases/internal-docs-training',
    guideHref: '/blog',
    deepSummary: `Automated knowledge compilation is only useful if someone who understands the domain has checked it. SILKLEARN's leader review feature is the human checkpoint between compilation and rollout. Instead of trusting a black box to get the sequence right, it gives domain experts a structured interface to inspect every node, every edge, and every source reference — before the output reaches the team. The review isn't a formality. It's where domain exceptions get caught, where ambiguous dependencies get resolved, and where the compiled graph earns the trust of the people who have to use it.`,
    howItWorks: [
      { step: 'Compilation produces a draft graph', detail: 'After SILKLEARN processes source material, it produces a draft dependency graph with nodes, edges, and source provenance for each decision.' },
      { step: 'Leader is assigned to review', detail: 'A team lead or senior SME is assigned to the review queue. They see the full graph — not a summary — with every source reference visible.' },
      { step: 'Node-by-node inspection', detail: 'The reviewer walks through each node: checking if the concept is placed correctly in the sequence, whether the source reference is accurate, and whether any domain exceptions apply.' },
      { step: 'Corrections and approvals', detail: 'The reviewer can reorder nodes, add missing prerequisites, flag inaccuracies, or approve sections as correct. Every action is timestamped and tied to their account.' },
      { step: 'Approved graph ships to team', detail: 'Only after review approval does the compiled output reach the team. The audit trail — who reviewed what, when, and what they changed — stays attached to the artifact.' },
    ],
    faqs: [
      { question: 'Why is human review necessary if compilation is automated?', answer: 'Automated compilation can surface the structure that\'s already in the documents. It can\'t know about domain-specific exceptions, organizational context, or recent changes that haven\'t made it into the docs yet. The leader review step is where that context gets added.' },
      { question: 'How long does a review typically take?', answer: 'For a 20–30 node graph, most reviewers complete a first pass in under two hours. The interface is designed to surface what needs attention rather than requiring a full read-through of every source document.' },
      { question: 'What if multiple leaders need to review different sections?', answer: 'The review queue can be split by domain. A security lead reviews the security nodes; an infra lead reviews the infrastructure nodes. Each section can be approved independently.' },
      { question: 'Is the review audit trail exportable?', answer: 'Yes. The review history — who approved each node, what was changed, and when — can be exported as a compliance artifact, useful for regulated industries or formal audit processes.' },
    ],
  },
];

export const useCasePages: UseCasePage[] = [
  {
    slug: 'engineering-onboarding',
    title: 'Engineering Onboarding From Internal Systems Knowledge',
    description:
      'Turn architecture docs, runbooks, and technical standards into a dependency-aware onboarding path for engineers.',
    summary:
      'Instead of asking senior engineers to repeatedly explain the same system from scratch, SILKLEARN compiles the order directly from the documentation and related sources.',
    outcomes: [
      'Reduce ramp time on complex internal systems',
      'Use current docs instead of stale onboarding decks',
      'Give leads a reviewable map of prerequisite knowledge and hidden assumptions',
    ],
    featureHref: '/features/dependency-mapping',
    guideHref: '/blog',
  },
  {
    slug: 'internal-docs-training',
    title: 'Operational Knowledge Transfer From Internal Documentation',
    description:
      'Convert dense internal documentation into structured, reviewable guidance without rewriting everything as a course.',
    summary:
      'SILKLEARN is useful when the knowledge is already in the docs, but the dependency order, hidden assumptions, and contradictions are fragmented across multiple sources.',
    outcomes: [
      'Reuse existing documentation instead of rebuilding it as slides',
      'Expose what people need to understand before advanced topics',
      'Create a stable compiled asset leaders can refine over time',
    ],
    featureHref: '/features/leader-review',
    guideHref: '/blog',
  },
];

export const guidePages: GuidePage[] = [
  {
    slug: 'how-to-turn-docs-into-learning-paths',
    title: 'How To Turn Docs Into Learning Paths',
    description:
      'A practical guide to turning technical documents, runbooks, and internal references into a compiled, dependency-aware learning path.',
    summary:
      'Most teams already have the knowledge they need in documents. The problem is that the sequence, scope, and assumptions are scattered. This guide explains how to reconstruct them.',
    sections: [
      {
        heading: 'Start with the real source material',
        body:
          'Use the documents that your team already relies on in production. If the training path drifts from the source, trust drops quickly.',
      },
      {
        heading: 'Identify prerequisite logic',
        body:
          'Learning paths work when they reflect actual dependency order. Teams need to know what unlocks the next concept, not just what appears next in a deck.',
      },
      {
        heading: 'Review before rollout',
        body:
          'A generated graph should accelerate expert review, not replace it. Leaders confirm the path before it becomes operational guidance.',
      },
    ],
    featureHref: '/features/dependency-mapping',
    useCaseHref: '/use-cases/engineering-onboarding',
  },
  {
    slug: 'dependency-ordered-learning-for-teams',
    title: 'Dependency-Ordered Learning For Teams',
    description:
      'Why team learning paths need explicit prerequisite structure instead of flat content lists, dashboards, or generic course modules.',
    summary:
      'If the order is wrong, the reasoning fails even when the raw content is present. Dependency-ordered learning solves the sequencing problem by making structure explicit.',
    sections: [
      {
        heading: 'Flat training wastes time',
        body:
          'When every topic is treated like a peer, teams hit advanced concepts without the context they need, then rely on repeated intervention from experts.',
      },
      {
        heading: 'Teams need structure, not just content',
        body:
          'The value is not only in the documents themselves. It is in surfacing the order that makes those documents learnable.',
      },
      {
        heading: 'Leader review closes the trust gap',
        body:
          'Structured learning paths become usable when leads can inspect the sequence and validate it against real domain expectations.',
      },
    ],
    featureHref: '/features/leader-review',
    useCaseHref: '/use-cases/internal-docs-training',
  },
];

export function getFeaturePage(slug: string) {
  return featurePages.find((page) => page.slug === slug);
}

export function getUseCasePage(slug: string) {
  return useCasePages.find((page) => page.slug === slug);
}

export function getGuidePage(slug: string) {
  return guidePages.find((page) => page.slug === slug);
}