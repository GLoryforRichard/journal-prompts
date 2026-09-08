import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  set: vi.fn(),
  where: vi.fn(),
  retrieve: vi.fn(),
  event: vi.fn(),
  portal: vi.fn(),
  customer: vi.fn(),
  emailList: vi.fn(),
  createCustomer: vi.fn(),
  list: vi.fn(),
  checkout: vi.fn(),
  rows: [] as Array<Record<string, unknown>>,
}));

vi.mock('@/db', () => ({
  getDb: vi.fn(async () => ({
    update: () => ({ set: state.set }),
    select: () => ({
      from: () => ({
        where: () =>
          Object.assign(Promise.resolve(state.rows), {
            limit: async () => [{ customerId: 'cus_owned' }],
            orderBy: () => ({
              limit: async () => [
                {
                  id: 'payment_owned',
                  type: 'subscription',
                  userId: 'user_owner',
                  subscriptionId: 'sub_existing',
                },
              ],
            }),
          }),
      }),
    }),
  })),
}));
vi.mock('@/credits/credits', () => ({
  addCredits: vi.fn(),
  addLifetimeMonthlyCredits: vi.fn(),
  addSubscriptionCredits: vi.fn(),
}));
vi.mock('@/notification', () => ({ sendPaymentNotification: vi.fn() }));
vi.mock('@/lib/price-plan', () => ({
  findPlanByPlanId: () => ({ id: 'pro' }),
  findPriceInPlan: () => ({ type: 'subscription' }),
}));

import { StripeProvider } from './stripe';

describe('Stripe billing synchronization', () => {
  let provider: StripeProvider;
  const subscription = {
    id: 'sub_existing',
    customer: 'cus_owned',
    status: 'active',
    metadata: {},
    items: {
      data: [
        {
          price: { id: 'price_new' },
          plan: { interval: 'year' },
          current_period_start: 1788768000,
          current_period_end: 1820304000,
        },
      ],
    },
    cancel_at_period_end: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    state.set.mockReturnValue({ where: state.where });
    state.where.mockReturnValue({
      returning: async () => [{ id: 'payment_owned' }],
    });
    state.retrieve.mockResolvedValue(subscription);
    state.rows = [
      {
        type: 'subscription',
        paid: true,
        status: 'active',
        customerId: 'cus_owned',
        createdAt: new Date(),
      },
    ];
    state.list.mockResolvedValue({ data: [] });
    state.customer.mockResolvedValue({
      id: 'cus_owned',
      metadata: { userId: 'user_owner' },
    });
    state.portal.mockResolvedValue({
      url: 'https://billing.stripe.com/test-portal',
    });
    state.checkout.mockResolvedValue({
      id: 'cs_new',
      url: 'https://checkout.stripe.com/test-checkout',
    });
    provider = Object.create(StripeProvider.prototype);
    Object.assign(provider, {
      stripe: {
        subscriptions: { retrieve: state.retrieve, list: state.list },
        checkout: { sessions: { create: state.checkout } },
        webhooks: { constructEventAsync: state.event },
        customers: {
          retrieve: state.customer,
          list: state.emailList,
          create: state.createCustomer,
        },
        billingPortal: { sessions: { create: state.portal } },
      },
      webhookSecret: 'test-only',
    });
  });

  it('keeps the original billing customer after its email changes in the Stripe portal', async () => {
    state.customer.mockResolvedValue({
      id: 'cus_owned',
      email: 'new-billing@example.com',
      metadata: {},
    });
    state.list.mockResolvedValue({ data: [subscription] });
    const result = await provider.createCheckout({
      userId: 'user_owner',
      customerEmailVerified: false,
      planId: 'pro',
      priceId: 'price_new',
      customerEmail: 'login-address@example.com',
    });
    expect(result.url).toBe('https://billing.stripe.com/test-portal');
    expect(state.list).toHaveBeenCalledWith(
      expect.objectContaining({ customer: 'cus_owned' })
    );
    expect(state.emailList).not.toHaveBeenCalled();
    expect(state.createCustomer).not.toHaveBeenCalled();
    expect(state.checkout).not.toHaveBeenCalled();
  });

  it('recovers a bound legacy customer from subscription ownership when the payment webhook was missed', async () => {
    state.rows = [];
    state.customer.mockResolvedValue({
      id: 'cus_owned',
      email: 'changed@example.com',
      metadata: {},
    });
    state.list.mockResolvedValue({
      data: [{ ...subscription, metadata: { userId: 'user_owner' } }],
    });
    const result = await provider.createCheckout({
      userId: 'user_owner',
      customerEmailVerified: false,
      planId: 'pro',
      priceId: 'price_new',
      customerEmail: 'login@example.com',
    });
    expect(result.url).toBe('https://billing.stripe.com/test-portal');
    expect(state.createCustomer).not.toHaveBeenCalled();
    expect(state.checkout).not.toHaveBeenCalled();
  });

  it('does not create a second customer when the existing binding cannot be verified', async () => {
    state.rows = [];
    state.customer.mockResolvedValue({
      id: 'cus_owned',
      email: 'changed@example.com',
      metadata: {},
    });
    state.list.mockResolvedValue({ data: [subscription] });
    await expect(
      provider.createCheckout({
        userId: 'user_owner',
        customerEmailVerified: false,
        planId: 'pro',
        priceId: 'price_new',
        customerEmail: 'login@example.com',
      })
    ).rejects.toThrow('Unable to verify the existing billing account');
    expect(state.createCustomer).not.toHaveBeenCalled();
    expect(state.checkout).not.toHaveBeenCalled();
  });

  it.each([
    'active',
    'past_due',
    'unpaid',
  ])('routes an existing %s subscriber to the portal instead of another checkout', async (status) => {
    vi.spyOn(
      provider as unknown as { createOrGetCustomer: () => Promise<string> },
      'createOrGetCustomer'
    ).mockResolvedValue('cus_owned');
    state.list.mockResolvedValue({ data: [{ ...subscription, status }] });
    const result = await provider.createCheckout({
      userId: 'user_owner',
      customerEmailVerified: true,
      planId: 'pro',
      priceId: 'price_new',
      customerEmail: 'owner@example.com',
    });
    expect(result.url).toBe('https://billing.stripe.com/test-portal');
    expect(state.checkout).not.toHaveBeenCalled();
  });

  it('allows a canceled former subscriber to start a new checkout', async () => {
    vi.spyOn(
      provider as unknown as { createOrGetCustomer: () => Promise<string> },
      'createOrGetCustomer'
    ).mockResolvedValue('cus_owned');
    state.list.mockResolvedValue({
      data: [{ ...subscription, status: 'canceled' }],
    });
    const result = await provider.createCheckout({
      userId: 'user_owner',
      customerEmailVerified: true,
      planId: 'pro',
      priceId: 'price_new',
      customerEmail: 'owner@example.com',
    });
    expect(result.id).toBe('cs_new');
    expect(state.portal).not.toHaveBeenCalled();
  });

  it('does not sell an existing lifetime member another plan', async () => {
    vi.spyOn(
      provider as unknown as { createOrGetCustomer: () => Promise<string> },
      'createOrGetCustomer'
    ).mockResolvedValue('cus_owned');
    state.rows = [
      { type: 'one_time', scene: 'lifetime', status: 'completed', paid: true },
    ];
    const result = await provider.createCheckout({
      userId: 'user_owner',
      customerEmailVerified: true,
      planId: 'pro',
      priceId: 'price_new',
      customerEmail: 'owner@example.com',
    });
    expect(result.url).toBe('https://billing.stripe.com/test-portal');
    expect(state.checkout).not.toHaveBeenCalled();
  });

  it('uses current Stripe status when an older active update arrives after cancellation', async () => {
    state.event.mockResolvedValue({
      type: 'customer.subscription.updated',
      data: { object: subscription },
    });
    state.retrieve.mockResolvedValue({ ...subscription, status: 'canceled' });
    await provider.handleWebhookEvent('fixture', 'fixture');
    expect(state.set).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'canceled' })
    );
  });

  it('renews a legacy payment without user metadata and synchronizes a changed price', async () => {
    state.event.mockResolvedValue({
      type: 'invoice.paid',
      data: { object: { id: 'in_new', subscription: { id: 'sub_existing' } } },
    });
    await provider.handleWebhookEvent('fixture', 'fixture');
    expect(state.retrieve).toHaveBeenCalledWith('sub_existing');
    expect(state.set).toHaveBeenCalledWith(
      expect.objectContaining({
        paid: true,
        priceId: 'price_new',
        interval: 'year',
        status: 'active',
      })
    );
  });

  it('does not create a portal for a customer belonging to another user', async () => {
    state.customer.mockResolvedValue({
      id: 'cus_other',
      metadata: { userId: 'user_other' },
    });
    await expect(
      provider.createCustomerPortal({
        customerId: 'cus_other',
        userId: 'user_owner',
        customerEmail: 'owner@example.com',
        emailVerified: true,
        hasPaymentHistory: true,
      })
    ).rejects.toThrow('Failed to create customer portal');
    expect(state.portal).not.toHaveBeenCalled();
  });
});
