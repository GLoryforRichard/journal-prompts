import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { BookOpenIcon, LaptopIcon, SparklesIcon } from 'lucide-react';

export function JournalBenefits() {
  return (
    <section className="bg-muted/40 px-4 py-14">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">
            A writing habit, one entry at a time
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            You do not need to subscribe to see whether journaling works for
            you. Start with one entry, then choose how you want to keep it.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: BookOpenIcon,
              title: 'Start without an account',
              text: 'Choose a free prompt and write here. My Journal helps you find the entries saved in this browser.',
            },
            {
              icon: LaptopIcon,
              title: 'Take your journal with you',
              text: 'A free account saves up to 10 entries across devices. Choose which device entries to add to your account.',
            },
            {
              icon: SparklesIcon,
              title: 'Make room as your habit grows',
              text: 'Pro includes unlimited cloud-saved entries and up to 100 AI prompts per day. Your writing stays yours to export.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border-2 border-foreground bg-card p-6"
            >
              <Icon className="mb-4 size-6" aria-hidden="true" />
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <LocaleLink
            href={`${Routes.Register}?callbackUrl=%2Fmy-journal`}
            className="inline-flex min-h-12 items-center rounded-lg bg-secondary px-6 py-3 font-semibold text-secondary-foreground no-underline"
          >
            Create a free journal
          </LocaleLink>
          <LocaleLink
            href={Routes.Pricing}
            className="inline-flex min-h-12 items-center underline underline-offset-4"
          >
            Compare plans
          </LocaleLink>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Guest entries stay on this device. Account entries use cloud storage.
          AI prompts use your selections, never your journal text.
        </p>
      </div>
    </section>
  );
}
