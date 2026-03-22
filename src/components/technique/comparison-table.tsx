'use client';

import { wobblyBorderRadius, handShadow } from '@/lib/design-tokens';
import { LocaleLink } from '@/i18n/navigation';

const techniques = [
  {
    name: 'Free Writing',
    slug: 'free-writing',
    bestFor: 'Creativity, emotional release',
    time: '10-20 min',
    difficulty: 'Beginner',
    structure: 'None',
  },
  {
    name: 'Gratitude Journaling',
    slug: 'gratitude-journaling',
    bestFor: 'Mood, positivity',
    time: '5-10 min',
    difficulty: 'Beginner',
    structure: 'Moderate',
  },
  {
    name: '5-Minute Journal',
    slug: '5-minute-journal',
    bestFor: 'Daily habit building',
    time: '5 min',
    difficulty: 'Beginner',
    structure: 'High',
  },
  {
    name: 'Morning Pages',
    slug: 'morning-pages',
    bestFor: 'Deep processing, clarity',
    time: '25-40 min',
    difficulty: 'Intermediate',
    structure: 'Low',
  },
  {
    name: 'Bullet Journaling',
    slug: 'bullet-journaling',
    bestFor: 'Organization, planning',
    time: '10-15 min',
    difficulty: 'Intermediate',
    structure: 'High',
  },
  {
    name: 'CBT Journaling',
    slug: 'cbt-journaling',
    bestFor: 'Anxiety relief, reframing',
    time: '10-15 min',
    difficulty: 'Intermediate',
    structure: 'High',
  },
];

const headDuels = [
  {
    title: 'Gratitude Journaling vs. Free Writing for Anxiety',
    body: 'If anxiety is your main concern, both techniques help — but in different ways. Gratitude journaling shifts your attention away from threats and toward positives, which research shows reduces cortisol levels over time. Free writing, on the other hand, lets you dump anxious thoughts onto paper, interrupting the rumination loop. For acute anxiety episodes, free writing is more immediately cathartic. For long-term anxiety management, gratitude journaling builds a more resilient mindset. Many people alternate between both.',
  },
  {
    title: 'Bullet Journal vs. Morning Pages for Productivity',
    body: 'These techniques serve productivity from opposite angles. Bullet journaling is an action-oriented system — it organizes tasks, tracks habits, and forces you to prioritize through monthly migration. Morning pages are a clarity tool — they clear mental clutter so you can focus on what truly matters. If you struggle with disorganization and missed deadlines, start with bullet journaling. If you struggle with decision fatigue and feeling overwhelmed, morning pages help you cut through the noise. Some high performers use morning pages to think, then bullet journaling to execute.',
  },
  {
    title: '5-Minute Journal vs. Gratitude Journaling for Beginners',
    body: 'Both are excellent for beginners, but the 5-minute journal has a slight edge because of its fixed structure. You answer the same prompts every day — no decisions about what to write. Gratitude journaling is more flexible: you choose how many items to list, how much detail to include, and whether to write in the morning or evening. If you tend to overthink and want zero friction, the 5-minute journal is your best bet. If you want a bit more freedom within a simple framework, gratitude journaling gives you room to grow.',
  },
];

export function ComparisonTable() {
  return (
    <section className="py-12 px-4" id="compare">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          Compare Journaling Techniques Side by Side
        </h2>

        {/* Desktop table */}
        <div
          className="hidden md:block overflow-x-auto"
          style={{
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.lg,
            boxShadow: handShadow.default,
          }}
        >
          <table className="w-full text-left" style={{ fontFamily: 'var(--font-hand-body)' }}>
            <thead>
              <tr style={{ backgroundColor: '#fff9c4', borderBottom: '2px solid #2d2d2d' }}>
                {['Technique', 'Best For', 'Time', 'Difficulty', 'Structure'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-sm font-bold"
                    style={{ color: '#2d2d2d', fontFamily: 'var(--font-hand-title)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {techniques.map((t, i) => (
                <tr
                  key={t.slug}
                  style={{
                    backgroundColor: i % 2 === 0 ? '#ffffff' : '#fdfbf7',
                    borderBottom: i < techniques.length - 1 ? '1px dashed #e5e0d8' : undefined,
                  }}
                >
                  <td className="px-4 py-3">
                    <LocaleLink
                      href={`/techniques/${t.slug}`}
                      className="font-bold no-underline hover:underline"
                      style={{ color: '#2d5da1', fontFamily: 'var(--font-hand-title)' }}
                    >
                      {t.name}
                    </LocaleLink>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#2d2d2d' }}>{t.bestFor}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#2d2d2d' }}>{t.time}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#2d2d2d' }}>{t.difficulty}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#2d2d2d' }}>{t.structure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden space-y-4">
          {techniques.map((t) => (
            <LocaleLink
              key={t.slug}
              href={`/techniques/${t.slug}`}
              className="block p-4 no-underline"
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: handShadow.default,
              }}
            >
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: 'var(--font-hand-title)', color: '#2d5da1' }}
              >
                {t.name}
              </h3>
              <div
                className="grid grid-cols-2 gap-2 text-sm"
                style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d' }}
              >
                <span className="opacity-60">Best For</span>
                <span>{t.bestFor}</span>
                <span className="opacity-60">Time</span>
                <span>{t.time}</span>
                <span className="opacity-60">Difficulty</span>
                <span>{t.difficulty}</span>
                <span className="opacity-60">Structure</span>
                <span>{t.structure}</span>
              </div>
            </LocaleLink>
          ))}
        </div>

        {/* Head-to-head comparisons */}
        <div className="mt-12 space-y-8">
          {headDuels.map((duel) => (
            <div key={duel.title}>
              <h3
                className="text-xl md:text-2xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
              >
                {duel.title}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d', opacity: 0.85 }}
              >
                {duel.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
