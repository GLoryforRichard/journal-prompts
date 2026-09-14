import type { StoredJournalEntry } from './journal-storage';

/** Format only the entries explicitly provided by the current journal view. */
export function formatJournalExport(entries: StoredJournalEntry[]): string {
  const heading = `My Journal\n${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}\n`;
  return `${heading}\n${entries
    .map((entry, index) =>
      [
        `Entry ${index + 1}`,
        entry.savedAt ? `Saved: ${entry.savedAt}` : 'Saved: Date unavailable',
        entry.pendingSync
          ? 'Saved on this device; cloud sync pending'
          : undefined,
        '',
        entry.promptText || 'Journal entry',
        '',
        entry.text,
      ]
        .filter((line) => line !== undefined)
        .join('\n')
    )
    .join('\n\n---\n\n')}\n`;
}
