import { constructMetadata } from '@/lib/metadata';
import { techniques, audienceTechniques } from '@/data/techniques';
import { FAQSchema } from '@/components/seo/faq-schema';
import { TechniqueHubHero } from '@/components/technique/hub-hero';
import { TechniqueCard } from '@/components/technique/technique-card';
import { TechniqueMatcher } from '@/components/technique/technique-matcher';
import { TechniqueHubFAQ } from '@/components/technique/hub-faq';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

/**
 * Phase 1: Only show these slugs. Add more as Google indexes them.
 */
const ACTIVE_TECHNIQUE_SLUGS = [
  'free-writing',
  'gratitude-journaling',
  '5-minute-journal',
  'morning-pages',
  'bullet-journaling',
  'cbt-journaling',
];
const ACTIVE_AUDIENCE_SLUGS = ['for-beginners'];

const hubFaqs = [
  {
    question: 'What are journaling techniques?',
    answer:
      'Journaling techniques are structured methods for writing in a journal. They range from simple practices like gratitude journaling (listing things you\'re thankful for) to more complex approaches like CBT journaling (analyzing thought patterns). Different techniques serve different goals — some help with anxiety, others boost creativity, and some help you build better habits.',
  },
  {
    question: 'What is the best journaling technique for beginners?',
    answer:
      'The 5-minute journal is widely considered the best technique for beginners because it uses simple prompts, takes only 5 minutes, and eliminates the "blank page" problem. Gratitude journaling is another great starting point. Both are structured enough to remove the guesswork while being flexible enough to feel personal.',
  },
  {
    question: 'How many types of journaling are there?',
    answer:
      'There are dozens of journaling types, but the most widely practiced include free writing, gratitude journaling, bullet journaling, morning pages, CBT journaling, art journaling, dream journaling, and the 5-minute journal. The best approach is to try 2-3 methods and see which one fits your personality and goals.',
  },
  {
    question: 'Which journaling method is most effective for mental health?',
    answer:
      'CBT (Cognitive Behavioral Therapy) journaling has the strongest research evidence for mental health benefits, specifically for anxiety and depression. Expressive writing (a form of free writing about emotions) is also well-supported by research. For general wellbeing, gratitude journaling is the most studied technique.',
  },
  {
    question: 'How do I choose the right journaling technique?',
    answer:
      'Consider three factors: your goal (stress relief, creativity, productivity), your available time (5 minutes vs. 30 minutes), and your personality (do you prefer structure or freedom?). Our technique matcher tool above can help you find the best fit based on your specific situation.',
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: 'Journaling Techniques: Find Your Perfect Method',
    description:
      'Explore proven journaling techniques — from free writing to CBT journaling. Take our quiz to find the perfect method for your goals, personality, and schedule.',
    locale,
    pathname: '/techniques',
  });
}

export default function TechniquesHubPage() {
  const activeTechniques = techniques.filter((t) =>
    ACTIVE_TECHNIQUE_SLUGS.includes(t.slug)
  );
  const activeAudience = audienceTechniques.filter((t) =>
    ACTIVE_AUDIENCE_SLUGS.includes(t.slug)
  );

  return (
    <>
      <FAQSchema faqs={hubFaqs} />

      <TechniqueHubHero />

      <TechniqueMatcher />

      {/* Technique Cards */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            Popular Journaling Techniques
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {activeTechniques.map((technique) => (
              <TechniqueCard key={technique.slug} technique={technique} />
            ))}
            {activeAudience.map((audience) => (
              <TechniqueCard
                key={audience.slug}
                technique={{
                  slug: audience.slug,
                  title: audience.title,
                  heroSubtitle: audience.heroSubtitle,
                  emoji: audience.emoji,
                  timePerSession: 'Varies',
                  difficulty: 'beginner',
                  bestFor: [],
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What Are Journaling Techniques — SEO content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            What Are Journaling Techniques?
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            Journaling techniques are structured methods that guide how you write in a journal. While some people prefer completely open-ended journaling, research shows that using a specific technique can make your practice more effective, more consistent, and more enjoyable.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            Different journaling methods serve different purposes. Gratitude journaling rewires your brain for positivity. Free writing unlocks creativity and processes emotions. CBT journaling helps manage anxiety by challenging negative thought patterns. The key is finding the technique that matches your goals and personality.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            Whether you call them journaling techniques, journaling methods, or types of journaling — the concept is the same: a repeatable approach that turns blank pages into a powerful tool for self-improvement, mental health, and personal growth.
          </p>
        </div>
      </section>

      {/* Types of Journaling Techniques — additional SEO content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            Types of Journaling Techniques
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            Journaling techniques generally fall into a few categories. <strong>Expressive techniques</strong> like free writing and morning pages focus on emotional release — you write without stopping to let your subconscious speak. <strong>Structured techniques</strong> like the 5-minute journal and bullet journaling give you a template to follow, making it easier to stay consistent. <strong>Therapeutic techniques</strong> like CBT journaling and expressive writing are backed by clinical research and target specific mental health outcomes.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            The best journaling technique for you depends on what you want to achieve. If you struggle with anxiety, CBT journaling teaches you to challenge negative thought patterns. If you want to build a daily habit with minimal effort, the 5-minute journal is the most accessible starting point. If creativity and self-discovery are your goals, free writing opens doors you didn&apos;t know existed.
          </p>

          <h3
            className="text-2xl font-bold"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            How to Choose the Right Journaling Method
          </h3>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            Choosing a journaling technique doesn&apos;t have to be overwhelming. Start by asking yourself three questions: What is my primary goal? (stress relief, productivity, self-discovery, healing) How much time can I commit each day? (2 minutes, 10 minutes, 30 minutes) Do I prefer structure or freedom? Your answers will naturally narrow down the options. We built the technique matcher quiz above to automate this exact process.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            One important insight from journaling research: consistency matters more than technique. A simple gratitude list done daily will outperform an elaborate CBT thought record done once a month. Start with the technique that feels easiest, build the habit, then experiment with others as your practice matures.
          </p>

          <h3
            className="text-2xl font-bold"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            The Science Behind Journaling Techniques
          </h3>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            Journaling isn&apos;t just a feel-good practice — it&apos;s backed by decades of peer-reviewed research. Dr. James Pennebaker&apos;s landmark studies at the University of Texas showed that expressive writing for just 15-20 minutes over 3-4 days led to measurable improvements in immune function, reduced anxiety, and better emotional regulation. Gratitude journaling research by Dr. Robert Emmons at UC Davis demonstrated that writing about thankfulness 3 times per week increased well-being by 25%.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            More recently, studies on CBT-based writing interventions published in Behaviour Research and Therapy found that structured thought recording significantly reduces symptoms of anxiety and depression. Whether you choose free writing, gratitude journaling, or a structured approach like the 5-minute journal, science supports the practice as a legitimate tool for mental health and personal development.
          </p>
        </div>
      </section>

      {/* Internal links to scene pages */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            Looking for Prompts Instead?
          </h2>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            If you already have a journaling technique and just need inspiration, explore our curated prompt collections by topic.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Gratitude Prompts', href: '/gratitude-journal-prompts' },
              { title: 'Mental Health Prompts', href: '/journal-prompts-for-mental-health' },
              { title: 'Shadow Work Prompts', href: '/shadow-work-journal-prompts' },
              { title: 'Self-Discovery Prompts', href: '/self-discovery-journal-prompts' },
              { title: 'Morning Prompts', href: '/morning-journal-prompts' },
              { title: 'Daily Prompts', href: '/daily-journal-prompts' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-block px-4 py-2 text-sm no-underline transition-transform hover:scale-105"
                style={{
                  fontFamily: 'var(--font-hand-body)',
                  color: '#2d5da1',
                  backgroundColor: '#f0f4ff',
                  border: '2px solid #2d5da1',
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                }}
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <TechniqueHubFAQ faqs={hubFaqs} />
    </>
  );
}
