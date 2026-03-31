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
  comingSoon?: boolean;
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
      'You\'re starting with three textbooks on the same topic, a stack of papers that reference each other in circles, and a codebase README that assumes you already know the architecture — and none of them tell you which one to open first. SILKLEARN reads across all of them, maps what depends on what, and gives you the dependency order your source material never made explicit. You see exactly what must come first — and where two of your sources quietly contradict each other.',
    bullets: [
      'Researchers: find which papers assume which priors — and stop assembling your model backwards.',
      'Developers: see which architecture decisions your code depends on — before you ship something that breaks one of them.',
      'Students: see where your textbooks disagree before that gap distorts your reasoning.',
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
    slug: 'canvas',
    title: 'The compiled structure, visible. Every edge inspectable before you follow it.',
    description:
      'A visual synthesis canvas where the compiled dependency graph lives. Review every node, trace every edge to its source, resolve contradictions with your team — before following the path.',
    summary:
      'Automated compilation gets the structure mostly right. Canvas is where your domain knowledge catches the rest. You see the full dependency graph — every concept node, every prerequisite edge, every contradiction flagged — and your team reviews it together before anyone follows the path. Nothing is trusted until it has been inspected.',
    bullets: [
      'Every edge traces back to the exact source passage that produced it',
      'Contradictions between sources surface as visual conflict nodes — you resolve them',
      'Share the reviewed canvas with your team or publish it publicly with one link',
    ],
    useCaseHref: '/use-cases/internal-docs-training',
    guideHref: '/blog',
    deepSummary: `Compilation produces a draft. Canvas is where that draft becomes trustworthy. The dependency graph is laid out visually: concepts as nodes, prerequisites as directed edges. Every node carries its source provenance — the exact passage it came from. Every contradiction your sources contain surfaces as a visible conflict. Your team reviews the compiled structure together, corrects what's wrong, approves what's right, and publishes the verified path. Canvas is the interface that turns a compiled knowledge graph into something an organization can stake its onboarding, compliance, and reasoning on.`,
    howItWorks: [
      { step: 'Compilation produces a draft canvas', detail: 'After SILKLEARN processes your source material, the dependency graph is laid out as a visual canvas — nodes, edges, source references, and flagged contradictions all visible at once.' },
      { step: 'Your team reviews together', detail: 'Invite teammates to the canvas. Walk through the graph together — each person can inspect nodes, check source provenance, and flag anything that needs a second opinion.' },
      { step: 'Node-by-node inspection', detail: 'Click any node to see its source document and passage. Click any edge to see why the dependency was drawn. Nothing is hidden behind a summary.' },
      { step: 'Resolve contradictions', detail: 'Where two sources disagree, a conflict node appears. Your team decides which source to trust — or marks it as an open question — and the graph updates.' },
      { step: 'Publish and share', detail: 'Once reviewed, publish the canvas. Share it with teammates via link, or make it publicly accessible for onboarding new members to the same verified knowledge.' },
    ],
    faqs: [
      { question: 'What does "visual dependency graph" mean?', answer: 'It means every concept your documents contain is a node, and every prerequisite relationship between concepts is a visible arrow. You can see the full structure of your compiled knowledge at a glance — not as a flat list, but as the graph it actually is.' },
      { question: 'Can my whole team review the same canvas?', answer: 'Yes. Canvas is built for collaborative review. Multiple teammates can be on the same canvas, each inspecting different nodes, leaving comments, and approving or flagging edges. The review is a team activity, not a solo one.' },
      { question: 'What happens to contradictions?', answer: 'When two sources give conflicting accounts of the same concept, Canvas surfaces them as visible conflict nodes. Your team sees exactly which sources disagree and on which concept, and you decide together which source to trust.' },
      { question: 'Can I share the canvas with people outside my team?', answer: 'Yes. You can generate a public share link for any reviewed canvas. Anyone with the link can view the dependency graph without needing an account.' },
    ],
  },
  {
    slug: 'mcp-integration',
    title: 'Your compiled knowledge, available to every AI that asks for it.',
    description:
      'SILKLEARN becomes an MCP server. Any AI that supports Model Context Protocol — Claude, Cursor, Copilot — can pull dependency-ordered, contradiction-resolved knowledge from your compiled workspaces.',
    summary:
      "Your compiled knowledge graph — structured, dependency-ordered, contradiction-resolved — available to any AI tool via Model Context Protocol. Instead of pasting raw documents into a prompt, your AI gets the compiled version: the minimum sufficient context, in the right order, with conflicts already flagged.",
    bullets: [
      'Connect any MCP-compatible AI to your compiled SILKLEARN workspace',
      'Skills and extensions for Cursor, Claude, Copilot, and Windsurf',
      'Agents get the minimum sufficient context — not a raw document dump',
    ],
    useCaseHref: '/use-cases/engineering-onboarding',
    guideHref: '/blog',
    deepSummary: `Most AI tools get context wrong. They retrieve document chunks based on query similarity — which means they bring in fragments, miss prerequisites, and include contradictions the user doesn't know about. SILKLEARN's MCP integration changes this. Your compiled knowledge graph — with its dependency order, conflict flags, and source provenance — becomes an MCP server that any AI client can connect to. Claude, Cursor, GitHub Copilot, and Windsurf can pull exactly the nodes required for the task at hand, in the order they need to be processed, with contradictions already surfaced. The agent doesn't guess at context. It gets the compiled version.`,
    howItWorks: [
      { step: 'Compile your knowledge first', detail: 'Run your documents through SILKLEARN. The result is a dependency graph with every concept ordered, every contradiction flagged, and every node linked to its source.' },
      { step: 'Enable MCP server', detail: 'With one toggle, your compiled workspace becomes an MCP server. Any AI tool that supports the Model Context Protocol can connect to it.' },
      { step: 'Install the skill or extension', detail: 'Install the SILKLEARN skill for your preferred tool — Cursor, Claude Desktop, GitHub Copilot, or Windsurf. The skill knows how to query your compiled workspace.' },
      { step: 'AI pulls compiled context', detail: 'When your AI agent needs context, it queries SILKLEARN instead of raw documents. It gets the minimum sufficient nodes — in dependency order — for whatever task it is working on.' },
      { step: 'Contradictions are already resolved', detail: 'By the time context reaches your AI, your team has already reviewed and resolved the contradictions in the source material. No silent inconsistencies in the prompt.' },
    ],
    faqs: [
      { question: 'What is MCP?', answer: 'Model Context Protocol is an open standard that lets AI clients (like Claude or Cursor) connect to external data sources and tools. When SILKLEARN exposes your compiled knowledge as an MCP server, your AI tools can query it directly — structured, ordered context instead of raw document retrieval.' },
      { question: 'Which AI tools will be supported?', answer: 'Any tool that supports MCP — Claude Desktop, Cursor, GitHub Copilot (via extensions), and Windsurf at launch. We are also building dedicated skills and plugins for each tool for the best integration experience.' },
      { question: 'When is this available?', answer: 'MCP integration is coming soon. Join the waitlist to be notified when it ships.' },
      { question: 'How is this different from giving an AI my documents directly?', answer: 'Raw documents give the AI too much or the wrong context. SILKLEARN\'s compiled version gives it the exact nodes required for the task, in dependency order, with contradictions already resolved. The AI reasons better because the context is better.' },
    ],
    comingSoon: true,
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
      'Joining a large, unfamiliar codebase is a reading problem before it\'s a coding problem. Your sources exist — but they don\'t tell you what order to read them in, which pieces conflict, or which assumptions you\'re supposed to already have. SILKLEARN reads that order directly from your sources and hands you a path, not a pile.',
    outcomes: [
      'Know what to read first — not because someone told you, but because the structure says so',
      'See where your sources contradict each other before you build on the wrong one',
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
    featureHref: '/features/canvas',
    guideHref: '/blog',
  },
  {
    slug: 'ai-context-preparation',
    title: "You're building AI workflows. Your agents need structured knowledge, not a retrieval guess.",
    metaTitle: 'Structured Knowledge Context for AI Agents and Workflows',
    description:
      'Feed any sources into SILKLEARN. It maps the dependency structure and hands your agent a context bundle it can actually reason across — ordered, reviewed, and linked to source.',
    summary:
      "Vector stores retrieve. They don't reason about what depends on what. When your agent needs to understand a domain — not just retrieve from it — the reading order and dependency structure matter. SILKLEARN hands your agent the synthesized structure a human already inspected.",
    outcomes: [
      'Dependency-ordered context your agent can traverse without RAG guesswork',
      'Every claim traced to its source — no hallucinated foundations',
      'Update your sources, re-synthesize, push a fresh context bundle to your workflow',
    ],
    featureHref: '/features/mcp-integration',
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
    featureHref: '/features/canvas',
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