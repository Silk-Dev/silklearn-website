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
  { href: '/product', label: 'Product' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/features', label: 'Features' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/guides', label: 'Guides' },
  { href: '/blog', label: 'Blog' },
  { href: '/news', label: 'News' },
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
    guideHref: '/guides/how-to-turn-docs-into-learning-paths',
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
    guideHref: '/guides/dependency-ordered-learning-for-teams',
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
    guideHref: '/guides/how-to-turn-docs-into-learning-paths',
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
    guideHref: '/guides/dependency-ordered-learning-for-teams',
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