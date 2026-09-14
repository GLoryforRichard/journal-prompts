import { PaymentTypes, type Price, type PricePlan } from '@/payment/types';
import { Routes } from '@/routes';

/** Keep the chosen plan through authentication and a canceled Stripe checkout. */
export function getCheckoutReturnPath(
  planId: string,
  interval?: string,
  canceled = false
): string {
  const params = new URLSearchParams({ plan: planId });
  if (interval === 'month' || interval === 'year') {
    params.set('interval', interval);
  }
  if (canceled) params.set('checkout', 'canceled');
  return `${Routes.Pricing}?${params.toString()}`;
}

export function findCheckoutSelection(
  plans: PricePlan[],
  planId: string | null,
  interval: string
): { plan: PricePlan; price: Price } | null {
  const plan = plans.find(
    (item) => item.id === planId && !item.isFree && !item.disabled
  );
  const price = plan?.prices.find(
    (item) =>
      !item.disabled &&
      !!item.priceId &&
      (item.type === PaymentTypes.ONE_TIME || item.interval === interval)
  );
  return plan && price ? { plan, price } : null;
}

/** Payment completion only navigates to one of our known account destinations. */
export function getPaymentDestination(callback: string | null): string {
  return callback === Routes.SettingsCredits ||
    callback === Routes.SettingsBilling
    ? callback
    : Routes.Dashboard;
}

export function isCheckoutSessionId(value: string | null): value is string {
  return !!value && /^cs_(?:test_|live_)?[A-Za-z0-9]{1,250}$/.test(value);
}

/** Auth links can preserve a local destination without becoming open redirects. */
export function getSafeReturnPath(
  value: string | null | undefined,
  fallback: string = Routes.Dashboard
): string {
  if (
    !value?.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\') ||
    Array.from(value).some(
      (char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127
    )
  ) {
    return fallback;
  }
  try {
    const url = new URL(value, 'https://callback.invalid');
    const pathname = decodeURIComponent(url.pathname);
    if (
      url.origin !== 'https://callback.invalid' ||
      pathname.startsWith('//') ||
      pathname.includes('\\') ||
      /^\/(?:[a-z]{2}\/)?auth(?:\/|$)/i.test(pathname)
    ) {
      return fallback;
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
