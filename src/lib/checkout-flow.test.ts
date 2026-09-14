import { PaymentTypes, PlanIntervals, type PricePlan } from '@/payment/types';
import { Routes } from '@/routes';
import { describe, expect, it } from 'vitest';
import {
  findCheckoutSelection,
  getCheckoutReturnPath,
  getPaymentDestination,
  getSafeReturnPath,
  isCheckoutSessionId,
} from './checkout-flow';

const plans: PricePlan[] = [
  {
    id: 'pro',
    isFree: false,
    isLifetime: false,
    prices: [
      {
        priceId: 'monthly',
        type: PaymentTypes.SUBSCRIPTION,
        interval: PlanIntervals.MONTH,
        amount: 999,
        currency: 'USD',
      },
      {
        priceId: 'yearly',
        type: PaymentTypes.SUBSCRIPTION,
        interval: PlanIntervals.YEAR,
        amount: 3999,
        currency: 'USD',
      },
    ],
  },
  {
    id: 'lifetime',
    isFree: false,
    isLifetime: true,
    prices: [
      {
        priceId: 'lifetime',
        type: PaymentTypes.ONE_TIME,
        amount: 4999,
        currency: 'USD',
      },
    ],
  },
];

describe('checkout intent and safe return paths', () => {
  it.each([
    'month',
    'year',
  ])('restores the exact %s selection after auth or cancel', (interval) => {
    for (const canceled of [false, true]) {
      const path = getCheckoutReturnPath('pro', interval, canceled);
      const url = new URL(path, 'https://example.test');
      expect(url.pathname).toBe(Routes.Pricing);
      expect(url.searchParams.get('checkout')).toBe(
        canceled ? 'canceled' : null
      );
      const selection = findCheckoutSelection(
        plans,
        url.searchParams.get('plan'),
        url.searchParams.get('interval')!
      );
      expect(selection?.price.priceId).toBe(
        interval === 'month' ? 'monthly' : 'yearly'
      );
    }
  });

  it('retains a one-time selection without inventing a renewal interval', () => {
    expect(getCheckoutReturnPath('lifetime', undefined, true)).toBe(
      '/pricing?plan=lifetime&checkout=canceled'
    );
    expect(
      findCheckoutSelection(plans, 'lifetime', 'year')?.price.priceId
    ).toBe('lifetime');
  });

  it('does not offer unknown, retired, disabled or unconfigured checkout selections', () => {
    expect(findCheckoutSelection(plans, 'unknown', 'year')).toBeNull();
    expect(
      findCheckoutSelection([{ ...plans[0], disabled: true }], 'pro', 'year')
    ).toBeNull();
    expect(
      findCheckoutSelection(
        [{ ...plans[0], prices: [{ ...plans[0].prices[1], disabled: true }] }],
        'pro',
        'year'
      )
    ).toBeNull();
    expect(
      findCheckoutSelection(
        [{ ...plans[0], prices: [{ ...plans[0].prices[1], priceId: '' }] }],
        'pro',
        'year'
      )
    ).toBeNull();
  });

  it.each([
    null,
    '',
    'https://example.com',
    '//example.com',
    '/\\example.com',
    'javascript:alert(1)',
    '/auth/login',
    '/settings/../auth/login',
    '/auth/%6cogin',
    '/en/auth/register?callbackUrl=/auth/login',
  ])('rejects an unsafe auth callback %s', (value) => {
    expect(getSafeReturnPath(value)).toBe(Routes.Dashboard);
  });

  it('preserves valid finder and checkout context', () => {
    expect(getSafeReturnPath('/find-your-prompt?scene=gratitude')).toBe(
      '/find-your-prompt?scene=gratitude'
    );
    expect(getSafeReturnPath('/pricing?plan=pro&interval=month')).toBe(
      '/pricing?plan=pro&interval=month'
    );
  });

  it('uses a known destination when payment callback is missing or untrusted', () => {
    expect(getPaymentDestination(null)).toBe(Routes.Dashboard);
    expect(getPaymentDestination('https://example.com')).toBe(Routes.Dashboard);
    expect(getPaymentDestination('javascript:alert(1)')).toBe(Routes.Dashboard);
    expect(getPaymentDestination(Routes.SettingsCredits)).toBe(
      Routes.SettingsCredits
    );
  });

  it('only polls a valid Stripe checkout session ID', () => {
    expect(isCheckoutSessionId(null)).toBe(false);
    expect(isCheckoutSessionId('not-a-session')).toBe(false);
    expect(isCheckoutSessionId('cs_test_owned123')).toBe(true);
    expect(isCheckoutSessionId('cs_live_owned123')).toBe(true);
  });
});
