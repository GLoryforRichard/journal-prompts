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
          handler({ parsedInput, ctx: { user: { id: 'signed_in' } } }),
    }),
  },
}));
import { checkPaymentCompletionAction } from './check-payment-completion';

describe('payment confirmation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    state.where.mockReturnValue({ limit: state.rows });
    state.rows.mockResolvedValue([]);
  });

  it('queries the session only for the authenticated owner', async () => {
    await checkPaymentCompletionAction({
      sessionId: 'cs_test_owned123',
      expectedUserId: 'signed_in',
    });
    const query = new PgDialect().sqlToQuery(state.where.mock.calls[0][0]);
    expect(query.params).toEqual(['cs_test_owned123', 'signed_in']);
  });

  it('rejects a request from an account that changed before it reached the server', async () => {
    state.rows.mockResolvedValue([{ paid: true, status: 'active' }]);
    expect(
      await checkPaymentCompletionAction({
        sessionId: 'cs_test_owned123',
        expectedUserId: 'previous_user',
      })
    ).toMatchObject({ success: false });
    expect(state.where).not.toHaveBeenCalled();
  });

  it('does not claim an unknown or unpaid session is successful', async () => {
    expect(
      await checkPaymentCompletionAction({ sessionId: 'cs_test_pending123' })
    ).toMatchObject({ success: true, isPaid: false, isFailed: false });
    state.rows.mockResolvedValue([{ paid: false, status: 'active' }]);
    expect(
      await checkPaymentCompletionAction({ sessionId: 'cs_test_pending123' })
    ).toMatchObject({ isPaid: false, isFailed: false });
  });

  it('distinguishes a confirmed payment from an expired unpaid one', async () => {
    state.rows.mockResolvedValue([{ paid: true, status: 'active' }]);
    expect(
      await checkPaymentCompletionAction({ sessionId: 'cs_test_paid123' })
    ).toMatchObject({ isPaid: true, isFailed: false });
    state.rows.mockResolvedValue([
      { paid: false, status: 'incomplete_expired' },
    ]);
    expect(
      await checkPaymentCompletionAction({ sessionId: 'cs_test_expired123' })
    ).toMatchObject({ isPaid: false, isFailed: true });
  });
});
