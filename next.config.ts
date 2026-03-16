import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development';

    const csp = [
      "default-src 'self'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.intercomcdn.com",
      "font-src 'self' https://fonts.gstatic.com https://fonts.intercomcdn.com data:",
      "img-src 'self' data: blob: https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://static.intercomcdn.com https://downloads.intercomcdn.com https://uploads.intercomusercontent.com https://js.intercomcdn.com https://static.intercomassets.com https://us.i.posthog.com https://us-assets.i.posthog.com",
      "frame-src 'self' https://widget.intercom.io",
      (
        isDevelopment
          ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:* https://www.googletagmanager.com https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://widget.intercom.io https://js.intercomcdn.com https://us.i.posthog.com https://us-assets.i.posthog.com"
          : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://widget.intercom.io https://js.intercomcdn.com https://us.i.posthog.com https://us-assets.i.posthog.com"
      ),
      (
        isDevelopment
          ? "connect-src 'self' http://localhost:* https://localhost:* ws://localhost:* wss://localhost:* https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://api-iam.intercom.io https://api.intercom.io https://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-a.intercom.io wss://nexus-websocket-b.intercom.io https://us.i.posthog.com https://us-assets.i.posthog.com https://internal-j.posthog.com"
          : "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://api-iam.intercom.io https://api.intercom.io https://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-a.intercom.io wss://nexus-websocket-b.intercom.io https://us.i.posthog.com https://us-assets.i.posthog.com https://internal-j.posthog.com"
      ),
      "media-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
    ].join('; ');

    return [
      {
        source: '/(.*)',
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
