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

export function matchPrompts(
  mood: string,
  direction: string,
  scene?: string,
  count = 3
): Prompt[] {
  const exact = prompts.filter(
    (p) => p.mood.includes(mood) && p.direction.includes(direction)
  );
  // Keep exact matches first; fill sparse combinations with relevant prompts.
  const score = (p: Prompt) =>
    (p.mood.includes(mood) ? 2 : 0) +
    (p.direction.includes(direction) ? 3 : 0) +
    (scene && p.scene === scene ? 1 : 0);
  const filtered = exact.length >= count ? exact : [...prompts];
  const depthOrder: Record<string, number> = { medium: 0, light: 1, deep: 2 };
  // Shuffle first, then stable-sort so tied matches vary on each request.
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }
  filtered.sort(
    (a, b) =>
      score(b) - score(a) ||
      (depthOrder[a.depth] ?? 1) - (depthOrder[b.depth] ?? 1)
  );

  return filtered.slice(0, count);
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
