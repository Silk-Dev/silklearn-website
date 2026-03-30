import { absoluteUrl, siteMetadata } from '@/lib/seo';
import type { SiteFaq } from '@/lib/site-content';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.siteName,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/silklearn/black-tr-text.svg'),
    description: siteMetadata.defaultDescription,
    knowsAbout: [
      'dependency-ordered learning paths',
      'knowledge decomposition',
      'team onboarding from source material',
      'leader-reviewed learning workflows',
    ],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.siteName,
    url: absoluteUrl('/'),
    description: siteMetadata.defaultDescription,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.siteName,
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteMetadata.siteName,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: absoluteUrl('/product'),
    description: siteMetadata.defaultDescription,
    featureList: [
      'Decompose source material into learning segments',
      'Map prerequisite dependencies across concepts',
      'Support leader review before rollout',
      'Generate structured learning paths from internal docs',
    ],
  };
}

export function getFaqPageSchema(faq: SiteFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getWebPageSchema({ title, description, url }: { title: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SILKLEARN',
      url: 'https://www.silklearn.io',
    },
  };
}

export function getArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    ...(dateModified && { dateModified }),
    ...(imageUrl && { image: imageUrl }),
    author: {
      '@type': 'Person',
      name: 'Jesser Bedoui',
      url: absoluteUrl('/about'),
    },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.siteName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/silklearn/black-tr-text.svg'),
      },
    },
  };
}