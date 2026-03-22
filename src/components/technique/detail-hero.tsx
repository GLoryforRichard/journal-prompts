import { wobblyBorderRadius } from '@/lib/design-tokens';

interface TechniqueDetailHeroProps {
  h1: string;
  subtitle: string;
  emoji: string;
  timePerSession: string;
  difficulty: string;
  bestFor: string[];
}

export function TechniqueDetailHero({
  h1,
  subtitle,
  emoji,
  timePerSession,
  difficulty,
  bestFor,
}: TechniqueDetailHeroProps) {
  return (
    <section className="py-16 md:py-24 text-center px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div
          className="inline-block p-4"
          style={{
            backgroundColor: '#fff9c4',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.sm,
            boxShadow: '4px 4px 0px 0px #2d2d2d',
            transform: 'rotate(-2deg)',
          }}
        >
          <span className="text-5xl">{emoji}</span>
        </div>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          {h1}
        </h1>
        <p
          className="text-xl md:text-2xl max-w-2xl mx-auto"
          style={{
            fontFamily: 'var(--font-hand-body)',
            color: '#2d2d2d',
            opacity: 0.8,
          }}
        >
          {subtitle}
        </p>

        {/* Quick info badges */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <span
            className="px-3 py-1 text-sm"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d5da1',
              backgroundColor: '#f0f4ff',
              border: '1px solid #d0d8f0',
              borderRadius: '4px',
            }}
          >
            ⏱ {timePerSession}
          </span>
          <span
            className="px-3 py-1 text-sm capitalize"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d7d46',
              backgroundColor: '#f0fff4',
              border: '1px solid #d0f0d8',
              borderRadius: '4px',
            }}
          >
            📊 {difficulty}
          </span>
        </div>

        {/* Best for tags */}
        {bestFor.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {bestFor.map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-xs"
                style={{
                  fontFamily: 'var(--font-hand-body)',
                  color: '#2d2d2d',
                  opacity: 0.7,
                  backgroundColor: '#fdfbf7',
                  border: '1px dashed #e5e0d8',
                  borderRadius: '4px',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
