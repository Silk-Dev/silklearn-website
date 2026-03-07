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
];

export const featurePages: FeaturePage[] = [
  {
    slug: 'dependency-mapping',
    title: 'Dependency Mapping For Team Learning',
    description:
      'Make hidden prerequisite logic explicit so teams learn in an order that actually matches the source material.',
    summary:
      'SilkLearn identifies what should be learned first, what depends on it, and where leaders should inspect the graph before rollout.',
    bullets: [
      'Turns implicit expert order into explicit prerequisite edges',
      'Reduces wasted onboarding time caused by learning steps in the wrong sequence',
      'Keeps leader review inside the workflow before a path becomes team policy',
    ],
    useCaseHref: '/use-cases/engineering-onboarding',
    guideHref: '/guides/how-to-turn-docs-into-learning-paths',
  },
  {
    slug: 'leader-review',
    title: 'Leader Review Before Rollout',
    description:
      'Keep humans in the loop so generated learning paths can be checked, adjusted, and trusted before teams are assigned against them.',
    summary:
      'SilkLearn does not ask leaders to trust a black box. It gives them a reviewable graph grounded in the source material.',
    bullets: [
      'Review nodes, edges, and sequence before launch',
      'Catch domain-specific exceptions that generic course tools miss',
      'Build trust with a visible path from source documents to final roadmap',
    ],
    useCaseHref: '/use-cases/internal-docs-training',
    guideHref: '/guides/dependency-ordered-learning-for-teams',
  },
];

export const useCasePages: UseCasePage[] = [
  {
    slug: 'engineering-onboarding',
    title: 'Engineering Onboarding From Internal Docs',
    description:
      'Turn architecture docs, runbooks, and standards into a dependency-ordered engineering onboarding path.',
    summary:
      'Instead of asking senior engineers to manually sequence onboarding every time, SilkLearn extracts the order directly from your documentation.',
    outcomes: [
      'Reduce ramp time on complex internal systems',
      'Use current docs instead of stale onboarding decks',
      'Give leads a reviewable map of prerequisite knowledge',
    ],
    featureHref: '/features/dependency-mapping',
    guideHref: '/guides/how-to-turn-docs-into-learning-paths',
  },
  {
    slug: 'internal-docs-training',
    title: 'Internal Documentation Training',
    description:
      'Convert dense internal documentation into a structured learning path without rewriting everything as a course.',
    summary:
      'SilkLearn is useful when the knowledge is already in the docs, but the order is fragmented across multiple sources.',
    outcomes: [
      'Reuse existing documentation instead of rebuilding it as slides',
      'Expose what people need to understand before advanced topics',
      'Create a stable path leaders can refine over time',
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
      'A practical guide to turning technical documents, runbooks, and internal references into a structured learning path.',
    summary:
      'Most teams already have the knowledge they need in documents. The problem is that the sequence is scattered. This guide explains how to reconstruct it.',
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
      'Why team learning paths need explicit prerequisite structure instead of flat content lists or generic course modules.',
    summary:
      'If the order is wrong, the training feels slow even when the content is correct. Dependency-ordered learning solves that sequencing problem.',
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