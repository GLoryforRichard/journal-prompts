import { PromptFinder } from '@/components/prompt-finder/prompt-finder';
import { constructMetadata } from '@/lib/metadata';
import { scenes } from '@/data/scenes';
import { focusedPromptPages } from '@/data/focused-prompt-pages';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Find Your Perfect Journal Prompt',
    description:
      "Tell us how you feel and we'll match you with the perfect journal prompt in seconds. Free, no account required.",
    locale,
    pathname: '/find-your-prompt',
  });
}

export default async function FindYourPromptPage({
  searchParams,
}: {
  searchParams: Promise<{ scene?: string | string[] }>;
}) {
  const { scene: requestedScene } = await searchParams;
  const context = [...scenes, ...focusedPromptPages].find(
    (page) => page.slug === requestedScene
  );
  return (
    <>
      {/* Hero */}
      <section className="pt-8 pb-2 md:pt-12 text-center px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            Find Your Perfect Prompt
          </h1>
          <p
            className="text-base md:text-lg max-w-lg mx-auto"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
              opacity: 0.8,
            }}
          >
            Choose how you feel, find a prompt, and start writing. Free to try,
            with no account or credit card needed.
          </p>
        </div>
      </section>

      {/* Prompt Finder */}
      <PromptFinder
        key={context?.slug ?? 'all'}
        scene={context?.promptScene}
        defaultMood={context?.defaultMood}
        defaultDirection={
          context && 'defaultDirection' in context
            ? context.defaultDirection
            : undefined
        }
      />
    </>
  );
}
