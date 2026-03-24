'use client';

import {
  saveJournalAction,
  loadJournalAction,
  deleteJournalAction,
} from '@/actions/journal';
import { useCurrentUser } from '@/hooks/use-current-user';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import {
  saveJournalEntryLocal,
  loadJournalEntryLocal,
  deleteJournalEntryLocal,
} from '@/lib/journal-storage';
import type { Prompt } from '@/lib/prompt-matcher';
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface WritingAreaProps {
  prompt: Prompt;
  onBack: () => void;
  backLabel?: string;
}

export function WritingArea({ prompt, onBack, backLabel }: WritingAreaProps) {
  const user = useCurrentUser();
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(null);

  // Load on mount
  useEffect(() => {
    if (user) {
      loadJournalAction({ promptId: prompt.id }).then((res) => {
        if (res?.data?.data) {
          setText(res.data.data.text);
          setWordCount(
            res.data.data.text.trim().split(/\s+/).filter(Boolean).length,
          );
        }
      });
    } else {
      const entry = loadJournalEntryLocal(prompt.id);
      if (entry) {
        setText(entry.text);
        setWordCount(entry.text.trim().split(/\s+/).filter(Boolean).length);
      }
    }
  }, [prompt.id, user]);

  // Debounced save to server
  const saveToServer = useCallback(
    (value: string) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => {
        const res = await saveJournalAction({
          promptId: prompt.id,
          text: value,
          promptText: prompt.text,
        });
        if (res?.data?.error === 'limit_reached') {
          setLimitReached(true);
        } else {
          setLimitReached(false);
        }
      }, 800);
    },
    [prompt.id, prompt.text],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setText(value);
      setWordCount(value.trim().split(/\s+/).filter(Boolean).length);

      if (user) {
        saveToServer(value);
      } else {
        saveJournalEntryLocal(prompt.id, value, prompt.text);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    },
    [user, prompt.id, prompt.text, saveToServer],
  );

  const handleClear = useCallback(() => {
    if (text && window.confirm('Clear your writing? This cannot be undone.')) {
      setText('');
      setWordCount(0);
      setLimitReached(false);
      if (user) {
        deleteJournalAction({ promptId: prompt.id });
      } else {
        deleteJournalEntryLocal(prompt.id);
      }
    }
  }, [text, prompt.id, user]);

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
          {backLabel || 'Back to prompts'}
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

      {/* Limit warning */}
      {limitReached && (
        <div
          className="p-3 text-sm"
          style={{
            fontFamily: 'var(--font-hand-body)',
            backgroundColor: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: wobblyBorderRadius.sm,
            color: '#856404',
          }}
        >
          You&apos;ve reached the free limit of 10 journal entries. Upgrade to
          save more, or delete an older entry to make room.
        </div>
      )}

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
