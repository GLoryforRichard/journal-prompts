import { PgDialect } from 'drizzle-orm/pg-core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({ rows: vi.fn(), where: vi.fn() }));
vi.mock('@/db', () => ({
  getDb: async () => ({
    select: () => ({ from: () => ({ where: state.where }) }),
  }),
}));
vi.mock('@/lib/safe-action', () => ({
  userActionClient: {
    inputSchema: () => ({
      action:
        (handler: (input: unknown) => unknown) => (parsedInput: unknown) =>
          handler({ parsedInput, ctx: { user: { id: 'user_signed_in' } } }),
    }),
  },
}));

import { getCurrentPlanAction } from './get-current-plan';

describe('current plan and billing availability', () => {
  const payment = {
    id: 'payment_owned',
    paid: true,
    priceId: 'price_retired',
    type: 'subscription',
    scene: 'subscription',
    status: 'active',
    periodEnd: new Date('2099-01-01'),
    subscriptionId: 'sub_original',
    createdAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    state.where.mockReturnValue({ orderBy: state.rows });
    state.rows.mockResolvedValue([payment]);
  });

  it('keeps a paid subscription on a retired Stripe price recognized as Pro', async () => {
    expect(
      await getCurrentPlanAction({ userId: 'ignored_input' })
    ).toMatchObject({
      success: true,
      data: {
        currentPlan: { id: 'pro' },
        subscription: { id: 'sub_original', priceId: 'price_retired' },
        canManageBilling: true,
      },
    });
  });

  it('keeps the original monthly price and access while a canceled renewal remains paid through the period end', async () => {
    state.rows.mockResolvedValue([
      {
        ...payment,
        priceId: 'price_retired_monthly',
        interval: 'month',
        cancelAtPeriodEnd: true,
      },
    ]);
    expect(
      await getCurrentPlanAction({ userId: 'ignored_input' })
    ).toMatchObject({
      success: true,
      data: {
        currentPlan: { id: 'pro' },
        subscription: {
          id: 'sub_original',
          priceId: 'price_retired_monthly',
          interval: 'month',
          cancelAtPeriodEnd: true,
        },
        canManageBilling: true,
      },
    });
  });

  it('does not extend an expired legacy subscription when its price is replaced', async () => {
    state.rows.mockResolvedValue([
      {
        ...payment,
        priceId: 'price_retired_monthly',
        interval: 'month',
        periodEnd: new Date('2000-01-01'),
      },
    ]);
    expect(
      await getCurrentPlanAction({ userId: 'ignored_input' })
    ).toMatchObject({
      success: true,
      data: {
        currentPlan: { id: 'free' },
        subscription: null,
        canManageBilling: true,
      },
    });
  });

  it.each([
    'past_due',
    'unpaid',
    'canceled',
  ])('keeps portal access for a %s customer without granting premium', async (status) => {
    state.rows.mockResolvedValue([{ ...payment, status }]);
    expect(
      await getCurrentPlanAction({ userId: 'ignored_input' })
    ).toMatchObject({
      success: true,
      data: {
        currentPlan: { id: 'free' },
        subscription: null,
        canManageBilling: true,
      },
    });
  });

  it('uses the authenticated user even when the submitted user ID names someone else', async () => {
    await getCurrentPlanAction({ userId: 'user_someone_else' });
    const query = new PgDialect().sqlToQuery(state.where.mock.calls[0][0]);
    expect(query.params).toEqual(['user_signed_in']);
  });

  it('does not offer a portal for a new user without billing history', async () => {
    state.rows.mockResolvedValue([]);
    expect(
      await getCurrentPlanAction({ userId: 'ignored_input' })
    ).toMatchObject({ success: true, data: { canManageBilling: false } });
  });
});
