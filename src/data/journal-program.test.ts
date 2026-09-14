import { describe, expect, it } from 'vitest';
import { journalProgram, yearOfPrompts } from './journal-program';

describe('year of reflection content', () => {
  it('delivers 365 distinct prompts with persistent IDs in twelve chapters', () => {
    expect(journalProgram).toHaveLength(12);
    expect(yearOfPrompts).toHaveLength(365);
    expect(new Set(yearOfPrompts.map((prompt) => prompt.id)).size).toBe(365);
    expect(
      new Set(yearOfPrompts.map((prompt) => prompt.text.trim().toLowerCase()))
        .size
    ).toBe(365);
    expect(
      yearOfPrompts.every((prompt) => prompt.text.trim().length > 20)
    ).toBe(true);
  });

  it('keeps the existing 24 daily prompt IDs available and excludes unreviewed bulk content', () => {
    for (let index = 1; index <= 24; index++) {
      expect(
        yearOfPrompts.some(
          (prompt) => prompt.id === `dail-${String(index).padStart(3, '0')}`
        )
      ).toBe(true);
    }
    expect(yearOfPrompts.some((prompt) => prompt.id.includes('-n'))).toBe(
      false
    );
    expect(
      yearOfPrompts.some((prompt) =>
        ['kids', 'teens', 'middle-school', 'high-school'].includes(prompt.scene)
      )
    ).toBe(false);
  });
});
