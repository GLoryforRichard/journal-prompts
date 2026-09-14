import { describe, expect, it } from 'vitest';
import { createJournalEntryPrompt } from './journal-storage';
import { parseFinderSession } from './prompt-finder-session';

const prompt = {
  id: 'curated-1',
  text: 'What mattered today?',
  mood: ['reflective'],
  direction: ['gratitude'],
  scene: 'daily',
  depth: 'light',
  source: '',
};
const session = {
  version: 1,
  step: 'writing',
  mood: 'reflective',
  direction: 'gratitude',
  results: [prompt],
  selectedPrompt: createJournalEntryPrompt(prompt),
};

describe('finder tab recovery', () => {
  it('restores the exact response identity across a refresh without journal text', () => {
    const restored = parseFinderSession(
      JSON.stringify({ ...session, journalText: 'private text' })
    );
    expect(restored?.selectedPrompt?.id).toBe(session.selectedPrompt.id);
    expect(restored?.step).toBe('writing');
    expect(restored).not.toHaveProperty('journalText');
  });
  it('ignores corrupted, incompatible, and incomplete writing states', () => {
    for (const raw of [
      null,
      '{',
      JSON.stringify({ ...session, version: 0 }),
      JSON.stringify({ ...session, selectedPrompt: null }),
      JSON.stringify({ ...session, mood: '' }),
      JSON.stringify({ ...session, direction: '' }),
    ]) {
      expect(parseFinderSession(raw)).toBeNull();
    }
  });
  it('keeps a new answer independent of earlier answers to the same question', () => {
    const first = createJournalEntryPrompt(prompt);
    const next = createJournalEntryPrompt(prompt);
    expect(first.id).not.toBe(next.id);
    expect(first.id).not.toBe(prompt.id);
    expect(first.text).toBe(next.text);
    expect(prompt.id).toBe('curated-1');
  });
});
