import promptsData from '@/data/prompts.json';

export interface Prompt {
  id: string;
  text: string;
  mood: string[];
  direction: string[];
  scene: string;
  depth: string;
  source: string;
}

const prompts: Prompt[] = promptsData as Prompt[];

// These are the original, curated collections. Bulk imports remain in the
// source data so older journal entries can still resolve their prompt IDs.
// New content must be reviewed before it is added to the recommendation pool.
const reviewedCollections: Record<string, string> = {
  gratitude: 'grat',
  'mental-health': 'ment',
  'shadow-work': 'shad',
  kids: 'kids',
  daily: 'dail',
  teens: 'teen',
  'self-discovery': 'disc',
  'self-love': 'love',
  mindfulness: 'mind',
  morning: 'morn',
  fun: 'fun',
  deep: 'deep',
  'middle-school': 'midd',
  'high-school': 'high',
};
const youthScenes = new Set(['kids', 'teens', 'middle-school', 'high-school']);
const reviewedIds = new Set(
  Object.values(reviewedCollections).flatMap((prefix) =>
    Array.from(
      { length: 30 },
      (_, index) => `${prefix}-${String(index + 1).padStart(3, '0')}`
    )
  )
);
const reviewedPrompts = prompts.filter((prompt) => reviewedIds.has(prompt.id));
const adultPrompts = reviewedPrompts.filter(
  (prompt) => !youthScenes.has(prompt.scene)
);

/** Curated adult prompts for general-purpose tools and editorial collections. */
export function getReviewedAdultPrompts(): Prompt[] {
  return [...adultPrompts];
}

/** An explicit scene is a content boundary, including each education age group. */
export function getReviewedPromptsByScene(scene: string): Prompt[] {
  if (!Object.hasOwn(reviewedCollections, scene)) return [];
  return reviewedPrompts.filter((prompt) => prompt.scene === scene);
}

/** Total curated library size, including the separate education collections. */
export function getReviewedPromptCount(): number {
  return reviewedPrompts.length;
}

export function matchPrompts(
  mood: string,
  direction: string,
  scene?: string,
  count = 3
): Prompt[] {
  if (!Number.isFinite(count) || count < 1) return [];
  const candidates =
    scene === undefined
      ? getReviewedAdultPrompts()
      : getReviewedPromptsByScene(scene);

  // Both exact matches and sparse fallbacks stay inside the same reviewed pool.
  // A strong mood match must not bring school or unrelated themes into a scene.
  const score = (p: Prompt) =>
    (p.mood.includes(mood) ? 2 : 0) + (p.direction.includes(direction) ? 3 : 0);
  const depthOrder: Record<string, number> = { light: 0, medium: 1, deep: 2 };
  // Shuffle first, then stable-sort so tied matches vary on each request.
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  candidates.sort(
    (a, b) =>
      score(b) - score(a) ||
      (depthOrder[a.depth] ?? 1) - (depthOrder[b.depth] ?? 1)
  );

  return candidates.slice(0, Math.floor(count));
}

export function getPromptsByScene(scene: string): Prompt[] {
  return prompts.filter((p) => p.scene === scene);
}

export function getAllMoods(): string[] {
  return [
    'anxious',
    'grateful',
    'stuck',
    'curious',
    'sad',
    'energized',
    'reflective',
    'restless',
  ];
}

export function getAllDirections(): string[] {
  return [
    'self-discovery',
    'gratitude',
    'healing',
    'creativity',
    'goal-setting',
    'relationships',
  ];
}
