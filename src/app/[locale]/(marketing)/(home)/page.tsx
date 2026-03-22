import { SceneFAQ } from '@/components/scene/scene-faq';
import { FAQSchema } from '@/components/seo/faq-schema';
import { SceneIcon } from '@/components/ui/scene-icon';
import { scenes } from '@/data/scenes';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import { constructMetadata } from '@/lib/metadata';
import { Routes } from '@/routes';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { LocaleLink } from '@/i18n/navigation';
import {
  BookOpenIcon,
  BrainIcon,
  SparklesIcon,
  CheckCircleIcon,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    pathname: '',
  });
}

const homeFaqs = [
  {
    question: 'What are journal prompts?',
    answer:
      'Journal prompts are thought-provoking questions or statements designed to inspire reflective writing. They help you explore your thoughts, feelings, and experiences in a structured way.',
  },
  {
    question: 'How does the prompt matching work?',
    answer:
      'Our system uses a curated library of 1,000+ prompts tagged by mood and topic. When you select your current mood and desired direction, we match you with the 3 most relevant prompts.',
  },
  {
    question: 'Is my writing saved?',
    answer:
      'Your writing is saved locally in your browser using localStorage. It stays on your device and is never sent to any server. Clear your browser data to remove it.',
  },
  {
    question: 'Are these prompts free to use?',
    answer:
      'Yes! All prompts and the writing space are completely free. No account required, no hidden fees.',
  },
  {
    question: 'Can I use these prompts for therapy?',
    answer:
      'While our prompts are grounded in psychology research, they are not a substitute for professional therapy. They can complement therapeutic practices when used alongside professional guidance.',
  },
];

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage(_props: HomePageProps) {
  return (
    <>
      <FAQSchema faqs={homeFaqs} />

      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div
            className="inline-block px-4 py-1 text-sm"
            style={{
              fontFamily: 'var(--font-hand-body)',
              backgroundColor: '#fff9c4',
              border: '2px solid #2d2d2d',
              borderRadius: wobblyBorderRadius.sm,
              transform: 'rotate(-1deg)',
            }}
          >
            Smart Journal Prompt Finder
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            Journal Prompts
          </h1>
          <p
            className="text-xl md:text-2xl max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
              opacity: 0.8,
            }}
          >
            Don&apos;t scroll through 1000 prompts. Tell us how you feel, and
            we&apos;ll find the perfect journal prompt for you in 3 seconds.
          </p>
          <LocaleLink
            href={Routes.FindYourPrompt}
            className="inline-block px-8 py-3 text-lg text-white no-underline transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: 'var(--font-hand-title)',
              backgroundColor: '#ff4d4d',
              border: '2px solid #2d2d2d',
              borderRadius: wobblyBorderRadius.sm,
              boxShadow: '4px 4px 0px 0px #2d2d2d',
            }}
          >
            Get Your Prompt →
          </LocaleLink>
        </div>
      </section>

      {/* Social Proof */}
      <section className="pb-12 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { icon: BookOpenIcon, text: '1,000+ curated prompts' },
            { icon: BrainIcon, text: 'Backed by psychology research' },
            { icon: SparklesIcon, text: 'Matched to your mood' },
            { icon: CheckCircleIcon, text: '100% free' },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-hand-body)',
                color: '#2d2d2d',
                opacity: 0.6,
              }}
            >
              <item.icon size={16} />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            Browse by Topic
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {scenes.map((scene, i) => {
              const rotations = [
                '-1.5deg',
                '1deg',
                '-0.5deg',
                '1.5deg',
                '0.5deg',
                '-1deg',
                '2deg',
                '-0.8deg',
                '1.2deg',
                '-1.8deg',
                '0.3deg',
                '-0.3deg',
                '1.8deg',
                '-1.2deg',
              ];
              return (
                <LocaleLink
                  key={scene.slug}
                  href={`/${scene.slug}`}
                  className="block p-4 transition-all duration-200 group no-underline relative"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #2d2d2d',
                    borderRadius: wobblyBorderRadius.md,
                    boxShadow: '4px 4px 0px 0px #2d2d2d',
                    transform: `rotate(${rotations[i % rotations.length]})`,
                    color: '#2d2d2d',
                  }}
                >
                  <div className="mb-2">
                    <SceneIcon slug={scene.slug} size={28} />
                  </div>
                  <h3
                    className="text-base font-bold"
                    style={{ fontFamily: 'var(--font-hand-title)' }}
                  >
                    {scene.h1}
                  </h3>
                </LocaleLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <SceneFAQ faqs={homeFaqs} />
    </>
  );
}
