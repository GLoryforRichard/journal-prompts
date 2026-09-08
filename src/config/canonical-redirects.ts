import type { NextConfig } from 'next';

// Cloudflare overwrites X-Forwarded-Proto with the visitor's actual scheme.
// Configure this before middleware so sitemap.xml and other files are covered.
// OpenNext uses RegExp.test without implicit anchors for these conditions.
export const getCanonicalRedirects: NonNullable<
  NextConfig['redirects']
> = async () => [
  {
    source: '/:path*',
    has: [
      { type: 'host', value: '^journalprompts\\.org$' },
      { type: 'header', key: 'x-forwarded-proto', value: '^http$' },
    ],
    destination: 'https://journalprompts.org/:path*',
    permanent: true,
  },
];
