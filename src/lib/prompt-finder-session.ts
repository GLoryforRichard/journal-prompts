import type { Prompt } from '@/lib/prompt-matcher';
import { z } from 'zod';

const promptSchema = z.object({
  id: z.string().min(1).max(300),
  text: z.string().min(1).max(5000),
  mood: z.array(z.string()).max(12),
  direction: z.array(z.string()).max(12),
  scene: z.string().max(200),
  depth: z.string().max(50),
  source: z.string().max(1000),
});
const finderSessionSchema = z.object({
  version: z.literal(1),
  step: z.enum(['mood', 'direction', 'results', 'writing']),
  mood: z.string().max(50),
  direction: z.string().max(50),
  results: z.array(promptSchema).max(10),
  selectedPrompt: promptSchema.nullable(),
});

export interface FinderSession {
  version: 1;
  step: 'mood' | 'direction' | 'results' | 'writing';
  mood: string;
  direction: string;
  results: Prompt[];
  selectedPrompt: Prompt | null;
}

/** Only the current tab's picker state; journal text remains in journal storage. */
export function parseFinderSession(raw: string | null): FinderSession | null {
  if (!raw) return null;
  try {
    const result = finderSessionSchema.safeParse(JSON.parse(raw));
    if (!result.success) return null;
    const state = result.data;
    if (state.step !== 'mood' && !state.mood) return null;
    if (['results', 'writing'].includes(state.step) && !state.direction)
      return null;
    if (state.step === 'writing' && !state.selectedPrompt) return null;
    return state;
  } catch {
    return null;
  }
}
