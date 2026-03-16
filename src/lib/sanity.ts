import { createClient } from 'next-sanity';

import {
  fallbackHomePageContent,
  fallbackPosts,
  type HomePageContent,
  type MarketingPost,
  type MarketingPostCategory,
} from '@/lib/site-content';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const isSanityConfigured = Boolean(projectId && dataset);

const sanityClient = createClient({
  projectId: projectId ?? 'placeholder',
  dataset: dataset ?? 'production',
  apiVersion: '2026-03-16',
  useCdn: true,
});

const homePageQuery = `*[_type == "homePage"][0]{
  kicker,
  headline,
  subheadline,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  metrics[]{label, value},
  pillars[]{title, description},
  faq[]{question, answer}
}`;

const postsByCategoryQuery = `*[_type == "post" && category == $category] | order(publishedAt desc){
  title,
  "slug": slug.current,
  category,
  eyebrow,
  excerpt,
  publishedAt,
  author,
  featured,
  body
}`;

const postBySlugQuery = `*[_type == "post" && category == $category && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  category,
  eyebrow,
  excerpt,
  publishedAt,
  author,
  featured,
  body
}`;

function mergeHomePageContent(content: Partial<HomePageContent> | null): HomePageContent {
  if (!content) {
    return fallbackHomePageContent;
  }

  return {
    kicker: content.kicker || fallbackHomePageContent.kicker,
    headline: content.headline || fallbackHomePageContent.headline,
    subheadline: content.subheadline || fallbackHomePageContent.subheadline,
    primaryCtaLabel: content.primaryCtaLabel || fallbackHomePageContent.primaryCtaLabel,
    primaryCtaHref: content.primaryCtaHref || fallbackHomePageContent.primaryCtaHref,
    secondaryCtaLabel: content.secondaryCtaLabel || fallbackHomePageContent.secondaryCtaLabel,
    secondaryCtaHref: content.secondaryCtaHref || fallbackHomePageContent.secondaryCtaHref,
    metrics:
      content.metrics && content.metrics.length > 0
        ? content.metrics
        : fallbackHomePageContent.metrics,
    pillars:
      content.pillars && content.pillars.length > 0
        ? content.pillars
        : fallbackHomePageContent.pillars,
    faq: content.faq && content.faq.length > 0 ? content.faq : fallbackHomePageContent.faq,
  };
}

function mergePosts(content: MarketingPost[] | null, category: MarketingPostCategory) {
  if (!content || content.length === 0) {
    return fallbackPosts.filter((post) => post.category === category);
  }

  return content;
}

export async function getHomePageContent(): Promise<HomePageContent> {
  if (!isSanityConfigured) {
    return fallbackHomePageContent;
  }

  try {
    const content = await sanityClient.fetch<Partial<HomePageContent> | null>(homePageQuery);

    return mergeHomePageContent(content);
  } catch {
    return fallbackHomePageContent;
  }
}

export async function getPostsByCategory(
  category: MarketingPostCategory,
): Promise<MarketingPost[]> {
  if (!isSanityConfigured) {
    return fallbackPosts.filter((post) => post.category === category);
  }

  try {
    const content = await sanityClient.fetch<MarketingPost[] | null>(postsByCategoryQuery, {
      category,
    });

    return mergePosts(content, category);
  } catch {
    return fallbackPosts.filter((post) => post.category === category);
  }
}

export async function getPostBySlug(
  category: MarketingPostCategory,
  slug: string,
): Promise<MarketingPost | null> {
  if (!isSanityConfigured) {
    return (
      fallbackPosts.find((post) => post.category === category && post.slug === slug) ?? null
    );
  }

  try {
    const content = await sanityClient.fetch<MarketingPost | null>(postBySlugQuery, {
      category,
      slug,
    });

    if (!content) {
      return null;
    }

    return content;
  } catch {
    return fallbackPosts.find((post) => post.category === category && post.slug === slug) ?? null;
  }
}
