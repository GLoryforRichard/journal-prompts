'use client';

import { deleteJournalAction } from '@/actions/journal';
import { useCurrentUser } from '@/hooks/use-current-user';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import type { StoredJournalEntry } from '@/lib/journal-storage';
import {
  formatRelativeTime,
  deleteJournalEntryLocal,
} from '@/lib/journal-storage';
import { FileTextIcon, PenLineIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

interface JournalEntriesProps {
  entries: StoredJournalEntry[];
  onEdit: (entry: StoredJournalEntry) => void;
  onDelete: (promptId: string) => void;
}

export function JournalEntries({
  entries,
  onEdit,
  onDelete,
}: JournalEntriesProps) {
  const user = useCurrentUser();
  const [visibleCount, setVisibleCount] = useState(20);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

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

  const handleDelete = async (e: React.MouseEvent, promptId: string) => {
    e.stopPropagation();
    if (!window.confirm('Delete this journal entry?')) return;
    setError('');
    setDeleting(promptId);
    try {
      if (user) {
        const result = await deleteJournalAction({
          promptId,
          expectedUserId: user.id,
        });
        if (!result?.data?.success) throw new Error('delete_failed');
      }
      deleteJournalEntryLocal(promptId, user?.id);
    } catch {
      setError('Could not delete this entry. Please try again.');
      setDeleting(null);
      return;
    }
    setDeleting(null);
    onDelete(promptId);
  };

  return (
    <div className="space-y-3">
      <h2
        className="text-lg font-bold"
        style={{
          fontFamily: 'var(--font-hand-title)',
          color: '#2d2d2d',
        }}
      >
        Your Journals
      </h2>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <div className="space-y-2">
        {entries.slice(0, visibleCount).map((entry) => {
          const wordCount = entry.text
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;
          return (
            <div
              key={entry.promptId}
              className="w-full text-left p-4 transition-all duration-150 hover:shadow-md"
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
                <button
                  type="button"
                  onClick={() => onEdit(entry)}
                  className="flex-1 min-w-0 space-y-1 text-left cursor-pointer"
                >
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
                  <p
                    className="text-sm truncate"
                    style={{
                      fontFamily: 'var(--font-hand-body)',
                      color: '#2d2d2d',
                    }}
                  >
                    {entry.text.slice(0, 100) ||
                      'Clear pending — open to retry'}
                    {entry.text.length > 100 ? '...' : ''}
                  </p>
                  {entry.pendingSync && (
                    <p className="text-xs text-amber-700">
                      Saved on this device · not yet synced
                    </p>
                  )}
                </button>
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
                  <button
                    type="button"
                    aria-label="Edit journal entry"
                    onClick={() => onEdit(entry)}
                    className="p-1.5 rounded-full cursor-pointer"
                    style={{ backgroundColor: '#f5f0e8' }}
                  >
                    <PenLineIcon size={12} style={{ color: '#2d5da1' }} />
                  </button>
                  <button
                    type="button"
                    disabled={deleting === entry.promptId}
                    aria-label="Delete journal entry"
                    className="p-1.5 rounded-full transition-colors duration-150 hover:bg-red-100 disabled:opacity-50"
                    style={{ backgroundColor: '#f5f0e8' }}
                    onClick={(e) => handleDelete(e, entry.promptId)}
                  >
                    <Trash2Icon size={12} style={{ color: '#ff4d4d' }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {visibleCount < entries.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + 20)}
          className="text-sm underline"
        >
          Show more journals ({entries.length - visibleCount} remaining)
        </button>
      )}
    </div>
  );
}
