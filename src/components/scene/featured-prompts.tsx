'use client';

import { createJournalEntryPrompt } from '@/lib/journal-storage';
import { trackFunnelEvent } from '@/lib/analytics';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import { WritingArea } from '@/components/prompt-finder/writing-area';
import type { Prompt } from '@/lib/prompt-matcher';
import { CopyIcon, CheckIcon, PenLineIcon } from 'lucide-react';
import { useState, useCallback, type ReactNode } from 'react';

interface FeaturedPromptsProps {
  prompts: Prompt[];
  sceneTitle: string;
  afterPreview?: ReactNode;
  numberOffset?: number;
}

function PromptItem({ prompt, index }: { prompt: Prompt; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [entryPrompt, setEntryPrompt] = useState<Prompt | null>(null);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(prompt.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt.text]);

  function startEntry() {
    setEntryPrompt(createJournalEntryPrompt(prompt));
    trackFunnelEvent('prompt_selected', {
      source: 'scene',
      prompt_kind: 'curated',
    });
  }

  return (
    <li className="border-b-2 border-dashed border-[#e5e0d8] last:border-0">
      <div
        className="flex flex-wrap items-start gap-3 py-4"
        style={{ fontFamily: 'var(--font-hand-body)' }}
      >
        <span
          className="flex-shrink-0 text-sm font-bold mt-0.5"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#ff4d4d',
          }}
        >
          {index + 1}.
        </span>
        <span className="min-w-0 flex-1 text-lg select-text">
          {prompt.text}
        </span>
        <div className="ml-6 flex w-full flex-shrink-0 items-center gap-2 sm:ml-0 sm:w-auto">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 px-3 cursor-pointer transition-all duration-200"
            style={{
              color: copied ? '#43a047' : '#2d2d2d',
              backgroundColor: 'transparent',
              border: '1.5px solid',
              borderColor: copied ? '#43a047' : '#e5e0d8',
              borderRadius: wobblyBorderRadius.sm,
            }}
            title={copied ? 'Copied!' : 'Copy prompt'}
            aria-label={
              copied ? 'Copied to clipboard' : 'Copy prompt to clipboard'
            }
          >
            {copied ? (
              <CheckIcon size={14} strokeWidth={2.2} />
            ) : (
              <CopyIcon size={14} strokeWidth={2.2} />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!expanded && !entryPrompt) startEntry();
              setExpanded(!expanded);
            }}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 px-3 cursor-pointer transition-all duration-200"
            style={{
              color: expanded ? '#ffffff' : '#2d2d2d',
              backgroundColor: expanded ? '#ff4d4d' : 'transparent',
              border: '1.5px solid',
              borderColor: expanded ? '#ff4d4d' : '#e5e0d8',
              borderRadius: wobblyBorderRadius.sm,
            }}
            title={entryPrompt ? 'Continue writing' : 'Start writing'}
            aria-label={
              expanded
                ? 'Close writing area'
                : entryPrompt
                  ? 'Continue writing'
                  : 'Start writing'
            }
          >
            <PenLineIcon size={16} strokeWidth={2.2} />
            <span>
              {expanded ? 'Close' : entryPrompt ? 'Continue' : 'Write'}
            </span>
          </button>
        </div>
      </div>
      {entryPrompt && (
        <div hidden={!expanded} className="pb-4 pl-8 space-y-3">
          <WritingArea
            prompt={entryPrompt}
            onBack={() => setExpanded(false)}
            backLabel="Close writing area"
            onStartAnother={startEntry}
          />
        </div>
      )}
    </li>
  );
}

export function FeaturedPrompts({
  prompts,
  sceneTitle,
  afterPreview,
  numberOffset = 0,
}: FeaturedPromptsProps) {
  const previewCount = afterPreview
    ? Math.min(5, prompts.length)
    : prompts.length;
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          {prompts.length} {sceneTitle}
        </h2>
        <p
          className="text-lg mb-8 opacity-70"
          style={{ fontFamily: 'var(--font-hand-body)' }}
        >
          Choose Write to answer a prompt here, or copy it into your own
          notebook.
        </p>
        <div
          className="p-6"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.lg,
            boxShadow: '4px 4px 0px 0px #2d2d2d',
          }}
        >
          <ol className="list-none" start={numberOffset + 1}>
            {prompts.slice(0, previewCount).map((prompt, i) => (
              <PromptItem
                key={prompt.id}
                prompt={prompt}
                index={numberOffset + i}
              />
            ))}
          </ol>
          {afterPreview}
          {previewCount < prompts.length && (
            <ol className="list-none" start={numberOffset + previewCount + 1}>
              {prompts.slice(previewCount).map((prompt, i) => (
                <PromptItem
                  key={prompt.id}
                  prompt={prompt}
                  index={numberOffset + previewCount + i}
                />
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
