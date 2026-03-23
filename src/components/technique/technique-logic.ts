export interface Recommendation {
  name: string;
  slug: string;
  emoji: string;
  reason: string;
  time: string;
}

export function getRecommendations(
  blocker: string,
  goal: string
): Recommendation[] {
  const recs: Recommendation[] = [];

  if (blocker === 'blank-page' || goal === 'habit') {
    recs.push({
      name: '5-Minute Journal',
      slug: '5-minute-journal',
      emoji: '⚡',
      reason: 'Structured prompts eliminate blank page anxiety. Only 5 minutes.',
      time: '5 min',
    });
  }

  if (goal === 'mental-health' || blocker === 'negative' || goal === 'healing') {
    recs.push({
      name: 'CBT Journaling',
      slug: 'cbt-journaling',
      emoji: '🧠',
      reason: 'Evidence-based technique for managing anxiety and reframing negative thoughts.',
      time: '10-15 min',
    });
  }

  if (goal === 'creativity' || goal === 'self-discovery' || blocker === 'boring') {
    recs.push({
      name: 'Free Writing',
      slug: 'free-writing',
      emoji: '✍️',
      reason: 'Write without rules. Unlocks hidden thoughts and sparks creativity.',
      time: '10-20 min',
    });
  }

  if (goal === 'productivity' || blocker === 'consistency') {
    recs.push({
      name: 'Bullet Journaling',
      slug: 'bullet-journaling',
      emoji: '📓',
      reason: 'Combines task management with reflection. Great for organized minds.',
      time: '10-15 min',
    });
  }

  if (blocker === 'therapeutic' || goal === 'healing') {
    recs.push({
      name: 'Morning Pages',
      slug: 'morning-pages',
      emoji: '🌅',
      reason: 'Three pages of stream-of-consciousness writing. Deep emotional processing.',
      time: '25-40 min',
    });
  }

  if (blocker === 'unsure') {
    recs.push({
      name: 'Gratitude Journaling',
      slug: 'gratitude-journaling',
      emoji: '🙏',
      reason: 'The most researched technique. Simple, effective, and great for beginners.',
      time: '5-10 min',
    });
  }

  // Ensure at least 2 recommendations
  if (recs.length < 2) {
    if (!recs.find((r) => r.slug === 'free-writing')) {
      recs.push({
        name: 'Free Writing',
        slug: 'free-writing',
        emoji: '✍️',
        reason: 'The most flexible method — no rules, just write.',
        time: '10-20 min',
      });
    }
    if (!recs.find((r) => r.slug === 'gratitude-journaling')) {
      recs.push({
        name: 'Gratitude Journaling',
        slug: 'gratitude-journaling',
        emoji: '🙏',
        reason: 'The most researched technique with proven benefits.',
        time: '5-10 min',
      });
    }
  }

  return recs.slice(0, 3);
}

/** Extract the first number from a time string like "10-20 min" → 10, "5 min" → 5 */
export function timeMinutes(t: string): number {
  const m = t.match(/(\d+)/);
  return m ? Number.parseInt(m[1], 10) : 0;
}

export const DIFFICULTY_ORDER: Record<string, number> = { Beginner: 0, Intermediate: 1, Advanced: 2 };
export const STRUCTURE_ORDER: Record<string, number> = { None: 0, Low: 1, Moderate: 2, High: 3 };
