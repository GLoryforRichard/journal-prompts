'use client';

import { WritingArea } from '@/components/prompt-finder/writing-area';
import { LocaleLink } from '@/i18n/navigation';
import { trackFunnelEvent } from '@/lib/analytics';
import { getDailyJournalPrompt } from '@/lib/daily-prompt';
import { handShadow, wobblyBorderRadius } from '@/lib/design-tokens';
import type { Prompt } from '@/lib/prompt-matcher';
import { Routes } from '@/routes';
import { useEffect, useState } from 'react';
import { useDailyWriting } from './daily-writing';

export function DailyPromptCard({
  source = 'home',
}: {
  source?: 'home' | 'scene';
}) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [localWriting, setLocalWriting] = useState(false);
  const dailyWriting = useDailyWriting();
  const writing = dailyWriting?.writing ?? localWriting;
  const setWriting = dailyWriting?.setWriting ?? setLocalWriting;

  useEffect(() => {
    if (writing) {
      setPrompt((current) => current ?? getDailyJournalPrompt());
      return;
    }
    const refresh = () => setPrompt(getDailyJournalPrompt());
    refresh();
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, [writing]);

  return (
    <section id="today" className="scroll-mt-24 px-4 py-8">
      <div
        className="mx-auto max-w-3xl space-y-5 border-2 border-foreground bg-card p-6 md:p-8"
        style={{
          borderRadius: wobblyBorderRadius.lg,
          boxShadow: handShadow.default,
        }}
      >
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            A small place to start · 5 minutes
          </p>
          <h2 className="text-3xl font-bold">Your prompt for today</h2>
        </div>
        {prompt ? (
          <>
            {writing ? (
              <WritingArea
                prompt={prompt}
                onBack={() => setWriting(false)}
                backLabel="Back to today's prompt"
              />
            ) : (
              <>
                <p className="text-xl leading-relaxed">{prompt.text}</p>
                <p className="text-base text-muted-foreground">
                  A few honest sentences are enough. Try “What comes to mind
                  first is…” and keep going.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex min-h-12 items-center justify-center rounded-lg bg-secondary px-6 py-3 text-lg font-semibold text-secondary-foreground"
                    onClick={() => {
                      trackFunnelEvent('prompt_selected', {
                        source,
                        prompt_kind: 'curated',
                      });
                      setWriting(true);
                    }}
                  >
                    Write today's entry
                  </button>
                  <LocaleLink
                    href={Routes.Dashboard}
                    className="inline-flex min-h-11 items-center underline underline-offset-4"
                  >
                    Open My Journal
                  </LocaleLink>
                </div>
                <p className="text-sm text-muted-foreground">
                  No account needed to try. Sign in to save across devices.
                  Return here to continue today's entry.
                </p>
              </>
            )}
          </>
        ) : (
          <output className="block py-4 text-muted-foreground">
            Getting today's prompt ready…
          </output>
        )}
      </div>
    </section>
  );
}
