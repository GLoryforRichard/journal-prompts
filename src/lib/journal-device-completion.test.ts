import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { confirmJournalCompletion } from './journal-completion';
import { saveDeviceJournalCompletion } from './journal-device-completion';
import {
  loadJournalEntryLocal,
  saveJournalEntryLocal,
} from './journal-storage';

let stored: Map<string, string>;
let setItem: ReturnType<typeof vi.fn>;

beforeEach(() => {
  stored = new Map();
  setItem = vi.fn((key: string, value: string) => stored.set(key, value));
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => stored.get(key) ?? null,
    setItem,
  });
});

afterEach(() => vi.unstubAllGlobals());

const editor = {
  promptId: 'daily-shared-between-tabs',
  text: 'The writing still open in the first tab.',
  promptText: 'What helped you today?',
};

describe('finishing a device entry without overwriting another tab', () => {
  it('confirms an unchanged draft without rewriting its timestamp or contents', () => {
    saveJournalEntryLocal(editor.promptId, editor.text, editor.promptText);
    const before = [...stored.entries()];
    setItem.mockClear();
    expect(saveDeviceJournalCompletion(editor)).toEqual({ status: 'saved' });
    expect(setItem).not.toHaveBeenCalled();
    expect([...stored.entries()]).toEqual(before);
  });

  it('saves a new entry when no device draft exists', () => {
    expect(saveDeviceJournalCompletion(editor)).toEqual({ status: 'saved' });
    expect(loadJournalEntryLocal(editor.promptId)).toMatchObject(editor);
  });

  it('preserves both versions after another tab replaces the device copy', async () => {
    saveJournalEntryLocal(editor.promptId, editor.text, editor.promptText);
    saveJournalEntryLocal(
      editor.promptId,
      'The newer writing from the second tab.',
      'The second tab kept its own question.'
    );
    const secondTabEntry = loadJournalEntryLocal(editor.promptId);
    const result = saveDeviceJournalCompletion(editor);
    expect(result.status).toBe('conflict');
    if (result.status !== 'conflict') throw new Error('Expected a conflict');
    expect(result.savedCopy).toBe(true);
    expect(loadJournalEntryLocal(editor.promptId)).toEqual(secondTabEntry);
    expect(loadJournalEntryLocal(result.recoveryId)).toMatchObject({
      text: editor.text,
      promptText: editor.promptText,
    });
    expect(
      await confirmJournalCompletion({
        text: editor.text,
        isCurrent: () => true,
        save: async () => result.status !== 'conflict',
        isSaved: () => result.savedCopy,
      })
    ).toBe(false);
  });

  it('keeps the other tab’s pending clear instead of restoring the stale writing', () => {
    saveJournalEntryLocal(editor.promptId, '', editor.promptText);
    const result = saveDeviceJournalCompletion(editor);
    expect(result.status).toBe('conflict');
    expect(loadJournalEntryLocal(editor.promptId)?.text).toBe('');
    if (result.status !== 'conflict') throw new Error('Expected a conflict');
    expect(loadJournalEntryLocal(result.recoveryId)?.text).toBe(editor.text);
  });

  it('does not claim both copies are saved if preserving the first tab fails', () => {
    saveJournalEntryLocal(editor.promptId, 'Second tab', editor.promptText);
    const secondTabEntry = loadJournalEntryLocal(editor.promptId);
    setItem.mockImplementationOnce(() => {
      throw new Error('QuotaExceededError');
    });
    const result = saveDeviceJournalCompletion(editor);
    expect(result).toMatchObject({ status: 'conflict', savedCopy: false });
    expect(loadJournalEntryLocal(editor.promptId)).toEqual(secondTabEntry);
    expect(stored.size).toBe(1);
  });

  it('reuses a recovery ID across a failed attempt and subsequent retries', () => {
    saveJournalEntryLocal(editor.promptId, 'Second tab', editor.promptText);
    setItem.mockImplementationOnce(() => {
      throw new Error('QuotaExceededError');
    });
    const failed = saveDeviceJournalCompletion(editor);
    if (failed.status !== 'conflict') throw new Error('Expected a conflict');
    const retry = { ...editor, recoveryId: failed.recoveryId };
    expect(saveDeviceJournalCompletion(retry)).toEqual({
      status: 'conflict',
      recoveryId: failed.recoveryId,
      savedCopy: true,
    });
    saveDeviceJournalCompletion(retry);
    expect(stored.size).toBe(2);
    expect(loadJournalEntryLocal(editor.promptId)?.text).toBe('Second tab');
    expect(loadJournalEntryLocal(failed.recoveryId)?.text).toBe(editor.text);
  });

  it('accepts unchanged legacy writing with no saved prompt metadata', () => {
    saveJournalEntryLocal(editor.promptId, editor.text, '');
    setItem.mockClear();
    expect(saveDeviceJournalCompletion(editor)).toEqual({ status: 'saved' });
    expect(setItem).not.toHaveBeenCalled();
  });

  it('never writes if the current device version cannot be read', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('SecurityError');
      },
      setItem,
    });
    expect(() => saveDeviceJournalCompletion(editor)).toThrow('SecurityError');
    expect(setItem).not.toHaveBeenCalled();
  });
});
