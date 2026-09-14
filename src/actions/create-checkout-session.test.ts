import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  create: vi.fn(),
  plan: vi.fn(),
  price: vi.fn(),
}));
vi.mock('@/payment', () => ({ createCheckout: state.create }));
vi.mock('@/lib/price-plan', () => ({
  findPlanByPlanId: state.plan,
  findPriceInPlan: state.price,
}));
vi.mock('next-intl/server', () => ({ getLocale: async () => 'en' }));
vi.mock('next/headers', () => ({
  cookies: async () => ({ get: () => undefined }),
}));
vi.mock('@/lib/urls', () => ({
  getUrlWithLocale: (path: string) => `https://example.test${path}`,
}));
vi.mock('@/lib/safe-action', () => ({
  userActionClient: {
    inputSchema: () => ({
      action:
        (handler: (input: unknown) => unknown) => (parsedInput: unknown) =>
          handler({
            parsedInput,
            ctx: {
              user: {
                id: 'signed_in',
                name: 'Test',
                email: 'test@example.test',
                emailVerified: true,
              },
            },
          }),
    }),
  },
}));

import { createCheckoutAction } from './create-checkout-session';

describe('checkout return and account ownership', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    state.plan.mockReturnValue({ id: 'pro' });
    state.price.mockReturnValue({ interval: 'month' });
    state.create.mockResolvedValue({
      id: 'cs_test_example',
      url: 'https://checkout.stripe.com/example',
    });
  });

  it('returns canceled monthly checkout to that plan and paid checkout to the journal', async () => {
    await createCheckoutAction({
      userId: 'ignored',
      planId: 'pro',
      priceId: 'monthly',
    });
    expect(state.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'signed_in',
        cancelUrl:
          'https://example.test/pricing?plan=pro&interval=month&checkout=canceled',
        successUrl:
          'https://example.test/payment?session_id={CHECKOUT_SESSION_ID}&callback=/my-journal',
        metadata: expect.objectContaining({ userId: 'signed_in' }),
      })
    );
  });

  it('preserves one-time lifetime checkout when leaving Stripe', async () => {
    state.plan.mockReturnValue({ id: 'lifetime' });
    state.price.mockReturnValue({});
    await createCheckoutAction({
      userId: 'signed_in',
      planId: 'lifetime',
      priceId: 'once',
    });
    expect(state.create).toHaveBeenCalledWith(
      expect.objectContaining({
        cancelUrl:
          'https://example.test/pricing?plan=lifetime&checkout=canceled',
      })
    );
  });

  it('rejects a disabled price before creating a Stripe session', async () => {
    state.price.mockReturnValue({ interval: 'month', disabled: true });
    expect(
      await createCheckoutAction({
        userId: 'signed_in',
        planId: 'pro',
        priceId: 'retired',
      })
    ).toMatchObject({ success: false });
    expect(state.create).not.toHaveBeenCalled();
  });
});
