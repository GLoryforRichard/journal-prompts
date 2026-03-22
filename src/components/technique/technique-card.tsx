import { wobblyBorderRadius, handShadow } from '@/lib/design-tokens';
import { LocaleLink } from '@/i18n/navigation';

interface TechniqueCardProps {
  technique: {
    slug: string;
    title: string;
    heroSubtitle: string;
    emoji: string;
    timePerSession: string;
    difficulty: string;
    bestFor?: string[];
  };
}

export function TechniqueCard({ technique }: TechniqueCardProps) {
  return (
    <LocaleLink
      href={`/techniques/${technique.slug}`}
      className="block p-6 no-underline transition-all duration-200 hover:-translate-y-1"
      style={{
        backgroundColor: '#ffffff',
        border: '2px solid #2d2d2d',
        borderRadius: wobblyBorderRadius.md,
        boxShadow: handShadow.default,
      }}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl flex-shrink-0">{technique.emoji}</span>
        <div className="space-y-2">
          <h3
            className="text-xl font-bold"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            {technique.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
              opacity: 0.75,
            }}
          >
            {technique.heroSubtitle}
          </p>
          <div className="flex gap-3 pt-1">
            <span
              className="text-xs px-2 py-1"
              style={{
                fontFamily: 'var(--font-hand-body)',
                color: '#2d5da1',
                backgroundColor: '#f0f4ff',
                borderRadius: '4px',
              }}
            >
              {technique.timePerSession}
            </span>
            <span
              className="text-xs px-2 py-1 capitalize"
              style={{
                fontFamily: 'var(--font-hand-body)',
                color: '#2d7d46',
                backgroundColor: '#f0fff4',
                borderRadius: '4px',
              }}
            >
              {technique.difficulty}
            </span>
          </div>
        </div>
      </div>
    </LocaleLink>
  );
}
