import { SceneIcon } from '@/components/ui/scene-icon';
import { wobblyBorderRadius } from '@/lib/design-tokens';

interface SceneHeroProps {
  h1: string;
  subtitle: string;
  slug: string;
}

export function SceneHero({ h1, subtitle, slug }: SceneHeroProps) {
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
          <SceneIcon slug={slug} size={48} />
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
      </div>
    </section>
  );
}
