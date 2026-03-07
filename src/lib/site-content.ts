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
  kicker: 'Structured learning for teams that cannot afford guesswork.',
  headline: 'Turn dense knowledge into a learning path your team can actually follow.',
  subheadline:
    'SilkLearn decomposes internal docs, specs, and domain material into dependency-ordered steps so leaders can stop hand-building training plans from scratch.',
  primaryCtaLabel: 'Join the waitlist',
  primaryCtaHref: '#waitlist',
  secondaryCtaLabel: 'Open the studio',
  secondaryCtaHref: '/studio',
  metrics: [
    { label: 'Pipeline shape', value: '5-pass compiler' },
    { label: 'Primary input', value: 'Docs, specs, PDFs' },
    { label: 'Core output', value: 'Dependency-ordered learning path' },
  ],
  pillars: [
    {
      title: 'Decompose real source material',
      description:
        'Use the actual docs your team works from instead of inventing a parallel curriculum that drifts from reality.',
    },
    {
      title: 'Expose prerequisite logic',
      description:
        'Make the hidden order of concepts explicit so leaders can see what must be learned first and what can be skipped.',
    },
    {
      title: 'Review before rollout',
      description:
        'Keep a human in the loop. Leaders review, tweak, and approve the graph before a roadmap becomes team policy.',
    },
  ],
  faq: [
    {
      question: 'Who is SilkLearn for?',
      answer:
        'CEOs, CTOs, team leads, and operators who need a team fluent in complex private or public knowledge without manually designing every learning step.',
    },
    {
      question: 'What makes this different from a course builder?',
      answer:
        'The product starts from the source material and reconstructs dependency order. The graph is the product, not a slideshow wrapped around existing docs.',
    },
    {
      question: 'Why is the website wired to both Sanity and Postgres?',
      answer:
        'Sanity gives you fast editorial control for marketing content. Postgres supports operational data like waitlist capture without blocking on a separate backend.',
    },
  ],
};