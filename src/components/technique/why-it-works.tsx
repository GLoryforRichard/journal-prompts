import { wobblyBorderRadius } from '@/lib/design-tokens';

interface TechniqueWhyItWorksProps {
  title: string;
  paragraphs: string[];
  psychologySource: string;
}

export function TechniqueWhyItWorks({
  title,
  paragraphs,
  psychologySource,
}: TechniqueWhyItWorksProps) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          {title}
        </h2>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            {p}
          </p>
        ))}
        <blockquote
          className="p-4 mt-4"
          style={{
            backgroundColor: '#fff9c4',
            border: '2px dashed #2d2d2d',
            borderRadius: wobblyBorderRadius.sm,
            fontFamily: 'var(--font-hand-body)',
            fontStyle: 'italic',
            color: '#2d2d2d',
            transform: 'rotate(0.5deg)',
          }}
        >
          <p className="text-sm">{psychologySource}</p>
        </blockquote>
      </div>
    </section>
  );
}
