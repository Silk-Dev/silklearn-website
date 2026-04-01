export type NavItem = {
  href: string;
  label: string;
};

export type FeaturePage = {
  slug: string;
  title: string;
  description: string;
  comingSoon?: boolean;
};

export type UseCasePage = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
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
  },
  {
    slug: 'canvas',
    title: 'The compiled structure, visible. Every edge inspectable before you follow it.',
    description:
      'A visual synthesis canvas where the compiled dependency graph lives. Review every node, trace every edge to its source, resolve contradictions with your team — before following the path.',
  },
  {
    slug: 'mcp-integration',
    title: 'Your compiled knowledge, available to every AI that asks for it.',
    description:
      'SILKLEARN becomes an MCP server. Any AI that supports Model Context Protocol — Claude, Cursor, Copilot — can pull dependency-ordered, contradiction-resolved knowledge from your compiled workspaces.',
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
  },
  {
    slug: 'internal-docs-training',
    title: 'You\'re working across multiple sources. They quietly disagree on the foundations.',
    metaTitle: 'Researcher Reconciling Multiple Sources on the Same Topic',
    description:
      'Upload the papers, reports, and sources you\'re working across. SILKLEARN maps which findings depend on which foundations, and surfaces where your sources contradict each other.',
  },
  {
    slug: 'ai-context-preparation',
    title: 'You\'re building AI workflows. Your agents need structured knowledge, not a retrieval guess.',
    metaTitle: 'Structured Knowledge Context for AI Agents and Workflows',
    description:
      'Feed any sources into SILKLEARN. It maps the dependency structure and hands your agent a context bundle it can actually reason across — ordered, reviewed, and linked to source.',
  },
];