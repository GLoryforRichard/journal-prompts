'use client';

import { loadJournalAction, saveJournalAction } from '@/actions/journal';
import { getFunnelSource, trackFunnelEvent } from '@/lib/analytics';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { authClient } from '@/lib/auth-client';
import { JournalAutosave, type SaveStatus } from '@/lib/journal-autosave';
import {
  confirmJournalCompletion,
  markJournalCompletionTracked,
} from '@/lib/journal-completion';
import {
  saveDeviceJournalCompletion,
  type DeviceCompletionConflict,
} from '@/lib/journal-device-completion';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import {
  saveJournalEntryLocal,
  loadJournalEntryLocal,
  deleteJournalEntryLocal,
  hasNewerJournalVersion,
  type StoredJournalEntry,
} from '@/lib/journal-storage';
import type { Prompt } from '@/lib/prompt-matcher';
import { ArrowLeftIcon, CheckIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface WritingAreaProps {
  prompt: Prompt;
  onBack: () => void;
  backLabel?: string;
  initialEntry?: StoredJournalEntry;
  onStartAnother?: () => void;
}

export function WritingArea({
  prompt,
  onBack,
  backLabel,
  initialEntry,
  onStartAnother,
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
  const [deviceConflict, setDeviceConflict] =
    useState<DeviceCompletionConflict | null>(null);
  const [reload, setReload] = useState(0);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const queue = useRef<JournalAutosave | null>(null);
  const currentText = useRef('');
  const confirmedCloudText = useRef<string | null>(null);
  const completionInFlight = useRef(false);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const completionPanel = useRef<HTMLElement>(null);
  const renderedContext = useRef({ userId, promptId: prompt.id, ready: false });
  renderedContext.current = {
    userId,
    promptId: prompt.id,
    ready: !isPending && !sessionError,
  };
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
    completionInFlight.current = false;
    confirmedCloudText.current = null;
    setCompleting(false);
    setCompleted(false);
    setLoading(true);
    setText('');
    currentText.current = '';
    setLoadError(false);
    setStatus('idle');
    setSaveError('');
    setLimitReached(false);
    setConflict(null);
    setDeviceConflict(null);
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
        if (active) confirmedCloudText.current = value;
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
          if (active) confirmedCloudText.current = result.data.data?.text ?? '';
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

  const editorMatchesCurrent =
    !isPending &&
    !sessionError &&
    writeContext.current?.userId === userId &&
    writeContext.current?.promptId === prompt.id;

  useEffect(() => {
    if (editorMatchesCurrent && !loading && !conflict)
      textarea.current?.focus({ preventScroll: true });
  }, [editorMatchesCurrent, loading, conflict]);

  useEffect(() => {
    if (!completed) return;
    completionPanel.current?.focus({ preventScroll: true });
    completionPanel.current?.scrollIntoView({ block: 'nearest' });
  }, [completed]);

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
      deviceConflict ||
      sessionError ||
      !context ||
      context.promptId !== prompt.id ||
      context.userId !== userId
    )
      return;
    setText(value);
    currentText.current = value;
    setCompleted(false);
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
    const context = writeContext.current;
    if (!editorMatchesCurrent || !context) return;
    const saved = context.userId
      ? await queue.current?.flush()
      : hasBackup.current || !currentText.current;
    if (
      writeContext.current !== context ||
      !renderedContext.current.ready ||
      renderedContext.current.userId !== context.userId ||
      renderedContext.current.promptId !== context.promptId
    )
      return;
    if (saved || hasBackup.current || !currentText.current) onBack();
  }

  async function handleComplete() {
    const context = writeContext.current;
    const value = currentText.current;
    if (
      completed ||
      completionInFlight.current ||
      loading ||
      conflict ||
      deviceConflict?.savedCopy ||
      !context ||
      !value.trim()
    )
      return;
    const isCurrent = () =>
      writeContext.current === context &&
      renderedContext.current.ready &&
      renderedContext.current.userId === context.userId &&
      renderedContext.current.promptId === context.promptId &&
      currentText.current === value;
    if (!isCurrent()) return;
    completionInFlight.current = true;
    setCompleting(true);
    const saved = await confirmJournalCompletion({
      text: value,
      isCurrent,
      save: async () => {
        if (context.userId) return (await queue.current?.flush()) ?? false;
        try {
          const result = saveDeviceJournalCompletion({
            promptId: context.promptId,
            text: value,
            promptText: context.question,
            recoveryId: deviceConflict?.recoveryId,
          });
          if (result.status === 'conflict') {
            setDeviceConflict(result);
            hasBackup.current = result.savedCopy;
            setStorageWarning(!result.savedCopy);
            setStatus(result.savedCopy ? 'saved' : 'error');
            return false;
          }
          setDeviceConflict(null);
          hasBackup.current = true;
          setStorageWarning(false);
          setStatus('saved');
          return true;
        } catch {
          hasBackup.current = false;
          setStorageWarning(true);
          setStatus('error');
          return false;
        }
      },
      isSaved: () =>
        context.userId
          ? confirmedCloudText.current === value
          : hasBackup.current,
    });
    // An old account's request must never update the new editor.
    if (writeContext.current !== context) return;
    completionInFlight.current = false;
    setCompleting(false);
    if (!saved || !isCurrent()) return;
    setCompleted(true);
    if (markJournalCompletionTracked(context.promptId, context.userId)) {
      trackFunnelEvent('journal_completed', {
        source: getFunnelSource(),
        storage: context.userId ? 'cloud' : 'device',
      });
    }
  }

  async function handleClear() {
    if (conflict || deviceConflict || loading || isPending) return;
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

  // Session changes render before effects reset the editor. Never show an old
  // owner's writing or completed state under the newly rendered account.
  if (!editorMatchesCurrent) {
    return (
      <div className="space-y-3" data-clarity-mask="true">
        {sessionError ? (
          <p role="alert">
            Could not verify your account.{' '}
            <button
              type="button"
              className="underline"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </p>
        ) : (
          <output className="block py-4 text-muted-foreground">
            Getting your entry ready…
          </output>
        )}
      </div>
    );
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
      {deviceConflict && (
        <div
          role="alert"
          className="space-y-3 rounded border border-amber-400 bg-amber-50 p-3 text-sm"
        >
          <p className="font-semibold">This entry has another saved version.</p>
          {deviceConflict.savedCopy ? (
            <>
              <p>
                Both versions are saved on this device. Your writing here is a
                separate draft in My Journal; the existing version is unchanged.
              </p>
              <div className="flex flex-wrap gap-4">
                <LocaleLink href={Routes.Dashboard} className="underline">
                  View both entries in My Journal
                </LocaleLink>
                <button
                  type="button"
                  className="underline"
                  onClick={() => setReload((value) => value + 1)}
                >
                  Reopen the latest version
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                We couldn&apos;t save a separate copy. Your writing is still in
                this editor. Keep this page open and retry, or copy your writing
                before leaving.
              </p>
              <button
                type="button"
                className="min-h-11 underline disabled:opacity-50"
                disabled={completing}
                onClick={() => void handleComplete()}
              >
                {completing
                  ? 'Saving your copy…'
                  : 'Retry keeping both versions'}
              </button>
            </>
          )}
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
          ref={textarea}
          aria-label="Your journal entry"
          value={text}
          onChange={(event) => updateText(event.target.value)}
          disabled={loading || isPending || !!conflict}
          readOnly={!!deviceConflict}
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
        <div className="flex flex-wrap items-center gap-4">
          {!completed && !deviceConflict && (
            <button
              type="button"
              onClick={() => void handleComplete()}
              disabled={
                loading || isPending || !!conflict || !text.trim() || completing
              }
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border-2 border-[#2d2d2d] bg-[#2d5da1] px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckIcon size={16} aria-hidden="true" />
              {completing ? 'Saving your entry…' : "I'm done writing"}
            </button>
          )}
          <button
            type="button"
            onClick={handleClear}
            disabled={loading || isPending || !!conflict || !!deviceConflict}
            className="flex min-h-11 items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            style={{ color: '#ff4d4d' }}
          >
            <Trash2Icon size={14} strokeWidth={2.5} />
            Clear
          </button>
        </div>
      </div>
      {completed && !loading && !isPending && !sessionError && (
        <section
          ref={completionPanel}
          tabIndex={-1}
          aria-label="Completed journal entry"
          className="space-y-3 rounded-xl border-2 border-green-700 bg-green-50 p-4"
          style={{ fontFamily: 'var(--font-hand-body)' }}
        >
          <h3 className="flex items-center gap-2 text-xl font-semibold text-green-900">
            <CheckIcon size={20} aria-hidden="true" />
            Your entry is complete
          </h3>
          <output className="block">
            {userId
              ? 'Your writing is saved to your account. Find it anytime in My Journal.'
              : 'Your writing is saved on this device. Save it to a free account to keep it across devices.'}
          </output>
          <div className="flex flex-wrap items-center gap-3">
            <LocaleLink
              href={
                userId
                  ? Routes.Dashboard
                  : `${Routes.Register}?callbackUrl=%2Fmy-journal`
              }
              className="inline-flex min-h-11 items-center rounded-lg border-2 border-[#2d2d2d] bg-[#2d5da1] px-4 py-2 font-semibold text-white no-underline"
              onClick={() => {
                if (!userId)
                  trackFunnelEvent('account_save_clicked', {
                    source: getFunnelSource(),
                  });
              }}
            >
              {userId ? 'View My Journal' : 'Save to a free account'}
            </LocaleLink>
            <button
              type="button"
              className="min-h-11 underline text-[#2d5da1]"
              onClick={() => {
                setCompleted(false);
                textarea.current?.focus();
              }}
            >
              Continue editing
            </button>
            {onStartAnother && (
              <button
                type="button"
                className="min-h-11 underline text-[#2d5da1]"
                onClick={onStartAnother}
              >
                Start another entry
              </button>
            )}
          </div>
          {!userId && (
            <p className="text-sm">
              No card needed. After signing up, choose this device entry in My
              Journal and save it to your account.
            </p>
          )}
          <p className="text-sm">
            Come back tomorrow for a new daily prompt. One entry is enough for
            today.
          </p>
        </section>
      )}
      {!completed && !isPending && !sessionError && (
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
                Your draft saves automatically in this browser. When you&apos;re
                ready, choose &ldquo;I&apos;m done writing&rdquo; to keep it in
                a free account. Clearing browser data removes device-only
                entries.
              </p>
              <LocaleLink
                href={Routes.Dashboard}
                className="underline text-[#2d5da1]"
              >
                View My Journal
              </LocaleLink>
            </>
          )}
        </div>
      )}
    </div>
  );
}
