import { websiteConfig } from '@/config/website';
import { formatPrice } from '@/lib/formatter';
import { PlanIntervals } from '@/payment/types';

/**
 * One source for the facts that pages, FAQ answers, JSON-LD and llms.txt
 * repeat. Search engines and AI assistants quote whichever page they read,
 * so a changed limit or price must change everywhere at once.
 */
export const FREE_JOURNAL_LIMIT = 10;
export const FREE_DAILY_AI_PROMPTS = 3;
export const PAID_DAILY_AI_PROMPTS = 100;

export const SITE_NAME = 'Journal Prompts';
export const SITE_DOMAIN = 'journalprompts.org';

/** The month the facts below were last checked against the live product. */
export const FACTS_CHECKED = 'October 2026';

function planPrice(plan: 'pro' | 'lifetime', interval?: PlanIntervals) {
  const price = websiteConfig.price.plans[plan].prices.find(
    (item) => !item.disabled && (!interval || item.interval === interval)
  );
  return price ? `${formatPrice(price.amount, price.currency)} USD` : null;
}

export const sitePrices = {
  proMonthly: planPrice('pro', PlanIntervals.MONTH),
  proYearly: planPrice('pro', PlanIntervals.YEAR),
  lifetime: planPrice('lifetime'),
};

/** Sentences reused word for word across pages. */
export const siteFactSentences = {
  free: 'The prompts and the writing space are free, and you do not need an account or a card to start.',
  guestStorage:
    'Guest writing stays in this browser until you choose to save it to an account.',
  freeAccount: `A free account keeps ${FREE_JOURNAL_LIMIT} entries in the cloud so you can read them on any device.`,
  pro: `Pro${sitePrices.proMonthly ? ` (${sitePrices.proMonthly}/month)` : ''} keeps unlimited entries.`,
  notTherapy:
    'Journal prompts are for personal reflection; they are not therapy, diagnosis or treatment.',
  fiveMinutes:
    'Five minutes and a few honest sentences are enough for one entry.',
} as const;
