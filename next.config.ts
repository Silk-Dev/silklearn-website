import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/for-whom',
        destination: '/use-cases',
        permanent: false,
      },
      {
        source: '/pricing',
        destination: '/waitlist',
        permanent: false,
      },
      {
        source: '/vision',
        destination: '/product',
        permanent: false,
      },
      {
        source: '/deep-dive',
        destination: '/how-it-works',
        permanent: false,
      },
      {
        source: '/paper',
        destination: '/how-it-works',
        permanent: false,
      },
      {
        source: '/talk-to-us',
        destination: '/waitlist',
        permanent: false,
      },
      {
        source: '/news',
        destination: '/blog',
        permanent: false,
      },
      {
        source: '/news/:path*',
        destination: '/blog',
        permanent: false,
      },
      {
        source: '/guides',
        destination: '/blog',
        permanent: false,
      },
      {
        source: '/guides/:path*',
        destination: '/blog',
        permanent: false,
      },
    ];
  },
  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development';

    const posthogHosts = [
      'https://us.i.posthog.com',
      'https://us-assets.i.posthog.com',
      'https://eu.i.posthog.com',
      'https://eu-assets.i.posthog.com',
      'https://internal-j.posthog.com',
    ].join(' ');

    const intercomFrameHosts = [
      'https://widget.intercom.io',
      'https://js.intercomcdn.com',
      'https://*.intercom.io',
      'https://*.intercomcdn.com',
      'https://*.intercomusercontent.com',
      'https://*.intercomassets.com',
    ].join(' ');

    const csp = [
      "default-src 'self'",
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.intercomcdn.com ${posthogHosts}`,
      "font-src 'self' https://fonts.gstatic.com https://fonts.intercomcdn.com data:",
      `img-src 'self' data: blob: https://cdn.sanity.io https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://static.intercomcdn.com https://downloads.intercomcdn.com https://uploads.intercomusercontent.com https://js.intercomcdn.com https://static.intercomassets.com https://*.intercomcdn.com https://*.intercomusercontent.com https://*.intercomassets.com ${posthogHosts}`,
      `frame-src 'self' ${intercomFrameHosts}`,
      (
        isDevelopment
          ? `script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:* https://www.googletagmanager.com https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://widget.intercom.io https://js.intercomcdn.com https://*.intercomcdn.com ${posthogHosts}`
          : `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://widget.intercom.io https://js.intercomcdn.com https://*.intercomcdn.com ${posthogHosts}`
      ),
      (
        isDevelopment
          ? `connect-src 'self' http://localhost:* https://localhost:* ws://localhost:* wss://localhost:* https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://api-iam.intercom.io https://api.intercom.io https://*.intercom.io https://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-a.intercom.io wss://nexus-websocket-b.intercom.io ${posthogHosts}`
          : `connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://api-iam.intercom.io https://api.intercom.io https://*.intercom.io https://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-a.intercom.io wss://nexus-websocket-b.intercom.io ${posthogHosts}`
      ),
      "media-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
    ].join('; ');

    return [
      {
        source: '/((?!studio).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
