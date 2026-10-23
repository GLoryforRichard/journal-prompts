'use client';

import { WritingArea } from '@/components/prompt-finder/writing-area';
import { trackFunnelEvent } from '@/lib/analytics';
import { handShadow, wobblyBorderRadius } from '@/lib/design-tokens';
import { createJournalEntryPrompt } from '@/lib/journal-storage';
import type { Prompt } from '@/lib/prompt-matcher';
import { ShuffleIcon } from 'lucide-react';
import { useState } from 'react';

/**
 * One prompt in the first screen of a topic page, so a visitor can start
 * writing without scrolling to the list. The server renders the first prompt;
 * "Show another" only changes it after a click, so hydration stays stable.
 */
export function SceneStarterPrompt({ prompts }: { prompts: Prompt[] }) {
  const [index, setIndex] = useState(0);
  const [entryPrompt, setEntryPrompt] = useState<Prompt | null>(null);
  const [writing, setWriting] = useState(false);
  const prompt = prompts[index];
  if (!prompt) return null;

  function startEntry() {
    setEntryPrompt(createJournalEntryPrompt(prompt));
    setWriting(true);
    trackFunnelEvent('prompt_selected', {
      source: 'scene_starter',
      prompt_kind: 'curated',
    });
  }

  function showAnother() {
    if (prompts.length < 2) return;
    const step = 1 + Math.floor(Math.random() * (prompts.length - 1));
    setIndex((current) => (current + step) % prompts.length);
    setEntryPrompt(null);
  }

  return (
    <div
      className="mx-auto max-w-2xl space-y-4 border-2 border-foreground bg-card p-5 text-left md:p-6"
      style={{
        borderRadius: wobblyBorderRadius.lg,
        boxShadow: handShadow.default,
      }}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Start here · about 5 minutes
      </p>
      {writing && entryPrompt ? (
        <WritingArea
          prompt={entryPrompt}
          onBack={() => setWriting(false)}
          backLabel="Back to the starter prompt"
          onStartAnother={startEntry}
        />
      ) : (
        <>
          <p className="text-xl leading-relaxed md:text-2xl">{prompt.text}</p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-secondary px-6 py-3 text-lg font-semibold text-secondary-foreground"
              onClick={() => (entryPrompt ? setWriting(true) : startEntry())}
            >
              {entryPrompt ? 'Continue writing' : 'Write about this prompt'}
            </button>
            {prompts.length > 1 && (
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 px-2 underline underline-offset-4"
                onClick={showAnother}
              >
                <ShuffleIcon size={16} aria-hidden="true" />
                Show another prompt
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
