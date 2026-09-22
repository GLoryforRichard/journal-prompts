import { QueryClient } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePaymentCompletion } from './use-payment-completion';

interface CompletionOptions {
  queryKey: readonly string[];
  queryFn: () => Promise<{ isPaid: boolean; isFailed: boolean }>;
  enabled: boolean;
}

const state = vi.hoisted(() => ({
  query: vi.fn<(options: CompletionOptions) => void>(),
  check: vi.fn(),
}));

vi.mock('@tanstack/react-query', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@tanstack/react-query')>()),
  useQuery: state.query,
}));
vi.mock('@/actions/check-payment-completion', () => ({
  checkPaymentCompletionAction: state.check,
}));

function optionsFor(userId: string | undefined) {
  usePaymentCompletion('cs_test_same123', userId, true);
  return state.query.mock.calls.at(-1)![0];
}

describe('payment confirmation account isolation', () => {
  beforeEach(() => vi.clearAllMocks());

  it('does not reuse a fresh paid result for another signed-in account', async () => {
    const client = new QueryClient({
      defaultOptions: { queries: { staleTime: 300_000, retry: false } },
    });
    try {
      state.check.mockResolvedValueOnce({
        data: {
          success: true,
          checkedUserId: 'account_a',
          isPaid: true,
          isFailed: false,
        },
      });
      const accountA = optionsFor('account_a');
      await client.fetchQuery(accountA);

      const accountB = optionsFor('account_b');
      expect(client.getQueryData(accountB.queryKey)).toBeUndefined();
      state.check.mockResolvedValueOnce({
        data: {
          success: true,
          checkedUserId: 'account_b',
          isPaid: false,
          isFailed: false,
        },
      });
      expect(await client.fetchQuery(accountB)).toEqual({
        isPaid: false,
        isFailed: false,
      });
      expect(state.check).toHaveBeenLastCalledWith({
        sessionId: 'cs_test_same123',
        expectedUserId: 'account_b',
      });
    } finally {
      client.clear();
    }
  });

  it('keeps a late confirmation response in its original account cache', async () => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    let resolveFirst!: (value: unknown) => void;
    state.check.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFirst = resolve;
        })
    );
    try {
      const accountA = optionsFor('account_a');
      const pending = client.fetchQuery(accountA);
      const accountB = optionsFor('account_b');
      state.check.mockResolvedValueOnce({
        data: {
          success: true,
          checkedUserId: 'account_b',
          isPaid: false,
          isFailed: false,
        },
      });
      await client.fetchQuery(accountB);
      resolveFirst({
        data: {
          success: true,
          checkedUserId: 'account_a',
          isPaid: true,
          isFailed: false,
        },
      });
      await pending;

      expect(client.getQueryData(accountB.queryKey)).toEqual({
        isPaid: false,
        isFailed: false,
      });
    } finally {
      client.clear();
    }
  });

  it('does not check payment until the session owner is known', async () => {
    const options = optionsFor(undefined);
    expect(options.enabled).toBe(false);
    expect(await options.queryFn()).toEqual({ isPaid: false, isFailed: false });
    expect(state.check).not.toHaveBeenCalled();
  });

  it('does not turn a rejected account check into a paid confirmation', async () => {
    state.check.mockResolvedValue({
      data: { success: false, error: 'Your account changed.' },
    });
    await expect(optionsFor('account_a').queryFn()).rejects.toThrow(
      'Your account changed.'
    );
  });

  it('rejects a paid response belonging to a different account', async () => {
    state.check.mockResolvedValue({
      data: {
        success: true,
        checkedUserId: 'account_b',
        isPaid: true,
        isFailed: false,
      },
    });
    await expect(optionsFor('account_a').queryFn()).rejects.toThrow(
      'Your account changed.'
    );
  });
});
