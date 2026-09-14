'use client';

import { listJournalsAction, saveJournalAction } from '@/actions/journal';
import { PromptFinder } from '@/components/prompt-finder/prompt-finder';
import { WritingArea } from '@/components/prompt-finder/writing-area';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { getFunnelSource, trackFunnelEvent } from '@/lib/analytics';
import { authClient } from '@/lib/auth-client';
import { formatJournalExport } from '@/lib/journal-export';
import { getDailyJournalPrompt } from '@/lib/daily-prompt';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import {
  createJournalEntryPrompt,
  getAllJournalEntriesLocal,
  deleteJournalEntryLocal,
  mergeJournalEntries,
  getJournalImportId,
  type StoredJournalEntry,
} from '@/lib/journal-storage';
import {
  getAllDirections,
  getAllMoods,
  matchPrompts,
  type Prompt,
} from '@/lib/prompt-matcher';
import {
  BookOpenIcon,
  FlameIcon,
  DownloadIcon,
  PenLineIcon,
  SparklesIcon,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { JournalEntries } from './journal-entries';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function MyJournal() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [showFinder, setShowFinder] = useState(false);
  const [editingEntry, setEditingEntry] = useState<StoredJournalEntry | null>(
    null
  );
  const [entries, setEntries] = useState<StoredJournalEntry[]>([]);
  const [entriesOwner, setEntriesOwner] = useState<string | null>(null);
  const [cloudCount, setCloudCount] = useState(0);
  const [journalLimit, setJournalLimit] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const [error, setError] = useState('');
  const [guestEntries, setGuestEntries] = useState<StoredJournalEntry[]>([]);
  const [importing, setImporting] = useState<string | null>(null);
  const [accountLoaded, setAccountLoaded] = useState(false);
  const [importLimitReached, setImportLimitReached] = useState(false);
  const refreshVersion = useRef(0);
  const currentAccountId = useRef(user?.id);
  currentAccountId.current = user?.id;

  const refreshEntries = useCallback(async () => {
    if (isPending || currentAccountId.current !== user?.id) return;
    const version = ++refreshVersion.current;
    setError('');
    let drafts: StoredJournalEntry[] = [];
    try {
      drafts = getAllJournalEntriesLocal(user?.id);
      setGuestEntries(user ? getAllJournalEntriesLocal() : []);
    } catch {
      setError('Could not read drafts saved on this device.');
    }
    if (user) {
      try {
        const res = await listJournalsAction({ expectedUserId: user.id });
        if (!res?.data?.success || !res.data.data)
          throw new Error('load_failed');
        if (
          version !== refreshVersion.current ||
          currentAccountId.current !== user.id
        )
          return;
        setEntries(mergeJournalEntries(res.data.data.entries, drafts));
        setEntriesOwner(user.id);
        setJournalLimit(res.data.data.limit);
        setCloudCount(res.data.data.count);
        setAccountLoaded(true);
      } catch {
        if (
          version !== refreshVersion.current ||
          currentAccountId.current !== user.id
        )
          return;
        setAccountLoaded(false);
        setEntries((previous) => mergeJournalEntries(previous, drafts));
        setEntriesOwner(user.id);
        setError(
          'Could not load your account journals. Your saved drafts are still available on this device.'
        );
      }
    } else {
      setEntries(drafts);
      setEntriesOwner('guest');
      setJournalLimit(null);
    }
  }, [user?.id, isPending]);

  useEffect(() => {
    setMounted(true);
    setEntries([]);
    setEntriesOwner(null);
    setGuestEntries([]);
    setAccountLoaded(false);
    setCloudCount(0);
    setJournalLimit(null);
    setImporting(null);
    setEditingEntry(null);
    setShowFinder(false);
    void refreshEntries();
    return () => {
      refreshVersion.current += 1;
    };
  }, [refreshEntries]);

  async function importGuestEntry(entry: StoredJournalEntry) {
    if (!user || importing || !accountLoaded) return;
    const importingUserId = user.id;
    setImporting(entry.promptId);
    setImportLimitReached(false);
    setError('');
    try {
      const promptId = await getJournalImportId(entry);
      if (currentAccountId.current !== importingUserId) return;
      const result = await saveJournalAction({
        promptId,
        promptText: entry.promptText,
        text: entry.text,
        createOnly: true,
        expectedUserId: importingUserId,
      });
      if (currentAccountId.current !== importingUserId) return;
      if (!result?.data?.success) {
        throw new Error(
          result?.data?.error === 'limit_reached'
            ? 'limit_reached'
            : 'save_failed'
        );
      }
      trackFunnelEvent('journal_saved', {
        source: getFunnelSource(),
        storage: 'cloud',
      });
      deleteJournalEntryLocal(entry.promptId);
      await refreshEntries();
    } catch (cause) {
      if (currentAccountId.current !== importingUserId) return;
      setImportLimitReached(
        cause instanceof Error && cause.message === 'limit_reached'
      );
      setError(
        cause instanceof Error && cause.message === 'limit_reached'
          ? 'Your account has reached its journal limit. This writing remains saved on this device.'
          : 'Could not save this writing to your account. It remains saved on this device. Please try again.'
      );
    } finally {
      if (currentAccountId.current === importingUserId) setImporting(null);
    }
  }

  const canExport =
    !isPending && entries.length > 0 && entriesOwner === (user?.id ?? 'guest');

  function downloadJournal() {
    if (!canExport) return;
    try {
      const blob = new Blob([formatJournalExport(entries)], {
        type: 'text/plain;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'my-journal.txt';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError(
        'Could not download your journal. Open an entry to copy your writing, or try again.'
      );
    }
  }

  const handleStartWriting = useCallback(() => {
    setShowFinder(true);
  }, []);

  const handleEdit = useCallback((entry: StoredJournalEntry) => {
    setEditingEntry(entry);
  }, []);

  const handleBackFromEdit = useCallback(() => {
    setEditingEntry(null);
    refreshEntries();
  }, [refreshEntries]);

  const dailyPrompt = mounted ? getDailyJournalPrompt() : null;
  const greeting = mounted ? getGreeting() : 'Welcome';
  const firstName = mounted ? user?.name?.split(' ')[0] || '' : '';
  const streak = entries.length;
  function startDailyPrompt() {
    const prompt = getDailyJournalPrompt();
    const existing = entries.find((entry) => entry.promptId === prompt.id);
    if (existing) {
      setEditingEntry(existing);
      return;
    }
    setEditingEntry({
      promptId: prompt.id,
      promptText: prompt.text,
      text: '',
      savedAt: '',
    });
  }

  function startRandomPrompt() {
    const moods = getAllMoods();
    const directions = getAllDirections();
    const candidates = matchPrompts(
      moods[Math.floor(Math.random() * moods.length)],
      directions[Math.floor(Math.random() * directions.length)],
      undefined,
      20
    );
    const prompt =
      candidates.find(
        (candidate) => !entries.some((entry) => entry.promptId === candidate.id)
      ) ?? candidates[0];
    if (prompt)
      setEditingEntry({
        promptId: createJournalEntryPrompt(prompt).id,
        promptText: prompt.text,
        text: '',
        savedAt: '',
      });
  }

  // Editing mode
  if (editingEntry) {
    const editPrompt: Prompt = {
      id: editingEntry.promptId,
      text: editingEntry.promptText || 'Your journal entry',
      mood: [],
      direction: [],
      scene: '',
      depth: '',
      source: '',
    };
    return (
      <div
        className="py-6 px-4 md:px-6 min-w-0 overflow-hidden"
        data-clarity-mask="true"
      >
        <WritingArea
          prompt={editPrompt}
          initialEntry={editingEntry}
          onBack={handleBackFromEdit}
          backLabel="Back to My Journal"
        />
      </div>
    );
  }

  if (showFinder) {
    return (
      <div
        className="py-6 px-4 md:px-6 min-w-0 overflow-hidden"
        data-clarity-mask="true"
      >
        <button
          type="button"
          onClick={() => {
            setShowFinder(false);
            refreshEntries();
          }}
          className="mb-4 text-sm cursor-pointer"
          style={{
            fontFamily: 'var(--font-hand-body)',
            color: '#2d5da1',
          }}
        >
          ← Back to My Journal
        </button>
        <PromptFinder />
      </div>
    );
  }

  const entriesSection = (
    <section id="journal-entries" className="scroll-mt-24 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#58534d]">
          Keep a text copy of your journal entries.
        </p>
        <button
          type="button"
          onClick={downloadJournal}
          disabled={!canExport}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border-2 border-[#e5e0d8] bg-white px-4 py-2 disabled:opacity-50"
        >
          <DownloadIcon size={16} />
          Download journal (.txt)
        </button>
      </div>
      {mounted && !isPending && entriesOwner === (user?.id ?? 'guest') && (
        <JournalEntries
          entries={entries}
          onEdit={handleEdit}
          onDelete={() => refreshEntries()}
        />
      )}
    </section>
  );

  return (
    <div
      data-clarity-mask="true"
      className="py-6 px-4 md:px-6 space-y-6 min-w-0 overflow-hidden"
      style={{ fontFamily: 'var(--font-hand-body)' }}
    >
      {/* Greeting */}
      <div className="space-y-1">
        <h1
          className="text-2xl md:text-3xl"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          {mounted && user
            ? `${greeting}${firstName ? `, ${firstName}` : ''}`
            : 'My Journal'}
        </h1>
        {mounted && streak > 0 && (
          <p
            className="flex items-center gap-1.5 text-sm"
            style={{ color: '#2d2d2d', opacity: 0.7 }}
          >
            <FlameIcon size={16} style={{ color: '#ff4d4d' }} />
            {streak} journal {streak === 1 ? 'entry' : 'entries'} written
            {accountLoaded &&
              entriesOwner === user?.id &&
              journalLimit !== null && (
                <span className="opacity-60">
                  {' '}
                  ({Math.max(0, journalLimit - cloudCount)} free cloud entries
                  remaining)
                </span>
              )}
          </p>
        )}
      </div>

      {entries.length > 0 && entriesSection}

      {mounted && !isPending && !user && (
        <section className="space-y-3 rounded-xl border-2 border-[#2d5da1] bg-white p-5">
          <h2 className="text-lg font-bold">Your journal, on this device</h2>
          <p>
            Write freely and return to your entries here. Guest entries stay in
            this browser and are removed if you clear its data.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <LocaleLink
              href={`${Routes.Register}?callbackUrl=%2Fmy-journal`}
              className="inline-flex min-h-11 items-center rounded-lg bg-[#2d5da1] px-4 py-2 text-white no-underline font-semibold"
            >
              Create a free account to save across devices
            </LocaleLink>
            <LocaleLink
              href={`${Routes.Login}?callbackUrl=%2Fmy-journal`}
              className="underline"
            >
              I already have an account
            </LocaleLink>
          </div>
          <p className="text-sm text-[#58534d]">
            Includes 10 cloud-saved entries and 3 AI prompts per day. No card
            needed. You choose which device entries to save after signing in.
          </p>
        </section>
      )}
      {user &&
        accountLoaded &&
        entriesOwner === user.id &&
        journalLimit !== null &&
        cloudCount >= journalLimit && (
          <aside className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4 space-y-2">
            <p>
              Your 10 free cloud entries are full. You can keep editing them.
            </p>
            <LocaleLink
              href={Routes.Pricing}
              className="font-semibold underline"
            >
              See plans for unlimited journal entries →
            </LocaleLink>
          </aside>
        )}

      {/* Today's Prompt Card */}
      <div
        className="p-6 space-y-4"
        style={{
          backgroundColor: '#fff9c4',
          border: '2px solid #2d2d2d',
          borderRadius: wobblyBorderRadius.lg,
          boxShadow: '4px 4px 0px 0px #2d2d2d',
          transform: 'rotate(-0.5deg)',
        }}
      >
        <div className="flex items-center gap-2">
          <BookOpenIcon size={18} style={{ color: '#2d2d2d' }} />
          <h2
            className="text-lg font-bold"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            Today&apos;s Prompt
          </h2>
        </div>
        <p
          className="text-xl leading-relaxed"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          {dailyPrompt ? `“${dailyPrompt.text}”` : 'Loading today’s prompt...'}
        </p>
        <button
          type="button"
          onClick={startDailyPrompt}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-white cursor-pointer transition-all duration-200"
          style={{
            fontFamily: 'var(--font-hand-title)',
            backgroundColor: '#ff4d4d',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.sm,
            boxShadow: '3px 3px 0px 0px #2d2d2d',
          }}
        >
          <PenLineIcon size={16} />
          {entries.some((entry) => entry.promptId === dailyPrompt?.id)
            ? 'Continue today’s entry'
            : 'Start today’s entry'}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleStartWriting}
          className="p-5 text-left cursor-pointer transition-all duration-200 group"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.md,
            boxShadow: '4px 4px 0px 0px #2d2d2d',
            transform: 'rotate(0.5deg)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full"
              style={{ backgroundColor: '#e8f4fd' }}
            >
              <PenLineIcon size={20} style={{ color: '#2d5da1' }} />
            </div>
            <div>
              <h3
                className="text-base font-bold"
                style={{
                  fontFamily: 'var(--font-hand-title)',
                  color: '#2d2d2d',
                }}
              >
                Find Your Prompt
              </h3>
              <p className="text-sm" style={{ color: '#2d2d2d', opacity: 0.6 }}>
                Match a prompt to your mood
              </p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={startRandomPrompt}
          className="p-5 text-left cursor-pointer transition-all duration-200 group"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.md,
            boxShadow: '4px 4px 0px 0px #2d2d2d',
            transform: 'rotate(-0.3deg)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full"
              style={{ backgroundColor: '#fef3c7' }}
            >
              <SparklesIcon size={20} style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <h3
                className="text-base font-bold"
                style={{
                  fontFamily: 'var(--font-hand-title)',
                  color: '#2d2d2d',
                }}
              >
                Surprise Me
              </h3>
              <p className="text-sm" style={{ color: '#2d2d2d', opacity: 0.6 }}>
                Try a randomly chosen prompt
              </p>
            </div>
          </div>
        </button>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}{' '}
          <button
            type="button"
            className="underline"
            onClick={() => void refreshEntries()}
          >
            Retry
          </button>
        </p>
      )}
      {importLimitReached && (
        <LocaleLink
          href={Routes.Pricing}
          className="block font-semibold underline"
        >
          See plans to save more entries →
        </LocaleLink>
      )}
      {guestEntries.length > 0 && (
        <section className="space-y-3 rounded-lg border-2 border-amber-300 p-4">
          <h2 className="text-lg font-bold">Writing saved on this device</h2>
          <p className="text-sm">
            These entries were written without an account. Choose which ones to
            save to your account.
          </p>
          {guestEntries.map((entry) => (
            <div key={entry.promptId} className="space-y-2 border-t pt-3">
              <p className="text-sm italic">
                {entry.promptText || 'Earlier entry'}
              </p>
              <p className="text-sm whitespace-pre-wrap max-h-40 overflow-auto">
                {entry.text}
              </p>
              <button
                type="button"
                disabled={!!importing || !accountLoaded}
                className="text-sm underline disabled:opacity-50"
                onClick={() => void importGuestEntry(entry)}
              >
                {importing === entry.promptId
                  ? 'Saving...'
                  : 'Save to my account'}
              </button>
            </div>
          ))}
        </section>
      )}
      {entries.length === 0 && entriesSection}
    </div>
  );
}
