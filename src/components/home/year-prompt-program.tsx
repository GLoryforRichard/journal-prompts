import { journalProgram } from '@/data/journal-program';
import { FeaturedPrompts } from '@/components/scene/featured-prompts';

export function YearPromptProgram() {
  let day = 1;
  return (
    <section id="scene-prompts" className="scroll-mt-24 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-5">
        <h2 className="text-3xl font-bold">
          365 prompts. Twelve ways to reflect.
        </h2>
        <p className="text-lg text-muted-foreground">
          Start on any day. Open a chapter, choose one question, and write a few
          sentences. Follow the numbers or move to the theme you need; there is
          no catching up.
        </p>
        {journalProgram.map((chapter, index) => {
          const start = day;
          day += chapter.prompts.length;
          return (
            <details
              key={chapter.title}
              open={index === 0}
              className="rounded-xl border-2 border-foreground bg-card"
            >
              <summary className="cursor-pointer px-5 py-5 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">
                {index + 1}. {chapter.title}{' '}
                <span className="text-sm font-normal text-muted-foreground">
                  · Days {start}–{day - 1}
                </span>
              </summary>
              <p className="px-5 text-base text-muted-foreground">
                {chapter.description}
              </p>
              <FeaturedPrompts
                prompts={chapter.prompts}
                sceneTitle={chapter.title}
                numberOffset={start - 1}
              />
            </details>
          );
        })}
        <p className="text-sm text-muted-foreground">
          These prompts are writing suggestions, not therapy. Skip questions
          that feel unhelpful or overwhelming. In a leap year, use the extra day
          to revisit an earlier entry.
        </p>
      </div>
    </section>
  );
}
