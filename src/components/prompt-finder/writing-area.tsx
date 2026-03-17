'use client';

import { wobblyBorderRadius } from '@/lib/design-tokens';
import type { Prompt } from '@/lib/prompt-matcher';
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface WritingAreaProps {
  prompt: Prompt;
  onBack: () => void;
}

function getStorageKey(promptId: string) {
  return `journal-writing-${promptId}`;
}

export function WritingArea({ prompt, onBack }: WritingAreaProps) {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey(prompt.id));
    if (stored) {
      setText(stored);
      setWordCount(stored.trim().split(/\s+/).filter(Boolean).length);
    }
  }, [prompt.id]);

  // Auto-save to localStorage
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setText(value);
      setWordCount(value.trim().split(/\s+/).filter(Boolean).length);
      localStorage.setItem(getStorageKey(prompt.id), value);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    },
    [prompt.id],
  );

  const handleClear = useCallback(() => {
    if (text && window.confirm('Clear your writing? This cannot be undone.')) {
      setText('');
      setWordCount(0);
      localStorage.removeItem(getStorageKey(prompt.id));
    }
  }, [text, prompt.id]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm cursor-pointer"
          style={{
            fontFamily: 'var(--font-hand-body)',
            color: '#2d5da1',
          }}
        >
          <ArrowLeftIcon size={14} strokeWidth={2.5} />
          Back to prompts
        </button>
      </div>

      {/* Prompt display */}
      <div
        className="p-4"
        style={{
          backgroundColor: '#fff9c4',
          border: '2px solid #2d2d2d',
          borderRadius: wobblyBorderRadius.sm,
          boxShadow: '4px 4px 0px 0px #2d2d2d',
          fontFamily: 'var(--font-hand-title)',
        }}
      >
        <p className="text-lg">{prompt.text}</p>
      </div>

      {/* Writing textarea */}
      <div
        className="relative"
        style={{
          border: '2px solid #2d2d2d',
          borderRadius: wobblyBorderRadius.md,
          boxShadow: '4px 4px 0px 0px #2d2d2d',
          overflow: 'hidden',
        }}
      >
        {/* Red margin line */}
        <div
          className="absolute top-0 bottom-0 left-10 w-0.5"
          style={{ backgroundColor: '#ff4d4d', opacity: 0.3 }}
        />
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Start writing here..."
          className="w-full min-h-[300px] p-4 pl-14 resize-y outline-none"
          style={{
            fontFamily: 'var(--font-hand-body)',
            fontSize: '1.1rem',
            lineHeight: '1.75rem',
            backgroundColor: '#ffffff',
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 27px, #e5e0d8 28px)',
            color: '#2d2d2d',
          }}
        />
      </div>

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between text-sm"
        style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d' }}
      >
        <div className="flex items-center gap-3">
          <span className="opacity-60">{wordCount} words</span>
          {saved && (
            <span className="flex items-center gap-1 text-green-600">
              <SaveIcon size={12} /> Saved
            </span>
          )}
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
          style={{ color: '#ff4d4d' }}
        >
          <Trash2Icon size={14} strokeWidth={2.5} />
          Clear
        </button>
      </div>
    </div>
  );
}
