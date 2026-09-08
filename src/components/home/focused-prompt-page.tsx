import { PromptFinder } from '@/components/prompt-finder/prompt-finder';
import { FeaturedPrompts } from '@/components/scene/featured-prompts';
import { HowToUse } from '@/components/scene/how-to-use';
import { SceneCTA } from '@/components/scene/scene-cta';
import { SceneFAQ } from '@/components/scene/scene-faq';
import { FAQSchema } from '@/components/seo/faq-schema';
import type { FocusedPromptPageConfig } from '@/data/focused-prompt-pages';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import { FocusedPromptLinks } from './focused-prompt-links';

export function PromptArticleSection({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
        >
          {title}
        </h2>
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d' }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export function FocusedPromptPage({ page }: { page: FocusedPromptPageConfig }) {
  return (
    <>
      <FAQSchema faqs={page.faqs} />
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
            {page.badge}
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
          >
            {page.h1}
          </h1>
          <p
            className="text-xl md:text-2xl max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
              opacity: 0.82,
            }}
          >
            {page.heroSubtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#prompt-finder"
              className="inline-block px-8 py-3 text-lg text-white no-underline transition-all duration-200"
              style={{
                fontFamily: 'var(--font-hand-title)',
                backgroundColor: '#ff4d4d',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: '4px 4px 0px 0px #2d2d2d',
              }}
            >
              {page.primaryCta}
            </a>
            <a
              href="#scene-prompts"
              className="inline-block px-8 py-3 text-lg no-underline transition-all duration-200"
              style={{
                fontFamily: 'var(--font-hand-title)',
                color: '#2d2d2d',
                backgroundColor: '#ffffff',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: '4px 4px 0px 0px #2d2d2d',
              }}
            >
              {page.secondaryCta}
            </a>
          </div>
        </div>
      </section>
      <section className="pt-2 pb-4 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
          >
            {page.finderTitle}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d' }}
          >
            {page.finderDescription}
          </p>
        </div>
      </section>
      <PromptFinder
        scene={page.promptScene}
        defaultMood={page.defaultMood}
        defaultDirection={page.defaultDirection}
      />
      <PromptArticleSection {...page.intro} />
      {page.steps.length > 0 && <HowToUse steps={page.steps} />}
      <div id="scene-prompts">
        <FeaturedPrompts prompts={page.prompts} sceneTitle={page.promptTitle} />
      </div>
      <PromptArticleSection {...page.afterPrompts} />
      <SceneCTA />
      <SceneFAQ faqs={page.faqs} />
      <FocusedPromptLinks currentSlug={page.slug} />
    </>
  );
}
