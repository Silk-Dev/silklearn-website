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
  metaTitle?: string;
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
  { href: '/features', label: 'Features' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/blog', label: 'Blog' },
  { href: '/the-reset', label: 'The Reset' },
  { href: '/about', label: 'About' },
];

export const featurePages: FeaturePage[] = [
  {
    slug: 'dependency-mapping',
    title: 'The reading order your documents never gave you.',
    description:
      'Surface the prerequisite structure across your source material so you know what to read first, what unlocks the next concept, and where your sources disagree.',
    summary:
      'You\'re starting with three textbooks on the same topic, a stack of papers that reference each other in circles, and a codebase README that assumes you already know the architecture — and none of them tell you which one to open first. SILKLEARN reads across all of them, maps what depends on what, and gives you the dependency order your source material never made explicit. You see what must come before the next layer makes sense, and where two sources are quietly telling you different things.',
    bullets: [
      'Researchers: see which papers assume which priors so you stop building a mental model in the wrong order',
      'Developers: know which architecture decisions to understand before you ship something that breaks one of them',
      'Students: see where your textbooks disagree before the contradiction becomes a gap in your reasoning',
    ],
    useCaseHref: '/use-cases/engineering-onboarding',
    guideHref: '/blog',
    deepSummary: `Most documents don't fail because the information is wrong — they fail because the reading order is invisible. When you're dropped into a new research area, a large codebase, or a pile of conflicting textbooks, there's no signal about what to read first. You build a mental model by accident, filling gaps in whatever order you happen to encounter them. SILKLEARN's dependency mapping makes that prerequisite structure explicit. It traces what each concept assumes you already know, finds where two sources give you different answers to the same question, and builds the graph your brain was trying to construct anyway — surfaced, inspectable, and ready to follow.`,
    howItWorks: [
      { step: 'Ingest your documents', detail: 'Upload whatever you\'re trying to learn from — research papers, technical docs, textbooks, codebases, PDFs. SILKLEARN begins identifying the conceptual relationships between them.' },
      { step: 'Identify dependencies', detail: 'Using structural analysis, it finds where one concept assumes another has been understood — and makes those implicit assumptions into explicit prerequisite edges.' },
      { step: 'Build the graph', detail: 'The result is a directed acyclic graph (DAG) showing which concepts must come before others. The order is extracted from your sources, not invented.' },
      { step: 'You review it', detail: 'Before you follow the path, you inspect the graph. You see every edge, every source reference, every place where your documents conflict. You decide what to trust.' },
      { step: 'Follow the path', detail: 'The approved graph becomes your reading order — the exact sequence your material demands, with contradictions flagged and dependencies visible.' },
    ],
    faqs: [
      { question: 'Does this work with research papers?', answer: 'Yes. Research papers are one of the best inputs for SILKLEARN — they\'re dense, heavily cross-referenced, and assume a lot of prior knowledge. SILKLEARN surfaces those assumptions as explicit edges so you can see what you need to read before a given paper will make sense.' },
      { question: 'What if my sources contradict each other?', answer: 'That\'s exactly what SILKLEARN is built to surface. When two sources give conflicting accounts of the same concept, the graph flags the contradiction so you can see it — and decide which source to trust — instead of unknowingly building a mental model on inconsistent foundations.' },
      { question: 'How is this different from just asking an AI to summarize my documents?', answer: 'Summarization answers questions about what\'s in your documents. SILKLEARN synthesizes the structure — what depends on what, where sources agree, where they don\'t, and what order you should encounter the material in. It\'s not a query interface. It\'s a map.' },
      { question: 'Does it work with unstructured documents?', answer: 'Yes. SILKLEARN is designed for dense, unstructured source material — PDF papers, technical wikis, raw documentation, textbook chapters. You don\'t need clean formatting to start.' },
    ],
  },
  {
    slug: 'leader-review',
    title: "You shouldn't trust a path you can't inspect.",
    description:
      'SILKLEARN surfaces what it compiled — the dependency graph, the contradictions, the source references — so you can verify the structure before trusting it.',
    summary:
      "Automated synthesis gets the structure mostly right — and occasionally wrong in ways that only someone with domain knowledge would catch. SILKLEARN shows you everything it built before you follow any of it: every edge, every source reference, every place where your documents conflict. You decide what to trust. The path earns your confidence; it doesn't demand it.",
    bullets: [
      'Trace every connection back to the source passage that produced it — nothing is asserted without a reference',
      'See exactly where two sources contradict each other so you can decide which one to trust',
      'Approve the path before you follow it — no black box, no silent synthesis',
    ],
    useCaseHref: '/use-cases/internal-docs-training',
    guideHref: '/blog',
    deepSummary: `Automated synthesis is only useful if the person who understands the domain has checked it. That person is you. SILKLEARN's review step exists because you shouldn't follow a compiled path you can't inspect. Before you adopt the dependency order or act on surfaced contradictions, you see the full graph — every node, every edge, every source reference — and you decide what's right. This isn't a formality. It's where your domain knowledge catches what the system got wrong, where ambiguous dependencies get resolved by someone who actually understands the material, and where you earn the confidence to follow the path SILKLEARN built.`,
    howItWorks: [
      { step: 'Compilation produces a draft graph', detail: 'After SILKLEARN processes your source material, it produces a draft dependency graph with nodes, edges, and source provenance for each decision.' },
      { step: 'You see the full structure', detail: 'You\'re shown the complete graph — not a summary — with every source reference visible. You can see why each dependency edge was drawn.' },
      { step: 'Node-by-node inspection', detail: 'Walk through each concept: check if it\'s placed correctly in the sequence, whether the source reference is accurate, and whether any contradiction needs your judgment.' },
      { step: 'You correct and approve', detail: 'Reorder nodes, add missing prerequisites, flag inaccuracies, or mark sections as confirmed. Every decision stays in your hands.' },
      { step: 'Follow the verified path', detail: 'Only after you\'ve reviewed the structure do you follow it. The path you use is one you\'ve inspected, not one handed to you opaquely.' },
    ],
    faqs: [
      { question: 'Why do I need to review it if synthesis is automated?', answer: 'Automated synthesis can surface the structure that\'s already in your documents. It can\'t know about gaps in your sources, recent information that hasn\'t made it into any document yet, or domain-specific exceptions only you would recognize. The review step is where that knowledge gets added.' },
      { question: 'What exactly can I see during review?', answer: 'You see the full dependency graph — every concept node, every prerequisite edge, and the source document and passage that produced each connection. Nothing is hidden behind a summary.' },
      { question: 'What if the graph has contradictions I\'m not sure how to resolve?', answer: 'SILKLEARN flags them explicitly. You can see which sources conflict and on which concept. You decide which source to trust, or mark it as an open question you want to investigate further.' },
      { question: 'Can I trust the path without reviewing it?', answer: 'You can — but we don\'t recommend it for material where accuracy matters. The review step exists precisely because your domain knowledge is what makes the compiled structure trustworthy.' },
    ],
  },
];

export const useCasePages: UseCasePage[] = [
  {
    slug: 'engineering-onboarding',
    title: 'You joined a codebase. The docs exist. The reading order doesn\'t.',
    metaTitle: 'Developer Onboarding Into an Unfamiliar Codebase',
    description:
      'Upload the architecture docs, READMEs, runbooks, and decision records. SILKLEARN maps the dependency order so you know what to read first instead of guessing.',
    summary:
      'Joining a large, unfamiliar codebase is a reading problem before it\'s a coding problem. The documentation exists — but it doesn\'t tell you what order to read it in, which pieces conflict, or which assumptions you\'re supposed to already have. SILKLEARN reads that order directly from the docs and hands you a path, not a pile.',
    outcomes: [
      'Know what to read first — not because someone told you, but because the structure says so',
      'See where your docs contradict each other before you build on the wrong one',
      'A path through the material, not a pile of files to guess your way through',
    ],
    featureHref: '/features/dependency-mapping',
    guideHref: '/blog',
  },
  {
    slug: 'internal-docs-training',
    title: 'You\'re working across multiple sources. They quietly disagree on the foundations.',
    metaTitle: 'Researcher Reconciling Multiple Sources on the Same Topic',
    description:
      'Upload the papers, reports, and sources you\'re working across. SILKLEARN maps which findings depend on which foundations, and surfaces where your sources contradict each other.',
    summary:
      'Research moves fast and sources conflict. When you\'re working across ten papers on the same topic, you\'re manually tracking which findings assume which priors, which studies replicate each other, and which ones quietly disagree. SILKLEARN makes that structure explicit — so the contradictions you\'d otherwise discover at the wrong moment become visible from the start.',
    outcomes: [
      'See which papers depend on which foundations so your reading order stops being accidental',
      'Surface contradictions between sources before they corrupt your mental model',
      'Build a structure you can inspect and refine as you add new material',
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