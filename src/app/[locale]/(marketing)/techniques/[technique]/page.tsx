import { constructMetadata } from '@/lib/metadata';
import {
  techniques,
  audienceTechniques,
  getTechniqueBySlug,
  getAudienceTechniqueBySlug,
} from '@/data/techniques';
import { FAQSchema } from '@/components/seo/faq-schema';
import { HowToSchema } from '@/components/seo/howto-schema';
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';
import { TechniqueDetailHero } from '@/components/technique/detail-hero';
import { TechniqueHowTo } from '@/components/technique/how-to';
import { TechniqueMistakes } from '@/components/technique/mistakes';
import { TechniqueWhyItWorks } from '@/components/technique/why-it-works';
import { TechniqueHubFAQ } from '@/components/technique/hub-faq';
import { AudienceDetailPage } from '@/components/technique/audience-detail';
import { getBaseUrl } from '@/lib/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { notFound } from 'next/navigation';

/**
 * Phase 1: Only these slugs are active. Add more as Google indexes them.
 */
const ACTIVE_SLUGS = [
  'free-writing',
  'gratitude-journaling',
  '5-minute-journal',
  'morning-pages',
  'bullet-journaling',
  'cbt-journaling',
  'for-beginners',
];

export function generateStaticParams() {
  return ACTIVE_SLUGS.map((technique) => ({ technique }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; technique: string }>;
}): Promise<Metadata | undefined> {
  const { locale, technique: slug } = await params;

  const tech = getTechniqueBySlug(slug);
  if (tech) {
    return constructMetadata({
      title: tech.metaTitle,
      description: tech.metaDescription,
      locale,
      pathname: `/techniques/${slug}`,
    });
  }

  const audience = getAudienceTechniqueBySlug(slug);
  if (audience) {
    return constructMetadata({
      title: audience.metaTitle,
      description: audience.metaDescription,
      locale,
      pathname: `/techniques/${slug}`,
    });
  }

  return undefined;
}

export default async function TechniqueDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; technique: string }>;
}) {
  const { technique: slug } = await params;

  // Check if this slug is active
  if (!ACTIVE_SLUGS.includes(slug)) {
    notFound();
  }

  // Check if it's a technique page
  const tech = getTechniqueBySlug(slug);
  if (tech) {
    const base = getBaseUrl();
    return (
      <>
        <FAQSchema faqs={tech.faqs} />
        <HowToSchema
          name={tech.howTo.title}
          description={tech.metaDescription}
          steps={tech.howTo.steps}
          totalTime={tech.timePerSession}
        />
        <BreadcrumbSchema
          items={[
            { name: 'Home', href: `${base}/` },
            { name: 'Techniques', href: `${base}/techniques` },
            { name: tech.title, href: `${base}/techniques/${tech.slug}` },
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
            <li>{tech.title}</li>
          </ol>
        </nav>

        <TechniqueDetailHero
          h1={tech.h1}
          subtitle={tech.heroSubtitle}
          emoji={tech.emoji}
          timePerSession={tech.timePerSession}
          difficulty={tech.difficulty}
          bestFor={tech.bestFor}
        />

        {/* What Is section */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
            >
              {tech.whatIs.title}
            </h2>
            {tech.whatIs.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-lg leading-relaxed"
                style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d' }}
              >
                {p}
              </p>
            ))}
          </div>
        </section>

        <TechniqueHowTo title={tech.howTo.title} steps={tech.howTo.steps} />

        <TechniqueMistakes
          title={tech.commonMistakes.title}
          items={tech.commonMistakes.items}
        />

        <TechniqueWhyItWorks
          title={tech.whyItWorks.title}
          paragraphs={tech.whyItWorks.paragraphs}
          psychologySource={tech.whyItWorks.psychologySource}
        />

        {/* Related prompts internal link */}
        {tech.relatedScenes.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-3xl mx-auto">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
              >
                Try {tech.title} with These Prompts
              </h2>
              <div className="flex flex-wrap gap-3">
                {tech.relatedScenes.map((sceneSlug) => (
                  <a
                    key={sceneSlug}
                    href={`/${sceneSlug}`}
                    className="inline-block px-4 py-2 text-sm no-underline transition-transform hover:scale-105"
                    style={{
                      fontFamily: 'var(--font-hand-body)',
                      color: '#2d5da1',
                      backgroundColor: '#f0f4ff',
                      border: '2px solid #2d5da1',
                      borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                    }}
                  >
                    {sceneSlug
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <TechniqueHubFAQ faqs={tech.faqs} />

        {/* Back to hub link */}
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

  // Check if it's an audience page
  const audience = getAudienceTechniqueBySlug(slug);
  if (audience) {
    return <AudienceDetailPage audience={audience} />;
  }

  notFound();
}
