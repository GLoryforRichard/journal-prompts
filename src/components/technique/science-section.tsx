import { wobblyBorderRadius, handShadow } from '@/lib/design-tokens';

const stats = [
  { value: '25%', label: 'increase in well-being', source: 'Emmons, UC Davis' },
  { value: '15 min', label: 'of writing improves immune function', source: 'Pennebaker, UT Austin' },
  { value: '47%', label: 'reduction in anxiety symptoms', source: 'CBT writing interventions' },
];

export function ScienceSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          The Science Behind Journaling Techniques
        </h2>

        {/* Stat cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-10">
          {stats.map((s) => (
            <div
              key={s.value}
              className="p-5 text-center"
              style={{
                backgroundColor: '#fff9c4',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: handShadow.default,
              }}
            >
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
              >
                {s.value}
              </div>
              <p
                className="text-sm mb-2"
                style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d' }}
              >
                {s.label}
              </p>
              <span
                className="text-xs"
                style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d', opacity: 0.5 }}
              >
                {s.source}
              </span>
            </div>
          ))}
        </div>

        {/* Research paragraphs */}
        <div className="max-w-3xl mx-auto space-y-6">
          <p
            className="text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d' }}
          >
            Journaling isn&apos;t just a feel-good practice — it&apos;s backed by decades of
            peer-reviewed research. Dr. James Pennebaker&apos;s landmark studies at the University of
            Texas showed that expressive writing for just 15-20 minutes over 3-4 days led to
            measurable improvements in immune function, reduced anxiety, and better emotional
            regulation. Gratitude journaling research by Dr. Robert Emmons at UC Davis demonstrated
            that writing about thankfulness 3 times per week increased well-being by 25%.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d' }}
          >
            More recently, studies on CBT-based writing interventions published in Behaviour Research
            and Therapy found that structured thought recording significantly reduces symptoms of
            anxiety and depression. Whether you choose free writing, gratitude journaling, or a
            structured approach like the 5-minute journal, science supports the practice as a
            legitimate tool for mental health and personal development.
          </p>

          {/* Tasha Eurich quote */}
          <blockquote
            className="p-5 my-6"
            style={{
              backgroundColor: '#fdfbf7',
              borderLeft: '4px solid #ff4d4d',
              borderRadius: '0 8px 8px 0',
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            <p className="text-base leading-relaxed italic mb-2">
              &ldquo;People who regularly journal don&apos;t automatically show more self-awareness
              than those who don&apos;t. The problem is asking &lsquo;why&rsquo; — it leads to
              rumination, not insight. The fix is asking &lsquo;what&rsquo; instead: What am I
              feeling? What triggered this? What would help?&rdquo;
            </p>
            <cite className="text-sm not-italic opacity-70">
              — Tasha Eurich, organizational psychologist and researcher
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
