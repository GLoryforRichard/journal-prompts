import { wobblyBorderRadius } from '@/lib/design-tokens';
import type { TechniqueConfig } from '@/data/techniques';
import { LocaleLink } from '@/i18n/navigation';

interface RelatedTechniquesProps {
  techniques: TechniqueConfig[];
}

export function RelatedTechniques({ techniques }: RelatedTechniquesProps) {
  if (techniques.length === 0) return null;

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          Try a Journaling Technique
        </h2>
        <p
          className="text-lg leading-relaxed mb-6"
          style={{
            fontFamily: 'var(--font-hand-body)',
            color: '#2d2d2d',
            opacity: 0.8,
          }}
        >
          Pair these prompts with a proven journaling method for deeper results.
        </p>
        <div className="flex flex-wrap gap-3">
          {techniques.map((tech) => (
            <LocaleLink
              key={tech.slug}
              href={`/techniques/${tech.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm no-underline transition-transform hover:scale-105"
              style={{
                fontFamily: 'var(--font-hand-body)',
                color: '#2d2d2d',
                backgroundColor: '#ffffff',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: '3px 3px 0px 0px #2d2d2d',
              }}
            >
              <span>{tech.emoji}</span>
              <span>{tech.title}</span>
            </LocaleLink>
          ))}
          <LocaleLink
            href="/techniques"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm no-underline transition-transform hover:scale-105"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d5da1',
              backgroundColor: '#f0f4ff',
              border: '2px solid #2d5da1',
              borderRadius: wobblyBorderRadius.sm,
            }}
          >
            Explore all techniques →
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
