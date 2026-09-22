import {
  loadJournalEntryLocal,
  saveJournalEntryLocal,
} from '@/lib/journal-storage';

export interface DeviceCompletionConflict {
  status: 'conflict';
  recoveryId: string;
  savedCopy: boolean;
}

/** Finishing unchanged writing must not overwrite another tab's device draft. */
export function saveDeviceJournalCompletion({
  promptId,
  text,
  promptText,
  recoveryId,
}: {
  promptId: string;
  text: string;
  promptText: string;
  recoveryId?: string;
}): { status: 'saved' } | DeviceCompletionConflict {
  const stored = loadJournalEntryLocal(promptId);
  if (!stored) {
    saveJournalEntryLocal(promptId, text, promptText);
    return { status: 'saved' };
  }
  if (
    stored.text === text &&
    (!stored.promptText || stored.promptText === promptText)
  )
    return { status: 'saved' };

  const copyId = recoveryId ?? `${promptId}-recovered-${crypto.randomUUID()}`;
  try {
    saveJournalEntryLocal(copyId, text, promptText);
    return { status: 'conflict', recoveryId: copyId, savedCopy: true };
  } catch {
    // Reuse this ID when retrying, and never replace the other tab's original.
    return { status: 'conflict', recoveryId: copyId, savedCopy: false };
  }
}
