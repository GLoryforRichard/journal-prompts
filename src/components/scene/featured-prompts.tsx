'use client';

import { wobblyBorderRadius } from '@/lib/design-tokens';
import { saveJournalEntry } from '@/lib/journal-storage';
import type { Prompt } from '@/lib/prompt-matcher';
import { useSession } from '@/hooks/use-session';
import { Routes } from '@/routes';
import { LocaleLink } from '@/i18n/navigation';
import { BookmarkIcon, CopyIcon, CheckIcon, PenLineIcon, XIcon } from 'lucide-react';
import { useState, useCallback } from 'react';

interface FeaturedPromptsProps {
  prompts: Prompt[];
  sceneTitle: string;
}

function SaveModal({ onClose, promptId, text }: { onClose: () => void; promptId: string; text: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        onKeyDown={() => {}}
      />
      {/* modal */}
      <div
        className="relative max-w-sm w-full p-6 space-y-4"
        style={{
          backgroundColor: '#fdfbf7',
          border: '2px solid #2d2d2d',
          borderRadius: wobblyBorderRadius.lg,
          boxShadow: '6px 6px 0px 0px #2d2d2d',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 cursor-pointer"
          style={{ color: '#2d2d2d' }}
        >
          <XIcon size={18} />
        </button>

        <div
          className="inline-block p-3"
          style={{
            backgroundColor: '#fff9c4',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.sm,
            transform: 'rotate(-2deg)',
          }}
        >
          <BookmarkIcon size={28} color="#2d2d2d" />
        </div>

        <h3
          className="text-2xl font-bold"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          Save your writing
        </h3>
        <p
          className="text-base opacity-80"
          style={{ fontFamily: 'var(--font-hand-body)' }}
        >
          Create a free account to save your journal entries and pick up where you left off.
        </p>

        <div className="flex gap-3 pt-2">
          <LocaleLink
            href={`${Routes.Register}?callbackUrl=/my-journal`}
            className="flex-1 text-center py-2.5 text-white no-underline transition-all duration-200"
            style={{
              fontFamily: 'var(--font-hand-title)',
              backgroundColor: '#ff4d4d',
              border: '2px solid #2d2d2d',
              borderRadius: wobblyBorderRadius.sm,
              boxShadow: '3px 3px 0px 0px #2d2d2d',
            }}
          >
            Sign Up Free
          </LocaleLink>
          <LocaleLink
            href={`${Routes.Login}?callbackUrl=/my-journal`}
            className="flex-1 text-center py-2.5 no-underline transition-all duration-200"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
              backgroundColor: '#ffffff',
              border: '2px solid #2d2d2d',
              borderRadius: wobblyBorderRadius.sm,
              boxShadow: '3px 3px 0px 0px #2d2d2d',
            }}
          >
            Log In
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}

function PromptItem({ prompt, index }: { prompt: Prompt; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const session = useSession();

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(prompt.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt.text]);

  const handleSave = useCallback(() => {
    // Save to localStorage so my-journal can pick it up
    saveJournalEntry(prompt.id, text, prompt.text);
    if (session?.user) {
      window.location.href = '/my-journal';
    } else {
      setShowModal(true);
    }
  }, [session, prompt.id, text]);

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
            aria-label={copied ? 'Copied to clipboard' : 'Copy prompt to clipboard'}
          >
            {copied ? <CheckIcon size={14} strokeWidth={2.2} /> : <CopyIcon size={14} strokeWidth={2.2} />}
          </button>
          <button
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
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing your response..."
            className="w-full min-h-[120px] p-3 outline-none resize-y"
            autoFocus
            style={{
              fontFamily: 'var(--font-hand-body)',
              backgroundColor: '#ffffff',
              border: '2px solid #e5e0d8',
              borderRadius: wobblyBorderRadius.sm,
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 27px, #e5e0d8 28px)',
              backgroundPosition: '0 8px',
              fontSize: '1rem',
              lineHeight: '1.75rem',
              color: '#2d2d2d',
            }}
          />
          {text.trim().length > 0 && (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 text-white cursor-pointer transition-all duration-200"
              style={{
                fontFamily: 'var(--font-hand-title)',
                backgroundColor: '#43a047',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: '3px 3px 0px 0px #2d2d2d',
                fontSize: '0.9rem',
              }}
            >
              <BookmarkIcon size={14} />
              Save to journal
            </button>
          )}
          {prompt.source && (
            <p className="text-xs italic opacity-50" style={{ fontFamily: 'var(--font-hand-body)' }}>
              {prompt.source}
            </p>
          )}
        </div>
      )}
      {showModal && <SaveModal onClose={() => setShowModal(false)} promptId={prompt.id} text={text} />}
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
