'use client';

import { PromptFinder } from '@/components/prompt-finder/prompt-finder';
import { useCurrentUser } from '@/hooks/use-current-user';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import {
  BookOpenIcon,
  FlameIcon,
  PenLineIcon,
  SparklesIcon,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { JournalEntries } from './journal-entries';

const dailyPrompts = [
  'What are you most grateful for right now?',
  'What is one small thing that brought you joy today?',
  'What would you tell your younger self about this moment?',
  'What is something you are proud of recently?',
  'If today had a theme, what would it be and why?',
  'What is one thing you want to let go of?',
  'What does your ideal tomorrow look like?',
  'What lesson has life taught you this week?',
  'Who made a difference in your day, and how?',
  'What are you looking forward to?',
];

function getDailyPrompt(): string {
  const today = new Date();
  const dayIndex =
    (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) %
    dailyPrompts.length;
  return dailyPrompts[dayIndex];
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

interface JournalEntry {
  promptId: string;
  text: string;
  date: string;
  wordCount: number;
}

function getJournalEntries(): JournalEntry[] {
  if (typeof window === 'undefined') return [];
  const entries: JournalEntry[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('journal-writing-')) {
      const text = localStorage.getItem(key) || '';
      if (text.trim()) {
        entries.push({
          promptId: key.replace('journal-writing-', ''),
          text,
          date: '', // We don't store dates yet, will show as "Recent"
          wordCount: text.trim().split(/\s+/).filter(Boolean).length,
        });
      }
    }
  }
  return entries.sort((a, b) => b.wordCount - a.wordCount);
}

function getStreak(): number {
  // Simple streak based on number of entries (placeholder)
  if (typeof window === 'undefined') return 0;
  const entries = getJournalEntries();
  return entries.length;
}

export function MyJournal() {
  const user = useCurrentUser();
  const [showFinder, setShowFinder] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEntries(getJournalEntries());
    setStreak(getStreak());
  }, []);

  const handleStartWriting = useCallback(() => {
    setShowFinder(true);
  }, []);

  const dailyPrompt = getDailyPrompt();
  const greeting = getGreeting();
  const firstName = user?.name?.split(' ')[0] || '';

  if (showFinder) {
    return (
      <div className="py-6 px-4 md:px-6">
        <button
          onClick={() => setShowFinder(false)}
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

  return (
    <div
      className="py-6 px-4 md:px-6 space-y-6"
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
          {greeting}, {firstName}
        </h1>
        {mounted && streak > 0 && (
          <p
            className="flex items-center gap-1.5 text-sm"
            style={{ color: '#2d2d2d', opacity: 0.7 }}
          >
            <FlameIcon size={16} style={{ color: '#ff4d4d' }} />
            {streak} journal {streak === 1 ? 'entry' : 'entries'} written
          </p>
        )}
      </div>

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
          &ldquo;{dailyPrompt}&rdquo;
        </p>
        <button
          onClick={handleStartWriting}
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
          Start Writing
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Find Your Prompt */}
        <button
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

        {/* Surprise Me */}
        <button
          onClick={handleStartWriting}
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
                Get a fresh, unique prompt
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Recent Entries */}
      {mounted && <JournalEntries entries={entries} />}
    </div>
  );
}
