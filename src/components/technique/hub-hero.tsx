import { wobblyBorderRadius } from '@/lib/design-tokens';

export function TechniqueHubHero() {
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
          <span className="text-5xl">📝</span>
        </div>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          Journaling Techniques
        </h1>
        <p
          className="text-xl md:text-2xl max-w-2xl mx-auto"
          style={{
            fontFamily: 'var(--font-hand-body)',
            color: '#2d2d2d',
            opacity: 0.8,
          }}
        >
          Not sure where to start? You&apos;re not alone. Most people try journaling, get stuck, and quit within two weeks.
        </p>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{
            fontFamily: 'var(--font-hand-body)',
            color: '#2d2d2d',
            opacity: 0.65,
          }}
        >
          Take our quiz to find the right technique for your goals — or compare methods side by side.
        </p>
        <a
          href="#technique-quiz"
          className="inline-block px-8 py-3 text-lg font-bold no-underline transition-all duration-150 hover:-translate-y-0.5"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#ffffff',
            backgroundColor: '#ff4d4d',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.sm,
            boxShadow: '4px 4px 0px 0px #2d2d2d',
          }}
        >
          Take the Quiz →
        </a>
      </div>
    </section>
  );
}
