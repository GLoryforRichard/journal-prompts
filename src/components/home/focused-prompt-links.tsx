import { focusedPromptPages } from '@/data/focused-prompt-pages';
import { LocaleLink } from '@/i18n/navigation';
import { wobblyBorderRadius } from '@/lib/design-tokens';

interface FocusedPromptLinksProps {
  currentSlug?: string;
}

export function FocusedPromptLinks({ currentSlug }: FocusedPromptLinksProps) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
        >
          {currentSlug
            ? 'Explore More Focused Prompt Pages'
            : 'More Focused Prompt Pages'}
        </h2>
        <p
          className="text-lg mb-8 opacity-80"
          style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d' }}
        >
          {currentSlug
            ? 'If you want a more specific writing path, these pages are built around distinct journaling needs.'
            : 'If you already know the kind of journaling help you want, these pages get more specific.'}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {focusedPromptPages
            .filter((page) => page.slug !== currentSlug)
            .map((page) => (
              <LocaleLink
                key={page.slug}
                href={`/${page.slug}`}
                className="block p-5 no-underline transition-all duration-200"
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #2d2d2d',
                  borderRadius: wobblyBorderRadius.md,
                  boxShadow: '4px 4px 0px 0px #2d2d2d',
                  color: '#2d2d2d',
                }}
              >
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'var(--font-hand-title)' }}
                >
                  {page.h1}
                </h3>
                <p
                  className="text-base opacity-80"
                  style={{ fontFamily: 'var(--font-hand-body)' }}
                >
                  {page.summary}
                </p>
              </LocaleLink>
            ))}
        </div>
      </div>
    </section>
  );
}
