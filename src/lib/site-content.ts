export type SiteMetric = {
  label: string;
  value: string;
};

export type SitePillar = {
  title: string;
  description: string;
};

export type SiteFaq = {
  question: string;
  answer: string;
};

export type HomePageContent = {
  kicker: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  metrics: SiteMetric[];
  pillars: SitePillar[];
  faq: SiteFaq[];
};

export const fallbackHomePageContent: HomePageContent = {
  kicker: 'Knowledge compilation for teams that need correct reasoning, not more raw docs.',
  headline: 'Compile messy source material into reviewable learning paths and context.',
  subheadline:
    'SILKLEARN parses, segments, links, and reconciles dense internal knowledge so teams can see what must be learned first, what depends on what, and what context a human or model actually needs.',
  primaryCtaLabel: 'Join the waitlist',
  primaryCtaHref: '#waitlist',
  secondaryCtaLabel: 'See how it works',
  secondaryCtaHref: '/how-it-works',
  metrics: [
    { label: 'Category', value: 'Knowledge compilation infrastructure' },
    { label: 'Core system', value: '5-pass compiler with review' },
    { label: 'Outputs', value: 'Learning paths, graphs, context bundles' },
  ],
  pillars: [
    {
      title: 'Compile usable structure from raw documents',
      description:
        'Turn long, assumption-heavy source material into coherent segments with provenance instead of leaving the structure trapped inside pages and experts.',
    },
    {
      title: 'Deliver minimum sufficient context',
      description:
        'Expose prerequisite logic so people and models get the right context in the right order instead of a pile of loosely related chunks.',
    },
    {
      title: 'Review compiled outputs before rollout',
      description:
        'Keep a human in the loop. Leaders inspect the graph, reconcile edge cases, and approve downstream artifacts before they become operational guidance.',
    },
  ],
  faq: [
    {
      question: 'Who is SILKLEARN for?',
      answer:
        'SILKLEARN is for engineering, product, operations, and compliance teams working from dense private knowledge where reasoning mistakes are expensive and manual structuring does not scale.',
    },
    {
      question: 'What makes this different from RAG or a course builder?',
      answer:
        'SILKLEARN does more than retrieve similar text or wrap documents in lessons. It compiles source material into dependency-aware, provenance-backed structure that can be reviewed before use.',
    },
    {
      question: 'What does a team actually get from the product?',
      answer:
        'The durable asset is a compiled knowledge graph. From that, teams can generate learning paths, onboarding flows, context bundles, and other reviewable artifacts grounded in the source material.',
    },
  ],
};