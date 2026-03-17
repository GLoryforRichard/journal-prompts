import { wobblyBorderRadius } from '@/lib/design-tokens';

interface HowToUseProps {
  steps: string[];
}

export function HowToUse({ steps }: HowToUseProps) {
  const rotations = ['1deg', '-0.5deg', '0.8deg', '-1deg', '0.5deg'];

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
          How to Use These Prompts
        </h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4"
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: '3px 3px 0px 0px #2d2d2d',
                transform: `rotate(${rotations[i % rotations.length]})`,
                fontFamily: 'var(--font-hand-body)',
              }}
            >
              <span
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold"
                style={{
                  backgroundColor: '#2d5da1',
                  fontFamily: 'var(--font-hand-title)',
                }}
              >
                {i + 1}
              </span>
              <p className="text-lg">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
