import { SceneIcon } from '@/components/ui/scene-icon';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import { scenes } from '@/data/scenes';
import { LocaleLink } from '@/i18n/navigation';

interface RelatedScenesProps {
  sceneSlugs: string[];
  currentScene: string;
}

export function RelatedScenes({ sceneSlugs, currentScene }: RelatedScenesProps) {
  const related = sceneSlugs
    .filter((slug) => slug !== currentScene)
    .map((slug) => scenes.find((s) => s.slug === slug))
    .filter(Boolean)
    .slice(0, 4);

  if (related.length === 0) return null;

  const rotations = ['-1.5deg', '1deg', '-0.8deg', '1.5deg'];

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
          Explore More Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((scene, i) => (
            <LocaleLink
              key={scene!.slug}
              href={`/${scene!.slug}`}
              className="block p-5 transition-all duration-200 group no-underline"
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.md,
                boxShadow: '4px 4px 0px 0px #2d2d2d',
                transform: `rotate(${rotations[i % rotations.length]})`,
                color: '#2d2d2d',
              }}
            >
              {/* Tape decoration */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-16 opacity-60"
                style={{
                  backgroundColor: '#fff9c4',
                  border: '1px solid #e5e0d8',
                  transform: 'rotate(-3deg)',
                }}
              />
              <div className="mb-2">
                <SceneIcon slug={scene!.slug} size={28} />
              </div>
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-hand-title)' }}
              >
                {scene!.h1}
              </h3>
              <p
                className="text-sm mt-1 opacity-70"
                style={{ fontFamily: 'var(--font-hand-body)' }}
              >
                {scene!.heroSubtitle}
              </p>
            </LocaleLink>
          ))}
        </div>
      </div>
    </section>
  );
}
