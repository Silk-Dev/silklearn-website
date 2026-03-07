import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/product', '/how-it-works', '/features', '/use-cases', '/guides', '/waitlist'],
        disallow: ['/studio', '/api/'],
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
    host: getSiteUrl(),
  };
}