import { SceneFAQ } from '@/components/scene/scene-faq';
import TestimonialsSection from '@/components/blocks/testimonials/testimonials';
import { PromptFinder } from '@/components/prompt-finder/prompt-finder';
import { FocusedPromptLinks } from '@/components/home/focused-prompt-links';
import { PromptArticleSection } from '@/components/home/focused-prompt-page';
import { FAQSchema } from '@/components/seo/faq-schema';
import { SceneIcon } from '@/components/ui/scene-icon';
import { scenes } from '@/data/scenes';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
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

  return constructMetadata({
    title: '#1 Journal Prompt Finder | Journal Prompts by Mood',
    description:
      'Find free journal prompts for mental health, self-discovery, gratitude, daily reflection, and more with our fast journal prompt finder and built-in writing space.',
    locale,
    pathname: '',
  });
}

const homeFaqs = [
  {
    question: 'What are journal prompts?',
    answer:
      'Journal prompts are questions, statements, or short exercises that help you start writing without facing a blank page. Good journal prompts make reflection easier by giving your thoughts a direction, whether you want daily journaling, self-discovery, gratitude, or mental health support.',
  },
  {
    question: 'How does the journal prompt finder work?',
    answer:
      'Our journal prompt finder uses a curated library of 1,000+ prompts tagged by mood, topic, and writing direction. When you choose how you feel and what you want to explore, we surface the most relevant journal prompts so you can start writing fast.',
  },
  {
    question: 'Can I use these journal prompts for daily journaling?',
    answer:
      'Yes. Many people use this site as a daily journaling tool. You can come back each morning or evening, choose your mood, and get a prompt for reflection, gratitude, self-discovery, healing, or planning.',
  },
  {
    question:
      'Are these journal prompts good for mental health and self-discovery?',
    answer:
      'They are designed to support emotional awareness, self-reflection, and honest writing. Many prompts are inspired by CBT, mindfulness, expressive writing, and positive psychology. They can support mental health habits, but they are not a replacement for professional care.',
  },
  {
    question: 'Is my writing saved?',
    answer:
      'Guest writing is saved in your browser on this device. When you sign in, your writing is saved to your account so you can access it across devices. Guest entries remain in the browser where they were written.',
  },
  {
    question: 'Are these prompts free to use?',
    answer:
      'The curated prompts and writing space are free to use. AI-generated prompts have daily limits, with higher limits available on paid plans.',
  },
  {
    question: 'Can I use these prompts for therapy?',
    answer:
      'While our prompts are grounded in psychology research, they are not a substitute for professional therapy. They can complement therapeutic practices when used alongside professional guidance.',
  },
];

const homeIntro = {
  title: 'How to Use the Journal Prompt Finder to Start Writing Fast',
  paragraphs: [
    'Most people do not need more journal prompts. They need a faster way to get to the right prompt without scrolling through page after page of ideas that do not fit the moment. That is what this journal prompt finder is built for.',
    'Instead of forcing one fixed journaling routine, the tool lets you choose how you feel and what you want from the session. That makes it useful whether you want daily journal prompts, mental health journal prompts, gratitude prompts, or a self-discovery writing session.',
  ],
};

const homeSteps = [
  {
    title: 'Choose your mood',
    description:
      'Start with how you actually feel right now. That makes the journal prompts more relevant than a random list.',
  },
  {
    title: 'Pick a writing direction',
    description:
      'Tell the tool whether you want self-discovery, gratitude, healing, goal-setting, relationships, or creativity.',
  },
  {
    title: 'Write immediately',
    description:
      'Use the best matching journal prompt, then write on the page before overthinking has a chance to slow you down.',
  },
];

const homeWhy = {
  title: 'Why the Right Journal Prompts Work Better Than Random Lists',
  paragraphs: [
    'A generic list of journal prompts can be useful, but it often creates a second problem: too many choices. When you are anxious, mentally tired, or just trying to keep a daily journaling habit alive, extra choices create friction. The best journal prompts are the ones you will actually answer today, not the ones that merely sound impressive.',
    'Matching prompts to mood helps solve that. A gratitude journal prompt fits a very different mental state than a healing journal prompt or a self-discovery question. By narrowing the pool before you start, the tool helps you get to a meaningful prompt faster and spend more time writing.',
    'This page is also built for people who want to experiment with journaling without commitment. You can use the tool for five minutes in the morning, browse topic pages when you want to go deeper, or come back every day for a fresh writing angle. That mix of speed, relevance, and low friction is what makes a journal prompt finder genuinely useful.',
  ],
};

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
            Journal Prompt Finder for Every Mood
          </h1>
          <p
            className="text-xl md:text-2xl max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
              opacity: 0.8,
            }}
          >
            {
              "Find free journal prompts for daily reflection, self-discovery, gratitude, mental health, and more. Tell us how you feel, and we'll match you with the right journal prompt in seconds."
            }
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#prompt-finder"
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
            </a>
            <a
              href="#topics"
              className="inline-block px-8 py-3 text-lg no-underline transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: 'var(--font-hand-title)',
                color: '#2d2d2d',
                backgroundColor: '#ffffff',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: '4px 4px 0px 0px #2d2d2d',
              }}
            >
              Browse Topics
            </a>
          </div>
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

      <PromptFinder />

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
          >
            {homeIntro.title}
          </h2>
          {homeIntro.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d' }}
            >
              {paragraph}
            </p>
          ))}
          <div className="grid gap-4 md:grid-cols-3">
            {homeSteps.map((step, index) => (
              <div
                key={step.title}
                className="p-5"
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #2d2d2d',
                  borderRadius: wobblyBorderRadius.md,
                  boxShadow: '4px 4px 0px 0px #2d2d2d',
                }}
              >
                <div
                  className="text-base font-bold mb-3"
                  style={{
                    fontFamily: 'var(--font-hand-title)',
                    color: '#ff4d4d',
                  }}
                >
                  {index + 1}. {step.title}
                </div>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-hand-body)',
                    color: '#2d2d2d',
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PromptArticleSection {...homeWhy} />

      {/* Browse by Category */}
      <section id="topics" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            Browse Journal Prompts by Topic
          </h2>
          <p
            className="text-lg text-center max-w-3xl mx-auto mb-10"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
              opacity: 0.8,
            }}
          >
            {
              'Explore journal prompts by topic if you already know what kind of writing you want to do. These topic hubs cover everything from mental health and self-discovery to gratitude, daily reflection, kids, teens, middle school, and high school journaling.'
            }
          </p>
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

      <FocusedPromptLinks />
      <TestimonialsSection />

      {/* FAQ Section */}
      <SceneFAQ faqs={homeFaqs} />
    </>
  );
}
