import { Routes } from '@/routes';

const sources = [
  'home',
  'scene',
  'finder',
  'journal',
  'pricing',
  'billing',
  'auth',
  'payment',
  'other',
] as const;
const plans = ['free', 'pro', 'lifetime'] as const;
const intervals = ['month', 'year', 'lifetime'] as const;

export type FunnelSource = (typeof sources)[number];
type Plan = (typeof plans)[number];
type Interval = (typeof intervals)[number];
// `source` is an internal UI label. The sanitizer sends it as `entry_point`
// so a product entry point cannot be confused with GA acquisition sources.
type SourceParams = { source?: FunnelSource };
type PlanParams = SourceParams & { plan?: Plan; interval?: Interval };

export interface FunnelEventParams {
  finder_complete: SourceParams;
  prompt_selected: SourceParams & { prompt_kind?: 'curated' | 'ai' };
  writing_started: SourceParams & { prompt_kind?: 'curated' | 'ai' };
  journal_saved: SourceParams & { storage?: 'device' | 'cloud' };
  journal_completed: SourceParams & { storage?: 'device' | 'cloud' };
  account_save_clicked: SourceParams;
  device_import_viewed: { source?: 'journal' };
  device_import_completed: { source?: 'journal' };
  sign_up: { method?: 'email' | 'google' };
  view_pricing: SourceParams;
  select_plan: PlanParams;
  begin_checkout: PlanParams;
  checkout_error: PlanParams & {
    error_type?: 'request_failed' | 'missing_url' | 'validation' | 'unknown';
  };
  checkout_return: { status?: 'confirmed' | 'timeout' | 'error' };
}

export type FunnelEvent = keyof FunnelEventParams;

const parameterRules = {
  source: sources,
  plan: plans,
  interval: intervals,
  prompt_kind: ['curated', 'ai'],
  storage: ['device', 'cloud'],
  method: ['email', 'google'],
  error_type: ['request_failed', 'missing_url', 'validation', 'unknown'],
  status: ['confirmed', 'timeout', 'error'],
} as const;

const eventRules: Record<
  FunnelEvent,
  readonly (keyof typeof parameterRules)[]
> = {
  finder_complete: ['source'],
  prompt_selected: ['source', 'prompt_kind'],
  writing_started: ['source', 'prompt_kind'],
  journal_saved: ['source', 'storage'],
  journal_completed: ['source', 'storage'],
  account_save_clicked: ['source'],
  device_import_viewed: ['source'],
  device_import_completed: ['source'],
  sign_up: ['method'],
  view_pricing: ['source'],
  select_plan: ['source', 'plan', 'interval'],
  begin_checkout: ['source', 'plan', 'interval'],
  checkout_error: ['source', 'plan', 'interval', 'error_type'],
  checkout_return: ['status'],
};

// Only known public routes are retained. Never send arbitrary route segments,
// fragments, callback URLs, checkout IDs, or document titles.
const safePaths = new Set<string>([
  ...Object.values(Routes).map((path) => path.split('#')[0]),
  '/healing-journal-prompts',
  '/365-daily-journal-prompts',
  '/journal-prompt-generator',
  '/couples-journal-prompts',
  '/blog/page/2',
  '/blog/category/guides',
  '/blog/category/prompts',
  '/blog/category/tips',
  '/blog/category/wellness',
  '/blog/benefits-of-journaling-science',
  '/blog/gratitude-journal-prompts',
  '/blog/how-to-start-journaling',
  '/blog/journal-prompts-for-anxiety',
  '/blog/journal-prompts-for-kids',
  '/blog/morning-journal-routine',
  '/blog/shadow-work-journal-prompts-beginners',
]);

export function getSafeAnalyticsPath(pathname: string): string {
  const path = pathname.split(/[?#]/)[0].replace(/^\/en(?=\/|$)/, '') || '/';
  if (path.startsWith('/admin')) return '/admin';
  return safePaths.has(path) ? path : '/other';
}

export function getFunnelSource(
  pathname = typeof window === 'undefined' ? '/' : window.location.pathname
): FunnelSource {
  const path = getSafeAnalyticsPath(pathname);
  if (path === '/') return 'home';
  if (path === Routes.FindYourPrompt) return 'finder';
  if (path === Routes.Dashboard) return 'journal';
  if (path === Routes.Pricing) return 'pricing';
  if (path === Routes.SettingsBilling) return 'billing';
  if (path === Routes.Payment) return 'payment';
  if (path.startsWith('/auth/')) return 'auth';
  if (path.includes('journal-prompts') || path.startsWith('/blog/'))
    return 'scene';
  return 'other';
}

export function sanitizeFunnelParams(
  event: FunnelEvent,
  input: unknown
): Record<string, string> {
  if (!Object.hasOwn(eventRules, event) || !input || typeof input !== 'object')
    return {};

  const output: Record<string, string> = {};
  for (const key of eventRules[event]) {
    const value = (input as Record<string, unknown>)[key];
    const allowed: readonly string[] =
      key === 'source' &&
      (event === 'device_import_viewed' || event === 'device_import_completed')
        ? ['journal']
        : parameterRules[key];
    if (typeof value === 'string' && allowed.includes(value))
      output[key === 'source' ? 'entry_point' : key] = value;
  }
  return output;
}

type GoogleTag = (...args: unknown[]) => void;
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: GoogleTag;
};

let initialized = false;
let previousPage: string | undefined;
const sentKeys = new Set<string>();

export function isProductionAnalyticsHost(): boolean {
  return (
    typeof window !== 'undefined' &&
    process.env.NODE_ENV === 'production' &&
    ['journalprompts.org', 'www.journalprompts.org'].includes(
      window.location.hostname
    )
  );
}

function safeReferrer(): string {
  try {
    const url = new URL(document.referrer);
    if (
      !['http:', 'https:'].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.port
    )
      return '';
    if (['journalprompts.org', 'www.journalprompts.org'].includes(url.hostname))
      return `https://journalprompts.org${getSafeAnalyticsPath(url.pathname)}`;
    const host = url.hostname.replace(/^www\./, '');
    if (
      [
        'chatgpt.com',
        'chat.openai.com',
        'perplexity.ai',
        'claude.ai',
        'gemini.google.com',
        'copilot.microsoft.com',
        'copilot.com',
        'ecosia.org',
        'medium.com',
        'pinterest.com',
        'dev.to',
        'journalprompts-field-notes.blogspot.com',
        'indiehackers.com',
        'peerlist.io',
        'producthunt.com',
      ].includes(host)
    )
      return `https://${host}/`;
    if (/(^|\.)google\.[a-z.]+$/.test(url.hostname))
      return 'https://www.google.com/';
    if (/(^|\.)bing\.com$/.test(url.hostname)) return 'https://www.bing.com/';
    if (/(^|\.)duckduckgo\.com$/.test(url.hostname))
      return 'https://duckduckgo.com/';
    if (/(^|\.)search\.yahoo\.com$/.test(url.hostname))
      return 'https://search.yahoo.com/';
  } catch {
    // Missing or malformed referrers do not need to be recorded.
  }
  return '';
}

const campaignSources = new Set([
  'bing',
  'google',
  'duckduckgo',
  'yahoo',
  'ecosia',
  'chatgpt',
  'perplexity',
  'claude',
  'gemini',
  'copilot',
  'medium',
  'pinterest',
  'dev',
  'blogger',
  'indiehackers',
  'peerlist',
  'producthunt',
]);
const campaignMediums = new Set([
  'organic',
  'referral',
  'social',
  'ai-assistant',
]);

/**
 * Rebuild only fixed public attribution labels; never forward arbitrary query
 * text. No campaign names are approved in this repository yet, so utm_campaign,
 * utm_content, utm_term, IDs, and every other query parameter remain excluded.
 */
export function getSafeAnalyticsLocation(
  pathname: string,
  search = ''
): string {
  const location = `https://journalprompts.org${getSafeAnalyticsPath(pathname)}`;
  const input = new URLSearchParams(search);
  const sources = input.getAll('utm_source');
  const mediums = input.getAll('utm_medium');
  // Reject ambiguous duplicate labels and orphan mediums rather than guessing.
  if (sources.length !== 1 || !campaignSources.has(sources[0])) return location;
  if (mediums.length > 1) return location;
  const output = new URLSearchParams({ utm_source: sources[0] });
  if (mediums.length === 1 && campaignMediums.has(mediums[0]))
    output.set('utm_medium', mediums[0]);
  return `${location}?${output.toString()}`;
}

function pageContext() {
  return {
    page_location: getSafeAnalyticsLocation(
      window.location.pathname,
      window.location.search
    ),
    page_title: 'Journal Prompts',
    page_referrer: safeReferrer(),
  };
}

export function initializeGoogleAnalytics(): GoogleTag | undefined {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  if (!isProductionAnalyticsHost() || !id) return undefined;
  const browser = window as AnalyticsWindow;
  browser.dataLayer ??= [];
  browser.gtag ??= function () {
    // biome-ignore lint/complexity/noArguments: Google's documented gtag queue uses an Arguments object.
    browser.dataLayer?.push(arguments);
  };
  if (!initialized) {
    browser.gtag('js', new Date());
    browser.gtag('config', id, {
      ...pageContext(),
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    initialized = true;
  }
  return browser.gtag;
}

/** Manual page views require GA Enhanced Measurement history events disabled. */
export function trackPageView(): boolean {
  try {
    const gtag = initializeGoogleAnalytics();
    if (!gtag) return false;
    const context = pageContext();
    const path = getSafeAnalyticsPath(window.location.pathname);
    if (previousPage === path) return false;
    // Config scope overrides global `set`, so update it on route changes to
    // keep automatic engagement events on the current, sanitized page too.
    gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
      ...context,
      send_page_view: false,
    });
    gtag('event', 'page_view', context);
    previousPage = path;
    return true;
  } catch {
    return false;
  }
}

/**
 * Only fixed, non-sensitive labels can leave the browser. dedupeKey is local
 * memory only; use it for effect replays, never as an analytics parameter.
 * A successful return only means queued, not confirmed delivery to GA.
 */
export function trackFunnelEvent<Event extends FunnelEvent>(
  event: Event,
  params: FunnelEventParams[Event] = {},
  options: { dedupeKey?: string } = {}
): boolean {
  if (!Object.hasOwn(eventRules, event)) return false;
  try {
    const gtag = initializeGoogleAnalytics();
    if (!gtag) return false;
    const key = options.dedupeKey ? `${event}:${options.dedupeKey}` : undefined;
    if (key && sentKeys.has(key)) return false;
    gtag('event', event, {
      ...sanitizeFunnelParams(event, params),
      ...pageContext(),
    });
    if (key) {
      if (sentKeys.size >= 500)
        sentKeys.delete(sentKeys.values().next().value!);
      sentKeys.add(key);
    }
    return true;
  } catch {
    // A blocked or broken analytics script must never interrupt writing or pay.
    return false;
  }
}
