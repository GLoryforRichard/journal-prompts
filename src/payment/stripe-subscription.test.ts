import { describe, expect, it } from 'vitest';
import { extractStripeSubscriptionId } from './stripe-subscription';

describe('Stripe invoice subscription extraction', () => {
  it.each([
    'sub_existing',
    { id: 'sub_existing' },
  ])('handles legacy invoice IDs and expanded objects', (subscription) => {
    expect(extractStripeSubscriptionId({ subscription })).toBe('sub_existing');
  });

  it.each([
    'sub_existing',
    { id: 'sub_existing' },
  ])('handles current invoice parents and expanded objects', (subscription) => {
    expect(
      extractStripeSubscriptionId({
        parent: { subscription_details: { subscription } },
      })
    ).toBe('sub_existing');
  });

  it('finds the subscription in current line item parents', () => {
    expect(
      extractStripeSubscriptionId({
        lines: {
          data: [
            {
              parent: {
                subscription_item_details: { subscription: 'sub_existing' },
              },
            },
          ],
        },
      })
    ).toBe('sub_existing');
  });

  it('never confuses a subscription item with its parent subscription', () => {
    expect(
      extractStripeSubscriptionId({
        lines: { data: [{ subscription_item: 'si_item' }] },
      })
    ).toBeNull();
  });
});
