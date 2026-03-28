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

export type PortableTextSpan = {
  _type: 'span';
  text: string;
};

export type PortableTextBlock = {
  _type: 'block';
  style?: string;
  children?: PortableTextSpan[];
};

export type PortableTextCallout = {
  _type: 'callout';
  title?: string;
  body?: string;
};

export type MarketingPostCategory = 'blog';

export type MarketingPost = {
  title: string;
  slug: string;
  category: MarketingPostCategory;
  eyebrow?: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
  body: Array<PortableTextBlock | PortableTextCallout>;
};

export const fallbackHomePageContent: HomePageContent = {
  kicker: 'For teams that work from big docs.',
  headline: 'Turn long docs into a clear path your team can follow.',
  subheadline:
    'SILKLEARN reads your docs, puts the steps in order, and shows leaders what to approve before people or AI use it.',
  primaryCtaLabel: 'Request early access',
  primaryCtaHref: '#waitlist',
  secondaryCtaLabel: 'See how it works',
  secondaryCtaHref: '/how-it-works',
  metrics: [
    { label: 'Start with', value: 'PDFs, specs, SOPs, handbooks, and notes you already have' },
    { label: 'Get back', value: 'A clear path, a map of key links, and reviewed context for AI' },
    { label: 'Best for', value: 'Teams that lose time when steps are out of order' },
  ],
  pillars: [
    {
      title: 'Show what comes first',
      description:
        'SILKLEARN puts your docs in the right order, so people can see what they need to learn first.',
    },
    {
      title: 'Use one approved source',
      description:
        'Your team, your rollout, and your AI can all use the same reviewed structure.',
    },
    {
      title: 'Keep leaders in control',
      description:
        'Leaders can check the path, fix mistakes, and approve it before anyone uses it.',
    },
  ],
  faq: [
    {
      question: 'Who is SILKLEARN for?',
      answer:
        'It is for teams with a lot of docs. It helps leaders turn those docs into a path people can follow.',
    },
    {
      question: 'How is this different from RAG, search, or a course builder?',
      answer:
        'Search helps after a question. Course tools need manual setup. SILKLEARN starts with your docs and builds the order for you.',
    },
    {
      question: 'What does a team actually get?',
      answer:
        'Your team gets a clear learning path, a map of what connects, and a reviewed context pack for AI.',
    },
  ],
};

export const fallbackPosts: MarketingPost[] = [
  {
    title: 'Why knowledge compilation matters more than another AI wrapper',
    slug: 'why-knowledge-compilation-matters',
    category: 'blog',
    eyebrow: 'Blog',
    tags: ['research'],
    excerpt:
      'SILKLEARN is strongest when it acts as structure-first knowledge infrastructure, not a thin layer over retrieval or generic summarization.',
    publishedAt: '2026-03-16T09:00:00.000Z',
    author: 'SILKLEARN',
    featured: true,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Most AI products stop at retrieval or repackaging. SILKLEARN gets more valuable when it exposes the structure inside knowledge: what depends on what, what conflicts, and what should happen downstream.',
          },
        ],
      },
      {
        _type: 'callout',
        title: 'Core thesis',
        body: 'The durable asset is not the answer. It is the compiled structure that makes better answers, roadmaps, audits, and context bundles possible.',
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'That is why the website should eventually support essays, product notes, and deeper articulation of the synthesis/canvas thesis through Sanity-backed publishing.',
          },
        ],
      },
    ],
  },
];
