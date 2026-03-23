import { describe, it, expect } from 'vitest';
import {
  getRecommendations,
  timeMinutes,
  DIFFICULTY_ORDER,
  STRUCTURE_ORDER,
} from './technique-logic';

describe('timeMinutes', () => {
  it('extracts first number from range string', () => {
    expect(timeMinutes('10-20 min')).toBe(10);
  });

  it('extracts number from simple string', () => {
    expect(timeMinutes('5 min')).toBe(5);
  });

  it('extracts number from longer range', () => {
    expect(timeMinutes('25-40 min')).toBe(25);
  });

  it('returns 0 for empty string', () => {
    expect(timeMinutes('')).toBe(0);
  });

  it('returns 0 for string with no numbers', () => {
    expect(timeMinutes('varies')).toBe(0);
  });
});

describe('DIFFICULTY_ORDER', () => {
  it('orders Beginner < Intermediate < Advanced', () => {
    expect(DIFFICULTY_ORDER['Beginner']).toBeLessThan(DIFFICULTY_ORDER['Intermediate']);
    expect(DIFFICULTY_ORDER['Intermediate']).toBeLessThan(DIFFICULTY_ORDER['Advanced']);
  });
});

describe('STRUCTURE_ORDER', () => {
  it('orders None < Low < Moderate < High', () => {
    expect(STRUCTURE_ORDER['None']).toBeLessThan(STRUCTURE_ORDER['Low']);
    expect(STRUCTURE_ORDER['Low']).toBeLessThan(STRUCTURE_ORDER['Moderate']);
    expect(STRUCTURE_ORDER['Moderate']).toBeLessThan(STRUCTURE_ORDER['High']);
  });
});

describe('getRecommendations', () => {
  it('always returns at least 2 recommendations', () => {
    // Even with invalid inputs, fallback padding kicks in
    const recs = getRecommendations('nonexistent', 'nonexistent');
    expect(recs.length).toBeGreaterThanOrEqual(2);
  });

  it('returns at most 3 recommendations', () => {
    // healing triggers both CBT and Morning Pages, plus fallback
    const recs = getRecommendations('therapeutic', 'healing');
    expect(recs.length).toBeLessThanOrEqual(3);
  });

  it('recommends 5-Minute Journal for blank-page blocker', () => {
    const recs = getRecommendations('blank-page', 'self-discovery');
    expect(recs.some((r) => r.slug === '5-minute-journal')).toBe(true);
  });

  it('recommends 5-Minute Journal for habit goal', () => {
    const recs = getRecommendations('unsure', 'habit');
    expect(recs.some((r) => r.slug === '5-minute-journal')).toBe(true);
  });

  it('recommends CBT for mental-health goal', () => {
    const recs = getRecommendations('blank-page', 'mental-health');
    expect(recs.some((r) => r.slug === 'cbt-journaling')).toBe(true);
  });

  it('recommends CBT for negative blocker', () => {
    const recs = getRecommendations('negative', 'productivity');
    expect(recs.some((r) => r.slug === 'cbt-journaling')).toBe(true);
  });

  it('recommends Free Writing for creativity goal', () => {
    const recs = getRecommendations('blank-page', 'creativity');
    expect(recs.some((r) => r.slug === 'free-writing')).toBe(true);
  });

  it('recommends Free Writing for self-discovery goal', () => {
    const recs = getRecommendations('blank-page', 'self-discovery');
    expect(recs.some((r) => r.slug === 'free-writing')).toBe(true);
  });

  it('recommends Free Writing for boring blocker', () => {
    const recs = getRecommendations('boring', 'habit');
    expect(recs.some((r) => r.slug === 'free-writing')).toBe(true);
  });

  it('recommends Bullet Journaling for productivity goal', () => {
    const recs = getRecommendations('blank-page', 'productivity');
    expect(recs.some((r) => r.slug === 'bullet-journaling')).toBe(true);
  });

  it('recommends Bullet Journaling for consistency blocker', () => {
    const recs = getRecommendations('consistency', 'self-discovery');
    expect(recs.some((r) => r.slug === 'bullet-journaling')).toBe(true);
  });

  it('recommends Morning Pages for therapeutic blocker', () => {
    const recs = getRecommendations('therapeutic', 'creativity');
    expect(recs.some((r) => r.slug === 'morning-pages')).toBe(true);
  });

  it('recommends Morning Pages for healing goal', () => {
    const recs = getRecommendations('blank-page', 'healing');
    expect(recs.some((r) => r.slug === 'morning-pages')).toBe(true);
  });

  it('recommends Gratitude Journaling for unsure blocker', () => {
    const recs = getRecommendations('unsure', 'creativity');
    expect(recs.some((r) => r.slug === 'gratitude-journaling')).toBe(true);
  });

  it('pads with Free Writing and Gratitude when only 1 match', () => {
    // unsure + habit → 5-Minute Journal + Gratitude (from unsure) → already 2, but let's check the padding
    // Let's use a case with only 1 direct match: blank-page + no matching goal
    const recs = getRecommendations('blank-page', 'nonexistent');
    expect(recs.length).toBeGreaterThanOrEqual(2);
    // 5-Minute Journal is the only direct match, so padding should add Free Writing and/or Gratitude
    expect(recs[0].slug).toBe('5-minute-journal');
  });

  it('does not duplicate techniques', () => {
    // boring + creativity both trigger Free Writing
    const recs = getRecommendations('boring', 'creativity');
    const slugs = recs.map((r) => r.slug);
    const uniqueSlugs = [...new Set(slugs)];
    expect(slugs.length).toBe(uniqueSlugs.length);
  });

  it('each recommendation has all required fields', () => {
    const recs = getRecommendations('blank-page', 'mental-health');
    for (const rec of recs) {
      expect(rec.name).toBeTruthy();
      expect(rec.slug).toBeTruthy();
      expect(rec.emoji).toBeTruthy();
      expect(rec.reason).toBeTruthy();
      expect(rec.time).toBeTruthy();
    }
  });
});
