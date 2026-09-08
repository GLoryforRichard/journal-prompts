import { constructMetadata } from '@/lib/metadata';
import { scenes } from '@/data/scenes';
import { getTechniquesForScene } from '@/data/techniques';
import { getPromptsByScene } from '@/lib/prompt-matcher';
import { SceneHero } from '@/components/scene/scene-hero';
import { WhySection } from '@/components/scene/why-section';
import { FeaturedPrompts } from '@/components/scene/featured-prompts';
import { SceneCTA } from '@/components/scene/scene-cta';
import { HowToUse } from '@/components/scene/how-to-use';
import { SceneFAQ } from '@/components/scene/scene-faq';
import { RelatedScenes } from '@/components/scene/related-scenes';
import { RelatedTechniques } from '@/components/scene/related-techniques';
import { FAQSchema } from '@/components/seo/faq-schema';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { focusedPromptPages } from '@/data/focused-prompt-pages';
import { FocusedPromptPage } from '@/components/home/focused-prompt-page';

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

  const prompts = getPromptsByScene(sceneConfig.promptScene);
  const relatedTechniques = getTechniquesForScene(sceneSlug, [
    'free-writing',
    'gratitude-journaling',
    '5-minute-journal',
    'morning-pages',
    'bullet-journaling',
    'cbt-journaling',
  ]);

  return (
    <>
      <FAQSchema faqs={sceneConfig.faqs} />

      <SceneHero
        h1={sceneConfig.h1}
        subtitle={sceneConfig.heroSubtitle}
        slug={sceneConfig.slug}
      />

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
