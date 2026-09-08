import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  deleteJournalEntryLocal,
  getAllJournalEntriesLocal,
  hasNewerJournalVersion,
  getJournalImportId,
  loadJournalEntryLocal,
  mergeJournalEntries,
  saveJournalEntryLocal,
} from './journal-storage';

beforeEach(() => {
  const data = new Map<string, string>();
  vi.stubGlobal('window', {});
  vi.stubGlobal('localStorage', {
    get length() {
      return data.size;
    },
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => data.set(key, value),
    removeItem: (key: string) => data.delete(key),
    key: (index: number) => [...data.keys()][index] ?? null,
  });
});
afterEach(() => vi.unstubAllGlobals());

describe('journal recovery storage', () => {
  it('gives an imported draft a stable, independent identity for retries', async () => {
    const entry = {
      promptId: 'prompt',
      promptText: 'Question',
      text: 'Guest writing',
      savedAt: '2026-01-01T00:00:00Z',
    };
    const id = await getJournalImportId(entry);
    expect(id).toMatch(/^import-[a-f0-9]{64}$/);
    expect(await getJournalImportId({ ...entry })).toBe(id);
    expect(
      await getJournalImportId({ ...entry, text: 'Different guest writing' })
    ).not.toBe(id);
  });
  it('detects a newer conflicting account version before automatic recovery', () => {
    const draft = {
      promptId: 'prompt',
      promptText: '',
      text: 'offline draft',
      savedAt: '2026-01-01T00:00:00Z',
    };
    const account = {
      ...draft,
      text: 'written on another device',
      savedAt: '2026-01-02T00:00:00Z',
    };
    expect(hasNewerJournalVersion(account, draft)).toBe(true);
    expect(hasNewerJournalVersion(draft, account)).toBe(false);
    expect(
      hasNewerJournalVersion({ ...account, text: draft.text }, draft)
    ).toBe(false);
    expect(hasNewerJournalVersion(null, draft)).toBe(false);
  });
  it('keeps guest, account A and account B drafts separate', () => {
    saveJournalEntryLocal('prompt', 'guest text', 'Question');
    saveJournalEntryLocal('prompt', 'private A', 'Question', 'user-a');
    saveJournalEntryLocal('prompt', 'private B', 'Question', 'user-b');
    expect(getAllJournalEntriesLocal().map((entry) => entry.text)).toEqual([
      'guest text',
    ]);
    expect(
      getAllJournalEntriesLocal('user-a').map((entry) => entry.text)
    ).toEqual(['private A']);
    deleteJournalEntryLocal('prompt', 'user-a');
    expect(loadJournalEntryLocal('prompt', 'user-a')).toBeNull();
    expect(loadJournalEntryLocal('prompt', 'user-b')?.text).toBe('private B');
    expect(loadJournalEntryLocal('prompt')?.text).toBe('guest text');
  });

  it('keeps a pending clear so stale server text does not reappear', () => {
    saveJournalEntryLocal('prompt', '', 'Question', 'user-a');
    const drafts = getAllJournalEntriesLocal('user-a');
    expect(drafts).toHaveLength(1);
    expect(
      mergeJournalEntries(
        [
          {
            promptId: 'prompt',
            text: 'old text',
            promptText: 'Question',
            savedAt: '2026-01-01T00:00:00Z',
          },
        ],
        drafts
      )
    ).toEqual([expect.objectContaining({ text: '', pendingSync: true })]);
  });

  it('shows unsynced text over server text without hiding other history', () => {
    const server = [
      {
        promptId: 'one',
        text: 'old',
        promptText: '',
        savedAt: '2026-01-01T00:00:00Z',
      },
      {
        promptId: 'two',
        text: 'other',
        promptText: '',
        savedAt: '2026-01-02T00:00:00Z',
      },
    ];
    const draft = {
      ...server[0],
      text: 'new unsynced',
      savedAt: '2026-01-03T00:00:00Z',
    };
    expect(
      mergeJournalEntries(server, [draft]).map((entry) => entry.text)
    ).toEqual(['new unsynced', 'other']);
  });
});
