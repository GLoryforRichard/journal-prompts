'use client';

import { wobblyBorderRadius } from '@/lib/design-tokens';
import type { StoredJournalEntry } from '@/lib/journal-storage';
import { formatRelativeTime } from '@/lib/journal-storage';
import { deleteJournalEntry } from '@/lib/journal-storage';
import { FileTextIcon, PenLineIcon, Trash2Icon } from 'lucide-react';

interface JournalEntriesProps {
  entries: StoredJournalEntry[];
  onEdit: (entry: StoredJournalEntry) => void;
  onDelete: (promptId: string) => void;
}

export function JournalEntries({ entries, onEdit, onDelete }: JournalEntriesProps) {
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
        Recent Journals
      </h2>
      <div className="space-y-2">
        {entries.slice(0, 5).map((entry) => {
          const wordCount = entry.text
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;
          return (
            <button
              type="button"
              key={entry.promptId}
              onClick={() => onEdit(entry)}
              className="w-full text-left p-4 cursor-pointer transition-all duration-150 hover:shadow-md"
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #e5e0d8',
                borderRadius: wobblyBorderRadius.sm,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: '#f5f0e8' }}
                >
                  <FileTextIcon size={14} style={{ color: '#2d2d2d' }} />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  {/* Prompt source */}
                  <p
                    className="text-xs truncate italic"
                    style={{
                      fontFamily: 'var(--font-hand-body)',
                      color: '#2d2d2d',
                      opacity: 0.45,
                    }}
                  >
                    {entry.promptText || 'Earlier entry'}
                  </p>
                  {/* Journal text preview */}
                  <p
                    className="text-sm truncate"
                    style={{
                      fontFamily: 'var(--font-hand-body)',
                      color: '#2d2d2d',
                    }}
                  >
                    {entry.text.slice(0, 100)}
                    {entry.text.length > 100 ? '...' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div
                    className="text-right"
                    style={{
                      fontFamily: 'var(--font-hand-body)',
                      color: '#2d2d2d',
                    }}
                  >
                    <span className="text-xs opacity-50 block">
                      {wordCount} words
                    </span>
                    <span className="text-xs opacity-40 block">
                      {formatRelativeTime(entry.savedAt)}
                    </span>
                  </div>
                  <div
                    className="p-1.5 rounded-full"
                    style={{ backgroundColor: '#f5f0e8' }}
                  >
                    <PenLineIcon
                      size={12}
                      style={{ color: '#2d5da1' }}
                    />
                  </div>
                  <div
                    className="p-1.5 rounded-full transition-colors duration-150 hover:bg-red-100"
                    style={{ backgroundColor: '#f5f0e8' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Delete this journal entry?')) {
                        deleteJournalEntry(entry.promptId);
                        onDelete(entry.promptId);
                      }
                    }}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    <Trash2Icon
                      size={12}
                      style={{ color: '#ff4d4d' }}
                    />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
