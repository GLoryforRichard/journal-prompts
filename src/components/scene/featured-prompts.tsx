'use client';

import { wobblyBorderRadius } from '@/lib/design-tokens';
import { WritingArea } from '@/components/prompt-finder/writing-area';
import type { Prompt } from '@/lib/prompt-matcher';
import { useSession } from '@/hooks/use-session';
import { Routes } from '@/routes';
import { LocaleLink } from '@/i18n/navigation';
import { CopyIcon, CheckIcon, PenLineIcon } from 'lucide-react';
import { useState, useCallback } from 'react';

interface FeaturedPromptsProps {
  prompts: Prompt[];
  sceneTitle: string;
}

function PromptItem({ prompt, index }: { prompt: Prompt; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const session = useSession();

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(prompt.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt.text]);

  return (
    <li className="border-b-2 border-dashed border-[#e5e0d8] last:border-0">
      <div
        className="flex items-start gap-3 py-4"
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
        <span className="flex-1 text-lg select-text">{prompt.text}</span>
        <div className="flex-shrink-0 flex items-center gap-1.5 mt-0.5">
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 cursor-pointer transition-all duration-200"
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
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 cursor-pointer transition-all duration-200"
            style={{
              color: expanded ? '#ffffff' : '#2d2d2d',
              backgroundColor: expanded ? '#ff4d4d' : 'transparent',
              border: '1.5px solid',
              borderColor: expanded ? '#ff4d4d' : '#e5e0d8',
              borderRadius: wobblyBorderRadius.sm,
            }}
            title="Start writing"
            aria-label={expanded ? 'Close writing area' : 'Start writing'}
          >
            <PenLineIcon size={14} strokeWidth={2.2} />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="pb-4 pl-8 space-y-3">
          <WritingArea
            prompt={prompt}
            onBack={() => setExpanded(false)}
            backLabel="Close writing area"
          />
          {!session?.user && (
            <p className="text-sm">
              Your writing is saved on this device.{' '}
              <LocaleLink
                href={`${Routes.Register}?callbackUrl=/my-journal`}
                className="underline"
              >
                Create an account
              </LocaleLink>{' '}
              or{' '}
              <LocaleLink
                href={`${Routes.Login}?callbackUrl=/my-journal`}
                className="underline"
              >
                sign in
              </LocaleLink>{' '}
              to save it to your account.
            </p>
          )}
          {prompt.source && (
            <p
              className="text-xs italic opacity-50"
              style={{ fontFamily: 'var(--font-hand-body)' }}
            >
              {prompt.source}
            </p>
          )}
        </div>
      )}
    </li>
  );
}

export function FeaturedPrompts({ prompts, sceneTitle }: FeaturedPromptsProps) {
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
          Copy any prompt, or tap the pen to start writing here.
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
          <ol className="list-none">
            {prompts.map((prompt, i) => (
              <PromptItem key={prompt.id} prompt={prompt} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
