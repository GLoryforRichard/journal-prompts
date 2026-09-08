import { describe, expect, it } from 'vitest';
import { billingCustomerId } from './billing-customer';

describe('billing customer selection', () => {
  it('prefers an ongoing subscription over a newer canceled purchase', () => {
    expect(
      billingCustomerId(
        [
          {
            customerId: 'cus_current',
            type: 'subscription',
            status: 'active',
            paid: true,
            createdAt: new Date('2026-01-01'),
          },
          {
            customerId: 'cus_canceled',
            type: 'subscription',
            status: 'canceled',
            paid: true,
            createdAt: new Date('2026-08-01'),
          },
        ],
        'cus_canceled'
      )
    ).toBe('cus_current');
  });

  it('retains a failed-renewal customer so its payment details can be repaired', () => {
    expect(
      billingCustomerId([
        {
          customerId: 'cus_pending',
          type: 'one_time',
          status: 'completed',
          paid: false,
          createdAt: new Date('2026-08-01'),
        },
        {
          customerId: 'cus_past_due',
          type: 'subscription',
          status: 'past_due',
          paid: true,
          createdAt: new Date('2026-01-01'),
        },
      ])
    ).toBe('cus_past_due');
  });

  it('uses the existing account binding when no payment has been recorded', () => {
    expect(billingCustomerId([], 'cus_bound')).toBe('cus_bound');
    expect(billingCustomerId([])).toBeUndefined();
  });
});
