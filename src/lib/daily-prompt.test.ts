import { describe, expect, it } from 'vitest';
import { getDailyJournalPrompt } from './daily-prompt';

describe('daily journal identity', () => {
  it('returns the same response key and question throughout a local calendar day', () => {
    const morning = getDailyJournalPrompt(new Date(2026, 8, 14, 0, 1));
    expect(getDailyJournalPrompt(new Date(2026, 8, 14, 23, 59))).toEqual(
      morning
    );
    expect(morning.id).toBe('daily-2026-09-14');
    expect(morning.text.length).toBeGreaterThan(0);
  });
  it.each([
    [new Date(2026, 0, 31, 23, 59), new Date(2026, 1, 1, 0, 1)],
    [new Date(2026, 2, 7, 23, 59), new Date(2026, 2, 8, 23, 59)],
    [new Date(2026, 9, 31, 23, 59), new Date(2026, 10, 1, 23, 59)],
  ])('never overwrites yesterday across month and daylight-saving boundaries', (before, after) => {
    expect(getDailyJournalPrompt(before).id).not.toBe(
      getDailyJournalPrompt(after).id
    );
  });
});
