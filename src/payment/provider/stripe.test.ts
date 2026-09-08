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
  findPlan: vi.fn(),
  findPrice: vi.fn(),
  stripePrice: vi.fn(),
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
  findPlanByPlanId: state.findPlan,
  findPriceInPlan: state.findPrice,
}));

import { addSubscriptionCredits } from '@/credits/credits';
import { StripeProvider } from './stripe';

describe('Stripe billing synchronization', () => {
  let provider: StripeProvider;
  const monthlyPrice = {
    active: true,
    unit_amount: 999,
    currency: 'usd',
    type: 'recurring',
    recurring: { interval: 'month', interval_count: 1 },
  };
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
    state.findPlan.mockReturnValue({ id: 'pro' });
    state.findPrice.mockReturnValue({
      type: 'subscription',
      amount: 999,
      currency: 'USD',
      interval: 'month',
    });
    state.stripePrice.mockResolvedValue(monthlyPrice);
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
        prices: { retrieve: state.stripePrice },
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

  it.each([
    { name: 'the old $4.99 amount', override: { unit_amount: 499 } },
    { name: 'an inactive price', override: { active: false } },
    { name: 'a different currency', override: { currency: 'cad' } },
    {
      name: 'a yearly period for the monthly plan',
      override: { recurring: { interval: 'year', interval_count: 1 } },
    },
    {
      name: 'multiple months per bill',
      override: { recurring: { interval: 'month', interval_count: 12 } },
    },
    {
      name: 'a one-time price for a subscription',
      override: { type: 'one_time', recurring: null },
    },
  ])('blocks checkout with $name instead of the advertised $9.99/month', async ({
    override,
  }) => {
    state.stripePrice.mockResolvedValue({ ...monthlyPrice, ...override });

    await expect(
      provider.createCheckout({
        userId: 'user_owner',
        customerEmailVerified: true,
        planId: 'pro',
        priceId: 'price_configured',
        customerEmail: 'owner@example.com',
      })
    ).rejects.toThrow('Stripe price does not match the configured plan');

    expect(state.stripePrice).toHaveBeenCalledWith('price_configured');
    expect(state.checkout).not.toHaveBeenCalled();
  });

  it.each([
    { planId: 'pro', amount: 999, interval: 'month' },
    { planId: 'pro', amount: 3999, interval: 'year' },
    { planId: 'lifetime', amount: 4999, interval: null },
  ])('creates a checkout when the $planId price of $amount cents matches Stripe', async ({
    planId,
    amount,
    interval,
  }) => {
    state.findPlan.mockReturnValue({ id: planId });
    state.findPrice.mockReturnValue({
      type: interval ? 'subscription' : 'one_time',
      amount,
      currency: 'USD',
      interval: interval ?? undefined,
    });
    state.stripePrice.mockResolvedValue({
      active: true,
      unit_amount: amount,
      currency: 'usd',
      type: interval ? 'recurring' : 'one_time',
      recurring: interval ? { interval, interval_count: 1 } : null,
    });

    const result = await provider.createCheckout({
      userId: 'user_owner',
      customerEmailVerified: true,
      planId,
      priceId: 'price_matching',
      customerEmail: 'owner@example.com',
    });

    expect(result.id).toBe('cs_new');
    expect(state.stripePrice).toHaveBeenCalledWith('price_matching');
    expect(state.checkout).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [{ price: 'price_matching', quantity: 1 }],
        mode: interval ? 'subscription' : 'payment',
      })
    );
  });

  it.each([
    'plan',
    'price',
  ])('rejects a disabled %s before creating any billing resources', async (disabled) => {
    if (disabled === 'plan') {
      state.findPlan.mockReturnValue({ id: 'pro', disabled: true });
    } else {
      state.findPrice.mockReturnValue({
        type: 'subscription',
        disabled: true,
      });
    }
    await expect(
      provider.createCheckout({
        userId: 'user_owner',
        customerEmailVerified: true,
        planId: 'pro',
        priceId: 'price_retired_monthly',
        customerEmail: 'owner@example.com',
      })
    ).rejects.toThrow('not available for new purchases');
    expect(state.customer).not.toHaveBeenCalled();
    expect(state.createCustomer).not.toHaveBeenCalled();
    expect(state.checkout).not.toHaveBeenCalled();
    expect(state.portal).not.toHaveBeenCalled();
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

  it('sends a legacy monthly subscriber to billing without replacing their subscription price', async () => {
    state.stripePrice.mockResolvedValue({
      ...monthlyPrice,
      unit_amount: 499,
    });
    vi.spyOn(
      provider as unknown as { createOrGetCustomer: () => Promise<string> },
      'createOrGetCustomer'
    ).mockResolvedValue('cus_owned');
    state.list.mockResolvedValue({
      data: [
        {
          ...subscription,
          items: {
            data: [
              {
                price: { id: 'price_retired_monthly', unit_amount: 499 },
                plan: { interval: 'month' },
              },
            ],
          },
        },
      ],
    });

    const result = await provider.createCheckout({
      userId: 'user_owner',
      customerEmailVerified: true,
      planId: 'pro',
      priceId: 'price_new_monthly',
      customerEmail: 'owner@example.com',
    });

    expect(result.url).toBe('https://billing.stripe.com/test-portal');
    expect(state.checkout).not.toHaveBeenCalled();
    expect(state.set).not.toHaveBeenCalled();
    expect(state.stripePrice).not.toHaveBeenCalled();
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

  it('renews the original monthly price even when it is retired from the sales catalog', async () => {
    state.findPrice.mockReturnValue(undefined);
    state.retrieve.mockResolvedValue({
      ...subscription,
      items: {
        data: [
          {
            ...subscription.items.data[0],
            price: {
              id: 'price_retired_monthly',
              active: false,
              unit_amount: 499,
            },
            plan: { interval: 'month' },
          },
        ],
      },
    });
    state.event.mockResolvedValue({
      type: 'invoice.paid',
      data: {
        object: { id: 'in_legacy_renewal', subscription: 'sub_existing' },
      },
    });

    await provider.handleWebhookEvent('fixture', 'fixture');

    expect(state.set).toHaveBeenCalledWith(
      expect.objectContaining({
        paid: true,
        priceId: 'price_retired_monthly',
        interval: 'month',
        status: 'active',
      })
    );
    expect(state.findPrice).not.toHaveBeenCalled();
    expect(addSubscriptionCredits).not.toHaveBeenCalled();
    expect(state.checkout).not.toHaveBeenCalled();
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
