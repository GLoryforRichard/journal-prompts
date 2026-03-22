import { wobblyBorderRadius } from '@/lib/design-tokens';
import type { AudienceTechniqueConfig } from '@/data/techniques';
import { getTechniqueBySlug } from '@/data/techniques';
import { FAQSchema } from '@/components/seo/faq-schema';
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';
import { TechniqueCard } from '@/components/technique/technique-card';
import { TechniqueHubFAQ } from '@/components/technique/hub-faq';
import { getBaseUrl } from '@/lib/urls';

interface AudienceDetailPageProps {
  audience: AudienceTechniqueConfig;
}

export function AudienceDetailPage({ audience }: AudienceDetailPageProps) {
  const recommendedTechs = audience.recommendedTechniques
    .map((slug) => getTechniqueBySlug(slug))
    .filter(Boolean);

  const base = getBaseUrl();
  return (
    <>
      <FAQSchema faqs={audience.faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: `${base}/` },
          { name: 'Techniques', href: `${base}/techniques` },
          { name: audience.title, href: `${base}/techniques/${audience.slug}` },
        ]}
      />

      {/* Breadcrumb */}
      <nav className="px-4 pt-6 max-w-3xl mx-auto">
        <ol
          className="flex items-center gap-2 text-sm"
          style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d', opacity: 0.6 }}
        >
          <li>
            <a href="/" className="hover:underline" style={{ color: '#2d5da1' }}>
              Home
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="/techniques" className="hover:underline" style={{ color: '#2d5da1' }}>
              Techniques
            </a>
          </li>
          <li>/</li>
          <li>{audience.title}</li>
        </ol>
      </nav>

      {/* Hero */}
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
            <span className="text-5xl">{audience.emoji}</span>
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            {audience.h1}
          </h1>
          <p
            className="text-xl md:text-2xl max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
              opacity: 0.8,
            }}
          >
            {audience.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Why content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {audience.whyContent.map((p, i) => (
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
            <p className="text-sm">{audience.psychologySource}</p>
          </blockquote>
        </div>
      </section>

      {/* Recommended techniques */}
      {recommendedTechs.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{
                fontFamily: 'var(--font-hand-title)',
                color: '#2d2d2d',
              }}
            >
              Recommended Techniques
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {recommendedTechs.map(
                (tech) =>
                  tech && (
                    <TechniqueCard key={tech.slug} technique={tech} />
                  )
              )}
            </div>
          </div>
        </section>
      )}

      <TechniqueHubFAQ faqs={audience.faqs} />

      {/* Back to hub */}
      <section className="py-8 px-4 text-center">
        <a
          href="/techniques"
          className="text-base no-underline"
          style={{
            fontFamily: 'var(--font-hand-body)',
            color: '#2d5da1',
          }}
        >
          ← Explore all journaling techniques
        </a>
      </section>
    </>
  );
}
