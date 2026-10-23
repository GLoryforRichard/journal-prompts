import { DailyPromptCard } from '@/components/home/daily-prompt-card';
import { DailyWritingProvider } from '@/components/home/daily-writing';
import { constructMetadata } from '@/lib/metadata';
import {
  getSceneShortAnswer,
  sceneChanges,
  scenePublished,
  sceneUpdated,
  scenes,
} from '@/data/scenes';
import { getTechniquesForScene } from '@/data/techniques';
import { getReviewedPromptsByScene } from '@/lib/prompt-matcher';
import { SceneHero } from '@/components/scene/scene-hero';
import { WhySection } from '@/components/scene/why-section';
import { FeaturedPrompts } from '@/components/scene/featured-prompts';
import { SceneCTA } from '@/components/scene/scene-cta';
import { HowToUse } from '@/components/scene/how-to-use';
import { SceneFAQ } from '@/components/scene/scene-faq';
import { RelatedScenes } from '@/components/scene/related-scenes';
import { RelatedTechniques } from '@/components/scene/related-techniques';
import { SceneStarterPrompt } from '@/components/scene/scene-starter-prompt';
import { ShortAnswer } from '@/components/scene/short-answer';
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';
import { FAQSchema } from '@/components/seo/faq-schema';
import { WebPageSchema } from '@/components/seo/web-page-schema';
import { getBaseUrl } from '@/lib/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { focusedPromptPages } from '@/data/focused-prompt-pages';
import { FocusedPromptPage } from '@/components/home/focused-prompt-page';
import { LocaleLink } from '@/i18n/navigation';

const validSlugs = [...scenes, ...focusedPromptPages].map((page) => page.slug);

export function generateStaticParams() {
  return validSlugs.map((scene) => ({ scene }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; scene: string }>;
}): Promise<Metadata | undefined> {
  const { locale, scene: sceneSlug } = await params;
  const sceneConfig = [...scenes, ...focusedPromptPages].find(
    (page) => page.slug === sceneSlug
  );
  if (!sceneConfig) return undefined;

  return constructMetadata({
    title: sceneConfig.metaTitle,
    description: sceneConfig.metaDescription,
    locale,
    pathname: `/${sceneSlug}`,
  });
}

export default async function ScenePage({
  params,
}: {
  params: Promise<{ locale: Locale; scene: string }>;
}) {
  const { scene: sceneSlug } = await params;
  const focusedPage = focusedPromptPages.find(
    (page) => page.slug === sceneSlug
  );
  if (focusedPage) return <FocusedPromptPage page={focusedPage} />;
  const sceneConfig = scenes.find((s) => s.slug === sceneSlug);
  if (!sceneConfig) notFound();

  const prompts = getReviewedPromptsByScene(sceneConfig.promptScene);
  const relatedTechniques = getTechniquesForScene(sceneSlug, [
    'free-writing',
    'gratitude-journaling',
    '5-minute-journal',
    'morning-pages',
    'bullet-journaling',
    'cbt-journaling',
  ]);

  const isDaily = sceneSlug === 'daily-journal-prompts';
  const shortAnswer = getSceneShortAnswer(sceneConfig);

  return (
    <>
      <FAQSchema faqs={sceneConfig.faqs} />
      <WebPageSchema
        type="CollectionPage"
        name={sceneConfig.h1}
        description={shortAnswer}
        path={`/${sceneSlug}`}
        datePublished={scenePublished}
        dateModified={sceneUpdated}
        items={prompts.map((prompt) => prompt.text)}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: `${getBaseUrl()}/` },
          { name: sceneConfig.h1, href: `${getBaseUrl()}/${sceneSlug}` },
        ]}
      />

      <DailyWritingProvider>
        <SceneHero
          h1={sceneConfig.h1}
          subtitle={sceneConfig.heroSubtitle}
          slug={sceneConfig.slug}
          starter={
            isDaily ? undefined : <SceneStarterPrompt prompts={prompts} />
          }
        />

        {isDaily && (
          <>
            <DailyPromptCard source="scene" />
            <p className="px-4 pb-6 text-center text-muted-foreground">
              Want a different prompt for every day?{' '}
              <LocaleLink
                href="/365-daily-journal-prompts"
                className="font-semibold underline underline-offset-4"
              >
                Explore the free 365-day collection
              </LocaleLink>
              .
            </p>
          </>
        )}
      </DailyWritingProvider>

      <ShortAnswer answer={shortAnswer} changes={sceneChanges} />

      <div id="scene-prompts" className="scroll-mt-24">
        <FeaturedPrompts
          prompts={prompts}
          sceneTitle={sceneConfig.h1}
          afterPreview={<SceneCTA sceneSlug={sceneConfig.slug} />}
        />
      </div>

      <HowToUse steps={sceneConfig.howToUse} />

      <WhySection
        title={sceneConfig.whyTitle}
        paragraphs={sceneConfig.whyContent}
        psychologySource={sceneConfig.psychologySource}
      />

      <SceneFAQ faqs={sceneConfig.faqs} />

      <RelatedTechniques techniques={relatedTechniques} />

      <RelatedScenes
        sceneSlugs={sceneConfig.relatedScenes}
        currentScene={sceneSlug}
      />
    </>
  );
}
