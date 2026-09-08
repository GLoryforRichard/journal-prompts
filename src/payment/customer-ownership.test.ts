import { describe, expect, it } from 'vitest';
import { ownsStripeCustomer } from './customer-ownership';

describe('billing portal ownership', () => {
  const identity = {
    userId: 'user_current',
    customerEmail: 'owner@example.com',
    emailVerified: false,
    hasPaymentHistory: false,
  };

  it('rejects an arbitrary stored customer ID and an unverified matching email', () => {
    expect(ownsStripeCustomer({ email: 'other@example.com' }, identity)).toBe(
      false
    );
    expect(
      ownsStripeCustomer({ email: identity.customerEmail }, identity)
    ).toBe(false);
  });

  it('allows a customer established by the current user payment history', () => {
    expect(
      ownsStripeCustomer(
        { email: 'old-address@example.com' },
        { ...identity, hasPaymentHistory: true }
      )
    ).toBe(true);
  });

  it('allows server-assigned metadata or a verified legacy email', () => {
    expect(
      ownsStripeCustomer({ metadata: { userId: identity.userId } }, identity)
    ).toBe(true);
    expect(
      ownsStripeCustomer(
        { email: 'OWNER@example.com' },
        { ...identity, emailVerified: true }
      )
    ).toBe(true);
  });

  it('rejects deleted customers and conflicting ownership metadata', () => {
    expect(
      ownsStripeCustomer(
        { deleted: true },
        { ...identity, hasPaymentHistory: true }
      )
    ).toBe(false);
    expect(
      ownsStripeCustomer(
        { metadata: { userId: 'other_user' } },
        { ...identity, hasPaymentHistory: true }
      )
    ).toBe(false);
  });
});
