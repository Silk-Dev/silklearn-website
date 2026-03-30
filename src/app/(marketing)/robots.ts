import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/product', '/features', '/use-cases', '/blog', '/privacy', '/terms', '/eula', '/waitlist'],
        disallow: ['/studio', '/api/'],
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
    host: getSiteUrl(),
  };
}