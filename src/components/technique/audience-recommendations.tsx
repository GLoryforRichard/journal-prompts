import { wobblyBorderRadius, handShadow } from '@/lib/design-tokens';
import { LocaleLink } from '@/i18n/navigation';

const audiences = [
  {
    emoji: '🌿',
    title: 'For Anxiety',
    description: 'Calm racing thoughts and break the rumination cycle with evidence-based methods.',
    techniques: [
      { name: 'CBT Journaling', href: '/techniques/cbt-journaling' },
      { name: 'Gratitude', href: '/techniques/gratitude-journaling' },
    ],
    sceneLink: { label: 'Mental Health Prompts', href: '/journal-prompts-for-mental-health' },
  },
  {
    emoji: '🌱',
    title: 'For Beginners',
    description: 'Start with structured, low-friction methods that build the habit before anything else.',
    techniques: [
      { name: '5-Minute Journal', href: '/techniques/5-minute-journal' },
      { name: 'Gratitude', href: '/techniques/gratitude-journaling' },
    ],
    sceneLink: { label: 'Beginner Guide', href: '/techniques/for-beginners' },
  },
  {
    emoji: '⚡',
    title: 'For ADHD',
    description: 'Short sessions with built-in structure keep your brain engaged without overwhelm.',
    techniques: [
      { name: 'Bullet Journaling', href: '/techniques/bullet-journaling' },
      { name: '5-Minute Journal', href: '/techniques/5-minute-journal' },
    ],
    sceneLink: null,
  },
  {
    emoji: '📚',
    title: 'For Students',
    description: 'Combine organization and self-reflection to manage academic stress and build focus.',
    techniques: [
      { name: 'Bullet Journaling', href: '/techniques/bullet-journaling' },
      { name: 'Free Writing', href: '/techniques/free-writing' },
    ],
    sceneLink: { label: 'Teen Prompts', href: '/journal-prompts-for-teens' },
  },
  {
    emoji: '💜',
    title: 'For Grief & Healing',
    description: 'Process difficult emotions at your own pace through expressive writing.',
    techniques: [
      { name: 'Free Writing', href: '/techniques/free-writing' },
      { name: 'Morning Pages', href: '/techniques/morning-pages' },
    ],
    sceneLink: null,
  },
  {
    emoji: '🎨',
    title: 'For Creativity',
    description: 'Bypass your inner critic and access unexpected ideas through unstructured methods.',
    techniques: [
      { name: 'Morning Pages', href: '/techniques/morning-pages' },
      { name: 'Free Writing', href: '/techniques/free-writing' },
    ],
    sceneLink: { label: 'Fun Prompts', href: '/fun-journal-prompts' },
  },
];

export function AudienceRecommendations() {
  return (
    <section id="by-situation" className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          Journaling Techniques by Situation
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="p-5"
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.md,
                boxShadow: handShadow.default,
              }}
            >
              <div className="text-3xl mb-2">{a.emoji}</div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
              >
                {a.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d', opacity: 0.75 }}
              >
                {a.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {a.techniques.map((t) => (
                  <LocaleLink
                    key={t.href}
                    href={t.href}
                    className="inline-block px-3 py-1 text-xs no-underline transition-transform hover:scale-105"
                    style={{
                      fontFamily: 'var(--font-hand-body)',
                      color: '#2d5da1',
                      backgroundColor: '#f0f4ff',
                      border: '1px solid #2d5da1',
                      borderRadius: '4px',
                    }}
                  >
                    {t.name}
                  </LocaleLink>
                ))}
              </div>
              {a.sceneLink && (
                <LocaleLink
                  href={a.sceneLink.href}
                  className="text-sm no-underline hover:underline"
                  style={{ fontFamily: 'var(--font-hand-body)', color: '#ff4d4d' }}
                >
                  {a.sceneLink.label} →
                </LocaleLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
