export interface StoredJournalEntry {
  text: string;
  promptText: string;
  savedAt: string;
  promptId: string;
  pendingSync?: boolean;
}

// ─── localStorage helpers (guest / fallback) ───

function getStorageKey(promptId: string, userId?: string) {
  return userId
    ? `journal-draft:${encodeURIComponent(userId)}:${promptId}`
    : `journal-writing-${promptId}`;
}

export function saveJournalEntryLocal(
  promptId: string,
  text: string,
  promptText: string,
  userId?: string
) {
  const entry: Omit<StoredJournalEntry, 'promptId'> = {
    text,
    promptText,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(getStorageKey(promptId, userId), JSON.stringify(entry));
}

export function loadJournalEntryLocal(
  promptId: string,
  userId?: string
): StoredJournalEntry | null {
  const raw = localStorage.getItem(getStorageKey(promptId, userId));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.text === 'string') {
      return {
        text: parsed.text,
        promptText:
          typeof parsed.promptText === 'string' ? parsed.promptText : '',
        savedAt: typeof parsed.savedAt === 'string' ? parsed.savedAt : '',
        promptId,
      };
    }
  } catch {
    // Legacy plain-text format
  }
  if (raw.trim()) {
    return { text: raw, promptText: '', savedAt: '', promptId };
  }
  return null;
}

export function getAllJournalEntriesLocal(
  userId?: string
): StoredJournalEntry[] {
  if (typeof window === 'undefined') return [];
  const entries: StoredJournalEntry[] = [];
  const prefix = userId
    ? `journal-draft:${encodeURIComponent(userId)}:`
    : 'journal-writing-';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(prefix)) {
      const promptId = key.slice(prefix.length);
      const entry = loadJournalEntryLocal(promptId, userId);
      if (entry && (userId || entry.text.trim())) {
        entries.push(entry);
      }
    }
  }
  return entries.sort((a, b) => {
    if (!a.savedAt && !b.savedAt) return 0;
    if (!a.savedAt) return 1;
    if (!b.savedAt) return -1;
    return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
  });
}

export function deleteJournalEntryLocal(promptId: string, userId?: string) {
  localStorage.removeItem(getStorageKey(promptId, userId));
}

/** Pending drafts win over server data, including an unsynced clear. */
export function mergeJournalEntries(
  serverEntries: StoredJournalEntry[],
  drafts: StoredJournalEntry[]
): StoredJournalEntry[] {
  const entries = new Map(
    serverEntries.map((entry) => [entry.promptId, entry])
  );
  for (const draft of drafts) {
    entries.set(draft.promptId, { ...draft, pendingSync: true });
  }
  return [...entries.values()]
    .filter((entry) => entry.text.trim() || entry.pendingSync)
    .sort((a, b) => Date.parse(b.savedAt) - Date.parse(a.savedAt));
}

export function hasNewerJournalVersion(
  accountEntry: StoredJournalEntry | null,
  draft: StoredJournalEntry | null
): boolean {
  return !!(
    accountEntry &&
    draft &&
    accountEntry.text !== draft.text &&
    Date.parse(accountEntry.savedAt) > Date.parse(draft.savedAt)
  );
}

/** An imported draft gets its own stable ID, independent of the source prompt. */
export async function getJournalImportId(
  entry: StoredJournalEntry
): Promise<string> {
  const source = JSON.stringify([
    entry.promptId,
    entry.savedAt,
    entry.promptText,
    entry.text,
  ]);
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(source)
  );
  return `import-${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')}`;
}

// ─── Shared util ───

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
