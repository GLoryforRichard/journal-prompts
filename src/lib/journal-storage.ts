export interface StoredJournalEntry {
  text: string;
  promptText: string;
  savedAt: string;
  promptId: string;
}

function getStorageKey(promptId: string) {
  return `journal-writing-${promptId}`;
}

export function saveJournalEntry(
  promptId: string,
  text: string,
  promptText: string,
) {
  const entry: Omit<StoredJournalEntry, 'promptId'> = {
    text,
    promptText,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(getStorageKey(promptId), JSON.stringify(entry));
}

export function loadJournalEntry(
  promptId: string,
): StoredJournalEntry | null {
  const raw = localStorage.getItem(getStorageKey(promptId));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.text === 'string') {
      return { ...parsed, promptId };
    }
  } catch {
    // Legacy plain-text format
  }
  // Fallback: treat raw as plain text
  if (raw.trim()) {
    return {
      text: raw,
      promptText: '',
      savedAt: '',
      promptId,
    };
  }
  return null;
}

export function getAllJournalEntries(): StoredJournalEntry[] {
  if (typeof window === 'undefined') return [];
  const entries: StoredJournalEntry[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('journal-writing-')) {
      const promptId = key.replace('journal-writing-', '');
      const entry = loadJournalEntry(promptId);
      if (entry && entry.text.trim()) {
        entries.push(entry);
      }
    }
  }
  // Sort by savedAt descending, entries without date go last
  return entries.sort((a, b) => {
    if (!a.savedAt && !b.savedAt) return 0;
    if (!a.savedAt) return 1;
    if (!b.savedAt) return -1;
    return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
  });
}

export function deleteJournalEntry(promptId: string) {
  localStorage.removeItem(getStorageKey(promptId));
}

export function formatRelativeTime(isoString: string): string {
  if (!isoString) return 'Some time ago';
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diff = now - then;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
