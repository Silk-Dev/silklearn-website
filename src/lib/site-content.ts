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
  marks?: string[];
};

export type PortableTextBlock = {
  _type: 'block' | 'image';
  style?: string;
  listItem?: string;
  level?: number;
  children?: PortableTextSpan[];
  asset?: { _ref?: string; url?: string };
  alt?: string;
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
  description?: string;
  publishedAt: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
    alt?: string;
  };
  body: Array<PortableTextBlock | PortableTextCallout>;
};

export const fallbackHomePageContent: HomePageContent = {
  kicker: 'For researchers, developers, and anyone drowning in sources.',
  headline: 'Synthesize any source into structured knowledge.',
  subheadline:
    'SILKLEARN synthesizes your sources — not answers questions about them. It maps what depends on what, finds where sources contradict each other, and generates a path you can actually follow.',
  primaryCtaLabel: 'Request early access',
  primaryCtaHref: '/waitlist',
  secondaryCtaLabel: 'See how it works',
  secondaryCtaHref: '/product',
  metrics: [
    { label: 'Works for', value: 'Research papers, codebases, textbooks, onboarding docs, SOPs' },
    { label: 'Surfaces', value: 'What depends on what, what contradicts, and where to start' },
    { label: 'Unlike', value: 'NotebookLM or Perplexity — it synthesizes structure, not just answers' },
  ],
  pillars: [
    {
      title: 'Map the knowledge',
      description:
        'SILKLEARN reads your sources and maps the dependency structure — what concepts build on which, and what you need to understand before anything else makes sense.',
    },
    {
      title: 'Surface the conflicts',
      description:
        'When two sources disagree, SILKLEARN flags it. A single person has no team to catch contradictions — the system does it at ingest, not after you\'ve already internalized the wrong thing.',
    },
    {
      title: 'Build the path through it',
      description:
        'The output is a dependency-ordered sequence through your documents — not an answer to a query, but a structure that persists and guides everything you do with that knowledge.',
    },
  ],
  faq: [
    {
      question: 'Who is SILKLEARN for?',
      answer:
        'Researchers reconciling conflicting sources, developers navigating an unfamiliar codebase, students working from multiple textbooks, and professionals entering a new domain who need a path, not a pile.',
    },
    {
      question: 'How is this different from NotebookLM, Perplexity, or ChatGPT with PDFs?',
      answer:
        'Those tools answer questions about your sources. SILKLEARN synthesizes the structure of your sources. NotebookLM won\'t tell you that chapter 3 of one source contradicts section 2 of another — it answers whatever you ask. SILKLEARN runs at ingest: mapping prerequisites, detecting contradictions, and building a path that outlasts any individual query.',
    },
    {
      question: 'What do I actually get out of it?',
      answer:
        'A dependency-ordered path through your sources, a map of what connects to what, and a list of contradictions the system detected across your sources — so you know what to read first, and what to question.',
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
