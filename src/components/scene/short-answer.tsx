import { wobblyBorderRadius } from '@/lib/design-tokens';

interface ShortAnswerProps {
  answer: string;
  changes: { date: string; text: string }[];
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatChangeDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

/**
 * Answer-first summary plus a dated change log. Search engines and AI
 * assistants quote this paragraph, so keep it factual and in the HTML.
 */
export function ShortAnswer({ answer, changes }: ShortAnswerProps) {
  const [latest] = changes;
  return (
    <section aria-labelledby="short-answer" className="px-4 py-6">
      <div
        className="mx-auto max-w-3xl space-y-3 border-2 border-dashed border-foreground/40 bg-background p-5 md:p-6"
        style={{ borderRadius: wobblyBorderRadius.md }}
      >
        <h2 id="short-answer" className="text-2xl font-bold">
          The short answer
        </h2>
        <p className="text-base leading-relaxed md:text-lg">{answer}</p>
        {latest && (
          <details className="text-base text-muted-foreground">
            <summary className="cursor-pointer">
              Updated{' '}
              <time dateTime={latest.date}>
                {formatChangeDate(latest.date)}
              </time>{' '}
              · What's new on this page
            </summary>
            <ul className="mt-2 space-y-1 pl-5 list-disc">
              {changes.map((change) => (
                <li key={change.date}>
                  <time dateTime={change.date}>
                    {formatChangeDate(change.date)}
                  </time>
                  : {change.text}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}
