import { afterEach, describe, expect, it, vi } from 'vitest';
import { JournalAutosave } from './journal-autosave';
import {
  confirmJournalCompletion,
  markJournalCompletionTracked,
} from './journal-completion';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('explicit journal completion', () => {
  it('does not complete an empty entry or start a save for it', async () => {
    const save = vi.fn(async () => true);
    expect(
      await confirmJournalCompletion({
        text: ' \n ',
        isCurrent: () => true,
        save,
        isSaved: () => true,
      })
    ).toBe(false);
    expect(save).not.toHaveBeenCalled();
  });

  it('waits for the server to acknowledge the version being completed', async () => {
    let acknowledge!: () => void;
    let stored = '';
    const queue = new JournalAutosave(async (text) => {
      await new Promise<void>((resolve) => {
        acknowledge = resolve;
      });
      stored = text;
    }, vi.fn());
    queue.schedule('An entry worth keeping');
    const finished = vi.fn();
    const completion = confirmJournalCompletion({
      text: 'An entry worth keeping',
      isCurrent: () => true,
      save: () => queue.flush(),
      isSaved: () => stored === 'An entry worth keeping',
    }).then(finished);
    await Promise.resolve();
    expect(finished).not.toHaveBeenCalled();
    acknowledge();
    await completion;
    expect(finished).toHaveBeenCalledWith(true);
    queue.dispose();
  });

  it('does not treat an empty queue as proof that an entry reached the server', async () => {
    const queue = new JournalAutosave(vi.fn(), vi.fn());
    expect(
      await confirmJournalCompletion({
        text: 'A device-only draft',
        isCurrent: () => true,
        save: () => queue.flush(),
        isSaved: () => false,
      })
    ).toBe(false);
    queue.dispose();
  });

  it('can retry completion after a failed cloud save', async () => {
    let stored = '';
    const save = vi
      .fn<(text: string) => Promise<void>>()
      .mockRejectedValueOnce(new Error('offline'))
      .mockImplementationOnce(async (text) => {
        stored = text;
      });
    const queue = new JournalAutosave(save, vi.fn());
    queue.schedule('Keep this draft');
    const attempt = () =>
      confirmJournalCompletion({
        text: 'Keep this draft',
        isCurrent: () => true,
        save: () => queue.flush(),
        isSaved: () => stored === 'Keep this draft',
      });
    expect(await attempt()).toBe(false);
    expect(await attempt()).toBe(true);
    expect(save).toHaveBeenCalledTimes(2);
    queue.dispose();
  });

  it('keeps a newer edit without completing the older version', async () => {
    let text = 'First version';
    let stored = '';
    let acknowledge!: () => void;
    const queue = new JournalAutosave(async (value) => {
      if (value === 'First version') {
        await new Promise<void>((resolve) => {
          acknowledge = resolve;
        });
      }
      stored = value;
    }, vi.fn());
    queue.schedule(text);
    const completion = confirmJournalCompletion({
      text,
      isCurrent: () => text === 'First version',
      save: () => queue.flush(),
      isSaved: () => stored === 'First version',
    });
    text = 'A newer version';
    queue.schedule(text);
    acknowledge();
    expect(await completion).toBe(false);
    expect(stored).toBe('A newer version');
    queue.dispose();
  });

  it('does not complete an earlier account after the owner changes', async () => {
    let owner = 'account-a';
    let acknowledge!: () => void;
    const queue = new JournalAutosave(
      () =>
        new Promise<void>((resolve) => {
          acknowledge = resolve;
        }),
      vi.fn()
    );
    queue.schedule('Private entry');
    const completion = confirmJournalCompletion({
      text: 'Private entry',
      isCurrent: () => owner === 'account-a',
      save: () => queue.flush(),
      isSaved: () => true,
    });
    owner = 'account-b';
    acknowledge();
    expect(await completion).toBe(false);
    queue.dispose();
  });

  it('does not report completion when device storage rejects the write', async () => {
    expect(
      await confirmJournalCompletion({
        text: 'A draft in the editor',
        isCurrent: () => true,
        save: async () => {
          throw new Error('QuotaExceededError');
        },
        isSaved: () => true,
      })
    ).toBe(false);
  });
});

describe('journal completion analytics deduplication', () => {
  it('counts one completion per entry and owner without storing its content', () => {
    const storage = new Map<string, string>();
    vi.stubGlobal('sessionStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    });
    expect(markJournalCompletionTracked('entry-a')).toBe(true);
    expect(markJournalCompletionTracked('entry-a')).toBe(false);
    expect(markJournalCompletionTracked('entry-a', 'user-a')).toBe(true);
    expect(markJournalCompletionTracked('entry-b')).toBe(true);
    expect([...storage.values()]).toEqual(['1', '1', '1']);
  });

  it('honors an existing marker after a component or module reload', () => {
    vi.stubGlobal('sessionStorage', {
      getItem: () => '1',
      setItem: vi.fn(),
    });
    expect(markJournalCompletionTracked('previously-completed')).toBe(false);
  });

  it('still deduplicates when browser storage is unavailable', () => {
    vi.stubGlobal('sessionStorage', {
      getItem: () => {
        throw new Error('SecurityError');
      },
    });
    expect(markJournalCompletionTracked('private-browser-entry')).toBe(true);
    expect(markJournalCompletionTracked('private-browser-entry')).toBe(false);
  });
});
