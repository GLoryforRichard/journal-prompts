interface CompletionAttempt {
  text: string;
  isCurrent: () => boolean;
  save: () => Promise<boolean>;
  isSaved: () => boolean;
}

/** A finish action belongs to one editor, owner and version of the writing. */
export async function confirmJournalCompletion({
  text,
  isCurrent,
  save,
  isSaved,
}: CompletionAttempt): Promise<boolean> {
  if (!text.trim() || !isCurrent()) return false;
  try {
    if (!(await save())) return false;
    // A successful queue flush may belong to writing that changed while saving.
    return isCurrent() && isSaved();
  } catch {
    return false;
  }
}

const trackedCompletions = new Set<string>();

/** Count an entry once per tab session, including closing and reopening it. */
export function markJournalCompletionTracked(
  promptId: string,
  userId?: string
): boolean {
  const key = `journal-completed:${JSON.stringify([userId ?? null, promptId])}`;
  if (trackedCompletions.has(key)) return false;
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, '1');
  } catch {
    // Private browsing may block storage; retain in-memory deduplication.
  }
  trackedCompletions.add(key);
  return true;
}
