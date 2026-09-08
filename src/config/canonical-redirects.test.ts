import type { NextConfig } from 'next';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { Script } from 'node:vm';
import {
  getRedirectUrl,
  unstable_getResponseFromNextConfig,
} from 'next/experimental/testing/server';
import { describe, expect, it } from 'vitest';
import { getCanonicalRedirects } from './canonical-redirects';

const nextConfig: NextConfig = { redirects: getCanonicalRedirects };

// Exercise the installed adapter's own condition matcher: unlike Next's test
// helper, OpenNext 3.9.16 does not add regex anchors around has.value.
const require = createRequire(import.meta.url);
const cloudflareRequire = createRequire(
  require.resolve('@opennextjs/cloudflare')
);
const adapterSource = readFileSync(
  cloudflareRequire.resolve('@opennextjs/aws/core/routing/matcher.js'),
  'utf8'
);
const matcherStart = adapterSource.indexOf('const routeHasMatcher =');
const matcherEnd = adapterSource.indexOf('\nfunction checkHas', matcherStart);
if (matcherStart === -1 || matcherEnd === -1) {
  throw new Error(
    'OpenNext condition matcher changed; update this compatibility test.'
  );
}
const adapterMatcher: (
  headers: Record<string, string>,
  cookies: object,
  query: object
) => (condition: { type: string; key?: string; value?: string }) => boolean =
  new Script(
    `${adapterSource.slice(matcherStart, matcherEnd)}\nrouteHasMatcher`
  ).runInNewContext({}, { timeout: 1000 });

describe('Cloudflare production HTTPS redirects', () => {
  it.each([
    ['journalprompts.org', 'http', true],
    ['journalprompts.org', 'https', false],
    ['journalprompts.org', 'http,https', false],
    ['preview.journalprompts.org', 'http', false],
    ['journalprompts.org.example.com', 'http', false],
  ] as const)('matches host %s and protocol %s correctly in the actual OpenNext adapter', async (host, protocol, expected) => {
    const [redirect] = await getCanonicalRedirects();
    const matches = adapterMatcher(
      { host, 'x-forwarded-proto': protocol },
      {},
      {}
    );
    expect(redirect.has?.every(matches)).toBe(expected);
  });

  it.each([
    '/',
    '/daily-journal-prompts',
    '/sitemap.xml',
    '/robots.txt',
    '/auth/login?callbackUrl=%2Fmy-journal',
  ])('permanently redirects HTTP %s while preserving its path and query', async (path) => {
    const response = await unstable_getResponseFromNextConfig({
      url: `http://journalprompts.org${path}`,
      headers: { host: 'journalprompts.org', 'x-forwarded-proto': 'http' },
      nextConfig,
    });
    expect(response.status).toBe(308);
    expect(getRedirectUrl(response)).toBe(`https://journalprompts.org${path}`);
  });

  it('does not loop for HTTPS visitors through the proxy', async () => {
    const response = await unstable_getResponseFromNextConfig({
      url: 'https://journalprompts.org/daily-journal-prompts',
      headers: { host: 'journalprompts.org', 'x-forwarded-proto': 'https' },
      nextConfig,
    });
    expect(getRedirectUrl(response)).toBeNull();
  });

  it.each([
    'localhost:3000',
    '127.0.0.1:3000',
    'preview.workers.dev',
    'journalpromptsXorg',
  ])('leaves %s unchanged', async (host) => {
    const response = await unstable_getResponseFromNextConfig({
      url: `http://${host}/pricing`,
      headers: { host, 'x-forwarded-proto': 'http' },
      nextConfig,
    });
    expect(getRedirectUrl(response)).toBeNull();
  });
});
