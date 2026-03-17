import { wobblyBorderRadius } from '@/lib/design-tokens';

interface SceneHeroProps {
  h1: string;
  subtitle: string;
  emoji: string;
}

export function SceneHero({ h1, subtitle, emoji }: SceneHeroProps) {
  return (
    <section className="py-16 md:py-24 text-center px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div
          className="inline-block text-5xl p-4"
          style={{
            backgroundColor: '#fff9c4',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.sm,
            boxShadow: '4px 4px 0px 0px #2d2d2d',
            transform: 'rotate(-2deg)',
          }}
        >
          {emoji}
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
        <a
          href="#prompt-finder"
          className="inline-block px-8 py-3 text-lg text-white transition-all duration-200 cursor-pointer"
          style={{
            fontFamily: 'var(--font-hand-title)',
            backgroundColor: '#ff4d4d',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.sm,
            boxShadow: '4px 4px 0px 0px #2d2d2d',
          }}
        >
          Get Your Prompt →
        </a>
      </div>
    </section>
  );
}
