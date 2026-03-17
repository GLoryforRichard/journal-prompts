'use client';

import { matchPrompts, type Prompt } from '@/lib/prompt-matcher';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import { useCallback, useState } from 'react';
import { DirectionSelector } from './direction-selector';
import { MoodSelector } from './mood-selector';
import { PromptResults } from './prompt-results';
import { WritingArea } from './writing-area';

type Step = 'mood' | 'direction' | 'results' | 'writing';

interface PromptFinderProps {
  scene?: string;
  defaultMood?: string;
}

export function PromptFinder({ scene, defaultMood }: PromptFinderProps) {
  const [step, setStep] = useState<Step>('mood');
  const [mood, setMood] = useState<string>(defaultMood ?? '');
  const [direction, setDirection] = useState<string>('');
  const [results, setResults] = useState<Prompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const handleMoodSelect = useCallback((m: string) => {
    setMood(m);
    setStep('direction');
  }, []);

  const handleDirectionSelect = useCallback(
    (d: string) => {
      setDirection(d);
      const matched = matchPrompts(mood, d, scene);
      setResults(matched);
      setStep('results');
    },
    [mood, scene],
  );

  const handleShuffle = useCallback(() => {
    const matched = matchPrompts(mood, direction, scene);
    setResults(matched);
  }, [mood, direction, scene]);

  const handleSelectPrompt = useCallback((prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setStep('writing');
  }, []);

  const handleBackToMood = useCallback(() => {
    setStep('mood');
    setDirection('');
    setResults([]);
  }, []);

  const handleBackToDirection = useCallback(() => {
    setStep('direction');
    setResults([]);
  }, []);

  const handleBackToResults = useCallback(() => {
    setStep('results');
    setSelectedPrompt(null);
  }, []);

  // Progress indicator
  const steps = ['mood', 'direction', 'results', 'writing'] as const;
  const currentStepIndex = steps.indexOf(step);

  return (
    <section id="prompt-finder" className="w-full max-w-3xl mx-auto px-4 py-8">
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

      {/* Step content */}
      <div
        className="p-6 md:p-8"
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
