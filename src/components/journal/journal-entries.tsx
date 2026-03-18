'use client';

import { wobblyBorderRadius } from '@/lib/design-tokens';
import { FileTextIcon } from 'lucide-react';

interface JournalEntry {
  promptId: string;
  text: string;
  date: string;
  wordCount: number;
}

interface JournalEntriesProps {
  entries: JournalEntry[];
}

export function JournalEntries({ entries }: JournalEntriesProps) {
  if (entries.length === 0) {
    return (
      <div
        className="p-8 text-center"
        style={{
          backgroundColor: '#ffffff',
          border: '2px dashed #d5d0c8',
          borderRadius: wobblyBorderRadius.md,
        }}
      >
        <FileTextIcon
          size={32}
          className="mx-auto mb-3"
          style={{ color: '#d5d0c8' }}
        />
        <p
          className="text-base"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
            opacity: 0.5,
          }}
        >
          No journal entries yet
        </p>
        <p
          className="text-sm mt-1"
          style={{
            fontFamily: 'var(--font-hand-body)',
            color: '#2d2d2d',
            opacity: 0.4,
          }}
        >
          Start writing with a prompt above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2
        className="text-lg font-bold"
        style={{
          fontFamily: 'var(--font-hand-title)',
          color: '#2d2d2d',
        }}
      >
        Recent Entries
      </h2>
      <div className="space-y-2">
        {entries.slice(0, 5).map((entry) => (
          <div
            key={entry.promptId}
            className="p-4 flex items-center gap-4"
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #e5e0d8',
              borderRadius: wobblyBorderRadius.sm,
            }}
          >
            <div
              className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0"
              style={{ backgroundColor: '#f5f0e8' }}
            >
              <FileTextIcon size={14} style={{ color: '#2d2d2d' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm truncate"
                style={{
                  fontFamily: 'var(--font-hand-body)',
                  color: '#2d2d2d',
                }}
              >
                {entry.text.slice(0, 80)}
                {entry.text.length > 80 ? '...' : ''}
              </p>
            </div>
            <span
              className="text-xs flex-shrink-0"
              style={{
                fontFamily: 'var(--font-hand-body)',
                color: '#2d2d2d',
                opacity: 0.5,
              }}
            >
              {entry.wordCount} words
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
