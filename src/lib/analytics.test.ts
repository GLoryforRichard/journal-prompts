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
    ).toEqual({ entry_point: 'finder', prompt_kind: 'ai' });
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

  it('accepts completion and account-save labels without journal contents', () => {
    expect(
      analytics.sanitizeFunnelParams('journal_completed', {
        source: 'scene',
        storage: 'device',
        text: 'A private journal entry',
        prompt_text: 'A private question',
        entry_id: 'entry-private',
        word_count: 400,
      })
    ).toEqual({ entry_point: 'scene', storage: 'device' });
    expect(
      analytics.sanitizeFunnelParams('account_save_clicked', {
        source: 'finder',
        storage: 'cloud',
        email: 'person@example.org',
      })
    ).toEqual({ entry_point: 'finder' });
    expect(
      analytics.sanitizeFunnelParams('journal_completed', {
        source: 'person@example.org',
        storage: 'private-device-name',
      })
    ).toEqual({});
  });

  it.each([
    'device_import_viewed',
    'device_import_completed',
  ] as const)('restricts %s to the journal source without importing private metadata', (event) => {
    expect(
      analytics.sanitizeFunnelParams(event, {
        source: 'journal',
        device_id: 'private-device',
        entries: [{ text: 'Private entry' }],
        count: 12,
        storage: 'cloud',
      })
    ).toEqual({ entry_point: 'journal' });
    expect(analytics.sanitizeFunnelParams(event, { source: 'home' })).toEqual(
      {}
    );
    expect(analytics.trackFunnelEvent(event, { source: 'journal' })).toBe(true);
    expect(calls().find((call) => call[1] === event)?.[2]).toMatchObject({
      entry_point: 'journal',
    });
  });

  it('keeps funnel entry points separate from acquisition through navigation', () => {
    browser.location.search = '?utm_source=medium&utm_medium=referral';
    analytics.trackPageView();
    analytics.trackFunnelEvent('prompt_selected', {
      source: 'finder',
      prompt_kind: 'curated',
    });
    browser.location.pathname = '/pricing';
    browser.location.search = '';
    analytics.trackPageView();
    analytics.trackFunnelEvent('select_plan', {
      source: 'pricing',
      plan: 'pro',
      interval: 'month',
    });

    expect(calls().find((call) => call[1] === 'prompt_selected')?.[2]).toEqual({
      entry_point: 'finder',
      prompt_kind: 'curated',
      page_location:
        'https://journalprompts.org/find-your-prompt?utm_source=medium&utm_medium=referral',
      page_title: 'Journal Prompts',
      page_referrer: 'https://www.bing.com/',
    });
    expect(
      calls().find((call) => call[1] === 'select_plan')?.[2]
    ).toMatchObject({
      entry_point: 'pricing',
      plan: 'pro',
      interval: 'month',
      page_location: 'https://journalprompts.org/pricing',
    });
    for (const call of calls().filter(([command]) => command !== 'js')) {
      expect(call[2]).not.toHaveProperty('source');
      expect(call[2]).not.toHaveProperty('medium');
      expect(call[2]).not.toHaveProperty('campaign_source');
      expect(call[2]).not.toHaveProperty('campaign_medium');
    }
  });

  it('does not accept direct attribution or free-text entry-point overrides', () => {
    expect(
      analytics.sanitizeFunnelParams('writing_started', {
        source: 'scene',
        entry_point: 'person@example.org',
        campaign_source: 'home',
        campaign_medium: 'private',
        medium: 'private',
      })
    ).toEqual({ entry_point: 'scene' });
    expect(
      analytics.sanitizeFunnelParams('writing_started', {
        entry_point: 'person@example.org',
      })
    ).toEqual({});
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

  it.each(
    [
      'medium.com',
      'pinterest.com',
      'dev.to',
      'journalprompts-field-notes.blogspot.com',
      'indiehackers.com',
      'peerlist.io',
      'producthunt.com',
      'ecosia.org',
      'copilot.com',
    ].flatMap((host) => [host, `www.${host}`])
  )('retains the public referral origin for %s', (host) => {
    vi.stubGlobal('document', {
      referrer: `https://${host}/private-person/private-draft?email=person@example.org#secret`,
    });
    analytics.trackPageView();
    expect(calls().find((call) => call[1] === 'page_view')?.[2]).toMatchObject({
      page_referrer: `https://${host.replace(/^www\./, '')}/`,
    });
    expect(JSON.stringify(calls())).not.toMatch(/private|person@|secret/);
  });

  it.each([
    'https://private-person.medium.com/draft',
    'https://private-person.blogspot.com/draft',
    'https://pinterest.com.private-person.example/draft',
    'https://medium.com@private-person.example/draft',
    'https://private-person:secret@medium.com/draft',
    'https://medium.com:8443/draft',
    'ftp://medium.com/draft',
    'not a URL with private words',
  ])('drops unapproved origins or malformed referrers: %s', (referrer) => {
    vi.stubGlobal('document', { referrer });
    analytics.trackPageView();
    expect(calls().find((call) => call[1] === 'page_view')?.[2]).toMatchObject({
      page_referrer: '',
    });
  });

  it('retains only controlled source and medium labels from campaign links', () => {
    browser.location.pathname = '/en/daily-journal-prompts';
    browser.location.search =
      '?utm_source=pinterest&utm_medium=social&utm_campaign=private-person&utm_content=private-journal&utm_term=secret&email=person@example.org&entry_id=private-id';
    analytics.trackPageView();
    analytics.trackFunnelEvent('journal_completed', {
      source: 'scene',
      storage: 'device',
    });
    const expectedLocation =
      'https://journalprompts.org/daily-journal-prompts?utm_source=pinterest&utm_medium=social';
    for (const call of calls().filter(([command]) => command !== 'js')) {
      expect(call[2]).toMatchObject({ page_location: expectedLocation });
    }
    expect(JSON.stringify(calls())).not.toMatch(
      /private|secret|person@|utm_campaign|utm_content|utm_term|entry_id/
    );
  });

  it.each([
    '?utm_source=private-person&utm_medium=referral',
    '?utm_medium=social',
    '?utm_source=medium&utm_source=private-person&utm_medium=referral',
    '?utm_source=medium&utm_medium=referral&utm_medium=private-person',
    '?utm_source=medium%00private-person&utm_medium=referral',
    '?utm_source=https%3A%2F%2Fmedium.com%2Fprivate-person',
    '?utm_campaign=sanitized&utm_content=safe&utm_term=approved',
  ])('rejects unknown, duplicate, or free-text attribution: %s', (search) => {
    expect(analytics.getSafeAnalyticsLocation('/pricing', search)).toBe(
      'https://journalprompts.org/pricing'
    );
  });

  it('supports a known source alone and drops an unapproved medium', () => {
    expect(
      analytics.getSafeAnalyticsLocation(
        '/payment?session_id=private',
        '?utm_source=bing&utm_medium=private-person&session_id=private'
      )
    ).toBe('https://journalprompts.org/payment?utm_source=bing');
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

  it('does not count campaign query changes as another page view', () => {
    browser.location.search = '?utm_source=medium&utm_medium=referral';
    expect(analytics.trackPageView()).toBe(true);
    browser.location.search = '?utm_source=pinterest&utm_medium=social';
    expect(analytics.trackPageView()).toBe(false);
    browser.location.pathname = '/pricing';
    browser.location.search = '';
    expect(analytics.trackPageView()).toBe(true);
    expect(calls().filter((call) => call[1] === 'page_view')).toHaveLength(2);
    expect(calls().at(-1)?.[2]).toMatchObject({
      page_location: 'https://journalprompts.org/pricing',
    });
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
