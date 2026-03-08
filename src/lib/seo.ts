import type { Metadata } from 'next';

const siteName = 'SILKLEARN';
const defaultTitle = 'SILKLEARN | Compile Source Material Into Reviewable Learning Paths';
const defaultDescription =
  'SILKLEARN is knowledge compilation infrastructure for teams working from dense source material. It produces reviewable learning paths, dependency graphs, and context bundles from messy internal knowledge.';

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    return configuredUrl;
  }

  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (productionUrl) {
    return `https://${productionUrl}`;
  }

  const previewUrl = process.env.VERCEL_URL;

  if (previewUrl) {
    return `https://${previewUrl}`;
  }

  return 'http://localhost:3000';
}

export function absoluteUrl(path = '/') {
  return new URL(path, getSiteUrl()).toString();
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/'),
    title: defaultTitle,
    description: defaultDescription,
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
};

export const siteMetadata = {
  siteName,
  defaultTitle,
  defaultDescription,
};