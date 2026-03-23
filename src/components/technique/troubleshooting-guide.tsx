'use client';

import { wobblyBorderRadius } from '@/lib/design-tokens';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

const problems = [
  {
    question: 'I stare at the blank page and can\'t write anything',
    answer:
      'Blank page anxiety is the #1 reason people quit journaling. The fix is simple: remove the blank page. Start with a structured technique like the 5-Minute Journal, which gives you specific prompts to answer. You don\'t have to think about what to write — just respond. Once writing feels natural (usually 2-3 weeks), you can experiment with more open-ended methods. Another trick: write "I don\'t know what to write" and keep going. The words always come.',
  },
  {
    question: 'Journaling makes me feel worse, not better',
    answer:
      'This is more common than you think, and it\'s backed by research. Organizational psychologist Tasha Eurich found that regular journalers show no more self-awareness than non-journalers — because asking "why" questions ("Why do I feel this way?") leads to rumination, not insight. The fix: switch from "why" to "what" questions ("What am I feeling right now? What triggered it? What would help?"). Also consider CBT journaling, which forces you to challenge negative thoughts rather than spiral into them. If journaling consistently makes you feel worse, talk to a mental health professional.',
  },
  {
    question: 'I start strong but quit within 2 weeks',
    answer:
      'You\'re not lazy — your habit design is wrong. Habit scientist BJ Fogg found that the key to consistency is making the behavior tiny and attaching it to an existing routine. Instead of "I\'ll journal for 20 minutes every morning," try: "After I pour my coffee, I\'ll write one sentence." That\'s it. One sentence. Once that feels automatic, let it naturally grow. Also, never aim for daily — 3-4 times per week is enough to see benefits. Missing a day isn\'t failure; missing two weeks is a sign you need a simpler approach.',
  },
  {
    question: 'I\'ve been journaling for months but it feels stale',
    answer:
      'Journaling staleness means you\'ve outgrown your current technique — which is actually a sign of growth. If you\'ve been doing gratitude journaling, try free writing for a week. If you\'ve been doing morning pages, try CBT thought records. The technique matcher quiz at the top of this page can help you find a fresh approach. Other ways to shake things up: change your physical location, switch from paper to digital (or vice versa), or set a constraint (write with your non-dominant hand, write in third person, write a letter to your future self).',
  },
  {
    question: 'Perfectionism kills my journaling practice',
    answer:
      'The perfectionism trap is trying to write "well" instead of writing honestly. Morning Pages are the antidote: three pages of stream-of-consciousness writing where the explicit rule is that it doesn\'t have to be good. Julia Cameron calls morning pages "spiritual windshield wipers" — they\'re not meant to be read, judged, or shared. Another powerful technique: set a timer for 5 minutes and write without lifting your pen. The physical constraint of continuous writing makes perfectionism impossible. Remember: no one will ever read your journal unless you choose to share it.',
  },
];

function ProblemItem({ problem }: { problem: { question: string; answer: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b-2 border-dashed border-[#e5e0d8] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
      >
        <h3
          className="text-lg font-bold pr-4"
          style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
        >
          {problem.question}
        </h3>
        <ChevronDownIcon
          size={20}
          strokeWidth={2.5}
          className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: '#ff4d4d' }}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p
            className="pb-4 text-base leading-relaxed"
            style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d', opacity: 0.85 }}
          >
            {problem.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TroubleshootingGuide() {
  return (
    <section id="troubleshooting" className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          Why Journaling Feels Hard (And How to Fix It)
        </h2>
        <p
          className="text-lg mb-8"
          style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d', opacity: 0.7 }}
        >
          Most journaling advice skips the hard part. Here are real solutions for real problems.
        </p>
        <div
          className="p-6"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.lg,
            boxShadow: '4px 4px 0px 0px #2d2d2d',
          }}
        >
          {problems.map((p, i) => (
            <ProblemItem key={i} problem={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
