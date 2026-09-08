import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  paid: vi.fn(),
  generate: vi.fn(),
  count: vi.fn(),
  insert: vi.fn(),
}));

vi.mock('@/lib/premium-access', () => ({ checkPremiumAccess: mocks.paid }));
vi.mock('@/lib/openrouter', () => ({ generatePromptWithAI: mocks.generate }));
vi.mock('@/db/index', () => ({
  getDb: async () => ({
    select: () => ({ from: () => ({ where: mocks.count }) }),
    insert: () => ({ values: mocks.insert }),
  }),
}));
vi.mock('@/lib/safe-action', () => ({
  userActionClient: {
    inputSchema: (schema: { parse: (input: unknown) => unknown }) => ({
      action: (handler: (args: unknown) => unknown) => (input: unknown) =>
        handler({
          parsedInput: schema.parse(input),
          ctx: { user: { id: 'audit-fixture-user' } },
        }),
    }),
  },
}));

import { generateAIPromptAction } from './generate-ai-prompt';

const input = { mood: 'grateful', direction: 'gratitude' };

describe('AI daily allowance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.paid.mockResolvedValue(false);
    mocks.count.mockResolvedValue([{ count: 0 }]);
    mocks.generate.mockResolvedValue('What made you smile today?');
    mocks.insert.mockResolvedValue(undefined);
  });

  it('allows the third free prompt and records successful usage', async () => {
    mocks.count.mockResolvedValue([{ count: 2 }]);
    const result = await generateAIPromptAction(input);
    expect(result).toMatchObject({ success: true, remainingCount: 0 });
    expect(mocks.paid).toHaveBeenCalledWith('audit-fixture-user');
    expect(mocks.insert).toHaveBeenCalledOnce();
  });

  it('blocks the fourth free prompt before calling the paid provider', async () => {
    mocks.count.mockResolvedValue([{ count: 3 }]);
    expect(await generateAIPromptAction(input)).toMatchObject({
      success: false,
      limitReached: true,
      isPaid: false,
    });
    expect(mocks.generate).not.toHaveBeenCalled();
  });

  it('grants active paid members 100 prompts per day', async () => {
    mocks.paid.mockResolvedValue(true);
    mocks.count.mockResolvedValue([{ count: 99 }]);
    expect(await generateAIPromptAction(input)).toMatchObject({
      success: true,
      remainingCount: 0,
    });
    mocks.count.mockResolvedValue([{ count: 100 }]);
    expect(await generateAIPromptAction(input)).toMatchObject({
      success: false,
      limitReached: true,
      isPaid: true,
    });
    expect(mocks.generate).toHaveBeenCalledOnce();
  });

  it('does not consume an allowance when the provider fails', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    mocks.generate.mockRejectedValue(new Error('private provider details'));
    expect(await generateAIPromptAction(input)).toMatchObject({
      success: false,
      error:
        'AI prompts are temporarily unavailable. Please try again shortly.',
    });
    expect(mocks.insert).not.toHaveBeenCalled();
    expect(JSON.stringify(log.mock.calls)).not.toContain(
      'private provider details'
    );
    log.mockRestore();
  });
});
