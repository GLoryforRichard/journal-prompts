'use client';

import { loadJournalAction, saveJournalAction } from '@/actions/journal';
import { getFunnelSource, trackFunnelEvent } from '@/lib/analytics';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { authClient } from '@/lib/auth-client';
import { JournalAutosave, type SaveStatus } from '@/lib/journal-autosave';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import {
  saveJournalEntryLocal,
  loadJournalEntryLocal,
  deleteJournalEntryLocal,
  hasNewerJournalVersion,
  type StoredJournalEntry,
} from '@/lib/journal-storage';
import type { Prompt } from '@/lib/prompt-matcher';
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface WritingAreaProps {
  prompt: Prompt;
  onBack: () => void;
  backLabel?: string;
  initialEntry?: StoredJournalEntry;
}

export function WritingArea({
  prompt,
  onBack,
  backLabel,
  initialEntry,
}: WritingAreaProps) {
  const {
    data: session,
    isPending,
    error: sessionError,
  } = authClient.useSession();
  const userId = session?.user.id;
  const [text, setText] = useState('');
  const [displayPromptText, setDisplayPromptText] = useState(prompt.text);
  const writeContext = useRef<{
    promptId: string;
    userId?: string;
    question: string;
  } | null>(null);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [storageWarning, setStorageWarning] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [conflict, setConflict] = useState<StoredJournalEntry | null>(null);
  const [reload, setReload] = useState(0);
  const queue = useRef<JournalAutosave | null>(null);
  const currentText = useRef('');
  const hasBackup = useRef(false);
  const startedTracking = useRef(false);
  const savedTracking = useRef(false);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  useEffect(() => {
    if (isPending) return;
    if (sessionError) {
      setLoading(true);
      setLoadError(true);
      return;
    }
    let active = true;
    // Each queue keeps its own question and owner, even if another account opens.
    const context = { promptId: prompt.id, userId, question: prompt.text };
    writeContext.current = context;
    setDisplayPromptText(prompt.text);
    startedTracking.current = false;
    savedTracking.current = false;
    setLoading(true);
    setText('');
    currentText.current = '';
    setLoadError(false);
    setStatus('idle');
    setSaveError('');
    setLimitReached(false);
    setConflict(null);
    const autosave = new JournalAutosave(
      async (value) => {
        const result = await saveJournalAction({
          promptId: prompt.id,
          text: value,
          promptText: context.question,
          expectedUserId: userId,
        });
        if (!result?.data?.success) {
          throw new Error(
            result?.data?.error === 'limit_reached'
              ? 'limit_reached'
              : 'save_failed'
          );
        }
        if (active && value.trim() && !savedTracking.current) {
          savedTracking.current = true;
          trackFunnelEvent('journal_saved', {
            source: getFunnelSource(),
            storage: 'cloud',
          });
        }
        // Only discard the backup for the version acknowledged by the server.
        if (active && currentText.current === value) {
          try {
            const backup = loadJournalEntryLocal(prompt.id, userId);
            if (backup?.text === value)
              deleteJournalEntryLocal(prompt.id, userId);
          } catch {}
        }
      },
      (nextStatus, error) => {
        if (!active) return;
        setStatus(nextStatus);
        if (nextStatus === 'error') {
          const limited =
            error instanceof Error && error.message === 'limit_reached';
          setLimitReached(limited);
          setSaveError(
            limited
              ? 'This entry has not been saved to your account.'
              : 'Could not save to your account. Please try again.'
          );
        } else {
          setSaveError('');
          setLimitReached(false);
        }
      }
    );
    queue.current = autosave;

    async function load() {
      let local: StoredJournalEntry | null = null;
      try {
        local = loadJournalEntryLocal(prompt.id, userId);
      } catch {
        setStorageWarning(true);
      }
      let chosenEntry = local ?? initialEntry;
      let value = chosenEntry?.text ?? '';
      context.question = chosenEntry?.promptText || prompt.text;
      let newerAccountEntry: StoredJournalEntry | null = null;
      hasBackup.current = !!local;
      if (userId) {
        try {
          const result = await loadJournalAction({
            promptId: prompt.id,
            expectedUserId: userId,
          });
          if (!result?.data?.success) throw new Error('load_failed');
          chosenEntry = local ?? result.data.data ?? undefined;
          value = chosenEntry?.text ?? '';
          context.question = chosenEntry?.promptText || prompt.text;
          if (hasNewerJournalVersion(result.data.data ?? null, local)) {
            newerAccountEntry = result.data.data ?? null;
          }
        } catch {
          if (!active) return;
          setLoadError(true);
          setText(value);
          setDisplayPromptText(context.question);
          currentText.current = value;
          // A local draft cannot establish whether the account has a newer edit.
          // Reconcile first, then enable editing and any account writes.
          setLoading(true);
          return;
        }
      }
      if (!active) return;
      setText(value);
      setDisplayPromptText(context.question);
      currentText.current = value;
      setLoading(false);
      setConflict(newerAccountEntry);
      if (value.trim() && (!userId ? !!local : !local)) setStatus('saved');
      if (userId && local && !newerAccountEntry) autosave.schedule(value);
    }
    void load();
    return () => {
      active = false;
      autosave.dispose();
      if (queue.current === autosave) queue.current = null;
      if (writeContext.current === context) writeContext.current = null;
    };
  }, [
    prompt.id,
    prompt.text,
    userId,
    isPending,
    initialEntry,
    reload,
    sessionError,
  ]);

  useEffect(() => {
    if (!['pending', 'saving', 'error'].includes(status)) return;
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      void queue.current?.flush();
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeLeaving);
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving);
  }, [userId, status]);

  function updateText(value: string) {
    const context = writeContext.current;
    if (
      loading ||
      isPending ||
      conflict ||
      sessionError ||
      !context ||
      context.promptId !== prompt.id ||
      context.userId !== userId
    )
      return;
    setText(value);
    currentText.current = value;
    if (value.trim() && !startedTracking.current) {
      startedTracking.current = true;
      trackFunnelEvent('writing_started', {
        source: getFunnelSource(),
        prompt_kind: prompt.id.startsWith('ai-') ? 'ai' : 'curated',
      });
    }
    try {
      saveJournalEntryLocal(prompt.id, value, context.question, userId);
      hasBackup.current = true;
      setStorageWarning(false);
      if (!userId && value.trim() && !savedTracking.current) {
        savedTracking.current = true;
        trackFunnelEvent('journal_saved', {
          source: getFunnelSource(),
          storage: 'device',
        });
      }
    } catch {
      hasBackup.current = false;
      setStorageWarning(true);
    }
    if (userId) queue.current?.schedule(value);
    else setStatus(hasBackup.current ? 'saved' : 'error');
  }

  async function handleBack() {
    const saved = userId
      ? await queue.current?.flush()
      : hasBackup.current || !text;
    if (saved || hasBackup.current || !text) onBack();
  }

  async function handleClear() {
    if (conflict || loading || isPending) return;
    if (!text || !window.confirm('Clear your writing? This cannot be undone.'))
      return;
    updateText('');
    if (userId) await queue.current?.flush();
    else {
      try {
        deleteJournalEntryLocal(prompt.id);
      } catch {
        setStorageWarning(true);
      }
    }
  }

  function keepBothVersions() {
    const context = writeContext.current;
    if (
      !conflict ||
      !userId ||
      !context ||
      context.userId !== userId ||
      context.promptId !== prompt.id
    )
      return;
    try {
      // Keep the unsynced version as a separate recoverable journal draft.
      saveJournalEntryLocal(
        `${prompt.id}-recovered-${crypto.randomUUID()}`,
        text,
        context.question,
        userId
      );
      deleteJournalEntryLocal(prompt.id, userId);
    } catch {
      setStorageWarning(true);
      return;
    }
    context.question = conflict.promptText || prompt.text;
    setDisplayPromptText(context.question);
    setText(conflict.text);
    currentText.current = conflict.text;
    hasBackup.current = false;
    setConflict(null);
    setStatus('saved');
  }

  return (
    <div className="space-y-4" data-clarity-mask="true">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleBack}
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
        <p className="text-lg">{displayPromptText}</p>
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
          <div className="mt-3 flex flex-wrap gap-4">
            <LocaleLink href={Routes.Pricing} className="font-bold underline">
              See plans for unlimited entries
            </LocaleLink>
            <LocaleLink href={Routes.Dashboard} className="underline">
              Manage my entries
            </LocaleLink>
          </div>
        </div>
      )}

      {loadError && (
        <p role="alert" className="text-sm text-red-700">
          Could not load your saved writing.{' '}
          <button
            type="button"
            className="underline"
            onClick={() =>
              sessionError
                ? window.location.reload()
                : setReload((value) => value + 1)
            }
          >
            Try again
          </button>
        </p>
      )}
      {saveError && (
        <p role="alert" className="text-sm text-red-700">
          {saveError}{' '}
          {hasBackup.current && 'Your draft is saved on this device.'}{' '}
          <button
            type="button"
            className="underline"
            onClick={() => void queue.current?.flush()}
          >
            Retry save
          </button>
        </p>
      )}
      {storageWarning && (
        <p role="alert" className="text-sm text-red-700">
          Browser storage is unavailable. Keep this page open until your writing
          is saved to your account, or copy your writing before leaving.
        </p>
      )}
      {conflict && (
        <div className="space-y-3 rounded border border-amber-400 bg-amber-50 p-3 text-sm">
          <p>
            A newer version exists in your account. Your device draft is shown
            below. Choose how to keep your writing before continuing.
          </p>
          <details>
            <summary className="cursor-pointer">
              View the account version
            </summary>
            <p className="whitespace-pre-wrap max-h-48 overflow-auto mt-2">
              {conflict.text || '(Empty entry)'}
            </p>
          </details>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="underline"
              onClick={keepBothVersions}
            >
              Keep both versions
            </button>
            <button
              type="button"
              className="underline"
              onClick={() => {
                setConflict(null);
                queue.current?.schedule(currentText.current);
                void queue.current?.flush();
              }}
            >
              Replace account version with this draft
            </button>
          </div>
          <p>
            Keeping both opens the account version and leaves your device draft
            in My Journal for you to save separately.
          </p>
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
          aria-label="Your journal entry"
          value={text}
          onChange={(event) => updateText(event.target.value)}
          disabled={loading || isPending || !!conflict}
          placeholder={
            loading || isPending
              ? 'Loading your writing...'
              : 'Start writing here...'
          }
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
        className="flex flex-wrap items-center justify-between gap-3 text-sm"
        style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d' }}
      >
        <div className="flex items-center gap-3">
          <span className="opacity-60">{wordCount} words</span>
          {(status === 'pending' || status === 'saving') && (
            <output>Saving...</output>
          )}
          {status === 'saved' && (
            <span className="flex items-center gap-1 text-green-600">
              <SaveIcon size={12} />{' '}
              {userId ? 'Saved to your account' : 'Saved on this device'}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleClear}
          disabled={loading || isPending || !!conflict}
          className="flex min-h-11 items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          style={{ color: '#ff4d4d' }}
        >
          <Trash2Icon size={14} strokeWidth={2.5} />
          Clear
        </button>
      </div>
      {!isPending && !sessionError && (
        <div className="rounded-xl border-2 border-[#e5e0d8] bg-white p-4 text-sm space-y-3">
          {userId ? (
            <LocaleLink
              href={Routes.Dashboard}
              className="font-semibold underline text-[#2d5da1]"
            >
              View all my journal entries →
            </LocaleLink>
          ) : (
            <>
              <p>
                Your writing stays in this browser. Find it again in My Journal.
                Clearing browser data removes device-only entries.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <LocaleLink
                  href={`${Routes.Register}?callbackUrl=%2Fmy-journal`}
                  className="inline-flex min-h-11 items-center rounded-lg border-2 border-[#2d2d2d] bg-[#2d5da1] px-4 py-2 font-semibold text-white no-underline"
                >
                  Create a free account to save across devices
                </LocaleLink>
                <LocaleLink
                  href={Routes.Dashboard}
                  className="underline text-[#2d5da1]"
                >
                  View My Journal
                </LocaleLink>
              </div>
              <p className="text-xs text-[#58534d]">
                10 cloud-saved entries and 3 AI prompts per day. No card needed.
                After signing up, choose which device entries to save to your
                account.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
