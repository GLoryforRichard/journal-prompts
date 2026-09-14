import { type Prompt, getReviewedPromptsByScene } from './prompt-matcher';

const dailyPrompts = getReviewedPromptsByScene('daily');

/** The browser's calendar date determines both the prompt and its entry ID. */
export function getDailyJournalPrompt(date = new Date()): Prompt {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const dayNumber = Math.floor(Date.UTC(year, month, day) / 86_400_000);
  const prompt =
    dailyPrompts[
      ((dayNumber % dailyPrompts.length) + dailyPrompts.length) %
        dailyPrompts.length
    ];
  return { ...prompt, id: `daily-${dateKey}`, source: '' };
}
