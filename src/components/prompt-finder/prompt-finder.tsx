'use client';

import { matchPrompts, type Prompt } from '@/lib/prompt-matcher';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { createJournalEntryPrompt } from '@/lib/journal-storage';
import { parseFinderSession } from '@/lib/prompt-finder-session';
import { getFunnelSource, trackFunnelEvent } from '@/lib/analytics';
import { DirectionSelector } from './direction-selector';
import { MoodSelector } from './mood-selector';
import { PromptResults } from './prompt-results';
import { WritingArea } from './writing-area';

type Step = 'mood' | 'direction' | 'results' | 'writing';

interface PromptFinderProps {
  scene?: string;
  defaultMood?: string;
  defaultDirection?: string;
}

export function PromptFinder({
  scene,
  defaultMood,
  defaultDirection,
}: PromptFinderProps) {
  const pathname = usePathname();
  const storageKey = `journal-finder-v1:${pathname}:${scene ?? 'all'}`;
  const [restoredKey, setRestoredKey] = useState<string | null>(null);
  const ready = restoredKey === storageKey;
  const [step, setStep] = useState<Step>('mood');
  const [mood, setMood] = useState<string>(defaultMood ?? '');
  const [direction, setDirection] = useState<string>(defaultDirection ?? '');
  const [results, setResults] = useState<Prompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    try {
      const saved = parseFinderSession(sessionStorage.getItem(storageKey));
      if (saved) {
        setStep(saved.step);
        setMood(saved.mood);
        setDirection(saved.direction);
        setResults(saved.results);
        setSelectedPrompt(saved.selectedPrompt);
      } else {
        setStep('mood');
        setMood(defaultMood ?? '');
        setDirection(defaultDirection ?? '');
        setResults([]);
        setSelectedPrompt(null);
      }
    } catch {
      // Storage can be unavailable in private browsing; the picker still works.
    }
    setRestoredKey(storageKey);
  }, [storageKey, defaultMood, defaultDirection]);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          version: 1,
          step,
          mood,
          direction,
          results,
          selectedPrompt,
        })
      );
    } catch {}
  }, [ready, storageKey, step, mood, direction, results, selectedPrompt]);

  const handleMoodSelect = useCallback(
    (m: string) => {
      setMood(m);
      if (defaultDirection) {
        setDirection(defaultDirection);
        setResults(matchPrompts(m, defaultDirection, scene));
        setStep('results');
        trackFunnelEvent('finder_complete', { source: getFunnelSource() });
        return;
      }
      setStep('direction');
    },
    [defaultDirection, scene]
  );

  const handleDirectionSelect = useCallback(
    (d: string) => {
      setDirection(d);
      const matched = matchPrompts(mood, d, scene);
      setResults(matched);
      setStep('results');
      trackFunnelEvent('finder_complete', { source: getFunnelSource() });
    },
    [mood, scene]
  );

  const handleShuffle = useCallback(() => {
    const matched = matchPrompts(mood, direction, scene);
    setResults(matched);
  }, [mood, direction, scene]);

  const handleSelectPrompt = useCallback((prompt: Prompt) => {
    setSelectedPrompt(createJournalEntryPrompt(prompt));
    trackFunnelEvent('prompt_selected', {
      source: getFunnelSource(),
      prompt_kind: prompt.id.startsWith('ai-') ? 'ai' : 'curated',
    });
    setStep('writing');
  }, []);

  const handleBackToMood = useCallback(() => {
    setStep('mood');
    setDirection(defaultDirection ?? '');
    setResults([]);
  }, [defaultDirection]);

  const handleBackToDirection = useCallback(() => {
    if (defaultDirection) {
      handleBackToMood();
      return;
    }
    setStep('direction');
    setResults([]);
  }, [defaultDirection, handleBackToMood]);

  const handleBackToResults = useCallback(() => {
    setStep('results');
    setSelectedPrompt(null);
  }, []);

  // Progress indicator
  const steps = ['mood', 'direction', 'results', 'writing'] as const;
  const currentStepIndex = steps.indexOf(step);

  return (
    <section
      data-clarity-mask="true"
      id="prompt-finder"
      className="w-full max-w-3xl mx-auto px-4 py-8"
    >
      <div className="mb-5 flex items-center justify-between gap-3 text-sm">
        <span>Choose a prompt. Write for five minutes.</span>
        <LocaleLink href={Routes.Dashboard} className="shrink-0 underline">
          My Journal
        </LocaleLink>
      </div>
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div
            key={s}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= currentStepIndex ? '#ff4d4d' : '#e5e0d8',
              border: '2px solid #2d2d2d',
              transform: i === currentStepIndex ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {!ready && <output>Loading your prompt finder...</output>}
      {/* Step content */}
      <div
        className="p-4 sm:p-6 md:p-8"
        hidden={!ready}
        style={{
          backgroundColor: 'rgba(253, 251, 247, 0.95)',
          border: '2px solid #2d2d2d',
          borderRadius: wobblyBorderRadius.lg,
          boxShadow: '6px 6px 0px 0px #2d2d2d',
        }}
      >
        {step === 'mood' && (
          <MoodSelector onSelect={handleMoodSelect} selected={mood} />
        )}
        {step === 'direction' && (
          <DirectionSelector
            onSelect={handleDirectionSelect}
            selected={direction}
            onBack={handleBackToMood}
          />
        )}
        {step === 'results' && (
          <PromptResults
            prompts={results}
            onShuffle={handleShuffle}
            onSelectPrompt={handleSelectPrompt}
            onBack={handleBackToDirection}
            mood={mood}
            direction={direction}
            scene={scene}
          />
        )}
        {step === 'writing' && selectedPrompt && (
          <WritingArea prompt={selectedPrompt} onBack={handleBackToResults} />
        )}
      </div>
    </section>
  );
}
