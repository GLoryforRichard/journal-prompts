import { describe, expect, it } from 'vitest';
import {
  getAllDirections,
  getAllMoods,
  getPromptsByScene,
  getReviewedAdultPrompts,
  getReviewedPromptCount,
  getReviewedPromptsByScene,
  matchPrompts,
} from './prompt-matcher';

const youthScenes = ['kids', 'teens', 'middle-school', 'high-school'];
const scenes = [
  'gratitude',
  'mental-health',
  'shadow-work',
  'daily',
  'self-discovery',
  'self-love',
  'mindfulness',
  'morning',
  'fun',
  'deep',
  ...youthScenes,
];

describe('prompt matching', () => {
  for (const mood of getAllMoods()) {
    for (const direction of getAllDirections()) {
      it(`offers three distinct prompts for ${mood} / ${direction}`, () => {
        const results = matchPrompts(mood, direction);
        expect(results).toHaveLength(3);
        expect(new Set(results.map((prompt) => prompt.id)).size).toBe(3);
        expect(
          results.some((prompt) => youthScenes.includes(prompt.scene))
        ).toBe(false);
        expect(results.some((prompt) => prompt.id.includes('-n'))).toBe(false);
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

  for (const scene of scenes) {
    it(`keeps all mood/direction combinations in the reviewed ${scene} collection`, () => {
      for (const mood of getAllMoods()) {
        for (const direction of getAllDirections()) {
          const results = matchPrompts(mood, direction, scene);
          expect(results).toHaveLength(3);
          expect(new Set(results.map((prompt) => prompt.id)).size).toBe(3);
          expect(results.every((prompt) => prompt.scene === scene)).toBe(true);
          expect(results.some((prompt) => prompt.id.includes('-n'))).toBe(
            false
          );
        }
      }
    });
  }

  it('does not escape to unrelated topics or children when a scene has no tag match', () => {
    const results = matchPrompts(
      'unknown-mood',
      'unknown-direction',
      'morning'
    );
    expect(results).toHaveLength(3);
    expect(results.every((prompt) => prompt.scene === 'morning')).toBe(true);
    expect(results.some((prompt) => prompt.id.includes('-n'))).toBe(false);
  });

  it('does not fall back to the general pool for invalid explicit scenes', () => {
    for (const scene of ['', 'unknown', '__proto__', 'Morning']) {
      expect(matchPrompts('curious', 'creativity', scene)).toEqual([]);
      expect(getReviewedPromptsByScene(scene)).toEqual([]);
    }
  });

  it('retains legacy imported prompts for existing journal IDs', () => {
    expect(getPromptsByScene('daily').some((p) => p.id === 'day-n001')).toBe(
      true
    );
    expect(getReviewedPromptsByScene('daily')).toHaveLength(30);
    expect(getReviewedAdultPrompts()).toHaveLength(300);
    expect(getReviewedPromptCount()).toBe(420);
  });

  it('returns at most the eligible pool, without duplicate filler prompts', () => {
    const sceneResults = matchPrompts('curious', 'creativity', 'kids', 1000);
    expect(sceneResults).toHaveLength(30);
    expect(new Set(sceneResults.map((prompt) => prompt.id)).size).toBe(30);
    const adultResults = matchPrompts('curious', 'creativity', undefined, 1000);
    expect(adultResults).toHaveLength(300);
    expect(adultResults.some((p) => youthScenes.includes(p.scene))).toBe(false);
  });

  it('handles invalid and fractional requested quantities predictably', () => {
    for (const count of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(matchPrompts('curious', 'creativity', undefined, count)).toEqual(
        []
      );
    }
    expect(matchPrompts('curious', 'creativity', undefined, 1.9)).toHaveLength(
      1
    );
  });
});
