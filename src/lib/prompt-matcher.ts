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
  let filtered = prompts.filter(
    (p) => p.mood.includes(mood) && p.direction.includes(direction)
  );

  if (scene) {
    const sceneFiltered = filtered.filter((p) => p.scene === scene);
    if (sceneFiltered.length >= count) {
      filtered = sceneFiltered;
    }
  }

  // Sort: medium depth first, then light, then deep
  const depthOrder: Record<string, number> = { medium: 0, light: 1, deep: 2 };
  filtered.sort(
    (a, b) => (depthOrder[a.depth] ?? 1) - (depthOrder[b.depth] ?? 1)
  );

  // Shuffle within same depth
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (filtered[i].depth === filtered[j].depth) {
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
  }

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
