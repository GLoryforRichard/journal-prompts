import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

let analytics: typeof import('./analytics');
let browser: {
  location: {
    hostname: string;
    pathname: string;
    search: string;
    hash: string;
  };
  dataLayer?: IArguments[];
  gtag?: (...args: unknown[]) => void;
};

beforeEach(async () => {
  vi.resetModules();
  vi.stubEnv('NODE_ENV', 'production');
  vi.stubEnv('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID', 'G-TESTONLY');
  browser = {
    location: {
      hostname: 'journalprompts.org',
      pathname: '/find-your-prompt',
      search: '?mood=private&topic=secret&email=person@example.org',
      hash: '#my-private-draft',
    },
  };
  vi.stubGlobal('window', browser);
  vi.stubGlobal('document', {
    title: 'My private journal entry',
    referrer: 'https://www.bing.com/search?q=my+private+search',
  });
  analytics = await import('./analytics');
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function calls() {
  return browser.dataLayer?.map((args) => Array.from(args)) ?? [];
}

describe('funnel analytics privacy', () => {
  it('allows only approved values and drops all unrecognized parameters', () => {
    expect(
      analytics.sanitizeFunnelParams('writing_started', {
        source: 'finder',
        prompt_kind: 'ai',
        mood: 'anxious',
        direction: 'private concern',
        prompt_id: 'ai-123',
        prompt_text: 'Private generated prompt',
        text: 'Private journal',
        userId: 'user-123',
        email: 'person@example.org',
        page_location: 'https://example.org/private',
      })
    ).toEqual({ source: 'finder', prompt_kind: 'ai' });
    expect(
      analytics.sanitizeFunnelParams('checkout_error', {
        source: 'user@example.org',
        plan: 'pro',
        interval: 'year',
        error_type: 'Failed for customer person@example.org',
        status: 'confirmed',
      })
    ).toEqual({ plan: 'pro', interval: 'year' });
  });

  it('does not let one event borrow parameters allowed for a different event', () => {
    expect(
      analytics.sanitizeFunnelParams('sign_up', {
        method: 'email',
        source: 'auth',
        plan: 'pro',
        status: 'confirmed',
      })
    ).toEqual({ method: 'email' });
  });

  it('rejects unknown events, including purchase and prototype keys', () => {
    expect(analytics.trackFunnelEvent('purchase' as never)).toBe(false);
    expect(analytics.trackFunnelEvent('__proto__' as never)).toBe(false);
    expect(calls()).toEqual([]);
  });

  it('uses only known paths and removes locale, query, fragment, and private IDs', () => {
    expect(
      analytics.getSafeAnalyticsPath('/en/pricing?interval=month#private')
    ).toBe('/pricing');
    expect(
      analytics.getSafeAnalyticsPath('/payment?session_id=cs_private')
    ).toBe('/payment');
    expect(analytics.getSafeAnalyticsPath('/blog/my-private-words')).toBe(
      '/other'
    );
    expect(analytics.getSafeAnalyticsPath('/admin/users/private-id')).toBe(
      '/admin'
    );
    expect(analytics.getFunnelSource('/my-journal?entry_id=private')).toBe(
      'journal'
    );
    expect(analytics.getFunnelSource('/daily-journal-prompts')).toBe('scene');
  });

  it('queues safe config before early interactions without loading extra scripts', () => {
    expect(
      analytics.trackFunnelEvent('finder_complete', { source: 'finder' })
    ).toBe(true);
    expect(calls().map(([command]) => command)).toEqual([
      'js',
      'config',
      'event',
    ]);
    const config = calls()[1][2] as Record<string, unknown>;
    expect(config).toMatchObject({
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: 'https://journalprompts.org/find-your-prompt',
      page_referrer: 'https://www.bing.com/',
      page_title: 'Journal Prompts',
    });
    expect(JSON.stringify(calls())).not.toMatch(
      /person@|private|secret|mood=|topic=/
    );
  });

  it('does not send arbitrary referrer hosts or their path/query strings', () => {
    vi.stubGlobal('document', {
      referrer: 'https://private-name.example.org/personal?token=secret',
    });
    analytics.trackPageView();
    const event = calls().find((call) => call[1] === 'page_view');
    expect(event?.[2]).toMatchObject({ page_referrer: '' });
  });

  it.each([
    'chatgpt.com',
    'gemini.google.com',
    'www.perplexity.ai',
  ])('keeps a known AI referrer origin without private conversation details: %s', (host) => {
    vi.stubGlobal('document', {
      referrer: `https://${host}/conversation/private-id?q=secret`,
    });
    analytics.trackPageView();
    const event = calls().find((call) => call[1] === 'page_view');
    expect(event?.[2]).toMatchObject({
      page_referrer: `https://${host.replace(/^www\./, '')}/`,
    });
    expect(JSON.stringify(calls())).not.toMatch(/private-id|secret/);
  });
});

describe('analytics delivery guards and deduplication', () => {
  it('does not run in development, preview hosts, or without a GA ID', () => {
    vi.stubEnv('NODE_ENV', 'development');
    expect(analytics.trackFunnelEvent('view_pricing')).toBe(false);
    vi.stubEnv('NODE_ENV', 'production');
    browser.location.hostname = 'localhost';
    expect(analytics.trackFunnelEvent('view_pricing')).toBe(false);
    browser.location.hostname = 'preview.example.org';
    expect(analytics.trackPageView()).toBe(false);
    browser.location.hostname = 'journalprompts.org';
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID', '');
    expect(analytics.trackFunnelEvent('view_pricing')).toBe(false);
    expect(calls()).toEqual([]);
  });

  it('initializes once and emits one page view per pathname navigation', () => {
    expect(analytics.trackPageView()).toBe(true);
    expect(analytics.trackPageView()).toBe(false);
    browser.location.search = '?mood=different';
    expect(analytics.trackPageView()).toBe(false);
    browser.location.pathname = '/pricing';
    expect(analytics.trackPageView()).toBe(true);
    browser.location.pathname = '/find-your-prompt';
    expect(analytics.trackPageView()).toBe(true);
    expect(calls().filter((call) => call[0] === 'js')).toHaveLength(1);
    expect(calls().filter((call) => call[0] === 'config')).toHaveLength(4);
    expect(calls().filter((call) => call[1] === 'page_view')).toHaveLength(3);
  });

  it('deduplicates only the matching local event key and never transmits it', () => {
    const options = { dedupeKey: 'local-private-id' };
    expect(analytics.trackFunnelEvent('writing_started', {}, options)).toBe(
      true
    );
    expect(analytics.trackFunnelEvent('writing_started', {}, options)).toBe(
      false
    );
    expect(analytics.trackFunnelEvent('journal_saved', {}, options)).toBe(true);
    expect(analytics.trackFunnelEvent('writing_started')).toBe(true);
    expect(calls().filter((call) => call[0] === 'event')).toHaveLength(3);
    expect(JSON.stringify(calls())).not.toContain('local-private-id');
  });

  it('does not interrupt product actions if analytics throws', () => {
    browser.gtag = () => {
      throw new Error('Blocked by browser');
    };
    expect(() => analytics.trackFunnelEvent('begin_checkout')).not.toThrow();
    expect(analytics.trackFunnelEvent('begin_checkout')).toBe(false);
  });
});
