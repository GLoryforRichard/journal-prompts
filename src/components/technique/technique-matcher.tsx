'use client';

import { wobblyBorderRadius, handShadow } from '@/lib/design-tokens';
import { useEffect, useState } from 'react';
import { getRecommendations } from './technique-logic';
import type { Recommendation } from './technique-logic';

const BLOCKERS = [
  { id: 'blank-page', label: 'Blank page anxiety', emoji: '😰' },
  { id: 'consistency', label: "Can't stay consistent", emoji: '📅' },
  { id: 'negative', label: 'Journaling feels negative', emoji: '😞' },
  { id: 'unsure', label: "Don't know which method", emoji: '🤔' },
  { id: 'boring', label: 'Journal feels boring', emoji: '😴' },
  { id: 'therapeutic', label: 'Want therapeutic benefits', emoji: '💚' },
] as const;

const GOALS = [
  { id: 'mental-health', label: 'Anxiety relief', emoji: '🧘' },
  { id: 'productivity', label: 'Productivity', emoji: '🎯' },
  { id: 'self-discovery', label: 'Self-discovery', emoji: '🔍' },
  { id: 'creativity', label: 'Creativity', emoji: '🎨' },
  { id: 'habit', label: 'Build a daily habit', emoji: '✅' },
  { id: 'healing', label: 'Emotional healing', emoji: '💜' },
] as const;

const STORAGE_KEY = 'technique-quiz-result';

export function TechniqueMatcher() {
  const [step, setStep] = useState(0);
  const [blocker, setBlocker] = useState('');
  const [goal, setGoal] = useState('');
  const [copied, setCopied] = useState(false);

  // Restore from URL params or localStorage on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlBlocker = params.get('qb');
    const urlGoal = params.get('qg');
    if (urlBlocker && urlGoal) {
      setBlocker(urlBlocker);
      setGoal(urlGoal);
      setStep(2);
      return;
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { blocker: b, goal: g } = JSON.parse(saved);
        if (b && g) {
          setBlocker(b);
          setGoal(g);
          setStep(2);
        }
      }
    } catch {}
  }, []);

  // Save to localStorage when result is shown
  useEffect(() => {
    if (step === 2 && blocker && goal) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ blocker, goal }));
      } catch {}
    }
  }, [step, blocker, goal]);

  const handleShare = () => {
    const url = new URL(window.location.href.split('?')[0]);
    url.searchParams.set('qb', blocker);
    url.searchParams.set('qg', goal);
    url.hash = 'technique-quiz';
    const shareUrl = url.toString();
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        window.prompt('Copy this link:', shareUrl);
      });
    } else {
      window.prompt('Copy this link:', shareUrl);
    }
  };

  const recommendations = step === 2 ? getRecommendations(blocker, goal) : [];

  return (
    <section className="py-12 px-4" id="technique-quiz">
      <div className="max-w-2xl mx-auto">
        <div
          className="p-6 md:p-8"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.lg,
            boxShadow: handShadow.default,
          }}
        >
          {step === 0 && (
            <div className="space-y-6">
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{
                  fontFamily: 'var(--font-hand-title)',
                  color: '#2d2d2d',
                }}
              >
                What&apos;s blocking you?
              </h2>
              <p
                className="text-base"
                style={{
                  fontFamily: 'var(--font-hand-body)',
                  color: '#2d2d2d',
                  opacity: 0.7,
                }}
              >
                Choose the challenge that resonates most. We&apos;ll match you with the right technique.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {BLOCKERS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setBlocker(b.id);
                      setStep(1);
                    }}
                    className="flex items-center gap-2 p-3 text-left cursor-pointer transition-all duration-150 hover:-translate-y-0.5"
                    style={{
                      fontFamily: 'var(--font-hand-body)',
                      color: '#2d2d2d',
                      backgroundColor: '#fdfbf7',
                      border: '2px solid #e5e0d8',
                      borderRadius: wobblyBorderRadius.sm,
                    }}
                  >
                    <span className="text-xl">{b.emoji}</span>
                    <span className="text-sm">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{
                  fontFamily: 'var(--font-hand-title)',
                  color: '#2d2d2d',
                }}
              >
                What matters most to you?
              </h2>
              <p
                className="text-base"
                style={{
                  fontFamily: 'var(--font-hand-body)',
                  color: '#2d2d2d',
                  opacity: 0.7,
                }}
              >
                Pick the goal that feels most important right now.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setGoal(g.id);
                      setStep(2);
                    }}
                    className="flex items-center gap-2 p-3 text-left cursor-pointer transition-all duration-150 hover:-translate-y-0.5"
                    style={{
                      fontFamily: 'var(--font-hand-body)',
                      color: '#2d2d2d',
                      backgroundColor: '#fdfbf7',
                      border: '2px solid #e5e0d8',
                      borderRadius: wobblyBorderRadius.sm,
                    }}
                  >
                    <span className="text-xl">{g.emoji}</span>
                    <span className="text-sm">{g.label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(0)}
                className="text-sm cursor-pointer"
                style={{
                  fontFamily: 'var(--font-hand-body)',
                  color: '#2d5da1',
                  background: 'none',
                  border: 'none',
                }}
              >
                ← Back
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{
                  fontFamily: 'var(--font-hand-title)',
                  color: '#2d2d2d',
                }}
              >
                Your recommended techniques
              </h2>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <a
                    key={rec.slug}
                    href={`/techniques/${rec.slug}`}
                    className="block p-4 no-underline transition-all duration-150 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: '#fdfbf7',
                      border: '2px solid #e5e0d8',
                      borderRadius: wobblyBorderRadius.sm,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{rec.emoji}</span>
                      <div>
                        <h3
                          className="text-lg font-bold"
                          style={{
                            fontFamily: 'var(--font-hand-title)',
                            color: '#2d2d2d',
                          }}
                        >
                          {rec.name}
                        </h3>
                        <p
                          className="text-sm mt-1"
                          style={{
                            fontFamily: 'var(--font-hand-body)',
                            color: '#2d2d2d',
                            opacity: 0.75,
                          }}
                        >
                          {rec.reason}
                        </p>
                        <span
                          className="inline-block text-xs mt-2 px-2 py-1"
                          style={{
                            fontFamily: 'var(--font-hand-body)',
                            color: '#2d5da1',
                            backgroundColor: '#f0f4ff',
                            borderRadius: '4px',
                          }}
                        >
                          {rec.time} per session
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setStep(0);
                    setBlocker('');
                    setGoal('');
                    try { localStorage.removeItem(STORAGE_KEY); } catch {}
                  }}
                  className="text-sm cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-hand-body)',
                    color: '#2d5da1',
                    background: 'none',
                    border: 'none',
                  }}
                >
                  ← Try again
                </button>
                <a
                  href="#compare"
                  className="text-sm no-underline hover:underline"
                  style={{
                    fontFamily: 'var(--font-hand-body)',
                    color: '#2d5da1',
                  }}
                >
                  Compare all techniques side by side →
                </a>
                <button
                  onClick={handleShare}
                  className="text-sm cursor-pointer px-3 py-1 transition-colors"
                  style={{
                    fontFamily: 'var(--font-hand-body)',
                    color: '#ffffff',
                    backgroundColor: copied ? '#22c55e' : '#ff4d4d',
                    border: 'none',
                    borderRadius: wobblyBorderRadius.sm,
                  }}
                >
                  {copied ? 'Link copied!' : 'Share your result'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
