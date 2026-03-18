import { wobblyBorderRadius } from '@/lib/design-tokens';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';

export function SceneCTA() {
  return (
    <section className="py-8 px-4 text-center">
      <div className="max-w-3xl mx-auto space-y-3">
        <p
          className="text-base opacity-60"
          style={{ fontFamily: 'var(--font-hand-body)' }}
        >
          Can&apos;t find the right one? Get a prompt matched to your mood.
        </p>
        <LocaleLink
          href={Routes.FindYourPrompt}
          className="inline-block px-8 py-3 text-lg text-white no-underline transition-all duration-200"
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
  );
}
