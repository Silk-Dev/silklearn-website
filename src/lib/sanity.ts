import { createClient } from 'next-sanity';

import {
  fallbackPosts,
  type MarketingPost,
  type MarketingPostCategory,
} from '@/lib/site-content';

/**
 * Append Sanity CDN image transform parameters to a raw asset URL.
 * Returns the original URL unchanged if it doesn't point to cdn.sanity.io.
 */
export function sanityImageUrl(
  url: string,
  width: number,
  height: number,
  options?: { quality?: number; fit?: string; format?: string },
): string {
  if (!url || !url.includes('cdn.sanity.io')) return url;

  const q = options?.quality ?? 80;
  const fit = options?.fit ?? 'crop';
  const fm = options?.format ?? 'webp';

  const base = url.split('?')[0];
  return `${base}?w=${width}&h=${height}&fm=${fm}&fit=${fit}&q=${q}`;
}

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

// Only accept values that match Sanity's allowed format (a-z, 0-9, dashes)
const projectId = rawProjectId && /^[a-z0-9-]+$/.test(rawProjectId) ? rawProjectId : undefined;
const dataset = rawDataset || undefined;

export const isSanityConfigured = Boolean(projectId && dataset);

const sanityClient = createClient({
  projectId: projectId ?? 'placeholder',
  dataset: dataset ?? 'production',
  apiVersion: '2026-03-27',
  useCdn: false,
});

const allPostsQuery = `*[_type == "post"] | order(publishedAt desc){
  title,
  "slug": slug.current,
  category,
  eyebrow,
  excerpt,
  description,
  publishedAt,
  author,
  featured,
  tags,
  "mainImage": mainImage{asset->{url}, alt},
  body
}`;

const postsByCategoryQuery = `*[_type == "post" && category == $category] | order(publishedAt desc){
  title,
  "slug": slug.current,
  category,
  eyebrow,
  excerpt,
  description,
  publishedAt,
  author,
  featured,
  tags,
  "mainImage": mainImage{asset->{url}, alt},
  body
}`;

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  category,
  eyebrow,
  excerpt,
  description,
  publishedAt,
  author,
  featured,
  tags,
  "mainImage": mainImage{asset->{url}, alt},
  body
}`;

function mergePosts(content: MarketingPost[] | null, category: MarketingPostCategory) {
  if (!content || content.length === 0) {
    return fallbackPosts.filter((post) => post.category === category);
  }

  return content;
}

export async function getAllPosts(): Promise<MarketingPost[]> {
  if (!isSanityConfigured) {
    return fallbackPosts;
  }

  try {
    const content = await sanityClient.fetch<MarketingPost[] | null>(allPostsQuery);

    if (!content || content.length === 0) {
      return fallbackPosts;
    }

    return content;
  } catch {
    return fallbackPosts;
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

export async function getPostBySlug(slug: string): Promise<MarketingPost | null> {
  if (!isSanityConfigured) {
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }

  try {
    const content = await sanityClient.fetch<MarketingPost | null>(postBySlugQuery, {
      slug,
    });

    if (!content) {
      return null;
    }

    return content;
  } catch {
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }
}
