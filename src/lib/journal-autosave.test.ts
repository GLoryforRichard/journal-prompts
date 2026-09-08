import { afterEach, describe, expect, it, vi } from 'vitest';
import { JournalAutosave } from './journal-autosave';

afterEach(() => vi.useRealTimers());

describe('journal autosave', () => {
  it('waits for acknowledgement before reporting saved', async () => {
    vi.useFakeTimers();
    let acknowledge!: () => void;
    const persist = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          acknowledge = resolve;
        })
    );
    const status = vi.fn();
    const queue = new JournalAutosave(persist, status);
    queue.schedule('draft');
    expect(status).toHaveBeenLastCalledWith('pending');
    expect(persist).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(800);
    expect(status).toHaveBeenLastCalledWith('saving');
    acknowledge();
    await queue.flush();
    expect(status).toHaveBeenLastCalledWith('saved');
  });

  it('coalesces typing and flushes immediately when leaving the editor', async () => {
    vi.useFakeTimers();
    const persist = vi.fn(async () => {});
    const queue = new JournalAutosave(persist, vi.fn());
    queue.schedule('first');
    queue.schedule('latest');
    expect(await queue.flush()).toBe(true);
    expect(persist.mock.calls).toEqual([['latest']]);
    await vi.runAllTimersAsync();
    expect(persist).toHaveBeenCalledTimes(1);
  });

  it('serializes a clear after an in-flight write and never restores old text', async () => {
    vi.useFakeTimers();
    let acknowledge!: () => void;
    let stored = '';
    const persist = vi.fn(async (value: string) => {
      if (value)
        await new Promise<void>((resolve) => {
          acknowledge = resolve;
        });
      stored = value;
    });
    const queue = new JournalAutosave(persist, vi.fn());
    queue.schedule('old text');
    const saving = queue.flush();
    queue.schedule('');
    const clearing = queue.flush();
    expect(persist).toHaveBeenCalledTimes(1);
    acknowledge();
    await Promise.all([saving, clearing]);
    await vi.runAllTimersAsync();
    expect(persist.mock.calls).toEqual([['old text'], ['']]);
    expect(stored).toBe('');
  });

  it('retains a failed write for explicit retry without a false saved state', async () => {
    const persist = vi
      .fn<(value: string) => Promise<void>>()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce();
    const status = vi.fn();
    const queue = new JournalAutosave(persist, status);
    queue.schedule('keep this');
    expect(await queue.flush()).toBe(false);
    expect(status.mock.calls.at(-1)?.[0]).toBe('error');
    expect(status.mock.calls.some(([state]) => state === 'saved')).toBe(false);
    expect(await queue.flush()).toBe(true);
    expect(persist.mock.calls).toEqual([['keep this'], ['keep this']]);
    queue.dispose();
  });

  it('cancels pending callbacks when the editor is unmounted', async () => {
    vi.useFakeTimers();
    const persist = vi.fn(async () => {});
    const queue = new JournalAutosave(persist, vi.fn());
    queue.schedule('draft already backed up locally');
    queue.dispose();
    await vi.runAllTimersAsync();
    expect(persist).not.toHaveBeenCalled();
    expect(await queue.flush()).toBe(false);
  });
});
