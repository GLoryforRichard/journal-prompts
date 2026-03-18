'use client';

import { generateAIPromptAction } from '@/actions/generate-ai-prompt';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LocaleLink } from '@/i18n/navigation';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import type { Prompt } from '@/lib/prompt-matcher';
import { Routes } from '@/routes';
import {
  Loader2Icon,
  PenLineIcon,
  RefreshCwIcon,
  SparklesIcon,
} from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';

interface PromptResultsProps {
  prompts: Prompt[];
  onShuffle: () => void;
  onSelectPrompt: (prompt: Prompt) => void;
  onBack: () => void;
  mood: string;
  direction: string;
  scene?: string;
}

export function PromptResults({
  prompts,
  onShuffle,
  onSelectPrompt,
  onBack,
  mood,
  direction,
  scene,
}: PromptResultsProps) {
  const user = useCurrentUser();
  const [aiPrompt, setAiPrompt] = useState<Prompt | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [remainingCount, setRemainingCount] = useState<number | null>(null);
  const [limitReached, setLimitReached] = useState(false);

  const { execute: generateAI, isExecuting } = useAction(generateAIPromptAction, {
    onSuccess: ({ data }) => {
      if (data?.success && data.prompt) {
        const newPrompt: Prompt = {
          id: `ai-${Date.now()}`,
          text: data.prompt,
          mood: [mood],
          direction: [direction],
          scene: scene || '',
          depth: 'medium',
          source: 'Inspired just for you',
        };
        setAiPrompt(newPrompt);
        setAiError(null);
        setLimitReached(false);
        if (data.remainingCount !== undefined) {
          setRemainingCount(data.remainingCount);
        }
      } else if (data?.error) {
        setAiError(data.error);
        if (data.limitReached) {
          setLimitReached(true);
        }
      }
    },
    onError: () => {
      setAiError('Something went wrong. Please try again.');
    },
  });

  const handleAIGenerate = () => {
    setAiError(null);
    generateAI({ mood, direction, scene });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-sm underline decoration-wavy decoration-[#2d5da1] underline-offset-4 cursor-pointer"
          style={{ fontFamily: 'var(--font-hand-body)', color: '#2d5da1' }}
        >
          ← Back
        </button>
        <h2
          className="text-2xl md:text-3xl flex-1 text-center"
          style={{ fontFamily: 'var(--font-hand-title)' }}
        >
          Your Journal Prompts
        </h2>
        <button
          onClick={onShuffle}
          className="flex items-center gap-1 px-3 py-1.5 text-sm cursor-pointer transition-all duration-200"
          style={{
            fontFamily: 'var(--font-hand-body)',
            color: '#2d5da1',
            border: '2px dashed #2d5da1',
            borderRadius: wobblyBorderRadius.sm,
          }}
        >
          <RefreshCwIcon size={14} strokeWidth={2.5} />
          Shuffle
        </button>
      </div>

      <p
        className="text-center text-sm opacity-70"
        style={{ fontFamily: 'var(--font-hand-body)' }}
      >
        Feeling <strong>{mood}</strong> · Exploring <strong>{direction.replace('-', ' ')}</strong>
      </p>

      <div className="space-y-4">
        {prompts.map((prompt, index) => (
          <button
            key={prompt.id}
            onClick={() => onSelectPrompt(prompt)}
            className="group w-full text-left p-5 transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: '#ffffff',
              border: '2px dashed #2d2d2d',
              borderRadius: wobblyBorderRadius.lg,
              fontFamily: 'var(--font-hand-body)',
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 27px, #e5e0d8 28px)',
              backgroundPosition: '0 8px',
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold"
                style={{
                  backgroundColor: '#ff4d4d',
                  fontFamily: 'var(--font-hand-title)',
                }}
              >
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-lg leading-relaxed">{prompt.text}</p>
                {prompt.source && (
                  <p className="mt-2 text-xs opacity-50 italic">{prompt.source}</p>
                )}
              </div>
              <PenLineIcon
                className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                size={20}
                strokeWidth={2.5}
                style={{ color: '#2d5da1' }}
              />
            </div>
          </button>
        ))}

        {/* AI Generated prompt */}
        {aiPrompt && (
          <button
            onClick={() => onSelectPrompt(aiPrompt)}
            className="group w-full text-left p-5 transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: '#fef3c7',
              border: '2px solid #f59e0b',
              borderRadius: wobblyBorderRadius.lg,
              fontFamily: 'var(--font-hand-body)',
              boxShadow: '3px 3px 0px 0px #2d2d2d',
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white text-sm"
                style={{ backgroundColor: '#f59e0b' }}
              >
                <SparklesIcon size={16} strokeWidth={2.5} />
              </span>
              <div className="flex-1">
                <p className="text-lg leading-relaxed">{aiPrompt.text}</p>
                <p className="mt-2 text-xs opacity-50 italic">Inspired just for you</p>
              </div>
              <PenLineIcon
                className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                size={20}
                strokeWidth={2.5}
                style={{ color: '#2d5da1' }}
              />
            </div>
          </button>
        )}
      </div>

      {/* AI Generate button */}
      <div className="flex flex-col items-center gap-2 pt-2">
        {user ? (
          <>
            <button
              onClick={handleAIGenerate}
              disabled={isExecuting}
              className="flex items-center gap-2 px-6 py-2.5 text-white cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'var(--font-hand-title)',
                fontSize: '1rem',
                backgroundColor: '#f59e0b',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: '3px 3px 0px 0px #2d2d2d',
              }}
            >
              {isExecuting ? (
                <Loader2Icon size={16} className="animate-spin" />
              ) : (
                <SparklesIcon size={16} strokeWidth={2.5} />
              )}
              {isExecuting ? 'Creating...' : 'Surprise Me'}
            </button>
            {remainingCount !== null && (
              <p
                className="text-xs opacity-50"
                style={{ fontFamily: 'var(--font-hand-body)' }}
              >
                {remainingCount} surprises remaining today
              </p>
            )}
            {aiError && (
              <div className="flex flex-col items-center gap-2">
                <p
                  className="text-xs text-red-500"
                  style={{ fontFamily: 'var(--font-hand-body)' }}
                >
                  {aiError}
                </p>
                {limitReached && (
                  <LocaleLink
                    href={Routes.Pricing}
                    className="text-xs no-underline px-4 py-1.5 transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-hand-title)',
                      color: '#ffffff',
                      backgroundColor: '#ff4d4d',
                      border: '2px solid #2d2d2d',
                      borderRadius: wobblyBorderRadius.sm,
                      boxShadow: '2px 2px 0px 0px #2d2d2d',
                    }}
                  >
                    Unlock more surprises →
                  </LocaleLink>
                )}
              </div>
            )}
          </>
        ) : (
          <LocaleLink
            href={Routes.Login}
            className="flex items-center gap-2 px-6 py-2.5 no-underline transition-all duration-200"
            style={{
              fontFamily: 'var(--font-hand-title)',
              fontSize: '1rem',
              color: '#2d2d2d',
              backgroundColor: '#fff9c4',
              border: '2px solid #2d2d2d',
              borderRadius: wobblyBorderRadius.sm,
              boxShadow: '3px 3px 0px 0px #2d2d2d',
            }}
          >
            <SparklesIcon size={16} strokeWidth={2.5} />
            Sign in for more prompts
          </LocaleLink>
        )}
      </div>
    </div>
  );
}
