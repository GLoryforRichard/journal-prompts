import { constructMetadata } from '@/lib/metadata';
import { techniques, audienceTechniques } from '@/data/techniques';
import { FAQSchema } from '@/components/seo/faq-schema';
import { HowToSchema } from '@/components/seo/howto-schema';
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';
import { TechniqueHubHero } from '@/components/technique/hub-hero';
import { TechniqueCard } from '@/components/technique/technique-card';
import { TechniqueMatcher } from '@/components/technique/technique-matcher';
import { ComparisonTable } from '@/components/technique/comparison-table';
import { TroubleshootingGuide } from '@/components/technique/troubleshooting-guide';
import { AudienceRecommendations } from '@/components/technique/audience-recommendations';
import { ScienceSection } from '@/components/technique/science-section';
import { TechniqueHubFAQ } from '@/components/technique/hub-faq';
import { TocSidebar } from '@/components/technique/toc-sidebar';
import { LocaleLink } from '@/i18n/navigation';
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
  {
    question: 'What are the best ways to journal?',
    answer:
      'The best ways to journal depend on your goals. For building a habit, try the 5-minute journal with its fixed prompts. For emotional processing, free writing lets you express without filters. For anxiety management, CBT journaling helps challenge negative thoughts. For productivity, bullet journaling combines planning with reflection. The most effective way is whichever one you\'ll do consistently.',
  },
  {
    question: 'Is journaling the same as keeping a diary?',
    answer:
      'Not quite. A diary typically records events chronologically — what happened today. Journaling is more intentional: it uses techniques to process emotions, set goals, challenge thoughts, or practice gratitude. A diary asks "what happened?" while journaling asks "what does it mean and what will I do about it?" That said, there\'s overlap, and any form of regular writing brings benefits.',
  },
  {
    question: 'How long should I journal each day?',
    answer:
      'As little as 5 minutes can be effective. Research shows that structured journaling for 5-10 minutes produces measurable benefits in mood and well-being. If you have more time, 15-20 minutes allows for deeper processing. The 5-minute journal is designed for busy schedules, while morning pages require 25-40 minutes. Start shorter than you think you need — you can always add more time later.',
  },
  {
    question: 'What should I write in my journal?',
    answer:
      'That depends on your technique. In a gratitude journal, write 3 specific things you\'re thankful for and why. In free writing, write whatever comes to mind without stopping. In CBT journaling, record a situation, your thoughts, and evidence for/against those thoughts. If you\'re unsure, start with: "Right now I feel..." and keep writing. Prompts can also help — we have over 1,000 free journal prompts organized by topic.',
  },
  {
    question: 'Can journaling help with anxiety?',
    answer:
      'Yes — multiple studies confirm that journaling reduces anxiety symptoms. CBT journaling is the most evidence-based approach for anxiety specifically, as it teaches you to identify and challenge anxious thoughts. Expressive writing (free writing about feelings) reduces cortisol levels and interrupts rumination. Even simple gratitude journaling shifts attention away from threat-focused thinking. For clinical anxiety, journaling works best alongside professional treatment.',
  },
  {
    question: 'What is the difference between structured and free journaling?',
    answer:
      'Structured journaling uses a template or prompts — like the 5-minute journal (fixed questions) or CBT journaling (thought records). You know exactly what to write. Free journaling (free writing, morning pages) has no rules — you write whatever comes to mind. Structured techniques are better for beginners and specific goals. Free techniques are better for emotional release and creativity. Many people use both depending on their mood.',
  },
  {
    question: 'What if journaling feels like a chore?',
    answer:
      'This usually means one of three things: your sessions are too long, you\'re using the wrong technique, or you\'re putting too much pressure on quality. Try cutting your session to 5 minutes. Switch techniques — if gratitude journaling feels forced, try free writing. And remember: messy, boring journal entries are just as effective as eloquent ones. If it still feels like a chore after trying different approaches, take a break and come back in a few weeks.',
  },
];

const howToStartSteps = [
  {
    step: 'Pick one technique (not three)',
    detail:
      'Choose a single method that matches your primary goal. The comparison table above or our quiz can help. Trying multiple techniques at once splits your focus and makes it harder to build a habit.',
  },
  {
    step: 'Get a notebook or open an app',
    detail:
      'Don\'t overthink this. A cheap notebook and any pen will do. If you prefer digital, use any notes app you already have. The tool matters far less than the consistency.',
  },
  {
    step: 'Set a recurring 5-minute slot',
    detail:
      'Attach journaling to an existing habit: after your morning coffee, during lunch, or before bed. Set a phone reminder. Five minutes is the maximum for your first two weeks.',
  },
  {
    step: 'Write something for 7 days straight',
    detail:
      'It doesn\'t have to be good, deep, or long. One sentence counts. The goal is building the neural pathway that associates the time slot with writing. Momentum matters more than quality.',
  },
  {
    step: 'After 2 weeks, experiment',
    detail:
      'Once journaling feels natural, try a different technique for a week. You might discover that morning pages suit you better than the 5-minute journal, or vice versa. Your ideal method often isn\'t the first one you try.',
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: 'Journaling Techniques: Find the Right Method for You',
    description:
      'Explore 12+ journaling techniques with our free quiz. Compare methods like gratitude journaling, CBT, bullet journaling & morning pages. Find what works for your goals.',
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

  // Group techniques for categorized display
  const expressiveTechniques = activeTechniques.filter((t) =>
    ['free-writing', 'morning-pages'].includes(t.slug)
  );
  const structuredTechniques = activeTechniques.filter((t) =>
    ['5-minute-journal', 'bullet-journaling', 'gratitude-journaling'].includes(t.slug)
  );
  const therapeuticTechniques = activeTechniques.filter((t) =>
    ['cbt-journaling'].includes(t.slug)
  );

  return (
    <>
      {/* Floating TOC sidebar — visible on xl screens */}
      <TocSidebar />

      {/* Structured Data */}
      <FAQSchema faqs={hubFaqs} />
      <HowToSchema
        name="How to Start Journaling"
        description="A beginner-friendly step-by-step guide to starting a journaling practice that sticks. Pick a technique, set up your space, and build the habit in 5 simple steps."
        steps={howToStartSteps}
        totalTime="PT14D"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: 'https://journalprompts.org' },
          { name: 'Journaling Techniques', href: 'https://journalprompts.org/techniques' },
        ]}
      />

      {/* 1. Hero */}
      <TechniqueHubHero />

      {/* 2. Technique Matcher Quiz */}
      <TechniqueMatcher />

      {/* 3. Comparison Table */}
      <ComparisonTable />

      {/* 4. Technique Cards — grouped by type */}
      <section id="popular-techniques" className="py-12 px-4">
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

          {/* Expressive */}
          <h3
            className="text-2xl font-bold mb-4 mt-2"
            style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
          >
            Expressive Techniques
          </h3>
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {expressiveTechniques.map((technique) => (
              <TechniqueCard key={technique.slug} technique={technique} />
            ))}
          </div>

          {/* Structured */}
          <h3
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
          >
            Structured Techniques
          </h3>
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {structuredTechniques.map((technique) => (
              <TechniqueCard key={technique.slug} technique={technique} />
            ))}
          </div>

          {/* Therapeutic */}
          <h3
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
          >
            Therapeutic Techniques
          </h3>
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {therapeuticTechniques.map((technique) => (
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

      {/* 5. Troubleshooting Guide */}
      <TroubleshootingGuide />

      {/* 6. Audience Recommendations */}
      <AudienceRecommendations />

      {/* 7. How to Start Journaling */}
      <section id="how-to-start" className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            How to Start Journaling: A Step-by-Step Guide
          </h2>
          <div className="space-y-6">
            {howToStartSteps.map((s, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-lg font-bold"
                  style={{
                    fontFamily: 'var(--font-hand-title)',
                    color: '#ffffff',
                    backgroundColor: '#2d5da1',
                    borderRadius: '50%',
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
                  >
                    {s.step}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-hand-body)',
                      color: '#2d2d2d',
                      opacity: 0.85,
                    }}
                  >
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Science Section */}
      <ScienceSection />

      {/* 9. What Are Journaling Techniques — SEO content */}
      <section id="what-are" className="py-12 px-4">
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

      {/* 10. Types of Journaling Techniques — SEO content (trimmed: removed How to Choose and Science subsections) */}
      <section id="types" className="py-12 px-4">
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
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
            }}
          >
            One important insight from journaling research: consistency matters more than technique. A simple gratitude list done daily will outperform an elaborate CBT thought record done once a month. Start with the technique that feels easiest, build the habit, then experiment with others as your practice matures.
          </p>
        </div>
      </section>

      {/* 11. Internal links to scene pages — expanded to 10 */}
      <section id="prompts" className="py-12 px-4">
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
              { title: 'Kids Prompts', href: '/journal-prompts-for-kids' },
              { title: 'Teen Prompts', href: '/journal-prompts-for-teens' },
              { title: 'Deep Prompts', href: '/deep-journal-prompts' },
              { title: 'Mindfulness Prompts', href: '/mindfulness-journal-prompts' },
            ].map((link) => (
              <LocaleLink
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
              </LocaleLink>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <TechniqueHubFAQ faqs={hubFaqs} />
    </>
  );
}
