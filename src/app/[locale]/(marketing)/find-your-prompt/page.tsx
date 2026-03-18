import { PromptFinder } from '@/components/prompt-finder/prompt-finder';
import { wobblyBorderRadius } from '@/lib/design-tokens';
import { constructMetadata } from '@/lib/metadata';
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
      'Tell us how you feel and we\'ll match you with the perfect journal prompt in seconds. Free, no account required.',
    locale,
    pathname: '/find-your-prompt',
  });
}

export default function FindYourPromptPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-8 text-center px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: 'var(--font-hand-title)',
              color: '#2d2d2d',
            }}
          >
            Find Your Perfect Prompt
          </h1>
          <p
            className="text-xl max-w-lg mx-auto"
            style={{
              fontFamily: 'var(--font-hand-body)',
              color: '#2d2d2d',
              opacity: 0.8,
            }}
          >
            Two quick questions, and we&apos;ll match you with a journal prompt
            that fits exactly how you&apos;re feeling right now.
          </p>
        </div>
      </section>

      {/* How it works - 3 steps */}
      <section className="pb-8 px-4">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          {[
            { num: '1', text: 'Pick your mood' },
            { num: '2', text: 'Choose a direction' },
            { num: '3', text: 'Start writing' },
          ].map((step) => (
            <div
              key={step.num}
              className="flex items-center gap-3 px-4 py-3 flex-1"
              style={{
                backgroundColor: '#fff9c4',
                border: '2px solid #2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: '3px 3px 0px 0px #2d2d2d',
              }}
            >
              <span
                className="text-lg font-bold"
                style={{
                  fontFamily: 'var(--font-hand-title)',
                  color: '#ff4d4d',
                }}
              >
                {step.num}.
              </span>
              <span
                className="text-base"
                style={{
                  fontFamily: 'var(--font-hand-body)',
                  color: '#2d2d2d',
                }}
              >
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Prompt Finder */}
      <PromptFinder />
    </>
  );
}
