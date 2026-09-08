import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  premium: vi.fn(),
  rows: [] as unknown[][],
  insert: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));

vi.mock('@/lib/premium-access', () => ({ checkPremiumAccess: mocks.premium }));
vi.mock('@/db', () => ({
  getDb: async () => ({
    select: () => ({
      from: () => ({
        where: () => {
          const rows = mocks.rows.shift() ?? [];
          return Object.assign(Promise.resolve(rows), {
            limit: async () => rows,
            orderBy: async () => rows,
          });
        },
      }),
    }),
    insert: () => ({ values: mocks.insert }),
    update: () => ({
      set: (values: unknown) => ({ where: () => mocks.update(values) }),
    }),
    delete: () => ({ where: mocks.remove }),
  }),
}));
vi.mock('@/lib/safe-action', () => {
  const action = (handler: (args: unknown) => unknown, input?: unknown) =>
    handler({
      parsedInput: input,
      ctx: { user: { id: 'fixture-owner' } },
    });
  return {
    userActionClient: {
      action: (handler: (args: unknown) => unknown) => () => action(handler),
      inputSchema: (schema: { parse: (input: unknown) => unknown }) => ({
        action: (handler: (args: unknown) => unknown) => (input: unknown) =>
          action(handler, schema.parse(input)),
      }),
    },
  };
});

import {
  deleteJournalAction,
  listJournalsAction,
  loadJournalAction,
  saveJournalAction,
} from './journal';

const input = {
  promptId: 'test-prompt',
  promptText: 'Question?',
  text: 'Private writing',
};

describe('journal account saving', () => {
  it('rejects a stale editor when the browser switches to another account', async () => {
    await expect(
      saveJournalAction({ ...input, expectedUserId: 'previous-owner' })
    ).rejects.toThrow('Your account changed');
    await expect(
      loadJournalAction({
        promptId: input.promptId,
        expectedUserId: 'previous-owner',
      })
    ).rejects.toThrow('Your account changed');
    await expect(
      listJournalsAction({ expectedUserId: 'previous-owner' })
    ).rejects.toThrow('Your account changed');
    await expect(
      deleteJournalAction({
        promptId: input.promptId,
        expectedUserId: 'previous-owner',
      })
    ).rejects.toThrow('Your account changed');
    expect(mocks.insert).not.toHaveBeenCalled();
    expect(mocks.update).not.toHaveBeenCalled();
    expect(mocks.remove).not.toHaveBeenCalled();
  });
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.rows.length = 0;
    mocks.premium.mockResolvedValue(false);
    mocks.insert.mockResolvedValue(undefined);
    mocks.update.mockResolvedValue(undefined);
    mocks.remove.mockResolvedValue(undefined);
  });

  it('does not overwrite an existing imported entry when a save is retried', async () => {
    mocks.rows.push([{ id: 'already-imported' }]);
    expect(
      await saveJournalAction({ ...input, createOnly: true })
    ).toMatchObject({ success: true });
    expect(mocks.update).not.toHaveBeenCalled();
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it('uses an owner-scoped stable primary key for concurrent import retries', async () => {
    mocks.rows.push([], []);
    const conflict = vi.fn().mockResolvedValue(undefined);
    mocks.insert.mockReturnValue({ onConflictDoNothing: conflict });
    expect(
      await saveJournalAction({ ...input, createOnly: true })
    ).toMatchObject({ success: true });
    expect(mocks.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'import:fixture-owner:test-prompt',
        userId: 'fixture-owner',
      })
    );
    expect(conflict).toHaveBeenCalledOnce();
  });

  it('blocks an eleventh free entry without losing or replacing an existing one', async () => {
    mocks.rows.push(
      [],
      Array.from({ length: 10 }, (_, id) => ({ id }))
    );
    expect(await saveJournalAction(input)).toMatchObject({
      success: false,
      error: 'limit_reached',
    });
    expect(mocks.insert).not.toHaveBeenCalled();
    expect(mocks.update).not.toHaveBeenCalled();
  });

  it('uses the shared current entitlement and authenticated owner for new paid entries', async () => {
    mocks.premium.mockResolvedValue(true);
    mocks.rows.push([]);
    expect(await saveJournalAction(input)).toMatchObject({ success: true });
    expect(mocks.premium).toHaveBeenCalledWith('fixture-owner');
    expect(mocks.insert).toHaveBeenCalledWith(
      expect.objectContaining({ userId: 'fixture-owner', ...input })
    );
  });

  it('allows editing after a subscription ends without consuming another entry', async () => {
    mocks.rows.push([{ id: 'existing-entry' }]);
    expect(await saveJournalAction(input)).toMatchObject({ success: true });
    expect(mocks.premium).not.toHaveBeenCalled();
    expect(mocks.insert).not.toHaveBeenCalled();
    expect(mocks.update).toHaveBeenCalledWith(
      expect.objectContaining({ text: input.text })
    );
  });

  it('clears an existing entry rather than saving an empty extra entry', async () => {
    mocks.rows.push([{ id: 'existing-entry' }]);
    expect(await saveJournalAction({ ...input, text: '' })).toMatchObject({
      success: true,
    });
    expect(mocks.remove).toHaveBeenCalledOnce();
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it('does not treat an entitlement service failure as a free account', async () => {
    mocks.rows.push([]);
    mocks.premium.mockRejectedValue(new Error('service unavailable'));
    await expect(saveJournalAction(input)).rejects.toThrow(
      'service unavailable'
    );
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it('returns the complete journal history and current limit', async () => {
    const rows = Array.from({ length: 12 }, (_, id) => ({
      promptId: `prompt-${id}`,
      promptText: 'Question?',
      text: 'Writing',
      updatedAt: new Date('2026-01-01T00:00:00Z'),
    }));
    mocks.rows.push(rows);
    const result = await listJournalsAction({
      expectedUserId: 'fixture-owner',
    });
    expect(result).toMatchObject({
      success: true,
      data: { count: 12, limit: 10 },
    });
  });
});
