import { constructMetadata } from '@/lib/metadata';
import { scenes } from '@/data/scenes';
import { getPromptsByScene } from '@/lib/prompt-matcher';
import { PromptFinder } from '@/components/prompt-finder/prompt-finder';
import { SceneHero } from '@/components/scene/scene-hero';
import { WhySection } from '@/components/scene/why-section';
import { FeaturedPrompts } from '@/components/scene/featured-prompts';
import { HowToUse } from '@/components/scene/how-to-use';
import { SceneFAQ } from '@/components/scene/scene-faq';
import { RelatedScenes } from '@/components/scene/related-scenes';
import { FAQSchema } from '@/components/seo/faq-schema';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { notFound } from 'next/navigation';

const validSlugs = scenes.map((s) => s.slug);

export function generateStaticParams() {
  return validSlugs.map((scene) => ({ scene }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; scene: string }>;
}): Promise<Metadata | undefined> {
  const { locale, scene: sceneSlug } = await params;
  const sceneConfig = scenes.find((s) => s.slug === sceneSlug);
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
  const sceneConfig = scenes.find((s) => s.slug === sceneSlug);
  if (!sceneConfig) notFound();

  const prompts = getPromptsByScene(sceneConfig.promptScene);

  return (
    <>
      <FAQSchema faqs={sceneConfig.faqs} />

      <SceneHero
        h1={sceneConfig.h1}
        subtitle={sceneConfig.heroSubtitle}
        emoji={sceneConfig.emoji}
      />

      <PromptFinder scene={sceneConfig.promptScene} />

      <WhySection
        title={sceneConfig.whyTitle}
        paragraphs={sceneConfig.whyContent}
        psychologySource={sceneConfig.psychologySource}
      />

      <FeaturedPrompts prompts={prompts} sceneTitle={sceneConfig.h1} />

      <HowToUse steps={sceneConfig.howToUse} />

      <SceneFAQ faqs={sceneConfig.faqs} />

      <RelatedScenes
        sceneSlugs={sceneConfig.relatedScenes}
        currentScene={sceneSlug}
      />
    </>
  );
}
