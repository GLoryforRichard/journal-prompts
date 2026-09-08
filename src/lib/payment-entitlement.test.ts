import { describe, expect, it } from 'vitest';
import {
  type EntitlementPayment,
  paymentGrantsPremium,
} from './payment-entitlement';

describe('payment entitlement', () => {
  const now = new Date('2026-09-07T12:00:00Z');
  const active: EntitlementPayment = {
    paid: true,
    type: 'subscription',
    scene: 'subscription',
    status: 'active',
    periodEnd: new Date('2026-09-20T12:00:00Z'),
  };

  it('retains access throughout an already paid period', () => {
    expect(paymentGrantsPremium(active, now)).toBe(true);
  });

  it.each([
    'canceled',
    'past_due',
    'unpaid',
    'paused',
    'incomplete',
  ])('revokes access for a %s subscription that was previously paid', (status) =>
    expect(paymentGrantsPremium({ ...active, status }, now)).toBe(false));

  it('expires at the exact period boundary even if a cancellation webhook is late', () => {
    expect(paymentGrantsPremium({ ...active, periodEnd: now }, now)).toBe(
      false
    );
  });

  it('retains legacy active subscriptions that have no recorded period end', () => {
    expect(paymentGrantsPremium({ ...active, periodEnd: null }, now)).toBe(
      true
    );
  });

  it('requires successful payment and excludes purchases of credits', () => {
    expect(paymentGrantsPremium({ ...active, paid: false }, now)).toBe(false);
    expect(
      paymentGrantsPremium(
        { ...active, type: 'one_time', status: 'completed', scene: 'credit' },
        now
      )
    ).toBe(false);
  });

  it('honors a historical lifetime purchase without needing a current price', () => {
    expect(
      paymentGrantsPremium(
        {
          ...active,
          type: 'one_time',
          status: 'completed',
          scene: 'lifetime',
          periodEnd: null,
        },
        now
      )
    ).toBe(true);
  });

  it('does not extend an expired trial to a later period end', () => {
    expect(
      paymentGrantsPremium(
        { ...active, status: 'trialing', trialEnd: now },
        now
      )
    ).toBe(false);
  });
});
