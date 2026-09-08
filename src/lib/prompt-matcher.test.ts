import { describe, expect, it } from 'vitest';
import { getAllDirections, getAllMoods, matchPrompts } from './prompt-matcher';

describe('prompt matching', () => {
  for (const mood of getAllMoods()) {
    for (const direction of getAllDirections()) {
      it(`offers three distinct prompts for ${mood} / ${direction}`, () => {
        const results = matchPrompts(mood, direction);
        expect(results).toHaveLength(3);
        expect(new Set(results.map((prompt) => prompt.id)).size).toBe(3);
        expect(
          results.every(
            (prompt) =>
              prompt.mood.includes(mood) || prompt.direction.includes(direction)
          )
        ).toBe(true);
      });
    }
  }
  it('keeps available exact matches ahead of fallback prompts', () => {
    const results = matchPrompts('grateful', 'goal-setting');
    expect(results[0].mood).toContain('grateful');
    expect(results[0].direction).toContain('goal-setting');
  });
});
