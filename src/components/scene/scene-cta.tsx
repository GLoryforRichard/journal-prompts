import { websiteConfig } from '@/config/website';
import { LocaleLink } from '@/i18n/navigation';
import { handShadow, wobblyBorderRadius } from '@/lib/design-tokens';
import { formatPrice } from '@/lib/formatter';
import { PlanIntervals } from '@/payment/types';
import { Routes } from '@/routes';

const youthScenes = new Set([
  'journal-prompts-for-kids',
  'journal-prompts-for-teens',
  'journal-prompts-for-middle-school',
  'journal-prompts-for-high-school',
]);

const monthlyPrice = websiteConfig.price.plans.pro.prices.find(
  (price) => price.interval === PlanIntervals.MONTH && !price.disabled
);

function finderHref(sceneSlug?: string) {
  return sceneSlug
    ? `${Routes.FindYourPrompt}?scene=${encodeURIComponent(sceneSlug)}`
    : Routes.FindYourPrompt;
}

export function SceneActions({ sceneSlug }: { sceneSlug: string }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href="#scene-prompts"
          className="inline-flex min-h-12 items-center justify-center border-2 border-foreground bg-secondary px-6 py-3 text-lg text-secondary-foreground no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{
            borderRadius: wobblyBorderRadius.sm,
            boxShadow: handShadow.default,
          }}
        >
          Start writing for free
        </a>
        {!youthScenes.has(sceneSlug) && (
          <LocaleLink
            href={finderHref(sceneSlug)}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-foreground px-6 py-3 text-lg no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Find a prompt for my mood
          </LocaleLink>
        )}
      </div>
      <p className="text-base text-muted-foreground">
        No account or credit card needed to start.
        {!youthScenes.has(sceneSlug) && (
          <>
            {' '}
            <LocaleLink
              href={Routes.Pricing}
              className="font-semibold text-secondary underline underline-offset-4"
            >
              {monthlyPrice
                ? `Pro: ${formatPrice(monthlyPrice.amount, monthlyPrice.currency)} USD/month · See plans`
                : 'See free and paid plans'}
            </LocaleLink>
          </>
        )}
      </p>
    </div>
  );
}

export function SceneCTA({ sceneSlug }: { sceneSlug?: string }) {
  if (sceneSlug && youthScenes.has(sceneSlug)) return null;

  return (
    <aside
      className="my-8 space-y-5 border-2 border-foreground bg-background p-5 md:p-7"
      style={{
        borderRadius: wobblyBorderRadius.md,
        boxShadow: handShadow.default,
      }}
      aria-label="Free journaling and Pro plans"
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">
          {sceneSlug === 'daily-journal-prompts'
            ? 'Keep your daily reflections together'
            : 'Found a prompt that clicks? Keep going.'}
        </h3>
        <p className="text-lg">
          Write here for free. When you want to revisit your entries across
          devices, save them with an account.
        </p>
      </div>
      <dl className="grid gap-4 text-base sm:grid-cols-2">
        <div>
          <dt className="font-bold">Free account</dt>
          <dd>10 cloud-saved entries and 3 AI prompts per day.</dd>
        </div>
        <div>
          <dt className="font-bold">
            Pro
            {monthlyPrice &&
              ` · ${formatPrice(monthlyPrice.amount, monthlyPrice.currency)} USD/month`}
          </dt>
          <dd>
            Unlimited cloud-saved entries and up to 100 AI prompts per day,
            tailored to your mood and writing direction.
          </dd>
        </div>
      </dl>
      <div className="flex flex-wrap items-center gap-4">
        <LocaleLink
          href={finderHref(sceneSlug)}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-secondary px-5 py-2 text-lg text-secondary-foreground no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Try the free prompt finder
        </LocaleLink>
        <LocaleLink
          href={Routes.Pricing}
          className="inline-flex min-h-11 items-center font-semibold text-secondary underline underline-offset-4"
        >
          Compare free and Pro plans →
        </LocaleLink>
      </div>
      <p className="text-sm text-muted-foreground">
        Guest writing stays in this browser. The prompts below are free to use.
      </p>
    </aside>
  );
}
