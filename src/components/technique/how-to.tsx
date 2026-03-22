import { wobblyBorderRadius, handShadow } from '@/lib/design-tokens';

interface TechniqueHowToProps {
  title: string;
  steps: { step: string; detail: string }[];
}

export function TechniqueHowTo({ title, steps }: TechniqueHowToProps) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          {title}
        </h2>
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex gap-4 p-5"
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: handShadow.default,
              }}
            >
              <div
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-bold"
                style={{
                  fontFamily: 'var(--font-hand-title)',
                  backgroundColor: '#ff4d4d',
                  color: '#ffffff',
                  borderRadius: '50%',
                }}
              >
                {i + 1}
              </div>
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{
                    fontFamily: 'var(--font-hand-title)',
                    color: '#2d2d2d',
                  }}
                >
                  {s.step}
                </h3>
                <p
                  className="text-base mt-1 leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-hand-body)',
                    color: '#2d2d2d',
                    opacity: 0.8,
                  }}
                >
                  {s.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
