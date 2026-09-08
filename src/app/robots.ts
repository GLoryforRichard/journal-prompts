import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/urls';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Crawlers need /_next/static CSS and JS to render public pages.
      // Include the route itself as well as descendants of private areas.
      disallow: [
        '/api/',
        '/settings',
        '/my-journal',
        '/auth/',
        '/admin/',
        '/payment',
      ],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
