import { wobblyBorderRadius } from '@/lib/design-tokens';

interface TechniqueMistakesProps {
  title: string;
  items: { mistake: string; fix: string }[];
}

export function TechniqueMistakes({ title, items }: TechniqueMistakesProps) {
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
          {items.map((item, i) => (
            <div
              key={i}
              className="p-5"
              style={{
                backgroundColor: '#fdfbf7',
                border: '2px dashed #e5e0d8',
                borderRadius: wobblyBorderRadius.md,
              }}
            >
              <p
                className="text-base font-bold"
                style={{
                  fontFamily: 'var(--font-hand-title)',
                  color: '#cc3333',
                }}
              >
                ✗ {item.mistake}
              </p>
              <p
                className="text-base mt-2 leading-relaxed"
                style={{
                  fontFamily: 'var(--font-hand-body)',
                  color: '#2d7d46',
                }}
              >
                ✓ {item.fix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
