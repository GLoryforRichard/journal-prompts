import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/urls';

// Crawlers need /_next/static CSS and JS to render public pages.
// Include the route itself as well as descendants of private areas.
const disallow = [
  '/api/',
  '/settings',
  '/my-journal',
  '/auth/',
  '/admin/',
  '/payment',
];

// AI search and answer engines that cite pages. A crawler that finds a group
// naming it ignores the `*` group, so each group repeats the same rules.
const aiCrawlers = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: aiCrawlers, allow: '/', disallow },
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
